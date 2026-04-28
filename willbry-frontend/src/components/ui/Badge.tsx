import type { ReactNode } from 'react'
import type { OrderStatus } from '../../types'

type BadgeVariant =
  | 'green'
  | 'teal'
  | 'orange'
  | 'red'
  | 'gray'
  | 'yellow'
  | 'blue'

interface BadgeProps {
  children: ReactNode
  variant?: BadgeVariant
  size?: 'sm' | 'md'
  dot?: boolean
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  green: 'border-green-200 bg-green-50 text-green-700',
  teal: 'border-teal-200 bg-teal-50 text-teal-700',
  orange: 'border-orange-200 bg-orange-50 text-orange-700',
  red: 'border-red-200 bg-red-50 text-red-700',
  gray: 'border-gray-200 bg-gray-50 text-gray-700',
  yellow: 'border-yellow-200 bg-yellow-50 text-yellow-800',
  blue: 'border-blue-200 bg-blue-50 text-blue-700',
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

export function Badge({
  children,
  variant = 'gray',
  size = 'md',
  dot = false,
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border font-semibold',
        variants[variant],
        size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-xs',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {dot && <span className={['h-1.5 w-1.5 rounded-full', dotColors[variant]].join(' ')} />}
      {children}
    </span>
  )
}

export function orderStatusVariant(status: OrderStatus): BadgeVariant {
  const variantsByStatus: Record<OrderStatus, BadgeVariant> = {
    pending: 'yellow',
    confirmed: 'blue',
    processing: 'teal',
    shipped: 'orange',
    delivered: 'green',
    cancelled: 'red',
  }

  return variantsByStatus[status] ?? 'gray'
}

export default Badge