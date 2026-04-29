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
  Trash2,
  TrendingUp,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import { Modal } from '../../components/ui/Modal'
import { formatDate, slugify } from '../../lib/utils'
import api from '../../lib/api'
import type { Product } from '../../types'

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

const categories = ['food', 'seeds', 'digital', 'training', 'consultancy']

interface ProductForm {
  name: string
  slug: string
  description: string
  price: string
  unit: string
  category: string
  image_url: string
}

const emptyForm: ProductForm = {
  name: '',
  slug: '',
  description: '',
  price: '',
  unit: '',
  category: 'food',
  image_url: '',
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductForm>(emptyForm)
  const [saving, setSaving] = useState(false)

  const loadProducts = () => {
    setLoading(true)
    api.get('/admin/products')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setProducts(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadProducts() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setModalOpen(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price != null ? String(p.price) : '',
      unit: p.unit ?? '',
      category: p.category,
      image_url: p.image_url ?? '',
    })
    setModalOpen(true)
  }

  const updateField = (key: keyof ProductForm, value: string) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'name' && !editing) next.slug = slugify(value)
      return next
    })
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.description.trim()) {
      toast.error('Name and description are required')
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        price: form.price ? parseFloat(form.price) : undefined,
      }
      if (editing) {
        await api.put(`/admin/products/${editing.id}`, payload)
        toast.success('Product updated')
      } else {
        await api.post('/admin/products', payload)
        toast.success('Product created')
      }
      setModalOpen(false)
      loadProducts()
    } catch {
      toast.error('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/admin/products/${id}`)
      toast.success('Product deleted')
      loadProducts()
    } catch {
      toast.error('Failed to delete product')
    }
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Products
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Product catalogue
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage products available on the WillBry platform.
              </p>
            </div>
            <Button leftIcon={<PlusCircle size={16} />} onClick={openCreate}>
              Add product
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
          ) : products.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No products yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Product', 'Category', 'Price', 'Status', 'Created', 'Actions'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {products.map((p) => (
                      <tr key={p.id} className="transition-colors hover:bg-willbry-light">
                        <td className="px-6 py-4">
                          <p className="font-black text-willbry-green-900">{p.name}</p>
                          <p className="text-xs text-gray-500">{p.slug}</p>
                        </td>
                        <td className="px-6 py-4"><Badge variant="teal">{p.category}</Badge></td>
                        <td className="px-6 py-4 text-sm font-bold text-willbry-green-900">
                          {p.price != null ? `UGX ${p.price.toLocaleString()}` : '—'}
                          {p.unit ? ` / ${p.unit}` : ''}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={p.active ? 'green' : 'red'} dot>
                            {p.active ? 'Active' : 'Inactive'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {formatDate(p.created_at)}
                        </td>
                        <td className="flex items-center gap-2 px-6 py-4">
                          <Button size="sm" variant="secondary" onClick={() => openEdit(p)}>Edit</Button>
                          <Button size="sm" variant="danger" leftIcon={<Trash2 size={14} />} onClick={() => handleDelete(p.id)}>
                            Delete
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
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit product' : 'Add product'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>
              {editing ? 'Save changes' : 'Create product'}
            </Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input label="Name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
          <Input label="Slug" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} required />
          <div>
            <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">Category</label>
            <select
              value={form.category}
              onChange={(e) => updateField('category', e.target.value)}
              className="h-11 w-full rounded-xl border border-willbry-green-100 bg-white px-4 text-sm text-willbry-green-900 outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
            >
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <Input label="Price (UGX)" type="number" value={form.price} onChange={(e) => updateField('price', e.target.value)} />
          <Input label="Unit" value={form.unit} onChange={(e) => updateField('unit', e.target.value)} hint="e.g. kg, bag, litre" />
          <Input label="Image URL" value={form.image_url} onChange={(e) => updateField('image_url', e.target.value)} />
          <div>
            <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              rows={4}
              className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm leading-7 text-willbry-green-900 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
            />
          </div>
        </div>
      </Modal>
    </main>
  )
}
