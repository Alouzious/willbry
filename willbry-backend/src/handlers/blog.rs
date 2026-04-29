use axum::{extract::{State, Path, Query}, Json};
use serde_json::{json, Value};
use uuid::Uuid;

use crate::{
    AppState,
    errors::{AppError, AppResult},
    middleware::admin::AdminUser,
    models::blog::{BlogPost, BlogPostWithAuthor, CreatePostRequest, UpdatePostRequest, BlogQuery},
};

pub async fn list_posts(
    State(state): State<AppState>,
    Query(q): Query<BlogQuery>,
) -> AppResult<Json<Value>> {
    let page = q.page.unwrap_or(1).max(1);
    let per_page = q.per_page.unwrap_or(10).min(50);
    let offset = (page - 1) * per_page;

    let posts = sqlx::query_as::<_, BlogPostWithAuthor>(
        r#"SELECT b.*, COALESCE(u.full_name, 'WillBry Team') AS author_name
           FROM blog_posts b
           LEFT JOIN users u ON u.id = b.author_id
           WHERE b.published = true
           ORDER BY b.created_at DESC
           LIMIT $1 OFFSET $2"#
    )
    .bind(per_page)
    .bind(offset)
    .fetch_all(&state.db)
    .await?;

    let total = sqlx::query_scalar::<_, i64>("SELECT COUNT(*) FROM blog_posts WHERE published = true")
        .fetch_one(&state.db)
        .await?;

    Ok(Json(json!({
        "success": true,
        "data": posts,
        "pagination": { "page": page, "per_page": per_page, "total": total }
    })))
}

pub async fn get_post(
    State(state): State<AppState>,
    Path(slug): Path<String>,
) -> AppResult<Json<Value>> {
    let post = sqlx::query_as::<_, BlogPostWithAuthor>(
        r#"SELECT b.*, COALESCE(u.full_name, 'WillBry Team') AS author_name
           FROM blog_posts b
           LEFT JOIN users u ON u.id = b.author_id
           WHERE b.slug = $1 AND b.published = true"#
    )
    .bind(&slug)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Blog post not found".to_string()))?;

    sqlx::query("UPDATE blog_posts SET views = views + 1 WHERE id = $1")
        .bind(post.id)
        .execute(&state.db)
        .await?;

    Ok(Json(json!({ "success": true, "data": post })))
}

pub async fn admin_list_posts(
    State(state): State<AppState>,
    _admin: AdminUser,
) -> AppResult<Json<Value>> {
    let posts = sqlx::query_as::<_, BlogPost>(
        "SELECT * FROM blog_posts ORDER BY created_at DESC"
    )
    .fetch_all(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": posts })))
}

pub async fn create_post(
    State(state): State<AppState>,
    admin: AdminUser,
    Json(body): Json<CreatePostRequest>,
) -> AppResult<Json<Value>> {
    let post = sqlx::query_as::<_, BlogPost>(
        r#"INSERT INTO blog_posts (id, title, slug, content, excerpt, author_id, category, cover_image, published)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *"#
    )
    .bind(Uuid::new_v4())
    .bind(&body.title)
    .bind(&body.slug)
    .bind(&body.content)
    .bind(&body.excerpt)
    .bind(admin.0.user_id)
    .bind(&body.category)
    .bind(&body.cover_image)
    .bind(body.published.unwrap_or(false))
    .fetch_one(&state.db)
    .await?;

    Ok(Json(json!({ "success": true, "data": post })))
}

pub async fn update_post(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
    Json(body): Json<UpdatePostRequest>,
) -> AppResult<Json<Value>> {
    let post = sqlx::query_as::<_, BlogPost>(
        r#"UPDATE blog_posts SET
            title = COALESCE($1, title),
            slug = COALESCE($2, slug),
            content = COALESCE($3, content),
            excerpt = COALESCE($4, excerpt),
            category = COALESCE($5, category),
            cover_image = COALESCE($6, cover_image),
            published = COALESCE($7, published),
            updated_at = NOW()
           WHERE id = $8 RETURNING *"#
    )
    .bind(&body.title)
    .bind(&body.slug)
    .bind(&body.content)
    .bind(&body.excerpt)
    .bind(&body.category)
    .bind(&body.cover_image)
    .bind(body.published)
    .bind(id)
    .fetch_optional(&state.db)
    .await?
    .ok_or_else(|| AppError::NotFound("Post not found".to_string()))?;

    Ok(Json(json!({ "success": true, "data": post })))
}

pub async fn delete_post(
    State(state): State<AppState>,
    _admin: AdminUser,
    Path(id): Path<Uuid>,
) -> AppResult<Json<Value>> {
    sqlx::query("DELETE FROM blog_posts WHERE id = $1").bind(id).execute(&state.db).await?;
    Ok(Json(json!({ "success": true, "message": "Post deleted" })))
}