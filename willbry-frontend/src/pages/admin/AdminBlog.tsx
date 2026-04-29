import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Bot, Edit3, FileText, Image, Package, Plus, Settings, ShoppingBag, Trash2, Users } from 'lucide-react'
import toast from 'react-hot-toast'
import Sidebar from '../../components/layout/Sidebar'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../lib/utils'
import { adminListPosts, deletePost } from '../../services/admin.service'
import type { BlogPost } from '../../types'

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

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const load = async () => {
      try {
        const data = await adminListPosts()
        setPosts(Array.isArray(data) ? data : [])
      } catch {
        toast.error('Failed to load posts')
      }
    }
    void load()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await deletePost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
      toast.success('Post deleted')
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
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                Blog CMS
              </p>
              <h1 className="mt-3 text-4xl font-black tracking-tight text-willbry-green-900">
                Manage agriculture insights
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600">
                Publish farming tips, company news, market trends, and agri-tech updates.
              </p>
            </div>
            <Link to="/admin/blog/new">
              <Button leftIcon={<Plus size={16} />}>New Post</Button>
            </Link>
          </div>

          <div className="overflow-hidden rounded-3xl border border-willbry-green-100 bg-white shadow-card">
            <table className="w-full min-w-[850px] text-left">
              <thead className="bg-willbry-light">
                <tr>
                  {['Title', 'Category', 'Status', 'Date', 'Actions'].map((head) => (
                    <th key={head} className="px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-willbry-green-700">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-willbry-green-100">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-willbry-light">
                    <td className="px-6 py-4">
                      <p className="font-black text-willbry-green-900">{post.title}</p>
                      <p className="text-xs text-gray-500">/{post.slug}</p>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="teal">{post.category.replaceAll('_', ' ')}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={post.published ? 'green' : 'yellow'} dot>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      {formatDate(post.created_at)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link to={`/admin/blog/${post.id}/edit`}>
                          <Button size="sm" variant="secondary" leftIcon={<Edit3 size={15} />}>
                            Edit
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          variant="danger"
                          leftIcon={<Trash2 size={15} />}
                          onClick={() => handleDelete(post.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  )
}