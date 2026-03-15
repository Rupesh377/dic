'use client'

import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { NetworkBackground } from '@/components/NetworkBackground'
import { Footer } from '@/components/Footer'
import { Github, Linkedin, Mail } from 'lucide-react'
import { CometCard } from '@/components/ui/comet-card'

const teamMembers = [
  {
    id: 1,
    name: 'Omesh Sherawat',
    role: 'Project Lead & Full Stack Developer',
    description: 'Led the overall architecture and vision of the website, ensuring seamless integration across all platforms.',
    image: '/team/team-lead.jpg',
    skills: ['Leadership', 'Full Stack', 'Next.js', 'Architecture'],
    email: 'rohit@example.com',
  },
  {
    id: 8,
    name: 'Sagar Seth',
    role: 'Creative Designer & Animation Specialist',
    description: 'Designed engaging animations and visual effects that enhance the overall user experience throughout the site.',
    image: '/team/Sagar.jpeg',
    skills: ['UI Design', 'Animation', 'Branding', 'Visual Design'],
    email: '040@gmail.com',
  },
  {
    id: 2,
    name: 'Varun Sehgal',
    role: 'Frontend Developer & UI Designer',
    description: 'Crafted beautiful and interactive user interfaces with focus on user experience and modern design principles.',
    image: '/team/Varun.jpeg',
    skills: ['React', 'UI/UX Design', 'Tailwind CSS', 'Frontend'],
    email: 'varun.sehgal02@gmail.com',
  },
  {
    id: 3,
    name: 'Narayan Thakur',
    role: 'Backend Developer & Database Architect',
    description: 'Built robust backend systems and optimized database queries for optimal performance and scalability.',
    image: '/team/Narayan.jpeg',
    skills: ['Node.js', 'Databases', 'API Design', 'Backend'],
    email: 'narayansinghrathaur01@gmail.com',
  },
  {
    id: 4,
    name: 'Rupesh Kumar Mahto',
    role: 'Backend Developer',
    description: 'Built scalable  and optimized backend systems',
    image: '/team/Rupesh.jpeg',
    skills: ['UI Design', 'Animation', 'Branding', 'Visual Design'],
    email: 'kr.rupesh1604@gmail.com',
  },
  {
    id: 5,
    name: 'Kalptaru',
    role: 'Creative Designer & Animation Specialist',
    description: 'Designed engaging animations and visual effects that enhance the overall user experience throughout the site.',
    image: '/team/Kalpatru.jpeg',
    skills: ['UI Design', 'Animation', 'Branding', 'Visual Design'],
    email: 'kalptarurao1704@gmail.com',
  },
  {
    id: 6,
    name: 'Prajjwal',
    role: 'Creative Designer & Animation Specialist',
    description: 'Designed engaging animations and visual effects that enhance the overall user experience throughout the site.',
    image: '/team/Prajjwal.jpeg',
    skills: ['UI Design', 'Animation', 'Branding', 'Visual Design'],
    email: 'kprajjwal493@gmail.com',
  },
  {
    id: 7,
    name: 'Tanisha',
    role: 'Creative Designer & Animation Specialist',
    description: 'Designed engaging animations and visual effects that enhance the overall user experience throughout the site.',
    image: '/team/Tanisha.jpeg',
    skills: ['UI Design', 'Animation', 'Branding', 'Visual Design'],
    email: 'tanishagarg040@gmail.com',
  },
]

export default function TeamPage() {
  return (
    <>
      <NetworkBackground />
      <Navbar />

      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-foreground mb-4">Meet Our Team</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A dedicated group of passionate developers, designers, and innovators who brought this website to life. 
              Together, we&apos;ve created a platform that connects innovation, robotics, and virtual reality communities.
            </p>
          </div>

          {/* Team Members Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {teamMembers.map((member) => (
              <CometCard key={member.id}>
                <div className="group bg-card/60 backdrop-blur hover:bg-card/80 border border-blue-500/20 hover:border-blue-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/15 transform">
                  <div className="relative w-full h-48 overflow-hidden bg-gradient-to-b from-primary/20 to-transparent">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm text-primary font-semibold mb-3">{member.role}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.skills.slice(0, 2).map((skill) => (
                        <span
                          key={skill}
                          className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full group-hover:bg-primary/40 transition-all"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
                    >
                      <Mail size={16} />
                      Contact
                    </a>
                  </div>
                </div>
              </CometCard>
            ))}
          </div>

          {/* About Section */}
          <section className="bg-card/30 backdrop-blur border border-blue-500/20 rounded-2xl p-12 mb-20">
            <h2 className="text-3xl font-bold text-foreground mb-6">About This Project</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                This website was built to showcase the innovative projects and talented members of three tech clubs: Rospinot, VR Club, and DIC. 
                Our team worked collaboratively to create a modern, interactive platform that celebrates the achievements and community spirit.
              </p>
              <p>
                The platform features:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Interactive network background with mouse-tracking animations</li>
                <li>Comprehensive member directory with detailed profiles</li>
                <li>Project showcase with rich media and descriptions</li>
                <li>Achievement gallery highlighting accomplishments</li>
                <li>Event management and past events documentation</li>
                <li>Fully responsive design optimized for all devices</li>
              </ul>
            </div>
          </section>

          {/* Technologies */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-card/30 backdrop-blur border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Technologies Used</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>🎨 <strong>Frontend:</strong> Next.js, React, Tailwind CSS</p>
                <p>🎭 <strong>Design:</strong> UI/UX optimized for all devices</p>
                <p>✨ <strong>Effects:</strong> Canvas animations, smooth transitions</p>
                <p>📱 <strong>Optimization:</strong> Performance tuned for speed</p>
              </div>
            </div>

            <div className="bg-card/30 backdrop-blur border border-blue-500/20 rounded-xl p-8">
              <h3 className="text-xl font-bold text-foreground mb-4">Development Timeline</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>📅 <strong>Design Phase:</strong> 2 weeks</p>
                <p>💻 <strong>Development:</strong> 4 weeks</p>
                <p>🧪 <strong>Testing & Refinement:</strong> 1 week</p>
                <p>🚀 <strong>Deployment:</strong> Ongoing updates</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
