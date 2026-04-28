pub mod auth;
pub mod users;
pub mod products;
pub mod orders;
pub mod blog;
pub mod chat;
pub mod resources;
pub mod gallery;
pub mod inquiry;
pub mod farmers;
pub mod prices;
pub mod farm_profile;
pub mod analytics;
pub mod ai_config;
pub mod bookings;

use axum::{Json, response::IntoResponse};
use serde_json::json;

pub async fn health() -> impl IntoResponse {
    Json(json!({
        "success": true,
        "message": "WillBry Backend is running",
        "version": "2.0.0"
    }))
}