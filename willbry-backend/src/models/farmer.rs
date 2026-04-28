use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct Farmer {
    pub id: Uuid,
    pub name: String,
    pub location: String,
    pub district: String,
    pub crops: String,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateFarmerRequest {
    pub name: String,
    pub location: String,
    pub district: String,
    pub crops: String,
    pub phone: Option<String>,
    pub email: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateFarmerRequest {
    pub name: Option<String>,
    pub location: Option<String>,
    pub district: Option<String>,
    pub crops: Option<String>,
    pub phone: Option<String>,
    pub email: Option<String>,
    pub active: Option<bool>,
}

#[derive(Debug, Deserialize)]
pub struct FarmerQuery {
    pub district: Option<String>,
    pub search: Option<String>,
    pub page: Option<i64>,
    pub per_page: Option<i64>,
}