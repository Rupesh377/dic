'use client'

import { cn } from '@/lib/utils'

interface MetallicPaintProps {
  children: React.ReactNode
  className?: string
}

export function MetallicPaint({ children, className }: MetallicPaintProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden',
        'bg-gradient-to-br from-slate-700 via-slate-500 to-slate-700',
        'bg-[length:200%_200%] animate-gradient-shift',
        className
      )}
      style={{
        backgroundImage: `linear-gradient(135deg, 
          #64748b 0%, 
          #94a3b8 25%, 
          #cbd5e1 50%, 
          #94a3b8 75%, 
          #64748b 100%)`,
        backgroundSize: '200% 200%',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-40" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
