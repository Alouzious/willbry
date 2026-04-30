use axum::{
    routing::{get, post, put, delete, patch},
    Router,
};
use axum::http::HeaderValue;
use std::sync::Arc;
use tower_http::cors::{CorsLayer, Any};
use tower_http::trace::TraceLayer;
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};
use utoipa::OpenApi;
use utoipa_swagger_ui::SwaggerUi;

mod config;
mod db;
mod errors;
mod handlers;
mod middleware;
mod models;
mod services;

use config::Config;
use db::pool::create_pool;

#[derive(Clone)]
pub struct AppState {
    pub db: sqlx::PgPool,
    pub config: Arc<Config>,
}

#[derive(OpenApi)]
#[openapi(
    info(
        title = "WillBry Agro-Innovations API",
        version = "2.0.0",
        description = "Full backend API for WillBry Agro-Innovations platform. \
                       Auth endpoints return JWT tokens. \
                       Portal endpoints require `Authorization: Bearer <token>`. \
                       Admin endpoints require admin role."
    ),
    paths(
        // Health
        handlers::health,
        // Auth
        handlers::auth::register,
        handlers::auth::login,
        handlers::auth::refresh_token,
        handlers::auth::logout,
        handlers::auth::forgot_password,
        handlers::auth::reset_password,
        // Public
        handlers::products::list_products,
        handlers::products::get_product,
        handlers::blog::list_posts,
        handlers::blog::get_post,
        handlers::gallery::list_images,
        handlers::farmers::list_farmers,
        handlers::prices::list_prices,
        handlers::inquiry::submit_inquiry,
        handlers::chat::preview_chat,
        // Portal
        handlers::users::portal_dashboard,
        handlers::users::get_profile,
        handlers::users::update_profile,
        handlers::orders::list_my_orders,
        handlers::orders::place_order,
        handlers::orders::get_order,
        handlers::orders::cancel_order,
        handlers::chat::get_history,
        handlers::chat::send_message,
        handlers::resources::list_resources,
        handlers::resources::get_download_url,
        handlers::farm_profile::get_farm_profile,
        handlers::farm_profile::upsert_farm_profile,
        handlers::farm_profile::list_crop_logs,
        handlers::farm_profile::create_crop_log,
        handlers::bookings::list_my_bookings,
        handlers::bookings::create_booking,
        // Admin
        handlers::analytics::admin_dashboard,
        handlers::analytics::analytics_data,
        handlers::users::admin_list_users,
        handlers::users::admin_get_user,
        handlers::users::admin_update_user,
        handlers::users::admin_delete_user,
        handlers::orders::admin_list_orders,
        handlers::orders::admin_update_order,
        handlers::inquiry::list_inquiries,
        handlers::inquiry::mark_read,
        handlers::blog::admin_list_posts,
        handlers::blog::create_post,
        handlers::blog::update_post,
        handlers::blog::delete_post,
        handlers::products::admin_list_products,
        handlers::products::create_product,
        handlers::products::update_product,
        handlers::products::delete_product,
        handlers::gallery::admin_list_images,
        handlers::gallery::upload_image,
        handlers::gallery::delete_image,
        handlers::resources::admin_list_resources,
        handlers::resources::upload_resource,
        handlers::resources::delete_resource,
        handlers::farmers::admin_list_farmers,
        handlers::farmers::create_farmer,
        handlers::farmers::update_farmer,
        handlers::farmers::delete_farmer,
        handlers::prices::admin_list_prices,
        handlers::prices::create_price,
        handlers::prices::update_price,
        handlers::bookings::admin_list_bookings,
        handlers::bookings::admin_update_booking,
        handlers::ai_config::get_config,
        handlers::ai_config::update_config,
        handlers::chat::admin_chat_logs,
    ),
    components(
        schemas(
            models::user::UserPublic,
            models::user::RegisterRequest,
            models::user::LoginRequest,
            models::user::RefreshRequest,
            models::user::ForgotPasswordRequest,
            models::user::ResetPasswordRequest,
            models::user::UpdateProfileRequest,
            models::user::AdminUpdateUserRequest,
            models::product::Product,
            models::product::CreateProductRequest,
            models::product::UpdateProductRequest,
            models::order::Order,
            models::order::OrderItem,
            models::order::PlaceOrderRequest,
            models::order::OrderItemRequest,
            models::order::AdminUpdateOrderRequest,
            models::blog::BlogPost,
            models::blog::CreatePostRequest,
            models::blog::UpdatePostRequest,
            models::chat::ChatMessage,
            models::chat::SendMessageRequest,
            models::resource::Resource,
            models::resource::CreateResourceRequest,
            models::inquiry::Inquiry,
            models::inquiry::CreateInquiryRequest,
            models::inquiry::UpdateInquiryRequest,
            models::farmer::Farmer,
            models::farmer::CreateFarmerRequest,
            models::farmer::UpdateFarmerRequest,
            models::price::CommodityPrice,
            models::price::CreatePriceRequest,
            models::price::UpdatePriceRequest,
            models::farm_profile::FarmProfile,
            models::farm_profile::UpsertFarmProfileRequest,
            models::farm_profile::CropLog,
            models::farm_profile::CreateCropLogRequest,
            models::booking::Booking,
            models::booking::CreateBookingRequest,
            models::booking::AdminUpdateBookingRequest,
            models::ai_config::AiConfig,
            models::ai_config::UpdateAiConfigRequest,
            handlers::gallery::GalleryImage,
            handlers::gallery::CreateImageRequest,
        )
    ),
    tags(
        (name = "health",       description = "Health check"),
        (name = "auth",         description = "Register, login, tokens, password reset"),
        (name = "products",     description = "Product catalogue"),
        (name = "blog",         description = "Blog posts"),
        (name = "gallery",      description = "Photo gallery"),
        (name = "farmers",      description = "Farmer directory"),
        (name = "prices",       description = "Commodity market prices"),
        (name = "inquiry",      description = "Contact / inquiry form"),
        (name = "chat",         description = "AI farming assistant (Groq)"),
        (name = "portal",       description = "Authenticated user portal"),
        (name = "orders",       description = "Order management"),
        (name = "resources",    description = "Downloadable resources"),
        (name = "farm_profile", description = "Farm profiles & crop logs"),
        (name = "bookings",     description = "Service bookings"),
        (name = "admin",        description = "Admin-only endpoints"),
        (name = "analytics",    description = "Dashboard analytics"),
        (name = "ai_config",    description = "AI assistant configuration"),
    ),
    security(
        ("bearer_auth" = [])
    ),
    modifiers(&SecurityAddon)
)]
struct ApiDoc;

