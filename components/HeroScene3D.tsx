'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Scene3D = dynamic(() => import('@/components/Scene3D').then((m) => ({ default: m.Scene3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full aspect-square min-h-[240px] max-h-[320px] rounded-2xl bg-card/40 border border-blue-500/30 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})

const defaultPointer = { x: 0.5, y: 0.5 }

export function HeroScene3D() {
  const [followMode, setFollowMode] = useState(false)
  const [pointerNorm, setPointerNorm] = useState(defaultPointer)
  const boxRef = useRef<HTMLDivElement>(null)

  // Track mouse only when cursor is inside the box; follow only inside the box
  useEffect(() => {
    if (!followMode) return
    const onMove = (e: MouseEvent) => {
      const el = boxRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      if (!inside) return
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setPointerNorm({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [followMode])

  const handleNotFollow = useCallback(() => {
    setFollowMode(false)
    setPointerNorm(defaultPointer)
  }, [])

  return (
    <div className="flex flex-col items-center gap-4 w-full max-w-[340px]">
      {/* Box: model stays strictly inside; overflow hidden */}
      <div
        ref={boxRef}
        className={cn(
          'w-full aspect-square max-h-[320px] min-h-[240px] rounded-2xl overflow-hidden',
          'border-2 border-blue-500/30 bg-card/40',
          'relative'
        )}
      >
        <div className="absolute inset-0 w-full h-full [contain:strict]">
          <Scene3D followMode={followMode} pointerNorm={pointerNorm} />
        </div>
      </div>
      {/* Buttons below the box */}
      <div className="flex gap-2 w-full justify-center">
        <Button
          size="sm"
          variant={followMode ? 'default' : 'outline'}
          onClick={() => setFollowMode(true)}
          className="min-w-[100px]"
        >
          Follow
        </Button>
        <Button
          size="sm"
          variant={!followMode ? 'default' : 'outline'}
          onClick={handleNotFollow}
          className="min-w-[100px]"
        >
          Not to follow
        </Button>
      </div>
    </div>
  )
}
