use reqwest::Client;
use serde_json::json;
use crate::errors::{AppError, AppResult};

pub async fn send_email(
    api_key: &str,
    from: &str,
    to: &str,
    subject: &str,
    html: &str,
) -> AppResult<()> {
    if api_key.is_empty() {
        tracing::warn!("RESEND_API_KEY not set — skipping email to {}", to);
        return Ok(());
    }

    let client = Client::new();
    let resp = client
        .post("https://api.resend.com/emails")
        .bearer_auth(api_key)
        .json(&json!({
            "from": from,
            "to": [to],
            "subject": subject,
            "html": html
        }))
        .send()
        .await
        .map_err(|e| AppError::Internal(format!("Email send failed: {}", e)))?;

    if !resp.status().is_success() {
        let txt = resp.text().await.unwrap_or_default();
        tracing::error!("Resend error: {}", txt);
    }

    Ok(())
}

pub fn inquiry_notification_html(name: &str, email: &str, subject: &str, message: &str) -> String {
    format!(
        r#"<h2>New Inquiry from WillBry Website</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Message:</strong><br>{message}</p>"#
    )
}

pub fn welcome_email_html(name: &str) -> String {
    format!(
        r#"<h2>Welcome to WillBry Agro-Innovations, {name}!</h2>
        <p>Thank you for registering. Your account is now active.</p>
        <p>You can now access the farmer portal, chat with our AI advisor, and place orders.</p>
        <p><strong>Smart Farming, Smarter Foods</strong></p>
        <p>WillBry Team | +256 789 747881</p>"#
    )
}

pub fn password_reset_html(name: &str, reset_url: &str) -> String {
    format!(
        r#"<h2>Password Reset — WillBry</h2>
        <p>Hello {name},</p>
        <p>Click the link below to reset your password. This link expires in 1 hour.</p>
        <p><a href="{reset_url}">Reset My Password</a></p>
        <p>If you did not request this, ignore this email.</p>"#
    )
}