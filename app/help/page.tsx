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
        q: 'What are DIC, Rospinot, and VR Club?',
        a: 'DIC (Developers & Innovators Club) focuses on web and software development. Rospinot is our robotics club specializing in autonomous systems. VR Club explores virtual and augmented reality technologies.',
      },
      {
        q: 'How can I join the clubs?',
        a: 'You can join any of our clubs by attending our recruitment sessions at the beginning of each semester or contacting the club leads directly.',
      },
      {
        q: 'Are memberships free?',
        a: 'Yes, all club memberships are free and open to all students.',
      },
      {
        q: 'Do I need prior experience?',
        a: 'No prior experience is necessary. We welcome beginners and provide training and mentorship to help you grow.',
      },
    ],
  },
  {
    category: 'Activities & Events',
    questions: [
      {
        q: 'How often do clubs meet?',
        a: 'Most clubs meet weekly during scheduled time slots. Additional meetings are organized for projects and events.',
      },
      {
        q: 'Can I participate in competitions?',
        a: 'Yes! We regularly participate in inter-college and national competitions. Training is provided for interested members.',
      },
      {
        q: 'How are events organized?',
        a: 'Events are planned by club leadership with input from members. We organize workshops, competitions, exhibitions, and networking events.',
      },
    ],
  },
  {
    category: 'Projects & Collaboration',
    questions: [
      {
        q: 'How do I get involved in club projects?',
        a: 'Talk to your club lead about ongoing projects and express your interest. Teams are formed based on skills and availability.',
      },
      {
        q: 'Can external companies collaborate with us?',
        a: 'Absolutely! We welcome industry partnerships. Check our Collaborate page for more details or contact us directly.',
      },
      {
        q: 'How do we manage project conflicts?',
        a: 'We have a clear project management process with defined roles, responsibilities, and timelines to ensure smooth collaboration.',
      },
    ],
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'What tools and equipment do you have access to?',
        a: 'We have robotics kits, VR equipment, computers, 3D printers, and various software licenses available for member use.',
      },
      {
        q: 'Can I learn specific technologies?',
        a: 'Yes, we offer workshops and training on various technologies relevant to our clubs. Check our Resources page for learning materials.',
      },
      {
        q: 'How do you stay updated with latest technologies?',
        a: 'We follow industry trends, attend conferences, invite expert speakers, and participate in hackathons and competitions.',
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
              Find answers to common questions about our clubs and activities
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
                      className={`w-5 h-5 text-primary transition-transform ${
                        expandedCategory === category.category ? 'rotate-180' : ''
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
                                className={`w-5 h-5 text-primary flex-shrink-0 ml-4 transition-transform ${
                                  expandedQuestion === questionId ? 'rotate-180' : ''
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
              Get in touch with us directly. We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:contact@clubs.example.com"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Email Us
              </a>
              <a
                href="#"
                className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition"
              >
                Join Discord
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
