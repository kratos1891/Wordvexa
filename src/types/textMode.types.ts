// ─── Text Mode Types ──────────────────────────────────────────────────────────

export type TextWorkType =
  | 'Crear texto desde cero' | 'Mejorar texto' | 'Corregir ortografía'
  | 'Resumir' | 'Expandir' | 'Simplificar' | 'Cambiar tono' | 'Reescribir'
  | 'Traducir' | 'Humanizar texto' | 'Crear historia' | 'Crear guion'
  | 'Crear publicación para redes sociales' | 'Crear correo electrónico'
  | 'Crear trabajo académico' | 'Otro'

export type Tone =
  | 'Natural' | 'Profesional' | 'Académico' | 'Formal' | 'Informal'
  | 'Juvenil' | 'Amigable' | 'Persuasivo' | 'Emocional' | 'Divertido'
  | 'Serio' | 'Narrativo' | 'Directo'

export type TextLength = 'Muy corto' | 'Corto' | 'Medio' | 'Largo' | 'Muy largo'

export type VocabularyLevel = 'Básico' | 'Estándar' | 'Avanzado' | 'Técnico'

// Kept for backward compatibility with data/tones.ts
export type HumanizerStyle =
  | 'Más natural' | 'Más fluido' | 'Menos repetitivo' | 'Más cercano'
  | 'Más profesional' | 'Más juvenil' | 'Más académico' | 'Más informal'
  | 'Más emocional' | 'Más convincente' | 'Más fácil de entender'

export interface TextModeForm {
  workType: TextWorkType | ''
  language: string
  regionalVariant: string
  targetAudience: string
  tone: Tone | ''
  length: TextLength | ''
  vocabularyLevel: VocabularyLevel | ''
  objective: string
  platform: string
  wordsToKeep: string
  wordsToAvoid: string
  requiredInfo: string
  outputFormat: string
  textContent: string
}

// ─── Humanizer Types ──────────────────────────────────────────────────────────

export type HumanizerMode =
  | 'natural'
  | 'academico'
  | 'profesional'
  | 'conversacional'
  | 'creativo'
  | 'conciso'
  | 'personalizado'

export interface HumanizerCustomSettings {
  formalityLevel: number
  lengthPreference: 'shorter' | 'same' | 'longer'
  vocabularyComplexity: number
  sentenceVariation: number
  creativityLevel: number
  targetAudience: string
  language: string
  regionalVariant: string
  usePOV: 'auto' | 'first' | 'third'
  keepHeadings: boolean
  keepLists: boolean
  keepQuotes: boolean
  keepTechnicalTerms: boolean
  keepProperNouns: boolean
  protectedKeywords: string
  avoidExpressions: string
  customInstructions: string
}

export interface HumanizerForm {
  originalText: string
  mode: HumanizerMode
  customSettings: HumanizerCustomSettings
}

export interface HumanizerStats {
  originalWordCount: number
  resultWordCount: number
  wordCountDiff: number
  originalCharCount: number
  resultCharCount: number
  sentencesModified: number
  readabilityLevel: string
  detectedTone: string
  detectedLanguage: string
  protectedKeywordsFound: string[]
}

export interface DiffSegment {
  type: 'equal' | 'added' | 'removed'
  text: string
}

export interface HumanizerResult {
  humanizedText: string
  changes: string[]
  stats: HumanizerStats
  diff: DiffSegment[]
}

export interface HumanizerHistoryItem {
  id: string
  originalText: string
  humanizedText: string
  mode: HumanizerMode
  changes: string[]
  stats: HumanizerStats
  createdAt: string
}
