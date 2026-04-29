import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  BarChart3,
  Bot,
  FileText,
  Image,
  Package,
  Save,
  Settings,
  ShoppingBag,
  Users,
} from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Button } from '../../components/ui/Button'
import { Input } from '../../components/ui/Input'
import type { BlogCategory } from '../../types'

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

export default function AdminBlogEditor() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: 'agri_tech' as BlogCategory,
    cover_image: '',
    published: false,
  })

  const update = (key: keyof typeof form, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const submit = (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)

    setTimeout(() => {
      toast.success('Blog post saved')
      setLoading(false)
      navigate('/admin/blog')
    }, 500)
  }

  return (
    <main className="flex min-h-screen bg-willbry-light">
      <div className="hidden lg:block">
        <Sidebar items={adminItems} title="Admin Panel" />
      </div>

      <section className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-5xl">
          <button
            onClick={() => navigate('/admin/blog')}
            className="mb-6 inline-flex items-center gap-2 text-sm font-black text-willbry-green-600"
          >
            <ArrowLeft size={16} />
            Back to blog
          </button>

          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              Blog editor
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
              Create agricultural content
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
              Write farming insights, market updates, company news, and innovation stories.
            </p>
          </div>

          <form onSubmit={submit} className="rounded-[2rem] bg-white p-6 shadow-card sm:p-8">
            <div className="grid gap-5">
              <Input
                label="Title"
                required
                value={form.title}
                onChange={(e) => update('title', e.target.value)}
                placeholder="Digital farming tools for better decisions"
              />

              <Input
                label="Slug"
                required
                value={form.slug}
                onChange={(e) => update('slug', e.target.value)}
                placeholder="digital-farming-tools-better-decisions"
              />

              <Input
                label="Cover image URL"
                value={form.cover_image}
                onChange={(e) => update('cover_image', e.target.value)}
                placeholder="https://..."
              />

              <div>
                <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) => update('category', e.target.value as BlogCategory)}
                  className="h-11 w-full rounded-xl border border-willbry-green-100 px-4 text-sm font-semibold text-willbry-green-900 outline-none focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                >
                  <option value="farming_tips">Farming Tips</option>
                  <option value="company_news">Company News</option>
                  <option value="agri_tech">Agri-tech</option>
                  <option value="market_trends">Market Trends</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                  Excerpt
                </label>
                <textarea
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) => update('excerpt', e.target.value)}
                  className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-black text-willbry-green-900">
                  Content
                </label>
                <textarea
                  rows={14}
                  required
                  value={form.content}
                  onChange={(e) => update('content', e.target.value)}
                  className="w-full rounded-2xl border border-willbry-green-100 px-4 py-3 text-sm leading-7 outline-none transition-all focus:border-willbry-teal focus:ring-4 focus:ring-willbry-teal/15"
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl bg-willbry-light p-4 text-sm font-black text-willbry-green-900">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => update('published', e.target.checked)}
                />
                Publish immediately
              </label>

              <div className="flex justify-end">
                <Button type="submit" loading={loading} leftIcon={<Save size={16} />}>
                  Save Post
                </Button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}