use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Inquiry {
    pub id: Uuid,
    pub name: String,
    pub email: String,
    pub subject: String,
    pub message: String,
    pub read: bool,
    pub replied: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateInquiryRequest {
    pub name: String,
    pub email: String,
    pub subject: String,
    pub message: String,
}

#[derive(Debug, Deserialize)]
pub struct UpdateInquiryRequest {
    pub read: Option<bool>,
    pub replied: Option<bool>,
}