use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
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

#[derive(Debug, Deserialize)]
pub struct CreateResourceRequest {
    pub title: String,
    pub file_url: String,
    pub category: String,
    pub description: Option<String>,
}