use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::{auth::AuthUser, admin::AdminUser},
    models::user::{UpdateProfileRequest, AdminUpdateUserRequest, UserPublic},
};

/// [Portal] Get authenticated user profile
#[utoipa::path(
    get,
    path = "/api/portal/profile",
    tag = "portal",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "User profile", body = UserPublic),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn get_profile(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let user = sqlx::query_as::<_, UserPublic>(
        "SELECT id, full_name, email, phone, role, user_type, profile_photo, verified, active, created_at FROM users WHERE id = $1"
    )
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("User not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": user })))
}

/// [Portal] Update authenticated user profile
#[utoipa::path(
    put,
    path = "/api/portal/profile",
    tag = "portal",
    security(("bearer_auth" = [])),
    request_body = UpdateProfileRequest,
    responses(
        (status = 200, description = "Profile updated", body = UserPublic),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn update_profile(
    State(state): State<AppState>,
    auth: AuthUser,
    Json(body): Json<UpdateProfileRequest>,
) -> AppResult<Json<Value>> {
    let user = sqlx::query_as::<_, UserPublic>(
        r#"UPDATE users SET
            full_name = COALESCE($1, full_name),
            phone = COALESCE($2, phone),
            profile_photo = COALESCE($3, profile_photo),
            updated_at = NOW()
           WHERE id = $4
           RETURNING id, full_name, email, phone, role, user_type, profile_photo, verified, active, created_at"#
    )
    .bind(&body.full_name)
    .bind(&body.phone)
    .bind(&body.profile_photo)
    .bind(auth.user_id)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": user })))
}

/// [Portal] Get dashboard summary stats for the current user
#[utoipa::path(
    get,
    path = "/api/portal/dashboard",
    tag = "portal",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Dashboard stats: orders, bookings, AI chat count"),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn portal_dashboard(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let total_orders = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM orders WHERE user_id = $1"
    )
    .bind(auth.user_id)
    .fetch_one(&state.db)
    .await?;

    let pending_orders = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM orders WHERE user_id = $1 AND status = 'pending'"
    )
    .bind(auth.user_id)
    .fetch_one(&state.db)
    .await?;

    let ai_chats = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM chat_messages WHERE user_id = $1 AND role = 'user'"
    )
    .bind(auth.user_id)
    .fetch_one(&state.db)
    .await?;

    let bookings = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM bookings WHERE user_id = $1"
    )
    .bind(auth.user_id)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({
        "success": true,
        "data": {
            "total_orders": total_orders,
            "pending_orders": pending_orders,
            "ai_chats_total": ai_chats,
            "bookings": bookings
        }
    })))
}

// ── ADMIN HANDLERS ────────────────────────────────────────────────────

/// [Admin] List all users
#[utoipa::path(
    get,
    path = "/api/admin/users",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All users", body = Vec<UserPublic>),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_list_users(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let users = sqlx::query_as::<_, UserPublic>(
        "SELECT id, full_name, email, phone, role, user_type, profile_photo, verified, active, created_at
         FROM users ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": users, "total": users.len() })))
}

/// [Admin] Get a single user by ID
#[utoipa::path(
    get,
    path = "/api/admin/users/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "User UUID")
    ),
    responses(
        (status = 200, description = "User details", body = UserPublic),
        (status = 404, description = "User not found"),
    )
)]
pub async fn admin_get_user(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    let user = sqlx::query_as::<_, UserPublic>(
        "SELECT id, full_name, email, phone, role, user_type, profile_photo, verified, active, created_at
         FROM users WHERE id = $1"
    )
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("User not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": user })))
}

/// [Admin] Update user role, status, or type
#[utoipa::path(
    patch,
    path = "/api/admin/users/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "User UUID")
    ),
    request_body = AdminUpdateUserRequest,
    responses(
        (status = 200, description = "User updated", body = UserPublic),
        (status = 404, description = "User not found"),
    )
)]
pub async fn admin_update_user(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<AdminUpdateUserRequest>,
) -> AppResult<Json<Value>> {
    let user = sqlx::query_as::<_, UserPublic>(
        r#"UPDATE users SET
            role = COALESCE($1, role),
            active = COALESCE($2, active),
            user_type = COALESCE($3, user_type),
            updated_at = NOW()
           WHERE id = $4
           RETURNING id, full_name, email, phone, role, user_type, profile_photo, verified, active, created_at"#
    )
    .bind(&body.role)
    .bind(body.active)
    .bind(&body.user_type)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("User not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": user })))
}

/// [Admin] Deactivate a user
#[utoipa::path(
    delete,
    path = "/api/admin/users/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "User UUID")
    ),
    responses(
        (status = 200, description = "User deactivated"),
        (status = 404, description = "User not found"),
    )
)]
pub async fn admin_delete_user(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    sqlx::query("UPDATE users SET active = false, updated_at = NOW() WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "message": "User deactivated" })))
}