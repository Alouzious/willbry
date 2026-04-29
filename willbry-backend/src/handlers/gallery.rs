use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

use crate::{
    AppState,
    errors::AppResult,
    middleware::admin::AdminUser,
};

#[derive(Debug, Serialize, Deserialize, FromRow, ToSchema)]
pub struct GalleryImage {
    pub id: Uuid,
    pub url: String,
    pub caption: Option<String>,
    pub category: String,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreateImageRequest {
    /// Public URL of the image (e.g. from R2/S3)
    pub url: String,
    pub caption: Option<String>,
    /// e.g. "farm", "products", "events"
    pub category: String,
}

/// List all active gallery images
#[utoipa::path(
    get,
    path = "/api/gallery",
    tag = "gallery",
    responses(
        (status = 200, description = "Active gallery images", body = Vec<GalleryImage>),
    )
)]
pub async fn list_images(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let images = sqlx::query_as::<_, GalleryImage>(
        "SELECT * FROM gallery_images WHERE active = true ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": images })))
}

/// [Admin] List all gallery images including hidden
#[utoipa::path(
    get,
    path = "/api/admin/gallery",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All gallery images", body = Vec<GalleryImage>),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_list_images(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let images = sqlx::query_as::<_, GalleryImage>(
        "SELECT * FROM gallery_images ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": images })))
}

/// [Admin] Add a new gallery image
#[utoipa::path(
    post,
    path = "/api/admin/gallery",
    tag = "admin",
    security(("bearer_auth" = [])),
    request_body = CreateImageRequest,
    responses(
        (status = 200, description = "Image added", body = GalleryImage),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn upload_image(
    State(state): State<AppState>,
    _admin: AdminUser,
    Json(body): Json<CreateImageRequest>,
) -> AppResult<Json<Value>> {
    let image = sqlx::query_as::<_, GalleryImage>(
        "INSERT INTO gallery_images (id, url, caption, category) VALUES ($1, $2, $3, $4) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(&body.url)
    .bind(&body.caption)
    .bind(&body.category)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": image })))
}

/// [Admin] Soft-delete a gallery image
#[utoipa::path(
    delete,
    path = "/api/admin/gallery/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Gallery image UUID")
    ),
    responses(
        (status = 200, description = "Image deleted"),
        (status = 404, description = "Image not found"),
    )
)]
pub async fn delete_image(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    sqlx::query("UPDATE gallery_images SET active = false WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "message": "Image deleted" })))
}