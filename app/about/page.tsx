'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Target, Lightbulb, Zap, Cpu, Gamepad2 } from 'lucide-react'

import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import { JourneyTimeline } from '@/components/ui/journey-timeline'
import { MouseInteractiveBackground } from '@/components/ui/mouse-interactive-background'
import { ModelViewer } from '@/components/ui/model-viewer'
import { AnimatedPopup } from '@/components/ui/animated-popup'
import { Button } from '@/components/ui/button'
import LiquidEther from '@/components/ui/LiquidEther'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'

const clubDetails = {
  rospinot: {
    title: 'ROSPINOT',
    subtitle: 'Robotics Innovation Club',
    description:
      'ROSPINOT is the robotics research and development community within DIC. The club focuses on designing intelligent robotic systems by combining mechanical design, software development, and hardware implementation. Members work across the entire robotics development pipeline — from conceptual design to simulation and real-world deployment.',
    focus: ['Robot Design & Modeling', 'URDF & ROS Development', 'Simulation & Testing', 'Hardware Development', 'AI & Machine Learning Integration', 'Mathematics & Control Systems'],
    href: '/rospinot',
  },
  vr: {
    title: 'VRARMR Club',
    subtitle: 'Immersive Technology',
    description:
      'The VRARMR Club is the immersive technology community within DIC focused on developing interactive digital experiences using Virtual Reality, Augmented Reality, and Mixed Reality. Members work across the immersive development pipeline, from conceptualizing ideas and designing 3D environments to developing interactive applications and prototypes.',
    focus: ['3D Environment Design & Modeling', 'Virtual Reality Development', 'Augmented Reality Applications', 'Mixed Reality Interaction Systems', 'Immersive Game Design & Storytelling'],
    href: '/vr-armr',
  },
} as const

type ClubKey = keyof typeof clubDetails

