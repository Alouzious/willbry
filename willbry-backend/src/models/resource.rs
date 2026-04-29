use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct Resource {
    pub id: Uuid,
    pub title: String,
    pub file_url: String,
    pub category: String,
    pub description: Option<String>,
    pub download_count: i32,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreateResourceRequest {
    pub title: String,
    pub file_url: String,
    pub category: String,
    pub description: Option<String>,
}