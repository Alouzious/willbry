use chrono::{Duration, Utc};
use jsonwebtoken::{decode, encode, DecodingKey, EncodingKey, Header, Validation};
use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::errors::{AppError, AppResult};

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Claims {
    pub sub: String,
    pub email: String,
    pub role: String,
    pub exp: i64,
    pub iat: i64,
}

pub fn create_access_token(
    user_id: Uuid,
    email: &str,
    role: &str,
    secret: &str,
    expiry_secs: i64,
) -> AppResult<String> {
    let now = Utc::now();
    let claims = Claims {
        sub: user_id.to_string(),
        email: email.to_string(),
        role: role.to_string(),
        iat: now.timestamp(),
        exp: (now + Duration::seconds(expiry_secs)).timestamp(),
    };
    encode(
        &Header::default(),
        &claims,
        &EncodingKey::from_secret(secret.as_bytes()),
    )
    .map_err(|e| AppError::Internal(format!("Token creation failed: {}", e)))
}

pub fn create_refresh_token(
    user_id: Uuid,
    email: &str,
    role: &str,
    secret: &str,
    expiry_secs: i64,
) -> AppResult<String> {
    create_access_token(user_id, email, role, secret, expiry_secs)
}

pub fn verify_token(token: &str, secret: &str) -> AppResult<Claims> {
    let token_data = decode::<Claims>(
        token,
        &DecodingKey::from_secret(secret.as_bytes()),
        &Validation::default(),
    )
    .map_err(|e| AppError::Unauthorized(format!("Invalid token: {}", e)))?;
    Ok(token_data.claims)
}