import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, ChevronDown, Leaf, ShoppingCart, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

const navLinks = [
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
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)
  const { isAuth, isAdmin, user, logout } = useAuth()
  const { count } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-nav'
          : 'bg-transparent',
      ].join(' ')}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-willbry-green-500 rounded-lg flex items-center justify-center group-hover:bg-willbry-green-600 transition-colors">
              <Leaf size={18} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="block text-willbry-green-900 font-bold text-base tracking-tight">WillBry</span>
              <span className="block text-willbry-teal text-[10px] font-medium tracking-widest uppercase">Agro-Innovations</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setDropdown(link.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-willbry-green-800 hover:text-willbry-green-500 rounded-lg hover:bg-willbry-green-50 transition-all">
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} />
                  </button>
                  {dropdown === link.label && (
                    <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-card border border-willbry-green-100 py-1 animate-fade-in">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-willbry-green-800 hover:bg-willbry-green-50 hover:text-willbry-green-600 transition-colors"
                          onClick={() => setDropdown(null)}
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
                    `px-3 py-2 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-willbry-green-500 bg-willbry-green-50'
                        : 'text-willbry-green-800 hover:text-willbry-green-500 hover:bg-willbry-green-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
          </div>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Cart */}
            <Link
              to="/products"
              className="relative p-2 text-willbry-green-700 hover:text-willbry-green-500 hover:bg-willbry-green-50 rounded-lg transition-all"
            >
              <ShoppingCart size={20} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-willbry-accent text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {count > 9 ? '9+' : count}
                </span>
              )}
            </Link>

            {isAuth ? (
              <div className="flex items-center gap-2">
                <Link
                  to={isAdmin ? '/admin' : '/portal'}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-willbry-green-700 hover:bg-willbry-green-50 rounded-lg transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-willbry-green-500 flex items-center justify-center text-white text-xs font-bold">
                    {user?.full_name?.charAt(0) ?? 'U'}
                  </div>
                  <span className="max-w-[100px] truncate">{user?.full_name?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-willbry-green-700 hover:text-willbry-green-500 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-semibold bg-willbry-green-500 text-white rounded-lg hover:bg-willbry-green-600 transition-all shadow-sm"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 rounded-lg text-willbry-green-800 hover:bg-willbry-green-50 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-willbry-green-100 shadow-lg animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <div key={link.label}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `block px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${
                      isActive
                        ? 'text-willbry-green-500 bg-willbry-green-50'
                        : 'text-willbry-green-800 hover:bg-willbry-green-50'
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
                {link.children?.map((child) => (
                  <NavLink
                    key={child.href}
                    to={child.href}
                    className="block px-8 py-2 text-sm text-gray-600 hover:text-willbry-green-500 transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {child.label}
                  </NavLink>
                ))}
              </div>
            ))}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {isAuth ? (
                <>
                  <Link
                    to={isAdmin ? '/admin' : '/portal'}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-willbry-green-700 hover:bg-willbry-green-50 rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    <User size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMobileOpen(false) }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2.5 text-sm font-medium text-center text-willbry-green-700 border border-willbry-green-200 rounded-lg hover:bg-willbry-green-50"
                    onClick={() => setMobileOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2.5 text-sm font-semibold text-center bg-willbry-green-500 text-white rounded-lg"
                    onClick={() => setMobileOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}