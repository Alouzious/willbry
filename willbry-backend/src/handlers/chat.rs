use axum::{extract::State, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::{auth::AuthUser, admin::AdminUser},
    models::chat::{ChatMessage, SendMessageRequest, GroqMessage},
    services::groq::{chat_completion, default_system_prompt},
};

async fn load_ai_config(state: &AppState) -> (String, String) {
    let row = sqlx::query_as::<_, (String, String)>(
        "SELECT system_prompt, model FROM ai_config ORDER BY updated_at DESC LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await
    .ok()
    .flatten();

    row.unwrap_or_else(|| (default_system_prompt(), "llama-3.3-70b-versatile".to_string()))
}

pub async fn send_message(
    State(state): State<AppState>,
    auth: AuthUser,
    Json(body): Json<SendMessageRequest>,
) -> AppResult<Json<Value>> {
    if body.message.trim().is_empty() {
        return Err(AppError::BadRequest("Message cannot be empty".to_string()));
    }

    let (system_prompt, model) = load_ai_config(&state).await;

    let history = sqlx::query_as::<_, ChatMessage>(
        "SELECT * FROM chat_messages WHERE user_id = $1 ORDER BY created_at DESC LIMIT 20"
    )
    .bind(auth.user_id)
    .fetch_all(&state.db)
    .await?;

    let history_reversed: Vec<GroqMessage> = history
        .into_iter()
        .rev()
        .map(|m| GroqMessage { role: m.role, content: m.content })
        .collect();

    sqlx::query(
        "INSERT INTO chat_messages (id, user_id, role, content) VALUES ($1, $2, 'user', $3)"
    )
    .bind(Uuid::new_v4())
    .bind(auth.user_id)
    .bind(&body.message)
    .execute(&state.db)
    .await?;

    let reply = chat_completion(
        &state.config.groq_api_key,
        &model,
        &system_prompt,
        history_reversed,
        &body.message,
    )
    .await?;

    let msg_id = Uuid::new_v4();
    sqlx::query(
        "INSERT INTO chat_messages (id, user_id, role, content) VALUES ($1, $2, 'assistant', $3)"
    )
    .bind(msg_id)
    .bind(auth.user_id)
    .bind(&reply)
    .execute(&state.db)
    .await?;

    Ok(Json(json!({
        "success": true,
        "reply": reply,
        "message_id": msg_id
    })))
}

pub async fn get_history(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let messages = sqlx::query_as::<_, ChatMessage>(
        "SELECT * FROM chat_messages WHERE user_id = $1 ORDER BY created_at ASC LIMIT 100"
    )
    .bind(auth.user_id)
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": messages })))
}

pub async fn preview_chat(
    State(state): State<AppState>,
    Json(body): Json<SendMessageRequest>,
) -> AppResult<Json<Value>> {
    if body.message.trim().is_empty() {
        return Err(AppError::BadRequest("Message cannot be empty".to_string()));
    }

    let (system_prompt, model) = load_ai_config(&state).await;

    let reply = chat_completion(
        &state.config.groq_api_key,
        &model,
        &system_prompt,
        vec![],
        &body.message,
    )
    .await?;

    Ok(Json(json!({ "success": true, "reply": reply })))
}

pub async fn admin_chat_logs(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let logs = sqlx::query_as::<_, ChatMessage>(
        "SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT 500"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": logs })))
}
