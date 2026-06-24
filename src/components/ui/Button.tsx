import { type ButtonHTMLAttributes, forwardRef } from 'react'
import { clsx } from '../../utils/clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const variants = {
  primary:
    'brand-gradient text-white shadow-lg hover:opacity-90 hover:shadow-[0_0_20px_rgba(139,47,255,0.4)] border-0',
  secondary:
    'bg-slate-700 hover:bg-slate-600 text-slate-100',
  ghost:
    'hover:bg-slate-700/60 text-slate-300 hover:text-white',
  danger:
    'bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-600/30 hover:border-red-600',
  outline:
    'border border-slate-600 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10',
}

const sizes = {
  xs: 'px-2 py-1 text-xs gap-1',
  sm: 'px-3 py-1.5 text-sm gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-base gap-2',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'secondary', size = 'md', className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      className={clsx(
        'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150',
        'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:ring-offset-2 focus:ring-offset-slate-900',
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)

Button.displayName = 'Button'
