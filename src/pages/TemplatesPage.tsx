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
import type { TextWorkType } from '../types/textMode.types'

type FilterMode = 'all' | 'code' | 'text'

function getTemplateWorkType(template: Template): TextWorkType {
  if (template.id === 'tpl-humanize') return 'Humanizar texto'
  if (template.id === 'tpl-summarize') return 'Resumir'
  if (template.id === 'tpl-story') return 'Crear historia'
  return 'Crear texto desde cero'
}

export function TemplatesPage() {
  const navigate = useNavigate()
  const {
    setGeneratedPrompt: setCodePrompt,
    setField: setCodeField,
  } = useCodeModeStore()
  const {
    setGeneratedPrompt: setTextPrompt,
    setField: setTextField,
  } = useTextModeStore()
  const toast = useToast()
  const [filter, setFilter] = useState<FilterMode>('all')

  const filtered = TEMPLATES.filter((template) => filter === 'all' || template.mode === filter)

  const handleUse = (template: Template) => {
    if (template.mode === 'code') {
      setCodeField('description', template.description)
      setCodeField('additionalInfo', template.content)
      setCodePrompt(template.content)
      toast.success(`Plantilla "${template.title}" cargada en Modo Codigo.`)
      navigate('/code')
      return
    }

    setTextField('workType', getTemplateWorkType(template))
    setTextField('textContent', template.content)
    setTextField('objective', template.description)
    setTextPrompt(template.content)
    toast.success(`Plantilla "${template.title}" cargada en Modo Texto.`)
    navigate('/text')
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

        <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/40 p-1">
          {(['all', 'code', 'text'] as FilterMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setFilter(mode)}
              className={clsx(
                'px-3 py-1.5 text-xs font-medium rounded-md transition-all',
                filter === mode
                  ? 'bg-violet-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              )}
            >
              {mode === 'all' ? 'Todas' : mode === 'code' ? 'Codigo' : 'Texto'}
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
