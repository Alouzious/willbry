use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow)]
pub struct User {
    pub id: Uuid,
    pub full_name: String,
    pub email: String,
    pub phone: Option<String>,
    #[serde(skip_serializing)]
    pub password_hash: String,
    pub role: String,
    pub user_type: String,
    pub profile_photo: Option<String>,
    pub verified: bool,
    pub active: bool,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct RegisterRequest {
    pub full_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub password: String,
    /// "client" or "farmer" (default: "client")
    pub user_type: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct AuthResponse {
    pub success: bool,
    pub access_token: String,
    pub user: UserPublic,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone, ToSchema)]
pub struct UserPublic {
    pub id: Uuid,
    pub full_name: String,
    pub email: String,
    pub phone: Option<String>,
    /// "user" or "admin"
    pub role: String,
    /// "client" or "farmer"
    pub user_type: String,
    pub profile_photo: Option<String>,
    pub verified: bool,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct UpdateProfileRequest {
    pub full_name: Option<String>,
    pub phone: Option<String>,
    pub profile_photo: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct AdminUpdateUserRequest {
    /// "user" or "admin"
    pub role: Option<String>,
    pub active: Option<bool>,
    pub user_type: Option<String>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct ForgotPasswordRequest {
    pub email: String,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct ResetPasswordRequest {
    /// Token received via email
    pub token: String,
    pub new_password: String,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct RefreshRequest {
    pub refresh_token: String,
}