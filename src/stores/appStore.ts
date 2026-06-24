import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface AppState {
  theme: 'dark' | 'light'
  sidebarOpen: boolean
  toasts: Toast[]
  toggleTheme: () => void
  setSidebarOpen: (open: boolean) => void
  addToast: (message: string, type?: Toast['type']) => void
  removeToast: (id: string) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      sidebarOpen: true,
      toasts: [],

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.classList.toggle('dark', next === 'dark')
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      addToast: (message, type = 'success') => {
        const id = crypto.randomUUID()
        set((s) => ({ toasts: [...s.toasts, { id, message, type }] }))
        setTimeout(() => get().removeToast(id), 3000)
      },

      removeToast: (id) =>
        set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'promptforge-app',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
)
