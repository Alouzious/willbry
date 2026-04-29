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

interface GalleryImage {
  id: string
  url: string
  caption?: string
  category: string
  active: boolean
  created_at: string
}

const galleryCategories = ['farm', 'products', 'team', 'events', 'general']

export default function AdminGallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ url: '', caption: '', category: 'general' })

  const loadImages = () => {
    setLoading(true)
    api.get('/admin/gallery')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setImages(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load gallery images.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadImages() }, [])

  const handleAdd = async () => {
    if (!form.url.trim()) {
      toast.error('Image URL is required')
      return
    }
    setSaving(true)
    try {
      await api.post('/admin/gallery', form)
      toast.success('Image added')
      setModalOpen(false)
      setForm({ url: '', caption: '', category: 'general' })
      loadImages()
    } catch {
      toast.error('Failed to add image')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this image?')) return
    try {
      await api.delete(`/admin/gallery/${id}`)
      toast.success('Image removed')
      loadImages()
    } catch {
      toast.error('Failed to remove image')
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
                Gallery
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Photo gallery
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Manage images shown on the public gallery page.
              </p>
            </div>
            <Button leftIcon={<PlusCircle size={16} />} onClick={() => setModalOpen(true)}>
              Add image
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
          ) : images.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No images yet.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card"
                >
                  <div className="relative aspect-video overflow-hidden bg-willbry-light">
                    <img
                      src={img.url}
                      alt={img.caption ?? 'Gallery image'}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/400x225?text=No+Image'
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <Badge variant="teal" size="sm">{img.category}</Badge>
                        {img.caption && (
                          <p className="mt-1 truncate text-sm font-bold text-willbry-green-900">
                            {img.caption}
                          </p>
                        )}
                        <p className="mt-1 text-xs text-gray-500">{formatDate(img.created_at)}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="danger"
                        leftIcon={<Trash2 size={13} />}
                        onClick={() => handleDelete(img.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add gallery image"
        footer={
          <>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button loading={saving} onClick={handleAdd}>Add image</Button>
          </>
        }
      >
        <div className="grid gap-4">
          <Input
            label="Image URL"
            value={form.url}
            onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
            hint="Paste a direct image URL"
            required
          />
          <Input
            label="Caption"
            value={form.caption}
            onChange={(e) => setForm((p) => ({ ...p, caption: e.target.value }))}
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
              {galleryCategories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </Modal>
    </main>
  )
}
