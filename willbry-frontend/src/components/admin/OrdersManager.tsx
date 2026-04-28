import type { Order, OrderStatus } from '../../types'
import { formatCurrency, formatDate } from '../../lib/utils'
import { Badge, orderStatusVariant } from '../ui/Badge'

interface OrdersManagerProps {
  orders: Order[]
  onStatusChange?: (orderId: string, status: OrderStatus) => void
}

const statuses: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
]

export default function OrdersManager({ orders, onStatusChange }: OrdersManagerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-willbry-light">
            <tr>
              {['Order', 'Customer', 'Status', 'Total', 'Date', 'Update'].map((head) => (
                <th
                  key={head}
                  className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-willbry-green-100">
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-willbry-light">
                <td className="px-6 py-4">
                  <p className="font-black text-willbry-green-900">#{order.id.slice(0, 8)}</p>
                  <p className="text-xs text-gray-500">{order.items?.length ?? 0} item(s)</p>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-willbry-green-900">{order.user_id.slice(0, 8)}</p>
                  <p className="text-xs text-gray-500">{order.delivery_address}</p>
                </td>

                <td className="px-6 py-4">
                  <Badge variant={orderStatusVariant(order.status)} dot>
                    {order.status}
                  </Badge>
                </td>

                <td className="px-6 py-4 font-black text-willbry-green-900">
                  {formatCurrency(order.total)}
                </td>

                <td className="px-6 py-4 text-sm font-medium text-gray-600">
                  {formatDate(order.created_at)}
                </td>

                <td className="px-6 py-4">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      onStatusChange?.(order.id, event.target.value as OrderStatus)
                    }
                    className="rounded-xl border border-willbry-green-100 bg-white px-3 py-2 text-sm font-bold text-willbry-green-800 outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!orders.length && (
          <div className="p-12 text-center">
            <p className="text-sm font-semibold text-gray-500">No orders found.</p>
          </div>
        )}
      </div>
    </div>
  )
}