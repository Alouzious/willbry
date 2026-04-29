import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bot,
  FileText,
  Loader2,
  MessageCircle,
  Package,
  ShoppingBag,
  Users,
  CalendarCheck,
  Image,
  Leaf,
  TrendingUp,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import AdminStats from '../../components/admin/AdminStats'
import api from '../../lib/api'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: ShoppingBag },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: Package },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageCircle },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Resources', href: '/admin/resources', icon: FileText },
  { label: 'Farmers', href: '/admin/farmers', icon: Leaf },
  { label: 'Prices', href: '/admin/prices', icon: TrendingUp },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

interface DashboardStats {
  users: { total: number; new_this_month: number }
  orders: { total: number; pending: number; this_month: number }
  inquiries: { total: number; unread: number }
  content: { blog_posts: number; products: number }
  farmers: number
  ai_chats: number
  bookings: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/dashboard')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setStats(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Admin panel
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Platform overview
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Manage the WillBry platform — users, orders, content, and analytics in one place.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : (
            <>
              <AdminStats
                stats={[
                  {
                    label: 'Total Users',
                    value: stats?.users.total ?? 0,
                    icon: Users,
                    trend: stats?.users.new_this_month ? `+${stats.users.new_this_month} this month` : undefined,
                    trendDirection: 'up',
                    description: 'Registered platform users',
                  },
                  {
                    label: 'Total Orders',
                    value: stats?.orders.total ?? 0,
                    icon: Package,
                    trend: stats?.orders.pending ? `${stats.orders.pending} pending` : undefined,
                    trendDirection: stats?.orders.pending ? 'down' : 'up',
                    description: 'Product requests submitted',
                  },
                  {
                    label: 'Inquiries',
                    value: stats?.inquiries.total ?? 0,
                    icon: MessageCircle,
                    trend: stats?.inquiries.unread ? `${stats.inquiries.unread} unread` : undefined,
                    trendDirection: stats?.inquiries.unread ? 'down' : 'up',
                    description: 'Contact form messages',
                  },
                  {
                    label: 'AI Chats',
                    value: stats?.ai_chats ?? 0,
                    icon: Bot,
                    description: 'Total AI interactions',
                  },
                ]}
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {[
                  { label: 'Blog Posts', value: stats?.content.blog_posts ?? 0, href: '/admin/blog', icon: FileText },
                  { label: 'Products', value: stats?.content.products ?? 0, href: '/admin/products', icon: ShoppingBag },
                  { label: 'Farmers', value: stats?.farmers ?? 0, href: '/admin/farmers', icon: Leaf },
                  { label: 'Bookings', value: stats?.bookings ?? 0, href: '/admin/bookings', icon: CalendarCheck },
                ].map(({ label, value, href, icon: Icon }) => (
                  <Link
                    key={label}
                    to={href}
                    className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-card-hover"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-willbry-green-50 text-willbry-green-600">
                      <Icon size={22} />
                    </div>
                    <p className="mt-5 text-sm font-bold text-gray-500">{label}</p>
                    <p className="mt-1 text-3xl font-black text-willbry-green-900">{value}</p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}
