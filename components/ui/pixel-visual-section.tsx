'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { WebcamPixelGrid } from './webcam-pixel-grid'

export type PixelScene = 'webcam' | 'robot' | 'lab' | 'logo' | 'landscape'
export type PixelSizePreset = 'abstract' | 'detail'
export type HoverEffect = 'none' | 'brighten' | 'colorShift' | 'depixelate'
export type ClickAction = 'none' | 'switchScene' | 'openProjects' | 'openContact'
export type PixelAnimation = 'none' | 'colorShift' | 'glitch' | 'flicker'
export type AspectRatio = 'square' | 'wider' | 'fullWidth'

interface PixelVisualSectionProps {
  /** Page theme: rospinot (green) or vr (purple) */
  theme: 'rospinot' | 'vr'
  /** Section title above the visual */
  sectionTitle?: string
  /** Subtitle/description */
  sectionSubtitle?: string
  /** Default label over the pixel area (e.g. "Rospinot", "VR Lab") */
  defaultLabel?: string
  /** Show the options panel below the visual */
  showOptions?: boolean
  /** Optional max width for the container (e.g. max-w-4xl) */
  className?: string
}

const SCENES: PixelScene[] = ['webcam', 'robot', 'lab', 'logo', 'landscape']
const SCENE_LABELS: Record<PixelScene, string> = {
  webcam: 'Live feed',
  robot: 'Robot',
  lab: 'Lab',
  logo: 'Logo',
  landscape: 'Landscape',
}

function drawPixelScene(
  ctx: CanvasRenderingContext2D,
  scene: PixelScene,
  theme: 'rospinot' | 'vr',
  w: number,
  h: number
) {
  const isRospinot = theme === 'rospinot'
  const primary = isRospinot ? '#4a5d4a' : '#8b5cf6'
  const secondary = isRospinot ? '#6b7c6b' : '#a78bfa'
  const dark = isRospinot ? '#2a3a2a' : '#2e1065'
  const mid = isRospinot ? '#3d4a3d' : '#4c1d95'

  ctx.fillStyle = dark
  ctx.fillRect(0, 0, w, h)

  if (scene === 'robot') {
    const bodyX = Math.floor(w * 0.35)
    const bodyY = Math.floor(h * 0.4)
    const bw = Math.floor(w * 0.3)
    const bh = Math.floor(h * 0.45)
    ctx.fillStyle = primary
    ctx.fillRect(bodyX, bodyY, bw, bh)
    ctx.fillStyle = secondary
    ctx.fillRect(bodyX + 2, bodyY + 2, Math.floor(bw * 0.4), Math.floor(bh * 0.25))
    ctx.fillRect(bodyX + bw - 4, bodyY + 2, 2, Math.floor(bh * 0.2))
    ctx.fillRect(bodyX, bodyY + bh - 2, Math.floor(bw * 0.25), 2)
    ctx.fillRect(bodyX + bw - Math.floor(bw * 0.25), bodyY + bh - 2, Math.floor(bw * 0.25), 2)
    const headX = bodyX + Math.floor(bw * 0.2)
    const headY = bodyY - Math.floor(h * 0.12)
    ctx.fillStyle = mid
    ctx.fillRect(headX, headY, Math.floor(bw * 0.6), Math.floor(h * 0.12))
    ctx.fillStyle = secondary
    ctx.fillRect(headX + 2, headY + 2, 2, 2)
  }

  if (scene === 'lab') {
    ctx.fillStyle = mid
    ctx.fillRect(0, Math.floor(h * 0.6), w, Math.floor(h * 0.4))
    ctx.fillStyle = primary
    for (let i = 0; i < 5; i++) {
      const x = Math.floor(w * (0.1 + i * 0.2))
      ctx.fillRect(x, Math.floor(h * 0.5) - i * 2, Math.floor(w * 0.12), Math.floor(h * 0.15))
    }
    ctx.fillStyle = secondary
    ctx.fillRect(Math.floor(w * 0.2), Math.floor(h * 0.65), Math.floor(w * 0.4), Math.floor(h * 0.08))
    ctx.fillRect(Math.floor(w * 0.5), Math.floor(h * 0.55), Math.floor(w * 0.15), Math.floor(h * 0.1))
  }

  if (scene === 'logo') {
    ctx.fillStyle = primary
    const cx = Math.floor(w / 2)
    const cy = Math.floor(h / 2)
    const s = Math.min(w, h) * 0.25
    ctx.fillRect(cx - s, cy - Math.floor(s * 0.6), Math.floor(s * 0.5), Math.floor(s * 1.2))
    ctx.fillRect(cx - Math.floor(s * 0.5), cy - Math.floor(s * 0.6), Math.floor(s * 1.1), Math.floor(s * 0.35))
    ctx.fillRect(cx - Math.floor(s * 0.5), cy + Math.floor(s * 0.2), Math.floor(s * 1.1), Math.floor(s * 0.35))
  }

  if (scene === 'landscape') {
    ctx.fillStyle = mid
    ctx.fillRect(0, Math.floor(h * 0.5), w, Math.floor(h * 0.5))
    ctx.fillStyle = primary
    ctx.beginPath()
    ctx.moveTo(0, h)
    ctx.lineTo(0, Math.floor(h * 0.6))
    ctx.lineTo(Math.floor(w * 0.3), Math.floor(h * 0.45))
    ctx.lineTo(Math.floor(w * 0.5), Math.floor(h * 0.55))
    ctx.lineTo(Math.floor(w * 0.8), Math.floor(h * 0.4))
    ctx.lineTo(w, Math.floor(h * 0.5))
    ctx.lineTo(w, h)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = secondary
    const sunX = Math.floor(w * 0.7)
    const sunY = Math.floor(h * 0.25)
    ctx.fillRect(sunX - 2, sunY - 2, 5, 5)
  }
}

