import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import PageBanner from '../../components/layout/PageBanner'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const tiers = [
  {
    name: 'Basic',
    price: 'KES 2,500',
    period: '/month',
    description: 'For small-scale farmers getting started with professional guidance.',
    features: [
      '1 online consultation per month',
      'Soil test analysis',
      'Basic crop planning guide',
      'Email support',
    ],
    color: 'bg-white border-gray-200',
    cta: 'Get Started',
    ctaStyle: 'border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#f0f7e8]',
  },
  {
    name: 'Professional',
    price: 'KES 7,500',
    period: '/month',
    description: 'For serious farmers and agribusinesses seeking regular expert support.',
    features: [
      '4 consultations per month',
      'Comprehensive soil & crop analysis',
      'Personalized farm management plan',
      'Market timing advisory',
      'Priority phone & email support',
      'Monthly farm performance report',
    ],
    color: 'bg-[#2d6a4f] border-[#2d6a4f]',
    cta: 'Most Popular',
    ctaStyle: 'bg-white text-[#2d6a4f] hover:bg-gray-100',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large farms, cooperatives, and agri-businesses with complex needs.',
    features: [
      'Unlimited consultations',
      'Dedicated agronomist on-call',
      'Regular field visits',
      'Full business development support',
      'Export market advisory',
      'Custom reporting & analytics',
    ],
    color: 'bg-[#0d2b18] border-[#0d2b18]',
    cta: 'Contact Us',
    ctaStyle: 'bg-[#52b788] text-white hover:bg-[#2d6a4f]',
  },
]

export default function ConsultancyPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <PageBanner
        title="Consultancy"
        subtitle="Expert agricultural guidance tailored to your farm"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Consultancy' }]}
      />

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-[#0d2b18] mb-4">Choose Your Plan</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Our certified agronomists provide expert guidance for farms of all sizes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map(tier => (
              <div key={tier.name} className={`rounded-2xl border p-8 relative ${tier.color} ${tier.popular ? 'shadow-2xl scale-105' : 'shadow-sm'}`}>
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#e76f51] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${tier.popular || tier.name === 'Enterprise' ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
                <div className={`text-4xl font-extrabold mb-1 ${tier.popular || tier.name === 'Enterprise' ? 'text-white' : 'text-[#2d6a4f]'}`}>
                  {tier.price}<span className={`text-base font-normal ml-1 ${tier.popular || tier.name === 'Enterprise' ? 'text-green-200' : 'text-gray-500'}`}>{tier.period}</span>
                </div>
                <p className={`text-sm mb-6 ${tier.popular || tier.name === 'Enterprise' ? 'text-green-200' : 'text-gray-500'}`}>{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.popular || tier.name === 'Enterprise' ? 'text-green-100' : 'text-gray-700'}`}>
                      <CheckCircle className="h-4 w-4 text-[#52b788] mt-0.5 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl font-semibold transition-colors ${tier.ctaStyle}`}
                >
                  {tier.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#2d6a4f]">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Which Plan?</h2>
          <p className="text-green-200 mb-6">Book a free 30-minute consultation with our team to find the best fit.</p>
          <Link to="/portal/bookings" className="inline-flex items-center gap-2 bg-white text-[#2d6a4f] font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors">
            Book Free Consultation
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
