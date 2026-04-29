import { useEffect, useState } from 'react'
import { Bot, Download, FileText, Package, ShoppingBag } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import OrdersTable from '../../components/portal/OrdersTable'
import { listMyOrders } from '../../services/portal.service'
import type { Order } from '../../types'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const data = await listMyOrders()
        setOrders(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }
    void load()
  }, [])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Orders
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Track your product requests
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              View your WillBry product requests, order progress, and delivery information.
            </p>
          </div>

          {loading ? (
            <p className="text-sm text-gray-500">Loading orders…</p>
          ) : orders.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="font-black text-willbry-green-900">No orders yet.</p>
              <p className="mt-2 text-sm text-gray-500">Place your first order from the marketplace.</p>
            </div>
          ) : (
            <OrdersTable orders={orders} />
          )}
        </div>
      </section>
    </main>
  )
}