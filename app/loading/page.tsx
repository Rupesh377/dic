'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ROTATION_DURATION_MS = 1200
const REDIRECT_DELAY_MS = 400

export default function LoadingPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/')
    }, ROTATION_DURATION_MS + REDIRECT_DELAY_MS)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center overflow-hidden z-[100]">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.7s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div
          className="w-24 h-24 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30"
          style={{
            animation: `logo-spin-once ${ROTATION_DURATION_MS}ms ease-in-out 1 forwards`,
          }}
        >
          <span className="text-white font-bold text-4xl">D</span>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-primary">DIC</div>
          <div className="text-xs text-muted-foreground">Digital Innovation</div>
        </div>
        <p className="text-muted-foreground text-sm">Taking you home...</p>
      </div>
    </div>
  )
}
