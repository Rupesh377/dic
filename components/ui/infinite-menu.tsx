'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface InfiniteMenuItem {
  id: string
  name: string
  role?: string
  image?: string
  club?: string
}

interface InfiniteMenuProps {
  items: InfiniteMenuItem[]
  className?: string
  itemClassName?: string
  speed?: number
  onItemClick?: (item: InfiniteMenuItem) => void
}

function MemberCard({
  item,
  itemClassName,
  onClick,
}: {
  item: InfiniteMenuItem
  itemClassName?: string
  onClick?: (item: InfiniteMenuItem) => void
}) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick(item) : undefined}
      onClick={onClick ? () => onClick(item) : undefined}
      className={cn(
        'flex-shrink-0 flex flex-col items-center w-32 rounded-xl border border-blue-500/20 bg-card/60 backdrop-blur p-4 hover:border-blue-500/50 transition-all',
        onClick && 'cursor-pointer hover:scale-105',
        itemClassName
      )}
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2 border-2 border-primary/30 bg-primary/10 flex items-center justify-center">
        {item.image && !imgError ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="64px"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="text-lg font-bold text-primary">{item.name.charAt(0)}</span>
        )}
      </div>
      <p className="text-sm font-semibold text-foreground truncate w-full text-center">{item.name}</p>
      {item.role && (
        <p className="text-xs text-muted-foreground truncate w-full text-center">{item.role}</p>
      )}
    </div>
  )
}

export function InfiniteMenu({
  items,
  className,
  itemClassName,
  speed = 25,
  onItemClick,
}: InfiniteMenuProps) {
  const duration = Math.max(20, items.length * speed)
  const duplicatedItems = items.length > 0 ? [...items, ...items] : []

  return (
    <div
      className={cn(
        'flex overflow-hidden gap-4 py-4 [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]',
        className
      )}
    >
      <div
        className="flex gap-4 shrink-0"
        style={{
          animation: `scroll-left ${duration}s linear infinite`,
        }}
      >
        {duplicatedItems.map((item, i) => (
          <MemberCard key={`${item.id}-${i}`} item={item} itemClassName={itemClassName} onClick={onItemClick} />
        ))}
      </div>
    </div>
  )
}
