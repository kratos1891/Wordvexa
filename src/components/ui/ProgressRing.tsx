interface ProgressRingProps {
  value: number
  size?: number
  strokeWidth?: number
  label?: string
  color?: string
}

export function ProgressRing({ value, size = 80, strokeWidth = 6, label, color }: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  const ringColor =
    color ??
    (value >= 85 ? '#34d399' : value >= 65 ? '#60a5fa' : value >= 45 ? '#fbbf24' : '#f87171')

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none" stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-slate-700"
        />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          fill="none"
          stroke={ringColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.5s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-bold text-slate-100">{value}</span>
        {label && <span className="text-xs text-slate-500 leading-none">{label}</span>}
      </div>
    </div>
  )
}
