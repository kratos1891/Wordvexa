import { Sparkles } from 'lucide-react'
import { HumanizerTool } from '../components/humanizer/HumanizerTool'

export function HumanizerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-emerald-500/20 p-2">
          <Sparkles size={20} className="text-emerald-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100">Humanizador de texto</h1>
          <p className="text-sm text-slate-500">Transforma textos robóticos en textos naturales y fluidos</p>
        </div>
      </div>
      <HumanizerTool />
    </div>
  )
}
