use axum::extract::State;
use axum::Json;
use serde_json::{json, Value};
use sqlx::FromRow;

use crate::{
    AppState,
    errors::AppResult,
    middleware::admin::AdminUser,
};

#[derive(FromRow)]
struct DayStat {
    day: Option<String>,
    count: Option<i64>,
}

/// [Admin] Get overall dashboard stats
#[utoipa::path(
    get,
    path = "/api/admin/dashboard",
    tag = "analytics",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Aggregate counts: users, orders, inquiries, content, farmers, AI chats, bookings"),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn admin_dashboard(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let total_users = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM users WHERE active = true")
        .fetch_one(&state.db).await?;
    let total_orders = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM orders")
        .fetch_one(&state.db).await?;
    let pending_orders = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM orders WHERE status = 'pending'")
        .fetch_one(&state.db).await?;
    let total_inquiries = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM inquiries")
        .fetch_one(&state.db).await?;
    let unread_inquiries = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM inquiries WHERE read = false")
        .fetch_one(&state.db).await?;
    let total_blog_posts = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM blog_posts WHERE published = true")
        .fetch_one(&state.db).await?;
    let total_products = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM products WHERE active = true")
        .fetch_one(&state.db).await?;
    let total_farmers = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM farmers WHERE active = true")
        .fetch_one(&state.db).await?;
    let total_ai_chats = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM chat_messages WHERE role = 'user'")
        .fetch_one(&state.db).await?;
    let total_bookings = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM bookings")
        .fetch_one(&state.db).await?;
    let new_users_this_month = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM users WHERE created_at >= NOW() - INTERVAL '30 days'"
    ).fetch_one(&state.db).await?;
    let orders_this_month = sqlx::query_scalar::<_, i64>(
        "SELECT COUNT(*) FROM orders WHERE created_at >= NOW() - INTERVAL '30 days'"
    ).fetch_one(&state.db).await?;

    Ok(Json(json!({
        "success": true,
        "data": {
            "users": { "total": total_users, "new_this_month": new_users_this_month },
            "orders": { "total": total_orders, "pending": pending_orders, "this_month": orders_this_month },
            "inquiries": { "total": total_inquiries, "unread": unread_inquiries },
            "content": { "blog_posts": total_blog_posts, "products": total_products },
            "farmers": total_farmers,
            "ai_chats": total_ai_chats,
            "bookings": total_bookings
        }
    })))
}

/// [Admin] Get time-series analytics for the last 30 days
#[utoipa::path(
    get,
    path = "/api/admin/analytics",
    tag = "analytics",
    security(("bearer_auth" = [])),
    responses(
        (status = 200, description = "Daily signups and orders for the past 30 days"),
        (status = 403, description = "Admin role required"),
    )
)]
pub async fn analytics_data(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let signups = sqlx::query_as::<_, DayStat>(
        r#"SELECT TO_CHAR(DATE(created_at), 'YYYY-MM-DD') as day, COUNT(*) as count
           FROM users
           WHERE created_at >= NOW() - INTERVAL '30 days'
           GROUP BY DATE(created_at)
           ORDER BY DATE(created_at) ASC"#
    )
    .fetch_all(&state.db)
    .await?;

    let signups_data: Vec<Value> = signups.iter().map(|r| json!({
        "day": r.day.clone().unwrap_or_default(),
        "count": r.count.unwrap_or(0)
    })).collect();

    let orders = sqlx::query_as::<_, DayStat>(
        r#"SELECT TO_CHAR(DATE(created_at), 'YYYY-MM-DD') as day, COUNT(*) as count
           FROM orders
           WHERE created_at >= NOW() - INTERVAL '30 days'
           GROUP BY DATE(created_at)
           ORDER BY DATE(created_at) ASC"#
    )
    .fetch_all(&state.db)
    .await?;

    let orders_data: Vec<Value> = orders.iter().map(|r| json!({
        "day": r.day.clone().unwrap_or_default(),
        "count": r.count.unwrap_or(0)
    })).collect();

    Ok(Json(json!({
        "success": true,
        "data": {
            "signups_30d": signups_data,
            "orders_30d": orders_data
        }
    })))
}