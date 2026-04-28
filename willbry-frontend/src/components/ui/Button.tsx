import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type ButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-willbry-green-500 text-white shadow-sm hover:bg-willbry-green-600 hover:shadow-card-hover focus:ring-willbry-green-500/30',
  secondary:
    'bg-white text-willbry-green-700 border border-willbry-green-200 hover:bg-willbry-green-50 hover:border-willbry-green-300 focus:ring-willbry-green-500/20',
  accent:
    'bg-willbry-accent text-white shadow-sm hover:brightness-95 hover:shadow-card-hover focus:ring-orange-400/30',
  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 focus:ring-red-500/30',
  ghost:
    'bg-transparent text-willbry-green-700 hover:bg-willbry-green-50 focus:ring-willbry-green-500/20',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-sm rounded-lg',
  md: 'h-10 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      type = 'button',
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={[
          'inline-flex items-center justify-center gap-2 font-semibold',
          'transition-all duration-200 ease-out',
          'focus:outline-none focus:ring-4',
          'disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100',
          'active:scale-[0.98] hover:-translate-y-0.5',
          variants[variant],
          sizes[size],
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : leftIcon}
        <span>{children}</span>
        {!loading && rightIcon}
      </button>
    )
  }
)

Button.displayName = 'Button'

export default Button