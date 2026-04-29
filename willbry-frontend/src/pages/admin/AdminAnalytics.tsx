import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bot,
  CalendarCheck,
  FileText,
  Image,
  Leaf,
  Loader2,
  MessageCircle,
  Package,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import AnalyticsChart from '../../components/admin/AnalyticsChart'
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

interface ChartDataPoint {
  name: string
  value: number
}

interface AnalyticsData {
  signups_30d: { day: string; count: number }[]
  orders_30d: { day: string; count: number }[]
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/admin/analytics')
      .then((res) => {
        const d = res.data?.data ?? res.data
        setData(d)
      })
      .catch(() => setError('Failed to load analytics data.'))
      .finally(() => setLoading(false))
  }, [])

  const signupsChart: ChartDataPoint[] = (data?.signups_30d ?? []).map((r) => ({
    name: r.day.slice(5), // MM-DD
    value: r.count,
  }))

  const ordersChart: ChartDataPoint[] = (data?.orders_30d ?? []).map((r) => ({
    name: r.day.slice(5),
    value: r.count,
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
              Platform analytics
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              User signups and order activity over the last 30 days.
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error}</p>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              <AnalyticsChart
                title="User signups (30 days)"
                description="Daily new registrations"
                data={signupsChart}
                type="bar"
              />
              <AnalyticsChart
                title="Orders placed (30 days)"
                description="Daily order volume"
                data={ordersChart}
                type="line"
              />
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
