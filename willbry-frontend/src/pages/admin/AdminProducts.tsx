import { useEffect, useMemo, useState } from 'react'
import { BarChart3, Bot, FileText, Image, Package, Pencil, Plus, Search, Settings, ShoppingBag, Trash2, Users, X } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'
import {
  adminListProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  type CreateProductDto,
} from '../../services/admin.service'

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

const CATEGORIES = ['food', 'seeds', 'digital', 'training', 'consultancy']

const emptyForm: CreateProductDto = {
  name: '',
  slug: '',
  description: '',
  price: undefined,
  unit: '',
  category: 'food',
  image_url: '',
  active: true,
}

interface Product extends CreateProductDto {
  id: string
  created_at: string
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [query, setQuery] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [form, setForm] = useState<CreateProductDto>(emptyForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    void load()
  }, [])

  const load = async () => {
    try {
      const data = await adminListProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch {
      toast.error('Failed to load products')
    }
  }

  const filtered = useMemo(() => {
    const search = query.toLowerCase()
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    )
  }, [query, products])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (p: Product) => {
    setEditing(p)
    setForm({
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      unit: p.unit,
      category: p.category,
      image_url: p.image_url,
      active: p.active,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.slug || !form.description) {
      toast.error('Name, slug, and description are required')
      return
    }
    setSaving(true)
    try {
      if (editing) {
        const updated = await updateProduct(editing.id, form)
        setProducts((prev) => prev.map((p) => (p.id === editing.id ? { ...p, ...updated } : p)))
        toast.success('Product updated')
      } else {
        const created = await createProduct(form)
        setProducts((prev) => [created, ...prev])
        toast.success('Product created')
      }
      setShowModal(false)
    } catch {
      toast.error('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (p: Product) => {
    if (!confirm(`Delete "${p.name}"?`)) return
    try {
      await deleteProduct(p.id)
      setProducts((prev) => prev.filter((x) => x.id !== p.id))
      toast.success('Product deleted')
    } catch {
      toast.error('Failed to delete product')
    }
  }

  const set = (key: keyof CreateProductDto, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const autoSlug = (name: string) =>
    name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_auto_auto] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Product catalogue
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Products
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage your product catalogue — food, seeds, digital products, training, and consultancy.
              </p>
            </div>
            <Input
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              leftIcon={<Search size={17} />}
            />
            <Button onClick={openCreate} className="flex items-center gap-2">
              <Plus size={16} /> Add Product
            </Button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3 text-left">Product</th>
                  <th className="px-4 py-3 text-left">Category</th>
                  <th className="px-4 py-3 text-left">Price</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-400">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img src={p.image_url} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-willbry-teal/10 text-willbry-teal">
                              <Package size={18} />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-gray-900">{p.name}</p>
                            <p className="text-xs text-gray-400">{p.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="rounded-full bg-willbry-teal/10 px-3 py-1 text-xs font-semibold capitalize text-willbry-teal">
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {p.price ? `UGX ${p.price.toLocaleString()}` : '—'}
                        {p.unit ? ` / ${p.unit}` : ''}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${p.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                          {p.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(p)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-willbry-teal transition-colors"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => handleDelete(p)}
                            className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black text-willbry-green-900">
                {editing ? 'Edit Product' : 'New Product'}
              </h2>
              <button onClick={() => setShowModal(false)} className="rounded-lg p-1 hover:bg-gray-100">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Name *</label>
                  <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                    value={form.name}
                    onChange={(e) => {
                      set('name', e.target.value)
                      if (!editing) set('slug', autoSlug(e.target.value))
                    }}
                    placeholder="Product name"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Slug *</label>
                  <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                    value={form.slug}
                    onChange={(e) => set('slug', e.target.value)}
                    placeholder="product-slug"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Description *</label>
                <textarea
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                  rows={3}
                  value={form.description}
                  onChange={(e) => set('description', e.target.value)}
                  placeholder="Product description"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Category</label>
                  <select
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                    value={form.category}
                    onChange={(e) => set('category', e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Price (UGX)</label>
                  <input
                    type="number"
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                    value={form.price ?? ''}
                    onChange={(e) => set('price', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-gray-600">Unit</label>
                  <input
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                    value={form.unit ?? ''}
                    onChange={(e) => set('unit', e.target.value)}
                    placeholder="kg, bag, session"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Image URL</label>
                <input
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-willbry-teal focus:outline-none"
                  value={form.image_url ?? ''}
                  onChange={(e) => set('image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  checked={form.active ?? true}
                  onChange={(e) => set('active', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-willbry-teal"
                />
                <label htmlFor="active" className="text-sm text-gray-700">Active (visible on site)</label>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button onClick={() => setShowModal(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={saving}>
                {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}