import Link from 'next/link'
import { Mail, Github, Linkedin, Instagram } from 'lucide-react'
import { NewsletterForm } from '@/components/NewsletterForm'
import RippleGrid from '@/components/ui/RippleGrid'

const SOCIAL_LINKS = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
]

export function Footer() {
  return (
    <footer className="relative z-10 bg-card/80 backdrop-blur border-t border-blue-500/20 overflow-hidden">
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.06}
          gridSize={9}
          gridThickness={16}
          fadeDistance={1.8}
          vignetteStrength={2.2}
          glowIntensity={0.2}
          opacity={0.6}
          mouseInteraction
          mouseInteractionRadius={1.2}
        />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">About</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              DIC, Rospinot, and VR Club are communities dedicated to innovation, robotics, and immersive technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '/' },
                { label: 'Members', href: '/members' },
                { label: 'Projects', href: '/projects' },
                { label: 'Events', href: '/events' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { label: 'Documentation', href: '/resources' },
                { label: 'Help & FAQ', href: '/help' },
                { label: 'Certificates', href: '/certificates' },
                { label: 'Collaborate', href: '/collaborate' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Stay Updated</h3>
            <p className="text-muted-foreground text-sm mb-3">Subscribe for events and updates.</p>
            <NewsletterForm />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Connect</p>
              <a
                href="/contact"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition text-sm mb-3"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-8 h-8 rounded-full bg-primary/10 border border-blue-500/20 hover:border-blue-500/50 hover:bg-primary/20 flex items-center justify-center transition text-primary/70 hover:text-primary"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-500/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2024 DIC, Rospinot & VR Club. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
