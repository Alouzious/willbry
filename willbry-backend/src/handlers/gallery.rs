use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::admin::AdminUser,
};

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct GalleryImage {
    pub id: Uuid,
    pub url: String,
    pub caption: Option<String>,
    pub category: String,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateImageRequest {
    pub url: String,
    pub caption: Option<String>,
    pub category: String,
}

pub async fn list_images(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let images = sqlx::query_as::<_, GalleryImage>(
        "SELECT * FROM gallery_images WHERE active = true ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": images })))
}

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