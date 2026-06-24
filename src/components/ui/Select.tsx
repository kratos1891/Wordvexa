import { type SelectHTMLAttributes, forwardRef } from 'react'
import { clsx } from '../../utils/clsx'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  hint?: string
  placeholder?: string
  options: string[] | { value: string; label: string }[]
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, hint, placeholder, options, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const normalized = options.map((o) =>
      typeof o === 'string' ? { value: o, label: o } : o
    )

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full rounded-lg border bg-slate-800/60 px-3 py-2 text-sm text-slate-100',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent',
            'transition-colors duration-150 appearance-none cursor-pointer',
            error ? 'border-red-500' : 'border-slate-600 hover:border-slate-500',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="bg-slate-800 text-slate-400">{placeholder}</option>
          )}
          {normalized.map((o) => (
            <option key={o.value} value={o.value} className="bg-slate-800 text-slate-100">
              {o.label}
            </option>
          ))}
        </select>
        {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'
