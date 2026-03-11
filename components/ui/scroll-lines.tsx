'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface ScrollLinesProps {
  className?: string
  lineColor?: string
}

export function ScrollLines({ className, lineColor = 'rgba(59, 130, 246, 0.25)' }: ScrollLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(docHeight > 0 ? Math.min(scrollY / docHeight, 1) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = 6
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(3, 0)
      ctx.lineTo(3, canvas.height)
      ctx.stroke()

      const dotY = progress * canvas.height
      const g = ctx.createRadialGradient(3, dotY, 0, 3, dotY, 8)
      g.addColorStop(0, 'rgba(96, 165, 250, 0.9)')
      g.addColorStop(1, 'transparent')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = 'rgb(96, 165, 250)'
      ctx.beginPath()
      ctx.arc(3, dotY, 4, 0, Math.PI * 2)
      ctx.fill()
    }
    draw()

    return () => window.removeEventListener('resize', resize)
  }, [progress, lineColor])

  return (
    <canvas
      ref={canvasRef}
      className={cn('fixed left-4 top-20 z-30 pointer-events-none', className)}
      aria-hidden
    />
  )
}
