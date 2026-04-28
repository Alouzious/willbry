import { NavLink, useLocation } from 'react-router-dom'
import {
  Leaf, Home, Package, MessageSquare, FileText, Users, BarChart2,
  Settings, DollarSign, Calendar, LogOut, Briefcase, Image,
  Cpu, Globe, Bot, UserCheck, Bell
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

interface SidebarProps {
  role: 'portal' | 'admin'
}

const portalLinks = [
  { label: 'Dashboard', to: '/portal', icon: Home },
  { label: 'Orders', to: '/portal/orders', icon: Package },
  { label: 'AI Chat', to: '/portal/chat', icon: MessageSquare },
  { label: 'Resources', to: '/portal/resources', icon: FileText },
  { label: 'Farm Profile', to: '/portal/farm-profile', icon: Leaf },
  { label: 'Market Prices', to: '/portal/prices', icon: DollarSign },
  { label: 'Bookings', to: '/portal/bookings', icon: Calendar },
  { label: 'Settings', to: '/portal/settings', icon: Settings },
]

const adminLinks = [
  { label: 'Dashboard', to: '/admin', icon: Home },
  { label: 'Users', to: '/admin/users', icon: Users },
  { label: 'Orders', to: '/admin/orders', icon: Package },
  { label: 'Blog', to: '/admin/blog', icon: FileText },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Gallery', to: '/admin/gallery', icon: Image },
  { label: 'Resources', to: '/admin/resources', icon: Globe },
  { label: 'Farmers', to: '/admin/farmers', icon: UserCheck },
  { label: 'Prices', to: '/admin/prices', icon: DollarSign },
  { label: 'AI Config', to: '/admin/ai-config', icon: Cpu },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart2 },
  { label: 'Inquiries', to: '/admin/inquiries', icon: Bell },
]

export default function Sidebar({ role }: SidebarProps) {
  const { user, logout } = useAuth()
  const location = useLocation()
  const links = role === 'admin' ? adminLinks : portalLinks

  const isActive = (to: string) => {
    if (to === '/portal' || to === '/admin') {
      return location.pathname === to
    }
    return location.pathname.startsWith(to)
  }

  return (
    <div className="w-64 bg-[#0d2b18] h-screen flex flex-col shrink-0">
      <div className="px-6 py-5 border-b border-[#1f4f2b]">
        <div className="flex items-center gap-2">
          <Leaf className="h-7 w-7 text-[#52b788]" />
          <span className="text-white font-bold text-lg">WillBry</span>
        </div>
        <div className="mt-1 text-xs text-[#52b788] font-medium uppercase tracking-wider">
          {role === 'admin' ? 'Admin Panel' : 'Farmer Portal'}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={() =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive(to)
                  ? 'bg-[#2d6a4f] text-white'
                  : 'text-gray-300 hover:bg-[#1f4f2b] hover:text-white'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-[#1f4f2b]">
        <div className="flex items-center gap-3 px-3 mb-3">
          <div className="h-8 w-8 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-sm font-medium">
            {user?.full_name?.[0] || 'U'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{user?.full_name}</p>
            <p className="text-gray-400 text-xs truncate">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-[#1f4f2b] hover:text-red-400 transition-colors w-full"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
        {role === 'admin' ? (
          <NavLink to="/admin/ai-config" className="sr-only">
            <Bot className="h-4 w-4" />
          </NavLink>
        ) : (
          <NavLink to="/portal/settings" className="sr-only">
            <Briefcase className="h-4 w-4" />
          </NavLink>
        )}
      </div>
    </div>
  )
}
