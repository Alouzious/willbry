import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  hover?: boolean
}

export function Card({ children, hover = true, className = '', ...props }: CardProps) {
  return (
    <div
      className={[
        'rounded-2xl border border-willbry-green-100 bg-white shadow-card',
        hover ? 'transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['p-6 pb-3', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}

export function CardTitle({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={[
        'text-lg font-bold tracking-tight text-willbry-green-900',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </h3>
  )
}

export function CardDescription({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={[
        'mt-1 text-sm leading-6 text-gray-600',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </p>
  )
}

export function CardContent({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={['p-6 pt-3', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}

export function CardFooter({
  children,
  className = '',
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        'flex items-center gap-3 border-t border-willbry-green-100 p-6',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card