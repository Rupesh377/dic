'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { MouseInteractiveBackground } from '@/components/ui/mouse-interactive-background'
import { InfiniteMenu } from '@/components/ui/infinite-menu'
import { AnimatedPopup } from '@/components/ui/animated-popup'
import { clubConfig, getClubMembers, type ClubMemberItem } from '@/data/clubs'
import { Glasses, Bot } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import GlitchText from '@/components/ui/GlitchText'
import BlurText from '@/components/ui/BlurText'
import FloatingLines from '@/components/ui/FloatingLines'

export default function ClubsPage() {
  const [selectedMember, setSelectedMember] = useState<ClubMemberItem | null>(null)

  const vrClubMembers = getClubMembers('AR')
  const rospinotMembers = getClubMembers('ROSPINOT')

  const clubSections = [
    {
      key: 'VR/AR/MR',
      title: 'VR/AR/MR Club',
      subtitle: 'Virtual, Augmented & Mixed Reality',
      description: 'Creating immersive VR, AR, and MR experiences that blend digital content with the physical world. From game development to educational applications.',
      members: vrClubMembers,
      icon: Glasses,
    },
    {
      key: 'ROSPINOT',
      title: 'ROSPINOT',
      subtitle: 'Robotics',
      description: clubConfig.ROSPINOT.description,
      members: rospinotMembers,
      icon: Bot,
    },
  ]

  return (
    <>
      <div className="fixed inset-0 -z-20">
        <FloatingLines
          enabledWaves={['top', 'middle', 'bottom']}
          lineCount={[5, 6, 4]}
          lineDistance={[6, 5, 4]}
          linesGradient={['#22d3ee', '#3b82f6', '#a855f7']}
          animationSpeed={0.9}
          parallax
        />
      </div>
      <MouseInteractiveBackground
        lineColor="rgba(59, 130, 246, 0.15)"
        dotColor="rgba(96, 165, 250, 0.6)"
        interactionRadius={220}
      />
      <Navbar />

      <main className="relative z-10 min-h-screen">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 flex flex-col gap-3 items-center">
              <GlitchText speed={0.6} enableShadows enableOnHover={false} className="custom-class text-6xl">
                Clubs
              </GlitchText>
              <BlurText
                text="Our Communities"
                delay={80}
                animateBy="words"
                direction="top"
                className="inline-flex justify-center text-2xl text-muted-foreground"
              />
            </h1>
            <p className="text-lg text-muted-foreground">
              VR/AR/MR Club and ROSPINOT — two pillars of innovation under DIC
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-24">
            {clubSections.map((section) => {
              const Icon = section.icon
              return (
                <div
                  key={section.key}
                  className="rounded-2xl border border-blue-500/20 bg-card/40 backdrop-blur overflow-hidden"
                >
                  <div className="p-8 sm:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                          {section.title}
                        </h2>
                        <p className="text-primary font-semibold">{section.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-8 max-w-2xl">
                      {section.description}
                    </p>

                    {section.key === 'VR/AR/MR' && (
                      <Link href="/vr-armr" className="inline-block mb-6">
                        <Button variant="outline" size="sm" className="rounded-lg">Visit VR/AR/MR Page →</Button>
                      </Link>
                    )}
                    {section.key === 'ROSPINOT' && (
                      <Link href="/rospinot" className="inline-block mb-6">
                        <Button variant="outline" size="sm" className="rounded-lg">Visit Rospinot Page →</Button>
                      </Link>
                    )}

                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        These are our current members
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">Click a member to learn more</p>
                      <InfiniteMenu
                        items={section.members}
                        speed={40}
                        className="rounded-lg"
                        onItemClick={(item) => setSelectedMember(item as ClubMemberItem)}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <Footer />

      <AnimatedPopup
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name}
        footer={
          <div className="flex justify-end">
            <Link href="/contact" onClick={() => setSelectedMember(null)}>
              <Button className="rounded-lg">Let&apos;s Connect</Button>
            </Link>
          </div>
        }
      >
        {selectedMember && (
          <div className="space-y-4">
            {selectedMember.image && (
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-primary/30 mb-4">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-sm text-muted-foreground">Role</p>
              <p className="font-semibold text-foreground">{selectedMember.role}</p>
            </div>
            {selectedMember.clubs && selectedMember.clubs.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Clubs</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMember.clubs.map((c) => (
                    <span key={c} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {selectedMember.bio && (
              <div>
                <p className="text-sm text-muted-foreground">Bio</p>
                <p className="text-foreground mt-1">{selectedMember.bio}</p>
              </div>
            )}
            {selectedMember.skills && selectedMember.skills.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground">Skills</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMember.skills.map((s) => (
                    <span key={s} className="px-2 py-1 bg-secondary/50 rounded text-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </AnimatedPopup>
    </>
  )
}
