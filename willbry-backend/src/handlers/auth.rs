use axum::{extract::State, Json};
use serde_json::{json, Value};
use argon2::{Argon2, PasswordHash, PasswordHasher, PasswordVerifier};
use argon2::password_hash::{SaltString, rand_core::OsRng};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    models::user::*,
    services::jwt::{create_access_token, create_refresh_token, verify_token},
    services::email::{send_email, welcome_email_html, password_reset_html},
};

pub async fn register(
    State(state): State<AppState>,
    Json(body): Json<RegisterRequest>,
) -> AppResult<Json<Value>> {
    if body.email.trim().is_empty() || body.password.len() < 6 {
        return Err(AppError::Validation("Email and password (min 6 chars) are required".to_string()));
    }

    let existing = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM users WHERE email = $1"
    )
    .bind(&body.email.to_lowercase())
    .fetch_one(&state.db)
    .await?;

    if existing > 0 {
        return Err(AppError::Conflict("Email already registered".to_string()));
    }

    let salt = SaltString::generate(&mut OsRng);
    let argon2 = Argon2::default();
    let password_hash = argon2
        .hash_password(body.password.as_bytes(), &salt)
        .map_err(|e| AppError::Internal(format!("Password hashing failed: {}", e)))?
        .to_string();

    let user_type = body.user_type.unwrap_or_else(|| "client".to_string());

    let user = sqlx::query_as::<_, UserPublic>(
        r#"INSERT INTO users (id, full_name, email, phone, password_hash, role, user_type, verified, active)
           VALUES ($1, $2, $3, $4, $5, 'user', $6, true, true)
           RETURNING id, full_name, email, phone, role, user_type, profile_photo, verified, active, created_at"#
    )
    .bind(Uuid::new_v4())
    .bind(&body.full_name)
    .bind(&body.email.to_lowercase())
    .bind(&body.phone)
    .bind(&password_hash)
    .bind(&user_type)
    .fetch_one(&state.db)
    .await?;

    let access_token = create_access_token(
        user.id,
        &user.email,
        &user.role,
        &state.config.jwt_secret,
        state.config.jwt_access_expiry,
    )?;

    // Send welcome email (non-blocking)
    let email_html = welcome_email_html(&user.full_name);
    let _ = send_email(
        &state.config.resend_api_key,
        &state.config.from_email,
        &user.email,
        "Welcome to WillBry Agro-Innovations!",
        &email_html,
    ).await;

    Ok(Json(json!({
        "success": true,
        "access_token": access_token,
        "user": user,
        "message": "Registration successful"
    })))
}

pub async fn login(
    State(state): State<AppState>,
    Json(body): Json<LoginRequest>,
) -> AppResult<Json<Value>> {
    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE email = $1 AND active = true"
    )
    .bind(&body.email.to_lowercase())
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::Unauthorized("Invalid email or password".to_string()))?;

    let parsed_hash = PasswordHash::new(&user.password_hash)
        .map_err(|_| AppError::Internal("Invalid password hash".to_string()))?;

    Argon2::default()
        .verify_password(body.password.as_bytes(), &parsed_hash)
        .map_err(|_| AppError::Unauthorized("Invalid email or password".to_string()))?;

    let access_token = create_access_token(
        user.id, &user.email, &user.role,
        &state.config.jwt_secret, state.config.jwt_access_expiry,
    )?;

    let refresh_token = create_refresh_token(
        user.id, &user.email, &user.role,
        &state.config.jwt_secret, state.config.jwt_refresh_expiry,
    )?;

    // Store refresh token
    sqlx::query("INSERT INTO refresh_tokens (id, user_id, token) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING")
        .bind(Uuid::new_v4())
        .bind(user.id)
        .bind(&refresh_token)
        .execute(&state.db)
        .await?;

    let user_public = UserPublic {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        user_type: user.user_type,
        profile_photo: user.profile_photo,
        verified: user.verified,
        active: user.active,
        created_at: user.created_at,
    };

    Ok(Json(json!({
        "success": true,
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": user_public
    })))
}

pub async fn refresh_token(
    State(state): State<AppState>,
    Json(body): Json<RefreshRequest>,
) -> AppResult<Json<Value>> {
    let claims = verify_token(&body.refresh_token, &state.config.jwt_secret)?;

    let exists = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM refresh_tokens WHERE token = $1"
    )
    .bind(&body.refresh_token)
    .fetch_one(&state.db)
    .await?;

    if exists == 0 {
        return Err(AppError::Unauthorized("Invalid refresh token".to_string()));
    }

    let user_id = Uuid::parse_str(&claims.sub)
        .map_err(|_| AppError::Unauthorized("Invalid token".to_string()))?;

    let new_access = create_access_token(
        user_id, &claims.email, &claims.role,
        &state.config.jwt_secret, state.config.jwt_access_expiry,
    )?;

    Ok(Json(json!({
        "success": true,
        "access_token": new_access
    })))
}

pub async fn logout(
    State(state): State<AppState>,
    Json(body): Json<RefreshRequest>,
) -> AppResult<Json<Value>> {
    sqlx::query("DELETE FROM refresh_tokens WHERE token = $1")
        .bind(&body.refresh_token)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "message": "Logged out successfully" })))
}

pub async fn forgot_password(
    State(state): State<AppState>,
    Json(body): Json<ForgotPasswordRequest>,
) -> AppResult<Json<Value>> {
    let user = sqlx::query_as::<_, User>(
        "SELECT * FROM users WHERE email = $1"
    )
    .bind(&body.email.to_lowercase())
    .fetch_optional(&state.db)
    .await?;

    // Always return success (security: don't reveal if email exists)
    if let Some(user) = user {
        let token = Uuid::new_v4().to_string();
        sqlx::query(
            "INSERT INTO password_resets (id, user_id, token) VALUES ($1, $2, $3)
             ON CONFLICT (user_id) DO UPDATE SET token = $3, created_at = NOW()"
        )
        .bind(Uuid::new_v4())
        .bind(user.id)
        .bind(&token)
        .execute(&state.db)
        .await?;

        let reset_url = format!("{}/reset-password?token={}", state.config.frontend_url, token);
        let html = password_reset_html(&user.full_name, &reset_url);
        let _ = send_email(
            &state.config.resend_api_key,
            &state.config.from_email,
            &user.email,
            "Reset Your WillBry Password",
            &html,
        ).await;
    }

    Ok(Json(json!({
        "success": true,
        "message": "If that email exists, a reset link has been sent"
    })))
}

pub async fn reset_password(
    State(state): State<AppState>,
    Json(body): Json<ResetPasswordRequest>,
) -> AppResult<Json<Value>> {
    if body.new_password.len() < 6 {
        return Err(AppError::Validation("Password must be at least 6 characters".to_string()));
    }

    let reset = sqlx::query!(
        "SELECT user_id FROM password_resets WHERE token = $1 AND created_at > NOW() - INTERVAL '1 hour'",
        body.token
    )
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::BadRequest("Invalid or expired reset token".to_string()))?;

    let salt = SaltString::generate(&mut OsRng);
    let password_hash = Argon2::default()
        .hash_password(body.new_password.as_bytes(), &salt)
        .map_err(|e| AppError::Internal(e.to_string()))?
        .to_string();

    sqlx::query("UPDATE users SET password_hash = $1, updated_at = NOW() WHERE id = $2")
        .bind(&password_hash)
        .bind(reset.user_id)
        .execute(&state.db)
        .await?;

    sqlx::query("DELETE FROM password_resets WHERE token = $1")
        .bind(&body.token)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "message": "Password updated successfully" })))
}