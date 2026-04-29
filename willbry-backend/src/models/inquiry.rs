use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
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

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreateInquiryRequest {
    pub name: String,
    pub email: String,
    pub subject: String,
    pub message: String,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdateInquiryRequest {
    pub read: Option<bool>,
    pub replied: Option<bool>,
}