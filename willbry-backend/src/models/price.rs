use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct CommodityPrice {
    pub id: Uuid,
    pub commodity: String,
    pub price_ugx: f64,
    pub unit: String,
    pub change_percent: Option<f64>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct CreatePriceRequest {
    pub commodity: String,
    pub price_ugx: f64,
    pub unit: String,
    pub change_percent: Option<f64>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdatePriceRequest {
    pub price_ugx: Option<f64>,
    pub unit: Option<String>,
    pub change_percent: Option<f64>,
}