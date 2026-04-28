import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import TeamCard from '../../components/public/TeamCard'
import { Leaf, Shield, Users, Zap, Globe, Heart } from 'lucide-react'

const team = [
  { name: 'Dr. William Bryson', role: 'CEO & Founder', bio: 'Agricultural scientist with 20+ years in sustainable farming and agri-tech innovation across East Africa.' },
  { name: 'Sarah Odhiambo', role: 'CTO', bio: 'Tech entrepreneur passionate about using AI and data to solve food security challenges in Africa.' },
  { name: 'James Kariuki', role: 'Head of Farmer Relations', bio: 'Former smallholder farmer turned advocate, connecting thousands of farmers to markets and resources.' },
]

const values = [
  { icon: Leaf, title: 'Sustainability', desc: 'We champion practices that protect the earth for future generations.' },
  { icon: Users, title: 'Community', desc: 'We build strong networks that uplift farmers and consumers together.' },
  { icon: Shield, title: 'Integrity', desc: 'Transparency and honesty guide every partnership we create.' },
  { icon: Zap, title: 'Innovation', desc: 'We embrace technology to solve old agricultural challenges in new ways.' },
  { icon: Globe, title: 'Impact', desc: 'We measure success by the lives we improve and communities we nourish.' },
  { icon: Heart, title: 'Care', desc: 'We genuinely care about the wellbeing of every farmer, customer, and partner.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="About WillBry"
        subtitle="Empowering agriculture through innovation since 2018"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#f0f7e8] rounded-2xl p-8">
              <div className="w-12 h-12 bg-[#2d6a4f] rounded-xl flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-[#0d2b18] mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                To nourish communities and empower farmers by connecting them with markets, knowledge, and technology — creating a sustainable, inclusive agricultural ecosystem across Africa.
              </p>
            </div>
            <div className="bg-[#0d2b18] rounded-2xl p-8">
              <div className="w-12 h-12 bg-[#52b788] rounded-xl flex items-center justify-center mb-4">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 leading-relaxed">
                A future where every African farmer has access to the tools, markets, and knowledge they need to thrive — and where every community has access to safe, affordable, nutritious food.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#0d2b18] mb-6">Our Story</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-6">
            WillBry was born out of frustration. Our founder, Dr. William Bryson, watched brilliant, hardworking farmers lose out to middlemen, poor market access, and outdated practices. In 2018, he gathered a team of agronomists, engineers, and business experts to build something different.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            What started as a small farmer network in Nakuru County has grown into a full agri-innovation platform serving over 5,000 farmers across 15 counties. Today, WillBry combines fresh produce delivery, digital training, AI advisory, and market intelligence — all in one platform built for African agriculture.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-xl mx-auto">The principles that guide everything we do</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-10 h-10 bg-[#f0f7e8] rounded-lg flex items-center justify-center mb-3">
                  <Icon className="h-5 w-5 text-[#2d6a4f]" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#f0f7e8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">Meet the Team</h2>
            <p className="text-gray-600">Passionate people driving agricultural innovation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {team.map(m => <TeamCard key={m.name} {...m} />)}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#2d6a4f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '5,000+', label: 'Farmers Served' },
              { value: '200+', label: 'Products Listed' },
              { value: '15', label: 'Counties Covered' },
              { value: '98%', label: 'Satisfaction Rate' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-4xl font-bold text-[#52b788] mb-2">{s.value}</div>
                <div className="text-green-200 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
