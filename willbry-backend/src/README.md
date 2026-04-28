# WillBry Agro-Innovations — Backend API

> Smart Farming, Smarter Foods — REST API powering the WillBry Platform 2.0
> Built with Rust + Axum + PostgreSQL + Groq AI
> WillBry Agro-Innovations Limited, Kabale Municipality, Uganda

---

## Overview

This is the backend API server for WillBry Platform 2.0. It is a high-performance REST API built in Rust using the Axum framework. It handles authentication, business logic, database operations, AI chat via Groq, file storage via Cloudflare R2, and serves three platform layers — the public website, the registered user portal, and the staff admin panel.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| Rust | 1.77+ | Backend language |
| Axum | 0.7 | Web framework |
| PostgreSQL | 15 | Primary database |
| NeonDB | — | Serverless Postgres hosting |
| sqlx | 0.7 | Async DB queries with compile-time checks |
| Groq API | Llama 3.3 70B | AI farming assistant |
| Argon2 | 0.5 | Password hashing |
| JWT | jsonwebtoken 9 | Authentication tokens |
| Cloudflare R2 | — | File and image storage |
| Resend | — | Transactional email |
| Tower HTTP | 0.5 | CORS, tracing middleware |

---

## Project Structure

```
willbry-backend/
├── src/
│   ├── main.rs
│   ├── config.rs
│   ├── errors.rs
│   ├── db/
│   │   ├── mod.rs
│   │   └── pool.rs
│   ├── models/
│   │   ├── mod.rs
│   │   ├── user.rs
│   │   ├── product.rs
│   │   ├── order.rs
│   │   ├── blog.rs
│   │   ├── chat.rs
│   │   ├── resource.rs
│   │   ├── inquiry.rs
│   │   ├── farmer.rs
│   │   ├── price.rs
│   │   ├── farm_profile.rs
│   │   ├── booking.rs
│   │   └── ai_config.rs
│   ├── handlers/
│   │   ├── mod.rs
│   │   ├── auth.rs
│   │   ├── users.rs
│   │   ├── products.rs
│   │   ├── orders.rs
│   │   ├── blog.rs
│   │   ├── chat.rs
│   │   ├── gallery.rs
│   │   ├── inquiry.rs
│   │   ├── farmers.rs
│   │   ├── prices.rs
│   │   ├── resources.rs
│   │   ├── farm_profile.rs
│   │   ├── bookings.rs
│   │   ├── analytics.rs
│   │   └── ai_config.rs
│   ├── middleware/
│   │   ├── mod.rs
│   │   ├── auth.rs
│   │   └── admin.rs
│   └── services/
│       ├── mod.rs
│       ├── jwt.rs
│       ├── groq.rs
│       ├── r2.rs
│       └── email.rs
└── migrations/
    ├── 001_create_users.sql
    ├── 002_create_products.sql
    ├── 003_create_orders.sql
    ├── 004_create_blog.sql
    ├── 005_create_chat.sql
    ├── 006_create_resources.sql
    ├── 007_create_inquiries.sql
    ├── 008_create_farmers.sql
    ├── 009_create_prices.sql
    ├── 010_create_farm_profiles.sql
    ├── 011_create_bookings.sql
    ├── 012_create_gallery.sql
    └── 013_create_ai_config.sql
```

---

## API Endpoints

### Public — No auth required

```
GET     /health
GET     /api/products
GET     /api/products/:slug
GET     /api/blog
GET     /api/blog/:slug
GET     /api/gallery
GET     /api/farmers
GET     /api/prices
POST    /api/inquiries
POST    /api/chat/preview
```

### Authentication

```
POST    /api/auth/register
POST    /api/auth/login
POST    /api/auth/refresh
POST    /api/auth/logout
POST    /api/auth/forgot-password
POST    /api/auth/reset-password
```

### User Portal — JWT required

```
GET     /api/portal/dashboard
GET     /api/portal/orders
POST    /api/portal/orders
GET     /api/portal/orders/:id
PATCH   /api/portal/orders/:id
POST    /api/portal/chat
GET     /api/portal/chat
GET     /api/portal/resources
GET     /api/portal/resources/:id/download
GET     /api/portal/farm-profile
PUT     /api/portal/farm-profile
GET     /api/portal/crop-logs
POST    /api/portal/crop-logs
GET     /api/portal/bookings
POST    /api/portal/bookings
GET     /api/portal/profile
PUT     /api/portal/profile
```

### Admin Panel — JWT + role=admin required

