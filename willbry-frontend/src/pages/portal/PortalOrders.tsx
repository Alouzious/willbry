import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import OrdersTable from '../../components/portal/OrdersTable'
import Spinner from '../../components/ui/Spinner'
import type { Order } from '../../types'
import api from '../../lib/api'

export default function PortalOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data.data || []))
      .catch(() => setError('Failed to load orders'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-gray-500 mt-1">Track all your purchases and deliveries</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : (
              <OrdersTable orders={orders} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
