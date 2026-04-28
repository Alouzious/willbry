import { Link } from 'react-router-dom'
import {
  Leaf,
  Phone,
  Mail,
  MapPin,
  Share2,
  MessageCircle,
  BriefcaseBusiness,
} from 'lucide-react'

const footerLinks = {
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Innovation', href: '/innovation' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Blog', href: '/blog' },
  ],
  Services: [
    { label: 'Agricultural Innovation', href: '/services' },
    { label: 'Value Addition', href: '/services' },
    { label: 'Digital Farming', href: '/services' },
    { label: 'Consultancy', href: '/consultancy' },
  ],
  Platform: [
    { label: 'Farmer Portal', href: '/portal' },
    { label: 'Marketplace', href: '/products' },
    { label: 'Farmer Directory', href: '/farmers' },
    { label: 'Contact', href: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-willbry-green-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link to="/" className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-willbry-teal">
                <Leaf size={22} className="text-white" />
              </div>
              <div>
                <span className="block text-xl font-black tracking-tight">WillBry</span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.22em] text-willbry-teal">
                  Agro-Innovations Ltd
                </span>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-7 text-willbry-green-100">
              Smart farming, smarter foods. Building a sustainable agriculture platform for farmers,
              clients, partners, and institutions across Uganda.
            </p>

            <div className="mt-6 space-y-3 text-sm text-willbry-green-100">
              <a href="tel:+256789747881" className="flex items-center gap-3 transition-colors hover:text-white">
                <Phone size={16} className="text-willbry-teal" />
                +256 789 747 881
              </a>
              <a href="mailto:willbroad2016@gmail.com" className="flex items-center gap-3 transition-colors hover:text-white">
                <Mail size={16} className="text-willbry-teal" />
                willbroad2016@gmail.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-willbry-teal" />
                <span>Kijuguta, Northern Division, Kabale Municipality, Uganda</span>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              {[
                { icon: Share2, label: 'Facebook' },
                { icon: MessageCircle, label: 'WhatsApp / X' },
                { icon: BriefcaseBusiness, label: 'LinkedIn' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white transition-all hover:-translate-y-0.5 hover:bg-willbry-teal"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-willbry-teal">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm font-medium text-willbry-green-100 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-willbry-green-200 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} WillBry Agro-Innovations Limited. All rights reserved.</p>
          <p className="font-semibold text-willbry-teal">Built for sustainable agriculture and digital transformation.</p>
        </div>
      </div>
    </footer>
  )
}