```
GET     /api/admin/dashboard
GET     /api/admin/users
PATCH   /api/admin/users/:id
DELETE  /api/admin/users/:id
GET     /api/admin/orders
PATCH   /api/admin/orders/:id
GET     /api/admin/inquiries
PATCH   /api/admin/inquiries/:id
GET     /api/admin/blog
POST    /api/admin/blog
PUT     /api/admin/blog/:id
DELETE  /api/admin/blog/:id
GET     /api/admin/products
POST    /api/admin/products
PUT     /api/admin/products/:id
DELETE  /api/admin/products/:id
GET     /api/admin/gallery
POST    /api/admin/gallery
DELETE  /api/admin/gallery/:id
GET     /api/admin/resources
POST    /api/admin/resources
DELETE  /api/admin/resources/:id
GET     /api/admin/farmers
POST    /api/admin/farmers
PUT     /api/admin/farmers/:id
DELETE  /api/admin/farmers/:id
GET     /api/admin/prices
PUT     /api/admin/prices/:id
GET     /api/admin/ai-config
PUT     /api/admin/ai-config
GET     /api/admin/analytics
GET     /api/admin/chat-logs
```

---

## Getting Started

### Prerequisites

- Rust stable — https://rustup.rs
- sqlx-cli for running migrations

```bash
cargo install sqlx-cli --no-default-features --features postgres
```

- A NeonDB account — https://neon.tech
- A Groq API key — https://console.groq.com

### Local Setup

```bash
# Clone the repo
git clone https://github.com/Alouzious/willbry.git
cd willbry-ltd/willbry-backend

# Copy env and fill in your values
cp .env.example .env

# Run database migrations
sqlx migrate run

# Start the development server
cargo run
```

Server starts at http://localhost:8080

Health check: GET http://localhost:8080/health

---

## Environment Variables

Copy .env.example to .env and fill in the values below.

| Variable | Required | Description |
|---|---|---|
| DATABASE_URL | YES | NeonDB PostgreSQL connection string |
| JWT_SECRET | YES | Random secret string, minimum 32 characters |
| GROQ_API_KEY | YES | From console.groq.com |
| JWT_ACCESS_EXPIRY | No | Seconds. Default 900 (15 minutes) |
| JWT_REFRESH_EXPIRY | No | Seconds. Default 604800 (7 days) |
| R2_ACCOUNT_ID | No | Cloudflare R2 — needed for file uploads |
| R2_ACCESS_KEY_ID | No | Cloudflare R2 |
| R2_SECRET_ACCESS_KEY | No | Cloudflare R2 |
| R2_BUCKET_NAME | No | Default: willbry-assets |
| R2_PUBLIC_URL | No | Public URL for R2 bucket |
| RESEND_API_KEY | No | For sending transactional emails |
| FROM_EMAIL | No | Default: noreply@willbry.com |
| APP_URL | No | Backend URL. Default: http://localhost:8080 |
| FRONTEND_URL | No | Frontend URL for CORS. Default: http://localhost:5173 |
| PORT | No | Server port. Default: 8080 |

---

## Database

PostgreSQL hosted on NeonDB. All 13 migration files are in the migrations/ folder and are applied automatically on startup via sqlx::migrate!

To revert all migrations and re-run from scratch:

```bash
sqlx migrate revert --target-version 0
sqlx migrate run
```

---

## Authentication

- Passwords are hashed using Argon2 (memory-hard, more secure than bcrypt)
- Access tokens expire in 15 minutes by default
- Refresh tokens expire in 7 days
- All protected routes validate the JWT on every request server-side
- Admin routes additionally verify the role claim equals admin

---

## AI Farming Assistant

The AI chat is powered by Groq API using the llama-3.3-70b-versatile model. The system prompt is stored in the ai_config database table and can be edited by admin staff from the admin panel without any redeployment. The assistant is pre-configured with Uganda farming context covering Irish potatoes, maize, coffee, beans, and sorghum in the Kigezi highlands region.

Chat responses are streamed token-by-token to the frontend using Server-Sent Events for fast perceived performance.

---

## Deployment

This backend is designed to deploy on Railway.

1. Create a new project on Railway
2. Connect it to this GitHub repository
3. Set the root directory to willbry-backend/
4. Add all environment variables in the Railway dashboard
5. Railway detects Rust automatically and builds with cargo build --release
6. Every push to main triggers an automatic redeploy

For the Dockerfile-based deploy:

```bash
docker build -t willbry-backend .
docker run -p 8080:8080 --env-file .env willbry-backend
```

---

## Security

- Argon2 password hashing
- JWT with short-lived access tokens
- Role-based access control enforced server-side on every request
- Parameterized SQL queries via sqlx — no raw string interpolation
- CORS whitelist — only the frontend domain is allowed
- Input validation on all POST/PUT endpoints

---

## Built By

Alouzious Muhereza — Technical Lead
For WillBry Agro-Innovations Limited
Kabale Municipality, Kijuguta, Northern Division, Uganda
Founded by Dr. Byamukama Willbroad

---

## License

Private. All rights reserved.
Copyright 2026 WillBry Agro-Innovations Limited