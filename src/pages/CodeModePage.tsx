import { useState } from 'react'
import { Code2, Save } from 'lucide-react'
import { CodeModeForm } from '../components/code-mode/CodeModeForm'
import { PromptPreview } from '../components/prompt/PromptPreview'
import { QualityIndicator } from '../components/prompt/QualityIndicator'
import { ImprovementButtons } from '../components/prompt/ImprovementButtons'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useCodeModeStore } from '../stores/codeModeStore'
import { useHistoryStore } from '../stores/historyStore'
import { analyzeCodeQuality } from '../services/qualityAnalyzer'
import { useToast } from '../hooks/useToast'

export function CodeModePage() {
  const { form, generatedPrompt, setGeneratedPrompt, resetForm } = useCodeModeStore()
  const { savePrompt } = useHistoryStore()
  const toast = useToast()
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveTitle, setSaveTitle] = useState('')
  const [saveTags, setSaveTags] = useState('')

  const quality = analyzeCodeQuality(form)

  const handleSave = () => {
    if (!generatedPrompt) { toast.error('Primero generá un prompt.'); return }
    setSaveTitle(form.description.slice(0, 60) || 'Nuevo prompt de código')
    setSaveOpen(true)
  }

  const confirmSave = () => {
    if (!saveTitle.trim()) { toast.error('Ingresá un título.'); return }
    savePrompt({
      title: saveTitle.trim(),
      content: generatedPrompt,
      mode: 'code',
      tags: saveTags.split(',').map((t) => t.trim()).filter(Boolean),
      folderId: null,
      favorite: false,
    })
    setSaveOpen(false)
    toast.success('¡Prompt guardado!')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-violet-500/20 p-2">
          <Code2 size={20} className="text-violet-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100">Modo Código</h1>
          <p className="text-sm text-slate-500">Crea prompts profesionales para programación y desarrollo</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Form */}
        <div className="space-y-6">
          <CodeModeForm />
        </div>

        {/* Right: Preview + Quality + Improvements */}
        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <QualityIndicator score={quality} />
          <PromptPreview
            prompt={generatedPrompt}
            onSave={handleSave}
            onClear={resetForm}
          />
          <ImprovementButtons
            prompt={generatedPrompt}
            onImproved={setGeneratedPrompt}
          />
        </div>
      </div>

      {/* Save modal */}
      <Modal
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
        title="Guardar prompt"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setSaveOpen(false)}>Cancelar</Button>
            <Button variant="primary" size="sm" onClick={confirmSave}>
              <Save size={14} /> Guardar
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Título del prompt"
            value={saveTitle}
            onChange={(e) => setSaveTitle(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && confirmSave()}
            autoFocus
          />
          <Input
            label="Etiquetas (separadas por coma)"
            placeholder="react, api, autenticación..."
            value={saveTags}
            onChange={(e) => setSaveTags(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  )
}
