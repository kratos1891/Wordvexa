import { type TextareaHTMLAttributes, forwardRef } from 'react'
import { clsx } from '../../utils/clsx'

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  hint?: string
  showCount?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, hint, showCount, className, id, value, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    const charCount = typeof value === 'string' ? value.length : 0
    const wordCount = typeof value === 'string' ? value.trim().split(/\s+/).filter(Boolean).length : 0

    return (
      <div className="flex flex-col gap-1.5">
        {(label || showCount) && (
          <div className="flex items-center justify-between">
            {label && (
              <label htmlFor={inputId} className="text-sm font-medium text-slate-300">
                {label}
              </label>
            )}
            {showCount && charCount > 0 && (
              <span className="text-xs text-slate-500">
                {charCount.toLocaleString()} car. · {wordCount.toLocaleString()} pal.
              </span>
            )}
          </div>
        )}
        <textarea
          ref={ref}
          id={inputId}
          value={value}
          className={clsx(
            'w-full rounded-lg border bg-slate-800/60 px-3 py-2.5 text-sm text-slate-100 placeholder-slate-500',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent',
            'transition-colors duration-150 resize-y min-h-[80px]',
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

Textarea.displayName = 'Textarea'
