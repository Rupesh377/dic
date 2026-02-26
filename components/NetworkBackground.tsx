'use client'

import React, { useEffect, useRef, useState } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  originalX: number
  originalY: number
  opacity: number
}

export function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set initial canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    // Create network nodes
    const nodes: Node[] = []
    const nodeCount = 60

    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        originalX: x,
        originalY: y,
        opacity: Math.random() * 0.3 + 0.2,
      })
    }

    const connectionDistance = 200
    const mouseInteractionRadius = 150

    const animate = () => {
      // Clear canvas completely (transparent)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update nodes
      nodes.forEach((node) => {
        // Automatic movement
        node.vx += (Math.random() - 0.5) * 0.1
        node.vy += (Math.random() - 0.5) * 0.1

        // Damping
        node.vx *= 0.98
        node.vy *= 0.98

        // Apply velocity
        node.x += node.vx
        node.y += node.vy

        // Mouse interaction - attract to mouse
        const dx = mouseRef.current.x - node.x
        const dy = mouseRef.current.y - node.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseInteractionRadius && mouseRef.current.x > 0) {
          const force = (1 - distance / mouseInteractionRadius) * 0.5
          node.vx += (dx / distance) * force * 0.2
          node.vy += (dy / distance) * force * 0.2
          node.opacity = Math.min(1, 0.8)
        } else {
          // Return to original position slowly
          node.vx += (node.originalX - node.x) * 0.0005
          node.vy += (node.originalY - node.y) * 0.0005
          node.opacity = Math.max(0.1, node.opacity - 0.01)
        }

        // Soft boundaries
        const margin = 50
        if (node.x < -margin) node.x = canvas.width + margin
        if (node.x > canvas.width + margin) node.x = -margin
        if (node.y < -margin) node.y = canvas.height + margin
        if (node.y > canvas.height + margin) node.y = -margin

        // Draw node with glow
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4)
        gradient.addColorStop(0, `rgba(96, 165, 250, ${node.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(96, 165, 250, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(node.x - node.radius * 4, node.y - node.radius * 4, node.radius * 8, node.radius * 8)

        // Draw core node
        ctx.fillStyle = `rgba(147, 197, 253, ${node.opacity})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x
          const dy = nodes[j].y - nodes[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.4 * nodes[i].opacity * nodes[j].opacity

            ctx.strokeStyle = `rgba(96, 165, 250, ${opacity})`
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ display: 'block' }}
    />
  )
}
