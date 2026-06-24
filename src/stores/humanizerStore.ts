import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type {
  HumanizerForm,
  HumanizerResult,
  HumanizerCustomSettings,
  HumanizerHistoryItem,
} from '../types/textMode.types'

const MAX_HISTORY = 20

export const DEFAULT_CUSTOM_SETTINGS: HumanizerCustomSettings = {
  formalityLevel: 3,
  lengthPreference: 'same',
  vocabularyComplexity: 3,
  sentenceVariation: 3,
  creativityLevel: 3,
  targetAudience: 'General',
  language: 'Español',
  regionalVariant: 'Español (neutro)',
  usePOV: 'auto',
  keepHeadings: true,
  keepLists: true,
  keepQuotes: true,
  keepTechnicalTerms: true,
  keepProperNouns: true,
  protectedKeywords: '',
  avoidExpressions: '',
  customInstructions: '',
}

const defaultForm: HumanizerForm = {
  originalText: '',
  style: 'Más natural',
  regionalVariant: 'Español (neutro)',
  preservedExpressions: '',
  mode: 'natural',
  customSettings: DEFAULT_CUSTOM_SETTINGS,
}

interface HumanizerState {
  form: HumanizerForm
  result: HumanizerResult | null
  isProcessing: boolean
  history: HumanizerHistoryItem[]

  setField: <K extends keyof HumanizerForm>(key: K, value: HumanizerForm[K]) => void
  setCustomSetting: <K extends keyof HumanizerCustomSettings>(
    key: K,
    value: HumanizerCustomSettings[K]
  ) => void
  setResult: (result: HumanizerResult | null) => void
  setProcessing: (v: boolean) => void
  addToHistory: (item: HumanizerHistoryItem) => void
  removeFromHistory: (id: string) => void
  clearHistory: () => void
  reset: () => void
}

export const useHumanizerStore = create<HumanizerState>()(
  persist(
    (set) => ({
      form: defaultForm,
      result: null,
      isProcessing: false,
      history: [],

      setField: (key, value) =>
        set((s) => ({ form: { ...s.form, [key]: value } })),

      setCustomSetting: (key, value) =>
        set((s) => ({
          form: {
            ...s.form,
            customSettings: { ...s.form.customSettings, [key]: value },
          },
        })),

      setResult: (result) => set({ result }),
      setProcessing: (v) => set({ isProcessing: v }),

      addToHistory: (item) =>
        set((s) => ({
          history: [item, ...s.history].slice(0, MAX_HISTORY),
        })),

      removeFromHistory: (id) =>
        set((s) => ({ history: s.history.filter((h) => h.id !== id) })),

      clearHistory: () => set({ history: [] }),

      reset: () => set({ form: defaultForm, result: null }),
    }),
    { name: 'promptforge-humanizer-v2' }
  )
)
