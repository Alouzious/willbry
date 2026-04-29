use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::{auth::AuthUser, admin::AdminUser},
    models::booking::{Booking, CreateBookingRequest, AdminUpdateBookingRequest},
};

/// [Portal] Submit a service booking request
#[utoipa::path(
    post,
    path = "/api/portal/bookings",
    tag = "bookings",
    security(("bearer_auth" = [])),
    request_body = CreateBookingRequest,
    responses(
        (status = 200, description = "Booking submitted successfully", body = Booking),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn create_booking(
    State(state): State<AppState>,
    auth: AuthUser,
    Json(body): Json<CreateBookingRequest>,
) -> AppResult<Json<Value>> {
    let booking = sqlx::query_as::<_, Booking>(
        r#"INSERT INTO bookings (id, user_id, service_type, preferred_date, description, status)
           VALUES ($1,$2,$3,$4,$5,'requested') RETURNING *"#
    )
    .bind(Uuid::new_v4())
    .bind(auth.user_id)
    .bind(&body.service_type)
    .bind(body.preferred_date)
    .bind(&body.description)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": booking, "message": "Booking submitted successfully" })))
}

/// [Portal] List my bookings
#[utoipa::path(
    get,
    path = "/api/portal/bookings",
    tag = "bookings",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Bookings for the authenticated user", body = Vec<Booking>),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn list_my_bookings(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let bookings = sqlx::query_as::<_, Booking>(
        "SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC"
    )
    .bind(auth.user_id)
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": bookings })))
}

/// [Admin] List all bookings
#[utoipa::path(
    get,
    path = "/api/admin/bookings",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All bookings", body = Vec<Booking>),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_list_bookings(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let bookings = sqlx::query_as::<_, Booking>(
        "SELECT * FROM bookings ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": bookings })))
}

/// [Admin] Update booking status or notes
#[utoipa::path(
    patch,
    path = "/api/admin/bookings/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Booking UUID")
    ),
    request_body = AdminUpdateBookingRequest,
    responses(
        (status = 200, description = "Booking updated", body = Booking),
        (status = 404, description = "Booking not found"),
    )
)]
pub async fn admin_update_booking(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<AdminUpdateBookingRequest>,
) -> AppResult<Json<Value>> {
    let booking = sqlx::query_as::<_, Booking>(
        r#"UPDATE bookings SET
            status = COALESCE($1, status),
            admin_notes = COALESCE($2, admin_notes),
            updated_at = NOW()
           WHERE id = $3 RETURNING *"#
    )
    .bind(&body.status)
    .bind(&body.admin_notes)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Booking not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": booking })))
}