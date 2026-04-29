import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart3,
  Bot,
  FileText,
  Image,
  Package,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import AdminStats from '../../components/admin/AdminStats'
import AnalyticsChart from '../../components/admin/AnalyticsChart'
import { getAdminDashboard } from '../../services/admin.service'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: Settings },
]

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getAdminDashboard()
        setData(result)
      } catch {
        toast.error('Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }
    void load()
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
              Admin dashboard
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Platform control center
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Monitor users, orders, content, products, AI activity, and overall platform growth.
            </p>
          </div>

          <AdminStats
            stats={[
              { label: 'Total Users', value: loading ? '…' : data?.users?.total ?? 0, icon: Users },
              { label: 'Orders This Month', value: loading ? '…' : data?.orders?.this_month ?? 0, icon: ShoppingBag },
              { label: 'Unread Inquiries', value: loading ? '…' : data?.inquiries?.unread ?? 0, icon: FileText },
              { label: 'AI Chats', value: loading ? '…' : data?.ai_chats ?? 0, icon: Bot },
            ]}
          />

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
            <AnalyticsChart
              title="Platform overview"
              description="Key platform metrics."
              data={[
                { name: 'Users', value: data?.users?.total ?? 0 },
                { name: 'Orders', value: data?.orders?.total ?? 0 },
                { name: 'Bookings', value: data?.bookings ?? 0 },
                { name: 'AI Chats', value: data?.ai_chats ?? 0 },
              ]}
              dataKey="value"
              type="bar"
            />

            <section className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
              <h2 className="text-xl font-black text-willbry-green-900">Quick management</h2>
              <div className="mt-6 grid gap-3">
                {[
                  { label: 'Manage users', href: '/admin/users', icon: Users },
                  { label: 'Review orders', href: '/admin/orders', icon: ShoppingBag },
                  { label: 'Create blog post', href: '/admin/blog/new', icon: FileText },
                  { label: 'Update products', href: '/admin/products', icon: Package },
                  { label: 'Configure AI', href: '/admin/ai-config', icon: Bot },
                ].map(({ label, href, icon: Icon }) => (
                  <Link
                    key={href}
                    to={href}
                    className="flex items-center justify-between rounded-2xl border border-willbry-green-100 bg-willbry-light px-4 py-4 text-sm font-black text-willbry-green-900 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-card"
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} className="text-willbry-green-600" />
                      {label}
                    </span>
                    <span className="text-willbry-teal">Open</span>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}