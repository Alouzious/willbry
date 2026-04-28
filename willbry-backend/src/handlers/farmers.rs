use axum::{extract::{State, Path, Query}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::admin::AdminUser,
    models::farmer::{Farmer, CreateFarmerRequest, UpdateFarmerRequest, FarmerQuery},
};

pub async fn list_farmers(
    State(state): State<AppState>,
    Query(q): Query<FarmerQuery>,
) -> AppResult<Json<Value>> {
    let per_page = q.per_page.unwrap_or(20).min(100);
    let page = q.page.unwrap_or(1).max(1);
    let offset = (page - 1) * per_page;

    let farmers = sqlx::query_as::<_, Farmer>(
        "SELECT * FROM farmers WHERE active = true ORDER BY name ASC LIMIT $1 OFFSET $2"
    )
    .bind(per_page)
    .bind(offset)
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": farmers })))
}

pub async fn admin_list_farmers(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let farmers = sqlx::query_as::<_, Farmer>(
        "SELECT * FROM farmers ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": farmers })))
}

pub async fn create_farmer(
    State(state): State<AppState>,
    _admin: AdminUser,
    Json(body): Json<CreateFarmerRequest>,
) -> AppResult<Json<Value>> {
    let farmer = sqlx::query_as::<_, Farmer>(
        "INSERT INTO farmers (id, name, location, district, crops, phone, email) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(&body.name)
    .bind(&body.location)
    .bind(&body.district)
    .bind(&body.crops)
    .bind(&body.phone)
    .bind(&body.email)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": farmer })))
}

pub async fn update_farmer(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateFarmerRequest>,
) -> AppResult<Json<Value>> {
    let farmer = sqlx::query_as::<_, Farmer>(
        r#"UPDATE farmers SET
            name = COALESCE($1, name),
            location = COALESCE($2, location),
            district = COALESCE($3, district),
            crops = COALESCE($4, crops),
            phone = COALESCE($5, phone),
            email = COALESCE($6, email),
            active = COALESCE($7, active)
           WHERE id = $8 RETURNING *"#
    )
    .bind(&body.name).bind(&body.location).bind(&body.district)
    .bind(&body.crops).bind(&body.phone).bind(&body.email)
    .bind(body.active).bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Farmer not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": farmer })))
}

pub async fn delete_farmer(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    sqlx::query("UPDATE farmers SET active = false WHERE id = $1").bind(id).execute(&state.db).await?;
    Ok(Json(json!({ "success": true, "message": "Farmer removed from directory" })))
}