function StaticPixelCanvas({
  scene,
  theme,
  cols,
  rows,
  accentColor,
  backgroundColor,
  className,
}: {
  scene: PixelScene
  theme: 'rospinot' | 'vr'
  cols: number
  rows: number
  accentColor: string
  backgroundColor: string
  className?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    canvas.width = cols
    canvas.height = rows
    drawPixelScene(ctx, scene, theme, cols, rows)
  }, [scene, theme, cols, rows])

  return (
    <canvas
      ref={canvasRef}
      className={cn('rounded-xl border border-current', className)}
      style={{
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        borderColor: accentColor + '50',
        backgroundColor,
      }}
    />
  )
}

export function PixelVisualSection({
  theme,
  sectionTitle,
  sectionSubtitle,
  defaultLabel = '',
  showOptions = true,
  className,
}: PixelVisualSectionProps) {
  const [scene, setScene] = useState<PixelScene>('webcam')
  const [pixelSize, setPixelSize] = useState<PixelSizePreset>('detail')
  const [hoverEffect, setHoverEffect] = useState<HoverEffect>('brighten')
  const [clickAction, setClickAction] = useState<ClickAction>('switchScene')
  const [animation, setAnimation] = useState<PixelAnimation>('colorShift')
  const [scanline, setScanline] = useState(false)
  const [noise, setNoise] = useState(false)
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('wider')
  const [label, setLabel] = useState(defaultLabel)
  const [isHovered, setIsHovered] = useState(false)
  const [isTouch, setIsTouch] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const isRospinot = theme === 'rospinot'
  const accentColor = isRospinot ? '#4a5d4a' : '#8b5cf6'
  const backgroundColor = isRospinot ? '#0f1419' : '#0f0a14'
  const borderClass = isRospinot
    ? 'border-[#4a5d4a]/40 hover:border-[#4a5d4a]/60'
    : 'border-purple-500/40 hover:border-purple-500/60'
  const shadowClass = isRospinot
    ? 'shadow-[0_0_40px_rgba(74,93,74,0.12)] hover:shadow-[0_0_48px_rgba(74,93,74,0.18)]'
    : 'shadow-[0_0_40px_rgba(139,92,246,0.12)] hover:shadow-[0_0_48px_rgba(139,92,246,0.18)]'

  const cols = pixelSize === 'abstract' ? 20 : 48
  const rows = pixelSize === 'abstract' ? 15 : 32
  const maxWidthPx = aspectRatio === 'fullWidth' ? 1200 : aspectRatio === 'square' ? 480 : 896

  const handleClick = useCallback(() => {
    if (clickAction === 'switchScene') {
      const idx = SCENES.indexOf(scene)
      setScene(SCENES[(idx + 1) % SCENES.length])
    } else if (clickAction === 'openProjects') {
      window.location.href = '/projects'
    } else if (clickAction === 'openContact') {
      window.location.href = '/contact'
    }
  }, [clickAction, scene])

  const animationClass =
    animation === 'glitch'
      ? 'animate-pixel-glitch'
      : animation === 'colorShift'
        ? 'animate-pixel-color-shift'
        : animation === 'flicker'
          ? 'animate-pixel-flicker'
          : ''

  const hoverClass =
    hoverEffect === 'brighten'
      ? 'transition-all duration-300 hover:brightness-125'
      : hoverEffect === 'colorShift'
        ? 'transition-all duration-300 hover:hue-rotate-30'
        : hoverEffect === 'depixelate'
          ? 'transition-all duration-500 hover:blur-0'
          : ''

  const aspectClass =
    aspectRatio === 'square'
      ? 'aspect-square max-w-lg mx-auto'
      : aspectRatio === 'fullWidth'
        ? 'w-full aspect-video'
        : 'w-full aspect-video max-w-4xl mx-auto'

  return (
    <section className={cn('py-20 px-4 sm:px-6 lg:px-8', isRospinot ? 'bg-secondary/20' : 'bg-secondary/10', className)}>
      <div className="max-w-6xl mx-auto">
        {sectionTitle && (
          <h2 className="text-3xl font-bold text-foreground mb-4 text-center">{sectionTitle}</h2>
        )}
        {sectionSubtitle && (
          <p className="text-muted-foreground text-center mb-8 max-w-xl mx-auto">{sectionSubtitle}</p>
        )}

        <div
          className={cn(
            'rounded-2xl overflow-hidden bg-card/20 backdrop-blur-sm transition-shadow duration-300 border',
            borderClass,
            shadowClass
          )}
        >
          <div className="p-4 sm:p-6">
            <div
              ref={containerRef}
              className={cn(
                'relative rounded-xl overflow-hidden cursor-pointer select-none',
                aspectClass,
                (clickAction !== 'none' || hoverEffect !== 'none') && 'cursor-pointer'
              )}
              style={{ minHeight: aspectRatio === 'fullWidth' ? 280 : 320 }}
              onMouseEnter={() => { setIsHovered(true); setIsTouch(false) }}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={() => setIsTouch(true)}
              onTouchEnd={() => setTimeout(() => setIsTouch(false), 300)}
              onClick={handleClick}
              role={clickAction !== 'none' ? 'button' : undefined}
              tabIndex={clickAction !== 'none' ? 0 : undefined}
              onKeyDown={(e) => clickAction !== 'none' && (e.key === 'Enter' || e.key === ' ') && handleClick()}
            >
            {/* Label overlay */}
            {label && (
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-lg text-sm font-bold backdrop-blur-sm border"
                style={{
                  backgroundColor: accentColor + '30',
                  borderColor: accentColor + '60',
                  color: isRospinot ? '#c8d4c8' : '#e9d5ff',
                }}
              >
                {label}
              </div>
            )}

            {/* Pixel content */}
            <div
              className={cn(
                'absolute inset-0 flex items-center justify-center',
                hoverEffect === 'depixelate' && 'blur-[2px]',
                (isHovered || isTouch) && hoverEffect === 'depixelate' && 'blur-0',
                animationClass,
                hoverClass
              )}
            >
              {scene === 'webcam' ? (
                <WebcamPixelGrid
                  gridCols={cols}
                  gridRows={rows}
                  colorMode="monochrome"
                  monochromeColor={accentColor}
                  backgroundColor={backgroundColor}
                  className="w-full h-full min-h-[280px] rounded-xl"
                  maxWidthPx={maxWidthPx}
                  fallbackImage="/placeholder.svg"
                />
              ) : (
                <div className="w-full h-full min-h-[280px] flex items-center justify-center rounded-xl" style={{ backgroundColor }}>
                  <StaticPixelCanvas
                    scene={scene}
                    theme={theme}
                    cols={cols}
                    rows={rows}
                    accentColor={accentColor}
                    backgroundColor={backgroundColor}
                    className="w-full h-full max-w-full max-h-full object-contain"
                  />
                </div>
              )}
            </div>

            {/* Scanline overlay */}
            {scanline && (
              <div
                className="absolute inset-0 pointer-events-none z-[5] overflow-hidden"
                aria-hidden
              >
                <div
                  className="absolute w-full h-8 bg-gradient-to-b from-black/40 via-transparent to-black/40 animate-pixel-scanline"
                  style={{ animation: 'pixel-scanline 3s linear infinite' }}
                />
              </div>
            )}

            {/* Noise overlay */}
            {noise && (
              <div
                className="absolute inset-0 pointer-events-none z-[5] opacity-[0.08] mix-blend-overlay"
                aria-hidden
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
            )}
          </div>

          {/* Options panel */}
          {showOptions && (
            <div className="border-t border-current/10 px-4 py-4 sm:px-6 sm:py-5 space-y-4">
              <p className="text-sm font-medium text-foreground">Options</p>
              <div className="flex flex-wrap gap-4 sm:gap-6">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Scene</p>
                  <div className="flex flex-wrap gap-1">
                    {SCENES.map((s) => (
                      <button
                        key={s}
                        onClick={() => setScene(s)}
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium transition-colors',
                          scene === s
                            ? isRospinot
                              ? 'bg-[#4a5d4a] text-white'
                              : 'bg-purple-600 text-white'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        )}
                      >
                        {SCENE_LABELS[s]}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Pixel size</p>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setPixelSize('abstract')}
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium transition-colors',
                        pixelSize === 'abstract'
                          ? isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      Abstract
                    </button>
                    <button
                      onClick={() => setPixelSize('detail')}
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium transition-colors',
                        pixelSize === 'detail'
                          ? isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white'
                          : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      Detail
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Hover</p>
                  <div className="flex flex-wrap gap-1">
                    {(['none', 'brighten', 'colorShift', 'depixelate'] as const).map((e) => (
                      <button
                        key={e}
                        onClick={() => setHoverEffect(e)}
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium transition-colors',
                          hoverEffect === e
                            ? isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        )}
                      >
                        {e === 'depixelate' ? 'De-pixel' : e === 'colorShift' ? 'Color' : e}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Click / Tap</p>
                  <div className="flex flex-wrap gap-1">
                    {[
                      { v: 'none' as const, l: 'None' },
                      { v: 'switchScene' as const, l: 'Next scene' },
                      { v: 'openProjects' as const, l: 'Projects' },
                      { v: 'openContact' as const, l: 'Contact' },
                    ].map(({ v, l }) => (
                      <button
                        key={v}
                        onClick={() => setClickAction(v)}
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium transition-colors',
                          clickAction === v
                            ? isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        )}
                      >
                        {l}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Animation</p>
                  <div className="flex flex-wrap gap-1">
                    {(['none', 'colorShift', 'glitch', 'flicker'] as const).map((a) => (
                      <button
                        key={a}
                        onClick={() => setAnimation(a)}
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium transition-colors',
                          animation === a
                            ? isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        )}
                      >
                        {a === 'colorShift' ? 'Color' : a}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Overlay</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setScanline(!scanline)}
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium transition-colors',
                        scanline ? (isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white') : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      Scanline
                    </button>
                    <button
                      onClick={() => setNoise(!noise)}
                      className={cn(
                        'px-2 py-1 rounded text-xs font-medium transition-colors',
                        noise ? (isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white') : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                      )}
                    >
                      Noise
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Size</p>
                  <div className="flex flex-wrap gap-1">
                    {(['square', 'wider', 'fullWidth'] as const).map((r) => (
                      <button
                        key={r}
                        onClick={() => setAspectRatio(r)}
                        className={cn(
                          'px-2 py-1 rounded text-xs font-medium transition-colors',
                          aspectRatio === r
                            ? isRospinot ? 'bg-[#4a5d4a] text-white' : 'bg-purple-600 text-white'
                            : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                        )}
                      >
                        {r === 'fullWidth' ? 'Full width' : r}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Label</p>
                  <input
                    type="text"
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                    placeholder="e.g. VR Lab"
                    className="w-28 px-2 py-1 rounded text-xs bg-secondary/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </section>
  )
}
