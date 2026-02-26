'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { MouseInteractiveBackground } from '@/components/ui/mouse-interactive-background'
import { AnimatedPopup } from '@/components/ui/animated-popup'
import { Footer } from '@/components/Footer'
import { MemberCard } from '@/components/MemberCard'
import { members, teachers } from '@/data/members'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ChromaGrid, { type ChromaGridItem } from '@/components/ui/ChromaGrid'
import FloatingLines from '@/components/ui/FloatingLines'

export default function MembersPage() {
  const [selectedCalendarYear, setSelectedCalendarYear] = useState<number | null>(null)
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [showTeachers, setShowTeachers] = useState(false)
  const [selectedMember, setSelectedMember] = useState<any>(null)

  // Calculate student year from calendar year
  const currentYear = new Date().getFullYear()
  const calculateStudentYear = (joiningYear: number, calendarYear: number) => {
    return Math.min(calendarYear - joiningYear + 1, 4) as 1 | 2 | 3 | 4
  }

  // Get available calendar years
  const availableCalendarYears = Array.from(
    new Set(members.map((m) => m.joiningYear))
  )
    .map((year) => ({
      year,
      label: year.toString(),
    }))
    .sort((a, b) => b.year - a.year)

  // Filter members based on selections
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      if (selectedCalendarYear) {
        const studentYearInThatYear = calculateStudentYear(
          member.joiningYear,
          selectedCalendarYear
        )
        // Only show members who were in school during that year
        if (
          member.joiningYear > selectedCalendarYear ||
          selectedCalendarYear - member.joiningYear > 3
        ) {
          return false
        }
      }
      if (selectedClub) {
        const clubMatch = selectedClub === 'VR/AR/MR Club' ? member.clubs.includes('VR Club') : member.clubs.includes(selectedClub)
        if (!clubMatch) return false
      }
      return true
    })
  }, [selectedCalendarYear, selectedClub])

  const featuredItems: ChromaGridItem[] = members.slice(0, 6).map((m, idx) => {
    const palette = [
      { border: '#3B82F6', gradient: 'linear-gradient(145deg,#3B82F6,#000000)' },
      { border: '#10B981', gradient: 'linear-gradient(210deg,#10B981,#000000)' },
      { border: '#8B5CF6', gradient: 'linear-gradient(225deg,#8B5CF6,#000000)' },
      { border: '#F97316', gradient: 'linear-gradient(165deg,#F97316,#000000)' },
      { border: '#EC4899', gradient: 'linear-gradient(195deg,#EC4899,#000000)' },
      { border: '#06B6D4', gradient: 'linear-gradient(135deg,#06B6D4,#000000)' },
    ]
    const color = palette[idx % palette.length]
    return {
      image: m.image || '/placeholder.svg',
      title: m.name,
      subtitle: m.role || (m.year ? `Year ${m.year}` : ''),
      handle: m.clubs?.[0] ?? '',
      borderColor: color.border,
      gradient: color.gradient,
      memberId: m.id,
    }
  })

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
        lineColor="rgba(59, 130, 246, 0.12)"
        dotColor="rgba(96, 165, 250, 0.5)"
        interactionRadius={200}
      />
      <Navbar />

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-10">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
                Main members of DIC
              </h1>
              <p className="text-xl text-muted-foreground">
                Meet the talented members of DIC, Rospinot, and VR/AR/MR Club
              </p>
            </div>

            <div className="hidden md:block">
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Spotlight Members
              </h2>
              <div className="h-[320px] md:h-[360px] lg:h-[400px] relative">
                <ChromaGrid
                  items={featuredItems}
                  radius={260}
                  damping={0.5}
                  fadeOut={0.7}
                  onItemClick={(item) => {
                    const found = members.find((m) => m.id === item.memberId)
                    if (found) {
                      setSelectedMember(found)
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Calendar Year Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Filter by Year</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  <button
                    onClick={() => setSelectedCalendarYear(null)}
                    className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      selectedCalendarYear === null
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                    }`}
                  >
                    All Years
                  </button>
                  {availableCalendarYears.map((item) => (
                    <button
                      key={item.year}
                      onClick={() => setSelectedCalendarYear(item.year)}
                      className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                        selectedCalendarYear === item.year
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                      }`}
                    >
                      {item.year} {selectedCalendarYear === item.year && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Club Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Filter by Club</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedClub(null)}
                    className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      selectedClub === null
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                    }`}
                  >
                    All Clubs
                  </button>
                  {['Rospinot', 'VR/AR/MR Club', 'DIC'].map((club) => (
                    <button
                      key={club}
                      onClick={() => setSelectedClub(club)}
                      className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                        selectedClub === club
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                      }`}
                    >
                      {club} {selectedClub === club && '✓'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Faculty Toggle */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Faculty</h3>
                <button
                  onClick={() => setShowTeachers(!showTeachers)}
                  className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                    showTeachers
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                  }`}
                >
                  {showTeachers ? 'Showing Faculty' : 'Show Faculty Advisors'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Members Grid */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {showTeachers ? (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-8">Faculty Advisors</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="group bg-card/50 backdrop-blur hover:bg-card/80 border border-blue-500/20 hover:border-blue-500/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105 cursor-pointer transform"
                      onClick={() => setSelectedMember(teacher)}
                    >
                      {teacher.image && (
                        <div className="relative w-full h-40 overflow-hidden bg-gradient-to-b from-primary/20 to-transparent">
                          <Image
                            src={teacher.image}
                            alt={teacher.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">{teacher.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-200">{teacher.position}</p>
                        <p className="text-xs text-muted-foreground mt-2">{teacher.department}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {selectedClub || selectedCalendarYear
                      ? `Members${selectedClub ? ` - ${selectedClub}` : ''}${
                          selectedCalendarYear ? ` - ${selectedCalendarYear}` : ''
                        }`
                      : 'All Members'}
                  </h2>
                  <p className="text-muted-foreground">
                    {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''} found
                  </p>
                </div>
                {filteredMembers.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMembers.map((member) => (
                      <div
                        key={member.id}
                        onClick={() => setSelectedMember(member)}
                        className="cursor-pointer"
                      >
                        <MemberCard member={member} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg">
                      No members found with the selected filters
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <AnimatedPopup
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
        title={selectedMember?.name}
        footer={
          <div className="flex gap-3 justify-end">
            <Link href="/contact" onClick={() => setSelectedMember(null)}>
              <Button className="rounded-lg">Let&apos;s Connect</Button>
            </Link>
            <Button variant="outline" onClick={() => setSelectedMember(null)} className="rounded-lg">
              Close
            </Button>
          </div>
        }
      >
        {selectedMember && (
          <>
            {selectedMember.image && (
              <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden border border-blue-500/20">
                <Image
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Position</p>
                <p className="text-lg font-semibold text-foreground">
                  {selectedMember.position || selectedMember.role}
                </p>
              </div>
              {selectedMember.department && (
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="text-lg font-semibold text-foreground">{selectedMember.department}</p>
                </div>
              )}
              {!selectedMember.department && selectedMember.year && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Year</p>
                    <p className="text-lg font-semibold text-foreground">Year {selectedMember.year}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Joining Year</p>
                    <p className="text-lg font-semibold text-foreground">{selectedMember.joiningYear}</p>
                  </div>
                </>
              )}
              {selectedMember.clubs && (
                <div>
                  <p className="text-sm text-muted-foreground">Clubs</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMember.clubs.map((club: string) => (
                      <span
                        key={club}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-semibold"
                      >
                        {club}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {selectedMember.bio && (
                <div>
                  <p className="text-sm text-muted-foreground">Bio</p>
                  <p className="text-foreground mt-2">{selectedMember.bio}</p>
                </div>
              )}
              {selectedMember.skills && (
                <div>
                  <p className="text-sm text-muted-foreground">Skills</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedMember.skills.map((skill: string) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-secondary/50 text-foreground rounded-lg text-sm border border-blue-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </AnimatedPopup>

      <Footer />
    </>
  )
}
