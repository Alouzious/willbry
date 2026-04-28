import { Link } from 'react-router-dom'
import type { Order } from '../../types'
import Badge from '../ui/Badge'
import { formatDate, formatCurrency } from '../../lib/utils'
import { Eye } from 'lucide-react'

interface OrdersTableProps {
  orders: Order[]
}

const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
  pending: 'warning',
  confirmed: 'info',
  processing: 'info',
  shipped: 'default',
  delivered: 'success',
  cancelled: 'error',
}

export default function OrdersTable({ orders }: OrdersTableProps) {
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
            <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Total</th>
            <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4 font-mono text-xs text-gray-600">#{order.id.slice(0, 8)}</td>
              <td className="py-3 px-4 text-gray-600">{formatDate(order.created_at)}</td>
              <td className="py-3 px-4">
                <Badge variant={statusVariant[order.status] || 'default'}>{order.status}</Badge>
              </td>
              <td className="py-3 px-4 font-medium">{formatCurrency(order.total)}</td>
              <td className="py-3 px-4">
                <Link to={`/portal/orders/${order.id}`} className="inline-flex items-center gap-1 text-[#2d6a4f] hover:underline text-xs font-medium">
                  <Eye className="h-3.5 w-3.5" /> View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
