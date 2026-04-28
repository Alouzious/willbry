import { NavLink, useNavigate } from 'react-router-dom'
import { Leaf, LogOut, X } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

interface SidebarProps {
  items: NavItem[]
  title: string
  onClose?: () => void
  mobile?: boolean
}

export default function Sidebar({ items, title, onClose, mobile }: SidebarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className={`flex flex-col h-full bg-willbry-green-900 text-white ${mobile ? 'w-64' : 'w-64'}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-willbry-teal rounded-lg flex items-center justify-center">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <span className="block font-bold text-sm text-white">WillBry</span>
            <span className="block text-[9px] tracking-widest uppercase text-willbry-teal font-medium">{title}</span>
          </div>
        </div>
        {mobile && onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
            <X size={18} />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-4 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-willbry-teal flex items-center justify-center text-white font-bold text-sm shrink-0">
            {user?.full_name?.charAt(0) ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.full_name ?? 'User'}</p>
            <p className="text-xs text-willbry-green-300 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
        {items.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            end={href.split('/').length <= 2}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-willbry-teal text-white shadow-sm'
                  : 'text-willbry-green-200 hover:text-white hover:bg-white/10'
              }`
            }
          >
            <Icon size={17} className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-willbry-green-200 hover:text-white hover:bg-red-500/20 transition-all"
        >
          <LogOut size={17} className="shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}