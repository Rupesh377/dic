import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Domains & Projects | DIC - AR, VR, MR, Robotics, AI/ML',
  description: 'Explore DIC projects across Augmented Reality, Virtual Reality, Mixed Reality, Robotics, and AI/ML.',
}

export default function DomainsLayout({ children }: { children: React.ReactNode }) {
  return children
}
