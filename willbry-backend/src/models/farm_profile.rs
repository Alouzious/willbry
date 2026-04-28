use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc, NaiveDate};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct FarmProfile {
    pub id: Uuid,
    pub user_id: Uuid,
    pub district: String,
    pub size_acres: Option<f64>,
    pub crops: String,
    pub irrigation: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct UpsertFarmProfileRequest {
    pub district: String,
    pub size_acres: Option<f64>,
    pub crops: String,
    pub irrigation: Option<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct CropLog {
    pub id: Uuid,
    pub farm_profile_id: Uuid,
    pub crop: String,
    pub planted_date: Option<NaiveDate>,
    pub expected_harvest: Option<NaiveDate>,
    pub actual_harvest: Option<NaiveDate>,
    pub yield_kg: Option<f64>,
    pub notes: Option<String>,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct CreateCropLogRequest {
    pub crop: String,
    pub planted_date: Option<NaiveDate>,
    pub expected_harvest: Option<NaiveDate>,
    pub actual_harvest: Option<NaiveDate>,
    pub yield_kg: Option<f64>,
    pub notes: Option<String>,
}