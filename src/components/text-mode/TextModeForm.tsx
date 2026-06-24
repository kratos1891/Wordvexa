import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { useTextModeStore } from '../../stores/textModeStore'
import {
  TONES, TEXT_WORK_TYPES, TEXT_LENGTHS, VOCABULARY_LEVELS,
  REGIONAL_VARIANTS, PLATFORMS,
} from '../../data/tones'
import { generateTextPrompt } from '../../services/textPromptGenerator'
import { useToast } from '../../hooks/useToast'
import { Wand2, RotateCcw } from 'lucide-react'

interface TextModeFormProps {
  onGenerated?: () => void
}

export function TextModeForm({ onGenerated }: TextModeFormProps) {
  const { form, setField, setGeneratedPrompt, resetForm } = useTextModeStore()
  const toast = useToast()

  const handleGenerate = () => {
    if (!form.workType) {
      toast.error('Seleccioná el tipo de trabajo a realizar.')
      return
    }
    const prompt = generateTextPrompt(form)
    setGeneratedPrompt(prompt)
    toast.success('¡Prompt generado!')
    onGenerated?.()
  }

  const handleReset = () => {
    if (confirm('¿Querés limpiar todo el formulario?')) {
      resetForm()
    }
  }

  return (
    <div className="space-y-5">
      <Select
        label="Tipo de trabajo *"
        placeholder="¿Qué querés hacer?"
        options={TEXT_WORK_TYPES}
        value={form.workType}
        onChange={(e) => setField('workType', e.target.value as typeof form.workType)}
      />

      <Textarea
        label="Texto a trabajar"
        placeholder="Pegá aquí el texto a mejorar, resumir, traducir... (o dejalo vacío si vas a crear desde cero)"
        value={form.textContent}
        rows={5}
        showCount
        onChange={(e) => setField('textContent', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Variante regional del idioma"
          options={REGIONAL_VARIANTS}
          value={form.regionalVariant}
          onChange={(e) => setField('regionalVariant', e.target.value)}
        />
        <Select
          label="Tono"
          placeholder="Seleccioná el tono"
          options={TONES}
          value={form.tone}
          onChange={(e) => setField('tone', e.target.value as typeof form.tone)}
        />
        <Select
          label="Extensión"
          placeholder="Extensión del texto"
          options={TEXT_LENGTHS}
          value={form.length}
          onChange={(e) => setField('length', e.target.value as typeof form.length)}
        />
        <Select
          label="Nivel de vocabulario"
          placeholder="Nivel del vocabulario"
          options={VOCABULARY_LEVELS}
          value={form.vocabularyLevel}
          onChange={(e) => setField('vocabularyLevel', e.target.value as typeof form.vocabularyLevel)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Público objetivo"
          placeholder="¿A quién va dirigido?"
          value={form.targetAudience}
          onChange={(e) => setField('targetAudience', e.target.value)}
        />
        <Select
          label="Plataforma de publicación"
          placeholder="¿Dónde se publicará?"
          options={PLATFORMS}
          value={form.platform}
          onChange={(e) => setField('platform', e.target.value)}
        />
      </div>

      <Textarea
        label="Objetivo del texto"
        placeholder="¿Qué debe lograr este texto? ¿Qué acción debe generar?"
        value={form.objective}
        rows={2}
        onChange={(e) => setField('objective', e.target.value)}
      />

      <Textarea
        label="Información obligatoria a incluir"
        placeholder="Datos, fechas, nombres, conceptos que no pueden faltar..."
        value={form.requiredInfo}
        rows={3}
        onChange={(e) => setField('requiredInfo', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Palabras que deben mantenerse"
          placeholder="palabra1, frase2, término3..."
          value={form.wordsToKeep}
          onChange={(e) => setField('wordsToKeep', e.target.value)}
        />
        <Input
          label="Palabras que deben evitarse"
          placeholder="palabra1, frase2, término3..."
          value={form.wordsToAvoid}
          onChange={(e) => setField('wordsToAvoid', e.target.value)}
        />
      </div>

      <Textarea
        label="Formato de salida"
        placeholder="¿Cómo querés el resultado? (párrafos, bullet points, con título, etc.)"
        value={form.outputFormat}
        rows={2}
        onChange={(e) => setField('outputFormat', e.target.value)}
      />

      <div className="flex gap-3 pt-2">
        <Button variant="primary" size="md" onClick={handleGenerate} className="flex-1">
          <Wand2 size={16} /> Generar prompt
        </Button>
        <Button variant="ghost" size="md" onClick={handleReset}>
          <RotateCcw size={16} /> Limpiar
        </Button>
      </div>
    </div>
  )
}
