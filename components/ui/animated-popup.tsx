'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnimatedPopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  footer?: React.ReactNode
  className?: string
}

export function AnimatedPopup({
  isOpen,
  onClose,
  title,
  children,
  footer,
  className,
}: AnimatedPopupProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleEscape)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        aria-hidden
      />
      <div
        className={cn(
          'relative bg-card rounded-2xl border border-blue-500/30 shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden',
          'animate-in zoom-in-95 fade-in duration-300',
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card/95 backdrop-blur border-b border-blue-500/20 px-6 py-4 flex justify-between items-center">
          {title && <h2 className="text-xl font-bold text-foreground">{title}</h2>}
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all hover:scale-110"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">{children}</div>
        {footer && (
          <div className="sticky bottom-0 border-t border-blue-500/20 p-4 bg-card/95 backdrop-blur">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
