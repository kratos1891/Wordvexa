import { useState } from 'react'
import { Select } from '../ui/Select'
import { Textarea } from '../ui/Textarea'
import { Input } from '../ui/Input'
import { Button } from '../ui/Button'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { useHumanizerStore } from '../../stores/humanizerStore'
import { HUMANIZER_STYLES, REGIONAL_VARIANTS } from '../../data/tones'
import { humanizeText } from '../../services/textHumanizer'
import { useToast } from '../../hooks/useToast'
import type { HumanizerForm } from '../../types/textMode.types'
import { INPUT_LIMITS, isWithinLimit } from '../../utils/security'
import {
  Sparkles, Copy, RotateCcw, ArrowLeftRight,
  CheckCircle2, Shuffle, Zap, AlignLeft, Globe, Info,
} from 'lucide-react'

const TECHNIQUE_LABELS = [
  { icon: Shuffle, label: 'Perplejidad léxica', desc: 'Sinónimos inesperados y vocabulario variado' },
  { icon: Zap, label: 'Burstiness', desc: 'Mezcla de oraciones cortas y largas' },
  { icon: AlignLeft, label: 'Variación sintáctica', desc: 'Estructuras de oración diversas' },
  { icon: Globe, label: 'Adaptación regional', desc: 'Modismos y voseo según variante' },
]

