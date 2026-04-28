import { forwardRef } from 'react'
import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  leftAddon?: ReactNode
  rightAddon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      leftAddon,
      rightAddon,
      className = '',
      id,
      required,
      ...props
    },
    ref
  ) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-semibold tracking-tight text-willbry-green-900"
          >
            {label}
            {required && <span className="ml-1 text-willbry-accent">*</span>}
          </label>
        )}

        <div className="flex overflow-hidden rounded-xl shadow-sm">
          {leftAddon && (
            <div className="flex items-center border border-r-0 border-willbry-green-100 bg-willbry-green-50 px-3 text-sm font-medium text-willbry-green-700">
              {leftAddon}
            </div>
          )}

          <div className="relative flex-1">
            {leftIcon && (
              <div className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-willbry-green-500">
                {leftIcon}
              </div>
            )}

            <input
              ref={ref}
              id={inputId}
              required={required}
              className={[
                'h-11 w-full border bg-white text-sm text-willbry-green-900',
                'placeholder:text-gray-400',
                'transition-all duration-200',
                'focus:border-willbry-teal focus:outline-none focus:ring-4 focus:ring-willbry-teal/15',
                'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-400',
                error ? 'border-red-400 focus:border-red-400 focus:ring-red-300/20' : 'border-willbry-green-100',
                leftAddon ? 'rounded-l-none' : 'rounded-l-xl',
                rightAddon ? 'rounded-r-none' : 'rounded-r-xl',
                leftIcon ? 'pl-10' : 'pl-4',
                rightIcon ? 'pr-10' : 'pr-4',
                className,
              ]
                .filter(Boolean)
                .join(' ')}
              {...props}
            />

            {rightIcon && (
              <div className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-willbry-green-500">
                {rightIcon}
              </div>
            )}
          </div>

          {rightAddon && (
            <div className="flex items-center border border-l-0 border-willbry-green-100 bg-willbry-green-50 px-3 text-sm font-medium text-willbry-green-700">
              {rightAddon}
            </div>
          )}
        </div>

        {error ? (
          <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
        ) : hint ? (
          <p className="mt-1.5 text-xs text-gray-500">{hint}</p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input