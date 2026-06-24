import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TextModeForm } from '../types/textMode.types'

const defaultForm: TextModeForm = {
  workType: '',
  language: 'Español (neutro)',
  regionalVariant: 'Español (neutro)',
  targetAudience: '',
  tone: '',
  length: '',
  vocabularyLevel: '',
  objective: '',
  platform: '',
  wordsToKeep: '',
  wordsToAvoid: '',
  requiredInfo: '',
  outputFormat: '',
  textContent: '',
}

interface TextModeState {
  form: TextModeForm
  generatedPrompt: string
  setField: <K extends keyof TextModeForm>(key: K, value: TextModeForm[K]) => void
  setGeneratedPrompt: (prompt: string) => void
  resetForm: () => void
}

export const useTextModeStore = create<TextModeState>()(
  persist(
    (set) => ({
      form: defaultForm,
      generatedPrompt: '',

      setField: (key, value) =>
        set((s) => ({ form: { ...s.form, [key]: value } })),

      setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),

      resetForm: () => set({ form: defaultForm, generatedPrompt: '' }),
    }),
    { name: 'promptforge-text-draft' }
  )
)
