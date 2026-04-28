use axum::{extract::State, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::AppResult,
    middleware::admin::AdminUser,
    models::ai_config::{AiConfig, UpdateAiConfigRequest},
    services::groq::default_system_prompt,
};

pub async fn get_config(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let config = sqlx::query_as::<_, AiConfig>(
        "SELECT * FROM ai_config ORDER BY updated_at DESC LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await?;

    if let Some(c) = config {
        return Ok(Json(json!({ "success": true, "data": c })));
    }

    // Seed default if none exists
    let default = sqlx::query_as::<_, AiConfig>(
        "INSERT INTO ai_config (id, system_prompt, model, language) VALUES ($1, $2, $3, $4) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(default_system_prompt())
    .bind("llama-3.3-70b-versatile")
    .bind("english")
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": default })))
}

pub async fn update_config(
    State(state): State<AppState>,
    _admin: AdminUser,
    Json(body): Json<UpdateAiConfigRequest>,
) -> AppResult<Json<Value>> {
    // Get existing or create
    let existing = sqlx::query_scalar::<_, Uuid>(
        "SELECT id FROM ai_config ORDER BY updated_at DESC LIMIT 1"
    )
    .fetch_optional(&state.db)
    .await?;

    let config = if let Some(id) = existing {
        sqlx::query_as::<_, AiConfig>(
            r#"UPDATE ai_config SET
                system_prompt = COALESCE($1, system_prompt),
                model = COALESCE($2, model),
                language = COALESCE($3, language),
                updated_at = NOW()
               WHERE id = $4 RETURNING *"#
        )
        .bind(&body.system_prompt)
        .bind(&body.model)
        .bind(&body.language)
        .bind(id)
        .fetch_one(&state.db)
        .await?
    } else {
        sqlx::query_as::<_, AiConfig>(
            "INSERT INTO ai_config (id, system_prompt, model, language) VALUES ($1,$2,$3,$4) RETURNING *"
        )
        .bind(Uuid::new_v4())
        .bind(body.system_prompt.unwrap_or_else(default_system_prompt))
        .bind(body.model.unwrap_or_else(|| "llama-3.3-70b-versatile".to_string()))
        .bind(body.language.unwrap_or_else(|| "english".to_string()))
        .fetch_one(&state.db)
        .await?
    };

    Ok(Json(json!({ "success": true, "data": config })))
}