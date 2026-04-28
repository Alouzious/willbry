interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  color?: 'green' | 'white' | 'accent'
  className?: string
}

const sizes = { xs: 'w-3 h-3 border', sm: 'w-4 h-4 border-2', md: 'w-6 h-6 border-2', lg: 'w-8 h-8 border-[3px]' }
const colors = {
  green: 'border-willbry-green-200 border-t-willbry-green-700',
  white: 'border-white/30 border-t-white',
  accent: 'border-orange-200 border-t-willbry-accent',
}

export function Spinner({ size = 'md', color = 'green', className = '' }: SpinnerProps) {
  return <div className={['rounded-full animate-spin', sizes[size], colors[color], className].join(' ')} role="status" aria-label="Loading" />
}

export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-gray-500 animate-pulse">Loading...</p>
      </div>
    </div>
  )
}

export default Spinner
