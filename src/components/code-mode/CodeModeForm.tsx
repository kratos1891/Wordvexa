import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Button } from '../ui/Button'
import { useCodeModeStore } from '../../stores/codeModeStore'
import {
  LANGUAGES, PROJECT_TYPES, FRAMEWORKS, USER_LEVELS, EXPECTED_RESULTS,
} from '../../data/languages'
import { generateCodePrompt } from '../../services/promptGenerator'
import { useToast } from '../../hooks/useToast'
import { INPUT_LIMITS, isWithinLimit } from '../../utils/security'
import { Wand2, RotateCcw } from 'lucide-react'

interface CodeModeFormProps {
  onGenerated?: () => void
}

export function CodeModeForm({ onGenerated }: CodeModeFormProps) {
  const { form, setField, setGeneratedPrompt, resetForm } = useCodeModeStore()
  const toast = useToast()

  const handleGenerate = () => {
    if (!form.description.trim()) {
      toast.error('Por favor, escribí una descripción del proyecto.')
      return
    }
    if (!isWithinLimit(form.existingCode, INPUT_LIMITS.codeText)) {
      toast.error(`El codigo supera el limite de ${INPUT_LIMITS.codeText.toLocaleString()} caracteres.`)
      return
    }
    const prompt = generateCodePrompt(form)
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
      {/* Selectors row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Select
          label="Lenguaje de programación"
          placeholder="Seleccioná un lenguaje"
          options={LANGUAGES}
          value={form.language}
          onChange={(e) => setField('language', e.target.value as typeof form.language)}
        />
        <Select
          label="Tipo de proyecto"
          placeholder="Tipo de proyecto"
          options={PROJECT_TYPES}
          value={form.projectType}
          onChange={(e) => setField('projectType', e.target.value as typeof form.projectType)}
        />
        <Select
          label="Framework / Tecnología"
          placeholder="Seleccioná un framework"
          options={FRAMEWORKS}
          value={form.framework}
          onChange={(e) => setField('framework', e.target.value as typeof form.framework)}
        />
        <Select
          label="Nivel del desarrollador"
          placeholder="Tu nivel"
          options={USER_LEVELS}
          value={form.userLevel}
          onChange={(e) => setField('userLevel', e.target.value as typeof form.userLevel)}
        />
      </div>

      <Select
        label="Resultado esperado"
        placeholder="¿Qué necesitás?"
        options={EXPECTED_RESULTS}
        value={form.expectedResult}
        onChange={(e) => setField('expectedResult', e.target.value as typeof form.expectedResult)}
      />

      <Textarea
        label="Descripción de la idea *"
        placeholder="Describí qué querés crear, mejorar o corregir..."
        value={form.description}
        rows={4}
        maxLength={INPUT_LIMITS.mediumText}
        showCount
        onChange={(e) => setField('description', e.target.value)}
      />

      <Textarea
        label="Funciones necesarias"
        placeholder="Lista las funcionalidades que debe tener..."
        value={form.features}
        rows={3}
        maxLength={INPUT_LIMITS.mediumText}
        onChange={(e) => setField('features', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Textarea
          label="Requisitos técnicos"
          placeholder="Restricciones, versiones, compatibilidad..."
          value={form.technicalRequirements}
          rows={3}
          maxLength={INPUT_LIMITS.mediumText}
          onChange={(e) => setField('technicalRequirements', e.target.value)}
        />
        <Textarea
          label="Diseño deseado"
          placeholder="Estilo visual, colores, referencias..."
          value={form.desiredDesign}
          rows={3}
          maxLength={INPUT_LIMITS.mediumText}
          onChange={(e) => setField('desiredDesign', e.target.value)}
        />
      </div>

      <Textarea
        label="Código existente"
        placeholder="Pegá aquí tu código actual (si tenés)..."
        value={form.existingCode}
        rows={6}
        maxLength={INPUT_LIMITS.codeText}
        className="font-mono text-xs"
        onChange={(e) => setField('existingCode', e.target.value)}
      />

      <Textarea
        label="Errores actuales"
        placeholder="Describí o pegá los mensajes de error..."
        value={form.currentErrors}
        rows={3}
        maxLength={INPUT_LIMITS.mediumText}
        onChange={(e) => setField('currentErrors', e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Textarea
          label="Restricciones"
          placeholder="Lo que NO debe hacer, usar o incluir..."
          value={form.restrictions}
          rows={3}
          maxLength={INPUT_LIMITS.mediumText}
          onChange={(e) => setField('restrictions', e.target.value)}
        />
        <Textarea
          label="Formato de respuesta"
          placeholder="Cómo querés que te responda la IA..."
          value={form.responseFormat}
          rows={3}
          maxLength={INPUT_LIMITS.mediumText}
          onChange={(e) => setField('responseFormat', e.target.value)}
        />
      </div>

      <Textarea
        label="Información adicional"
        placeholder="Cualquier detalle extra relevante..."
        value={form.additionalInfo}
        rows={2}
        maxLength={INPUT_LIMITS.mediumText}
        onChange={(e) => setField('additionalInfo', e.target.value)}
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
