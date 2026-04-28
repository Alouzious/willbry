use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc, NaiveDate};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Booking {
    pub id: Uuid,
    pub user_id: Uuid,
    pub service_type: String,
    pub preferred_date: Option<NaiveDate>,
    pub description: String,
    pub status: String,
    pub admin_notes: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateBookingRequest {
    pub service_type: String,
    pub preferred_date: Option<NaiveDate>,
    pub description: String,
}

#[derive(Debug, Deserialize)]
pub struct AdminUpdateBookingRequest {
    pub status: Option<String>,
    pub admin_notes: Option<String>,
}