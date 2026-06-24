import { useState } from 'react'
import { Settings, Sun, Moon, Trash2, Download, Info, Shield } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Modal } from '../components/ui/Modal'
import { useAppStore } from '../stores/appStore'
import { useHistoryStore } from '../stores/historyStore'
import { useToast } from '../hooks/useToast'
import { exportMultiple } from '../utils/export'

export function SettingsPage() {
  const { theme, toggleTheme } = useAppStore()
  const { prompts, folders } = useHistoryStore()
  const toast = useToast()
  const [clearOpen, setClearOpen] = useState(false)

  const handleClearAll = () => {
    localStorage.removeItem('promptforge-history')
    localStorage.removeItem('promptforge-code-draft')
    localStorage.removeItem('promptforge-text-draft')
    localStorage.removeItem('promptforge-humanizer-draft')
    toast.success('Datos eliminados. Recargá la página.')
    setClearOpen(false)
    setTimeout(() => window.location.reload(), 1500)
  }

  const handleExportAll = () => {
    if (prompts.length === 0) { toast.error('No hay prompts para exportar.'); return }
    exportMultiple(prompts, 'json')
    toast.success(`${prompts.length} prompts exportados.`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="rounded-lg bg-slate-700 p-2">
          <Settings size={20} className="text-slate-300" />
        </div>
        <h1 className="text-lg font-bold text-slate-100">Configuración</h1>
      </div>

      {/* Appearance */}
      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Apariencia</h2>
        <div className="flex items-center justify-between">
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

      {/* Data */}
      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-4">Datos</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-300">Prompts guardados</p>
              <p className="text-xs text-slate-500">{prompts.length} prompts · {folders.length} carpetas</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportAll}>
              <Download size={14} /> Exportar todo
            </Button>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
            <div>
              <p className="text-sm text-red-400">Eliminar todos los datos</p>
              <p className="text-xs text-slate-500">Borra todos los prompts, carpetas y borradores</p>
            </div>
            <Button variant="danger" size="sm" onClick={() => setClearOpen(true)}>
              <Trash2 size={14} /> Limpiar todo
            </Button>
          </div>
        </div>
      </Card>

      {/* AI Integration */}
      <Card>
        <h2 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
          <Info size={14} className="text-cyan-400" /> Integración con IA
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed mb-3">
          Para conectar una API de IA, editá{' '}
          <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">src/services/aiService.ts</code>,
          descomentá el proveedor que quieras (OpenAI, Anthropic o Gemini) y creá{' '}
          <code className="text-cyan-400 bg-slate-800 px-1 py-0.5 rounded">.env.local</code> con tu clave API.
        </p>
        <div className="grid grid-cols-3 gap-2">
          {['OpenAI', 'Anthropic', 'Gemini'].map((p) => (
            <div key={p} className="flex items-center gap-1.5 rounded-lg border border-slate-700/50 bg-slate-800/30 px-3 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
              <span className="text-xs text-slate-500">{p}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* About + Copyright */}
      <Card>
        <div className="flex items-start gap-3 mb-4">
          {/* Mini logo */}
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 shrink-0 rounded-xl">
            <defs>
              <linearGradient id="s-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%"   stopColor="#1EC8FF"/>
                <stop offset="100%" stopColor="#8B2FFF"/>
              </linearGradient>
            </defs>
            <rect width="32" height="32" rx="8" fill="url(#s-bg)"/>
            <path d="M6 9C6 7.3 7.3 6 9 6H23C24.7 6 26 7.3 26 9V19C26 20.7 24.7 22 23 22H18L14.5 26V22H9C7.3 22 6 20.7 6 19Z" fill="white" opacity="0.95"/>
            <path d="M11 15L12.2 12L13.4 15L17 16L13.4 17L12.2 20L11 17L7.5 16Z" fill="#6B10FF" opacity="0.9"/>
            <text x="18.5" y="19" fontFamily="Georgia,serif" fontSize="7" fontWeight="bold" fill="#4B10E8" opacity="0.9">I</text>
          </svg>
          <div>
            <h2 className="text-sm font-bold brand-gradient-text">Wordvexa</h2>
            <p className="text-xs text-slate-500">Creador de Prompts de Inteligencia Artificial</p>
          </div>
        </div>

        <div className="space-y-2 text-sm text-slate-400">
          <p><strong className="text-slate-300">Versión:</strong> 1.0.0</p>
          <p><strong className="text-slate-300">Tecnología:</strong> React 18 · TypeScript · Vite · Tailwind CSS</p>
          <p><strong className="text-slate-300">Almacenamiento:</strong> LocalStorage (100% local, sin servidor)</p>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700/50 space-y-1">
          <div className="flex items-center gap-2">
            <Shield size={12} className="text-cyan-500" />
            <p className="text-xs text-slate-400 font-medium">
              © 2025 <span className="text-cyan-400">Telyux Software Development</span>
            </p>
          </div>
          <p className="text-xs text-slate-600 pl-4">
            Todos los derechos reservados. Prohibida su reproducción sin autorización.
          </p>
        </div>
      </Card>

      {/* Clear modal */}
      <Modal
        open={clearOpen}
        onClose={() => setClearOpen(false)}
        title="¿Eliminar todos los datos?"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setClearOpen(false)}>Cancelar</Button>
            <Button variant="danger" size="sm" onClick={handleClearAll}>Eliminar todo</Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">
          Esta acción eliminará permanentemente todos tus prompts, carpetas, etiquetas y borradores.{' '}
          <strong className="text-red-400">No se puede deshacer.</strong>
        </p>
      </Modal>
    </div>
  )
}
