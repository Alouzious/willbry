use dotenvy::dotenv;
use std::env;

#[derive(Clone, Debug)]
pub struct Config {
    pub database_url: String,
    pub jwt_secret: String,
    pub jwt_access_expiry: i64,
    pub jwt_refresh_expiry: i64,
    pub groq_api_key: String,
    pub r2_account_id: String,
    pub r2_access_key_id: String,
    pub r2_secret_access_key: String,
    pub r2_bucket_name: String,
    pub r2_public_url: String,
    pub resend_api_key: String,
    pub from_email: String,
    pub app_url: String,
    pub frontend_url: String,
    pub port: String,
}

impl Config {
    pub fn from_env() -> Self {
        dotenv().ok();
        Self {
            database_url: env::var("DATABASE_URL").expect("DATABASE_URL must be set"),
            jwt_secret: env::var("JWT_SECRET").unwrap_or_else(|_| "changeme_secret_32_chars_minimum!!".to_string()),
            jwt_access_expiry: env::var("JWT_ACCESS_EXPIRY").unwrap_or_else(|_| "900".to_string()).parse().unwrap_or(900),
            jwt_refresh_expiry: env::var("JWT_REFRESH_EXPIRY").unwrap_or_else(|_| "604800".to_string()).parse().unwrap_or(604800),
            groq_api_key: env::var("GROQ_API_KEY").unwrap_or_default(),
            r2_account_id: env::var("R2_ACCOUNT_ID").unwrap_or_default(),
            r2_access_key_id: env::var("R2_ACCESS_KEY_ID").unwrap_or_default(),
            r2_secret_access_key: env::var("R2_SECRET_ACCESS_KEY").unwrap_or_default(),
            r2_bucket_name: env::var("R2_BUCKET_NAME").unwrap_or_else(|_| "willbry-assets".to_string()),
            r2_public_url: env::var("R2_PUBLIC_URL").unwrap_or_default(),
            resend_api_key: env::var("RESEND_API_KEY").unwrap_or_default(),
            from_email: env::var("FROM_EMAIL").unwrap_or_else(|_| "noreply@willbry.com".to_string()),
            app_url: env::var("APP_URL").unwrap_or_else(|_| "http://localhost:8080".to_string()),
            frontend_url: env::var("FRONTEND_URL").unwrap_or_else(|_| "http://localhost:5173".to_string()),
            port: env::var("PORT").unwrap_or_else(|_| "8080".to_string()),
        }
    }
}