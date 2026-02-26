'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { NetworkBackground } from '@/components/NetworkBackground'
import { MouseInteractiveBackground } from '@/components/ui/mouse-interactive-background'
import { AnimatedPopup } from '@/components/ui/animated-popup'
import { InfiniteMenu } from '@/components/ui/infinite-menu'
import { getClubMembers, type ClubMemberItem } from '@/data/clubs'
import { projects } from '@/data/projects'
import { Glasses, FolderKanban, Mail, Zap, Box, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GridScan from '@/components/ui/GridScan'
import dynamic from 'next/dynamic'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'
import GlareHover from '@/components/ui/GlareHover'
import ClickSpark from '@/components/ui/ClickSpark'

const HeroScene3DVR = dynamic(
  () => import('@/components/HeroScene3DVR').then((m) => ({ default: m.HeroScene3DVR })),
  {
    ssr: false,
    loading: () => (
      <div className="w-full max-w-[340px] aspect-square rounded-2xl bg-purple-900/20 border border-purple-500/30 animate-pulse" />
    ),
  }
)

const vrMembers = () => getClubMembers('AR')
const vrProjects = projects.filter((p) => p.club === 'VR Club')

export default function VRArmrPage() {
  const [selectedMember, setSelectedMember] = useState<ClubMemberItem | null>(null)

  return (
    <ClickSpark sparkColor="#a855f7" sparkSize={10} sparkRadius={18} sparkCount={10} duration={420}>
    <div className="min-h-screen">
      <NetworkBackground />
      <MouseInteractiveBackground
        lineColor="rgba(139, 92, 246, 0.2)"
        dotColor="rgba(167, 139, 250, 0.6)"
        interactionRadius={220}
      />
      <Navbar />

      <main className="relative z-10 min-h-screen">
        {/* Hero - About VR/AR/MR with GridScan background + 3D model */}
        <section className="relative min-h-[calc(100vh-64px)] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 opacity-45">
            <GridScan
              sensitivity={0.6}
              lineThickness={1}
              linesColor="#ffffff"
              gridScale={0.1}
              scanColor="#c4b5fd"
              scanOpacity={0.55}
              enablePost
              bloomIntensity={0.6}
              chromaticAberration={0.002}
              noiseIntensity={0.01}
            />
          </div>
          <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-500">
                  VR/AR/MR Club
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                <BlurText
                  text="Creating immersive VR, AR, and mixed reality experiences. From game development to educational applications, we redefine digital interaction."
                  delay={70}
                  animateBy="words"
                  direction="top"
                  className="text-lg text-muted-foreground"
                />
              </p>
              <div className="flex gap-4">
                <Link href="/contact">
                  <GlareHover
                    glareColor="#c4b5fd"
                    glareOpacity={0.35}
                    glareAngle={-30}
                    glareSize={220}
                    transitionDuration={700}
                    className="inline-block"
                    width="auto"
                    height="auto"
                    background="transparent"
                    borderRadius="0.75rem"
                    borderColor="transparent"
                  >
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg">Let&apos;s Connect</Button>
                  </GlareHover>
                </Link>
                <Link href="/clubs">
                  <GlareHover
                    glareColor="#c4b5fd"
                    glareOpacity={0.25}
                    glareAngle={-40}
                    glareSize={210}
                    transitionDuration={700}
                    className="inline-block"
                    width="auto"
                    height="auto"
                    background="transparent"
                    borderRadius="0.75rem"
                    borderColor="transparent"
                  >
                    <Button variant="outline" className="border-purple-500/50 text-purple-400 rounded-lg">
                      Back to DIC
                    </Button>
                  </GlareHover>
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <HeroScene3DVR />
            </div>
          </div>
        </section>

        {/* What We Do - Card grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">
              <BlurText
                text="What We Do"
                delay={70}
                animateBy="words"
                direction="top"
                className="inline-flex justify-center"
              />
            </h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Immersive tech across VR, AR, and MR
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Virtual Reality', icon: Glasses },
                { label: 'Augmented Reality', icon: Box },
                { label: 'Mixed Reality', icon: Sparkles },
                { label: '3D & Design', icon: Glasses },
              ].map((d) => {
                const Icon = d.icon
                return (
                  <ElectricBorder key={d.label} color="#c4b5fd" borderRadius={18}>
                    <div className="group rounded-2xl border border-purple-500/30 bg-card/50 backdrop-blur-sm p-6 text-center hover:border-purple-500/60 hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] transition-all duration-300">
                        <Icon className="w-7 h-7 text-purple-400" />
                      </div>
                      <p className="font-semibold text-foreground">{d.label}</p>
                    </div>
                  </ElectricBorder>
                )
              })}
            </div>
          </div>
        </section>
        
        {/* Current Members */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Current Members</h2>
            <p className="text-muted-foreground mb-8">Meet the creators behind our immersive experiences</p>
            <InfiniteMenu items={vrMembers()} speed={55} onItemClick={(item) => setSelectedMember(item as ClubMemberItem)} />
          </div>
        </section>

        {/* Domain + Projects */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Projects</h2>
            <p className="text-muted-foreground mb-12">Our work in VR, AR & MR</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vrProjects.slice(0, 6).map((p) => (
                <Link key={p.id} href="/projects">
                  <div className="rounded-xl border border-purple-500/30 bg-card/50 backdrop-blur-sm p-6 hover:border-purple-500/50 hover:shadow-[0_0_28px_rgba(139,92,246,0.12)] transition-all duration-300">
                    <FolderKanban className="w-8 h-8 text-purple-400 mb-4" />
                    <h3 className="font-bold text-foreground">{p.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['VR Gaming', 'Creative Jam', 'Workshops'].map((a) => (
                <div
                  key={a}
                  className="rounded-xl border border-purple-500/30 bg-card/50 backdrop-blur-sm p-6 text-center hover:border-purple-500/50 hover:shadow-[0_0_24px_rgba(139,92,246,0.1)] transition-all duration-300"
                >
                  <Zap className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                  <h3 className="font-bold text-foreground">{a}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Mail className="w-12 h-12 text-purple-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-muted-foreground mb-6">
              Interested in immersive tech? Reach out to join VR/AR/MR Club.
            </p>
            <Link href="/contact">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg px-8">Contact Us</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatedPopup
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name}
        footer={
          <div className="flex justify-end gap-3">
            <Link href="/contact" onClick={() => setSelectedMember(null)}>
              <Button className="bg-purple-600 hover:bg-purple-700 rounded-lg">Let&apos;s Connect</Button>
            </Link>
            <Button variant="outline" onClick={() => setSelectedMember(null)}>Close</Button>
          </div>
        }
      >
        {selectedMember && (
          <div className="space-y-4">
            {selectedMember.image && (
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-purple-500/40">
                <Image src={selectedMember.image} alt={selectedMember.name} fill className="object-cover" />
              </div>
            )}
            <p className="font-semibold text-foreground">{selectedMember.role}</p>
            {selectedMember.bio && <p className="text-muted-foreground">{selectedMember.bio}</p>}
            {selectedMember.skills && (
              <div className="flex flex-wrap gap-2">
                {selectedMember.skills.map((s) => (
                  <span key={s} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-sm">{s}</span>
                ))}
              </div>
            )}
          </div>
        )}
      </AnimatedPopup>
    </div>
    </ClickSpark>
  )
}
