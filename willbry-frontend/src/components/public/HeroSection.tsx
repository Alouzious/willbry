import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d2b18] to-[#2d6a4f] overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-[#52b788] blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-[#52b788] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-[#1f4f2b] text-[#52b788] text-sm font-medium px-4 py-2 rounded-full mb-8">
          <span className="w-2 h-2 bg-[#52b788] rounded-full animate-pulse" />
          Agro-Innovations Platform 2.0
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
          Nourishing Communities,
          <br />
          <span className="text-[#52b788]">Empowering Farmers</span>
        </h1>

        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          WillBry connects farmers, consumers, and partners through technology — delivering fresh produce, digital training, and smart agricultural solutions.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#e76f51] text-white font-semibold px-8 py-4 rounded-xl hover:bg-[#d4603f] transition-colors text-lg"
          >
            Shop Now <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-[#2d6a4f] transition-colors text-lg"
          >
            Join Portal <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <div className="mt-16 flex justify-center gap-12 text-white">
          {[
            { value: '5,000+', label: 'Farmers' },
            { value: '200+', label: 'Products' },
            { value: '15+', label: 'Counties' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-[#52b788]">{s.value}</div>
              <div className="text-sm text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  )
}
