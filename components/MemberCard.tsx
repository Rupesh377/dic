import Image from 'next/image'
import { Member } from '@/data/members'
import { CometCard } from '@/components/ui/comet-card'

interface MemberCardProps {
  member: Member
}

export function MemberCard({ member }: MemberCardProps) {
  return (
    <CometCard>
      <div className="group bg-card/60 backdrop-blur hover:bg-card/80 border border-blue-500/20 hover:border-blue-500/60 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/15 cursor-pointer transform">
        {member.image && (
          <div className="relative w-full h-40 overflow-hidden bg-gradient-to-b from-primary/20 to-transparent">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                {member.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 group-hover:text-accent transition-colors duration-200">
                {member.role}
              </p>
            </div>
            <span className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-medium group-hover:bg-primary/40 transition-all duration-200">
              Year {member.year}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground">Joined</p>
              <p className="text-sm text-foreground">{member.joiningYear}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-2">Clubs</p>
              <div className="flex flex-wrap gap-2">
                {member.clubs.map((club) => (
                  <span key={club} className="bg-primary/10 text-accent text-xs px-2 py-1 rounded">
                    {club}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </CometCard>
  )
}
