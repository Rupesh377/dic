'use client'

import { useRef, useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface JourneyMilestone {
  year: string
  title: string
  description: string
}

const defaultMilestones: JourneyMilestone[] = [
  { year: '2024', title: 'VR Club launch', description: 'Expanded into immersive tech and VR projects.' },
  { year: '2023', title: 'National recognition', description: 'Awards and partnerships with industry.' },
  { year: '2022', title: 'Rospinot growth', description: 'Robotics team scaled to 50+ active members.' },
  { year: '2021', title: 'DIC founded', description: 'Development And Innovation Centre started with a small core team.' },
]

export function JourneyTimeline({ milestones = defaultMilestones, className }: { milestones?: JourneyMilestone[]; className?: string }) {
  const refs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<Record<number, boolean>>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = refs.current.findIndex((r) => r === entry.target)
            if (index >= 0) setVisible((v) => ({ ...v, [index]: true }))
          }
        })
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    refs.current.forEach((el) => el && observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section className={cn('py-24 px-4 sm:px-6 lg:px-8', className)}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2 text-center">Our Journey</h2>
        <p className="text-muted-foreground text-center mb-14">Key milestones</p>
        <div className="relative space-y-6">
          {/* Vertical line - clearer */}
          <div className="absolute left-[19px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20 rounded-full" />
          {milestones.map((m, i) => (
            <div
              key={m.year}
              ref={(el) => { refs.current[i] = el }}
              className={cn(
                'relative flex gap-6 transition-all duration-700 ease-out',
                visible[i]
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 -translate-x-8'
              )}
              style={{ transitionDelay: visible[i] ? `${i * 120}ms` : '0ms' }}
            >
              {/* Icon with glow */}
              <div className="relative flex-shrink-0 z-10">
                <div
                  className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500',
                    'bg-primary/25 border border-primary/40',
                    'shadow-[0_0_24px_rgba(59,130,246,0.3)]',
                    visible[i] && 'shadow-[0_0_32px_rgba(59,130,246,0.4)]'
                  )}
                >
                  <Calendar className="w-5 h-5 text-primary" />
                </div>
              </div>
              {/* Card */}
              <div
                className={cn(
                  'flex-1 pb-10 rounded-2xl border border-blue-500/25 bg-card/50 backdrop-blur-sm',
                  'px-6 py-5 transition-all duration-500 mb-6',
                  'hover:border-blue-500/50 hover:bg-card/70',
                  'hover:shadow-[0_0_36px_rgba(59,130,246,0.1)]',
                  'last:pb-8 last:mb-0'
                )}
              >
                <p className="text-base font-bold text-primary mb-1.5">{m.year}</p>
                <h3 className="text-xl font-bold text-foreground mb-2">{m.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{m.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
