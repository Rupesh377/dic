export interface Project {
  id: string
  name: string
  description: string
  domain: string
  club: 'Rospinot' | 'VR Club' | 'DIC'
  contributors: string[]
  status: 'active' | 'completed' | 'planning'
  year: number
  skills?: string[]
  image?: string
  fullDetails?: string
}

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Face-Following Robot',
    description: 'A Raspberry Pi 4–based robotic system designed to identify and follow a specific person using computer vision and AI techniques.',
    domain: 'Robotics / AI / Computer Vision',
    club: 'Rospinot',
    contributors: ['ROSPINOT Members'],
    status: 'completed',
    year: 2024,
    skills: ['Raspberry Pi 4', 'Computer Vision', 'Facial Recognition', 'Robotics Control Systems', 'Distributed Processing'],
    fullDetails: 'The Face-Following Robot captures images using a camera attached to the Raspberry Pi and sends them to a separate computing system for processing. The processing system runs AI-based facial recognition and tracking algorithms, calculates the target\'s coordinates, and sends movement instructions back to the robot. This distributed computing approach allows the robot to perform complex vision tasks efficiently while maintaining real-time movement control.',
  },
  {
    id: 'p2',
    name: 'Offline Hindi Voice Assistant',
    description: 'A voice-controlled system designed to function without requiring internet connectivity, processing voice commands locally and responding in Hindi.',
    domain: 'AI / Machine Learning / Voice Systems',
    club: 'Rospinot',
    contributors: ['ROSPINOT Members'],
    status: 'completed',
    year: 2024,
    skills: ['Offline Speech Recognition', 'NLP', 'Local AI Processing', 'Python'],
    fullDetails: 'The Offline Hindi Voice Assistant processes voice commands locally and responds in Hindi. The project focuses on enabling offline speech recognition and interaction, making the system useful in environments where internet access is limited. The assistant can perform tasks such as responding to queries, executing predefined commands, and interacting with users through spoken responses.',
  },
  {
    id: 'p3',
    name: 'DareTiles',
    description: 'An interactive AR-based activity where participants scan tiles or markers to reveal digital dares through an augmented reality application.',
    domain: 'Augmented Reality',
    club: 'VR Club',
    contributors: ['VRARMR Club Members'],
    status: 'completed',
    year: 2024,
    skills: ['AR Markers', 'Mobile AR', 'Real-time Image Tracking', 'Interactive AR Content'],
    fullDetails: 'DareTiles is an interactive AR-based activity where participants scan tiles or markers to reveal digital dares through an augmented reality application. When scanned through the mobile app, the tiles display augmented content that assigns fun challenges or tasks to the participants. The activity combines AR interaction with real-world gameplay, encouraging participants to explore the technology while engaging in a fun and social experience.',
  },
  {
    id: 'p4',
    name: 'VR Haunted House',
    description: 'An immersive virtual reality experience where participants explore a series of haunted environments to uncover hidden clues.',
    domain: 'Virtual Reality',
    club: 'VR Club',
    contributors: ['VRARMR Club Members'],
    status: 'completed',
    year: 2024,
    skills: ['VR Development', 'Unity', '3D Modeling', 'Real-time Rendering'],
    fullDetails: 'The VR Haunted House is an immersive virtual reality experience where participants explore a series of haunted environments to uncover hidden clues. The experience consists of multiple virtual maps designed with eerie settings, puzzles, and interactive elements. Participants navigate through these environments using VR, searching for clues and solving challenges to progress through different areas. Each map introduces new obstacles and hints that guide users toward the final objective.',
  },
  {
    id: 'p5',
    name: 'AR Treasure Hunt',
    description: 'An annual campus-wide event where participants explore different locations while solving clues using an augmented reality mobile application.',
    domain: 'Augmented Reality',
    club: 'VR Club',
    contributors: ['VRARMR Club Members'],
    status: 'completed',
    year: 2024,
    skills: ['AR Mobile Applications', 'Image Marker Tracking', '3D AR Content', 'Interactive Systems'],
    fullDetails: 'The AR Treasure Hunt is an annual campus-wide event where participants explore different locations while solving clues using an augmented reality mobile application. Teams scan images or markers placed across the campus to reveal digital clues that guide them to the next location. The activity transforms the campus into an interactive puzzle environment, combining exploration, teamwork, and augmented reality technology.',
  },
]
