use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::admin::AdminUser,
    models::price::{CommodityPrice, CreatePriceRequest, UpdatePriceRequest},
};

/// List current commodity market prices
#[utoipa::path(
    get,
    path = "/api/prices",
    tag = "prices",
    responses(
        (status = 200, description = "Current commodity prices in UGX", body = Vec<CommodityPrice>),
    )
)]
pub async fn list_prices(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let prices = sqlx::query_as::<_, CommodityPrice>(
        "SELECT * FROM commodity_prices ORDER BY commodity ASC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": prices })))
}

/// [Admin] List all commodity prices
#[utoipa::path(
    get,
    path = "/api/admin/prices",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All commodity prices", body = Vec<CommodityPrice>),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_list_prices(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    list_prices(State(state)).await
}

/// [Admin] Add a new commodity price entry
#[utoipa::path(
    post,
    path = "/api/admin/prices",
    tag = "admin",
    security(("bearer_auth" = [])),
    request_body = CreatePriceRequest,
    responses(
        (status = 200, description = "Price created", body = CommodityPrice),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn create_price(
    State(state): State<AppState>,
    _admin: AdminUser,
    Json(body): Json<CreatePriceRequest>,
) -> AppResult<Json<Value>> {
    let price = sqlx::query_as::<_, CommodityPrice>(
        "INSERT INTO commodity_prices (id, commodity, price_ugx, unit, change_percent) VALUES ($1,$2,$3,$4,$5) RETURNING *"
    )
    .bind(Uuid::new_v4())
    .bind(&body.commodity)
    .bind(body.price_ugx)
    .bind(&body.unit)
    .bind(body.change_percent)
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": price })))
}

/// [Admin] Update a commodity price
#[utoipa::path(
    put,
    path = "/api/admin/prices/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Price UUID")
    ),
    request_body = UpdatePriceRequest,
    responses(
        (status = 200, description = "Price updated", body = CommodityPrice),
        (status = 404, description = "Price not found"),
    )
)]
pub async fn update_price(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdatePriceRequest>,
) -> AppResult<Json<Value>> {
    let price = sqlx::query_as::<_, CommodityPrice>(
        r#"UPDATE commodity_prices SET
            price_ugx = COALESCE($1, price_ugx),
            unit = COALESCE($2, unit),
            change_percent = COALESCE($3, change_percent),
            updated_at = NOW()
           WHERE id = $4 RETURNING *"#
    )
    .bind(body.price_ugx)
    .bind(&body.unit)
    .bind(body.change_percent)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Price not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": price })))
}