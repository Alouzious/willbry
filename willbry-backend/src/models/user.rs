use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};

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

#[derive(Debug, Deserialize)]
pub struct RegisterRequest {
    pub full_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub password: String,
    pub user_type: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Debug, Serialize)]
pub struct AuthResponse {
    pub success: bool,
    pub access_token: String,
    pub user: UserPublic,
}

#[derive(Debug, Serialize, Deserialize, FromRow, Clone)]
pub struct UserPublic {
    pub id: Uuid,
    pub full_name: String,
    pub email: String,
    pub phone: Option<String>,
    pub role: String,
    pub user_type: String,
    pub profile_photo: Option<String>,
    pub verified: bool,
    pub active: bool,
    pub created_at: DateTime<Utc>,
}

#[derive(Debug, Deserialize)]
pub struct UpdateProfileRequest {
    pub full_name: Option<String>,
    pub phone: Option<String>,
    pub profile_photo: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct AdminUpdateUserRequest {
    pub role: Option<String>,
    pub active: Option<bool>,
    pub user_type: Option<String>,
}

#[derive(Debug, Deserialize)]
pub struct ForgotPasswordRequest {
    pub email: String,
}

#[derive(Debug, Deserialize)]
pub struct ResetPasswordRequest {
    pub token: String,
    pub new_password: String,
}

#[derive(Debug, Deserialize)]
pub struct RefreshRequest {
    pub refresh_token: String,
}