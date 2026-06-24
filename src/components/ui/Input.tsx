import { type InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from '../../utils/clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-lg border bg-slate-800/60 px-3 py-2 text-sm text-slate-100 placeholder-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent',
            'transition-colors duration-150',
            error ? 'border-red-500' : 'border-slate-600 hover:border-slate-500',
            className
          )}
          {...props}
        />
        {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Input.displayName = 'Input'
