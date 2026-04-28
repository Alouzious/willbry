import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import type { User, Order } from '../../types'
import api from '../../lib/api'
import { formatDate, formatCurrency } from '../../lib/utils'
import { ArrowLeft } from 'lucide-react'

export default function AdminUserDetail() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<User | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      api.get(`/admin/users/${id}`),
      api.get(`/admin/users/${id}/orders`),
    ])
      .then(([userRes, ordersRes]) => {
        setUser(userRes.data.data)
        setOrders(ordersRes.data.data || [])
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <Link to="/admin/users" className="inline-flex items-center gap-2 text-[#2d6a4f] hover:underline mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Users
          </Link>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : !user ? (
            <div className="text-center py-12 text-gray-500">User not found</div>
          ) : (
            <div className="space-y-6 max-w-3xl">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 rounded-full bg-[#2d6a4f] flex items-center justify-center text-white text-2xl font-bold">
                    {user.full_name[0]}
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">{user.full_name}</h1>
                    <p className="text-gray-500">{user.email}</p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="info">{user.user_type}</Badge>
                      <Badge variant={user.active ? 'success' : 'error'}>{user.active ? 'Active' : 'Inactive'}</Badge>
                      {user.verified && <Badge variant="success">Verified</Badge>}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100 text-sm">
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium">{user.phone || '—'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-medium">{formatDate(user.created_at)}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Role</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              {orders.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
                  <h2 className="font-semibold text-gray-900 mb-4">Order History</h2>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100 text-left">
                        <th className="pb-3 font-semibold text-gray-600">Order ID</th>
                        <th className="pb-3 font-semibold text-gray-600">Date</th>
                        <th className="pb-3 font-semibold text-gray-600">Total</th>
                        <th className="pb-3 font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map(o => (
                        <tr key={o.id} className="border-b border-gray-50">
                          <td className="py-3 font-mono text-xs">#{o.id.slice(0, 8)}</td>
                          <td className="py-3 text-gray-600">{formatDate(o.created_at)}</td>
                          <td className="py-3">{formatCurrency(o.total)}</td>
                          <td className="py-3"><Badge variant="default">{o.status}</Badge></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
