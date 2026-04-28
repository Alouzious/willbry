import { Link } from 'react-router-dom'
import {
  Bot,
  Download,
  FileText,
  Package,
  Plus,
  ShoppingBag,
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import DashboardStats from '../../components/portal/DashboardStats'
import OrdersTable from '../../components/portal/OrdersTable'
import { Button } from '../../components/ui/Button'
import type { Order } from '../../types'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

const orders: Order[] = [
  {
    id: 'order-1001',
    user_id: 'user-1',
    status: 'pending',
    total: 25000,
    delivery_address: 'Kabale Municipality',
    notes: 'Call before delivery',
    items: [
      { id: 'i1', product_id: 'p1', product_name: 'SmartCrisps', quantity: 3, unit_price: 5000 },
      { id: 'i2', product_id: 'p2', product_name: 'SmartFlour', quantity: 1, unit_price: 10000 },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function PortalDashboard() {
  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                User portal
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Your agriculture command center
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Track orders, chat with WillBry AI, access resources, and manage your farming profile.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/products">
                <Button leftIcon={<Plus size={16} />}>New Order</Button>
              </Link>
              <Link to="/portal/chat">
                <Button variant="secondary" leftIcon={<Bot size={16} />}>
                  Chat with AI
                </Button>
              </Link>
            </div>
          </div>

          <DashboardStats
            stats={[
              { label: 'Total Orders', value: 1, description: 'Orders submitted through the platform', icon: Package, trend: '+1' },
              { label: 'Open Inquiries', value: 0, description: 'Pending support conversations', icon: FileText },
              { label: 'AI Chats Today', value: 3, description: 'Questions answered by WillBry AI', icon: Bot, trend: '+3' },
              { label: 'Resources Downloaded', value: 5, description: 'Guides and manuals accessed', icon: Download },
            ]}
          />

          <div className="mt-10 grid gap-8 xl:grid-cols-[1.2fr_.8fr]">
            <section>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-2xl font-black text-willbry-green-900">Recent orders</h2>
                <Link to="/portal/orders" className="text-sm font-black text-willbry-green-600">
                  View all
                </Link>
              </div>
              <OrdersTable orders={orders} />
            </section>

            <aside className="rounded-[2rem] bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-8 text-white shadow-card">
              <Bot className="h-10 w-10 text-willbry-teal" />
              <h2 className="mt-6 text-3xl font-black">Ask WillBry AI</h2>
              <p className="mt-4 text-sm leading-7 text-willbry-green-100">
                Get practical guidance on crops, pests, value addition, post-harvest handling,
                and market planning.
              </p>
              <Link to="/portal/chat" className="mt-7 inline-block">
                <Button variant="accent">Open AI Assistant</Button>
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}