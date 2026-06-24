import type { ReactNode } from 'react'
import { Button } from './Button'

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description: string
  action?: { label: string; onClick: () => void }
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="mb-4 rounded-2xl bg-slate-800/50 p-5 text-slate-500">{icon}</div>
      <h3 className="mb-2 text-base font-semibold text-slate-300">{title}</h3>
      <p className="mb-6 max-w-xs text-sm text-slate-500">{description}</p>
      {action && (
        <Button variant="primary" size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  )
}
