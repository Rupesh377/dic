import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events | DIC - Development And Innovation Centre',
  description: 'Upcoming and past events — workshops, hackathons, VR jams, and robotics competitions from DIC (Development And Innovation Centre), Rospinot, and VRARMR Club.',
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
