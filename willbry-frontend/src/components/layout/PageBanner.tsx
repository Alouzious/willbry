import type { ReactNode } from 'react'

interface PageBannerProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
}

export default function PageBanner({
  eyebrow,
  title,
  description,
  children,
}: PageBannerProps) {
  return (
    <section className="relative overflow-hidden bg-willbry-green-900 pt-32 pb-20 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(82,183,136,0.35),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(231,111,81,0.20),transparent_35%)]" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/10 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="mb-4 text-xs font-black uppercase tracking-[0.25em] text-willbry-teal">
              {eyebrow}
            </p>
          )}

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {description && (
            <p className="mt-6 text-lg leading-8 text-willbry-green-100">
              {description}
            </p>
          )}

          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  )
}