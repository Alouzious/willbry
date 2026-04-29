use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct ChatMessage {
    pub id: Uuid,
    pub user_id: Option<Uuid>,
    /// "user" or "assistant"
    pub role: String,
    pub content: String,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct SendMessageRequest {
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct GroqMessage {
    pub role: String,
    pub content: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct ChatResponse {
    pub success: bool,
    pub reply: String,
    pub message_id: Uuid,
}