'use client'

import { useState, useEffect, useCallback } from 'react'
import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { ClubPopup } from '@/components/ClubPopup'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { TypingEffect } from '@/components/TypingEffect'
import { ScrollReveal } from '@/components/ScrollReveal'
import { Counter } from '@/components/Counter'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { projects } from '@/data/projects'
import Link from 'next/link'
import { ArrowRight, Zap, Rocket, Code, Lightbulb, Quote, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import Hyperspeed, { hyperspeedPresets } from '@/components/ui/Hyperspeed'
import BlurText from '@/components/ui/BlurText'
import ElectricBorder from '@/components/ui/ElectricBorder'
import GlareHover from '@/components/ui/GlareHover'
import ClickSpark from '@/components/ui/ClickSpark'

export default function Home() {
  const [selectedClub, setSelectedClub] = useState<'Rospinot' | 'VR Club' | null>(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = projects.length

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }, [totalSlides])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }, [totalSlides])

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <ClickSpark sparkColor="#38bdf8" sparkSize={10} sparkRadius={18} sparkCount={10} duration={420}>
      <NetworkBackground />
      <Navbar />

      <main id="main-content" className="relative z-10">
        {/* Hero Section - no 3D, single column */}
        <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20 pb-20 overflow-hidden">
          {/* Hyperspeed background */}
          <div className="absolute inset-0 opacity-60 mix-blend-screen">
            <Hyperspeed effectOptions={hyperspeedPresets.one} />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto w-full">
            <div className="space-y-12">
              {/* Tagline */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <p className="text-sm font-semibold text-primary">Leading Tech Innovation Hub</p>
              </div>

              {/* Main Title */}
              <div className="space-y-6">
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-balance">
                  <span className="text-foreground">Build the</span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400 animate-gradient-text inline-block">
                    <TypingEffect
                      text="Future"
                      className="inline-block min-w-[0.5em]"
                      typeSpeed={120}
                      deleteSpeed={80}
                      cursorClassName="text-cyan-400"
                    />
                  </span>
                </h1>
                <BlurText
                  text="Join DIC, Rospinot, and VR Club where innovation meets creation. We're building tomorrow's technology today."
                  delay={60}
                  animateBy="words"
                  direction="top"
                  className="text-xl sm:text-2xl text-muted-foreground max-w-3xl text-balance font-light leading-relaxed"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/about" className="flex-1 sm:flex-none">
                  <GlareHover
                    glareColor="#38bdf8"
                    glareOpacity={0.35}
                    glareAngle={-30}
                    glareSize={220}
                    transitionDuration={700}
                    className="inline-block w-full sm:w-auto"
                    width="100%"
                    height="auto"
                    background="transparent"
                    borderRadius="9999px"
                    borderColor="transparent"
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto group hover:shadow-lg hover:shadow-primary/25 transition-shadow duration-300"
                    >
                      Explore Community
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </GlareHover>
                </Link>
                <Link href="/projects" className="flex-1 sm:flex-none">
                  <GlareHover
                    glareColor="#e5e7eb"
                    glareOpacity={0.25}
                    glareAngle={-40}
                    glareSize={210}
                    transitionDuration={700}
                    className="inline-block w-full sm:w-auto"
                    width="100%"
                    height="auto"
                    background="transparent"
                    borderRadius="9999px"
                    borderColor="transparent"
                  >
                    <Button size="lg" variant="outline" className="w-full sm:w-auto">
                      View Projects
                    </Button>
                  </GlareHover>
                </Link>
              </div>

              {/* Stats Quick View - counter animation with stagger */}
              <div className="grid grid-cols-2 gap-8 pt-12 max-w-md">
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    <Counter end={150} suffix="+" duration={2000} delay={0} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Members</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl sm:text-4xl font-bold text-primary">
                    <Counter end={12} suffix="+" duration={1600} delay={150} />
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">Awards</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Club Showcase - Featured Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Our Clubs</h2>
                <p className="text-lg text-muted-foreground">Three pillars of innovation</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: Rocket,
                  title: 'Rospinot',
                  subtitle: 'Robotics Club',
                  description: 'Build intelligent autonomous systems. Master robotics, AI, and embedded systems through hands-on projects.',
                  color: 'from-blue-500 to-cyan-500',
                  id: 'Rospinot' as const,
                },
                {
                  icon: Lightbulb,
                  title: 'VR Club',
                  subtitle: 'Virtual Reality Club',
                  description: 'Create immersive experiences. Explore cutting-edge VR technology and interactive digital worlds.',
                  color: 'from-purple-500 to-pink-500',
                  id: 'VR Club' as const,
                },
              ].map((club, idx) => {
                const Icon = club.icon
                return (
                  <ScrollReveal key={club.title} delay={idx * 100} direction="up">
                    <ElectricBorder color={club.id === 'Rospinot' ? '#22c55e' : '#a855f7'} borderRadius={24}>
                      <div
                        className="group relative overflow-hidden rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 hover:shadow-[0_0_30px_rgba(59,130,246,0.08)] backdrop-blur-sm"
                        onClick={() => setSelectedClub(club.id)}
                      >
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${club.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                        />
                        <div className="relative p-8 sm:p-10 backdrop-blur bg-card/60 group-hover:bg-card/70 transition-all duration-300 h-full flex flex-col">
                          <div
                            className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${club.color} bg-opacity-10 w-fit mb-6`}
                          >
                            <Icon className="w-8 h-8 text-primary" />
                          </div>

                          <h3 className="text-3xl font-bold text-foreground mb-1">{club.title}</h3>
                          <p className="text-sm text-primary font-semibold mb-4">{club.subtitle}</p>
                          <p className="text-muted-foreground mb-8 flex-grow">{club.description}</p>

                          <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all">
                            <span>Explore</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </div>
                    </ElectricBorder>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* Selective Projects - Sliding Carousel */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  <BlurText
                    text="Selective Projects"
                    delay={70}
                    animateBy="words"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h2>
                <p className="text-lg text-muted-foreground">Handpicked innovations from our clubs</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <div className="relative">
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 p-2 rounded-full bg-card/80 border border-blue-500/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 backdrop-blur-sm shadow-lg hidden md:flex items-center justify-center"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 p-2 rounded-full bg-card/80 border border-blue-500/30 text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 backdrop-blur-sm shadow-lg hidden md:flex items-center justify-center"
                  aria-label="Next project"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Slider */}
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {projects.map((project) => (
                      <div key={project.id} className="w-full flex-shrink-0 px-1">
                        <Link href="/projects" className="block group">
                          <ElectricBorder color="#38bdf8" borderRadius={26}>
                            <div className="rounded-2xl border border-blue-500/30 bg-card/60 backdrop-blur-sm p-8 sm:p-10 hover:border-blue-500/50 hover:shadow-xl hover:shadow-primary/10 hover:shadow-[0_0_40px_rgba(59,130,246,0.06)] transition-all duration-300">
                              <div className="flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3">
                                    <span className="text-sm font-semibold text-primary">
                                      {project.club} · {project.domain}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                      project.status === 'active'
                                        ? 'bg-green-500/20 text-green-400'
                                        : project.status === 'completed'
                                        ? 'bg-blue-500/20 text-blue-400'
                                        : 'bg-yellow-500/20 text-yellow-400'
                                    }`}>
                                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                                    </span>
                                  </div>
                                  <h3 className="text-2xl sm:text-3xl font-bold text-foreground mt-2 group-hover:text-primary transition">
                                    {project.name}
                                  </h3>
                                  <p className="text-muted-foreground mt-3 line-clamp-2">{project.description}</p>
                                  <div className="flex flex-wrap gap-2 mt-4">
                                    {(project.skills ?? []).slice(0, 4).map((s) => (
                                      <span
                                        key={s}
                                        className="px-2 py-1 rounded-md bg-primary/20 text-primary text-xs font-medium"
                                      >
                                        {s}
                                      </span>
                                    ))}
                                  </div>
                                  <div className="flex flex-wrap gap-1 mt-3">
                                    {project.contributors.slice(0, 3).map((c) => (
                                      <span key={c} className="text-xs text-muted-foreground">
                                        {c}{project.contributors.indexOf(c) < Math.min(2, project.contributors.length - 1) ? ',' : ''}
                                      </span>
                                    ))}
                                    {project.contributors.length > 3 && (
                                      <span className="text-xs text-muted-foreground">+{project.contributors.length - 3} more</span>
                                    )}
                                  </div>
                                </div>
                                <ArrowRight className="w-8 h-8 text-primary group-hover:translate-x-2 transition-transform shrink-0 mt-2" />
                              </div>
                            </div>
                          </ElectricBorder>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide
                          ? 'bg-primary w-8'
                          : 'bg-muted-foreground/30 w-2 hover:bg-muted-foreground/50'
                      }`}
                      aria-label={`Go to project ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  <BlurText
                    text="What Members Say"
                    delay={80}
                    animateBy="words"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h2>
                <p className="text-lg text-muted-foreground">Stories from our community</p>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: 'DIC gave me the platform to turn ideas into real robotics projects. The mentorship here is unmatched.', name: 'Aditya K.', role: 'Rospinot Member' },
                { quote: 'VR Club opened my eyes to immersive tech. We built an educational platform that teachers now use.', name: 'Isha R.', role: 'VR Club' },
                { quote: 'From workshops to hackathons, the community pushes you to grow. Best decision I made in college.', name: 'Rajesh P.', role: 'Core Team' },
              ].map((t, idx) => (
                <ScrollReveal key={t.name} delay={idx * 120}>
                  <ElectricBorder color="#38bdf8" borderRadius={20}>
                    <div className="p-6 rounded-2xl border border-blue-500/20 bg-card/50 backdrop-blur-sm hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.06)] transition-all duration-300">
                      <Quote className="w-8 h-8 text-primary/50 mb-4" />
                      <p className="text-foreground mb-4">&ldquo;{t.quote}&rdquo;</p>
                      <p className="font-semibold text-foreground">{t.name}</p>
                      <p className="text-sm text-muted-foreground">{t.role}</p>
                    </div>
                  </ElectricBorder>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative bg-secondary/10">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  <BlurText
                    text="FAQ"
                    delay={70}
                    animateBy="letters"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h2>
                <p className="text-lg text-muted-foreground">Common questions</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Accordion type="single" collapsible className="rounded-xl border border-blue-500/20 bg-card/40 backdrop-blur overflow-hidden">
                <AccordionItem value="1" className="px-6 border-blue-500/10">
                  <AccordionTrigger>How do I join DIC or a club?</AccordionTrigger>
                  <AccordionContent>Visit the Contact page or reach out during orientation. You can also attend our open workshops and introduce yourself to the core team.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="2" className="px-6 border-blue-500/10">
                  <AccordionTrigger>Do I need prior experience in robotics or VR?</AccordionTrigger>
                  <AccordionContent>No. We welcome beginners. We run workshops and mentorship programs to help you get started and grow with the community.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="3" className="px-6 border-blue-500/10">
                  <AccordionTrigger>How can I contribute to a project?</AccordionTrigger>
                  <AccordionContent>Check the Projects page for active and planning projects. Contact the project leads or drop a message in our Discord to get involved.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="4" className="px-6 border-blue-500/10">
                  <AccordionTrigger>When are events and workshops held?</AccordionTrigger>
                  <AccordionContent>We post events on the Events page and announce them on our social channels. Regular workshops run throughout the semester.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </ScrollReveal>
          </div>
        </section>

        {/* Partners / Sponsors */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  <BlurText
                    text="Partners & Support"
                    delay={80}
                    animateBy="words"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h2>
                <p className="text-lg text-muted-foreground">Institutions and organizations we work with</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="flex flex-wrap justify-center gap-8 items-center opacity-80">
                {['Institute', 'Tech Partner', 'Research Lab', 'Innovation Hub'].map((name, i) => (
                  <ElectricBorder key={name} color="#3b82f6" borderRadius={16}>
                    <div className="flex items-center gap-2 px-6 py-3 rounded-xl border border-blue-500/20 bg-card/40">
                      <Building2 className="w-5 h-5 text-primary" />
                      <span className="font-semibold text-foreground">{name}</span>
                    </div>
                  </ElectricBorder>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                  <BlurText
                    text="Why Join Us?"
                    delay={80}
                    animateBy="words"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h2>
                <p className="text-lg text-muted-foreground">Everything you need to innovate</p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Rocket, title: 'Real Projects', description: 'Work on impactful projects that solve real-world problems' },
                { icon: Code, title: 'Expert Mentorship', description: 'Learn from experienced engineers and industry professionals' },
                { icon: Zap, title: 'Cutting Edge Tech', description: 'Access to latest tools, platforms, and technologies' },
                { icon: Lightbulb, title: 'Community', description: 'Network with passionate innovators and builders' },
              ].map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <ScrollReveal key={idx} delay={idx * 80}>
                    <ElectricBorder color="#38bdf8" borderRadius={18}>
                      <div className="group p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 bg-card/50 hover:bg-card/65 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5">
                        <div className="inline-flex p-3 rounded-lg bg-primary/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </ElectricBorder>
                  </ScrollReveal>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
            <div className="relative rounded-2xl border border-blue-500/30 overflow-hidden p-12 sm:p-16 text-center shadow-lg shadow-primary/10">
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10" />
              
              {/* Content */}
              <div className="relative space-y-6">
                <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
                  <BlurText
                    text="Ready to Innovate?"
                    delay={80}
                    animateBy="words"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Join thousands of creators building the future through robotics and virtual reality.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/contact">
                    <GlareHover
                      glareColor="#38bdf8"
                      glareOpacity={0.35}
                      glareAngle={-30}
                      glareSize={220}
                      transitionDuration={700}
                      className="inline-block"
                      width="auto"
                      height="auto"
                      background="transparent"
                      borderRadius="9999px"
                      borderColor="transparent"
                    >
                      <Button size="lg" className="group">
                        Get Started
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </GlareHover>
                  </Link>
                  <Link href="/team">
                    <GlareHover
                      glareColor="#e5e7eb"
                      glareOpacity={0.25}
                      glareAngle={-40}
                      glareSize={210}
                      transitionDuration={700}
                      className="inline-block"
                      width="auto"
                      height="auto"
                      background="transparent"
                      borderRadius="9999px"
                      borderColor="transparent"
                    >
                      <Button size="lg" variant="outline">
                        Meet the Team
                      </Button>
                    </GlareHover>
                  </Link>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />

      {selectedClub && (
        <ClubPopup club={selectedClub} onClose={() => setSelectedClub(null)} />
      )}
    </ClickSpark>
  )
}
