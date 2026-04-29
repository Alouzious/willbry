import { useState } from 'react'
import {
  BarChart3,
  Bot,
  Edit3,
  FileText,
  Image,
  Package,
  Plus,
  Settings,
  ShoppingBag,
  Trash2,
  Users,
} from 'lucide-react'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatCurrency } from '../../lib/utils'
import type { Product } from '../../types'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: BarChart3 },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: ShoppingBag },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: Settings },
]

const products: Product[] = [
  {
    id: 'p1',
    name: 'SmartCrisps',
    slug: 'smartcrisps',
    description: 'Premium potato crisps made through local value addition.',
    price: 5000,
    unit: 'pack',
    category: 'food',
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: 'p2',
    name: 'SmartFlour',
    slug: 'smartflour',
    description: 'Fortified flour supporting nutrition and local value chains.',
    price: 12000,
    unit: 'kg',
    category: 'food',
    active: true,
    created_at: new Date().toISOString(),
  },
]

export default function AdminProducts() {
  const [items] = useState(products)

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Product CMS
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Manage marketplace products
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Update food products, training packages, digital services, and consultancy offers.
              </p>
            </div>

            <Button leftIcon={<Plus size={16} />}>Add Product</Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-willbry-light">
                <tr>
                  {['Product', 'Category', 'Price', 'Status', 'Actions'].map((head) => (
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
                {items.map((product) => (
                  <tr key={product.id} className="hover:bg-willbry-light">
                    <td className="px-6 py-4">
                      <p className="font-black text-willbry-green-900">{product.name}</p>
                      <p className="max-w-md text-xs leading-5 text-gray-500">{product.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="teal">{product.category}</Badge>
                    </td>
                    <td className="px-6 py-4 font-black text-willbry-green-900">
                      {product.price ? formatCurrency(product.price) : 'Quote'}
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={product.active ? 'green' : 'gray'} dot>
                        {product.active ? 'Active' : 'Hidden'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="secondary" leftIcon={<Edit3 size={15} />}>
                          Edit
                        </Button>
                        <Button size="sm" variant="danger" leftIcon={<Trash2 size={15} />}>
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}