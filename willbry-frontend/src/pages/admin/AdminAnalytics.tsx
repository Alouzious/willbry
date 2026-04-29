import { useEffect, useState } from 'react'
import { BarChart3, Bot, FileText, Image, Package, Settings, ShoppingBag, TrendingUp, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import AdminStats from '../../components/admin/AdminStats'
import AnalyticsChart from '../../components/admin/AnalyticsChart'
import { getAdminDashboard, getAnalyticsData } from '../../services/admin.service'

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

export default function AdminAnalytics() {
  const [dashboard, setDashboard] = useState<any>(null)
  const [analytics, setAnalytics] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const [dash, analytics] = await Promise.all([
          getAdminDashboard(),
          getAnalyticsData(),
        ])
        setDashboard(dash)
        setAnalytics(analytics)
      } catch {
        toast.error('Failed to load analytics')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  const signups = (analytics?.signups_30d ?? []).map((d: any) => ({
    name: d.day?.slice(5) ?? '',
    value: d.count ?? 0,
  }))

  const orders = (analytics?.orders_30d ?? []).map((d: any) => ({
    name: d.day?.slice(5) ?? '',
    value: d.count ?? 0,
  }))

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Analytics
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Platform growth intelligence
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Understand adoption, product demand, farmer engagement, and AI assistant usage.
            </p>
          </div>

          <AdminStats
            stats={[
              { label: 'Registered Users', value: loading ? '…' : dashboard?.users?.total ?? 0, icon: Users },
              { label: 'Total Orders', value: loading ? '…' : dashboard?.orders?.total ?? 0, icon: ShoppingBag, trend: `+${dashboard?.orders?.this_month ?? 0} this month` },
              { label: 'AI Chats', value: loading ? '…' : dashboard?.ai_chats ?? 0, icon: Bot },
              { label: 'Bookings', value: loading ? '…' : dashboard?.bookings ?? 0, icon: TrendingUp },
            ]}
          />

          <div className="mt-8 grid gap-8 xl:grid-cols-2">
            <AnalyticsChart
              title="User signups (last 30 days)"
              description="Daily new registrations."
              data={signups.length ? signups : [{ name: 'No data', value: 0 }]}
              type="line"
              dataKey="value"
            />

            <AnalyticsChart
              title="Orders (last 30 days)"
              description="Daily order volume."
              data={orders.length ? orders : [{ name: 'No data', value: 0 }]}
              type="bar"
              dataKey="value"
            />

            <section className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card xl:col-span-2">
              <h2 className="text-lg font-black text-willbry-green-900">Platform summary</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: 'Blog posts', value: dashboard?.content?.blog_posts ?? 0 },
                  { label: 'Active products', value: dashboard?.content?.products ?? 0 },
                  { label: 'Active farmers', value: dashboard?.farmers ?? 0 },
                  { label: 'Pending orders', value: dashboard?.orders?.pending ?? 0 },
                ].map(({ label, value }) => (
                  <div key={label} className="rounded-2xl bg-willbry-light p-5">
                    <p className="text-sm font-bold text-gray-500">{label}</p>
                    <p className="mt-2 text-3xl font-black text-willbry-green-900">{loading ? '…' : value}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}