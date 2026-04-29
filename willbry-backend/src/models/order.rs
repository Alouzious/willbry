use serde::{Deserialize, Serialize};
use sqlx::FromRow;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use utoipa::ToSchema;

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct Order {
    pub id: Uuid,
    pub user_id: Uuid,
    /// "pending", "confirmed", "shipped", "delivered", "cancelled"
    pub status: String,
    pub total: f64,
    pub delivery_address: String,
    pub notes: Option<String>,
    pub admin_notes: Option<String>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[derive(Debug, Clone, Serialize, Deserialize, FromRow, ToSchema)]
pub struct OrderItem {
    pub id: Uuid,
    pub order_id: Uuid,
    pub product_id: Uuid,
    pub quantity: i32,
    pub unit_price: f64,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct OrderItemRequest {
    pub product_id: Uuid,
    pub quantity: i32,
    pub unit_price: f64,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct PlaceOrderRequest {
    pub delivery_address: String,
    pub notes: Option<String>,
    pub items: Vec<OrderItemRequest>,
}

#[derive(Debug, Deserialize, ToSchema)]
pub struct AdminUpdateOrderRequest {
    /// "pending", "confirmed", "shipped", "delivered", "cancelled"
    pub status: Option<String>,
    pub admin_notes: Option<String>,
}

#[derive(Debug, Serialize, ToSchema)]
pub struct OrderWithItems {
    #[serde(flatten)]
    pub order: Order,
    pub items: Vec<OrderItem>,
}