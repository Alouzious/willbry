use axum::{extract::State, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::AppResult,
    middleware::auth::AuthUser,
    models::farm_profile::{FarmProfile, UpsertFarmProfileRequest, CropLog, CreateCropLogRequest},
};

/// [Portal] Get the authenticated user's farm profile
#[utoipa::path(
    get,
    path = "/api/portal/farm-profile",
    tag = "farm_profile",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Farm profile (null if none created yet)", body = FarmProfile),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn get_farm_profile(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let profile = sqlx::query_as::<_, FarmProfile>(
        "SELECT * FROM farm_profiles WHERE user_id = $1"
    )
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": profile })))
}

/// [Portal] Create or update the authenticated user's farm profile
#[utoipa::path(
    put,
    path = "/api/portal/farm-profile",
    tag = "farm_profile",
    security(("bearer_auth" = [])),
    request_body = UpsertFarmProfileRequest,
    responses(
        (status = 200, description = "Farm profile saved", body = FarmProfile),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn upsert_farm_profile(
    State(state): State<AppState>,
    auth: AuthUser,
    Json(body): Json<UpsertFarmProfileRequest>,
) -> AppResult<Json<Value>> {
    let profile = sqlx::query_as::<_, FarmProfile>(
        r#"INSERT INTO farm_profiles (id, user_id, district, size_acres, crops, irrigation)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (user_id) DO UPDATE SET
               district = $3,
               size_acres = $4,
               crops = $5,
               irrigation = $6,
               updated_at = NOW()
           RETURNING *"#
    )
    .bind(Uuid::new_v4())
    .bind(auth.user_id)
    .bind(&body.district)
    .bind(body.size_acres)
    .bind(&body.crops)
    .bind(&body.irrigation)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": profile })))
}

/// [Portal] List crop logs for the authenticated user's farm
#[utoipa::path(
    get,
    path = "/api/portal/crop-logs",
    tag = "farm_profile",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Crop logs for this user's farm", body = Vec<CropLog>),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn list_crop_logs(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let logs = sqlx::query_as::<_, CropLog>(
        r#"SELECT cl.* FROM crop_logs cl
           JOIN farm_profiles fp ON cl.farm_profile_id = fp.id
           WHERE fp.user_id = $1
           ORDER BY cl.created_at DESC"#
    )
    .bind(auth.user_id)
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": logs })))
}

/// [Portal] Add a crop log entry (auto-creates farm profile if needed)
#[utoipa::path(
    post,
    path = "/api/portal/crop-logs",
    tag = "farm_profile",
    security(("bearer_auth" = [])),
    request_body = CreateCropLogRequest,
    responses(
        (status = 200, description = "Crop log created", body = CropLog),
        (status = 401, description = "Unauthorized"),
    )
)]
pub async fn create_crop_log(
    State(state): State<AppState>,
    auth: AuthUser,
    Json(body): Json<CreateCropLogRequest>,
) -> AppResult<Json<Value>> {
    let profile = sqlx::query_scalar::<_, Uuid>(
        "SELECT id FROM farm_profiles WHERE user_id = $1"
    )
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await?;

    let profile_id = match profile {
        Some(id) => id,
        None => {
            let id = Uuid::new_v4();
            sqlx::query(
                "INSERT INTO farm_profiles (id, user_id, district, crops) VALUES ($1, $2, 'Unknown', '')"
            )
            .bind(id).bind(auth.user_id).execute(&state.db).await?;
            id
        }
    };

    let log = sqlx::query_as::<_, CropLog>(
        r#"INSERT INTO crop_logs (id, farm_profile_id, crop, planted_date, expected_harvest, actual_harvest, yield_kg, notes)
           VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *"#
    )
    .bind(Uuid::new_v4())
    .bind(profile_id)
    .bind(&body.crop)
    .bind(body.planted_date)
    .bind(body.expected_harvest)
    .bind(body.actual_harvest)
    .bind(body.yield_kg)
    .bind(&body.notes)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": log })))
}