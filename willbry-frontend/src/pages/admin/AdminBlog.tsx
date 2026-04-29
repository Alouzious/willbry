import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
import { formatDate } from '../../lib/utils'
import api from '../../lib/api'
import type { BlogPost } from '../../types'

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

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadPosts = () => {
    setLoading(true)
    api.get('/admin/blog')
      .then((res) => {
        const data = res.data?.data ?? res.data
        setPosts(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load blog posts.'))
      .finally(() => setLoading(false))
  }

  useEffect(() => { loadPosts() }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/admin/blog/${id}`)
      toast.success('Post deleted')
      loadPosts()
    } catch {
      toast.error('Failed to delete post')
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
                Blog
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Blog posts
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Create, edit, and publish articles for the WillBry blog.
              </p>
            </div>
            <Link to="/admin/blog/new">
              <Button leftIcon={<PlusCircle size={16} />}>New post</Button>
            </Link>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
              <p className="font-black text-red-700">{error}</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-white p-12 text-center">
              <p className="text-sm font-semibold text-gray-500">No blog posts yet.</p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead className="bg-willbry-light">
                    <tr>
                      {['Title', 'Category', 'Status', 'Views', 'Date', 'Actions'].map((h) => (
                        <th key={h} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-willbry-green-100">
                    {posts.map((post) => (
                      <tr key={post.id} className="transition-colors hover:bg-willbry-light">
                        <td className="px-6 py-4">
                          <p className="font-black text-willbry-green-900">{post.title}</p>
                          <p className="text-xs text-gray-500">{post.slug}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="teal">{post.category}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={post.published ? 'green' : 'gray'} dot>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-willbry-green-900">
                          {/* views field may not be on BlogPost type, guard it */}
                          {(post as BlogPost & { views?: number }).views ?? 0}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-600">
                          {formatDate(post.created_at)}
                        </td>
                        <td className="flex items-center gap-2 px-6 py-4">
                          <Link to={`/admin/blog/${post.id}/edit`}>
                            <Button size="sm" variant="secondary">Edit</Button>
                          </Link>
                          <Button
                            size="sm"
                            variant="danger"
                            leftIcon={<Trash2 size={14} />}
                            onClick={() => handleDelete(post.id)}
                          >
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
    </main>
  )
}
