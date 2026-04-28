import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'

interface ModalProps {
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  footer?: ReactNode
}

const sizes = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl', xl: 'max-w-4xl', full: 'max-w-6xl' }

export function Modal({ open, onClose, title, description, children, size = 'md', footer }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-willbry-green-900/40 backdrop-blur-sm" onClick={onClose} />
      <div className={['relative w-full bg-white rounded-2xl shadow-2xl', sizes[size]].join(' ')} role="dialog" aria-modal="true">
        {title && (
          <div className="flex items-start justify-between p-6 border-b border-gray-100">
            <div>
              <h2 className="text-lg font-semibold text-willbry-green-900 tracking-tight">{title}</h2>
              {description && <p className="text-sm text-gray-500 mt-0.5">{description}</p>}
            </div>
            <button onClick={onClose} className="ml-4 p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors">
              <X size={18} />
            </button>
          </div>
        )}
        <div className="p-6">
          {!title && (
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition-colors">
              <X size={18} />
            </button>
          )}
          {children}
        </div>
        {footer && <div className="px-6 pb-6 flex items-center justify-end gap-3 border-t border-gray-100 pt-4">{footer}</div>}
      </div>
    </div>
  )
}

export default Modal
