import { type ReactNode, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl animate-slide-up">
        <div className="flex items-center justify-between border-b border-slate-700/50 px-5 py-4">
          <h2 id="modal-title" className="text-base font-semibold text-slate-100">{title}</h2>
          <Button variant="ghost" size="xs" onClick={onClose} aria-label="Cerrar">
            <X size={16} />
          </Button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-slate-700/50 px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}
