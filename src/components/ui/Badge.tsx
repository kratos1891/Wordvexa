import type { ReactNode } from 'react'
import { clsx } from '../../utils/clsx'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'violet' | 'emerald' | 'amber' | 'red' | 'blue'
  size?: 'sm' | 'md'
  onRemove?: () => void
  className?: string
}

const variants = {
  default: 'bg-slate-700/60 text-slate-300 border border-slate-600/50',
  violet: 'bg-violet-500/20 text-violet-300 border border-violet-500/30',
  emerald: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
  amber: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
  red: 'bg-red-500/20 text-red-300 border border-red-500/30',
  blue: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
}

export function Badge({ children, variant = 'default', size = 'sm', onRemove, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1 rounded-full font-medium',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        variants[variant],
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-0.5 hover:text-white transition-colors"
          aria-label="Eliminar etiqueta"
        >
          ×
        </button>
      )}
    </span>
  )
}
