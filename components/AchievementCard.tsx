import { Achievement } from '@/data/achievements'
import { Trophy } from 'lucide-react'

interface AchievementCardProps {
  achievement: Achievement
}

export function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <div className="group bg-card hover:bg-secondary border border-border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-accent/20">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/20">
            <Trophy size={24} className="text-accent" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
            {achievement.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-xs bg-accent/20 text-accent px-3 py-1 rounded font-medium">
              {achievement.category}
            </span>
            <span className="text-xs text-muted-foreground">{achievement.year}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
