'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Users, Cpu, Gamepad2, Trophy, Zap, Palette, Box, Sparkles } from 'lucide-react'
import ElectricBorder from '@/components/ui/ElectricBorder'
import Galaxy from '@/components/ui/Galaxy'

const activities = [
  {
    icon: Cpu,
    title: 'Technical Workshops',
    club: 'DIC / ROSPINOT',
    description: 'Structured workshop series for incoming batches, conducted by senior members to build strong technical foundations.',
    details: 'Topics include Programming, DSA, Git & GitHub, Web Development, Robotics, ROS, and Fusion 360 for robot design.',
  },
  {
    icon: Cpu,
    title: 'Robotics Hands-on Sessions',
    club: 'ROSPINOT',
    description: 'Practical robotics sessions where members build and program robots using LEGO EV3 robotics kits.',
    details: 'Members build simple robotic systems, program movement and logic, experiment with sensors and actuators, and test behavior in controlled environments.',
  },
  {
    icon: Gamepad2,
    title: 'AR Treasure Hunt',
    club: 'VRARMR Club',
    description: 'Annual interactive campus event where participants solve clues using an AR mobile application.',
    details: 'Teams explore locations, scan AR markers to reveal digital clues. Attracts 100+ participants each year, combining exploration, teamwork, and augmented reality.',
  },
  {
    icon: Sparkles,
    title: 'Snap AR Workshop',
    club: 'VRARMR Club',
    description: 'Introduction to Augmented Reality creation using Snap Lens Studio for AR filters and interactive effects.',
    details: 'Covers AR concepts, face tracking, object tracking, creating interactive AR filters and effects, and publishing AR lenses for social platforms.',
  },
  {
    icon: Palette,
    title: 'Blender Workshop',
    club: 'VRARMR Club',
    description: 'Fundamentals of 3D modeling and environment creation for games, AR/VR experiences, animation, and simulations.',
    details: 'Topics include Blender interface, 3D modeling techniques, materials, lighting, rendering, scene design, and exporting assets for game engines and AR/VR.',
  },
  {
    icon: Box,
    title: 'Unity Workshop',
    club: 'VRARMR Club',
    description: 'Fundamentals of game development, AR, and VR using the Unity game engine for interactive applications.',
    details: 'Covers Unity interface, 3D scenes, scripting for interactions, AR/VR development, building interactive games, and exporting for different platforms.',
  },
  {
    icon: Trophy,
    title: 'Metacon & Neotrix',
    club: 'VRARMR Club & ROSPINOT',
    description: 'Recurring event series providing interactive activities, competitions, and project showcases.',
    details: 'Metacon (VRARMR): VR demos, AR gaming, immersive exhibitions. Neotrix (ROSPINOT): Robotics challenges, technical competitions, engineering design challenges.',
  },
  {
    icon: Users,
    title: 'Project Exhibition — Tachyon',
    club: 'DIC',
    description: 'Members present their projects during Tachyon, the institute\'s technical festival.',
    details: 'Projects are showcased to students, faculty, and visiting participants. Demonstrations, technology explanations, and feedback from the broader tech community.',
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
              Workshops, competitions, interactive events, and hands-on sessions organized by DIC, ROSPINOT, and VRARMR Club throughout the academic year.
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

        {/* Participation Benefits */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Benefits of Participation</h2>
            <div className="rounded-2xl p-8 border border-blue-500/30 bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-200">
                {[
                  'Practical technical experience in robotics and emerging technologies',
                  'Exposure to AR, VR, AI, and embedded systems',
                  'Opportunities to collaborate with peers on real projects',
                  'Confidence in presenting technical work publicly',
                  'Networking with other innovators and mentors',
                  'Experience in competitions and tech events',
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
