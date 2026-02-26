'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import { ProjectCard } from '@/components/ProjectCard'
import { projects } from '@/data/projects'
import { Glasses, Bot, Brain } from 'lucide-react'
import Link from 'next/link'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'

export type DomainKey = 'VR/AR/MR' | 'ROSPINOT' | 'AI/ML'

const domainConfig: Record<DomainKey, { title: string; icon: typeof Glasses; club: string }> = {
  'VR/AR/MR': { title: 'Virtual, Augmented & Mixed Reality', icon: Glasses, club: 'VR Club' },
  ROSPINOT: { title: 'Robotics', icon: Bot, club: 'Rospinot' },
  'AI/ML': { title: 'Artificial Intelligence & Machine Learning', icon: Brain, club: 'Rospinot' },
}

function getProjectsForDomain(domain: DomainKey) {
  const config = domainConfig[domain]
  if (!config) return []

  if (domain === 'AI/ML') {
    return projects.filter(
      (p) =>
        p.domain.toLowerCase().includes('robotics') ||
        (p.skills && p.skills.some((s) => ['AI', 'ML', 'Machine Learning', 'Computer Vision'].includes(s)))
    )
  }
  if (domain === 'ROSPINOT') {
    return projects.filter((p) => p.club === 'Rospinot')
  }
  if (domain === 'VR/AR/MR') {
    return projects.filter((p) => p.club === 'VR Club' || p.domain.toLowerCase().includes('virtual'))
  }
  return []
}

export default function DomainsPage() {
  const [selectedDomain, setSelectedDomain] = useState<DomainKey | null>(null)

  const domains = (['VR/AR/MR', 'ROSPINOT', 'AI/ML'] as DomainKey[])
  const displayProjects = selectedDomain ? getProjectsForDomain(selectedDomain) : projects

  return (
    <>
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <BlurText
                text="Domains & Projects"
                delay={80}
                animateBy="words"
                direction="top"
                className="inline-flex justify-center"
              />
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explore our work across AR, VR, MR, Robotics, and AI/ML
            </p>

            {/* Domain filters */}
            <div className="flex flex-wrap gap-3 mb-12">
              <button
                onClick={() => setSelectedDomain(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  selectedDomain === null
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/20'
                }`}
              >
                All Domains
              </button>
              {domains.map((d) => {
                const config = domainConfig[d]
                const Icon = config.icon
                return (
                  <ElectricBorder key={d} color="#38bdf8" borderRadius={12}>
                    <button
                      onClick={() => setSelectedDomain(d)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                        selectedDomain === d
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/20'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {d}
                    </button>
                  </ElectricBorder>
                )
              })}
            </div>

            {/* Projects grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayProjects.map((project) => (
                <Link key={project.id} href="/projects" className="block group">
                  <ElectricBorder color="#38bdf8" borderRadius={16}>
                    <div className="group-hover:opacity-90 transition-opacity">
                      <ProjectCard project={project} />
                    </div>
                  </ElectricBorder>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
