import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import type { Order } from '../../types'
import api from '../../lib/api'
import { formatDateLong, formatCurrency } from '../../lib/utils'
import { ArrowLeft } from 'lucide-react'

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'error',
}

export default function PortalOrderDetail() {
  const { id } = useParams<{ id: string }>()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    api.get(`/orders/${id}`)
      .then(res => setOrder(res.data.data))
      .catch(() => setError('Order not found'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Link to="/portal/orders" className="inline-flex items-center gap-2 text-[#2d6a4f] hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : error || !order ? (
            <div className="text-center py-12 text-red-500">{error || 'Order not found'}</div>
          ) : (
            <div className="max-w-3xl space-y-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">Order #{order.id.slice(0, 8)}</h1>
                    <p className="text-gray-500 text-sm">{formatDateLong(order.created_at)}</p>
                  </div>
                  <Badge variant={statusVariant[order.status] || 'default'} className="text-sm px-3 py-1">
                    {order.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Delivery Address</p>
                    <p className="font-medium text-gray-900">{order.delivery_address}</p>
                  </div>
                  {order.notes && (
                    <div>
                      <p className="text-gray-500">Notes</p>
                      <p className="font-medium text-gray-900">{order.notes}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <h2 className="font-semibold text-gray-900 mb-4">Order Items</h2>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 text-left">
                      <th className="pb-3 font-semibold text-gray-600">Product</th>
                      <th className="pb-3 font-semibold text-gray-600">Qty</th>
                      <th className="pb-3 font-semibold text-gray-600">Unit Price</th>
                      <th className="pb-3 font-semibold text-gray-600">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map(item => (
                      <tr key={item.id} className="border-b border-gray-50">
                        <td className="py-3 text-gray-900">{item.product_name}</td>
                        <td className="py-3 text-gray-600">{item.quantity}</td>
                        <td className="py-3 text-gray-600">{formatCurrency(item.unit_price)}</td>
                        <td className="py-3 font-medium">{formatCurrency(item.unit_price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} className="pt-4 text-right font-semibold text-gray-900">Total:</td>
                      <td className="pt-4 font-bold text-[#2d6a4f] text-lg">{formatCurrency(order.total)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
