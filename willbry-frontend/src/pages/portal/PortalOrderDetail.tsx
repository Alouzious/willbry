import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Bot, Download, FileText, Loader2, Package, ShoppingBag, Truck } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import { Badge, orderStatusVariant } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatCurrency, formatDate } from '../../lib/utils'
import api from '../../lib/api'
import type { Order, OrderItem } from '../../types'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

export default function PortalOrderDetail() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [items, setItems] = useState<OrderItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    setLoading(true)
    setError(null)
    api.get(`/portal/orders/${id}`)
      .then((res) => {
        const data = res.data?.data ?? res.data
        if (data?.order) {
          setOrder(data.order)
          setItems(Array.isArray(data.items) ? data.items : [])
        } else {
          setOrder(data)
          setItems([])
        }
      })
      .catch(() => setError('Order not found or failed to load.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <Link to="/portal/orders">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Back to orders
            </Button>
          </Link>

          {loading ? (
            <div className="mt-10 flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error || !order ? (
            <div className="mt-10 rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error ?? 'Order not found'}</p>
            </div>
          ) : (
            <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                    Order detail
                  </p>
                  <h1 className="mt-3 text-3xl font-black text-willbry-green-900">
                    #{order.id.slice(0, 8)}
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">
                    Created {formatDate(order.created_at)}
                  </p>
                </div>

                <Badge variant={orderStatusVariant(order.status)} dot>
                  {order.status}
                </Badge>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_.7fr]">
                <div>
                  <h2 className="text-xl font-black text-willbry-green-900">Items</h2>

                  {items.length > 0 ? (
                    <div className="mt-4 space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between rounded-2xl border border-willbry-green-100 p-4"
                        >
                          <div>
                            <p className="font-black text-willbry-green-900">{item.product_name ?? item.product_id}</p>
                            <p className="text-sm text-gray-500">
                              Qty {item.quantity} × {formatCurrency(item.unit_price)}
                            </p>
                          </div>
                          <p className="font-black text-willbry-green-900">
                            {formatCurrency(item.quantity * item.unit_price)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="mt-4 text-sm text-gray-500">No item details available.</p>
                  )}
                </div>

                <aside className="rounded-3xl bg-willbry-light p-6">
                  <Truck className="h-8 w-8 text-willbry-green-600" />
                  <h3 className="mt-5 text-xl font-black text-willbry-green-900">
                    Delivery information
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600">{order.delivery_address}</p>

                  {order.notes && (
                    <p className="mt-3 rounded-2xl bg-white p-4 text-sm leading-6 text-gray-600">
                      {order.notes}
                    </p>
                  )}

                  <div className="mt-6 border-t border-willbry-green-100 pt-6">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-600">Total</span>
                      <span className="text-2xl font-black text-willbry-green-900">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </div>
                </aside>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
