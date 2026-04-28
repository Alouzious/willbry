import { useState } from 'react'
import { Bot, Download, FileText, Package, ShoppingBag } from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import OrdersTable from '../../components/portal/OrdersTable'
import type { Order } from '../../types'

const portalItems = [
  { label: 'Dashboard', href: '/portal', icon: ShoppingBag },
  { label: 'Orders', href: '/portal/orders', icon: Package },
  { label: 'AI Chat', href: '/portal/chat', icon: Bot },
  { label: 'Resources', href: '/portal/resources', icon: Download },
  { label: 'Farm Profile', href: '/portal/farm-profile', icon: FileText },
]

const fallbackOrders: Order[] = [
  {
    id: 'order-1001',
    user_id: 'user-1',
    status: 'confirmed',
    total: 52000,
    delivery_address: 'Kabale Municipality, Northern Division',
    notes: 'Deliver in the morning',
    items: [
      { id: 'i1', product_id: 'p1', product_name: 'SmartCrisps', quantity: 4, unit_price: 5000 },
      { id: 'i2', product_id: 'p2', product_name: 'SmartFlour', quantity: 2, unit_price: 16000 },
    ],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function PortalOrders() {
  const [orders] = useState<Order[]>(fallbackOrders)

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={portalItems} title="Farmer Portal" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Orders
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Track your product requests
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              View your WillBry product requests, order progress, and delivery information.
            </p>
          </div>

          <OrdersTable orders={orders} />
        </div>
      </section>
    </main>
  )
}