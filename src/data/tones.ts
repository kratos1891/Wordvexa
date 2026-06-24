import type { Tone, TextWorkType, TextLength, VocabularyLevel, HumanizerStyle } from '../types/textMode.types'

export const TONES: Tone[] = [
  'Natural', 'Profesional', 'Académico', 'Formal', 'Informal',
  'Juvenil', 'Amigable', 'Persuasivo', 'Emocional', 'Divertido',
  'Serio', 'Narrativo', 'Directo',
]

export const TEXT_WORK_TYPES: TextWorkType[] = [
  'Crear texto desde cero', 'Mejorar texto', 'Corregir ortografía',
  'Resumir', 'Expandir', 'Simplificar', 'Cambiar tono', 'Reescribir',
  'Traducir', 'Humanizar texto', 'Crear historia', 'Crear guion',
  'Crear publicación para redes sociales', 'Crear correo electrónico',
  'Crear trabajo académico', 'Otro',
]

export const TEXT_LENGTHS: TextLength[] = [
  'Muy corto', 'Corto', 'Medio', 'Largo', 'Muy largo',
]

export const VOCABULARY_LEVELS: VocabularyLevel[] = [
  'Básico', 'Estándar', 'Avanzado', 'Técnico',
]

export const HUMANIZER_STYLES: HumanizerStyle[] = [
  'Más natural', 'Más fluido', 'Menos repetitivo', 'Más cercano',
  'Más profesional', 'Más juvenil', 'Más académico', 'Más informal',
  'Más emocional', 'Más convincente', 'Más fácil de entender',
]

export const REGIONAL_VARIANTS = [
  'Español (neutro)',
  'Español de Argentina',
  'Español de Uruguay',
  'Español de México',
  'Español de España',
  'Español de Colombia',
  'Español de Chile',
  'Inglés (neutral)',
  'Inglés americano',
  'Inglés británico',
  'Portugués (Brasil)',
  'Portugués (Portugal)',
  'Francés',
  'Italiano',
  'Alemán',
]

export const PLATFORMS = [
  'ChatGPT', 'Claude', 'Gemini', 'Copilot',
  'TikTok', 'Instagram', 'Twitter/X', 'LinkedIn',
  'YouTube', 'Facebook', 'Blog', 'Email',
  'WhatsApp', 'Documento Word', 'Otro',
]
