'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import { ChevronDown } from 'lucide-react'
import LightRays from '@/components/ui/LightRays'
import FuzzyText from '@/components/ui/FuzzyText'
import BlurText from '@/components/ui/BlurText'

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is DIC?',
        a: 'DIC (Digital Innovation Center) is a student-led technology community focused on robotics, immersive technology, and innovation. It houses ROSPINOT (Robotics Club) and the VRARMR Club.',
      },
      {
        q: 'What is ROSPINOT?',
        a: 'ROSPINOT is the robotics club under DIC. It focuses on designing, simulating, and building intelligent robotic systems using tools like ROS, embedded hardware, and AI.',
      },
      {
        q: 'What is the VRARMR Club?',
        a: 'The VRARMR Club explores immersive technologies — Virtual Reality, Augmented Reality, and Mixed Reality. Members build interactive applications and experiences using tools like Unity, Blender, and Snap Lens Studio.',
      },
      {
        q: 'How can I join?',
        a: 'Membership is open to all students. You can join by connecting with club members, attending orientation sessions at the beginning of each semester, or reaching out via the contact page.',
      },
      {
        q: 'Do I need experience to join?',
        a: 'No prior experience is required. DIC conducts structured workshops for new members covering programming, robotics, and immersive technologies from the basics.',
      },
    ],
  },
  {
    category: 'Activities & Events',
    questions: [
      {
        q: 'What kind of activities do the clubs organize?',
        a: 'Clubs organize technical workshops, hands-on robotics sessions, AR treasure hunts, Blender and Unity workshops, Metacon and Neotrix events, and project exhibitions at Tachyon tech fest.',
      },
      {
        q: 'How often do events happen?',
        a: 'Events are organized throughout the academic year. Technical workshops are conducted each semester, and major events like AR Treasure Hunt, Metacon, Neotrix, and Tachyon take place annually.',
      },
      {
        q: 'Can I participate in competitions through the clubs?',
        a: 'Yes. Members participate in hackathons, national robotics competitions, and technical challenges. The clubs also hold internal competitions like CodeConquerors.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'What technologies and tools do you use?',
        a: 'ROSPINOT uses ROS/ROS2, Python, C++, Arduino, Raspberry Pi, Fusion 360, and Gazebo. VRARMR uses Unity, Blender, Snap Lens Studio, Meta Quest headsets, and AR development kits.',
      },
      {
        q: 'What equipment is available for members?',
        a: 'DIC provides access to LEGO EV3 Robotics Kits, Raspberry Pi boards, robotics sensors and actuators, Meta Quest VR headsets, AR development kits, and high-performance workstations.',
      },
      {
        q: 'Do the clubs offer learning resources?',
        a: 'Yes. Structured workshops, curated learning paths, mentorship from seniors, and access to development tools and hardware are provided to all active members.',
      },
    ],
  },
]

export default function HelpPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null)
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null)

  return (
    <>
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10">
        <div className="absolute inset-0 -z-10">
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1}
            lightSpread={0.7}
            rayLength={3}
            followMouse
            mouseInfluence={0.15}
            noiseAmount={0.05}
            distortion={0.08}
            className="custom-rays"
            pulsating={false}
            fadeDistance={1.2}
            saturation={1}
          />
        </div>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <BlurText
                text="Help & FAQ"
                delay={80}
                animateBy="words"
                direction="top"
                className="inline-flex justify-center"
              />
            </h1>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about the Digital Innovation Center (DIC), ROSPINOT Robotics Club, and the VRARMR Club.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((category) => (
                <div key={category.category} className="border border-blue-500/20 rounded-lg overflow-hidden">
                  {/* Category Header */}
                  <button
                    onClick={() =>
                      setExpandedCategory(
                        expandedCategory === category.category ? null : category.category
                      )
                    }
                    className="w-full px-6 py-4 bg-card/50 backdrop-blur hover:bg-card/80 transition-all flex items-center justify-between group"
                  >
                    <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition">
                      {category.category}
                    </h2>
                    <ChevronDown
                      className={`w-5 h-5 text-primary transition-transform ${expandedCategory === category.category ? 'rotate-180' : ''
                        }`}
                    />
                  </button>

                  {/* Questions */}
                  {expandedCategory === category.category && (
                    <div className="border-t border-blue-500/20 divide-y divide-blue-500/20">
                      {category.questions.map((qa, idx) => {
                        const questionId = `${category.category}-${idx}`
                        return (
                          <div key={idx} className="bg-card/30 backdrop-blur">
                            <button
                              onClick={() =>
                                setExpandedQuestion(
                                  expandedQuestion === questionId ? null : questionId
                                )
                              }
                              className="w-full px-6 py-4 text-left flex items-start justify-between hover:bg-card/50 transition-all group"
                            >
                              <p className="font-semibold text-foreground group-hover:text-primary transition flex-1">
                                {qa.q}
                              </p>
                              <ChevronDown
                                className={`w-5 h-5 text-primary flex-shrink-0 ml-4 transition-transform ${expandedQuestion === questionId ? 'rotate-180' : ''
                                  }`}
                              />
                            </button>

                            {/* Answer */}
                            {expandedQuestion === questionId && (
                              <div className="px-6 py-4 bg-primary/5 border-t border-blue-500/20">
                                <p className="text-muted-foreground">{qa.a}</p>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Didn't find your answer?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Reach out to us through the contact page or connect with club members directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* Fuzzy footer text */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <FuzzyText
              baseIntensity={0.18}
              hoverIntensity={0.5}
              enableHover
              fontSize="clamp(1.75rem, 6vw, 3rem)"
              color="#e5e7eb"
              className="mx-auto"
              direction="horizontal"
            >
              Still stuck? We&apos;re here for you.
            </FuzzyText>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
