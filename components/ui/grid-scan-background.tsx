'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface GridScanBackgroundProps {
  className?: string
  gridSize?: number
  lineColor?: string
  scanColor?: string
  scanSpeed?: number
}

export function GridScanBackground({
  className,
  gridSize = 40,
  lineColor = 'rgba(59, 130, 246, 0.08)',
  scanColor = 'rgba(96, 165, 250, 0.25)',
  scanSpeed = 2,
}: GridScanBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let scanY = 0
    let animationId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw grid
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 0.5
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Scan line
      scanY = (scanY + scanSpeed) % (canvas.height + 100)
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY + 50)
      gradient.addColorStop(0, 'transparent')
      gradient.addColorStop(0.5, scanColor)
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [gridSize, lineColor, scanColor, scanSpeed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('fixed inset-0 -z-10 pointer-events-none', className)}
      aria-hidden
    />
  )
}
