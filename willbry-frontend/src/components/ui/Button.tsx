import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

type Variant = 'primary' | 'secondary' | 'accent' | 'ghost' | 'destructive' | 'outline'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  children: ReactNode
}

const variants: Record<Variant, string> = {
  primary:
    'bg-willbry-green-700 text-white hover:bg-willbry-green-900 active:scale-[0.98] shadow-sm hover:shadow-md border border-willbry-green-900/20',
  secondary:
    'bg-willbry-green-50 text-willbry-green-700 hover:bg-willbry-green-100 active:scale-[0.98] border border-willbry-green-500/30',
  accent:
    'bg-willbry-accent text-white hover:bg-[#d4603f] active:scale-[0.98] shadow-sm hover:shadow-md border border-[#c45535]/20',
  ghost:
    'bg-transparent text-willbry-green-700 hover:bg-willbry-green-50 active:scale-[0.98] border border-transparent hover:border-willbry-green-500/20',
  outline:
    'bg-transparent text-willbry-green-700 border border-willbry-green-500/50 hover:bg-willbry-green-50 active:scale-[0.98]',
  destructive:
    'bg-red-600 text-white hover:bg-red-700 active:scale-[0.98] shadow-sm border border-red-700/20',
}

const sizes: Record<Size, string> = {
  xs: 'h-7 px-3 text-xs gap-1.5 rounded-md',
  sm: 'h-8 px-4 text-sm gap-2 rounded-lg',
  md: 'h-10 px-5 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-xl',
  xl: 'h-14 px-9 text-lg gap-3 rounded-xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, fullWidth = false, disabled, children, className = '', ...props }, ref) => {
    const isDisabled = disabled || loading
    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={[
          'inline-flex items-center justify-center font-medium tracking-wide',
          'transition-all duration-150 ease-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-willbry-teal focus-visible:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
          'select-none whitespace-nowrap',
          variants[variant],
          sizes[size],
          fullWidth ? 'w-full' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {loading ? (
          <Loader2 className="animate-spin shrink-0" size={size === 'xs' ? 12 : size === 'sm' ? 14 : 16} />
        ) : leftIcon ? (
          <span className="shrink-0">{leftIcon}</span>
        ) : null}
        <span>{children}</span>
        {!loading && rightIcon ? <span className="shrink-0">{rightIcon}</span> : null}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
