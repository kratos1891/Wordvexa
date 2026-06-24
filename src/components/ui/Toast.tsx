import { CheckCircle, XCircle, Info, X } from 'lucide-react'
import { useAppStore, type Toast } from '../../stores/appStore'

const icons = {
  success: <CheckCircle size={16} className="text-emerald-400 shrink-0" />,
  error: <XCircle size={16} className="text-red-400 shrink-0" />,
  info: <Info size={16} className="text-blue-400 shrink-0" />,
}

const styles = {
  success: 'border-emerald-500/30 bg-emerald-500/10',
  error: 'border-red-500/30 bg-red-500/10',
  info: 'border-blue-500/30 bg-blue-500/10',
}

function ToastItem({ toast }: { toast: Toast }) {
  const removeToast = useAppStore((s) => s.removeToast)
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm text-slate-100 shadow-xl backdrop-blur-sm animate-slide-up ${styles[toast.type]}`}
      role="alert"
    >
      {icons[toast.type]}
      <span className="flex-1">{toast.message}</span>
      <button
        onClick={() => removeToast(toast.id)}
        className="shrink-0 text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="Cerrar notificación"
      >
        <X size={14} />
      </button>
    </div>
  )
}

export function ToastContainer() {
  const toasts = useAppStore((s) => s.toasts)
  if (toasts.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80">
      {toasts.map((t) => <ToastItem key={t.id} toast={t} />)}
    </div>
  )
}
