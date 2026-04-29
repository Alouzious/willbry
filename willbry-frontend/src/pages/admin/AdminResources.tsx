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

interface Resource {
  id: string
  title: string
  file_url: string
  category: string
  description?: string
  download_count: number
  active: boolean
  created_at: string
}

const resourceCategories = ['guides', 'manuals', 'reports', 'templates', 'videos', 'other']

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ title: '', file_url: '', category: 'guides', description: '' })

  const loadResources = () => {
    setLoading(true)
    api.get('/admin/resources')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setResources(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load resources.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadResources() }, [])

  const handleAdd = async () => {
    if (!form.title.trim() || !form.file_url.trim()) {
      toast.error('Title and file URL are required')
      return
    }
    setSaving(true)
    try {
      await api.post('/admin/resources', form)
      toast.success('Resource added')
      setModalOpen(false)
      setForm({ title: '', file_url: '', category: 'guides', description: '' })
      loadResources()
    } catch {
      toast.error('Failed to add resource')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this resource?')) return
    try {
      await api.delete(`/admin/resources/${id}`)
      toast.success('Resource removed')
      loadResources()
    } catch {
      toast.error('Failed to remove resource')
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
                Resources
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Resource library
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage downloadable guides and documents for portal users.
              </p>
            </div>
            <Button leftIcon={<PlusCircle size={16} />} onClick={() => setModalOpen(true)}>
              Add resource
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
          ) : resources.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No resources yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Title', 'Category', 'Downloads', 'Status', 'Added', 'Action'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {resources.map((r) => (
                      <tr key={r.id} className="transition-colors hover:bg-willbry-light">
                        <td className="px-6 py-4">
                          <p className="font-black text-willbry-green-900">{r.title}</p>
                          {r.description && (
                            <p className="text-xs text-gray-500 line-clamp-1">{r.description}</p>
                          )}
                        </td>
                        <td className="px-6 py-4"><Badge variant="teal">{r.category}</Badge></td>
                        <td className="px-6 py-4 text-sm font-bold text-willbry-green-900">
                          {r.download_count}
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={r.active ? 'green' : 'red'} dot>
                            {r.active ? 'Active' : 'Removed'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {formatDate(r.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <Button
                            size="sm"
                            variant="danger"
                            leftIcon={<Trash2 size={14} />}
                            onClick={() => handleDelete(r.id)}
                          >
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
        title="Add resource"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleAdd}>Add resource</Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input
            label="Title"
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
            required
          />
          <Input
            label="File URL"
            value={form.file_url}
            onChange={(e) => setForm((p) => ({ ...p, file_url: e.target.value }))}
            hint="Direct link to the file (PDF, DOCX, etc.)"
            required
          />
          <div>
            <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
              className="h-11 w-full rounded-xl border border-willbry-green-100 bg-white px-4 text-sm text-willbry-green-900 outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
            >
              {resourceCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm leading-7 text-willbry-green-900 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
            />
          </div>
        </div>
      </Modal>
    </main>
  )
}
