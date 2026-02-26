'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface BackgroundRippleProps {
  rows?: number
  cols?: number
  cellSize?: number
  className?: string
  children?: React.ReactNode
}

export function BackgroundRipple({
  rows = 8,
  cols = 27,
  cellSize = 56,
  className,
  children,
}: BackgroundRippleProps) {
  const [clickedCell, setClickedCell] = useState<{ row: number; col: number } | null>(null)

  const handleCellClick = useCallback((row: number, col: number) => {
    setClickedCell({ row, col })
    setTimeout(() => setClickedCell(null), 400)
  }, [])

  const getDistance = (row: number, col: number) => {
    if (!clickedCell) return 999
    return Math.sqrt(Math.pow(row - clickedCell.row, 2) + Math.pow(col - clickedCell.col, 2))
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols)
          const col = i % cols
          const dist = getDistance(row, col)
          const delay = Math.round(dist * 20)
          const isClicked = clickedCell?.row === row && clickedCell?.col === col
          return (
            <div
              key={i}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCellClick(row, col)}
              onClick={() => handleCellClick(row, col)}
              className="border border-blue-500/10 bg-card/30 hover:bg-primary/5 transition-colors cursor-pointer"
              style={{
                width: cellSize,
                height: cellSize,
                animation: isClicked ? `cell-ripple 400ms ease-out ${delay}ms both` : undefined,
              }}
            />
          )
        })}
      </div>
      {children && <div className="absolute inset-0 pointer-events-none flex items-center justify-center">{children}</div>}
    </div>
  )
}
