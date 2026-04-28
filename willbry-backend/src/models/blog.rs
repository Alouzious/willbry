use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct BlogPost {
    pub id: Uuid,
    pub title: String,
    pub slug: String,
    pub content: String,
    pub excerpt: Option<String>,
    pub author_id: Uuid,
    pub category: String,
    pub cover_image: Option<String>,
    pub published: bool,
    pub views: i32,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreatePostRequest {
    pub title: String,
    pub slug: String,
    pub content: String,
    pub excerpt: Option<String>,
    pub category: String,
    pub cover_image: Option<String>,
    pub published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdatePostRequest {
    pub title: Option<String>,
    pub slug: Option<String>,
    pub content: Option<String>,
    pub excerpt: Option<String>,
    pub category: Option<String>,
    pub cover_image: Option<String>,
    pub published: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct BlogQuery {
    pub page: Option<i64>,
    pub per_page: Option<i64>,
    pub category: Option<String>,
    pub search: Option<String>,
}