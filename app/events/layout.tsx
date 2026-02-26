import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events | DIC - Digital Innovation Club',
  description: 'Upcoming and past events — workshops, hackathons, VR jams, and robotics competitions from DIC, Rospinot, and VR Club.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
