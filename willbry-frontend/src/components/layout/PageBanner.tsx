import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface PageBannerProps {
  title: string
  subtitle?: string
  breadcrumbs?: BreadcrumbItem[]
}

export default function PageBanner({ title, subtitle, breadcrumbs }: PageBannerProps) {
  return (
    <div className="bg-[#2d6a4f] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-[#e8f5e9] text-lg mt-2">{subtitle}</p>}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1 mt-4 text-sm text-[#e8f5e9]">
            {breadcrumbs.map((b, i) => (
              <span key={i} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="h-4 w-4" />}
                {b.href ? (
                  <Link to={b.href} className="hover:text-white transition-colors">{b.label}</Link>
                ) : (
                  <span className="text-white font-medium">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
      </div>
    </div>
  )
}