export default function AboutPage() {
  const [selectedClub, setSelectedClub] = useState<ClubKey | null>(null)

  return (
    <>
      <NetworkBackground />
      <MouseInteractiveBackground
        lineColor="rgba(59, 130, 246, 0.22)"
        dotColor="rgba(96, 165, 250, 0.7)"
        interactionRadius={280}
      />
      <Navbar />

      <main className="relative z-10">
        {/* Liquid Ether full-page background */}
        <div className="absolute inset-0 -z-10 opacity-80">
          <LiquidEther
            colors={['#1d4ed8', '#6d28d9', '#0ea5e9']}
            mouseForce={20}
            cursorSize={80}
            isViscous
            viscous={28}
            iterationsViscous={28}
            iterationsPoisson={28}
            resolution={0.45}
            isBounce={false}
            autoDemo
            autoSpeed={0.4}
            autoIntensity={2}
            takeoverDuration={0.25}
            autoResumeDelay={2500}
            autoRampDuration={0.6}
          />
        </div>

        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-4xl w-full mx-auto text-center">

            <h1 className="font-bold mb-6 text-foreground drop-shadow-[0_0_18px_rgba(15,23,42,0.9)]">
              <div className="w-full flex justify-center">
                <BlurText
                  text={`About Us`}
                  delay={70}
                  animateBy="words"
                  direction="top"
                  className="whitespace-pre-line text-4xl sm:text-5xl lg:text-6xl leading-tight text-center"
                />
              </div>
            </h1>

            <p className="text-xl text-muted-foreground mb-4">
              The Development And Innovation Centre (DIC) is a collaborative hub for students passionate about technology, engineering, and innovation. It brings together multiple specialized clubs that focus on building real-world technical skills through projects, research, and experimentation.
            </p>

            <p className="text-lg text-muted-foreground">
              Rather than focusing only on theory, DIC promotes hands-on development, where students design, prototype, and implement real technological solutions. Currently, the center brings together two major clubs — ROSPINOT and the VRARMR Club.
            </p>

          </div>
        </section>
        {/* Mission, Vision, Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <ElectricBorder color="#60a5fa" borderRadius={20}>
              <div className="bg-card/70 backdrop-blur-sm rounded-xl p-8 hover:bg-card/80 transition-colors duration-300">
                <div className="w-12 h-12 bg-primary/25 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(59,130,246,0.25)]">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">Our Mission</h2>
                <p className="text-muted-foreground">
                  The Development And Innovation Centre (DIC) aims to foster a culture of innovation, collaboration, and hands-on technical learning. Through communities such as ROSPINOT and the VRARMR Club, DIC provides students with opportunities to explore emerging technologies while building practical skills through real-world projects and experimentation.
                </p>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#a855f7" borderRadius={20}>
              <div className="bg-gradient-to-br from-blue-500/20 to-primary/10 backdrop-blur-sm rounded-xl p-8 hover:bg-primary/15 transition-colors duration-300">
                <div className="w-12 h-12 rounded-lg bg-primary/30 flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">Our Vision</h2>
                <p className="text-muted-foreground">
                  Our vision is to create a community where students can experiment freely, learn continuously, and innovate boldly. By bringing together robotics through ROSPINOT and immersive technologies through the VRARMR Club, DIC strives to inspire the next generation of engineers, developers, and technology innovators.
                </p>
              </div>
            </ElectricBorder>

            <ElectricBorder color="#facc15" borderRadius={20}>
              <div className="bg-card/70 backdrop-blur-sm rounded-xl p-8 hover:bg-card/80 transition-colors duration-300">
                <div className="w-12 h-12 bg-primary/25 rounded-lg flex items-center justify-center mb-4 shadow-[0_0_16px_rgba(59,130,246,0.25)]">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-foreground mb-3">We Aim To</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Build real-world technology projects and prototypes</li>
                  <li>• Explore emerging technologies like robotics & immersive systems</li>
                  <li>• Foster interdisciplinary collaboration</li>
                  <li>• Prepare members for research & industry opportunities</li>
                </ul>
              </div>
            </ElectricBorder>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-secondary/30/0 to-background/60">
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
            <p className="text-muted-foreground text-center mb-10 max-w-xl mx-auto">
              DIC acts as a cluster of specialized technology clubs, each exploring different emerging fields while sharing knowledge and resources within the same innovation community.
            </p>
            <div className="rounded-2xl border border-blue-500/25 bg-card/50 backdrop-blur-sm p-8 sm:p-12 flex items-center justify-center">
              <div className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
                {[
                  { title: 'Build & Innovate', icon: Zap },
                  { title: 'Compete & Excel', icon: Target },
                  { title: 'Learn & Grow', icon: Lightbulb },
                  { title: 'Collaborate', icon: Cpu },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.title} className="flex flex-col items-center gap-3 text-center">
                      <div className="p-4 rounded-xl bg-primary/20 border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.15)] hover:shadow-[0_0_28px_rgba(59,130,246,0.2)] transition-shadow duration-300">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <p className="font-semibold text-foreground text-sm sm:text-base">{item.title}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Journey timeline */}
        <section className="bg-secondary/10">
          <JourneyTimeline />
        </section>

        {/* Clubs overview */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4 text-center">Our Clubs</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
              Two clubs, one ecosystem — click a card to see where you fit best.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <button
                type="button"
                onClick={() => setSelectedClub('rospinot')}
                className="text-left rounded-2xl border border-blue-500/20 overflow-hidden bg-card/40 backdrop-blur-sm hover:shadow-[0_0_28px_rgba(59,130,246,0.12)] hover:border-blue-500/40 transition-all duration-300"
              >
                <ModelViewer imageSrc="/placeholder.svg" alt="Rospinot Robotics" aspectRatio="wide" className="w-full" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Cpu className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">Rospinot</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Designing intelligent robotic systems by combining mechanical design, software development, simulation, and hardware implementation.
                  </p>
                  <span className="text-primary text-sm font-medium">Click for details →</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedClub('vr')}
                className="text-left rounded-2xl border border-blue-500/20 overflow-hidden bg-card/40 backdrop-blur-sm hover:shadow-[0_0_28px_rgba(59,130,246,0.12)] hover:border-blue-500/40 transition-all duration-300"
              >
                <ModelViewer imageSrc="/placeholder.svg" alt="VR/AR/MR Club" aspectRatio="wide" className="w-full" />
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Gamepad2 className="w-8 h-8 text-primary" />
                    <h3 className="text-xl font-bold text-foreground">VR/AR/MR Club</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">
                    Developing interactive experiences using Virtual Reality, Augmented Reality, and Mixed Reality technologies.
                  </p>
                  <span className="text-primary text-sm font-medium">Click for details →</span>
                </div>
              </button>
            </div>

            <div className="text-center mt-10">
              <Link href="/clubs">
                <Button variant="ghost" className="rounded-lg">
                  Explore All Clubs
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedClub && (
        <AnimatedPopup
          isOpen={!!selectedClub}
          onClose={() => setSelectedClub(null)}
          title={clubDetails[selectedClub].title}
          footer={
            <div className="flex gap-3 justify-end">
              <Link href={clubDetails[selectedClub].href} onClick={() => setSelectedClub(null)}>
                <Button className="rounded-lg">Visit {clubDetails[selectedClub].title}</Button>
              </Link>
              <Button variant="outline" onClick={() => setSelectedClub(null)} className="rounded-lg">
                Close
              </Button>
            </div>
          }
        >
          <p className="text-sm font-semibold text-primary mb-2">{clubDetails[selectedClub].subtitle}</p>
          <p className="text-muted-foreground mb-4">{clubDetails[selectedClub].description}</p>
          <h4 className="font-semibold text-foreground mb-2">Focus Areas</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            {clubDetails[selectedClub].focus.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
        </AnimatedPopup>
      )}
    </>
  )
}
