import { useState } from 'react'
import { Star, Copy, Trash2, Edit3, ExternalLink, MoreHorizontal, Download, FolderOpen } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Modal } from '../ui/Modal'
import { Input } from '../ui/Input'
import { useHistoryStore } from '../../stores/historyStore'
import { useToast } from '../../hooks/useToast'
import { exportPrompt } from '../../utils/export'
import type { SavedPrompt } from '../../types/prompt.types'
import { clsx } from '../../utils/clsx'

interface HistoryCardProps {
  prompt: SavedPrompt
  onEdit?: (prompt: SavedPrompt) => void
}

export function HistoryCard({ prompt, onEdit }: HistoryCardProps) {
  const { toggleFavorite, deletePrompt, duplicatePrompt, updatePrompt, folders } = useHistoryStore()
  const toast = useToast()
  const [menuOpen, setMenuOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editTitleOpen, setEditTitleOpen] = useState(false)
  const [newTitle, setNewTitle] = useState(prompt.title)

  const folder = folders.find((f) => f.id === prompt.folderId)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content)
    toast.success('Prompt copiado.')
  }

  const handleDelete = () => {
    deletePrompt(prompt.id)
    setDeleteOpen(false)
    toast.success('Prompt eliminado.')
  }

  const handleDuplicate = () => {
    duplicatePrompt(prompt.id)
    setMenuOpen(false)
    toast.success('Prompt duplicado.')
  }

  const handleSaveTitle = () => {
    if (newTitle.trim()) {
      updatePrompt(prompt.id, { title: newTitle.trim() })
      toast.success('Título actualizado.')
    }
    setEditTitleOpen(false)
  }

  const date = new Date(prompt.createdAt).toLocaleDateString('es-UY', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

  return (
    <>
      <div className="group rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 hover:border-slate-600 hover:bg-slate-800/50 transition-all duration-150 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-slate-100 truncate">{prompt.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={prompt.mode === 'code' ? 'violet' : 'blue'} size="sm">
                {prompt.mode === 'code' ? 'Código' : 'Texto'}
              </Badge>
              {folder && (
                <span className="flex items-center gap-1 text-xs text-slate-500">
                  <FolderOpen size={10} /> {folder.name}
                </span>
              )}
              <span className="text-xs text-slate-500">{date}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => toggleFavorite(prompt.id)}
              className={clsx(
                'p-1.5 rounded-lg transition-colors',
                prompt.favorite ? 'text-amber-400' : 'text-slate-500 hover:text-amber-400'
              )}
              aria-label={prompt.favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
            >
              <Star size={14} fill={prompt.favorite ? 'currentColor' : 'none'} />
            </button>

            <div className="relative">
              <button
                onClick={() => setMenuOpen((o) => !o)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-700 transition-colors"
                aria-label="Más opciones"
              >
                <MoreHorizontal size={14} />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 top-8 z-20 w-44 rounded-xl border border-slate-700 bg-slate-900 shadow-xl py-1">
                    {[
                      { label: 'Editar título', icon: Edit3, action: () => { setEditTitleOpen(true); setMenuOpen(false) } },
                      { label: 'Duplicar', icon: Copy, action: handleDuplicate },
                      { label: 'Exportar TXT', icon: Download, action: () => { exportPrompt(prompt, 'txt'); setMenuOpen(false) } },
                      { label: 'Exportar MD', icon: Download, action: () => { exportPrompt(prompt, 'md'); setMenuOpen(false) } },
                      { label: 'Exportar JSON', icon: Download, action: () => { exportPrompt(prompt, 'json'); setMenuOpen(false) } },
                    ].map(({ label, icon: Icon, action }) => (
                      <button key={label} onClick={action} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 transition-colors">
                        <Icon size={13} /> {label}
                      </button>
                    ))}
                    <div className="border-t border-slate-700/50 mt-1 pt-1">
                      <button onClick={() => { setDeleteOpen(true); setMenuOpen(false) }} className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 size={13} /> Eliminar
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
          {prompt.content.slice(0, 200)}...
        </p>

        {/* Tags */}
        {prompt.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {prompt.tags.map((tag) => <Badge key={tag} size="sm">{tag}</Badge>)}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="xs" onClick={handleCopy}>
            <Copy size={12} /> Copiar
          </Button>
          {onEdit && (
            <Button variant="ghost" size="xs" onClick={() => onEdit(prompt)}>
              <ExternalLink size={12} /> Editar
            </Button>
          )}
        </div>
      </div>

      {/* Delete confirmation */}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Eliminar prompt"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDeleteOpen(false)}>Cancelar</Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>Eliminar</Button>
          </>
        }
      >
        <p className="text-sm text-slate-300">
          ¿Estás seguro de que querés eliminar <strong>{prompt.title}</strong>? Esta acción no se puede deshacer.
        </p>
      </Modal>

      {/* Edit title */}
      <Modal
        open={editTitleOpen}
        onClose={() => setEditTitleOpen(false)}
        title="Editar título"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setEditTitleOpen(false)}>Cancelar</Button>
            <Button variant="primary" size="sm" onClick={handleSaveTitle}>Guardar</Button>
          </>
        }
      >
        <Input
          label="Nuevo título"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveTitle()}
          autoFocus
        />
      </Modal>
    </>
  )
}
