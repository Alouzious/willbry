import { useState } from 'react'
import {
  BarChart3,
  Bot,
  Edit3,
  FileText,
  Image,
  Package,
  Plus,
  Save,
  Settings,
  ShoppingBag,
  Trash2,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'

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

const initialPrices = [
  { id: '1', commodity: 'Irish Potatoes', market: 'Kabale Central Market', price: 1200, unit: 'kg', trend: 'up' },
  { id: '2', commodity: 'Beans', market: 'Kabale Central Market', price: 3200, unit: 'kg', trend: 'up' },
  { id: '3', commodity: 'Maize', market: 'Rukiga Market', price: 950, unit: 'kg', trend: 'down' },
]

export default function AdminPrices() {
  const [prices, setPrices] = useState(initialPrices)
  const [editingId, setEditingId] = useState<string | null>(null)

  const updatePrice = (id: string, key: string, value: string) => {
    setPrices((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, [key]: key === 'price' ? Number(value) : value }
          : item
      )
    )
  }

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
                Market prices
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Manage commodity price intelligence
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Update prices used by farmers, advisors, and market planning dashboards.
              </p>
            </div>

            <Button leftIcon={<Plus size={16} />}>Add Price</Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-willbry-light">
                  <tr>
                    {['Commodity', 'Market', 'Price', 'Unit', 'Trend', 'Actions'].map((head) => (
                      <th key={head} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-willbry-green-100">
                  {prices.map((item) => {
                    const editing = editingId === item.id

                    return (
                      <tr key={item.id} className="hover:bg-willbry-light">
                        <td className="px-6 py-4">
                          {editing ? (
                            <Input value={item.commodity} onChange={(e) => updatePrice(item.id, 'commodity', e.target.value)} />
                          ) : (
                            <p className="font-black text-willbry-green-900">{item.commodity}</p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {editing ? (
                            <Input value={item.market} onChange={(e) => updatePrice(item.id, 'market', e.target.value)} />
                          ) : (
                            <p className="text-sm font-semibold text-gray-600">{item.market}</p>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {editing ? (
                            <Input type="number" value={item.price} onChange={(e) => updatePrice(item.id, 'price', e.target.value)} />
                          ) : (
                            <p className="font-black text-willbry-green-900">UGX {item.price.toLocaleString()}</p>
                          )}
                        </td>

                        <td className="px-6 py-4 text-sm font-bold text-gray-600">{item.unit}</td>

                        <td className="px-6 py-4">
                          <Badge variant={item.trend === 'up' ? 'green' : 'red'} dot>
                            {item.trend}
                          </Badge>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {editing ? (
                              <Button
                                size="sm"
                                leftIcon={<Save size={15} />}
                                onClick={() => {
                                  setEditingId(null)
                                  toast.success('Price saved')
                                }}
                              >
                                Save
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="secondary"
                                leftIcon={<Edit3 size={15} />}
                                onClick={() => setEditingId(item.id)}
                              >
                                Edit
                              </Button>
                            )}

                            <Button size="sm" variant="danger" leftIcon={<Trash2 size={15} />}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}