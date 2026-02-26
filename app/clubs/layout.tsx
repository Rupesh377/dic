import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Clubs | DIC - AR, VR, MR, ROSPINOT',
  description: 'Explore DIC clubs: AR, VR, MR, and ROSPINOT. Meet current members and learn about our innovation pillars.',
}

export default function ClubsLayout({ children }: { children: React.ReactNode }) {
  return children
}
