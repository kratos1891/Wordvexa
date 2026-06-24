import type { ReactNode, HTMLAttributes } from 'react'
import { clsx } from '../../utils/clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hover?: boolean
}

export function Card({ children, padding = 'md', hover = false, className, ...props }: CardProps) {
  const paddings = { none: '', sm: 'p-3', md: 'p-4', lg: 'p-6' }
  return (
    <div
      className={clsx(
        'rounded-xl border border-slate-700/50 bg-slate-800/40 backdrop-blur-sm',
        hover && 'hover:border-slate-600 hover:bg-slate-800/60 transition-all duration-150 cursor-pointer',
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
