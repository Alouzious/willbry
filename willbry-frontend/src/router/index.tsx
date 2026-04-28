import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

// Public pages
import HomePage from '../pages/public/HomePage'
import AboutPage from '../pages/public/AboutPage'
import ServicesPage from '../pages/public/ServicesPage'
import ProductsPage from '../pages/public/ProductsPage'
import BlogPage from '../pages/public/BlogPage'
import BlogPostPage from '../pages/public/BlogPostPage'
import GalleryPage from '../pages/public/GalleryPage'
import InnovationPage from '../pages/public/InnovationPage'
import ConsultancyPage from '../pages/public/ConsultancyPage'
import FarmerDirectoryPage from '../pages/public/FarmerDirectoryPage'
import ContactPage from '../pages/public/ContactPage'
import NotFoundPage from '../pages/public/NotFoundPage'

// Auth pages
import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'

// Portal pages
import PortalDashboard from '../pages/portal/PortalDashboard'
import PortalOrders from '../pages/portal/PortalOrders'
import PortalOrderDetail from '../pages/portal/PortalOrderDetail'
import PortalAiChat from '../pages/portal/PortalAiChat'
import PortalResources from '../pages/portal/PortalResources'
import PortalFarmProfile from '../pages/portal/PortalFarmProfile'
import PortalMarketPrices from '../pages/portal/PortalMarketPrices'
import PortalBookings from '../pages/portal/PortalBookings'
import PortalSettings from '../pages/portal/PortalSettings'

// Admin pages
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminUsers from '../pages/admin/AdminUsers'
import AdminOrders from '../pages/admin/AdminOrders'
import AdminInquiries from '../pages/admin/AdminInquiries'
import AdminBlog from '../pages/admin/AdminBlog'
import AdminBlogEditor from '../pages/admin/AdminBlogEditor'
import AdminProducts from '../pages/admin/AdminProducts'
import AdminGallery from '../pages/admin/AdminGallery'
import AdminResources from '../pages/admin/AdminResources'
import AdminFarmers from '../pages/admin/AdminFarmers'
import AdminPrices from '../pages/admin/AdminPrices'
import AdminAiConfig from '../pages/admin/AdminAiConfig'
import AdminAnalytics from '../pages/admin/AdminAnalytics'

export const router = createBrowserRouter([
  // Public
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/services', element: <ServicesPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/gallery', element: <GalleryPage /> },
  { path: '/innovation', element: <InnovationPage /> },
  { path: '/consultancy', element: <ConsultancyPage /> },
  { path: '/farmers', element: <FarmerDirectoryPage /> },
  { path: '/contact', element: <ContactPage /> },

  // Auth
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },

  // Portal (protected)
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/portal', element: <PortalDashboard /> },
      { path: '/portal/orders', element: <PortalOrders /> },
      { path: '/portal/orders/:id', element: <PortalOrderDetail /> },
      { path: '/portal/chat', element: <PortalAiChat /> },
      { path: '/portal/resources', element: <PortalResources /> },
      { path: '/portal/farm-profile', element: <PortalFarmProfile /> },
      { path: '/portal/prices', element: <PortalMarketPrices /> },
      { path: '/portal/bookings', element: <PortalBookings /> },
      { path: '/portal/settings', element: <PortalSettings /> },
    ],
  },

  // Admin (admin only)
  {
    element: <AdminRoute />,
    children: [
      { path: '/admin', element: <AdminDashboard /> },
      { path: '/admin/users', element: <AdminUsers /> },
      { path: '/admin/orders', element: <AdminOrders /> },
      { path: '/admin/inquiries', element: <AdminInquiries /> },
      { path: '/admin/blog', element: <AdminBlog /> },
      { path: '/admin/blog/new', element: <AdminBlogEditor /> },
      { path: '/admin/blog/:id/edit', element: <AdminBlogEditor /> },
      { path: '/admin/products', element: <AdminProducts /> },
      { path: '/admin/gallery', element: <AdminGallery /> },
      { path: '/admin/resources', element: <AdminResources /> },
      { path: '/admin/farmers', element: <AdminFarmers /> },
      { path: '/admin/prices', element: <AdminPrices /> },
      { path: '/admin/ai-config', element: <AdminAiConfig /> },
      { path: '/admin/analytics', element: <AdminAnalytics /> },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
])
