use crate::errors::{AppError, AppResult};

/// For now returns a placeholder URL.
/// Replace with actual AWS S3-compatible call to Cloudflare R2 when keys are ready.
pub async fn upload_file(
    _account_id: &str,
    _access_key: &str,
    _secret_key: &str,
    bucket: &str,
    key: &str,
    _data: Vec<u8>,
    _content_type: &str,
) -> AppResult<String> {
    // TODO: integrate with aws-sdk-s3 or reqwest S3 presigned
    // For now return a placeholder
    Ok(format!("https://assets.willbry.com/{}/{}", bucket, key))
}

pub fn generate_key(folder: &str, filename: &str) -> String {
    let uuid = uuid::Uuid::new_v4();
    let ext = filename.rsplit('.').next().unwrap_or("bin");
    format!("{}/{}.{}", folder, uuid, ext)
}

pub fn get_public_url(base_url: &str, key: &str) -> String {
    format!("{}/{}", base_url.trim_end_matches('/'), key)
}

pub async fn delete_file(
    _account_id: &str,
    _access_key: &str,
    _secret_key: &str,
    _bucket: &str,
    _key: &str,
) -> AppResult<()> {
    // TODO: implement actual deletion
    Ok(())
}

pub fn extract_key_from_url(url: &str, base_url: &str) -> AppResult<String> {
    url.strip_prefix(base_url)
        .map(|s| s.trim_start_matches('/').to_string())
        .ok_or_else(|| AppError::BadRequest("Invalid file URL".to_string()))
}