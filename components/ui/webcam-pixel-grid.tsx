'use client'

import { useRef, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

interface WebcamPixelGridProps {
  gridCols?: number
  gridRows?: number
  colorMode?: 'webcam' | 'monochrome'
  monochromeColor?: string
  backgroundColor?: string
  className?: string
  /** Max display width in pixels; default 400. Use e.g. 896 for max-w-4xl. */
  maxWidthPx?: number
  /** Static image URL when webcam is unavailable - for professional/formal display */
  fallbackImage?: string
}

export function WebcamPixelGrid({
  gridCols = 32,
  gridRows = 24,
  colorMode = 'monochrome',
  monochromeColor = '#3b82f6',
  backgroundColor = '#0a0e27',
  className,
  maxWidthPx = 400,
  fallbackImage,
}: WebcamPixelGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || useFallback) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let stream: MediaStream | null = null

    const initWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const video = document.createElement('video')
        video.srcObject = stream
        video.play()

        video.onloadeddata = () => {
          canvas.width = gridCols
          canvas.height = gridRows

          const draw = () => {
            if (!video.readyState || video.readyState < 2) {
              animationId = requestAnimationFrame(draw)
              return
            }
            ctx.drawImage(video, 0, 0, gridCols, gridRows)
            const imageData = ctx.getImageData(0, 0, gridCols, gridRows)
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
              if (colorMode === 'monochrome') {
                const gray = (data[i] + data[i + 1] + data[i + 2]) / 3
                const r = parseInt(monochromeColor.slice(1, 3), 16)
                const g = parseInt(monochromeColor.slice(3, 5), 16)
                const b = parseInt(monochromeColor.slice(5, 7), 16)
                data[i] = (r * gray) / 255
                data[i + 1] = (g * gray) / 255
                data[i + 2] = (b * gray) / 255
              }
            }
            ctx.putImageData(imageData, 0, 0)
            animationId = requestAnimationFrame(draw)
          }
          draw()
        }
      } catch {
        setUseFallback(true)
      }
    }

    initWebcam()

    return () => {
      cancelAnimationFrame(animationId)
      stream?.getTracks().forEach((t) => t.stop())
    }
  }, [gridCols, gridRows, colorMode, monochromeColor, useFallback])

  if (useFallback && fallbackImage) {
    return (
      <div
        className={cn('relative overflow-hidden rounded-lg', className)}
        style={{ backgroundColor }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage: `url(${fallbackImage})`,
            imageRendering: 'pixelated',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))`,
          }}
        />
      </div>
    )
  }

  if (useFallback) {
    return (
      <div
        className={cn('flex items-center justify-center rounded-lg border border-blue-500/20', className)}
        style={{ backgroundColor, minHeight: 200 }}
      >
        <p className="text-sm text-muted-foreground">Interactive pixel grid</p>
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn('rounded-lg border border-blue-500/20', className)}
      style={{
        width: '100%',
        maxWidth: maxWidthPx,
        imageRendering: 'pixelated',
      }}
    />
  )
}
