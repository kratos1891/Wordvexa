import { useState } from 'react'
import { Type, Save } from 'lucide-react'
import { TextModeForm } from '../components/text-mode/TextModeForm'
import { PromptPreview } from '../components/prompt/PromptPreview'
import { QualityIndicator } from '../components/prompt/QualityIndicator'
import { Modal } from '../components/ui/Modal'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { useTextModeStore } from '../stores/textModeStore'
import { useHistoryStore } from '../stores/historyStore'
import { analyzeTextQuality } from '../services/qualityAnalyzer'
import { useToast } from '../hooks/useToast'

export function TextModePage() {
  const { form, generatedPrompt, setGeneratedPrompt, resetForm } = useTextModeStore()
  const { savePrompt } = useHistoryStore()
  const toast = useToast()
  const [saveOpen, setSaveOpen] = useState(false)
  const [saveTitle, setSaveTitle] = useState('')
  const [saveTags, setSaveTags] = useState('')

  const quality = analyzeTextQuality(form)

  const handleSave = () => {
    if (!generatedPrompt) { toast.error('Primero generá un prompt.'); return }
    setSaveTitle(form.workType || 'Nuevo prompt de texto')
    setSaveOpen(true)
  }

  const confirmSave = () => {
    if (!saveTitle.trim()) { toast.error('Ingresá un título.'); return }
    savePrompt({
      title: saveTitle.trim(),
      content: generatedPrompt,
      mode: 'text',
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
            onSave={handleSave}
            onClear={resetForm}
          />
        </div>
      </div>

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
            placeholder="marketing, email, formal..."
            value={saveTags}
            onChange={(e) => setSaveTags(e.target.value)}
          />
        </div>
      </Modal>
    </div>
  )
}
