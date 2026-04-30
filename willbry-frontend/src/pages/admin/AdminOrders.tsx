import { useEffect, useState } from 'react'
import {
  BarChart3, Bot, FileText, Image, Package,
  Settings, ShoppingBag, Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatCurrency, formatDate } from '../../lib/utils'
import { adminListOrders, adminUpdateOrder } from '../../services/admin.service'

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

const statusVariant: Record<string, any> = {
  pending: 'yellow',
  confirmed: 'teal',
  shipped: 'green',
  delivered: 'green',
  cancelled: 'red',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminListOrders()
        setOrders(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  const handleStatus = async (id: string, status: string) => {
    try {
      await adminUpdateOrder(id, { status })
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      )
      toast.success('Order updated')
    } catch {
      toast.error('Failed to update order')
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
              Order management
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              All platform orders
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Review, confirm, and manage all product and service orders.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading orders…</p>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Order ID', 'Date', 'Total', 'Address', 'Status', 'Actions'].map((head) => (
                        <th key={head} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {head}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-willbry-light">
                        <td className="px-6 py-4 font-black text-willbry-green-900 text-sm">
                          #{order.id.slice(0, 8)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4 font-black text-willbry-green-900">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">
                          {order.delivery_address}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={statusVariant[order.status] ?? 'gray'} dot>
                            {order.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {order.status === 'pending' && (
                              <Button
                                size="sm"
                                onClick={() => handleStatus(order.id, 'confirmed')}
                              >
                                Confirm
                              </Button>
                            )}
                            {order.status === 'confirmed' && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleStatus(order.id, 'shipped')}
                              >
                                Mark Shipped
                              </Button>
                            )}
                            {order.status === 'shipped' && (
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleStatus(order.id, 'delivered')}
                              >
                                Mark Delivered
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}