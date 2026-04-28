use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::{auth::AuthUser, admin::AdminUser},
    models::order::{Order, OrderItem, PlaceOrderRequest, AdminUpdateOrderRequest},
};

pub async fn place_order(
    State(state): State<AppState>,
    auth: AuthUser,
    Json(body): Json<PlaceOrderRequest>,
) -> AppResult<Json<Value>> {
    if body.items.is_empty() {
        return Err(AppError::BadRequest("Order must have at least one item".to_string()));
    }

    let total: f64 = body.items.iter().map(|i| i.unit_price * i.quantity as f64).sum();
    let order_id = Uuid::new_v4();

    sqlx::query(
        "INSERT INTO orders (id, user_id, status, total, delivery_address, notes) VALUES ($1, $2, 'pending', $3, $4, $5)"
    )
    .bind(order_id)
    .bind(auth.user_id)
    .bind(total)
    .bind(&body.delivery_address)
    .bind(&body.notes)
    .execute(&state.db)
    .await?;

    for item in &body.items {
        sqlx::query(
            "INSERT INTO order_items (id, order_id, product_id, quantity, unit_price) VALUES ($1, $2, $3, $4, $5)"
        )
        .bind(Uuid::new_v4())
        .bind(order_id)
        .bind(item.product_id)
        .bind(item.quantity)
        .bind(item.unit_price)
        .execute(&state.db)
        .await?;
    }

    let order = sqlx::query_as::<_, Order>("SELECT * FROM orders WHERE id = $1")
        .bind(order_id)
        .fetch_one(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "data": order, "message": "Order placed successfully" })))
}

pub async fn list_my_orders(
    State(state): State<AppState>,
    auth: AuthUser,
) -> AppResult<Json<Value>> {
    let orders = sqlx::query_as::<_, Order>(
        "SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC"
    )
    .bind(auth.user_id)
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": orders })))
}

pub async fn get_order(
    State(state): State<AppState>,
    auth: AuthUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    let order = sqlx::query_as::<_, Order>(
        "SELECT * FROM orders WHERE id = $1 AND user_id = $2"
    )
    .bind(id)
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Order not found".to_string()))?;

    let items = sqlx::query_as::<_, OrderItem>(
        "SELECT * FROM order_items WHERE order_id = $1"
    )
    .bind(id)
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": { "order": order, "items": items } })))
}

pub async fn cancel_order(
    State(state): State<AppState>,
    auth: AuthUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    let order = sqlx::query_as::<_, Order>(
        "SELECT * FROM orders WHERE id = $1 AND user_id = $2"
    )
    .bind(id)
    .bind(auth.user_id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Order not found".to_string()))?;

    if order.status != "pending" {
        return Err(AppError::BadRequest("Only pending orders can be cancelled".to_string()));
    }

    sqlx::query("UPDATE orders SET status = 'cancelled', updated_at = NOW() WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "message": "Order cancelled" })))
}

pub async fn admin_list_orders(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let orders = sqlx::query_as::<_, Order>(
        "SELECT * FROM orders ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": orders })))
}

pub async fn admin_update_order(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<AdminUpdateOrderRequest>,
) -> AppResult<Json<Value>> {
    let order = sqlx::query_as::<_, Order>(
        r#"UPDATE orders SET
            status = COALESCE($1, status),
            admin_notes = COALESCE($2, admin_notes),
            updated_at = NOW()
           WHERE id = $3 RETURNING *"#
    )
    .bind(&body.status)
    .bind(&body.admin_notes)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Order not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": order })))
}