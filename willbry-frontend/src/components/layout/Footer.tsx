import { Link } from 'react-router-dom'
import { Leaf, Phone, Mail, MapPin, Facebook, Twitter, Linkedin } from 'lucide-react'

const footerLinks = {
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Innovation', href: '/innovation' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Agricultural Innovation', href: '/services' },
    { label: 'Value Addition', href: '/services' },
    { label: 'Digital Farming', href: '/services' },
    { label: 'Consultancy', href: '/consultancy' },
    { label: 'Training', href: '/services' },
  ],
  platform: [
    { label: 'Farmer Portal', href: '/portal' },
    { label: 'Marketplace', href: '/products' },
    { label: 'Farmer Directory', href: '/farmers' },
    { label: 'Market Prices', href: '/portal/prices' },
    { label: 'Register', href: '/register' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-willbry-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-willbry-teal rounded-lg flex items-center justify-center">
                <Leaf size={20} className="text-white" />
              </div>
              <div>
                <span className="block font-bold text-lg text-white">WillBry</span>
                <span className="block text-willbry-teal text-[10px] tracking-widest uppercase font-medium">Agro-Innovations Ltd</span>
              </div>
            </Link>
            <p className="text-willbry-green-200 text-sm leading-relaxed mb-6 max-w-xs">
              Smart farming for a sustainable Uganda. Empowering farmers through technology, value addition, and agricultural innovation since 2024.
            </p>
            <div className="space-y-2.5">
              <a href="tel:+256789747881" className="flex items-center gap-2.5 text-sm text-willbry-green-200 hover:text-white transition-colors">
                <Phone size={14} className="text-willbry-teal shrink-0" />
                +256 789 747 881
              </a>
              <a href="mailto:willbroad2016@gmail.com" className="flex items-center gap-2.5 text-sm text-willbry-green-200 hover:text-white transition-colors">
                <Mail size={14} className="text-willbry-teal shrink-0" />
                willbroad2016@gmail.com
              </a>
              <div className="flex items-start gap-2.5 text-sm text-willbry-green-200">
                <MapPin size={14} className="text-willbry-teal shrink-0 mt-0.5" />
                Kijuguta, Northern Division<br />Kabale Municipality, Uganda
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-willbry-teal flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-willbry-teal flex items-center justify-center transition-colors">
                <Twitter size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-willbry-teal flex items-center justify-center transition-colors">
                <Linkedin size={15} />
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-willbry-teal mb-4">
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-willbry-green-200 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-willbry-green-300">
            &copy; {new Date().getFullYear()} WillBry Agro-Innovations Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-willbry-green-300">Supported by</span>
            <span className="text-xs font-semibold text-willbry-teal">UNDP Uganda</span>
            <span className="text-willbry-green-600">·</span>
            <span className="text-xs font-semibold text-willbry-teal">UK Aid</span>
          </div>
        </div>
      </div>
    </footer>
  )
}