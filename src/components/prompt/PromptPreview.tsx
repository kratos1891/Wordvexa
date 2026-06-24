import { Copy, Download, Save, Trash2, FileText } from 'lucide-react'
import { Button } from '../ui/Button'
import { useToast } from '../../hooks/useToast'
import { clsx } from '../../utils/clsx'

interface PromptPreviewProps {
  prompt: string
  onSave?: () => void
  onClear?: () => void
  className?: string
}

export function PromptPreview({ prompt, onSave, onClear, className }: PromptPreviewProps) {
  const toast = useToast()

  const charCount = prompt.length
  const wordCount = prompt.trim() ? prompt.trim().split(/\s+/).length : 0

  const handleCopy = async () => {
    if (!prompt) return
    await navigator.clipboard.writeText(prompt)
    toast.success('¡Prompt copiado al portapapeles!')
  }

  const handleDownload = () => {
    if (!prompt) return
    const blob = new Blob([prompt], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'prompt-wordvexa.txt'
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Prompt descargado.')
  }

  return (
    <div className={clsx('flex flex-col gap-3', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText size={14} className="text-slate-500" />
          <span className="text-sm font-medium text-slate-300">Vista previa del prompt</span>
        </div>
        {prompt && (
          <span className="text-xs text-slate-500">
            {charCount.toLocaleString()} car. · {wordCount.toLocaleString()} pal.
          </span>
        )}
      </div>

      {/* Content */}
      <div className="relative rounded-xl border border-slate-700/50 bg-slate-900/60 min-h-[200px] flex flex-col">
        {prompt ? (
          <>
            <pre className="flex-1 p-4 text-sm text-slate-200 whitespace-pre-wrap font-mono leading-relaxed overflow-y-auto max-h-[500px]">
              {prompt}
            </pre>
            {/* Floating copy */}
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg bg-slate-700/80 px-2.5 py-1.5 text-xs text-slate-300 hover:brand-gradient hover:text-white transition-all backdrop-blur-sm border border-slate-600/50 hover:border-cyan-500/40"
              aria-label="Copiar prompt"
            >
              <Copy size={12} /> Copiar
            </button>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 p-4 border border-slate-700/50">
              <FileText size={28} className="text-slate-600" />
            </div>
            <p className="text-sm text-slate-500">
              Completá el formulario y hacé clic en{' '}
              <span className="brand-gradient-text font-medium">Generar prompt</span>
            </p>
          </div>
        )}
      </div>

      {/* Actions */}
      {prompt && (
        <div className="flex flex-wrap gap-2">
          <Button variant="primary" size="sm" onClick={handleCopy}>
            <Copy size={14} /> Copiar
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download size={14} /> Descargar
          </Button>
          {onSave && (
            <Button variant="outline" size="sm" onClick={onSave}>
              <Save size={14} /> Guardar
            </Button>
          )}
          {onClear && (
            <Button variant="ghost" size="sm" onClick={onClear} className="ml-auto">
              <Trash2 size={14} /> Limpiar
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
