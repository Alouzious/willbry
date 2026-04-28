import type { OrderStatus } from '../../types'

type BadgeVariant = 'green' | 'teal' | 'orange' | 'red' | 'gray' | 'yellow' | 'blue'

interface BadgeProps {
  children: React.ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
}

const variants: Record<BadgeVariant, string> = {
  green: 'bg-green-100 text-green-800 border-green-200',
  teal: 'bg-teal-100 text-teal-800 border-teal-200',
  orange: 'bg-orange-100 text-orange-800 border-orange-200',
  red: 'bg-red-100 text-red-700 border-red-200',
  gray: 'bg-gray-100 text-gray-700 border-gray-200',
  yellow: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  blue: 'bg-blue-100 text-blue-800 border-blue-200',
}

const dotColors: Record<BadgeVariant, string> = {
  green: 'bg-green-500',
  teal: 'bg-teal-500',
  orange: 'bg-orange-500',
  red: 'bg-red-500',
  gray: 'bg-gray-400',
  yellow: 'bg-yellow-500',
  blue: 'bg-blue-500',
}

export function Badge({ children, variant = 'gray', size = 'md', dot }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 font-medium border rounded-full',
        variants[variant],
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
      ].join(' ')}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColors[variant]}`} />}
      {children}
    </span>
  )
}

export function orderStatusVariant(status: OrderStatus): BadgeVariant {
  const map: Record<OrderStatus, BadgeVariant> = {
    pending: 'yellow',
    confirmed: 'blue',
    processing: 'teal',
    shipped: 'orange',
    delivered: 'green',
    cancelled: 'red',
  }
  return map[status] ?? 'gray'
}

export default Badge