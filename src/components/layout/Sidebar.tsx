import { NavLink } from 'react-router-dom'
import {
  Home, Code2, Type, LayoutTemplate, Settings, Sparkles,
} from 'lucide-react'
import { clsx } from '../../utils/clsx'

const nav = [
  { to: '/',           label: 'Inicio',        icon: Home,          end: true },
  { to: '/code',       label: 'Modo Código',   icon: Code2 },
  { to: '/text',       label: 'Modo Texto',    icon: Type },
  { to: '/humanizer',  label: 'Humanizador',   icon: Sparkles },
  { to: '/templates',  label: 'Plantillas',    icon: LayoutTemplate },
  { to: '/settings',   label: 'Configuración', icon: Settings },
]

interface SidebarProps {
  mobile?: boolean
  onClose?: () => void
}

export function Sidebar({ mobile, onClose }: SidebarProps) {
  return (
    <aside className={clsx(
      'flex h-full w-60 flex-col border-r border-slate-700/50 bg-slate-900',
      mobile && 'fixed inset-y-0 left-0 z-40 shadow-2xl'
    )}>
      {/* ── Logo ── */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-2.5">
          {/* Wordvexa icon — chat bubble with sparkle + I */}
          <div className="relative h-9 w-9 shrink-0 brand-glow rounded-xl overflow-hidden">
            <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
              <defs>
                <linearGradient id="wv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%"   stopColor="#1EC8FF"/>
                  <stop offset="100%" stopColor="#8B2FFF"/>
                </linearGradient>
              </defs>
              <rect width="36" height="36" rx="9" fill="url(#wv-bg)"/>
              {/* chat bubble */}
              <path
                d="M6 10C6 7.8 7.8 6 10 6H26C28.2 6 30 7.8 30 10V21C30 23.2 28.2 25 26 25H20L16 30V25H10C7.8 25 6 23.2 6 21Z"
                fill="white" opacity="0.95"
              />
              {/* sparkle */}
              <path
                d="M14 17.5L15.2 14L16.4 17.5L20 18.5L16.4 19.5L15.2 23L14 19.5L10.5 18.5Z"
                fill="#6B10FF" opacity="0.9"
              />
              {/* letter I */}
              <text x="21" y="22" fontFamily="Georgia,serif" fontSize="8" fontWeight="bold" fill="#4B10E8" opacity="0.9">I</text>
            </svg>
          </div>

          <div>
            <span className="text-sm font-bold tracking-tight brand-gradient-text">Wordvexa</span>
            <span className="block text-[10px] text-slate-500 leading-none">v1.0 · Telyux</span>
          </div>
        </div>

        {mobile && onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 transition-colors"
            aria-label="Cerrar menú"
          >
            ✕
          </button>
        )}
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Navegación principal">
        {nav.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={mobile ? onClose : undefined}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white border border-cyan-500/25 shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={16} className={isActive ? 'text-brand-cyan' : ''} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div className="border-t border-slate-700/50 px-4 py-3 space-y-0.5">
        <p className="text-[11px] text-slate-500 text-center">
          © 2025 Telyux Software Development
        </p>
        <p className="text-[10px] text-slate-600 text-center">Todos los derechos reservados</p>
      </div>
    </aside>
  )
}
