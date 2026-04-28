import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import ProductCard from '../../components/public/ProductCard'
import Spinner from '../../components/ui/Spinner'
import type { Product, ProductCategory } from '../../types'
import api from '../../lib/api'
import { Search } from 'lucide-react'

const categories: { value: ProductCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'food', label: 'Food' },
  { value: 'seeds', label: 'Seeds' },
  { value: 'digital', label: 'Digital' },
  { value: 'training', label: 'Training' },
  { value: 'consultancy', label: 'Consultancy' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'all'>('all')

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false))
  }, [])

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'all' || p.category === category
    return matchSearch && matchCat
  })

  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Our Products"
        subtitle="Fresh, quality agricultural products from verified farmers"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Products' }]}
      />

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
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
              <p className="text-xl font-medium mb-2">No products found</p>
              <p className="text-sm">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
