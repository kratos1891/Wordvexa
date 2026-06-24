import {
  Globe, Bug, Server, Database, AppWindow, Palette, BookOpen,
  Heart, FileText, GraduationCap, Video, Youtube, Mail, Megaphone,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import type { Template } from '../../data/templates'
import { clsx } from '../../utils/clsx'

const iconMap: Record<string, LucideIcon> = {
  Globe, Bug, Server, Database, AppWindow, Palette, BookOpen,
  Heart, FileText, GraduationCap, Video, Youtube, Mail, Megaphone,
}

interface TemplateCardProps {
  template: Template
  onUse: (template: Template) => void
}

export function TemplateCard({ template, onUse }: TemplateCardProps) {
  const Icon = iconMap[template.icon] ?? FileText

  return (
    <div className="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 hover:border-violet-500/40 hover:bg-slate-800/60 transition-all duration-150 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className={clsx(
          'shrink-0 rounded-lg p-2',
          template.mode === 'code' ? 'bg-violet-500/20 text-violet-400' : 'bg-blue-500/20 text-blue-400'
        )}>
          <Icon size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-slate-100">{template.title}</h3>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{template.description}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1">
        <Badge variant={template.mode === 'code' ? 'violet' : 'blue'} size="sm">
          {template.mode === 'code' ? 'Código' : 'Texto'}
        </Badge>
        {template.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} size="sm">{tag}</Badge>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => onUse(template)}
        className="mt-auto w-full group-hover:border-violet-500/60 group-hover:text-violet-400"
      >
        Usar plantilla
      </Button>
    </div>
  )
}
