'use client'

import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import { BackgroundRipple } from '@/components/ui/background-ripple'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import Dither from '@/components/ui/Dither'
import TargetCursor from '@/components/ui/TargetCursor'
import FuzzyText from '@/components/ui/FuzzyText'
import BlurText from '@/components/ui/BlurText'

const clubs = [
  {
    name: 'DIC (Developers & Innovators Club)',
    email: 'dic@college.edu',
    phone: '+91 XXXXXXXXXX',
    location: 'Building A, Room 101',
    meetingTime: 'Thursdays 3:00 PM - 5:00 PM',
    focus: 'Software Development, Web Development, Innovation',
  },
  {
    name: 'Rospinot (Robotics Club)',
    email: 'rospinot@college.edu',
    phone: '+91 XXXXXXXXXX',
    location: 'Robotics Lab, Building B',
    meetingTime: 'Tuesdays & Fridays 4:00 PM - 6:00 PM',
    focus: 'Robotics, Autonomous Systems, Hardware Development',
  },
  {
    name: 'VR/AR/MR Club (Virtual, Augmented & Mixed Reality)',
    email: 'vrclub@college.edu',
    phone: '+91 XXXXXXXXXX',
    location: 'VR Lab, Building C',
    meetingTime: 'Wednesdays 2:00 PM - 4:00 PM',
    focus: 'Virtual Reality, Augmented Reality, Immersive Tech',
  },
]

export default function ContactPage() {
  return (
    <>
      <NetworkBackground />
      <Navbar />

      <main className="relative z-10">
        <div className="absolute inset-0 -z-10 opacity-80">
          <Dither
            waveColor={[0.6, 0.3, 0.6]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.35}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.06}
          />
        </div>
        <TargetCursor
          targetSelector=".cursor-target"
          spinDuration={2}
          hideDefaultCursor
          hoverDuration={0.25}
          parallaxOn
        />
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              <BlurText
                text="Get In Touch"
                delay={80}
                animateBy="words"
                direction="top"
                className="inline-flex justify-center"
              />
            </h1>
            <p className="text-lg text-muted-foreground mb-2">
              Have questions? Want to collaborate?
            </p>
            <p className="text-base text-muted-foreground">
              Reach out to DIC, Rospinot, or VR/AR/MR Club — we&apos;re here to help you join the innovation.
            </p>
          </div>
        </section>

        {/* Club Contact Information */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {clubs.map((club, idx) => (
                <div
                  key={idx}
                  className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-8 hover:border-blue-500/50 hover:bg-card/80 transition-all"
                >
                  <h3 className="text-xl font-bold text-foreground mb-6">{club.name}</h3>

                  <div className="space-y-4">
                    {/* Email */}
                    <a
                      href={`mailto:${club.email}`}
                      className="flex gap-4 group/email hover:text-primary transition cursor-target"
                    >
                      <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-muted-foreground uppercase">Email</p>
                        <p className="text-foreground break-all group-hover/email:text-primary">
                          {club.email}
                        </p>
                      </div>
                    </a>

                    {/* Phone */}
                    <a
                      href={`tel:${club.phone}`}
                      className="flex gap-4 group/phone hover:text-primary transition cursor-target"
                    >
                      <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground uppercase">Phone</p>
                        <p className="text-foreground group-hover/phone:text-primary">{club.phone}</p>
                      </div>
                    </a>

                    {/* Location */}
                    <div className="flex gap-4">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground uppercase">Location</p>
                        <p className="text-foreground">{club.location}</p>
                      </div>
                    </div>

                    {/* Meeting Time */}
                    <div className="flex gap-4">
                      <Clock className="w-5 h-5 text-primary flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground uppercase">Meeting Time</p>
                        <p className="text-foreground text-sm">{club.meetingTime}</p>
                      </div>
                    </div>

                    {/* Focus Areas */}
                    <div className="pt-4 border-t border-blue-500/20">
                      <p className="text-xs text-muted-foreground uppercase mb-2">Focus</p>
                      <p className="text-sm text-foreground">{club.focus}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Send us a Message</h2>

            <form className="bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl p-8 space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-blue-500/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-blue-500/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-blue-500/20 text-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                >
                  <option value="">Select a subject</option>
                  <option value="membership">Club Membership</option>
                  <option value="collaboration">Collaboration Inquiry</option>
                  <option value="sponsorship">Sponsorship Opportunity</option>
                  <option value="speaking">Speaking Engagement</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Club */}
              <div>
                <label htmlFor="club" className="block text-sm font-semibold text-foreground mb-2">
                  Club
                </label>
                <select
                  id="club"
                  className="w-full px-4 py-3 rounded-lg bg-card border border-blue-500/20 text-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30"
                >
                  <option value="">Select a club</option>
                  <option value="dic">DIC</option>
                  <option value="rospinot">Rospinot</option>
                  <option value="vrclub">VR Club</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Your message..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-blue-500/20 text-foreground placeholder-muted-foreground focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="cursor-target w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>

        {/* Social Links */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Follow Us</h2>
            <div className="flex justify-center gap-6 flex-wrap">
              {[
                { name: 'GitHub', icon: '🐙' },
                { name: 'LinkedIn', icon: '💼' },
                { name: 'Instagram', icon: '📸' },
                { name: 'Discord', icon: '💬' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  className="cursor-target w-16 h-16 rounded-full bg-card/50 backdrop-blur border border-blue-500/20 hover:border-blue-500/50 hover:bg-card/80 transition-all flex items-center justify-center text-2xl"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </section>
        {/* Fuzzy outro */}
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
              Let&apos;s build something amazing.
            </FuzzyText>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
