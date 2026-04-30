import { useEffect, useState } from 'react'
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
import AiPreviewWidget from '../../components/public/AiPreviewWidget'
import { Button } from '../../components/ui/Button'
import type { Product, BlogPost } from '../../types'

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=2070&q=90',
    position: 'center 60%',
  },
  {
    url: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=2070&q=90',
    position: 'center center',
  },
  {
    url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=2070&q=90',
    position: 'center 40%',
  },
  {
    url: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=2070&q=90',
    position: 'center center',
  },
]

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
  const [current, setCurrent] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length)
      setKey((prev) => prev + 1)
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <style>{`
        @keyframes kenburns {
          0%   { transform: scale(1)    translate(0%, 0%);    }
          100% { transform: scale(1.09) translate(-1.5%, -1%); }
        }
        .slide-kb {
          animation: kenburns 7s ease-out forwards;
          width: 100%;
          height: 100%;
          background-size: cover;
          will-change: transform;
        }
      `}</style>

      <Navbar />

      <main>
        {/* ── HERO ── */}
        <section className="relative min-h-screen overflow-hidden pt-28 text-white">
          {heroImages.map(({ url, position }, i) => (
            <div
              key={url}
              className="absolute inset-0 transition-opacity duration-[2200ms] ease-in-out"
              style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
            >
              <div
                key={i === current ? key : i}
                className={i === current ? 'slide-kb' : ''}
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: position,
                }}
              />
            </div>
          ))}

          <div
            className="absolute inset-0"
            style={{
              zIndex: 2,
              background: 'linear-gradient(135deg, rgba(10,36,20,0.68) 0%, rgba(30,80,55,0.48) 55%, rgba(10,36,20,0.40) 100%)',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              zIndex: 3,
              background: 'radial-gradient(circle at 18% 22%, rgba(82,183,136,0.16) 0%, transparent 28%), radial-gradient(circle at 80% 28%, rgba(231,111,81,0.09) 0%, transparent 26%)',
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.05]"
            style={{
              zIndex: 4,
              backgroundImage: 'linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative mx-auto grid min-h-[calc(100vh-7rem)] max-w-7xl items-center gap-14 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8" style={{ zIndex: 5 }}>
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

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2" style={{ zIndex: 6 }}>
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); setKey((p) => p + 1) }}
                className={[
                  'h-2 rounded-full transition-all duration-500',
                  i === current ? 'w-8 bg-willbry-teal' : 'w-2 bg-white/35 hover:bg-white/65',
                ].join(' ')}
              />
            ))}
          </div>
        </section>

        {/* ── SERVICES ── */}
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

        {/* ── AI CHAT SECTION ── */}
        <section id="ai-chat" className="bg-willbry-light py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
                  AI farming assistant
                </p>
                <h2 className="mt-4 text-4xl font-black tracking-tight text-willbry-green-900">
                  Ask WillBry AI anything about farming.
                </h2>
                <p className="mt-5 leading-8 text-gray-600">
                  No account needed. Get instant, practical answers on crops, pests, post-harvest handling,
                  value addition, market prices, and WillBry's services — powered by AI trained for Ugandan agriculture.
                </p>

                <div className="mt-8 grid gap-3">
                  {[
                    { label: 'Crop guidance', text: 'Pest control, diseases, fertilizer, irrigation.' },
                    { label: 'Value addition', text: 'How to process and package your produce.' },
                    { label: 'Market advice', text: 'Pricing, demand, and market readiness tips.' },
                    { label: 'WillBry services', text: 'Training, consultancy, and platform features.' },
                  ].map(({ label, text }) => (
                    <div key={label} className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-willbry-teal" />
                      <div>
                        <p className="text-sm font-black text-willbry-green-900">{label}</p>
                        <p className="text-xs leading-5 text-gray-500">{text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <AiPreviewWidget />
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="bg-white py-24">
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

        {/* ── WHY US ── */}
        <section className="bg-willbry-light py-24">
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

        {/* ── BLOG ── */}
        <section className="bg-white py-24">
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

        {/* ── CTA ── */}
        <section className="bg-willbry-light py-24">
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