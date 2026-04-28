import type { Order, OrderStatus } from '../../types'
import Badge from '../ui/Badge'
import { formatDate, formatCurrency } from '../../lib/utils'

interface OrdersManagerProps {
  orders: Order[]
  onStatusChange: (id: string, status: OrderStatus) => void
}

const statusOptions: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'error',
}

export default function OrdersManager({ orders, onStatusChange }: OrdersManagerProps) {
  if (!orders.length) {
    return <div className="text-center py-12 text-gray-500">No orders found.</div>
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100 text-left">
            <th className="py-3 px-4 font-semibold text-gray-600">Order ID</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Customer</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Total</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Change Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-gray-600">#{order.id.slice(0, 8)}</td>
              <td className="py-3 px-4 text-gray-600">{formatDate(order.created_at)}</td>
              <td className="py-3 px-4 text-gray-600 font-mono text-xs">{order.user_id.slice(0, 8)}</td>
              <td className="py-3 px-4 font-medium">{formatCurrency(order.total)}</td>
              <td className="py-3 px-4">
                <Badge variant={statusVariant[order.status] || 'default'}>{order.status}</Badge>
              </td>
              <td className="py-3 px-4">
                <select
                  value={order.status}
                  onChange={e => onStatusChange(order.id, e.target.value as OrderStatus)}
                  className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#2d6a4f]"
                >
                  {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
