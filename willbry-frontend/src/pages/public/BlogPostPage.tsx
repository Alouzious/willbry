import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Loader2, UserRound } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { formatDate } from '../../lib/utils'
import api from '../../lib/api'
import type { BlogPost } from '../../types'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    setError(null)
    api.get(`/blog/${slug}`)
      .then((res) => {
        const data = res.data?.data ?? res.data
        setPost(data)
      })
      .catch(() => setError('Blog post not found or failed to load.'))
      .finally(() => setLoading(false))
  }, [slug])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
        </main>
        <Footer />
      </>
    )
  }

  if (error || !post) {
    return (
      <>
        <Navbar />
        <main className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <p className="text-2xl font-black text-willbry-green-900">Post not found</p>
            <p className="mt-3 text-gray-600">{error}</p>
            <Link to="/blog" className="mt-6 inline-block">
              <Button variant="secondary" leftIcon={<ArrowLeft size={16} />}>
                Back to blog
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="WillBry Insights"
          title={post.title}
          description={post.excerpt}
        />

        <article className="bg-white py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link to="/blog">
              <Button variant="secondary" size="sm" leftIcon={<ArrowLeft size={16} />}>
                Back to blog
              </Button>
            </Link>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <Badge variant="teal">{post.category.replaceAll('_', ' ')}</Badge>
              <span className="flex items-center gap-2">
                <CalendarDays size={16} className="text-willbry-teal" />
                {formatDate(post.created_at)}
              </span>
              <span className="flex items-center gap-2">
                <UserRound size={16} className="text-willbry-teal" />
                {post.author_name ?? 'WillBry Team'}
              </span>
            </div>

            {post.cover_image && (
              <img
                src={post.cover_image}
                alt={post.title}
                className="mt-8 w-full rounded-3xl object-cover"
              />
            )}

            <div className="prose prose-lg mt-10 max-w-none prose-headings:text-willbry-green-900 prose-p:leading-8 prose-a:text-willbry-green-600">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
