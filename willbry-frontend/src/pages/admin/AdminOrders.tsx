import { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import OrdersManager from '../../components/admin/OrdersManager'
import Spinner from '../../components/ui/Spinner'
import type { Order, OrderStatus } from '../../types'
import api from '../../lib/api'
import toast from 'react-hot-toast'

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/orders')
      .then(res => setOrders(res.data.data || []))
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [])

  const handleStatusChange = async (id: string, status: OrderStatus) => {
    try {
      await api.patch(`/admin/orders/${id}`, { status })
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
      toast.success('Order status updated')
    } catch {
      toast.error('Failed to update order')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-1">Manage and track all platform orders</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : (
              <OrdersManager orders={orders} onStatusChange={handleStatusChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
