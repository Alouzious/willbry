use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Product {
    pub id: Uuid,
    pub name: String,
    pub slug: String,
    pub description: String,
    pub price: Option<f64>,
    pub unit: Option<String>,
    pub category: String,
    pub image_url: Option<String>,
    pub active: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateProductRequest {
    pub name: String,
    pub slug: String,
    pub description: String,
    pub price: Option<f64>,
    pub unit: Option<String>,
    pub category: String,
    pub image_url: Option<String>,
    pub active: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProductRequest {
    pub name: Option<String>,
    pub slug: Option<String>,
    pub description: Option<String>,
    pub price: Option<f64>,
    pub unit: Option<String>,
    pub category: Option<String>,
    pub image_url: Option<String>,
    pub active: Option<bool>,
}