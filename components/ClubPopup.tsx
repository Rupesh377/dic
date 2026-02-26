'use client'

import { X } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'

interface ClubPopupProps {
  club: 'Rospinot' | 'VR Club'
  onClose: () => void
}

const clubInfo = {
  Rospinot: {
    title: 'Rospinot - Robotics Club',
    subtitle: 'Autonomous Systems & Innovation',
    description:
      'Rospinot is our premier robotics club focused on autonomous systems, hardware development, and innovative solutions. We compete in national robotics competitions, participate in robot wars, and build intelligent machines that solve real-world problems.',
    highlights: [
      'Robot Wars & RoboRace Championships',
      'Autonomous Navigation Projects',
      'AI-driven Robot Development',
      'Hardware & Firmware Design',
      'Weekly workshops and mentorship',
    ],
    achievements: [
      '1st Place - National RoboRace 2023',
      '500+ Members Worldwide',
      'Published 5+ Research Papers',
      'Industry Partnerships with Robotics Leaders',
    ],
    color: 'from-blue-600 to-blue-700',
    icon: '🤖',
  },
  'VR Club': {
    title: 'VR Club - Virtual Reality',
    subtitle: 'Immersive Technology & Innovation',
    description:
      'VR Club pioneers immersive technologies, creating groundbreaking virtual reality experiences. From game development to medical simulations, we push the boundaries of what\'s possible in digital worlds.',
    highlights: [
      'VR Game Development',
      'Immersive Educational Platforms',
      'Medical Training Simulations',
      '3D Asset Creation',
      'Real-time Interactive Experiences',
    ],
    achievements: [
      'Featured at SIGGRAPH 2024',
      'International VR Hackathon Winner',
      'Educational VR Platforms Used by 100+ Schools',
      'Industry Recognition for Innovation',
    ],
    color: 'from-purple-600 to-purple-700',
    icon: '🥽',
  },
}

export function ClubPopup({ club, onClose }: ClubPopupProps) {
  const info = clubInfo[club]

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full border border-blue-500/20 max-h-[90vh] overflow-y-auto animate-in scale-95 zoom-in-50 duration-300">
        {/* Header with close button */}
        <div className="sticky top-0 bg-gradient-to-r from-card to-card/80 border-b border-blue-500/20 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="text-4xl">{info.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">{info.title}</h2>
              <p className="text-sm text-muted-foreground">{info.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition hover:scale-110 duration-200"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-8 space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">About {club}</h3>
            <p className="text-muted-foreground leading-relaxed">{info.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">What We Do</h3>
            <div className="space-y-2">
              {info.highlights.map((highlight, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-foreground text-sm">{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {info.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="bg-secondary/50 border border-blue-500/20 rounded-lg p-4 hover:border-blue-500/40 transition"
                >
                  <p className="text-foreground text-sm font-medium">⭐ {achievement}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-4 pt-4 border-t border-blue-500/20">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-secondary text-foreground rounded-lg font-semibold hover:bg-secondary/80 transition"
            >
              Close
            </button>
            <Link href="/contact" onClick={onClose} className="flex-1">
              <button className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105">
                Let's Connect
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
