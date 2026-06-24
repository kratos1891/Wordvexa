import { ProgressRing } from '../ui/ProgressRing'
import { getQualityLabel } from '../../services/qualityAnalyzer'
import type { QualityScore } from '../../types/prompt.types'
import { AlertCircle, CheckCircle } from 'lucide-react'

interface QualityIndicatorProps {
  score: QualityScore
}

const criteria = [
  { key: 'clarity', label: 'Claridad', max: 20 },
  { key: 'context', label: 'Contexto', max: 15 },
  { key: 'detail', label: 'Detalle', max: 20 },
  { key: 'objective', label: 'Objetivo', max: 15 },
  { key: 'restrictions', label: 'Restricciones', max: 10 },
  { key: 'format', label: 'Formato', max: 10 },
  { key: 'audience', label: 'Audiencia', max: 10 },
] as const

export function QualityIndicator({ score }: QualityIndicatorProps) {
  const { label } = getQualityLabel(score.total)

  return (
    <div className="rounded-xl border border-slate-700/50 bg-slate-800/30 p-4 space-y-4">
      <div className="flex items-center gap-4">
        <ProgressRing value={score.total} size={72} />
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-wider">Calidad del prompt</p>
          <p className="text-lg font-bold text-slate-100">{label}</p>
          <p className="text-xs text-slate-500">{score.total}/100 puntos</p>
        </div>
      </div>

      {/* Criteria breakdown */}
      <div className="space-y-2">
        {criteria.map(({ key, label, max }) => {
          const val = score[key]
          const pct = (val / max) * 100
          return (
            <div key={key} className="flex items-center gap-2">
              <span className="w-24 text-xs text-slate-500 shrink-0">{label}</span>
              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${pct}%`,
                    backgroundColor: pct >= 80 ? '#34d399' : pct >= 50 ? '#60a5fa' : '#fbbf24',
                  }}
                />
              </div>
              <span className="text-xs text-slate-500 w-10 text-right shrink-0">
                {val}/{max}
              </span>
            </div>
          )
        })}
      </div>

      {/* Suggestions */}
      {score.suggestions.length > 0 && (
        <div className="space-y-1.5 pt-1 border-t border-slate-700/50">
          <p className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
            <AlertCircle size={12} /> Sugerencias para mejorar
          </p>
          <ul className="space-y-1">
            {score.suggestions.slice(0, 4).map((s, i) => (
              <li key={i} className="text-xs text-slate-500 flex items-start gap-1.5">
                <span className="shrink-0 mt-0.5 text-amber-500">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {score.total >= 85 && (
        <p className="flex items-center gap-1.5 text-xs text-emerald-400">
          <CheckCircle size={12} /> ¡Excelente prompt! Está listo para usar.
        </p>
      )}
    </div>
  )
}
