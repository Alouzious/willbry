import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/layout/Sidebar'
import Spinner from '../../components/ui/Spinner'
import Badge from '../../components/ui/Badge'
import Button from '../../components/ui/Button'
import type { BlogPost } from '../../types'
import api from '../../lib/api'
import toast from 'react-hot-toast'
import { formatDate } from '../../lib/utils'
import { Plus, Edit, Trash2 } from 'lucide-react'

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/admin/blog')
      .then(res => setPosts(res.data.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return
    try {
      await api.delete(`/admin/blog/${id}`)
      setPosts(prev => prev.filter(p => p.id !== id))
      toast.success('Post deleted')
    } catch {
      toast.error('Failed to delete post')
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar role="admin" />
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
              <p className="text-gray-500 mt-1">Manage articles and news</p>
            </div>
            <Link to="/admin/blog/new">
              <Button variant="primary"><Plus className="h-4 w-4" /> New Post</Button>
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
            {loading ? (
              <div className="flex justify-center py-20"><Spinner size="lg" /></div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No posts yet. Create your first blog post!</div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-left">
                    <th className="py-3 px-4 font-semibold text-gray-600">Title</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Category</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Date</th>
                    <th className="py-3 px-4 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate">{p.title}</td>
                      <td className="py-3 px-4">
                        <Badge variant="info">{p.category.replace('_', ' ')}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={p.published ? 'success' : 'warning'}>{p.published ? 'Published' : 'Draft'}</Badge>
                      </td>
                      <td className="py-3 px-4 text-gray-500">{formatDate(p.created_at)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Link to={`/admin/blog/${p.id}/edit`} className="text-[#2d6a4f] hover:opacity-80">
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button onClick={() => deletePost(p.id)} className="text-red-500 hover:opacity-80">
                            <Trash2 className="h-4 w-4" />
                          </button>
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
    </div>
  )
}
