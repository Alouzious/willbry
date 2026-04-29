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
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import OrdersManager from '../../components/admin/OrdersManager'
import api from '../../lib/api'
import type { Order, OrderStatus } from '../../types'

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

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadOrders = () => {
    setLoading(true)
    api.get('/admin/orders')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setOrders(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load orders.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadOrders() }, [])

  const handleStatusChange = async (orderId: string, status: OrderStatus) => {
    try {
      await api.patch(`/admin/orders/${orderId}`, { status })
      toast.success('Order status updated')
      loadOrders()
    } catch {
      toast.error('Failed to update order status')
    }
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Orders
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              All orders
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              View and manage all platform orders. Update statuses as they progress.
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
            <OrdersManager orders={orders} onStatusChange={handleStatusChange} />
          )}
        </div>
      </section>
    </main>
  )
}
