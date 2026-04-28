import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/layout/Sidebar'
import Modal from '../../components/ui/Modal'
import Button from '../../components/ui/Button'
import Input from '../../components/ui/Input'
import Badge from '../../components/ui/Badge'
import Spinner from '../../components/ui/Spinner'
import ImageUploader from '../../components/admin/ImageUploader'
import type { Product, ProductCategory } from '../../types'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { formatCurrency } from '../../lib/utils'
import { Plus, Edit, Trash2 } from 'lucide-react'

interface ProductFormData {
  name: string
  description: string
  price: string
  unit: string
  category: ProductCategory
  image_url: string
  active: boolean
}

const defaultForm: ProductFormData = {
  name: '', description: '', price: '', unit: '', category: 'food', image_url: '', active: true,
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Product | null>(null)
  const [form, setForm] = useState<ProductFormData>(defaultForm)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const openCreate = () => {
    setEditProduct(null)
    setForm(defaultForm)
    setShowModal(true)
  }

  const openEdit = (p: Product) => {
    setEditProduct(p)
    setForm({
      name: p.name, description: p.description, price: String(p.price || ''),
      unit: p.unit || '', category: p.category, image_url: p.image_url || '', active: p.active,
    })
    setShowModal(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    const payload = { ...form, price: form.price ? Number(form.price) : undefined }
    try {
      if (editProduct) {
        const res = await api.put(`/admin/products/${editProduct.id}`, payload)
        setProducts(prev => prev.map(p => p.id === editProduct.id ? res.data.data : p))
        toast.success('Product updated')
      } else {
        const res = await api.post('/admin/products', payload)
        setProducts(prev => [res.data.data, ...prev])
        toast.success('Product created')
      }
      setShowModal(false)
    } catch {
      toast.error('Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const deleteProduct = async (id: string) => {
    if (!confirm('Delete this product?')) return
    try {
      await api.delete(`/admin/products/${id}`)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.success('Product deleted')
    } catch {
      toast.error('Failed to delete')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-500 mt-1">Manage the product catalog</p>
            </div>
            <Button variant="primary" onClick={openCreate}><Plus className="h-4 w-4" /> Add Product</Button>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Category</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Price</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{p.name}</td>
                      <td className="py-3 px-4"><Badge variant="info">{p.category}</Badge></td>
                      <td className="py-3 px-4">{p.price ? formatCurrency(p.price) : '—'}</td>
                      <td className="py-3 px-4"><Badge variant={p.active ? 'success' : 'error'}>{p.active ? 'Active' : 'Inactive'}</Badge></td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <button onClick={() => openEdit(p)} className="text-[#2d6a4f]"><Edit className="h-4 w-4" /></button>
                          <button onClick={() => deleteProduct(p.id)} className="text-red-500"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      <Modal open={showModal} onClose={() => setShowModal(false)} title={editProduct ? 'Edit Product' : 'Add Product'} size="lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Name" name="name" value={form.name} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} fullWidth required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (KES)" name="price" type="number" value={form.price} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} fullWidth />
            <Input label="Unit" name="unit" value={form.unit} onChange={handleChange as React.ChangeEventHandler<HTMLInputElement>} placeholder="kg, piece, etc." fullWidth />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
            >
              <option value="food">Food</option>
              <option value="seeds">Seeds</option>
              <option value="digital">Digital</option>
              <option value="training">Training</option>
              <option value="consultancy">Consultancy</option>
            </select>
          </div>
          <ImageUploader
            currentImage={form.image_url}
            onUpload={url => setForm(prev => ({ ...prev, image_url: url }))}
          />
          <div className="flex items-center gap-2">
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="w-4 h-4 accent-[#2d6a4f]" />
            <label className="text-sm text-gray-700">Active</label>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" loading={saving}>Save</Button>
            <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
