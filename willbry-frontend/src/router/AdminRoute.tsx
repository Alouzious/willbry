import { Navigate, Outlet } from 'react-router-dom'
import { isAuthenticated, isAdmin } from '../lib/auth'

export default function AdminRoute() {
  if (!isAuthenticated()) return <Navigate to="/login" replace />
  if (!isAdmin()) return <Navigate to="/portal" replace />
  return <Outlet />
}
