import { useEffect } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  footer?: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-6xl',
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    if (open) window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <button
        className="absolute inset-0 bg-willbry-green-900/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close modal"
      />

      <section
        role="dialog"
        aria-modal="true"
        className={[
          'relative w-full overflow-hidden rounded-3xl border border-white/20 bg-white shadow-2xl',
          'animate-fade-up',
          sizes[size],
        ].join(' ')}
      >
        {(title || description) && (
          <div className="flex items-start justify-between border-b border-willbry-green-100 px-6 py-5">
            <div>
              {title && (
                <h2 className="text-lg font-black tracking-tight text-willbry-green-900">
                  {title}
                </h2>
              )}
              {description && <p className="mt-1 text-sm leading-6 text-gray-600">{description}</p>}
            </div>

            <button
              onClick={onClose}
              className="ml-4 rounded-xl p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {!title && !description && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-xl p-2 text-gray-400 transition-all hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        )}

        <div className="p-6">{children}</div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-willbry-green-100 bg-willbry-light px-6 py-4">
            {footer}
          </div>
        )}
      </section>
    </div>
  )
}

export default Modal