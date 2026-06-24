import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CodeModeForm } from '../types/codeMode.types'

const defaultForm: CodeModeForm = {
  language: '',
  projectType: '',
  framework: '',
  userLevel: '',
  expectedResult: '',
  description: '',
  features: '',
  technicalRequirements: '',
  existingCode: '',
  currentErrors: '',
  desiredDesign: '',
  restrictions: '',
  responseFormat: '',
  additionalInfo: '',
}

interface CodeModeState {
  form: CodeModeForm
  generatedPrompt: string
  setField: <K extends keyof CodeModeForm>(key: K, value: CodeModeForm[K]) => void
  setGeneratedPrompt: (prompt: string) => void
  resetForm: () => void
}

export const useCodeModeStore = create<CodeModeState>()(
  persist(
    (set) => ({
      form: defaultForm,
      generatedPrompt: '',

      setField: (key, value) =>
        set((s) => ({ form: { ...s.form, [key]: value } })),

      setGeneratedPrompt: (prompt) => set({ generatedPrompt: prompt }),

      resetForm: () => set({ form: defaultForm, generatedPrompt: '' }),
    }),
    { name: 'promptforge-code-draft' }
  )
)
