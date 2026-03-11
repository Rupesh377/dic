import Link from 'next/link'
import { Award, Check } from 'lucide-react'

import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import Beams from '@/components/ui/Beams'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'

const CERTIFICATES: {
  name: string
  description: string
  requirements: string[]
}[] = [
  {
    name: 'Member Certificate',
    description: 'For active members who regularly attend club activities and contribute to discussions.',
    requirements: ['75% attendance in club meetings', 'Participation in at least one club activity', 'Good standing'],
  },
  {
    name: 'Project Completion Certificate',
    description: 'For members who successfully complete a project with their team.',
    requirements: ['Complete assigned project tasks', 'Demonstrate project outcomes', 'Work effectively with team'],
  },
  {
    name: 'Workshop Completion Certificate',
    description: 'Issued after finishing specialized hands‑on workshops or bootcamps.',
    requirements: ['90% workshop attendance', 'Complete all assignments', 'Pass final assessment'],
  },
  {
    name: 'Leadership Certificate',
    description: 'For members who take on key leadership roles in events or projects.',
    requirements: ['Lead at least one major initiative', 'Show strong planning & communication', 'Mentor juniors'],
  },
  {
    name: 'Innovation Award',
    description: 'Highlights bold ideas, prototypes, or research with clear impact.',
    requirements: [
      'Create an innovative solution or project',
      'Present work in a showcase or conference',
      'Receive mentor panel approval',
    ],
  },
  {
    name: 'Excellence Certificate',
    description: 'For members who consistently perform at a very high level across activities.',
    requirements: [
      'Maintain 95%+ attendance',
      'Lead multiple successful projects',
      'Actively mentor other members',
      'Represent the club at external events',
    ],
  },
]

export default function CertificatesPage() {
  return (
    <>
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10">
        {/* Beams full-page interactive background */}
        <div className="absolute inset-0 -z-10 opacity-80">
          <Beams
            beamWidth={3}
            beamHeight={28}
            beamNumber={18}
            lightColor="#3c06fe"
            speed={2}
            noiseIntensity={1.5}
            scale={0.22}
            rotation={30}
          />
        </div>

        {/* Hero */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <BlurText
                text="Certificates & Recognition"
                delay={80}
                animateBy="words"
                direction="top"
                className="inline-flex justify-center text-foreground"
              />
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Earn official certificates that recognize your learning, leadership, and project work across DIC clubs.
            </p>
          </div>
        </section>

        {/* Certificate Programs */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Certificate Programs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {CERTIFICATES.map((cert) => (
                <ElectricBorder key={cert.name} color="#4f46e5" borderRadius={18}>
                  <article className="bg-card/60 backdrop-blur border border-blue-500/20 rounded-xl p-6 hover:border-blue-500/60 hover:bg-card/80 transition-all hover:shadow-lg">
                    <div className="flex items-center justify-start mb-4">
                      <Award className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{cert.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{cert.description}</p>

                    <div className="border-t border-blue-500/20 pt-4">
                      <p className="text-xs font-semibold text-primary mb-3 uppercase tracking-wide">Requirements</p>
                      <ul className="space-y-2">
                        {cert.requirements.map((req) => (
                          <li key={req} className="flex gap-2 text-xs text-muted-foreground">
                            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        {/* How to Earn */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How to Earn Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  step: '1',
                  title: 'Participate',
                  description: 'Join club meetings, workshops, and hands‑on sessions regularly.',
                },
                {
                  step: '2',
                  title: 'Contribute',
                  description: 'Take ownership in projects, events, and community initiatives.',
                },
                {
                  step: '3',
                  title: 'Meet Requirements',
                  description: 'Complete the criteria for the specific certificate you are targeting.',
                },
                {
                  step: '4',
                  title: 'Get Recognised',
                  description: 'Receive a signed digital or physical certificate from DIC.',
                },
              ].map((item) => (
                <div key={item.step} className="relative">
                  <div className="bg-card/50 backdrop-blur border border-blue-500/20 rounded-lg p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-lg font-bold text-primary">{item.step}</span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </div>
                  {item.step !== '4' && (
                    <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2">
                      <div className="w-6 h-1 bg-primary/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recognition Wall */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Member Recognition</h2>
            <div className="bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">
                Our most dedicated members are featured on the recognition wall — highlighting their projects, awards,
                and leadership contributions throughout the year.
              </p>
              <Link
                href="/members"
                className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                View Member Achievements
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Earn Your Certificate?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join DIC, Rospinot, or the VR/AR/MR Club today and start building the portfolio that will follow you far
              beyond campus.
            </p>
            <Link
              href="/members"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Join a Club Today
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
