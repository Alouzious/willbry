interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'green' | 'white' | 'accent'
  className?: string
}

const sizes: Record<NonNullable<SpinnerProps['size']>, string> = {
  xs: 'h-3 w-3 border',
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-9 w-9 border-[3px]',
}

const colors: Record<NonNullable<SpinnerProps['color']>, string> = {
  green: 'border-willbry-green-100 border-t-willbry-green-600',
  white: 'border-white/30 border-t-white',
  accent: 'border-orange-100 border-t-willbry-accent',
}

export function Spinner({
  size = 'md',
  color = 'green',
  className = '',
}: SpinnerProps) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={[
        'inline-block animate-spin rounded-full',
        sizes[size],
        colors[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

export function PageSpinner() {
  return (
    <div className="flex min-h-[360px] items-center justify-center">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-willbry-green-100 bg-white px-8 py-7 shadow-card">
        <Spinner size="lg" />
        <div className="text-center">
          <p className="text-sm font-semibold text-willbry-green-900">Loading WillBry platform</p>
          <p className="mt-1 text-xs text-gray-500">Preparing a smarter farming experience.</p>
        </div>
      </div>
    </div>
  )
}

export default Spinner