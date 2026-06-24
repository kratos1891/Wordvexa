export type PromptMode = 'code' | 'text'

export interface SavedPrompt {
  id: string
  title: string
  content: string
  mode: PromptMode
  tags: string[]
  folderId: string | null
  favorite: boolean
  createdAt: string
  updatedAt: string
}

export interface Folder {
  id: string
  name: string
  createdAt: string
}

export interface QualityScore {
  total: number
  clarity: number
  context: number
  detail: number
  restrictions: number
  format: number
  objective: number
  audience: number
  suggestions: string[]
}
