import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import ServicesGrid from '../../components/public/ServicesGrid'
import { Link } from 'react-router-dom'
import { ArrowRight, Package, Leaf, Laptop, Briefcase, BarChart2, Bot } from 'lucide-react'

const detailedServices = [
  {
    icon: Package,
    title: 'Fresh Produce Delivery',
    description: 'We source fresh fruits, vegetables, grains, and legumes directly from verified partner farmers. Every product goes through quality checks before delivery to your doorstep.',
    features: ['Same-day delivery in select areas', 'Cold-chain logistics', 'Bulk orders for restaurants & hotels', 'Subscription boxes available'],
  },
  {
    icon: Leaf,
    title: 'Seeds & Agricultural Inputs',
    description: 'Access certified, high-quality seeds, fertilizers, pesticides, and farming tools at competitive prices. We work directly with manufacturers to eliminate inflated margins.',
    features: ['Certified OPV & hybrid seeds', 'Organic fertilizers', 'Integrated pest management', 'Farm equipment rental'],
  },
  {
    icon: Laptop,
    title: 'Digital Training Programs',
    description: 'Practical, bite-sized courses designed for farmers. Learn at your own pace through video lessons, quizzes, and live webinars with agricultural experts.',
    features: ['50+ online courses', 'Live expert webinars', 'Certificate programs', 'Available in Swahili'],
  },
  {
    icon: Briefcase,
    title: 'Agricultural Consultancy',
    description: 'Our certified agronomists provide tailored advice for your farm. From soil testing to business planning, we help you optimize every aspect of your operation.',
    features: ['Soil analysis & reports', 'Crop planning sessions', 'Business development support', 'Field visits available'],
  },
  {
    icon: BarChart2,
    title: 'Market Intelligence',
    description: 'Real-time commodity prices, market demand forecasts, and trade data to help you make better selling decisions and negotiate fair prices.',
    features: ['Live price updates', 'Weekly market reports', 'Export opportunity alerts', 'Buyer-seller matching'],
  },
  {
    icon: Bot,
    title: 'AI Farming Assistant',
    description: 'Our AI assistant is trained on vast agricultural datasets to provide instant, personalized advice on crop management, pest control, and farming best practices.',
    features: ['24/7 availability', 'Pest & disease diagnosis', 'Personalized recommendations', 'Multilingual support'],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Our Services"
        subtitle="Comprehensive agricultural solutions for modern farmers"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Services' }]}
      />
      <ServicesGrid />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">Service Details</h2>
          </div>
          <div className="space-y-8">
            {detailedServices.map(({ icon: Icon, title, description, features }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
                <div className="shrink-0">
                  <div className="w-14 h-14 bg-[#f0f7e8] rounded-2xl flex items-center justify-center">
                    <Icon className="h-7 w-7 text-[#2d6a4f]" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[#0d2b18] mb-2">{title}</h3>
                  <p className="text-gray-600 mb-4">{description}</p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-[#52b788] rounded-full" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#2d6a4f]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-green-200 text-lg mb-8">Contact us today to discuss how we can support your agricultural journey.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-[#e76f51] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#d4603f] transition-colors">
            Contact Us <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
