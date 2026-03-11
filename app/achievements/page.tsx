'use client'

import { useState, useMemo } from 'react'
import { Navbar } from '@/components/Navbar'
import { MouseInteractiveBackground } from '@/components/ui/mouse-interactive-background'
import { ScrollLines } from '@/components/ui/scroll-lines'
import { AnimatedPopup } from '@/components/ui/animated-popup'
import { Footer } from '@/components/Footer'
import { achievements } from '@/data/achievements'
import { Button } from '@/components/ui/button'
import { Trophy, Star } from 'lucide-react'
import DotGrid from '@/components/ui/DotGrid'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'

export default function AchievementsPage() {
  const [selectedAchievement, setSelectedAchievement] = useState<(typeof achievements)[0] | null>(null)

  const achievementsByCategory = useMemo(() => {
    const stats: Record<string, number> = {}
    achievements.forEach((ach) => {
      stats[ach.category] = (stats[ach.category] || 0) + 1
    })
    return stats
  }, [])

  const achievementsByYear = useMemo(() => {
    const grouped: Record<number, typeof achievements> = {}
    achievements.forEach((ach) => {
      if (!grouped[ach.year]) grouped[ach.year] = []
      grouped[ach.year].push(ach)
    })
    return Object.entries(grouped)
      .sort(([a], [b]) => parseInt(b) - parseInt(a))
      .map(([year, items]) => ({ year: parseInt(year), items }))
  }, [])

  return (
    <>
      <MouseInteractiveBackground lineColor="rgba(245, 158, 11, 0.1)" dotColor="rgba(251, 191, 36, 0.4)" interactionRadius={200} />
      <ScrollLines lineColor="rgba(245, 158, 11, 0.15)" />
      <Navbar />

      <main className="relative z-10 min-h-screen">
        <div className="absolute inset-0 -z-10 opacity-80">
          <DotGrid
            dotSize={5}
            gap={18}
            baseColor="#1f2937"
            activeColor="#fbbf24"
            proximity={130}
            shockRadius={220}
            shockStrength={4}
          />
        </div>
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <BlurText
                text="Our Achievements"
                delay={90}
                animateBy="words"
                direction="top"
                className="inline-flex"
              />
            </h1>
            <p className="text-lg text-muted-foreground">
              Celebrating milestones and successes of DIC, Rospinot, and VR/AR/MR Club
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(achievementsByCategory).map(([category, count]) => (
                <ElectricBorder key={category} color="#fbbf24" borderRadius={18}>
                  <div className="rounded-xl p-6 text-center bg-gradient-to-br from-amber-600/90 via-amber-500/80 to-amber-700/90 border border-amber-400/30 shadow-lg shadow-amber-500/10">
                    <p className="text-3xl font-bold text-white mb-1">{count}</p>
                    <p className="text-sm text-amber-100">{category}</p>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="space-y-16">
              {achievementsByYear.map(({ year, items }) => (
                <div key={year}>
                  <div className="flex items-center gap-4 mb-8">
                    <Trophy className="w-8 h-8 text-amber-500" />
                    <h2 className="text-3xl font-bold text-amber-500">{year}</h2>
                    <div className="flex-1 h-px bg-gradient-to-r from-amber-500/50 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {items.map((achievement) => (
                      <button
                        key={achievement.id}
                        type="button"
                        onClick={() => setSelectedAchievement(achievement)}
                        className="text-left group bg-card/50 backdrop-blur border border-amber-500/20 rounded-xl p-6 hover:border-amber-500/50 hover:bg-card/80 transition-all duration-300 hover:scale-[1.02]"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-foreground group-hover:text-amber-500 transition-colors">
                              {achievement.title}
                            </h3>
                            <p className="text-muted-foreground mt-2 text-sm line-clamp-2">
                              {achievement.description}
                            </p>
                            <div className="flex gap-2 mt-4 flex-wrap">
                              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-semibold">
                                {achievement.club}
                              </span>
                              <span className="px-3 py-1 bg-secondary/50 text-foreground rounded-full text-xs border border-amber-500/30">
                                {achievement.category}
                              </span>
                            </div>
                          </div>
                          <Star className="w-6 h-6 text-amber-500 shrink-0 ml-2" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <AnimatedPopup
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
        title={selectedAchievement?.title}
        footer={
          <Button onClick={() => setSelectedAchievement(null)} variant="outline" className="rounded-lg">
            Close
          </Button>
        }
      >
        {selectedAchievement && (
          <div className="space-y-4">
            <p className="text-muted-foreground">{selectedAchievement.description}</p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-sm font-semibold">
                {selectedAchievement.club}
              </span>
              <span className="px-3 py-1 bg-secondary/50 text-foreground rounded-lg text-sm border border-amber-500/20">
                {selectedAchievement.category}
              </span>
              <span className="px-3 py-1 text-muted-foreground text-sm">{selectedAchievement.year}</span>
            </div>
            {selectedAchievement.details && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Details</p>
                <p className="text-foreground">{selectedAchievement.details}</p>
              </div>
            )}
          </div>
        )}
      </AnimatedPopup>

      <Footer />
    </>
  )
}
