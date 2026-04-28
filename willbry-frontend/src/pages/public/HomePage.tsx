import { useEffect, useState } from 'react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import HeroSection from '../../components/public/HeroSection'
import ServicesGrid from '../../components/public/ServicesGrid'
import ProductCard from '../../components/public/ProductCard'
import BlogCard from '../../components/public/BlogCard'
import TestimonialsCarousel from '../../components/public/TestimonialsCarousel'
import AiPreviewWidget from '../../components/public/AiPreviewWidget'
import Spinner from '../../components/ui/Spinner'
import type { Product, BlogPost } from '../../types'
import api from '../../lib/api'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const testimonials = [
  { id: '1', name: 'James Mwangi', role: 'Smallholder Farmer, Nakuru', content: 'WillBry transformed my farming business. The AI assistant helped me identify pest problems early and the market prices helped me negotiate better deals.' },
  { id: '2', name: 'Grace Akinyi', role: 'Vegetable Farmer, Kisumu', content: 'I enrolled in the digital training program and now I manage my irrigation system with a smartphone. Sales are up 60% this season.' },
  { id: '3', name: 'Peter Kamau', role: 'Agribusiness Client, Nairobi', content: 'The fresh produce quality is exceptional. I trust WillBry to supply my restaurant with the best ingredients every week.' },
]

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [blogs, setBlogs] = useState<BlogPost[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingBlogs, setLoadingBlogs] = useState(true)

  useEffect(() => {
    api.get('/products?limit=6')
      .then(res => setProducts(res.data.data || []))
      .catch(() => setProducts([]))
      .finally(() => setLoadingProducts(false))
  }, [])

  useEffect(() => {
    api.get('/blog?limit=3')
      .then(res => setBlogs(res.data.data || []))
      .catch(() => setBlogs([]))
      .finally(() => setLoadingBlogs(false))
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesGrid />

      {/* Featured Products */}
      <section className="py-20 bg-[#f0f7e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#0d2b18] mb-2">Featured Products</h2>
              <p className="text-gray-600">Fresh from our partner farms</p>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-[#2d6a4f] font-medium hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {loadingProducts ? (
            <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* Featured Blog */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-[#0d2b18] mb-2">From the Blog</h2>
              <p className="text-gray-600">Insights, tips, and news from our experts</p>
            </div>
            <Link to="/blog" className="flex items-center gap-2 text-[#2d6a4f] font-medium hover:underline">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {loadingBlogs ? (
            <div className="flex justify-center py-12"><Spinner size="lg" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogs.map(b => <BlogCard key={b.id} post={b} />)}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-[#f0f7e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">What Farmers Say</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Success stories from our growing community</p>
          </div>
          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* AI Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">AI-Powered Farming Advice</h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Get instant, personalized guidance on everything from soil health to market timing — powered by cutting-edge AI trained on African agricultural data.
              </p>
              <ul className="space-y-3 mb-8">
                {['Pest & disease identification', 'Crop rotation advice', 'Weather-based planting tips', 'Real-time market insights'].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-[#52b788] rounded-full" />{f}
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="inline-flex items-center gap-2 bg-[#2d6a4f] text-white font-semibold px-6 py-3 rounded-xl hover:bg-[#1f4f2b] transition-colors"
              >
                Try AI Assistant <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            <AiPreviewWidget />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2d6a4f]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-green-200 text-lg mb-8">Join 5,000+ farmers already using WillBry to grow smarter.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="bg-[#e76f51] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#d4603f] transition-colors">
              Get Started Free
            </Link>
            <Link to="/contact" className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-[#2d6a4f] transition-colors">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
