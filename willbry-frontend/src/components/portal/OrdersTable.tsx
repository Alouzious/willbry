import { Link } from 'react-router-dom'
import { Eye, PackageOpen } from 'lucide-react'
import type { Order } from '../../types'
import { formatCurrency, formatDate } from '../../lib/utils'
import { Badge, orderStatusVariant } from '../ui/Badge'
import { Button } from '../ui/Button'

interface OrdersTableProps {
  orders: Order[]
  emptyMessage?: string
}

export default function OrdersTable({
  orders,
  emptyMessage = 'No orders found yet.',
}: OrdersTableProps) {
  if (!orders.length) {
    return (
      <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center shadow-card">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-willbry-green-50 text-willbry-green-600">
          <PackageOpen size={28} />
        </div>
        <h3 className="mt-4 text-lg font-black text-willbry-green-900">No orders yet</h3>
        <p className="mt-2 text-sm text-gray-500">{emptyMessage}</p>
        <Link to="/products" className="mt-5 inline-block">
          <Button>Browse products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-willbry-light">
            <tr>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                Order
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                Total
              </th>
              <th className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-willbry-green-100">
            {orders.map((order) => (
              <tr key={order.id} className="transition-colors hover:bg-willbry-light">
                <td className="px-6 py-4">
                  <p className="font-black text-willbry-green-900">
                    #{order.id.slice(0, 8)}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {order.items?.length ?? 0} item(s)
                  </p>
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

                <td className="px-6 py-4 text-right">
                  <Link to={`/portal/orders/${order.id}`}>
                    <Button variant="secondary" size="sm" leftIcon={<Eye size={15} />}>
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}