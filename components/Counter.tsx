'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

interface CounterProps {
  end: number
  suffix?: string
  duration?: number
  className?: string
  startOnVisible?: boolean
  /** Delay in ms before starting the count (e.g. for stagger) */
  delay?: number
}

export function Counter({
  end,
  suffix = '',
  duration = 2000,
  className,
  startOnVisible = true,
  delay = 0,
}: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const [started, setStarted] = useState(!startOnVisible)

  useEffect(() => {
    if (!startOnVisible) {
      const t = setTimeout(() => setStarted(true), delay)
      return () => clearTimeout(t)
    }
    const el = ref.current
    if (!el) return
    let delayTimer: ReturnType<typeof setTimeout> | null = null
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          delayTimer = setTimeout(() => setStarted(true), delay)
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      if (delayTimer) clearTimeout(delayTimer)
    }
  }, [startOnVisible, started, delay])

  useEffect(() => {
    if (!started) return
    const step = end / (duration / 16)
    let current = 0

    const timer = setInterval(() => {
      current += step
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [started, end, duration])

  return (
    <span ref={ref} className={cn(className)}>
      {count}{suffix}
    </span>
  )
}
