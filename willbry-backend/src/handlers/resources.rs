use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::{auth::AuthUser, admin::AdminUser},
    models::resource::{Resource, CreateResourceRequest},
};

/// [Portal] List downloadable resources
#[utoipa::path(
    get,
    path = "/api/portal/resources",
    tag = "resources",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Active resources available for download", body = Vec<Resource>),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn list_resources(
    State(state): State<AppState>,
    _auth: AuthUser,
) -> AppResult<Json<Value>> {
    let resources = sqlx::query_as::<_, Resource>(
        "SELECT * FROM resources WHERE active = true ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": resources })))
}

/// [Portal] Get a resource download URL (increments download counter)
#[utoipa::path(
    get,
    path = "/api/portal/resources/{id}/download",
    tag = "resources",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Resource UUID")
    ),
    responses(
        (status = 200, description = "Download URL returned"),
        (status = 404, description = "Resource not found"),
    )
)]
pub async fn get_download_url(
    State(state): State<AppState>,
    _auth: AuthUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    let resource = sqlx::query_as::<_, Resource>(
        "SELECT * FROM resources WHERE id = $1 AND active = true"
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Resource not found".to_string()))?;

    sqlx::query("UPDATE resources SET download_count = download_count + 1 WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({
        "success": true,
        "download_url": resource.file_url,
        "title": resource.title
    })))
}

/// [Admin] List all resources including inactive
#[utoipa::path(
    get,
    path = "/api/admin/resources",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All resources", body = Vec<Resource>),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_list_resources(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let resources = sqlx::query_as::<_, Resource>(
        "SELECT * FROM resources ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": resources })))
}

/// [Admin] Upload / register a new resource
#[utoipa::path(
    post,
    path = "/api/admin/resources",
    tag = "admin",
    security(("bearer_auth" = [])),
    request_body = CreateResourceRequest,
    responses(
        (status = 200, description = "Resource created", body = Resource),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn upload_resource(
    State(state): State<AppState>,
    _admin: AdminUser,
    Json(body): Json<CreateResourceRequest>,
) -> AppResult<Json<Value>> {
    let resource = sqlx::query_as::<_, Resource>(
        "INSERT INTO resources (id, title, file_url, category, description) VALUES ($1,$2,$3,$4,$5) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(&body.title)
    .bind(&body.file_url)
    .bind(&body.category)
    .bind(&body.description)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": resource })))
}

/// [Admin] Soft-delete a resource
#[utoipa::path(
    delete,
    path = "/api/admin/resources/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Resource UUID")
    ),
    responses(
        (status = 200, description = "Resource deleted"),
        (status = 404, description = "Resource not found"),
    )
)]
pub async fn delete_resource(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    sqlx::query("UPDATE resources SET active = false WHERE id = $1").bind(id).execute(&state.db).await?;
    Ok(Json(json!({ "success": true, "message": "Resource deleted" })))
}