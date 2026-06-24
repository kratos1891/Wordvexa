import { useNavigate } from 'react-router-dom'
import { Code2, Type, Sparkles, LayoutTemplate, Clock, Star, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { useHistoryStore } from '../stores/historyStore'

const features = [
  {
    to: '/code',
    icon: Code2,
    title: 'Modo Código',
    description: 'Crea prompts para programación: páginas web, APIs, apps, corrección de errores y más.',
    iconClass: 'text-cyan-400',
    bgClass: 'bg-cyan-500/10 border-cyan-500/20',
  },
  {
    to: '/text',
    icon: Type,
    title: 'Modo Texto',
    description: 'Genera prompts para escritura, marketing, redes sociales, correos y trabajos académicos.',
    iconClass: 'text-purple-400',
    bgClass: 'bg-purple-500/10 border-purple-500/20',
  },
  {
    to: '/humanizer',
    icon: Sparkles,
    title: 'Humanizador',
    description: 'Transforma textos robóticos en textos naturales, fluidos y humanos.',
    iconClass: 'text-emerald-400',
    bgClass: 'bg-emerald-500/10 border-emerald-500/20',
  },
  {
    to: '/templates',
    icon: LayoutTemplate,
    title: 'Plantillas',
    description: '14 plantillas profesionales listas para usar: desde código hasta marketing.',
    iconClass: 'text-amber-400',
    bgClass: 'bg-amber-500/10 border-amber-500/20',
  },
]

export function HomePage() {
  const navigate = useNavigate()
  const prompts = useHistoryStore((s) => s.prompts)
  const favorites = prompts.filter((p) => p.favorite)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">

      {/* ── Hero ── */}
      <div className="text-center space-y-5 py-6">
        {/* Logo badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-2xl border border-cyan-500/25 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-5 py-2">
            <svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6">
              <defs>
                <linearGradient id="hero-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#1EC8FF"/>
                  <stop offset="100%" stopColor="#8B2FFF"/>
                </linearGradient>
              </defs>
              <rect width="28" height="28" rx="7" fill="url(#hero-bg)"/>
              <path d="M5 8C5 6.3 6.3 5 8 5H20C21.7 5 23 6.3 23 8V16.5C23 18.2 21.7 19.5 20 19.5H15.5L12.5 23V19.5H8C6.3 19.5 5 18.2 5 16.5Z" fill="white" opacity="0.95"/>
              <path d="M10.5 13.5L11.5 11L12.5 13.5L15 14.5L12.5 15.5L11.5 18L10.5 15.5L8 14.5Z" fill="#6B10FF" opacity="0.9"/>
              <text x="16" y="17.5" fontFamily="Georgia,serif" fontSize="6" fontWeight="bold" fill="#4B10E8" opacity="0.9">I</text>
            </svg>
            <span className="text-sm font-semibold brand-gradient-text">Wordvexa</span>
          </div>
        </div>

        <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
          Prompts profesionales<br/>
          <span className="brand-gradient-text">en segundos</span>
        </h1>
        <p className="text-lg text-slate-400 max-w-xl mx-auto leading-relaxed">
          Transforma tus ideas en prompts claros, detallados y listos para usar en ChatGPT, Claude, Gemini y más.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          <Button variant="primary" size="lg" onClick={() => navigate('/code')}>
            <Code2 size={18} /> Crear prompt de código
          </Button>
          <Button variant="outline" size="lg" onClick={() => navigate('/text')}>
            <Type size={18} /> Crear prompt de texto
          </Button>
        </div>
      </div>

      {/* ── Stats ── */}
      {prompts.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Sparkles, label: 'Prompts creados', value: prompts.length,   to: '/history',   color: 'text-cyan-400' },
            { icon: Star,     label: 'Favoritos',       value: favorites.length,  to: '/favorites', color: 'text-amber-400' },
            { icon: Clock,    label: 'Recientes',       value: Math.min(prompts.length, 5), to: '/history', color: 'text-purple-400' },
          ].map(({ icon: Icon, label, value, to, color }) => (
            <Card key={label} hover className="text-center cursor-pointer" onClick={() => navigate(to)}>
              <Icon size={20} className={`${color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-xs text-slate-500">{label}</p>
            </Card>
          ))}
        </div>
      )}

      {/* ── Features ── */}
      <div>
        <h2 className="text-lg font-semibold text-slate-200 mb-4">¿Qué podés hacer?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map(({ to, icon: Icon, title, description, iconClass, bgClass }) => (
            <Card key={to} hover className={`border ${bgClass} cursor-pointer`} onClick={() => navigate(to)}>
              <div className="flex items-start gap-3">
                <div className={`rounded-lg p-2.5 ${bgClass}`}>
                  <Icon size={20} className={iconClass} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-slate-100 mb-1">{title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{description}</p>
                </div>
                <ArrowRight size={16} className="text-slate-600 shrink-0 mt-1" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Recent ── */}
      {prompts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-200">Prompts recientes</h2>
            <Button variant="ghost" size="sm" onClick={() => navigate('/history')}>
              Ver todos <ArrowRight size={14} />
            </Button>
          </div>
          <div className="space-y-2">
            {prompts.slice(0, 3).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-lg border border-slate-700/50 bg-slate-800/20 px-4 py-3 hover:bg-slate-800/40 transition-colors cursor-pointer"
                onClick={() => navigate('/history')}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`rounded-md p-1.5 ${p.mode === 'code' ? 'bg-cyan-500/15' : 'bg-purple-500/15'}`}>
                    {p.mode === 'code'
                      ? <Code2 size={13} className="text-cyan-400" />
                      : <Type   size={13} className="text-purple-400" />}
                  </div>
                  <span className="text-sm text-slate-300 truncate">{p.title}</span>
                </div>
                <span className="text-xs text-slate-600 shrink-0 ml-3">
                  {new Date(p.createdAt).toLocaleDateString('es-UY')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Copyright ── */}
      <p className="text-center text-xs text-slate-700 pb-2">
        © 2025 Telyux Software Development · Todos los derechos reservados
      </p>
    </div>
  )
}
