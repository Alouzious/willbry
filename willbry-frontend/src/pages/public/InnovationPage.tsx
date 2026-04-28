import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { Cpu, Zap, Globe, Bot, BarChart2, Laptop } from 'lucide-react'
import { Link } from 'react-router-dom'

const innovations = [
  {
    icon: Bot,
    title: 'AI-Powered Advisory',
    description: 'Our proprietary AI model is trained on decades of African agricultural data. Farmers get real-time advice on crop diseases, weather patterns, and optimal planting schedules.',
  },
  {
    icon: BarChart2,
    title: 'Smart Market Analytics',
    description: 'Machine learning algorithms analyze market trends to predict commodity prices and demand spikes — giving farmers a competitive edge in timing their sales.',
  },
  {
    icon: Cpu,
    title: 'IoT Farm Monitoring',
    description: 'Connect sensors on your farm for real-time soil moisture, temperature, and humidity monitoring. Receive alerts and automated irrigation triggers.',
  },
  {
    icon: Globe,
    title: 'Digital Marketplace',
    description: 'A fully digital B2B and B2C marketplace connecting farmers directly with consumers, restaurants, and exporters — eliminating costly middlemen.',
  },
  {
    icon: Laptop,
    title: 'E-Learning Platform',
    description: 'Over 50 courses delivered through mobile-first video content, offline capability, and multilingual support for maximum farmer accessibility.',
  },
  {
    icon: Zap,
    title: 'Blockchain Traceability',
    description: 'Consumers and buyers can trace every product back to the specific farm, ensuring authenticity, food safety, and fair trade compliance.',
  },
]

export default function InnovationPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Innovation"
        subtitle="Technology at the heart of sustainable agriculture"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Innovation' }]}
      />

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">Technology Driving Change</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We leverage cutting-edge technology to solve the most pressing challenges in African agriculture.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {innovations.map(({ icon: Icon, title, description }) => (
              <div key={title} className="p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow bg-white">
                <div className="w-12 h-12 bg-[#0d2b18] rounded-xl flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-[#52b788]" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0d2b18]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Experience It Yourself</h2>
          <p className="text-gray-300 text-lg mb-8">Register as a farmer or partner and get instant access to our full innovation suite.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-[#52b788] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#2d6a4f] transition-colors">
            Join the Platform
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
