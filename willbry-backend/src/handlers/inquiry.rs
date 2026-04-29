use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::admin::AdminUser,
    models::inquiry::{Inquiry, CreateInquiryRequest, UpdateInquiryRequest},
    services::email::{send_email, inquiry_notification_html},
};

/// Submit a contact / inquiry form
#[utoipa::path(
    post,
    path = "/api/inquiries",
    tag = "inquiry",
    request_body = CreateInquiryRequest,
    responses(
        (status = 200, description = "Inquiry received. Admin is notified by email.", body = Inquiry),
        (status = 400, description = "Name and email are required"),
    )
)]
pub async fn submit_inquiry(
    State(state): State<AppState>,
    Json(body): Json<CreateInquiryRequest>,
) -> AppResult<Json<Value>> {
    if body.email.trim().is_empty() || body.name.trim().is_empty() {
        return Err(AppError::Validation("Name and email are required".to_string()));
    }

    let inquiry = sqlx::query_as::<_, Inquiry>(
        "INSERT INTO inquiries (id, name, email, subject, message) VALUES ($1, $2, $3, $4, $5) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(&body.name)
    .bind(&body.email)
    .bind(&body.subject)
    .bind(&body.message)
    .fetch_one(&state.db)
    .await?;

    let html = inquiry_notification_html(&body.name, &body.email, &body.subject, &body.message);
    let _ = send_email(
        &state.config.resend_api_key,
        &state.config.from_email,
        "willbroad2016@gmail.com",
        &format!("New Inquiry: {}", body.subject),
        &html,
    ).await;

    Ok(Json(json!({
        "success": true,
        "message": "Your message has been received. We will respond within 24-48 hours.",
        "data": inquiry
    })))
}

/// [Admin] List all inquiries
#[utoipa::path(
    get,
    path = "/api/admin/inquiries",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All inquiries", body = Vec<Inquiry>),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn list_inquiries(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let inquiries = sqlx::query_as::<_, Inquiry>(
        "SELECT * FROM inquiries ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": inquiries })))
}

/// [Admin] Mark an inquiry as read or replied
#[utoipa::path(
    patch,
    path = "/api/admin/inquiries/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Inquiry UUID")
    ),
    request_body = UpdateInquiryRequest,
    responses(
        (status = 200, description = "Inquiry updated", body = Inquiry),
        (status = 404, description = "Inquiry not found"),
    )
)]
pub async fn mark_read(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateInquiryRequest>,
) -> AppResult<Json<Value>> {
    let inquiry = sqlx::query_as::<_, Inquiry>(
        r#"UPDATE inquiries SET
            read = COALESCE($1, read),
            replied = COALESCE($2, replied)
           WHERE id = $3 RETURNING *"#
    )
    .bind(body.read)
    .bind(body.replied)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Inquiry not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": inquiry })))
}