struct SecurityAddon;

impl utoipa::Modify for SecurityAddon {
    fn modify(&self, openapi: &mut utoipa::openapi::OpenApi) {
        if let Some(components) = openapi.components.as_mut() {
            use utoipa::openapi::security::{HttpAuthScheme, HttpBuilder, SecurityScheme};
            components.add_security_scheme(
                "bearer_auth",
                SecurityScheme::Http(
                    HttpBuilder::new()
                        .scheme(HttpAuthScheme::Bearer)
                        .bearer_format("JWT")
                        .build(),
                ),
            );
        }
    }
}

#[tokio::main]
async fn main() {
    tracing_subscriber::registry()
        .with(tracing_subscriber::EnvFilter::new(
            std::env::var("RUST_LOG").unwrap_or_else(|_| "willbry_backend=debug,tower_http=debug".into()),
        ))
        .with(tracing_subscriber::fmt::layer())
        .init();

    let config = Arc::new(Config::from_env());
    let pool = create_pool(&config.database_url).await;

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to run migrations");

    let state = AppState {
        db: pool,
        config: config.clone(),
    };

    let cors = CorsLayer::new()
        .allow_origin([
            "http://localhost:5173".parse::<HeaderValue>().unwrap(),
            "http://127.0.0.1:5173".parse::<HeaderValue>().unwrap(),
        ])
        .allow_methods(Any)
        .allow_headers(Any);

    let app = Router::new()
        // ── SWAGGER DOCS ──────────────────────────────────
        .merge(SwaggerUi::new("/api/docs").url("/api/openapi.json", ApiDoc::openapi()))
        // ── HEALTH ────────────────────────────────────────
        .route("/health", get(handlers::health))
        // ── AUTH ──────────────────────────────────────────
        .route("/api/auth/register", post(handlers::auth::register))
        .route("/api/auth/login", post(handlers::auth::login))
        .route("/api/auth/refresh", post(handlers::auth::refresh_token))
        .route("/api/auth/logout", post(handlers::auth::logout))
        .route("/api/auth/forgot-password", post(handlers::auth::forgot_password))
        .route("/api/auth/reset-password", post(handlers::auth::reset_password))
        // ── PUBLIC ────────────────────────────────────────
        .route("/api/products", get(handlers::products::list_products))
        .route("/api/products/:slug", get(handlers::products::get_product))
        .route("/api/blog", get(handlers::blog::list_posts))
        .route("/api/blog/:slug", get(handlers::blog::get_post))
        .route("/api/gallery", get(handlers::gallery::list_images))
        .route("/api/farmers", get(handlers::farmers::list_farmers))
        .route("/api/prices", get(handlers::prices::list_prices))
        .route("/api/inquiries", post(handlers::inquiry::submit_inquiry))
        .route("/api/chat/preview", post(handlers::chat::preview_chat))
        // ── PORTAL (requires auth) ─────────────────────────
        .route("/api/portal/dashboard", get(handlers::users::portal_dashboard))
        .route("/api/portal/profile", get(handlers::users::get_profile).put(handlers::users::update_profile))
        .route("/api/portal/orders", get(handlers::orders::list_my_orders).post(handlers::orders::place_order))
        .route("/api/portal/orders/:id", get(handlers::orders::get_order).patch(handlers::orders::cancel_order))
        .route("/api/portal/chat", get(handlers::chat::get_history).post(handlers::chat::send_message))
        .route("/api/portal/resources", get(handlers::resources::list_resources))
        .route("/api/portal/resources/:id/download", get(handlers::resources::get_download_url))
        .route("/api/portal/farm-profile", get(handlers::farm_profile::get_farm_profile).put(handlers::farm_profile::upsert_farm_profile))
        .route("/api/portal/crop-logs", get(handlers::farm_profile::list_crop_logs).post(handlers::farm_profile::create_crop_log))
        .route("/api/portal/bookings", get(handlers::bookings::list_my_bookings).post(handlers::bookings::create_booking))
        .route("/api/portal/market-prices", get(handlers::prices::list_prices))
        // ── ADMIN (requires auth + admin role) ────────────
        .route("/api/admin/dashboard", get(handlers::analytics::admin_dashboard))
        .route("/api/admin/analytics", get(handlers::analytics::analytics_data))
        .route("/api/admin/users", get(handlers::users::admin_list_users))
        .route("/api/admin/users/:id", get(handlers::users::admin_get_user).patch(handlers::users::admin_update_user).delete(handlers::users::admin_delete_user))
        .route("/api/admin/orders", get(handlers::orders::admin_list_orders))
        .route("/api/admin/orders/:id", patch(handlers::orders::admin_update_order))
        .route("/api/admin/inquiries", get(handlers::inquiry::list_inquiries))
        .route("/api/admin/inquiries/:id", patch(handlers::inquiry::mark_read))
        .route("/api/admin/blog", get(handlers::blog::admin_list_posts).post(handlers::blog::create_post))
        .route("/api/admin/blog/:id", put(handlers::blog::update_post).delete(handlers::blog::delete_post))
        .route("/api/admin/products", get(handlers::products::admin_list_products).post(handlers::products::create_product))
        .route("/api/admin/products/:id", put(handlers::products::update_product).delete(handlers::products::delete_product))
        .route("/api/admin/gallery", get(handlers::gallery::admin_list_images).post(handlers::gallery::upload_image))
        .route("/api/admin/gallery/:id", delete(handlers::gallery::delete_image))
        .route("/api/admin/resources", get(handlers::resources::admin_list_resources).post(handlers::resources::upload_resource))
        .route("/api/admin/resources/:id", delete(handlers::resources::delete_resource))
        .route("/api/admin/farmers", get(handlers::farmers::admin_list_farmers).post(handlers::farmers::create_farmer))
        .route("/api/admin/farmers/:id", put(handlers::farmers::update_farmer).delete(handlers::farmers::delete_farmer))
        .route("/api/admin/prices", get(handlers::prices::admin_list_prices).post(handlers::prices::create_price))
        .route("/api/admin/prices/:id", put(handlers::prices::update_price))
        .route("/api/admin/bookings", get(handlers::bookings::admin_list_bookings))
        .route("/api/admin/bookings/:id", patch(handlers::bookings::admin_update_booking))
        .route("/api/admin/ai-config", get(handlers::ai_config::get_config).put(handlers::ai_config::update_config))
        .route("/api/admin/chat-logs", get(handlers::chat::admin_chat_logs))
        .with_state(state)
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    let port = std::env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let addr = format!("0.0.0.0:{}", port);
    tracing::info!("WillBry backend listening on {}", addr);
    tracing::info!("Swagger docs available at http://{}/api/docs", addr);

    let listener = tokio::net::TcpListener::bind(&addr).await.unwrap();
    axum::serve(listener, app).await.unwrap();
}