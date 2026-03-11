'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
  threshold?: number
}

const directionClasses = {
  up: 'translate-y-8',
  down: '-translate-y-8',
  left: 'translate-x-8',
  right: '-translate-x-8',
}

const directionVisible = {
  up: 'translate-y-0',
  down: 'translate-y-0',
  left: 'translate-x-0',
  right: 'translate-x-0',
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = 'up',
  once = true,
  threshold = 0.1,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        if (once && hasAnimated) return
        setVisible(true)
        if (once) setHasAnimated(true)
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, hasAnimated, threshold])

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out opacity-0',
        visible ? 'opacity-100' : directionClasses[direction],
        visible && directionVisible[direction],
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}
