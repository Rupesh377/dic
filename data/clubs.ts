import { members } from './members'
import type { InfiniteMenuItem } from '@/components/ui/infinite-menu'

export type ClubKey = 'AR' | 'VR' | 'MR' | 'ROSPINOT'

export interface ClubMemberItem extends InfiniteMenuItem {
  bio?: string
  skills?: string[]
  clubs?: string[]
  year?: number
  joiningYear?: number
}

export const clubConfig: Record<ClubKey, { title: string; subtitle: string; description: string }> = {
  AR: {
    title: 'AR Club',
    subtitle: 'Augmented Reality',
    description: 'Building augmented reality experiences that blend digital content with the physical world.',
  },
  VR: {
    title: 'VR Club',
    subtitle: 'Virtual Reality',
    description: 'Creating immersive virtual reality experiences and interactive digital worlds.',
  },
  MR: {
    title: 'MR Club',
    subtitle: 'Mixed Reality',
    description: 'Exploring the convergence of physical and digital environments in mixed reality.',
  },
  ROSPINOT: {
    title: 'ROSPINOT',
    subtitle: 'Robotics',
    description: 'Developing autonomous systems, robotics, and AI-driven innovations.',
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
      return toMenuItems(members.filter((m) => m.clubs.includes('VR Club')))
    default:
      return []
  }
}
