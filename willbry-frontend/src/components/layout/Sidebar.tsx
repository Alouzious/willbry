import { NavLink, useNavigate } from 'react-router-dom'
import { Leaf, LogOut, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

interface SidebarItem {
  label: string
  href: string
  icon: LucideIcon
}

interface SidebarProps {
  items: SidebarItem[]
  title: string
  onClose?: () => void
  mobile?: boolean
}

export default function Sidebar({ items, title, onClose, mobile = false }: SidebarProps) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <aside className="flex h-full w-72 flex-col bg-willbry-green-900 text-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-willbry-teal">
            <Leaf size={20} className="text-white" />
          </div>
          <div>
            <span className="block text-sm font-black leading-tight">WillBry</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-willbry-teal">
              {title}
            </span>
          </div>
        </div>

        {mobile && onClose && (
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-willbry-green-100 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <div className="border-b border-white/10 px-4 py-4">
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-willbry-teal text-sm font-black">
            {user?.full_name?.charAt(0) ?? 'U'}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{user?.full_name ?? 'WillBry User'}</p>
            <p className="truncate text-xs text-willbry-green-200">{user?.email ?? 'portal@willbry.com'}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {items.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            end={href.split('/').length <= 2}
            onClick={onClose}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition-all',
                isActive
                  ? 'bg-willbry-teal text-white shadow-sm'
                  : 'text-willbry-green-100 hover:bg-white/10 hover:text-white',
              ].join(' ')
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-3">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-willbry-green-100 transition-all hover:bg-red-500/20 hover:text-white"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}