import React from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<string, string> = {
  primary: 'bg-[#2d6a4f] text-white hover:bg-[#1f4f2b]',
  secondary: 'bg-[#52b788] text-white hover:bg-[#2d6a4f]',
  outline: 'border border-[#2d6a4f] text-[#2d6a4f] hover:bg-[#f0f7e8]',
  ghost: 'text-[#2d6a4f] hover:bg-[#f0f7e8]',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2d6a4f] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
}
