import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Leaf,
  Sprout,
  Factory,
  Brain,
  GraduationCap,
  BriefcaseBusiness,
  Globe2,
  Users,
  MapPin,
  Package,
  Quote,
} from 'lucide-react'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import ProductCard from '../../components/public/ProductCard'
import BlogCard from '../../components/public/BlogCard'
import { Button } from '../../components/ui/Button'
import type { Product, BlogPost } from '../../types'

const services = [
  { title: 'Agricultural Innovation', icon: Sprout, text: 'Climate-smart farming methods, field trials, and farmer-centered innovation.' },
  { title: 'Value Addition', icon: Factory, text: 'Transforming local crops into market-ready products like SmartCrisps and SmartFlour.' },
  { title: 'Digital Farming', icon: Brain, text: 'AI-powered advisory, data tools, and digital systems for smarter decisions.' },
  { title: 'Training', icon: GraduationCap, text: 'Practical farmer education, youth skills development, and agribusiness training.' },
  { title: 'Agribusiness', icon: BriefcaseBusiness, text: 'Market linkage, product development, and growth support for agricultural enterprises.' },
  { title: 'Green Economy', icon: Globe2, text: 'Sustainability consulting, circular economy models, and environmental governance.' },
]

const products: Product[] = [
  {
    id: '1',
    name: 'SmartCrisps',
    slug: 'smartcrisps',
    description: 'Premium potato crisps made through local value addition, supporting farmers and healthier snack innovation.',
    price: 5000,
    unit: 'pack',
    category: 'food',
    active: true,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'SmartFlour',
    slug: 'smartflour',
    description: 'Fortified flour designed to improve nutrition while creating stronger markets for local agricultural produce.',
    price: 12000,
    unit: 'kg',
    category: 'food',
    active: true,
    created_at: new Date().toISOString(),
  },
]

const posts: BlogPost[] = [
  {
    id: '1',
    title: 'How Digital Advisory Can Improve Farming Decisions',
    slug: 'digital-advisory-farming-decisions',
    content: 'Digital farming tools help farmers make better decisions using timely information.',
    excerpt: 'Why AI and data can help farmers improve productivity and reduce losses.',
    author_id: '1',
    author_name: 'WillBry Team',
    category: 'agri_tech',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Value Addition as a Pathway for Rural Growth',
    slug: 'value-addition-rural-growth',
    content: 'Value addition creates stronger markets and more resilient farmer income.',
    excerpt: 'How local processing can unlock new income opportunities for farmers.',
    author_id: '1',
    author_name: 'WillBry Team',
    category: 'market_trends',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Building Sustainable Agriculture in Kigezi',
    slug: 'sustainable-agriculture-kigezi',
    content: 'Kabale and the Kigezi highlands have unique farming opportunities.',
    excerpt: 'A practical look at climate-smart agriculture in southwestern Uganda.',
    author_id: '1',
    author_name: 'WillBry Team',
    category: 'farming_tips',
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <section className="relative min-h-screen overflow-hidden bg-willbry-green-900 pt-28 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(82,183,136,0.35),transparent_30%),radial-gradient(circle_at_80%_30%,rgba(231,111,81,0.18),transparent_28%),linear-gradient(135deg,#0d2b18,#2d6a4f)]" />
          <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px)] [background-size:60px_60px]" />

          <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] text-willbry-teal backdrop-blur">
                <Leaf size={15} />
                Smart Farming, Smarter Foods
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
                Transforming Agriculture in Uganda Through Innovation
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-willbry-green-100">
                WillBry Agro-Innovations builds digital farming tools, value-added foods,
                farmer training systems, and green economy solutions for a more resilient agricultural future.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link to="/services">
                  <Button size="lg" variant="accent" rightIcon={<ArrowRight size={18} />}>
                    Explore Our Work
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="secondary">
                    Partner With Us
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-[2rem] border border-white/15 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
                <div className="rounded-[1.5rem] bg-white p-6 text-willbry-green-900">
                  <div className="grid gap-4 sm:grid-cols-2">
                    {[
                      { label: 'Farmers Empowered', value: '500+', icon: Users },
                      { label: 'Established', value: '2024', icon: Leaf },
                      { label: 'Agri-tech Solutions', value: '6', icon: Brain },
                      { label: 'Districts Covered', value: '3', icon: MapPin },
                    ].map(({ label, value, icon: Icon }) => (
                      <div key={label} className="rounded-3xl bg-willbry-light p-5">
                        <Icon className="h-6 w-6 text-willbry-green-600" />
                        <p className="mt-5 text-3xl font-black">{value}</p>
                        <p className="mt-1 text-sm font-semibold text-gray-600">{label}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-3xl bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-6 text-white">
                    <p className="text-sm font-bold text-willbry-teal">Platform 2.0</p>
                    <h3 className="mt-2 text-2xl font-black">AI-powered agriculture support</h3>
                    <p className="mt-3 text-sm leading-6 text-willbry-green-100">
                      Farmers, clients, and partners can access advisory, products, resources,
                      and services from one modern digital platform.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">What we do</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                Practical solutions for farmers, markets, and sustainable growth.
              </h2>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {services.map(({ title, icon: Icon, text }) => (
                <article
                  key={title}
                  className="rounded-3xl border border-willbry-green-100 bg-white p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-willbry-green-50 text-willbry-green-600">
                    <Icon size={26} />
                  </div>
                  <h3 className="mt-6 text-xl font-black text-willbry-green-900">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-gray-600">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-willbry-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Featured products</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                  Value-added products built from local potential.
                </h2>
              </div>
              <Link to="/products">
                <Button variant="secondary" rightIcon={<ArrowRight size={16} />}>
                  View marketplace
                </Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Why choose us</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                  Built from the field, designed for scale.
                </h2>
                <p className="mt-5 text-base leading-8 text-gray-600">
                  WillBry combines agricultural knowledge, digital systems, product innovation,
                  and local community understanding.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  'Uganda-first farming context',
                  'Strong value addition model',
                  'AI and data-powered advisory',
                  'Partnership-ready platform',
                ].map((item) => (
                  <div key={item} className="rounded-3xl border border-willbry-green-100 bg-white p-6 shadow-card">
                    <Package className="h-6 w-6 text-willbry-green-600" />
                    <p className="mt-5 text-lg font-black text-willbry-green-900">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-willbry-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">Insights</p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                  Latest agriculture and innovation updates.
                </h2>
              </div>
              <Link to="/blog">
                <Button variant="secondary">Read blog</Button>
              </Link>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {posts.map((post) => <BlogCard key={post.id} post={post} />)}
            </div>
          </div>
        </section>

        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-[2rem] bg-gradient-to-br from-willbry-green-900 to-willbry-green-500 p-8 text-white shadow-2xl sm:p-12 lg:p-16">
              <Quote className="h-10 w-10 text-willbry-teal" />
              <h2 className="mt-6 max-w-3xl text-4xl font-black tracking-tight">
                Ready to partner on agricultural innovation in Uganda?
              </h2>
              <p className="mt-5 max-w-2xl text-willbry-green-100">
                Work with WillBry to support farmers, strengthen value chains, and build digital agriculture systems.
              </p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button variant="accent" size="lg" rightIcon={<ArrowRight size={18} />}>
                    Start a partnership
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}