export function HumanizerTool() {
  const { form, result, isProcessing, setField, setResult, setProcessing, reset } = useHumanizerStore()
  const toast = useToast()
  const [activeTab, setActiveTab] = useState<'original' | 'result'>('original')

  const handleHumanize = () => {
    if (!form.originalText.trim()) {
      toast.error('Pegá un texto para humanizar.')
      return
    }
    if (!isWithinLimit(form.originalText, INPUT_LIMITS.longText)) {
      toast.error(`El texto supera el limite de ${INPUT_LIMITS.longText.toLocaleString()} caracteres.`)
      return
    }
    setProcessing(true)
    setTimeout(() => {
      const r = humanizeText(form)
      setResult(r)
      setProcessing(false)
      setActiveTab('result')
      toast.success('¡Texto humanizado!')
    }, 700)
  }

  const handleCopyResult = async () => {
    if (!result?.humanizedText) return
    await navigator.clipboard.writeText(result.humanizedText)
    toast.success('Texto copiado al portapapeles.')
  }

  const handleReset = () => {
    reset()
    setActiveTab('original')
  }

  const updateConfigField = <K extends keyof HumanizerForm>(key: K, value: HumanizerForm[K]) => {
    const nextForm = { ...form, [key]: value }
    setField(key, value)

    if (result && nextForm.originalText.trim()) {
      setResult(humanizeText(nextForm))
      setActiveTab('result')
    }
  }

  const charOrig = form.originalText.length
  const charResult = result?.humanizedText.length ?? 0
  const wordOrig = form.originalText.trim() ? form.originalText.trim().split(/\s+/).length : 0
  const wordResult = result?.humanizedText.trim() ? result.humanizedText.trim().split(/\s+/).length : 0

  return (
    <div className="space-y-6">
      {/* Técnicas aplicadas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {TECHNIQUE_LABELS.map(({ icon: Icon, label, desc }) => (
          <Card key={label} padding="sm" className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Icon size={13} className="text-violet-400 shrink-0" />
              <span className="text-xs font-semibold text-slate-200">{label}</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
          </Card>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2.5 rounded-xl border border-slate-700/50 bg-slate-800/20 px-4 py-3">
        <Info size={14} className="text-slate-500 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-500 leading-relaxed">
          Este humanizador aplica técnicas lingüísticas reales (perplejidad léxica, burstiness, variación sintáctica)
          para mejorar la naturalidad del texto. No garantiza ni afirma superar detectores de IA como GPTZero,
          Turnitin u Originality.ai.
        </p>
      </div>

      {/* Config */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Select
          label="Estilo de humanización"
          placeholder="Elige un estilo"
          options={HUMANIZER_STYLES}
          value={form.style}
          onChange={(e) => updateConfigField('style', e.target.value as typeof form.style)}
        />
        <Select
          label="Variante regional"
          options={REGIONAL_VARIANTS}
          value={form.regionalVariant}
          onChange={(e) => updateConfigField('regionalVariant', e.target.value)}
        />
        <Input
          label="Expresiones a conservar"
          placeholder="expr1, frase2, ..."
          value={form.preservedExpressions}
          onChange={(e) => updateConfigField('preservedExpressions', e.target.value)}
          hint="Separá con comas"
        />
      </div>

      {/* Input area */}
      <Textarea
        label="Texto original"
        placeholder="Pegá aquí el texto que querés humanizar..."
        value={form.originalText}
        rows={9}
        maxLength={INPUT_LIMITS.longText}
        showCount
        onChange={(e) => setField('originalText', e.target.value)}
      />

      <div className="flex gap-3">
        <Button
          variant="primary"
          size="md"
          onClick={handleHumanize}
          disabled={isProcessing || !form.originalText.trim()}
          className="flex-1"
        >
          <Sparkles size={16} />
          {isProcessing ? 'Humanizando...' : 'Humanizar texto'}
        </Button>
        <Button variant="ghost" size="md" onClick={handleReset}>
          <RotateCcw size={16} /> Limpiar
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          {/* Stats bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5">
            <div className="flex items-center gap-2 text-emerald-400">
              <CheckCircle2 size={15} />
              <span className="text-sm font-medium">Humanización completada</span>
            </div>
            <div className="flex gap-4 text-xs text-slate-500">
              <span>
                Original: <strong className="text-slate-400">{wordOrig} pal.</strong>
              </span>
              <span>
                Resultado: <strong className="text-emerald-400">{wordResult} pal.</strong>
              </span>
              {charResult !== charOrig && (
                <span>
                  Δ {charResult > charOrig ? '+' : ''}{charResult - charOrig} car.
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 rounded-lg border border-slate-700 bg-slate-800/40 p-1 w-fit">
            {(['original', 'result'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                  activeTab === tab
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'original' ? 'Original' : 'Humanizado'}
              </button>
            ))}
          </div>

          {/* Side by side (desktop) / tab (mobile) */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-4">
            <TextPanel label="Original" text={form.originalText} muted />
            <TextPanel
              label="Humanizado"
              text={result.humanizedText}
              accent
              onCopy={handleCopyResult}
            />
          </div>

          {/* Mobile tabs */}
          <div className="lg:hidden">
            {activeTab === 'original' ? (
              <TextPanel label="Original" text={form.originalText} muted />
            ) : (
              <TextPanel
                label="Humanizado"
                text={result.humanizedText}
                accent
                onCopy={handleCopyResult}
              />
            )}
          </div>

          {/* Changes applied */}
          {result.changes.length > 0 && (
            <Card padding="md" className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Cambios aplicados ({result.changes.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {result.changes.map((change, i) => (
                  <Badge key={i} variant="emerald" size="sm">{change}</Badge>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

function TextPanel({
  label, text, muted, accent, onCopy,
}: {
  label: string
  text: string
  muted?: boolean
  accent?: boolean
  onCopy?: () => void
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className={`text-xs font-medium uppercase tracking-wider ${accent ? 'text-emerald-400' : 'text-slate-500'}`}>
          {accent && <ArrowLeftRight size={11} className="inline mr-1" />}
          {label}
        </p>
        {onCopy && (
          <Button variant="ghost" size="xs" onClick={onCopy}>
            <Copy size={12} /> Copiar
          </Button>
        )}
      </div>
      <div className={`rounded-xl border p-4 min-h-[200px] max-h-[400px] overflow-y-auto ${
        accent
          ? 'border-emerald-500/25 bg-emerald-500/5'
          : 'border-slate-700/50 bg-slate-900/40'
      }`}>
        <p className={`text-sm whitespace-pre-wrap leading-relaxed ${
          muted ? 'text-slate-400' : 'text-slate-100'
        }`}>
          {text}
        </p>
      </div>
    </div>
  )
}
