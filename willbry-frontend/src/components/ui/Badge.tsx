import type { ReactNode } from 'react'

type BadgeVariant = 'green' | 'teal' | 'accent' | 'gray' | 'red' | 'yellow' | 'blue'

interface BadgeProps {
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
  children: ReactNode
  className?: string
}

const badgeVariants: Record<BadgeVariant, string> = {
  green:  'bg-willbry-green-100 text-willbry-green-700 border border-willbry-green-500/20',
  teal:   'bg-teal-50 text-teal-700 border border-teal-200',
  accent: 'bg-orange-50 text-willbry-accent border border-orange-200',
  gray:   'bg-gray-100 text-gray-600 border border-gray-200',
  red:    'bg-red-50 text-red-600 border border-red-200',
  yellow: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
  blue:   'bg-blue-50 text-blue-700 border border-blue-200',
}

const dotColors: Record<BadgeVariant, string> = {
  green: 'bg-willbry-green-500', teal: 'bg-teal-500', accent: 'bg-willbry-accent',
  gray: 'bg-gray-400', red: 'bg-red-500', yellow: 'bg-yellow-500', blue: 'bg-blue-500',
}

export function Badge({ variant = 'green', size = 'md', dot = false, children, className = '' }: BadgeProps) {
  return (
    <span className={[
      'inline-flex items-center gap-1.5 font-medium rounded-full',
      size === 'sm' ? 'text-xs px-2 py-0.5' : 'text-xs px-2.5 py-1',
      badgeVariants[variant], className,
    ].filter(Boolean).join(' ')}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  )
}

export function orderStatusVariant(status: string): BadgeVariant {
  const map: Record<string, BadgeVariant> = {
    pending: 'yellow', confirmed: 'blue', processing: 'teal',
    shipped: 'accent', delivered: 'green', cancelled: 'red',
  }
  return map[status] ?? 'gray'
}
