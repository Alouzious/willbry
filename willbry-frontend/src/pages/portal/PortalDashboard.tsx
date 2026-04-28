import { useEffect, useState } from 'react'
import React from 'react'
import Sidebar from '../../components/layout/Sidebar'
import DashboardStats from '../../components/portal/DashboardStats'
import api from '../../lib/api'
import { useAuth } from '../../hooks/useAuth'
import { Package, DollarSign, Calendar, MessageSquare } from 'lucide-react'

interface Stats {
  orders: number
  totalSpent: number
  bookings: number
  messages: number
}

export default function PortalDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<Stats>({ orders: 0, totalSpent: 0, bookings: 0, messages: 0 })

  useEffect(() => {
    api.get('/portal/stats')
      .then(res => setStats(res.data.data || {}))
      .catch(() => {})
  }, [])

  const statCards = [
    { label: 'Total Orders', value: stats.orders, icon: <Package className="h-5 w-5" />, trend: '+2 this month', trendUp: true },
    { label: 'Total Spent', value: `KES ${stats.totalSpent.toLocaleString()}`, icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Bookings', value: stats.bookings, icon: <Calendar className="h-5 w-5" /> },
    { label: 'AI Chats', value: stats.messages, icon: <MessageSquare className="h-5 w-5" /> },
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="portal" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.full_name?.split(' ')[0] || 'Farmer'} 👋
            </h1>
            <p className="text-gray-500 mt-1">Here's what's happening on your farm dashboard today.</p>
          </div>

          <DashboardStats stats={statCards} />

          <div className="mt-8 bg-[#f0f7e8] rounded-2xl p-6">
            <h2 className="text-lg font-bold text-[#0d2b18] mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'New Order', href: '/products', bg: '#2d6a4f' },
                { label: 'Ask AI', href: '/portal/chat', bg: '#52b788' },
                { label: 'Book Consultation', href: '/portal/bookings', bg: '#e76f51' },
                { label: 'View Prices', href: '/portal/prices', bg: '#0d2b18' },
              ].map(a => (
                <a
                  key={a.label}
                  href={a.href}
                  className="py-3 px-4 rounded-xl text-white text-sm font-medium text-center transition-opacity hover:opacity-90"
                  style={{ backgroundColor: a.bg }}
                >
                  {a.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
