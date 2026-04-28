use axum::extract::FromRequestParts;
use axum::http::request::Parts;
use crate::{
    errors::{AppError, AppResult},
    middleware::auth::AuthUser,
    AppState,
};

pub struct AdminUser(pub AuthUser);

#[axum::async_trait]
impl FromRequestParts<AppState> for AdminUser {
    type Rejection = AppError;

    async fn from_request_parts(parts: &mut Parts, state: &AppState) -> Result<Self, Self::Rejection> {
        let auth_user = AuthUser::from_request_parts(parts, state).await?;
        if !auth_user.is_admin() {
            return Err(AppError::Forbidden("Admin access required".to_string()));
        }
        Ok(AdminUser(auth_user))
    }
}