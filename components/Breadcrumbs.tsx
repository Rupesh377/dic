'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center gap-1 text-sm text-muted-foreground', className)}>
      <Link href="/" className="hover:text-primary transition">
        Home
      </Link>
      {items.map((item, i) => (
        <span key={item.label} className="flex items-center gap-1">
          <ChevronRight className="w-4 h-4 text-muted-foreground/60" />
          {item.href && i < items.length - 1 ? (
            <Link href={item.href} className="hover:text-primary transition">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
