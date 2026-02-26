'use client'

import { useState, useMemo } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import { ProjectCard } from '@/components/ProjectCard'
import { Breadcrumbs } from '@/components/Breadcrumbs'
import { projects } from '@/data/projects'
import { X, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Orb from '@/components/ui/Orb'
import BlurText from '@/components/ui/BlurText'

export default function ProjectsPage() {
  const [selectedClub, setSelectedClub] = useState<string | null>(null)
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState<any>(null)
  const [isClosing, setIsClosing] = useState(false)

  const handleCloseModal = () => {
    setIsClosing(true)
    setTimeout(() => {
      setSelectedProject(null)
      setIsClosing(false)
    }, 200)
  }

  const statuses = ['active', 'completed', 'planning'] as const

  // Filter projects - by club, status, and search
  const filteredProjects = useMemo(() => {
    let result = projects

    if (selectedClub) {
      result = result.filter((p) => p.club === selectedClub)
    }

    if (selectedStatus) {
      result = result.filter((p) => p.status === selectedStatus)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.domain.toLowerCase().includes(q) ||
          (p.skills && p.skills.some((s) => s.toLowerCase().includes(q)))
      )
    }

    return result
  }, [selectedClub, selectedStatus, searchQuery])

  // Group projects by club and domain
  const projectsByClubAndDomain = useMemo(() => {
    const grouped: {
      [club: string]: { [domain: string]: typeof projects }
    } = {}

    filteredProjects.forEach((project) => {
      if (!grouped[project.club]) {
        grouped[project.club] = {}
      }
      if (!grouped[project.club][project.domain]) {
        grouped[project.club][project.domain] = []
      }
      grouped[project.club][project.domain].push(project)
    })

    return grouped
  }, [filteredProjects])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'completed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'planning':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <>
      <NetworkBackground />
      <Navbar />

      <main id="main-content" className="relative z-10">
        {/* Hero Section with Orb */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Breadcrumbs items={[{ label: 'Projects' }]} className="mb-4" />
            <div className="relative w-full h-[340px] sm:h-[420px] mb-10 overflow-hidden rounded-3xl border border-blue-500/40 bg-black/60">
              <Orb
                hoverIntensity={2}
                rotateOnHover
                hue={225}
                forceHoverState={false}
                backgroundColor="#020617"
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">
                  <BlurText
                    text="Our Projects"
                    delay={90}
                    animateBy="words"
                    direction="top"
                    className="inline-flex justify-center"
                  />
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Explore innovative work created by Rospinot and VR Club members across robotics, XR, and more.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filters Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8 bg-secondary/20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <label htmlFor="project-search" className="sr-only">Search projects</label>
              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="project-search"
                  type="search"
                  placeholder="Search by name, description, domain, or skills..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-background/50 border-blue-500/20"
                  aria-label="Search projects"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {['Rospinot', 'VR Club', 'DIC'].map((club) => (
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

              {/* Status Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Filter by Status</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedStatus(null)}
                    className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                      selectedStatus === null
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                    }`}
                  >
                    All Status
                  </button>
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => setSelectedStatus(status)}
                      className={`w-full px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                        selectedStatus === status
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card/50 text-muted-foreground hover:bg-secondary border border-blue-500/10'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}{' '}
                      {selectedStatus === status && '✓'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {filteredProjects.length > 0 ? (
              <>
                {Object.entries(projectsByClubAndDomain).map(([club, domains]) => (
                  <div key={club} className="mb-16">
                    <h2 className="text-3xl font-bold text-foreground mb-8">{club}</h2>
                    {Object.entries(domains).map(([domain, clubProjects]) => (
                      <div key={`${club}-${domain}`} className="mb-12">
                        <h3 className="text-xl font-semibold text-primary mb-6">{domain}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {(clubProjects as typeof projects).map((project) => (
                            <div
                              key={project.id}
                              onClick={() => setSelectedProject(project)}
                              className="cursor-pointer"
                            >
                              <ProjectCard project={project} />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No projects found with the selected filters
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${isClosing ? 'animate-out fade-out duration-200' : 'animate-in fade-in duration-300'}`} style={{ backgroundColor: isClosing ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0.5)', backdropFilter: isClosing ? 'blur(0px)' : 'blur(4px)' }}>
          <div className={`bg-card rounded-2xl shadow-2xl max-w-2xl w-full border border-blue-500/20 max-h-[90vh] overflow-y-auto ${isClosing ? 'animate-out scale-95 zoom-out-50 duration-200' : 'animate-in scale-95 zoom-in-50 duration-300'}`}>
            <div className="sticky top-0 bg-gradient-to-r from-card to-card/80 border-b border-blue-500/20 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">{selectedProject.name}</h2>
              <button
                onClick={handleCloseModal}
                className="text-muted-foreground hover:text-foreground transition hover:scale-110 duration-200"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-6">
              {selectedProject.image && (
                <div className="mb-6">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.name}
                    width={500}
                    height={300}
                    className="w-full h-64 object-cover rounded-lg border border-blue-500/20"
                  />
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Description</p>
                  <p className="text-foreground mt-2">{selectedProject.description}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Club</p>
                  <p className="text-lg font-semibold text-primary">{selectedProject.club}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <p className="text-lg font-semibold text-foreground">{selectedProject.domain}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-semibold border mt-2 ${getStatusColor(
                      selectedProject.status
                    )}`}
                  >
                    {selectedProject.status.charAt(0).toUpperCase() +
                      selectedProject.status.slice(1)}
                  </span>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Year</p>
                  <p className="text-lg font-semibold text-foreground">{selectedProject.year}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Contributors</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedProject.contributors.map((contributor: string) => (
                      <span
                        key={contributor}
                        className="px-3 py-1 bg-secondary/50 text-foreground rounded-lg text-sm border border-blue-500/20"
                      >
                        {contributor}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedProject.skills && (
                  <div>
                    <p className="text-sm text-muted-foreground">Technologies & Skills</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedProject.skills.map((skill: string) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProject.fullDetails && (
                  <div>
                    <p className="text-sm text-muted-foreground">Details</p>
                    <p className="text-foreground mt-2">{selectedProject.fullDetails}</p>
                  </div>
                )}
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

      <Footer />
    </>
  )
}
