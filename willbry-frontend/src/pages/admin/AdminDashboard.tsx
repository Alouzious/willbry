import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import AdminStats from '../../components/admin/AdminStats'
import AnalyticsChart from '../../components/admin/AnalyticsChart'
import type { Order } from '../../types'
import api from '../../lib/api'
import { Users, Package, DollarSign, FileText } from 'lucide-react'
import { formatDate, formatCurrency } from '../../lib/utils'
import Badge from '../../components/ui/Badge'

interface DashboardData {
  users: number
  orders: number
  revenue: number
  posts: number
}

interface ChartDataPoint {
  name: string
  value: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardData>({ users: 0, orders: 0, revenue: 0, posts: 0 })
  const [recentOrders, setRecentOrders] = useState<Order[]>([])
  const [chartData, setChartData] = useState<ChartDataPoint[]>([])

  useEffect(() => {
    api.get('/admin/stats')
      .then(res => setStats(res.data.data || {}))
      .catch(() => {})
    api.get('/admin/orders?limit=5')
      .then(res => setRecentOrders(res.data.data || []))
      .catch(() => {})
    api.get('/admin/analytics')
      .then(res => setChartData(res.data.data || []))
      .catch(() => {
        setChartData([
          { name: 'Jan', value: 12 },
          { name: 'Feb', value: 19 },
          { name: 'Mar', value: 15 },
          { name: 'Apr', value: 27 },
          { name: 'May', value: 32 },
          { name: 'Jun', value: 24 },
        ])
      })
  }, [])

  const statCards = [
    { label: 'Total Users', value: stats.users, icon: <Users className="h-5 w-5" />, color: '#2d6a4f' },
    { label: 'Total Orders', value: stats.orders, icon: <Package className="h-5 w-5" />, color: '#52b788' },
    { label: 'Revenue', value: formatCurrency(stats.revenue), icon: <DollarSign className="h-5 w-5" />, color: '#e76f51' },
    { label: 'Blog Posts', value: stats.posts, icon: <FileText className="h-5 w-5" />, color: '#0d2b18' },
  ]

  const statusVariant: Record<string, 'default' | 'success' | 'warning' | 'error' | 'info'> = {
    pending: 'warning', confirmed: 'info', processing: 'info', shipped: 'default', delivered: 'success', cancelled: 'error',
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">Platform overview and analytics</p>
          </div>

          <AdminStats stats={statCards} />

          <div className="mt-8">
            <AnalyticsChart data={chartData} title="Monthly Activity" />
          </div>

          {recentOrders.length > 0 && (
            <div className="mt-8 bg-white rounded-xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-4">Recent Orders</h2>
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
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b border-gray-50">
                      <td className="py-3 font-mono text-xs text-gray-600">#{order.id.slice(0, 8)}</td>
                      <td className="py-3 text-gray-600">{formatDate(order.created_at)}</td>
                      <td className="py-3 font-medium">{formatCurrency(order.total)}</td>
                      <td className="py-3"><Badge variant={statusVariant[order.status] || 'default'}>{order.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
