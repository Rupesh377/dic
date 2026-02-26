'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Users, Cpu, Gamepad2, Trophy, Zap } from 'lucide-react'
import ElectricBorder from '@/components/ui/ElectricBorder'
import Galaxy from '@/components/ui/Galaxy'

const activities = [
  {
    icon: Cpu,
    title: 'Robot Wars',
    club: 'Rospinot',
    description: 'Intense autonomous robot competition where our robots compete in combat-style challenges.',
    details: 'Teams build and program robots to battle each other. Testing strategies and engineering skills.',
  },
  {
    icon: Cpu,
    title: 'Robotics Race',
    club: 'Rospinot',
    description: 'Fast-paced robotics racing event with obstacle courses and speed challenges.',
    details: 'Robots navigate complex tracks, testing speed, accuracy, and autonomous decision-making.',
  },
  {
    icon: Gamepad2,
    title: 'VR Gaming Tournament',
    club: 'VR/AR/MR Club',
    description: 'Competitive VR gaming event showcasing immersive gaming experiences.',
    details: 'Players compete in various VR games, demonstrating skills in immersive environments.',
  },
  {
    icon: Gamepad2,
    title: 'VR Creative Jam',
    club: 'VR/AR/MR Club',
    description: 'Time-limited VR experience creation challenge where teams build immersive worlds.',
    details: 'Teams have limited time to create innovative VR experiences and demonstrations.',
  },
  {
    icon: Users,
    title: 'Tech Workshops',
    club: 'DIC',
    description: 'Regular hands-on workshops on emerging technologies and programming.',
    details: 'Learn from industry experts and experienced mentors in focused workshop sessions.',
  },
  {
    icon: Trophy,
    title: 'Innovation Challenge',
    club: 'DIC',
    description: 'Open innovation challenge where members solve real-world problems.',
    details: 'Teams pitch and develop innovative solutions to contemporary challenges.',
  },
]

export default function ActivitiesPage() {
  return (
    <>
      <Navbar />

      <main className="relative z-10">
        <div className="absolute inset-0 -z-10">
          <Galaxy
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.08}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
          />
        </div>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Our Activities
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore workshops, competitions, hackathons, and community events organized by DIC, Rospinot, and VR/AR/MR Club.
            </p>
          </div>
        </section>

        {/* Activities Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity, idx) => {
                const Icon = activity.icon
                return (
                  <ElectricBorder key={idx} color="#3b82f6" borderRadius={18}>
                    <div className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/50 hover:bg-card/80 transition-all duration-300">
                      <div className="p-3 rounded-lg bg-primary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">{activity.title}</h3>
                      <p className="text-sm text-primary font-semibold mb-3">{activity.club}</p>
                      <p className="text-muted-foreground text-sm mb-4">{activity.description}</p>
                      <p className="text-xs text-muted-foreground italic">{activity.details}</p>
                    </div>
                  </ElectricBorder>
                )
              })}
            </div>
          </div>
        </section>

        {/* Participation Benefits - formal professional styling */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Benefits of Participation</h2>
            <div className="rounded-2xl p-8 border border-blue-500/30 bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-200">
              {[
                'Network with talented engineers and designers',
                'Gain practical experience in your field',
                'Showcase your skills to the community',
                'Learn from experienced mentors',
                'Participate in exciting competitions',
                'Build long-lasting friendships',
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-blue-500/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <div className="w-2 h-2 bg-blue-300 rounded-full" />
                  </div>
                  <p className="text-slate-200">{benefit}</p>
                </div>
              ))}
            </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
