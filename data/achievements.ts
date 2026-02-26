export interface Achievement {
  id: string
  title: string
  description: string
  year: number
  category: string
  club: 'Rospinot' | 'VR Club' | 'DIC'
  details?: string
}

export const achievements: Achievement[] = [
  {
    id: 'a1',
    title: 'RoboRace Championship',
    description: 'Won 1st place in National RoboRace Championship 2023',
    year: 2023,
    category: 'Competition',
    club: 'Rospinot',
    details: 'Rospinot team showcased exceptional autonomous navigation and strategy in the championship',
  },
  {
    id: 'a2',
    title: 'VR Hackathon Victory',
    description: 'First place in International VR Innovation Hackathon 2023',
    year: 2023,
    category: 'Competition',
    club: 'VR Club',
    details: 'Created an innovative VR application that impressed judges with creativity and technical excellence',
  },
  {
    id: 'a3',
    title: 'DIC Launch',
    description: 'Successfully established DIC as an umbrella organization for tech clubs',
    year: 2024,
    category: 'Milestone',
    club: 'DIC',
    details: 'DIC was formed to foster collaboration and innovation across different technology domains',
  },
  {
    id: 'a4',
    title: 'Tech Summit Speaker',
    description: 'Club members invited as speakers at International Tech Summit',
    year: 2024,
    category: 'Speaking',
    club: 'Rospinot',
    details: 'Presented groundbreaking work in robotics and AI to industry professionals',
  },
  {
    id: 'a5',
    title: 'Industry Partnerships',
    description: 'Established partnerships with leading tech companies for internships',
    year: 2024,
    category: 'Partnership',
    club: 'DIC',
    details: 'Secured internship opportunities and mentorship from top tech companies',
  },
  {
    id: 'a6',
    title: 'VR at SIGGRAPH',
    description: 'VR Club projects featured at SIGGRAPH 2024 conference',
    year: 2024,
    category: 'Exhibition',
    club: 'VR Club',
    details: 'Showcased cutting-edge VR research and applications to the graphics community',
  },
  {
    id: 'a7',
    title: 'Innovation Excellence Award',
    description: 'Received Innovation Excellence Award from University',
    year: 2024,
    category: 'Award',
    club: 'DIC',
    details: 'Recognized for exceptional contributions to technological innovation and student engagement',
  },
  {
    id: 'a8',
    title: 'Research Publication',
    description: 'Published 5+ peer-reviewed papers in top-tier conferences',
    year: 2024,
    category: 'Research',
    club: 'Rospinot',
    details: 'Advanced research in autonomous systems and robotic control published internationally',
  },
]
