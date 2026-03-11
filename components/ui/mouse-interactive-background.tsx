'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface MouseInteractiveBackgroundProps {
  className?: string
  lineColor?: string
  dotColor?: string
  interactionRadius?: number
}

export function MouseInteractiveBackground({
  className,
  lineColor = 'rgba(59, 130, 246, 0.12)',
  dotColor = 'rgba(96, 165, 250, 0.5)',
  interactionRadius = 200,
}: MouseInteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

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

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    const nodes: { x: number; y: number; vx: number; vy: number; opacity: number }[] = []
    for (let i = 0; i < 50; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: 0,
        vy: 0,
        opacity: 0.2 + Math.random() * 0.3,
      })
    }

    let animId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      nodes.forEach((node, i) => {
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < interactionRadius && mouseRef.current.x > 0) {
          const force = (1 - dist / interactionRadius) * 0.3
          node.vx += (dx / dist) * force * 0.15
          node.vy += (dy / dist) * force * 0.15
          node.opacity = Math.min(0.9, node.opacity + 0.02)
        } else {
          node.vx *= 0.95
          node.vy *= 0.95
          node.opacity = Math.max(0.15, node.opacity - 0.005)
        }

        node.x += node.vx
        node.y += node.vy

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        const rgb = dotColor.match(/\d+/g)
        const r = rgb?.[0] ?? 96
        const g = rgb?.[1] ?? 165
        const b = rgb?.[2] ?? 250
        ctx.fillStyle = `rgba(${r},${g},${b},${node.opacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.sqrt((nodes[j].x - nodes[i].x) ** 2 + (nodes[j].y - nodes[i].y) ** 2)
          if (d < 180) {
            ctx.strokeStyle = lineColor
            ctx.globalAlpha = (1 - d / 180) * nodes[i].opacity * nodes[j].opacity
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [lineColor, dotColor, interactionRadius])

  return <canvas ref={canvasRef} className={cn('fixed inset-0 -z-10 pointer-events-none', className)} aria-hidden />
}
