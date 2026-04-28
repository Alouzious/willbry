import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import Spinner from '../../components/ui/Spinner'
import type { BlogPost } from '../../types'
import api from '../../lib/api'
import { formatDateLong } from '../../lib/utils'
import { ArrowLeft, Calendar, User } from 'lucide-react'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    api.get(`/blog/${slug}`)
      .then(res => setPost(res.data.data))
      .catch(() => setError('Article not found'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex justify-center items-center py-40"><Spinner size="lg" /></div>
        <Footer />
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="max-w-2xl mx-auto text-center py-40">
          <p className="text-2xl font-bold text-gray-800 mb-4">{error || 'Article not found'}</p>
          <Link to="/blog" className="text-[#2d6a4f] hover:underline">← Back to Blog</Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/blog" className="inline-flex items-center gap-2 text-[#2d6a4f] hover:underline mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        {post.cover_image && (
          <img src={post.cover_image} alt={post.title} className="w-full h-64 sm:h-96 object-cover rounded-2xl mb-8" />
        )}

        <div className="mb-6">
          <span className="inline-block bg-[#f0f7e8] text-[#2d6a4f] text-xs font-semibold px-3 py-1 rounded-full mb-4 uppercase tracking-wide">
            {post.category.replace('_', ' ')}
          </span>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center gap-5 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {post.author_name}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> {formatDateLong(post.created_at)}
            </span>
          </div>
        </div>

        <div
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      <Footer />
    </div>
  )
}
