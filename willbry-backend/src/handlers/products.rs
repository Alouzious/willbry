use axum::{extract::{State, Path}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::admin::AdminUser,
    models::product::{Product, CreateProductRequest, UpdateProductRequest},
};

/// List all active products
#[utoipa::path(
    get,
    path = "/api/products",
    tag = "products",
    responses(
        (status = 200, description = "List of active products", body = Vec<Product>),
    )
)]
pub async fn list_products(State(state): State<AppState>) -> AppResult<Json<Value>> {
    let products = sqlx::query_as::<_, Product>(
        "SELECT * FROM products WHERE active = true ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": products })))
}

/// Get a single product by slug
#[utoipa::path(
    get,
    path = "/api/products/{slug}",
    tag = "products",
    params(
        ("slug" = String, Path, description = "Product slug")
    ),
    responses(
        (status = 200, description = "Product details", body = Product),
        (status = 404, description = "Product not found"),
    )
)]
pub async fn get_product(
    State(state): State<AppState>,
    Path(slug): Path<String>,
) -> AppResult<Json<Value>> {
    let product = sqlx::query_as::<_, Product>(
        "SELECT * FROM products WHERE slug = $1 AND active = true"
    )
    .bind(&slug)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound(format!("Product '{}' not found", slug)))?;

    Ok(Json(json!({ "success": true, "data": product })))
}

/// [Admin] List all products including inactive
#[utoipa::path(
    get,
    path = "/api/admin/products",
    tag = "admin",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "All products", body = Vec<Product>),
        (status = 401, description = "Unauthorized"),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_list_products(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let products = sqlx::query_as::<_, Product>(
        "SELECT * FROM products ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": products })))
}

/// [Admin] Create a new product
#[utoipa::path(
    post,
    path = "/api/admin/products",
    tag = "admin",
    security(("bearer_auth" = [])),
    request_body = CreateProductRequest,
    responses(
        (status = 200, description = "Product created", body = Product),
        (status = 401, description = "Unauthorized"),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn create_product(
    State(state): State<AppState>,
    _admin: AdminUser,
    Json(body): Json<CreateProductRequest>,
) -> AppResult<Json<Value>> {
    let product = sqlx::query_as::<_, Product>(
        r#"INSERT INTO products (id, name, slug, description, price, unit, category, image_url, active)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
           RETURNING *"#
    )
    .bind(Uuid::new_v4())
    .bind(&body.name)
    .bind(&body.slug)
    .bind(&body.description)
    .bind(body.price)
    .bind(&body.unit)
    .bind(&body.category)
    .bind(&body.image_url)
    .bind(body.active.unwrap_or(true))
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": product })))
}

/// [Admin] Update a product by ID
#[utoipa::path(
    put,
    path = "/api/admin/products/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Product UUID")
    ),
    request_body = UpdateProductRequest,
    responses(
        (status = 200, description = "Product updated", body = Product),
        (status = 404, description = "Product not found"),
    )
)]
pub async fn update_product(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdateProductRequest>,
) -> AppResult<Json<Value>> {
    let product = sqlx::query_as::<_, Product>(
        r#"UPDATE products SET
            name = COALESCE($1, name),
            slug = COALESCE($2, slug),
            description = COALESCE($3, description),
            price = COALESCE($4, price),
            unit = COALESCE($5, unit),
            category = COALESCE($6, category),
            image_url = COALESCE($7, image_url),
            active = COALESCE($8, active),
            updated_at = NOW()
           WHERE id = $9 RETURNING *"#
    )
    .bind(&body.name)
    .bind(&body.slug)
    .bind(&body.description)
    .bind(body.price)
    .bind(&body.unit)
    .bind(&body.category)
    .bind(&body.image_url)
    .bind(body.active)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Product not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": product })))
}

/// [Admin] Soft-delete a product by ID
#[utoipa::path(
    delete,
    path = "/api/admin/products/{id}",
    tag = "admin",
    security(("bearer_auth" = [])),
    params(
        ("id" = Uuid, Path, description = "Product UUID")
    ),
    responses(
        (status = 200, description = "Product deleted"),
        (status = 404, description = "Product not found"),
    )
)]
pub async fn delete_product(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    sqlx::query("UPDATE products SET active = false, updated_at = NOW() WHERE id = $1")
        .bind(id)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "message": "Product deleted" })))
}