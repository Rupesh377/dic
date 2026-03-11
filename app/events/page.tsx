'use client'

import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Calendar, MapPin, Users, X } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect, useMemo } from 'react'
import DomeGallery from '@/components/ui/DomeGallery'
import ElectricBorder from '@/components/ui/ElectricBorder'
import GradientBlinds from '@/components/ui/GradientBlinds'
import Carousel from '@/components/ui/Carousel'

const upcomingEvents = [
  {
    title: 'ROS2 Humble Workshop — 7 Day Hands-on Training',
    club: 'ROSPINOT',
    date: '15 March 2026 (7 Days)',
    location: 'JUET Campus',
    attendees: 'Open Workshop',
    description: 'A 7-day hands-on workshop on ROS2 Humble conducted by faculty mentor Dr. Amit Shrivastava. Covers ROS2 architecture, nodes, topics, communication, package creation, workspace setup, robot simulation, and practical development workflow.',
  },
]

const pastEvents = [
  {
    title: 'AR Treasure Hunt',
    club: 'VRARMR Club',
    date: '2024',
    participants: '100+ participants',
    images: [
      '/events/hackathon-2023.jpg',
      '/events/workshop-2024.jpg',
    ],
  },
  {
    title: 'Metacon & Neotrix Event Series',
    club: 'VRARMR Club & ROSPINOT',
    date: '2024',
    participants: '80+ participants',
    images: [
      '/events/vr-showcase-2024.jpg',
      '/events/hackathon-2023.jpg',
    ],
  },
  {
    title: 'Technical Workshop Series',
    club: 'DIC / ROSPINOT',
    date: '2024',
    participants: '75+ attendees',
    images: [
      '/events/workshop-2024.jpg',
      '/events/robotics-summit-2024.jpg',
    ],
  },
  {
    title: 'Project Exhibition — Tachyon Tech Fest',
    club: 'DIC',
    date: '2024',
    participants: '200+ visitors',
    images: [
      '/events/robotics-summit-2024.jpg',
      '/events/workshop-2024.jpg',
      '/events/vr-showcase-2024.jpg',
    ],
  },
]

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof pastEvents[0] | null>(null)
  const [isClosing, setIsClosing] = useState(false)

  const images = selectedEvent?.images ?? []
  const hasMultiple = images.length > 1

  const domeImages = useMemo(
    () => pastEvents.flatMap((e) => e.images ?? []),
    []
  )

  useEffect(() => {
    if (selectedEvent) {
      // reset carousel position implicitly via key
    }
  }, [selectedEvent])

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedEvent(null)
      setIsClosing(false)
    }, 200)
  }

  useEffect(() => {
    if (!selectedEvent) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleCloseModal()
      if (!hasMultiple) return
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [selectedEvent, hasMultiple, images.length])

  return (
    <>
      <Navbar />

      <main className="relative z-10">
        {/* Liquid Ether full-page background */}
        <div className="fixed inset-0 -z-10 opacity-80 pointer-events-none" style={{ width: '100%', height: '100%' }}>
          <GradientBlinds
            gradientColors={['#FF9FFC', '#5227FF']}
            angle={0}
            noise={0.3}
            blindCount={12}
            blindMinWidth={50}
            spotlightRadius={0.5}
            spotlightSoftness={1}
            spotlightOpacity={1}
            mouseDampening={0.15}
            distortAmount={0}
            shineDirection="left"
            mixBlendMode="lighten"
          />
        </div>
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Events
            </h1>
            <p className="text-lg text-muted-foreground">
              Join us for exciting events, workshops, and competitions
            </p>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, idx) => (
                <ElectricBorder key={idx} color="#3b82f6" borderRadius={18}>
                  <div className="group bg-card/50 backdrop-blur border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/50 hover:bg-card/80 transition-all">
                    <h3 className="text-xl font-bold text-foreground mb-2">{event.title}</h3>
                    <p className="text-sm text-primary font-semibold mb-4">{event.club}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4 text-primary" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4 text-primary" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        {event.attendees}
                      </div>
                    </div>

                    <p className="text-foreground text-sm">{event.description}</p>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-12">Past Events</h2>
            <div className="space-y-4">
              {pastEvents.map((event, idx) => (
                <ElectricBorder key={idx} color="#3b82f6" borderRadius={18}>
                  <div
                    onClick={() => event.images?.length && setSelectedEvent(event)}
                    className={`bg-card/50 backdrop-blur border border-blue-500/20 rounded-lg p-6 hover:border-blue-500/40 transition-all ${event.images?.length ? 'hover:bg-card/80 cursor-pointer hover:scale-105' : ''
                      }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-foreground">{event.title}</h3>
                        <p className="text-sm text-primary font-semibold mt-1">{event.club}</p>
                        {event.images?.length ? (
                          <p className="text-xs text-muted-foreground mt-2">
                            Click to view photos ({event.images.length})
                          </p>
                        ) : null}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                        <p className="text-sm text-muted-foreground">{event.participants}</p>
                      </div>
                    </div>
                  </div>
                </ElectricBorder>
              ))}
            </div>
          </div>
        </section>

        {/* Memories Dome Gallery */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-secondary/10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-4">Event Memories</h2>
            <p className="text-muted-foreground mb-8 max-w-xl">
              Explore highlights from our hackathons, workshops, robotics summits, and VR exhibitions in an interactive dome gallery.
            </p>
            <div className="w-full h-[420px] sm:h-[520px] relative">
              <DomeGallery
                images={domeImages}
                fit={0.8}
                minRadius={600}
                maxVerticalRotationDeg={5}
                segments={34}
                dragDampening={2}
                openedImageWidth="520px"
                openedImageHeight="420px"
                grayscale
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {selectedEvent && images.length > 0 && (
        <div
          role="dialog"
          aria-modal="true"
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-out fade-out duration-200' : 'animate-in fade-in duration-300'}`}
          style={{ backgroundColor: isClosing ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.5)', backdropFilter: isClosing ? 'blur(0px)' : 'blur(4px)' }}
          onClick={handleCloseModal}
        >
          <div
            className={`bg-card rounded-2xl shadow-2xl max-w-2xl w-full border border-blue-500/20 max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-out scale-95 zoom-out-50 duration-200' : 'animate-in scale-95 zoom-in-50 duration-300'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-card to-card/80 border-b border-blue-500/20 p-6 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-foreground">{selectedEvent.title}</h2>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition hover:scale-110 duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {/* 3D Carousel for event photos */}
              <div className="w-full mb-6 flex justify-center">
                <Carousel
                  items={images.map((src, index) => ({
                    id: index,
                    title: `${selectedEvent.title} - Photo ${index + 1}`,
                    image: src,
                  }))}
                  baseWidth={520}
                  autoplay={false}
                  loop={images.length > 1}
                />
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Club</p>
                  <p className="text-lg font-semibold text-primary">{selectedEvent.club}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date</p>
                  <p className="text-lg text-foreground">{selectedEvent.date}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Participants</p>
                  <p className="text-lg text-foreground">{selectedEvent.participants}</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-blue-500/20">
                <button
                  onClick={handleCloseModal}
                  className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-blue-600 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
