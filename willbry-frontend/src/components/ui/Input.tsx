import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftAddon?: ReactNode
  rightAddon?: ReactNode
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, leftAddon, rightAddon, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-willbry-green-900 mb-1.5 tracking-wide">
            {label}
            {props.required && <span className="text-willbry-accent ml-1">*</span>}
          </label>
        )}
        <div className="flex rounded-lg overflow-hidden shadow-sm">
          {leftAddon && (
            <div className="flex items-center px-4 bg-willbry-green-50 border border-r-0 border-willbry-green-500/30 text-willbry-green-700 text-sm font-medium whitespace-nowrap">
              {leftAddon}
            </div>
          )}
          <div className="relative flex-1">
            {leftIcon && (
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-willbry-green-500 pointer-events-none">
                {leftIcon}
              </div>
            )}
            <input
              ref={ref}
              id={inputId}
              className={[
                'w-full h-10 bg-white text-willbry-green-900 text-sm',
                'border border-willbry-green-500/30 rounded-lg',
                'placeholder:text-gray-400',
                'transition-all duration-150',
                'focus:outline-none focus:ring-2 focus:ring-willbry-teal/50 focus:border-willbry-teal',
                'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed',
                error ? 'border-red-400 focus:ring-red-300/50 focus:border-red-400' : '',
                leftAddon ? 'rounded-l-none' : '',
                rightAddon ? 'rounded-r-none' : '',
                leftIcon ? 'pl-10' : 'pl-4',
                rightIcon ? 'pr-10' : 'pr-4',
                className,
              ].filter(Boolean).join(' ')}
              {...props}
            />
            {rightIcon && (
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-willbry-green-500 pointer-events-none">
                {rightIcon}
              </div>
            )}
          </div>
          {rightAddon && (
            <div className="flex items-center px-4 bg-willbry-green-50 border border-l-0 border-willbry-green-500/30 text-willbry-green-700 text-sm font-medium whitespace-nowrap">
              {rightAddon}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">
            <span className="inline-block w-1 h-1 rounded-full bg-red-500 shrink-0" />
            {error}
          </p>
        )}
        {hint && !error && <p className="mt-1.5 text-xs text-gray-500">{hint}</p>}
      </div>
    )
  }
)
Input.displayName = 'Input'
export default Input
