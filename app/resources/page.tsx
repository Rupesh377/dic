'use client'

import { useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { HyperspeedBackground } from '@/components/ui/hyperspeed-background'
import { GridScanBackground } from '@/components/ui/grid-scan-background'
import { Footer } from '@/components/Footer'
import { ModelViewer } from '@/components/ui/model-viewer'
import { MetallicPaint } from '@/components/ui/metallic-paint'
import { Glasses, Cpu, Bot } from 'lucide-react'
import { AnimatedPopup } from '@/components/ui/animated-popup'
import { Button } from '@/components/ui/button'

const clubEquipment = [
  {
    category: 'ROSPINOT & Robotics Equipment',
    icon: Bot,
    items: [
      { name: 'LEGO Mindstorms EV3 Robotics Kits', description: 'Complete robotics kits for teaching and prototyping robot designs', image: '/placeholder.svg', useCase: 'Hands-on robotics sessions, learning sensors and actuators, control logic', specs: ['Programmable brick', 'Motors & sensors included', 'Drag-and-drop visual programming', 'Build-and-test workflow'], category: 'ROSPINOT & Robotics Equipment' },
      { name: 'Raspberry Pi Development Systems', description: 'Single-board computers used for embedded computing and robotics control', image: '/placeholder.svg', useCase: 'Edge computing, robot control, IoT projects', specs: ['GPIO for sensor integration', 'Linux-based OS', 'Camera & serial support', 'Python and C++ development'], category: 'ROSPINOT & Robotics Equipment' },
      { name: 'Robotics Sensors & Actuators', description: 'Components for building and testing robotic systems', image: '/placeholder.svg', useCase: 'Robot assembly, feedback systems, motor control', specs: ['IR, ultrasonic, touch sensors', 'DC & servo motors', 'Motor drivers', 'Breadboards & wiring kits'], category: 'ROSPINOT & Robotics Equipment' },
      { name: 'Development & Simulation Software', description: 'Industry-standard tools for robot simulation and design', image: '/placeholder.svg', useCase: 'Robot modeling, programming, and virtual testing', specs: ['ROS / ROS2 framework', 'Gazebo simulator', 'URDF robot modeling', 'Fusion 360 for CAD design'], category: 'ROSPINOT & Robotics Equipment' },
    ],
  },
  {
    category: 'VRARMR Club Equipment',
    icon: Glasses,
    items: [
      { name: 'VR Headsets', description: 'Immersive virtual reality hardware for development and demos', image: '/placeholder.svg', useCase: 'VR project development, demos, workshops', specs: ['Standalone wireless headsets', 'Hand tracking', 'High-resolution displays', 'Multi-user support'], category: 'VRARMR Club Equipment' },
      { name: 'AR Development Kits', description: 'Tools for building augmented reality applications', image: '/placeholder.svg', useCase: 'AR apps, marker-based experiences, spatial computing', specs: ['Mobile & headset AR', 'Spatial mapping', 'Anchor-based experiences', 'Snap Lens Studio'], category: 'VRARMR Club Equipment' },
      { name: '3D Design & Development Tools', description: 'Software suite for 3D modeling, animation, and game engine development', image: '/placeholder.svg', useCase: 'Environment design, game dev, AR/VR applications', specs: ['Blender for 3D modeling', 'Unity game engine', 'Asset pipeline tools', 'Material & shader editors'], category: 'VRARMR Club Equipment' },
    ],
  },
  {
    category: 'Development & Compute',
    icon: Cpu,
    items: [
      { name: 'Workstation PCs', description: 'High-performance systems for rendering, simulation, and development', image: '/placeholder.svg', useCase: '3D rendering, AI training, robot simulation', specs: ['High-end GPU', 'Multi-core CPU', 'Large RAM', 'Dual-monitor support'], category: 'Development & Compute' },
      { name: 'Development Boards', description: 'Jetson, STM32, ESP32 for embedded AI and edge computing', image: '/placeholder.svg', useCase: 'Edge AI, IoT, embedded robotics', specs: ['Jetson for vision AI', 'STM32/ESP32 for microcontroller', 'TensorFlow Lite ready', 'Sensor integration'], category: 'Development & Compute' },
    ],
  },
]

type EquipmentItem = {
  name: string
  description: string
  image: string
  category: string
  useCase?: string
  specs?: string[]
}

export default function ResourcesPage() {
  const [selectedItem, setSelectedItem] = useState<EquipmentItem | null>(null)
  return (
    <>
      <HyperspeedBackground lineColor="rgba(59, 130, 246, 0.06)" opacity={0.85} speed={0.6} />
      <GridScanBackground gridSize={50} lineColor="rgba(59, 130, 246, 0.05)" scanColor="rgba(96, 165, 250, 0.1)" scanSpeed={1} />
      <Navbar />

      <main className="relative z-10 min-h-screen">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Club Resources
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore the equipment and tools available at DIC — VR headsets, ROS hardware, and development systems for VR/AR/MR and Rospinot.
            </p>
          </div>
        </section>

        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-16">
            {clubEquipment.map((section) => {
              const Icon = section.icon
              return (
                <div key={section.category}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 rounded-xl bg-primary/20 border border-primary/30">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">{section.category}</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {section.items.map((item) => (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => setSelectedItem(item)}
                        className="group text-left bg-card/50 backdrop-blur border border-blue-500/20 rounded-xl overflow-hidden hover:border-blue-500/50 hover:scale-[1.02] transition-all duration-300"
                      >
                        <ModelViewer
                          imageSrc={item.image}
                          alt={item.name}
                          aspectRatio="square"
                          className="w-full"
                        />
                        <div className="p-4">
                          <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                          <p className="text-primary text-xs font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click for details →</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Interactive Lab</h2>
            <div className="relative min-h-[200px] rounded-2xl border border-blue-500/30 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 flex items-center justify-center">
              <MetallicPaint className="rounded-xl px-8 py-4 bg-slate-900/80">
                <p className="text-primary-foreground font-semibold">Click to explore our lab spaces</p>
                <p className="text-white/85 text-sm mt-2">VR/AR/MR & Robotics facilities</p>
              </MetallicPaint>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <AnimatedPopup
        isOpen={!!selectedItem}
        onClose={() => setSelectedItem(null)}
        title={selectedItem?.name}
        footer={
          <Button onClick={() => setSelectedItem(null)} variant="outline" className="rounded-lg">
            Close
          </Button>
        }
      >
        {selectedItem && (
          <div className="space-y-4">
            <div className="rounded-lg overflow-hidden border border-blue-500/20">
              <ModelViewer
                imageSrc={selectedItem.image}
                alt={selectedItem.name}
                aspectRatio="wide"
                className="w-full"
              />
            </div>
            <p className="text-muted-foreground">{selectedItem.description}</p>
            {selectedItem.category && (
              <p className="text-sm">
                <span className="font-semibold text-foreground">Category:</span>{' '}
                <span className="text-muted-foreground">{selectedItem.category}</span>
              </p>
            )}
            {selectedItem.useCase && (
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Where we use it</p>
                <p className="text-muted-foreground text-sm">{selectedItem.useCase}</p>
              </div>
            )}
            {selectedItem.specs && selectedItem.specs.length > 0 && (
              <div>
                <p className="font-semibold text-foreground text-sm mb-2">Key features</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  {selectedItem.specs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </AnimatedPopup>
    </>
  )
}
