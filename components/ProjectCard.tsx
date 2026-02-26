import { Project } from '@/data/projects'
import { CheckCircle, AlertCircle, Clock } from 'lucide-react'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const statusConfig = {
    active: { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-400/10' },
    completed: { icon: CheckCircle, color: 'text-accent', bg: 'bg-accent/10' },
    planning: { icon: Clock, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
  }

  const config = statusConfig[project.status]
  const StatusIcon = config.icon

  return (
    <div className="group bg-card hover:bg-secondary border border-border rounded-lg p-6 transition-all hover:shadow-lg hover:shadow-accent/20 h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors mb-2">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground">{project.description}</p>
        </div>
      </div>

      <div className="space-y-3 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{project.domain}</span>
          <div className={`flex items-center gap-1 ${config.bg} px-3 py-1 rounded-full`}>
            <StatusIcon size={14} className={config.color} />
            <span className={`text-xs font-medium ${config.color}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Contributors</p>
          <div className="flex flex-wrap gap-2">
            {project.contributors.map((contributor) => (
              <span
                key={contributor}
                className="bg-primary/10 text-accent text-xs px-2 py-1 rounded"
              >
                {contributor}
              </span>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground pt-3 border-t border-border">
          Year {project.year}
        </div>
      </div>
    </div>
  )
}
