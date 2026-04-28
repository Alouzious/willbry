use axum::{
    extract::{FromRequestParts, State},
    http::{request::Parts, HeaderMap},
};
use uuid::Uuid;
use crate::{
    errors::{AppError, AppResult},
    services::jwt::verify_token,
    AppState,
};

#[derive(Debug, Clone)]
pub struct AuthUser {
    pub user_id: Uuid,
    pub email: String,
    pub role: String,
}

impl AuthUser {
    pub fn is_admin(&self) -> bool {
        self.role == "admin"
    }
}

pub fn extract_bearer_token(headers: &HeaderMap) -> AppResult<String> {
    let auth_header = headers
        .get("Authorization")
        .ok_or_else(|| AppError::Unauthorized("Missing Authorization header".to_string()))?
        .to_str()
        .map_err(|_| AppError::Unauthorized("Invalid Authorization header".to_string()))?;

    if !auth_header.starts_with("Bearer ") {
        return Err(AppError::Unauthorized("Authorization must be Bearer token".to_string()));
    }

    Ok(auth_header[7..].to_string())
}

#[axum::async_trait]
impl FromRequestParts<AppState> for AuthUser {
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &AppState) -> Result<Self, Self::Rejection> {
        let token = extract_bearer_token(&parts.headers)?;
        let claims = verify_token(&token, &state.config.jwt_secret)?;

        let user_id = Uuid::parse_str(&claims.sub)
            .map_err(|_| AppError::Unauthorized("Invalid user ID in token".to_string()))?;

        Ok(AuthUser {
            user_id,
            email: claims.email,
            role: claims.role,
        })
    }
}