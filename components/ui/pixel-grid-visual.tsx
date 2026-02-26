'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

interface PixelGridVisualProps {
  className?: string
  baseColor?: string
  cols?: number
  rows?: number
  cellSize?: number
}

export function PixelGridVisual({
  className,
  baseColor = '#8b5cf6',
  cols = 24,
  rows = 14,
  cellSize = 14,
}: PixelGridVisualProps) {
  const cells = useMemo(() => {
    const list: { opacity: number }[] = []
    for (let i = 0; i < rows * cols; i++) {
      list.push({ opacity: 0.15 + Math.random() * 0.7 })
    }
    return list
  }, [rows, cols])

  const rgb = useMemo(() => {
    const hex = baseColor.replace('#', '')
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
    }
  }, [baseColor])

  return (
    <div
      className={cn('grid overflow-hidden rounded-xl border border-white/10', className)}
      style={{
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        width: cols * cellSize,
        height: rows * cellSize,
      }}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className="transition-opacity duration-300"
          style={{
            backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${c.opacity})`,
          }}
        />
      ))}
    </div>
  )
}
