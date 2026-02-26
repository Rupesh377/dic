'use client'

import { useRef } from 'react'

type CometCardProps = {
  children: React.ReactNode
  className?: string
}

export function CometCard({ children, className }: CometCardProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const midX = rect.width / 2
    const midY = rect.height / 2

    const rotateY = ((x - midX) / midX) * 12
    const rotateX = -((y - midY) / midY) * 12
    const translateX = ((x - midX) / midX) * 10
    const translateY = ((y - midY) / midY) * 8

    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate3d(${translateX}px, ${translateY}px, 0)`
  }

  const resetTransform = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'rotateX(0deg) rotateY(0deg) translate3d(0,0,0)'
  }

  return (
    <div
      ref={ref}
      className={`comet-card ${className ?? ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTransform}
    >
      {children}
    </div>
  )
}

