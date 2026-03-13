import { members } from './members'
import type { InfiniteMenuItem } from '@/components/ui/infinite-menu'

export type ClubKey = 'AR' | 'VR' | 'MR' | 'ROSPINOT'

export interface ClubMemberItem extends InfiniteMenuItem {
  bio?: string
  skills?: string[]
  clubs?: string[]
  year?: number
  joiningYear?: number
  linkedin?: string
}

export const clubConfig: Record<ClubKey, { title: string; subtitle: string; description: string }> = {
  AR: {
    title: 'AR Club',
    subtitle: 'Augmented Reality',
    description: 'Developing augmented reality applications that integrate digital content with the real world.',
  },
  VR: {
    title: 'VR Club',
    subtitle: 'Virtual Reality',
    description: 'Building fully immersive virtual environments and simulations for interactive experiences.',
  },
  MR: {
    title: 'MR Club',
    subtitle: 'Mixed Reality',
    description: 'Exploring systems where physical and digital elements interact together in real-time.',
  },
  ROSPINOT: {
    title: 'ROSPINOT',
    subtitle: 'Robotics Innovation Club',
    description: 'Designing intelligent robotic systems by combining mechanical design, software development, simulation, and hardware implementation.',
  },
}

function toMenuItems(clubMembers: typeof members): ClubMemberItem[] {
  return clubMembers.map((m) => ({
    id: m.id,
    name: m.name,
    role: m.position || m.role,
    image: m.image,
    club: m.clubs[0],
    bio: m.bio,
    skills: m.skills,
    clubs: m.clubs,
    year: m.year,
    joiningYear: m.joiningYear,
    linkedin: m.linkedin,
  }))
}

/** Get members for each club - AR/VR/MR use VR Club, ROSPINOT uses Rospinot */
export function getClubMembers(club: ClubKey): ClubMemberItem[] {
  switch (club) {
    case 'ROSPINOT':
      return toMenuItems(members.filter((m) => m.clubs.includes('Rospinot')))
    case 'AR':
    case 'VR':
    case 'MR':
      return toMenuItems(members.filter((m) => m.clubs.includes('VR AR MR Club')))
    default:
      return []
  }
}
