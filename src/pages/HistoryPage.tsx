import { useState } from 'react'
import { Clock, Search, Download, Upload, Filter, FolderPlus } from 'lucide-react'
import { HistoryCard } from '../components/history/HistoryCard'
import { EmptyState } from '../components/ui/EmptyState'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { useHistoryStore } from '../stores/historyStore'
import { useToast } from '../hooks/useToast'
import { exportMultiple, importFromJSON } from '../utils/export'
import { clsx } from '../utils/clsx'

export function HistoryPage() {
  const {
    filter, setFilter, getFilteredPrompts, getAllTags,
    folders, createFolder, deleteFolder,
  } = useHistoryStore()
  const toast = useToast()
  const [newFolderOpen, setNewFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')

  const filtered = getFilteredPrompts()
  const allTags = getAllTags()

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      try {
        const imported = importFromJSON(ev.target?.result as string)
        useHistoryStore.getState().importPrompts(imported)
        toast.success(`${imported.length} prompts importados.`)
      } catch {
        toast.error('Error al importar. Verificá el formato JSON.')
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) { toast.error('Ingresá un nombre.'); return }
    createFolder(newFolderName.trim())
    setNewFolderName('')
    setNewFolderOpen(false)
    toast.success('Carpeta creada.')
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-slate-700 p-2"><Clock size={20} className="text-slate-300" /></div>
          <div>
            <h1 className="text-lg font-bold text-slate-100">Historial</h1>
            <p className="text-sm text-slate-500">{filtered.length} prompt{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setNewFolderOpen(true)}>
            <FolderPlus size={14} /> Nueva carpeta
          </Button>
          <Button variant="outline" size="sm" onClick={() => exportMultiple(getFilteredPrompts(), 'json')}>
            <Download size={14} /> Exportar
          </Button>
          <label className="inline-flex items-center gap-1.5 cursor-pointer rounded-lg border border-slate-600 hover:border-violet-500 text-slate-300 hover:text-violet-400 hover:bg-violet-500/10 px-3 py-1.5 text-sm font-medium transition-all">
            <Upload size={14} /> Importar
            <input type="file" accept=".json" className="hidden" onChange={handleImport} />
          </label>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-3 mb-6">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Buscar prompts..."
            value={filter.search}
            onChange={(e) => setFilter({ search: e.target.value })}
            className="w-full rounded-lg border border-slate-600 bg-slate-800/60 pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          {/* Mode filter */}
          <div className="flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800/40 p-1">
            {(['all', 'code', 'text'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setFilter({ mode: m })}
                className={clsx(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-all',
                  filter.mode === m ? 'bg-violet-600 text-white' : 'text-slate-400 hover:text-slate-200'
                )}
              >
                {m === 'all' ? 'Todos' : m === 'code' ? 'Código' : 'Texto'}
              </button>
            ))}
          </div>

          {/* Favorites toggle */}
          <button
            onClick={() => setFilter({ onlyFavorites: !filter.onlyFavorites })}
            className={clsx(
              'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
              filter.onlyFavorites
                ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
            )}
          >
            <Filter size={12} /> Solo favoritos
          </button>

          {/* Folders */}
          {folders.length > 0 && (
            <>
              <button
                onClick={() => setFilter({ folderId: null })}
                className={clsx(
                  'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                  filter.folderId === null && !filter.onlyFavorites
                    ? 'border-slate-500 text-slate-200'
                    : 'border-slate-700 text-slate-500 hover:border-slate-600'
                )}
              >
                Todas las carpetas
              </button>
              {folders.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilter({ folderId: f.id })}
                  className={clsx(
                    'rounded-lg border px-3 py-1.5 text-xs font-medium transition-all',
                    filter.folderId === f.id
                      ? 'border-violet-500/50 bg-violet-500/10 text-violet-300'
                      : 'border-slate-700 text-slate-500 hover:border-slate-600'
                  )}
                >
                  {f.name}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Tags */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {filter.tag && (
              <Badge variant="violet" onRemove={() => setFilter({ tag: null })}>
                {filter.tag}
              </Badge>
            )}
            {!filter.tag && allTags.slice(0, 10).map((tag) => (
              <button key={tag} onClick={() => setFilter({ tag })} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
                #{tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Prompts grid */}
      {filtered.length === 0 ? (
        <EmptyState
          icon={<Clock size={32} />}
          title="No hay prompts"
          description={
            filter.search || filter.mode !== 'all' || filter.onlyFavorites
              ? 'No se encontraron prompts con estos filtros.'
              : 'Todavía no creaste ningún prompt. ¡Empezá ahora!'
          }
          action={
            !filter.search
              ? { label: 'Crear primer prompt', onClick: () => window.location.href = '/code' }
              : undefined
          }
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => <HistoryCard key={p.id} prompt={p} />)}
        </div>
      )}

      {/* New folder modal */}
      <Modal
        open={newFolderOpen}
        onClose={() => setNewFolderOpen(false)}
        title="Nueva carpeta"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setNewFolderOpen(false)}>Cancelar</Button>
            <Button variant="primary" size="sm" onClick={handleCreateFolder}>Crear</Button>
          </>
        }
      >
        <Input
          label="Nombre de la carpeta"
          placeholder="Mi colección..."
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleCreateFolder()}
          autoFocus
        />
      </Modal>
    </div>
  )
}
