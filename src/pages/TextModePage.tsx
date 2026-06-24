import { Type } from 'lucide-react'
import { TextModeForm } from '../components/text-mode/TextModeForm'
import { PromptPreview } from '../components/prompt/PromptPreview'
import { QualityIndicator } from '../components/prompt/QualityIndicator'
import { useTextModeStore } from '../stores/textModeStore'
import { analyzeTextQuality } from '../services/qualityAnalyzer'

export function TextModePage() {
  const { form, generatedPrompt, resetForm } = useTextModeStore()
  const quality = analyzeTextQuality(form)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-blue-500/20 p-2">
          <Type size={20} className="text-blue-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100">Modo Texto</h1>
          <p className="text-sm text-slate-500">Crea prompts para escritura, marketing y contenido</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TextModeForm />
        </div>
        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <QualityIndicator score={quality} />
          <PromptPreview
            prompt={generatedPrompt}
            onClear={resetForm}
          />
        </div>
      </div>
    </div>
  )
}
