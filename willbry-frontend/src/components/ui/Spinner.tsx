interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeClasses: Record<string, string> = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div className={`animate-spin rounded-full border-2 border-gray-200 border-t-[#2d6a4f] ${sizeClasses[size]} ${className}`} />
  )
}
