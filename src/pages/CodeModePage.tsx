import { Code2 } from 'lucide-react'
import { CodeModeForm } from '../components/code-mode/CodeModeForm'
import { PromptPreview } from '../components/prompt/PromptPreview'
import { QualityIndicator } from '../components/prompt/QualityIndicator'
import { ImprovementButtons } from '../components/prompt/ImprovementButtons'
import { useCodeModeStore } from '../stores/codeModeStore'
import { analyzeCodeQuality } from '../services/qualityAnalyzer'

export function CodeModePage() {
  const { form, generatedPrompt, setGeneratedPrompt, resetForm } = useCodeModeStore()
  const quality = analyzeCodeQuality(form)

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-violet-500/20 p-2">
          <Code2 size={20} className="text-violet-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100">Modo Codigo</h1>
          <p className="text-sm text-slate-500">Crea prompts profesionales para programacion y desarrollo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="space-y-6">
          <CodeModeForm />
        </div>

        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <QualityIndicator score={quality} />
          <PromptPreview
            prompt={generatedPrompt}
            onClear={resetForm}
          />
          <ImprovementButtons
            prompt={generatedPrompt}
            onImproved={setGeneratedPrompt}
          />
        </div>
      </div>
    </div>
  )
}
