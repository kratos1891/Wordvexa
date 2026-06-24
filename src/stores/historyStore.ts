import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SavedPrompt, Folder } from '../types/prompt.types'
import type { HistoryFilter } from '../types/history.types'

interface HistoryState {
  prompts: SavedPrompt[]
  folders: Folder[]
  filter: HistoryFilter
  savePrompt: (prompt: Omit<SavedPrompt, 'id' | 'createdAt' | 'updatedAt'>) => SavedPrompt
  updatePrompt: (id: string, changes: Partial<SavedPrompt>) => void
  deletePrompt: (id: string) => void
  duplicatePrompt: (id: string) => void
  toggleFavorite: (id: string) => void
  createFolder: (name: string) => Folder
  renameFolder: (id: string, name: string) => void
  deleteFolder: (id: string) => void
  setFilter: (filter: Partial<HistoryFilter>) => void
  importPrompts: (prompts: SavedPrompt[]) => void
  getAllTags: () => string[]
  getFilteredPrompts: () => SavedPrompt[]
}

const defaultFilter: HistoryFilter = {
  search: '',
  mode: 'all',
  folderId: null,
  tag: null,
  onlyFavorites: false,
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      prompts: [],
      folders: [],
      filter: defaultFilter,

      savePrompt: (data) => {
        const now = new Date().toISOString()
        const prompt: SavedPrompt = {
          ...data,
          id: crypto.randomUUID(),
          createdAt: now,
          updatedAt: now,
        }
        set((s) => ({ prompts: [prompt, ...s.prompts] }))
        return prompt
      },

      updatePrompt: (id, changes) =>
        set((s) => ({
          prompts: s.prompts.map((p) =>
            p.id === id ? { ...p, ...changes, updatedAt: new Date().toISOString() } : p
          ),
        })),

      deletePrompt: (id) =>
        set((s) => ({ prompts: s.prompts.filter((p) => p.id !== id) })),

      duplicatePrompt: (id) => {
        const p = get().prompts.find((x) => x.id === id)
        if (!p) return
        const now = new Date().toISOString()
        const copy: SavedPrompt = {
          ...p,
          id: crypto.randomUUID(),
          title: `${p.title} (copia)`,
          favorite: false,
          createdAt: now,
          updatedAt: now,
        }
        set((s) => ({ prompts: [copy, ...s.prompts] }))
      },

      toggleFavorite: (id) =>
        set((s) => ({
          prompts: s.prompts.map((p) =>
            p.id === id ? { ...p, favorite: !p.favorite, updatedAt: new Date().toISOString() } : p
          ),
        })),

      createFolder: (name) => {
        const folder: Folder = { id: crypto.randomUUID(), name, createdAt: new Date().toISOString() }
        set((s) => ({ folders: [...s.folders, folder] })
        )
        return folder
      },

      renameFolder: (id, name) =>
        set((s) => ({
          folders: s.folders.map((f) => (f.id === id ? { ...f, name } : f)),
        })),

      deleteFolder: (id) =>
        set((s) => ({
          folders: s.folders.filter((f) => f.id !== id),
          prompts: s.prompts.map((p) => (p.folderId === id ? { ...p, folderId: null } : p)),
        })),

      setFilter: (filter) =>
        set((s) => ({ filter: { ...s.filter, ...filter } })),

      importPrompts: (prompts) =>
        set((s) => ({ prompts: [...prompts, ...s.prompts] })),

      getAllTags: () => {
        const tags = new Set<string>()
        get().prompts.forEach((p) => p.tags.forEach((t) => tags.add(t)))
        return Array.from(tags).sort()
      },

      getFilteredPrompts: () => {
        const { prompts, filter } = get()
        return prompts.filter((p) => {
          if (filter.onlyFavorites && !p.favorite) return false
          if (filter.mode !== 'all' && p.mode !== filter.mode) return false
          if (filter.folderId !== null && p.folderId !== filter.folderId) return false
          if (filter.tag !== null && !p.tags.includes(filter.tag)) return false
          if (filter.search) {
            const q = filter.search.toLowerCase()
            return p.title.toLowerCase().includes(q) || p.content.toLowerCase().includes(q)
          }
          return true
        })
      },
    }),
    { name: 'promptforge-history' }
  )
)
