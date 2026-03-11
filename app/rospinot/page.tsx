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
import { Bot, FolderKanban, Mail, Zap, Cpu, Eye, Cog } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GridScan from '@/components/ui/GridScan'
import dynamic from 'next/dynamic'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'
import GlareHover from '@/components/ui/GlareHover'
import ClickSpark from '@/components/ui/ClickSpark'

const HeroScene3D = dynamic(() => import('@/components/HeroScene3D').then((m) => ({ default: m.HeroScene3D })), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[340px] aspect-square rounded-2xl bg-[#3d5c4a]/30 border border-[#5a6b5a]/40 animate-pulse" />
  ),
})

const rospinotMembers = () => getClubMembers('ROSPINOT')
const rospinotProjects = projects.filter((p) => p.club === 'Rospinot')

const domains = [
  { label: 'Autonomous Systems', icon: Cpu, desc: 'Building robots capable of performing tasks independently — navigation, path planning, and sensor-based interaction.' },
  { label: 'Computer Vision', icon: Eye, desc: 'Interpreting visual information for object detection, face tracking, and perception systems.' },
  { label: 'AI & Machine Learning', icon: Bot, desc: 'Integrating AI algorithms for intelligent control, data-driven decision making, and autonomous behavior.' },
  { label: 'Embedded Systems', icon: Cog, desc: 'Building hardware platforms using microcontrollers, sensors, actuators, and hardware interfaces.' },
]

