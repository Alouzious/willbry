import { useEffect, useMemo, useState } from 'react'
import { Loader2, Search } from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import BlogCard from '../../components/public/BlogCard'
import { Input } from '../../components/ui/Input'
import api from '../../lib/api'
import type { BlogCategory, BlogPost } from '../../types'

const categories: Array<'all' | BlogCategory> = [
  'all',
  'farming_tips',
  'company_news',
  'agri_tech',
  'market_trends',
]

export default function BlogPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<'all' | BlogCategory>('all')
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    api.get('/blog', { params: { per_page: 50 } })
      .then((res) => {
        const data = res.data?.data ?? res.data
        setPosts(Array.isArray(data) ? data : [])
      })
      .catch(() => setError('Failed to load blog posts. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const filteredPosts = useMemo(() => {
    const search = query.toLowerCase()

    return posts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(search) ||
        post.excerpt?.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)

      const matchesCategory = category === 'all' || post.category === category

      return matchesSearch && matchesCategory
    })
  }, [query, category, posts])

  return (
    <>
      <Navbar />
      <main>
        <PageBanner
          eyebrow="Blog & insights"
          title="Ideas for smarter agriculture and stronger value chains."
          description="Read practical updates from WillBry on farming, innovation, markets, value addition, and digital agriculture."
        />

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
              <Input
                placeholder="Search articles..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                leftIcon={<Search size={17} />}
              />

              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={[
                      'rounded-full border px-4 py-2 text-sm font-black capitalize transition-all',
                      category === item
                        ? 'border-willbry-green-500 bg-willbry-green-500 text-white'
                        : 'border-willbry-green-100 bg-white text-willbry-green-700 hover:bg-willbry-green-50',
                    ].join(' ')}
                  >
                    {item.replaceAll('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-willbry-green-500" />
              </div>
            ) : error ? (
              <div className="rounded-3xl border border-dashed border-red-200 bg-red-50 p-12 text-center">
                <p className="font-black text-red-700">{error}</p>
              </div>
            ) : (
              <>
                <div className="grid gap-6 lg:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>

                {!filteredPosts.length && (
                  <div className="rounded-3xl border border-dashed border-willbry-green-200 bg-willbry-light p-12 text-center">
                    <p className="font-black text-willbry-green-900">No articles found.</p>
                    <p className="mt-2 text-sm text-gray-500">Try another search or category.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
