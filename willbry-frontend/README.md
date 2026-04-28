# WillBry Agro-Innovations — Frontend

> Smart Farming, Smarter Foods — React frontend for WillBry Platform 2.0
> Built with React 18 + TypeScript + Tailwind CSS + Vite
> WillBry Agro-Innovations Limited, Kabale Municipality, Uganda

---

## Overview

This is the frontend application for WillBry Platform 2.0. It is a React single-page application that connects to the WillBry Rust backend API. It serves three distinct user experiences from one codebase — a public marketing website, a registered user portal for farmers and clients, and a staff admin panel.

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 | Type safety |
| Vite | 6 | Build tool and dev server |
| Tailwind CSS | 3 | Utility-first styling |
| React Router | 6 | Client-side routing |
| Axios | 1 | HTTP client with interceptors |
| Zustand | 4 | Lightweight state management |
| Lucide React | latest | SVG icon library |
| Recharts | 2 | Charts for analytics dashboard |
| TipTap | 2 | Rich text editor for blog posts |
| React Hot Toast | 2 | Toast notifications |
| Zod | 3 | Form validation schemas |
| date-fns | 3 | Date formatting utilities |

---

## Project Structure

```
willbry-frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.tsx                        # App entry point
│   ├── App.tsx                         # Root with providers and router
│   ├── index.css                       # Tailwind directives + global styles
│   │
│   ├── types/                          # TypeScript interfaces
│   │   ├── user.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── blog.ts
│   │   ├── chat.ts
│   │   └── index.ts
│   │
│   ├── lib/                            # Utilities and API client
│   │   ├── api.ts                      # Axios instance with auth interceptors
│   │   ├── auth.ts                     # Token storage helpers
│   │   ├── utils.ts                    # Date, currency, string helpers
│   │   └── validators.ts               # Zod validation schemas
│   │
│   ├── context/                        # React context providers
│   │   ├── AuthContext.tsx             # User session, login, logout
│   │   └── CartContext.tsx             # Shopping cart state
│   │
│   ├── hooks/                          # Custom React hooks
│   │   ├── useAuth.ts                  # Auth state and actions
│   │   ├── useApi.ts                   # Generic fetch with loading/error
│   │   ├── useCart.ts                  # Cart actions
│   │   └── useChat.ts                  # AI chat state and streaming
│   │
│   ├── router/                         # React Router v6 setup
│   │   ├── index.tsx                   # All routes defined here
│   │   ├── ProtectedRoute.tsx          # Redirects unauthenticated users
│   │   └── AdminRoute.tsx              # Redirects non-admin users
│   │
│   ├── components/                     # Reusable UI components
│   │   ├── ui/                         # Base design system components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Spinner.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                     # Page layout components
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── PageBanner.tsx
│   │   │
│   │   ├── public/                     # Public website components
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── TestimonialsCarousel.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   ├── TeamCard.tsx
│   │   │   └── AiPreviewWidget.tsx
│   │   │
│   │   ├── portal/                     # User portal components
│   │   │   ├── DashboardStats.tsx
│   │   │   ├── OrdersTable.tsx
│   │   │   ├── ChatWindow.tsx
│   │   │   ├── ChatMessage.tsx
│   │   │   ├── ResourceCard.tsx
│   │   │   ├── FarmProfileForm.tsx
│   │   │   ├── PricesTable.tsx
│   │   │   └── BookingForm.tsx
│   │   │
│   │   └── admin/                      # Admin panel components
│   │       ├── AdminStats.tsx
│   │       ├── UsersTable.tsx
│   │       ├── OrdersManager.tsx
│   │       ├── ContentEditor.tsx
│   │       ├── RichTextEditor.tsx
│   │       ├── ImageUploader.tsx
│   │       ├── AiConfig.tsx
│   │       └── AnalyticsChart.tsx
│   │
│   └── pages/                          # One file per route
│       ├── public/
│       │   ├── HomePage.tsx
│       │   ├── AboutPage.tsx
│       │   ├── ServicesPage.tsx
│       │   ├── ProductsPage.tsx
│       │   ├── BlogPage.tsx
│       │   ├── BlogPostPage.tsx
│       │   ├── GalleryPage.tsx
│       │   ├── InnovationPage.tsx
│       │   ├── ConsultancyPage.tsx
│       │   ├── FarmerDirectoryPage.tsx
│       │   ├── ContactPage.tsx
│       │   └── NotFoundPage.tsx
│       │
│       ├── auth/
│       │   ├── LoginPage.tsx
│       │   ├── RegisterPage.tsx
│       │   └── ForgotPasswordPage.tsx
│       │
│       ├── portal/
│       │   ├── PortalDashboard.tsx
│       │   ├── PortalOrders.tsx
│       │   ├── PortalOrderDetail.tsx
│       │   ├── PortalAiChat.tsx
│       │   ├── PortalResources.tsx
│       │   ├── PortalFarmProfile.tsx
│       │   ├── PortalMarketPrices.tsx
│       │   ├── PortalBookings.tsx
│       │   └── PortalSettings.tsx
│       │
│       └── admin/
│           ├── AdminDashboard.tsx
│           ├── AdminUsers.tsx
│           ├── AdminUserDetail.tsx
│           ├── AdminOrders.tsx
│           ├── AdminInquiries.tsx
│           ├── AdminBlog.tsx
│           ├── AdminBlogEditor.tsx
│           ├── AdminProducts.tsx
│           ├── AdminGallery.tsx
│           ├── AdminResources.tsx
│           ├── AdminFarmers.tsx
│           ├── AdminPrices.tsx
│           ├── AdminAiConfig.tsx
│           └── AdminAnalytics.tsx
│
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Routing

The app uses React Router v6 with three route groups.

Public routes are accessible to everyone with no authentication required. These cover the homepage, about, services, products, blog, gallery, innovation, consultancy, farmer directory, and contact pages.

Portal routes are protected. Any unauthenticated user trying to access them is redirected to the login page. These cover the user dashboard, orders, AI chat, resources, farm profile, market prices, bookings, and settings.

Admin routes require both authentication and the admin role. Any user without admin access is redirected to the portal. These cover user management, orders management, content management, analytics, and AI configuration.

---

## Authentication Flow

Login and registration call the backend API and receive a JWT access token and a refresh token. The access token is stored in localStorage and attached to every API request via an Axios interceptor. When a request returns 401, the interceptor automatically calls the refresh endpoint to get a new access token and retries the original request. On logout, all tokens are cleared and the user is redirected to the login page.

---

## Brand Colors

The WillBry brand palette is defined in tailwind.config.js and available as Tailwind utility classes throughout the app.

| Token | Hex | Usage |
|---|---|---|
| willbry-green-500 | #2d6a4f | Primary brand green — buttons, headings |
| willbry-green-700 | #1f4f2b | Hover states, dark sections |
| willbry-green-900 | #0d2b18 | Footer, dark backgrounds |
| willbry-accent | #e76f51 | CTAs, highlights, badges |
| willbry-teal | #52b788 | Secondary accents, icons |

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher
- WillBry backend running at http://localhost:8080

### Setup

```bash
# Clone the repo
git clone https://github.com/Alouzious/willbry.git
cd willbry-ltd/willbry-frontend

# Install dependencies
npm install

# Copy env file
cp .env.example .env

# Start dev server
npm run dev
```

App runs at http://localhost:5173

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| VITE_API_URL | YES | Backend API base URL |
| VITE_APP_NAME | No | App display name |

For local development set VITE_API_URL to http://localhost:8080/api

For production set VITE_API_URL to https://api.willbry.com/api

---

## Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Type check without building
npm run tsc

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Deployment

This frontend is designed to deploy on Vercel.

1. Connect Vercel to this GitHub repository
2. Set the root directory to willbry-frontend/
3. Set build command to npm run build
4. Set output directory to dist
5. Add VITE_API_URL environment variable pointing to the live backend
6. Every push to main triggers an automatic redeploy
7. Every pull request gets a preview deployment URL

---

## AI Chat Feature

The AI farming assistant on the portal chat page connects to the backend which streams responses from Groq API using Server-Sent Events. The frontend renders tokens as they arrive giving a near-instant feel. The assistant is pre-configured to answer questions about Uganda farming, crop diseases, market prices, and WillBry services.

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