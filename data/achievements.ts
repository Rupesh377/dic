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
    title: '3rd Place — CodeConquerors College Hackathon',
    description: 'A team consisting primarily of ROSPINOT members secured 3rd place in a college-level hackathon organized by the CodeConquerors club.',
    year: 2024,
    category: 'Competition / Hackathon',
    club: 'Rospinot',
    details: 'During the hackathon, the team developed a full-stack AI-enabled quiz platform designed for both teachers and students. The platform allowed students to upload notes for learning and assessments, teachers to upload study material and create quizzes based on the content, and featured AI-assisted quiz generation and explanations from uploaded notes. The project aimed to simplify content-driven learning and automated assessment. Team included ROSPINOT members with cross-club collaboration.',
  },
]
