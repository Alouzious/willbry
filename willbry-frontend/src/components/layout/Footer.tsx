import { Link } from 'react-router-dom'
import { Leaf, Share2, MessageSquare, Camera, Briefcase, Tv2, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#0d2b18] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-7 w-7 text-[#52b788]" />
              <span className="text-xl font-bold text-white">WillBry</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Agro-Innovations Platform 2.0 — Nourishing communities and empowering farmers through technology and sustainable agriculture.
            </p>
            <div className="flex gap-3">
              {([
                { Icon: Share2, label: 'Facebook' },
                { Icon: MessageSquare, label: 'Twitter / X' },
                { Icon: Camera, label: 'Instagram' },
                { Icon: Briefcase, label: 'LinkedIn' },
                { Icon: Tv2, label: 'YouTube' },
              ] as const).map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label} className="text-gray-400 hover:text-[#52b788] transition-colors">
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/' },
                { label: 'About', to: '/about' },
                { label: 'Services', to: '/services' },
                { label: 'Products', to: '/products' },
                { label: 'Blog', to: '/blog' },
                { label: 'Gallery', to: '/gallery' },
              ].map(l => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm hover:text-[#52b788] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {['Training', 'Consultancy', 'Market Prices', 'Farmer Portal', 'AI Assistant'].map(s => (
                <li key={s}>
                  <Link to="/services" className="text-sm hover:text-[#52b788] transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-[#52b788] mt-0.5 shrink-0" />
                <span>123 Farm Road, Agro District, Kenya</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-[#52b788] shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-[#52b788] shrink-0" />
                <span>info@willbry.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-[#1f4f2b] py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} WillBry Agro-Innovations. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
