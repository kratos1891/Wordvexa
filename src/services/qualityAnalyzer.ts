import type { CodeModeForm } from '../types/codeMode.types'
import type { TextModeForm } from '../types/textMode.types'
import type { QualityScore } from '../types/prompt.types'

export function analyzeCodeQuality(form: CodeModeForm): QualityScore {
  const suggestions: string[] = []

  const clarity = form.description.trim().length > 20 ? 20 : form.description.trim().length > 0 ? 10 : 0
  if (clarity < 20) suggestions.push('Agregá una descripción más detallada del proyecto (al menos 2-3 oraciones).')

  const context = (form.language ? 8 : 0) + (form.projectType ? 7 : 0)
  if (!form.language) suggestions.push('Especificá el lenguaje de programación.')
  if (!form.projectType) suggestions.push('Indicá el tipo de proyecto.')

  const filledFields = [
    form.features, form.technicalRequirements, form.existingCode,
    form.currentErrors, form.desiredDesign,
  ].filter((f) => f.trim().length > 0).length
  const detail = Math.min(20, filledFields * 4)
  if (detail < 12) suggestions.push('Completá más campos para obtener un prompt más detallado (funciones, requisitos técnicos).')

  const restrictions = form.restrictions.trim().length > 0 ? 10 : 0
  if (!restrictions) suggestions.push('Añadí restricciones o limitaciones del proyecto.')

  const format = form.responseFormat.trim().length > 0 ? 10 : (form.expectedResult ? 7 : 0)
  if (format < 10) suggestions.push('Especificá el formato de respuesta esperado.')

  const objective = form.expectedResult ? 15 : (form.description.trim().length > 0 ? 8 : 0)
  if (!form.expectedResult) suggestions.push('Seleccioná el tipo de resultado que esperás.')

  const audience = form.userLevel ? 10 : 0
  if (!audience) suggestions.push('Indicá tu nivel como desarrollador para adaptar la respuesta.')

  const total = clarity + context + detail + restrictions + format + objective + audience

  return { total, clarity, context, detail, restrictions, format, objective, audience, suggestions }
}

export function analyzeTextQuality(form: TextModeForm): QualityScore {
  const suggestions: string[] = []

  const hasContent = form.textContent.trim().length > 0
  const hasObjective = form.objective.trim().length > 0

  const clarity = hasContent ? 20 : (form.workType ? 10 : 0)
  if (!hasContent) suggestions.push('Pegá o escribí el texto a trabajar.')

  const context = (form.workType ? 8 : 0) + (form.language || form.regionalVariant ? 7 : 0)
  if (!form.workType) suggestions.push('Seleccioná el tipo de trabajo a realizar.')
  if (!form.regionalVariant) suggestions.push('Especificá la variante regional del idioma.')

  const filledFields = [form.tone, form.length, form.vocabularyLevel, form.platform].filter(Boolean).length
  const detail = Math.min(20, filledFields * 5)
  if (detail < 10) suggestions.push('Completá más opciones: tono, extensión, nivel de vocabulario.')

  const restrictions = (form.wordsToKeep || form.wordsToAvoid) ? 10 : 0

  const format = form.outputFormat.trim().length > 0 ? 10 : 5

  const objective = hasObjective ? 15 : (form.workType ? 8 : 0)
  if (!hasObjective) suggestions.push('Describí el objetivo del texto para mejores resultados.')

  const audience = form.targetAudience.trim().length > 0 ? 10 : (form.platform ? 5 : 0)
  if (!form.targetAudience) suggestions.push('Definí el público objetivo del texto.')

  const total = clarity + context + detail + restrictions + format + objective + audience

  return { total, clarity, context, detail, restrictions, format, objective, audience, suggestions }
}

export function getQualityLabel(score: number): { label: string; color: string } {
  if (score >= 85) return { label: 'Excelente', color: 'text-emerald-400' }
  if (score >= 65) return { label: 'Bueno', color: 'text-blue-400' }
  if (score >= 45) return { label: 'Regular', color: 'text-yellow-400' }
  return { label: 'Básico', color: 'text-red-400' }
}