export default function RospinotPage() {
  const [selectedMember, setSelectedMember] = useState<ClubMemberItem | null>(null)

  return (
    <ClickSpark sparkColor="#22c55e" sparkSize={10} sparkRadius={18} sparkCount={10} duration={420}>
      <div className="min-h-screen" data-theme="rospinot">
        <style jsx global>{`
        [data-theme="rospinot"] {
          --ros-primary: #4a5d4a;
          --ros-accent: #6b7c6b;
        }
      `}</style>
        <NetworkBackground />
        <MouseInteractiveBackground
          lineColor="rgba(74, 93, 74, 0.2)"
          dotColor="rgba(107, 124, 107, 0.6)"
          interactionRadius={220}
        />
        <Navbar />

        <main className="relative z-10 min-h-screen">
          {/* Hero with GridScan background + 3D model */}
          <section className="relative min-h-[calc(100vh-64px)] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 opacity-45">
              <GridScan
                sensitivity={0.55}
                lineThickness={1}
                linesColor="#ffffff"
                gridScale={0.12}
                scanColor="#a3e635"
                scanOpacity={0.5}
                enablePost
                bloomIntensity={0.5}
                chromaticAberration={0.0015}
                noiseIntensity={0.01}
              />
            </div>
            <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="max-w-3xl">
                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                  <span className="text-[#4a5d4a]">ROSPINOT</span>
                  <span className="text-muted-foreground font-normal"> — Robotics Innovation Club</span>
                </h1>
                <p className="text-sm text-[#4a5d4a] font-semibold tracking-wider uppercase mb-6">Design. Simulate. Build. Deploy.</p>
                <p className="text-lg text-muted-foreground mb-6 max-w-2xl">
                  <BlurText
                    text="ROSPINOT is the robotics development community under the Digital Innovation Center (DIC). The club focuses on designing, simulating, and building intelligent robotic systems by combining mechanical design, software development, and real-world hardware implementation."
                    delay={70}
                    animateBy="words"
                    direction="top"
                    className="text-lg text-muted-foreground max-w-2xl"
                  />
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/contact">
                    <GlareHover
                      glareColor="#bbf7d0"
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
                      <Button className="bg-[#4a5d4a] hover:bg-[#5a6d5a] text-white rounded-xl px-6">
                        Let&apos;s Connect
                      </Button>
                    </GlareHover>
                  </Link>
                  <Link href="/clubs">
                    <GlareHover
                      glareColor="#bbf7d0"
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
                      <Button variant="outline" className="border-[#4a5d4a]/60 text-[#4a5d4a] rounded-xl">
                        Back to DIC
                      </Button>
                    </GlareHover>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <HeroScene3D />
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
                Focus areas that define our robotics development and innovation
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {domains.map((d) => {
                  const Icon = d.icon
                  return (
                    <ElectricBorder key={d.label} color="#4ade80" borderRadius={18}>
                      <div className="group rounded-2xl border border-[#4a5d4a]/30 bg-card/50 backdrop-blur-sm p-6 text-center hover:border-[#4a5d4a]/60 hover:bg-card/80 transition-all duration-300 hover:shadow-[0_0_30px_rgba(74,93,74,0.15)]">
                        <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-[#4a5d4a]/20 flex items-center justify-center group-hover:bg-[#4a5d4a]/30 group-hover:shadow-[0_0_20px_rgba(74,93,74,0.25)] transition-all duration-300">
                          <Icon className="w-7 h-7 text-[#4a5d4a]" />
                        </div>
                        <p className="font-semibold text-foreground mb-2">{d.label}</p>
                        <p className="text-xs text-muted-foreground">{d.desc}</p>
                      </div>
                    </ElectricBorder>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Current Members */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">Current Members</h2>
              <p className="text-muted-foreground mb-8">Meet the talented minds behind our robotics projects</p>
              <InfiniteMenu items={rospinotMembers()} speed={55} onItemClick={(item) => setSelectedMember(item as ClubMemberItem)} />
            </div>
          </section>

          {/* Projects */}
          <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-4">Projects</h2>
              <p className="text-muted-foreground mb-12">ROSPINOT members actively work on projects that combine robotics, artificial intelligence, and embedded systems — from concept and design through simulation, hardware implementation, and real-world experimentation.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rospinotProjects.slice(0, 6).map((p) => (
                  <Link key={p.id} href="/projects">
                    <div className="rounded-2xl border border-[#4a5d4a]/30 bg-card/50 backdrop-blur-sm p-6 hover:border-[#4a5d4a]/60 hover:scale-[1.02] transition-all duration-300 hover:shadow-[0_0_28px_rgba(74,93,74,0.12)]">
                      <FolderKanban className="w-10 h-10 text-[#4a5d4a] mb-4" />
                      <h3 className="font-bold text-foreground">{p.name}</h3>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Activities */}
          <section className="py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Activities</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'Technical Workshops', desc: 'Structured workshop series covering programming, DSA, Git, robotics, ROS, and Fusion 360.' },
                  { name: 'Robotics Hands-on Sessions', desc: 'Building and programming robots using LEGO EV3 kits — sensors, actuators, and control logic.' },
                  { name: 'Neotrix Events', desc: 'Robotics challenges, technical competitions, engineering design challenges, and interactive demonstrations.' },
                ].map((a) => (
                  <div
                    key={a.name}
                    className="rounded-2xl border border-[#4a5d4a]/30 bg-card/50 backdrop-blur-sm p-8 text-center hover:border-[#4a5d4a]/50 transition-all duration-300 hover:shadow-[0_0_24px_rgba(74,93,74,0.1)]"
                  >
                    <Zap className="w-12 h-12 text-[#4a5d4a] mx-auto mb-4" />
                    <h3 className="font-bold text-foreground text-lg mb-2">{a.name}</h3>
                    <p className="text-sm text-muted-foreground">{a.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/10">
            <div className="max-w-4xl mx-auto text-center">
              <Mail className="w-14 h-14 text-[#4a5d4a] mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Get In Touch</h2>
              <p className="text-muted-foreground mb-6">
                Interested in robotics? Reach out to join ROSPINOT.
              </p>
              <Link href="/contact">
                <Button className="bg-[#4a5d4a] hover:bg-[#5a6d5a] text-white rounded-xl px-8 py-6 text-lg">
                  Contact Us
                </Button>
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
              {selectedMember?.linkedin ? (
                <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedMember(null)}>
                  <Button className="bg-[#4a5d4a] hover:bg-[#5a6d5a] rounded-lg">Let&apos;s Connect</Button>
                </a>
              ) : (
                <Link href="/contact" onClick={() => setSelectedMember(null)}>
                  <Button className="bg-[#4a5d4a] hover:bg-[#5a6d5a] rounded-lg">Let&apos;s Connect</Button>
                </Link>
              )}
              <Button variant="outline" onClick={() => setSelectedMember(null)}>Close</Button>
            </div>
          }
        >
          {selectedMember && (
            <div className="space-y-4">
              {selectedMember.image && (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#4a5d4a]/40">
                  <Image src={selectedMember.image} alt={selectedMember.name} fill className="object-cover" />
                </div>
              )}
              <p className="font-semibold text-foreground">{selectedMember.role}</p>
              {selectedMember.bio && <p className="text-muted-foreground">{selectedMember.bio}</p>}
              {selectedMember.skills && (
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((s) => (
                    <span key={s} className="px-2 py-1 bg-[#4a5d4a]/20 text-[#4a5d4a] rounded-lg text-sm">{s}</span>
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
