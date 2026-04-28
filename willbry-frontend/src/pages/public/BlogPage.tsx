import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import BlogCard from '../../components/public/BlogCard'
import Spinner from '../../components/ui/Spinner'
import type { BlogPost, BlogCategory } from '../../types'
import api from '../../lib/api'
import { Search } from 'lucide-react'

const categories: { value: BlogCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'farming_tips', label: 'Farming Tips' },
  { value: 'company_news', label: 'Company News' },
  { value: 'agri_tech', label: 'Agri Tech' },
  { value: 'market_trends', label: 'Market Trends' },
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<BlogCategory | 'all'>('all')

  useEffect(() => {
    api.get('/blog')
      .then(res => setPosts(res.data.data || []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || p.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Blog & News"
        subtitle="Insights, tips, and updates from the WillBry team"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Blog' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map(c => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    category === c.value
                      ? 'bg-[#2d6a4f] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><Spinner size="lg" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p className="text-xl font-medium mb-2">No articles found</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(p => <BlogCard key={p.id} post={p} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
