use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct AiConfig {
    pub id: Uuid,
    pub system_prompt: String,
    pub model: String,
    pub language: String,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateAiConfigRequest {
    pub system_prompt: Option<String>,
    pub model: Option<String>,
    pub language: Option<String>,
}