import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  BarChart3,
  Bot,
  FileText,
  Image,
  ImagePlus,
  Package,
  Pencil,
  Settings,
  ShoppingBag,
  Trash2,
  Users,
  X,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Badge } from '../../components/ui/Badge'
import { Input } from '../../components/ui/Input'
import { adminListImages, uploadImage, deleteImage } from '../../services/admin.service'
import type { CreateImageDto } from '../../services/admin.service'

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

interface GalleryImage {
  id: string
  url: string
  caption?: string
  category: string
  active: boolean
  created_at: string
}

const emptyForm: CreateImageDto = { url: '', caption: '', category: '' }

export default function AdminGallery() {
  const qc = useQueryClient()
  const [showModal, setShowModal] = useState(false)
  const [editTarget, setEditTarget] = useState<GalleryImage | null>(null)
  const [form, setForm] = useState<CreateImageDto>(emptyForm)

  const { data: images = [], isLoading } = useQuery({
    queryKey: ['admin-gallery'],
    queryFn: adminListImages,
    staleTime: 1000 * 30,
    select: (raw) => (Array.isArray(raw) ? raw : []) as GalleryImage[],
  })

  const uploadMutation = useMutation({
    mutationFn: (dto: CreateImageDto) => uploadImage(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-gallery'] })
      toast.success('Image added')
      closeModal()
    },
    onError: () => toast.error('Failed to add image'),
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteImage(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-gallery'] })
      toast.success('Image deleted')
    },
    onError: () => toast.error('Failed to delete image'),
  })

  // Backend has no PUT /admin/gallery/:id so we delete + re-upload to edit
  const editMutation = useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: CreateImageDto }) => {
      await deleteImage(id)
      await uploadImage(dto)
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['admin-gallery'] })
      toast.success('Image updated')
      closeModal()
    },
    onError: () => toast.error('Failed to update image'),
  })

  const openAdd = () => {
    setEditTarget(null)
    setForm(emptyForm)
    setShowModal(true)
  }

  const openEdit = (img: GalleryImage) => {
    setEditTarget(img)
    setForm({ url: img.url, caption: img.caption ?? '', category: img.category })
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditTarget(null)
    setForm(emptyForm)
  }

  const handleSubmit = () => {
    if (!form.url.trim()) return toast.error('Image URL is required')
    if (!form.category.trim()) return toast.error('Category is required')

    if (editTarget) {
      editMutation.mutate({ id: editTarget.id, dto: form })
    } else {
      uploadMutation.mutate(form)
    }
  }

  const busy = uploadMutation.isPending || editMutation.isPending

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Gallery CMS
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Manage visual stories
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Upload and manage images from farms, products, events, trainings, and partnerships.
              </p>
            </div>
            <Button leftIcon={<ImagePlus size={16} />} onClick={openAdd}>
              Upload Image
            </Button>
          </div>

          {/* Grid */}
          {isLoading ? (
            <p className="text-sm text-gray-500">Loading images…</p>
          ) : images.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="font-black text-willbry-green-900">No images yet.</p>
              <p className="mt-2 text-sm text-gray-500">Click Upload Image to add your first one.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {images.map((image) => (
                <article
                  key={image.id}
                  className="overflow-hidden rounded-[2rem] border border-willbry-green-100 bg-white shadow-card"
                >
                  <img
                    src={image.url}
                    alt={image.caption ?? image.category}
                    className="h-64 w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://placehold.co/900x400?text=Image+not+found'
                    }}
                  />
                  <div className="p-5">
                    <Badge variant="teal" size="sm">{image.category}</Badge>
                    <h3 className="mt-3 text-lg font-black text-willbry-green-900">
                      {image.caption ?? image.category}
                    </h3>
                    {!image.active && (
                      <p className="mt-1 text-xs text-gray-400">Hidden from public</p>
                    )}
                    <div className="mt-5 flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        leftIcon={<Pencil size={14} />}
                        onClick={() => openEdit(image)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        leftIcon={<Trash2 size={14} />}
                        onClick={() => deleteMutation.mutate(image.id)}
                        disabled={deleteMutation.isPending}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-[2rem] bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-black text-willbry-green-900">
                {editTarget ? 'Edit image' : 'Upload image'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>

            <div className="grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                  Image URL *
                </label>
                <Input
                  placeholder="https://..."
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                  Caption
                </label>
                <Input
                  placeholder="e.g. Community training session"
                  value={form.caption ?? ''}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                  Category *
                </label>
                <Input
                  placeholder="e.g. Farm Activities, Events, Products"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
              </div>

              {form.url && (
                <img
                  src={form.url}
                  alt="Preview"
                  className="mt-2 h-48 w-full rounded-2xl object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none'
                  }}
                />
              )}
            </div>

            <div className="mt-6 flex gap-3">
              <Button onClick={handleSubmit} disabled={busy}>
                {busy ? 'Saving…' : editTarget ? 'Save changes' : 'Upload'}
              </Button>
              <Button variant="secondary" onClick={closeModal} disabled={busy}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}