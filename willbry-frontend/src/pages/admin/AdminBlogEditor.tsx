import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  Bot,
  CalendarCheck,
  FileText,
  Image,
  Leaf,
  Loader2,
  MessageCircle,
  Package,
  Save,
  ShoppingBag,
  TrendingUp,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'
import { slugify } from '../../lib/utils'

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

const categories = ['farming_tips', 'company_news', 'agri_tech', 'market_trends']

interface PostForm {
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  cover_image: string
  published: boolean
}

const empty: PostForm = {
  title: '',
  slug: '',
  content: '',
  excerpt: '',
  category: 'farming_tips',
  cover_image: '',
  published: false,
}

export default function AdminBlogEditor() {
  const { id } = useParams<{ id: string }>()
  const isEditing = !!id
  const navigate = useNavigate()

  const [form, setForm] = useState<PostForm>(empty)
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEditing)

  useEffect(() => {
    if (!id) return
    api.get(`/admin/blog`)
      .then((res) => {
        const posts = res.data?.data ?? res.data
        const post = Array.isArray(posts) ? posts.find((p: { id: string }) => p.id === id) : null
        if (post) {
          setForm({
            title: post.title ?? '',
            slug: post.slug ?? '',
            content: post.content ?? '',
            excerpt: post.excerpt ?? '',
            category: post.category ?? 'farming_tips',
            cover_image: post.cover_image ?? '',
            published: post.published ?? false,
          })
        }
      })
      .catch(() => toast.error('Failed to load post'))
      .finally(() => setFetching(false))
  }, [id])

  const update = (key: keyof PostForm, value: string | boolean) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && typeof value === 'string' && !isEditing) {
        next.slug = slugify(value)
      }
      return next
    })
  }

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.content.trim()) {
      toast.error('Title and content are required')
      return
    }
    setLoading(true)
    try {
      if (isEditing) {
        await api.put(`/admin/blog/${id}`, form)
        toast.success('Post updated')
      } else {
        await api.post('/admin/blog', form)
        toast.success('Post created')
      }
      navigate('/admin/blog')
    } catch {
      toast.error('Failed to save post')
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-willbry-light">
        <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
      </main>
    )
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <Link to="/admin/blog">
            <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={16} />}>
              Back to blog
            </Button>
          </Link>

          <div className="mt-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              {isEditing ? 'Edit post' : 'New post'}
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              {isEditing ? 'Edit blog post' : 'Create blog post'}
            </h1>
          </div>

          <div className="mt-8 grid gap-6 rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
            <Input
              label="Title"
              value={form.title}
              onChange={(e) => update('title', e.target.value)}
              required
            />
            <Input
              label="Slug"
              value={form.slug}
              onChange={(e) => update('slug', e.target.value)}
              hint="URL-friendly identifier"
              required
            />

            <div>
              <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">
                Category <span className="ml-1 text-willbry-accent">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="h-11 w-full rounded-xl border border-willbry-green-100 bg-white px-4 text-sm text-willbry-green-900 outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <Input
              label="Cover image URL"
              value={form.cover_image}
              onChange={(e) => update('cover_image', e.target.value)}
              hint="Paste a direct image URL"
            />

            <div>
              <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">
                Excerpt
              </label>
              <textarea
                value={form.excerpt}
                onChange={(e) => update('excerpt', e.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm leading-7 text-willbry-green-900 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900">
                Content <span className="ml-1 text-willbry-accent">*</span>
              </label>
              <textarea
                value={form.content}
                onChange={(e) => update('content', e.target.value)}
                rows={16}
                className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm leading-7 text-willbry-green-900 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => update('published', e.target.checked)}
                className="h-5 w-5 rounded border-willbry-green-200 text-willbry-teal"
              />
              <span className="text-sm font-semibold text-willbry-green-900">Publish immediately</span>
            </label>

            <div className="flex justify-end">
              <Button loading={loading} leftIcon={<Save size={16} />} onClick={handleSubmit}>
                {isEditing ? 'Save changes' : 'Create post'}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
