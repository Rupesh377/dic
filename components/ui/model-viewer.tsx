'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ModelViewerProps {
  src?: string
  alt?: string
  /** Fallback image when 3D model is not available */
  imageSrc?: string
  className?: string
  aspectRatio?: 'square' | 'video' | 'wide'
}

export function ModelViewer({
  src,
  alt = '3D Model',
  imageSrc,
  className,
  aspectRatio = 'video',
}: ModelViewerProps) {
  const aspectClass = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  }[aspectRatio]

  // Use image as primary display (3D gltf/glb would need @react-three/fiber)
  const displayImage = imageSrc || src || '/placeholder.svg'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-xl border border-blue-500/20 bg-card/50',
        aspectClass,
        className
      )}
    >
      <Image
        src={displayImage}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 600px"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
  )
}
