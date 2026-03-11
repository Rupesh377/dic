'use client'

import React, { useState } from 'react'
import { X, Zap, Users, Award, Code, Lightbulb, BookOpen } from 'lucide-react'

export function BenefitsWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const benefits = [
    {
      icon: Zap,
      title: 'Hands-On Experience',
      description: 'Work on real-world projects with cutting-edge technologies',
    },
    {
      icon: Users,
      title: 'Networking',
      description: 'Connect with like-minded innovators and industry professionals',
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Showcase your work and get recognized for your contributions',
    },
    {
      icon: Code,
      title: 'Skill Development',
      description: 'Learn new technologies and improve your technical skills',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Transform your ideas into reality with support from the community',
    },
    {
      icon: BookOpen,
      title: 'Mentorship',
      description: 'Get guidance from experienced members and industry experts',
    },
  ]

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-40 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center"
      >
        <span className="text-2xl">?</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-card rounded-2xl shadow-2xl max-w-2xl w-full max-h-96 overflow-y-auto border border-blue-500/20">
            <div className="sticky top-0 bg-card border-b border-blue-500/20 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">Why Join DIC?</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-blue-500/10 hover:border-blue-500/30"
                  >
                    <div className="flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-secondary/30 p-6 border-t border-blue-500/20">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
