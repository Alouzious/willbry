use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct AiConfig {
    pub id: Uuid,
    pub system_prompt: String,
    pub model: String,
    pub language: String,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdateAiConfigRequest {
    pub system_prompt: Option<String>,
    pub model: Option<String>,
    pub language: Option<String>,
}