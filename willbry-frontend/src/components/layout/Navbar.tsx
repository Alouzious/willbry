import { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  Leaf,
  Menu,
  X,
  ChevronDown,
  ShoppingCart,
  User,
  LogOut,
  Bot,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Innovation', href: '/innovation' },
      { label: 'Consultancy', href: '/consultancy' },
    ],
  },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'Farmers', href: '/farmers' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  const { isAuth, isAdmin, user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled
          ? 'border-b border-willbry-green-100 bg-white/95 shadow-nav backdrop-blur-xl'
          : 'bg-white/80 backdrop-blur-md',
      ].join(' ')}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <Link to="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-willbry-green-500 to-willbry-teal shadow-card transition-transform duration-200 group-hover:scale-105">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <span className="block text-base font-black tracking-tight text-willbry-green-900">
              WillBry
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-willbry-teal">
              Agro-Innovations
            </span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setDropdown(link.label)}
                onMouseLeave={() => setDropdown(null)}
              >
                <button className="flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-semibold text-willbry-green-800 transition-all hover:bg-willbry-green-50 hover:text-willbry-green-500">
                  {link.label}
                  <ChevronDown
                    size={14}
                    className={dropdown === link.label ? 'rotate-180 transition-transform' : 'transition-transform'}
                  />
                </button>

                {dropdown === link.label && (
                  <div className="absolute left-0 top-full mt-2 w-56 rounded-2xl border border-willbry-green-100 bg-white p-2 shadow-card-hover">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className="block rounded-xl px-4 py-2.5 text-sm font-medium text-willbry-green-800 transition-all hover:bg-willbry-green-50 hover:text-willbry-green-600"
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm font-semibold transition-all',
                    isActive
                      ? 'bg-willbry-green-50 text-willbry-green-600'
                      : 'text-willbry-green-800 hover:bg-willbry-green-50 hover:text-willbry-green-500',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {/* Ask AI button */}
          <a
            href="#ai-chat"
            className="flex items-center gap-2 rounded-xl border border-willbry-green-200 bg-willbry-green-50 px-3 py-2 text-sm font-bold text-willbry-green-700 transition-all hover:bg-willbry-green-100 hover:text-willbry-green-600"
          >
            <Bot size={16} />
            Ask AI
          </a>

          <Link
            to="/products"
            className="relative rounded-xl p-2.5 text-willbry-green-700 transition-all hover:bg-willbry-green-50 hover:text-willbry-green-500"
            aria-label="Cart"
          >
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-willbry-accent px-1 text-[10px] font-black text-white">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </Link>

          {isAuth ? (
            <>
              <Link
                to={isAdmin ? '/admin' : '/portal'}
                className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-willbry-green-800 transition-all hover:bg-willbry-green-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-willbry-green-500 text-xs font-black text-white">
                  {user?.full_name?.charAt(0) ?? 'U'}
                </div>
                <span className="max-w-[120px] truncate">{user?.full_name?.split(' ')[0] ?? 'Dashboard'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-xl p-2.5 text-gray-400 transition-all hover:bg-red-50 hover:text-red-600"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl px-4 py-2 text-sm font-bold text-willbry-green-700 transition-all hover:bg-willbry-green-50"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="rounded-xl bg-willbry-green-500 px-4 py-2 text-sm font-black text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-willbry-green-600 hover:shadow-card-hover"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="rounded-xl p-2 text-willbry-green-800 transition-all hover:bg-willbry-green-50 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-t border-willbry-green-100 bg-white px-4 py-4 shadow-lg lg:hidden">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <NavLink
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    [
                      'block rounded-xl px-4 py-3 text-sm font-bold',
                      isActive ? 'bg-willbry-green-50 text-willbry-green-600' : 'text-willbry-green-800',
                    ].join(' ')
                  }
                >
                  {link.label}
                </NavLink>

                {link.children?.map((child) => (
                  <NavLink
                    key={child.href}
                    to={child.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-xl px-8 py-2 text-sm font-medium text-gray-600 hover:text-willbry-green-600"
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            ))}

            {/* Ask AI — mobile */}
            <a
              href="#ai-chat"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-xl bg-willbry-green-50 px-4 py-3 text-sm font-bold text-willbry-green-700"
            >
              <Bot size={16} />
              Ask WillBry AI
            </a>
          </div>

          <div className="mt-4 grid gap-2 border-t border-willbry-green-100 pt-4">
            {isAuth ? (
              <>
                <Link
                  to={isAdmin ? '/admin' : '/portal'}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-willbry-green-500 px-4 py-3 text-sm font-black text-white"
                >
                  <User size={16} /> Dashboard
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    handleLogout()
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-red-100 px-4 py-3 text-sm font-bold text-red-600"
                >
                  <LogOut size={16} /> Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-willbry-green-200 px-4 py-3 text-center text-sm font-bold text-willbry-green-700"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl bg-willbry-green-500 px-4 py-3 text-center text-sm font-black text-white"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}