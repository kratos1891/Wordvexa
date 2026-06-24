import { useState } from 'react'
import { Settings, Sun, Moon, Trash2, Info, Shield } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { useAppStore } from '../stores/appStore'
import { useToast } from '../hooks/useToast'

export function SettingsPage() {
  const { theme, toggleTheme } = useAppStore()
  const toast = useToast()
  const [clearOpen, setClearOpen] = useState(false)

  const handleClearAll = () => {
    localStorage.removeItem('promptforge-code-draft')
    localStorage.removeItem('promptforge-text-draft')
    localStorage.removeItem('promptforge-humanizer-v2')
    localStorage.removeItem('promptforge-humanizer-draft')
    localStorage.removeItem('promptforge-history')
    toast.success('Datos locales eliminados. Recarga la pagina.')
    setClearOpen(false)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-slate-700 p-2">
          <Settings size={20} className="text-slate-300" />
        </div>
        <h1 className="text-lg font-bold text-slate-100">Configuracion</h1>
      </div>

      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Apariencia</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-300">Tema</p>
            <p className="text-xs text-slate-500">Modo {theme === 'dark' ? 'oscuro' : 'claro'} activo</p>
          </div>
          <Button variant="outline" size="sm" onClick={toggleTheme}>
            {theme === 'dark'
              ? <><Sun size={14} /> Modo claro</>
              : <><Moon size={14} /> Modo oscuro</>}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Datos locales</h2>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-red-400">Eliminar borradores y preferencias</p>
            <p className="text-xs text-slate-500">Borra formularios guardados, configuracion local y datos antiguos de historial.</p>
          </div>
          <Button variant="danger" size="sm" onClick={() => setClearOpen(true)}>
            <Trash2 size={14} /> Limpiar todo
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Info size={14} className="text-cyan-400" /> Integracion con IA
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Wordvexa prepara prompts y humaniza textos en el navegador. Para conectar una IA externa,
          usa un backend o proxy seguro que guarde las claves del proveedor fuera del frontend.
          No expongas claves en variables <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">VITE_*</code>.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {['OpenAI', 'Anthropic', 'Gemini'].map((provider) => (
            <div key={provider} className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-500">{provider}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3 mb-4">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 shrink-0 rounded-xl">
            <defs>
              <linearGradient id="s-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1EC8FF" />
                <stop offset="100%" stopColor="#8B2FFF" />
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#s-bg)" />
            <path d="M6 9C6 7.3 7.3 6 9 6H23C24.7 6 26 7.3 26 9V19C26 20.7 24.7 22 23 22H18L14.5 26V22H9C7.3 22 6 20.7 6 19Z" fill="white" opacity="0.95" />
            <path d="M11 15L12.2 12L13.4 15L17 16L13.4 17L12.2 20L11 17L7.5 16Z" fill="#6B10FF" opacity="0.9" />
            <text x="18.5" y="19" fontFamily="Georgia,serif" fontSize="7" fontWeight="bold" fill="#4B10E8" opacity="0.9">I</text>
          </svg>
          <div>
            <h2 className="text-sm font-bold brand-gradient-text">Wordvexa</h2>
            <p className="text-xs text-slate-500">Creador de prompts y humanizador de textos</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-400">
          <p><strong className="text-slate-300">Version:</strong> 1.0.0</p>
          <p><strong className="text-slate-300">Tecnologia:</strong> React 18 · TypeScript · Vite · Tailwind CSS</p>
          <p><strong className="text-slate-300">Almacenamiento:</strong> LocalStorage local para borradores y preferencias</p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-1">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-cyan-500" />
            <p className="text-xs text-slate-400 font-medium">
              © 2025 <span className="text-cyan-400">Telyux Software Development</span>
            </p>
          </div>
          <p className="text-xs text-slate-600 pl-4">
            Todos los derechos reservados. Prohibida su reproduccion sin autorizacion.
          </p>
        </div>
      </Card>

      <Modal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        title="Eliminar datos locales"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setClearOpen(false)}>Cancelar</Button>
            <Button variant="danger" size="sm" onClick={handleClearAll}>Eliminar todo</Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">
          Esta accion eliminara borradores, preferencias y cualquier dato antiguo de historial guardado en este navegador.
          <strong className="text-red-400"> No se puede deshacer.</strong>
        </p>
      </Modal>
    </div>
  )
}
