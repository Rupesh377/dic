import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Users, Briefcase, Gift, Zap } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ElectricBorder from '@/components/ui/ElectricBorder'
import { MouseInteractiveBackground } from '@/components/ui/mouse-interactive-background'
import FloatingLines from '@/components/ui/FloatingLines'

export default function CollaboratePage() {
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

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Collaborate With Us
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with DIC, Rospinot, and VR Club to drive innovation and create impact
            </p>
          </div>
        </section>

        {/* Collaboration Options */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Internships */}
              <ElectricBorder color="#3b82f6" borderRadius={20}>
                <div className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-card/80 transition-all">
                  <div className="p-3 rounded-lg bg-primary/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Internship Programs</h3>
                  <p className="text-muted-foreground mb-4">
                    Offer internship opportunities to our talented members. Gain insights into the next generation of tech talent.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Robotics Engineering</li>
                    <li>• VR Development</li>
                    <li>• Software Development</li>
                    <li>• Project Management</li>
                  </ul>
                  <Link href="/contact">
                    <Button>Get Started</Button>
                  </Link>
                </div>
              </ElectricBorder>

              {/* Sponsorship */}
              <ElectricBorder color="#22c55e" borderRadius={20}>
                <div className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-card/80 transition-all">
                  <div className="p-3 rounded-lg bg-accent/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Gift className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Sponsorship</h3>
                  <p className="text-muted-foreground mb-4">
                    Support our events, competitions, and initiatives. Build brand visibility within the tech community.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Event Sponsorship</li>
                    <li>• Equipment Sponsorship</li>
                    <li>• Prize Sponsorship</li>
                    <li>• Travel Support</li>
                  </ul>
                  <Link href="/contact">
                    <Button>Explore Options</Button>
                  </Link>
                </div>
              </ElectricBorder>

              {/* Joint Projects */}
              <ElectricBorder color="#0ea5e9" borderRadius={20}>
                <div className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-card/80 transition-all">
                  <div className="p-3 rounded-lg bg-blue-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Joint Projects</h3>
                  <p className="text-muted-foreground mb-4">
                    Collaborate on innovative projects that combine industry expertise with student creativity.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Product Development</li>
                    <li>• Research Collaboration</li>
                    <li>• Prototype Development</li>
                    <li>• Technology Integration</li>
                  </ul>
                  <Link href="/contact">
                    <Button>Propose Collaboration</Button>
                  </Link>
                </div>
              </ElectricBorder>

              {/* Speaking Engagements */}
              <ElectricBorder color="#a855f7" borderRadius={20}>
                <div className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-card/80 transition-all">
                  <div className="p-3 rounded-lg bg-purple-500/20 w-fit mb-4 group-hover:scale-110 transition-transform">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">Speaking Engagements</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your expertise with our community. Inspire the next generation of innovators.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                    <li>• Tech Talks</li>
                    <li>• Workshops</li>
                    <li>• Panel Discussions</li>
                    <li>• Mentorship Sessions</li>
                  </ul>
                  <Link href="/contact">
                    <Button>Schedule Talk</Button>
                  </Link>
                </div>
              </ElectricBorder>
            </div>
          </div>
        </section>

        {/* Why Partner With Us */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Partner With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Access Talent',
                  description: 'Connect with motivated students passionate about robotics and VR technology.',
                },
                {
                  title: 'Brand Visibility',
                  description: 'Gain exposure through events, projects, and community channels.',
                },
                {
                  title: 'Innovation',
                  description: 'Leverage fresh ideas and creative solutions from diverse talent pools.',
                },
                {
                  title: 'Community Impact',
                  description: 'Contribute to building the next generation of tech leaders.',
                },
                {
                  title: 'Flexible Options',
                  description: 'Choose collaboration models that align with your goals and budget.',
                },
                {
                  title: 'Long-term Relationships',
                  description: 'Build lasting partnerships with continuous engagement opportunities.',
                },
              ].map((benefit, idx) => (
                <div key={idx} className="bg-card/50 backdrop-blur border border-blue-500/20 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Collaborate?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's work together to create something amazing. Contact us to discuss collaboration opportunities.
            </p>
            <Link href="/contact">
              <Button size="lg">Get In Touch</Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
