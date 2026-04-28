import { Package, Leaf, Laptop, Briefcase, BarChart2, Bot } from 'lucide-react'

const services = [
  {
    icon: Package,
    title: 'Fresh Produce',
    description: 'Farm-fresh fruits, vegetables, and grains sourced directly from verified farmers across the country.',
  },
  {
    icon: Leaf,
    title: 'Seeds & Inputs',
    description: 'Quality certified seeds, fertilizers, and agricultural inputs to maximize farm productivity.',
  },
  {
    icon: Laptop,
    title: 'Digital Training',
    description: 'Online courses and video tutorials on modern farming techniques, business skills, and technology.',
  },
  {
    icon: Briefcase,
    title: 'Consultancy',
    description: 'Expert agricultural consultancy services covering soil health, crop management, and business planning.',
  },
  {
    icon: BarChart2,
    title: 'Market Intelligence',
    description: 'Real-time commodity prices, demand forecasts, and market analysis to help farmers make better decisions.',
  },
  {
    icon: Bot,
    title: 'AI Assistant',
    description: 'Powered by advanced AI, get instant answers to farming questions, pest identification, and weather insights.',
  },
]

export default function ServicesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Comprehensive agricultural solutions designed to empower farmers and nourish communities.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group p-6 rounded-xl border border-gray-100 bg-[#f0f7e8] hover:bg-[#2d6a4f] hover:text-white transition-all duration-300 cursor-default"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 group-hover:bg-[#1f4f2b] transition-colors">
                <Icon className="h-6 w-6 text-[#2d6a4f] group-hover:text-[#52b788] transition-colors" />
              </div>
              <h3 className="text-lg font-semibold text-[#0d2b18] group-hover:text-white mb-2">{title}</h3>
              <p className="text-gray-600 group-hover:text-gray-200 text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
