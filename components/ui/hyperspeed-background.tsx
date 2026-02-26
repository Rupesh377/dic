'use client'

import { useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface HyperspeedBackgroundProps {
  className?: string
  lineColor?: string
  opacity?: number
  speed?: number
}

export function HyperspeedBackground({
  className,
  lineColor = 'rgba(59, 130, 246, 0.15)',
  opacity = 1,
  speed = 1,
}: HyperspeedBackgroundProps) {
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

    const lines: { x: number; y: number; length: number; vx: number; vy: number }[] = []
    const lineCount = 60

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * 2 * speed,
        vy: (Math.random() - 0.5) * 2 * speed,
      })
    }

    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      lines.forEach((line) => {
        line.x += line.vx
        line.y += line.vy

        if (line.x < -100) line.x = canvas.width + 100
        if (line.x > canvas.width + 100) line.x = -100
        if (line.y < -100) line.y = canvas.height + 100
        if (line.y > canvas.height + 100) line.y = -100

        ctx.strokeStyle = lineColor
        ctx.globalAlpha = opacity
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(line.x, line.y)
        ctx.lineTo(line.x + line.vx * line.length, line.y + line.vy * line.length)
        ctx.stroke()
      })
      ctx.globalAlpha = 1
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [lineColor, opacity, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn('fixed inset-0 -z-10 pointer-events-none', className)}
      aria-hidden
    />
  )
}
