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
import { formatDate } from '../../lib/utils'
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

interface Farmer {
  id: string
  name: string
  location: string
  district: string
  crops: string
  phone?: string
  email?: string
  active: boolean
  created_at: string
}

interface FarmerForm {
  name: string
  location: string
  district: string
  crops: string
  phone: string
  email: string
}

const emptyFarmerForm: FarmerForm = {
  name: '',
  location: '',
  district: '',
  crops: '',
  phone: '',
  email: '',
}

export default function AdminFarmers() {
  const [farmers, setFarmers] = useState<Farmer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Farmer | null>(null)
  const [form, setForm] = useState<FarmerForm>(emptyFarmerForm)
  const [saving, setSaving] = useState(false)

  const loadFarmers = () => {
    setLoading(true)
    api.get('/admin/farmers')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setFarmers(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load farmers.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadFarmers() }, [])

  const openCreate = () => {
    setEditing(null)
    setForm(emptyFarmerForm)
    setModalOpen(true)
  }

  const openEdit = (f: Farmer) => {
    setEditing(f)
    setForm({
      name: f.name,
      location: f.location,
      district: f.district,
      crops: f.crops,
      phone: f.phone ?? '',
      email: f.email ?? '',
    })
    setModalOpen(true)
  }

  const updateField = (key: keyof FarmerForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = async () => {
    if (!form.name.trim() || !form.location.trim() || !form.district.trim()) {
      toast.error('Name, location and district are required')
      return
    }
    setSaving(true)
    try {
      const payload = {
        ...form,
        phone: form.phone || undefined,
        email: form.email || undefined,
      }
      if (editing) {
        await api.put(`/admin/farmers/${editing.id}`, payload)
        toast.success('Farmer updated')
      } else {
        await api.post('/admin/farmers', payload)
        toast.success('Farmer added')
      }
      setModalOpen(false)
      loadFarmers()
    } catch {
      toast.error('Failed to save farmer')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this farmer?')) return
    try {
      await api.delete(`/admin/farmers/${id}`)
      toast.success('Farmer removed')
      loadFarmers()
    } catch {
      toast.error('Failed to remove farmer')
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
                Farmers
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Farmer directory
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage farmers listed in the WillBry farmer directory.
              </p>
            </div>
            <Button leftIcon={<PlusCircle size={16} />} onClick={openCreate}>
              Add farmer
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
          ) : farmers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No farmers registered yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Name', 'District', 'Crops', 'Contact', 'Status', 'Added', 'Actions'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {farmers.map((f) => (
                      <tr key={f.id} className="transition-colors hover:bg-willbry-light">
                        <td className="px-6 py-4">
                          <p className="font-black text-willbry-green-900">{f.name}</p>
                          <p className="text-xs text-gray-500">{f.location}</p>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-willbry-green-800">{f.district}</td>
                        <td className="max-w-[160px] px-6 py-4 text-sm text-gray-600">
                          <p className="truncate">{f.crops}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          <p>{f.phone ?? '—'}</p>
                          {f.email && <p className="text-xs">{f.email}</p>}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={f.active ? 'green' : 'red'} dot>
                            {f.active ? 'Active' : 'Removed'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {formatDate(f.created_at)}
                        </td>
                        <td className="flex items-center gap-2 px-6 py-4">
                          <Button size="sm" variant="secondary" onClick={() => openEdit(f)}>Edit</Button>
                          <Button size="sm" variant="danger" leftIcon={<Trash2 size={14} />} onClick={() => handleDelete(f.id)}>
                            Remove
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
        title={editing ? 'Edit farmer' : 'Add farmer'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleSave}>
              {editing ? 'Save changes' : 'Add farmer'}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input label="Full name" value={form.name} onChange={(e) => updateField('name', e.target.value)} required />
          <Input label="Location" value={form.location} onChange={(e) => updateField('location', e.target.value)} required />
          <Input label="District" value={form.district} onChange={(e) => updateField('district', e.target.value)} required />
          <Input label="Phone" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} />
          <Input label="Email" type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} />
          <div className="sm:col-span-2">
            <Input
              label="Crops"
              value={form.crops}
              onChange={(e) => updateField('crops', e.target.value)}
              hint="Comma-separated, e.g. maize, beans, coffee"
              required
            />
          </div>
        </div>
      </Modal>
    </main>
  )
}
