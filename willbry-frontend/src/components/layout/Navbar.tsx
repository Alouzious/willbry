import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Leaf, Menu, X, ShoppingCart, User, LogOut } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Products', to: '/products' },
  { label: 'Blog', to: '/blog' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const { user, logout, isAuth } = useAuth()
  const { count } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Leaf className="h-7 w-7 text-[#2d6a4f]" />
            <span className="text-xl font-bold text-[#2d6a4f]">WillBry</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-[#2d6a4f]' : 'text-gray-600 hover:text-[#2d6a4f]'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/products" className="relative text-gray-600 hover:text-[#2d6a4f] transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#e76f51] text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            {isAuth ? (
              <div className="flex items-center gap-2">
                <Link to="/portal" className="flex items-center gap-1 text-sm font-medium text-[#2d6a4f] hover:underline">
                  <User className="h-4 w-4" />
                  {user?.full_name?.split(' ')[0]}
                </Link>
                <button onClick={logout} className="text-gray-500 hover:text-red-500 transition-colors">
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-[#2d6a4f] hover:underline">Login</Link>
                <Link to="/register" className="bg-[#2d6a4f] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#1f4f2b] transition-colors">
                  Register
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3">
          {navLinks.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium ${isActive ? 'text-[#2d6a4f]' : 'text-gray-600'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-gray-100 flex gap-3">
            {isAuth ? (
              <>
                <Link to="/portal" onClick={() => setOpen(false)} className="text-sm font-medium text-[#2d6a4f]">Portal</Link>
                <button onClick={logout} className="text-sm font-medium text-red-500">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium text-[#2d6a4f]">Login</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="text-sm font-medium text-white bg-[#2d6a4f] px-3 py-1 rounded-lg">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
