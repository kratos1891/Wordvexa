import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LayoutTemplate } from 'lucide-react'
import { TemplateCard } from '../components/templates/TemplateCard'
import { TEMPLATES } from '../data/templates'
import type { Template } from '../data/templates'
import { useCodeModeStore } from '../stores/codeModeStore'
import { useTextModeStore } from '../stores/textModeStore'
import { useToast } from '../hooks/useToast'
import { clsx } from '../utils/clsx'

type FilterMode = 'all' | 'code' | 'text'

export function TemplatesPage() {
  const navigate = useNavigate()
  const { setGeneratedPrompt: setCodePrompt } = useCodeModeStore()
  const { setGeneratedPrompt: setTextPrompt } = useTextModeStore()
  const toast = useToast()
  const [filter, setFilter] = useState<FilterMode>('all')

  const filtered = TEMPLATES.filter((t) => filter === 'all' || t.mode === filter)

  const handleUse = (template: Template) => {
    if (template.mode === 'code') {
      setCodePrompt(template.content)
      toast.success(`Plantilla "${template.title}" cargada en Modo Código.`)
      navigate('/code')
    } else {
      setTextPrompt(template.content)
      toast.success(`Plantilla "${template.title}" cargada en Modo Texto.`)
      navigate('/text')
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-amber-500/20 p-2">
            <LayoutTemplate size={20} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Plantillas</h1>
            <p className="text-sm text-slate-500">{TEMPLATES.length} plantillas profesionales listas para usar</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/40 p-1">
          {(['all', 'code', 'text'] as FilterMode[]).map((m) => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={clsx(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                filter === m
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {m === 'all' ? 'Todas' : m === 'code' ? 'Código' : 'Texto'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((template) => (
          <TemplateCard key={template.id} template={template} onUse={handleUse} />
        ))}
      </div>
    </div>
  )
}
