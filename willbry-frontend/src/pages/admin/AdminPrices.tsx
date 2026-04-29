import { useEffect, useState } from 'react'
import {
  BarChart3,
  Bot,
  CalendarCheck,
  FileText,
  Image,
  Leaf,
  Loader2,
  MessageCircle,
  Package,
  PlusCircle,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import api from '../../lib/api'

const adminItems = [
  { label: 'Dashboard', href: '/admin', icon: ShoppingBag },
  { label: 'Users', href: '/admin/users', icon: Users },
  { label: 'Orders', href: '/admin/orders', icon: Package },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageCircle },
  { label: 'Blog', href: '/admin/blog', icon: FileText },
  { label: 'Products', href: '/admin/products', icon: ShoppingBag },
  { label: 'Gallery', href: '/admin/gallery', icon: Image },
  { label: 'Resources', href: '/admin/resources', icon: FileText },
  { label: 'Farmers', href: '/admin/farmers', icon: Leaf },
  { label: 'Prices', href: '/admin/prices', icon: TrendingUp },
  { label: 'Bookings', href: '/admin/bookings', icon: CalendarCheck },
  { label: 'AI Config', href: '/admin/ai-config', icon: Bot },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

interface CommodityPrice {
  id: string
  commodity: string
  price_ugx: number
  unit: string
  change_percent?: number
  updated_at: string
}

export default function AdminPrices() {
  const [prices, setPrices] = useState<CommodityPrice[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [editId, setEditId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ commodity: '', price_ugx: '', unit: 'kg', change_percent: '' })

  const loadPrices = () => {
    setLoading(true)
    api.get('/admin/prices')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setPrices(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load prices.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadPrices() }, [])

  const openAdd = () => {
    setEditId(null)
    setForm({ commodity: '', price_ugx: '', unit: 'kg', change_percent: '' })
    setAddOpen(true)
  }

  const openEdit = (p: CommodityPrice) => {
    setEditId(p.id)
    setForm({
      commodity: p.commodity,
      price_ugx: String(p.price_ugx),
      unit: p.unit,
      change_percent: p.change_percent != null ? String(p.change_percent) : '',
    })
    setAddOpen(true)
  }

  const handleSave = async () => {
    if (!form.commodity.trim() || !form.price_ugx) {
      toast.error('Commodity and price are required')
      return
    }
    setSaving(true)
    try {
      const payload = {
        commodity: form.commodity,
        price_ugx: parseFloat(form.price_ugx),
        unit: form.unit,
        change_percent: form.change_percent ? parseFloat(form.change_percent) : undefined,
      }
      if (editId) {
        await api.put(`/admin/prices/${editId}`, payload)
        toast.success('Price updated')
      } else {
        await api.post('/admin/prices', payload)
        toast.success('Price added')
      }
      setAddOpen(false)
      loadPrices()
    } catch {
      toast.error('Failed to save price')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Prices
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Market prices
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage commodity prices displayed to farmers and portal users.
              </p>
            </div>
            <Button leftIcon={<PlusCircle size={16} />} onClick={openAdd}>
              Add price
            </Button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error}</p>
            </div>
          ) : prices.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No prices yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Commodity', 'Price (UGX)', 'Unit', 'Change %', 'Updated', 'Action'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {prices.map((p) => (
                      <tr key={p.id} className="transition-colors hover:bg-willbry-light">
                        <td className="px-6 py-4 font-black text-willbry-green-900">{p.commodity}</td>
                        <td className="px-6 py-4 text-sm font-bold text-willbry-green-900">
                          {p.price_ugx.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">/ {p.unit}</td>
                        <td className="px-6 py-4">
                          {p.change_percent != null ? (
                            <span className={p.change_percent >= 0 ? 'text-green-600 font-bold text-sm' : 'text-red-600 font-bold text-sm'}>
                              {p.change_percent >= 0 ? '+' : ''}{p.change_percent}%
                            </span>
                          ) : (
                            <span className="text-sm text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {new Date(p.updated_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <Button size="sm" variant="secondary" onClick={() => openEdit(p)}>
                            Update
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title={editId ? 'Update price' : 'Add market price'}
        footer={
          <>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>
              {editId ? 'Save changes' : 'Add price'}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Commodity"
              value={form.commodity}
              onChange={(e) => setForm((p) => ({ ...p, commodity: e.target.value }))}
              required
              disabled={!!editId}
            />
          </div>
          <Input
            label="Price (UGX)"
            type="number"
            value={form.price_ugx}
            onChange={(e) => setForm((p) => ({ ...p, price_ugx: e.target.value }))}
            required
          />
          <Input
            label="Unit"
            value={form.unit}
            onChange={(e) => setForm((p) => ({ ...p, unit: e.target.value }))}
            hint="e.g. kg, bag, litre"
          />
          <div className="sm:col-span-2">
            <Input
              label="Change % (optional)"
              type="number"
              value={form.change_percent}
              onChange={(e) => setForm((p) => ({ ...p, change_percent: e.target.value }))}
              hint="Positive for increase, negative for decrease"
            />
          </div>
        </div>
      </Modal>
    </main>
  )
}
