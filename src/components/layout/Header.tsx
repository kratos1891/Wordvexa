import { Menu, Sun, Moon } from 'lucide-react'
import { useAppStore } from '../../stores/appStore'
import { Button } from '../ui/Button'

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useAppStore()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-slate-400 hover:text-white transition-colors"
          onClick={onMenuClick}
          aria-label="Abrir menú"
        >
          <Menu size={20} />
        </button>
        {/* Brand name visible on mobile where sidebar is hidden */}
        <span className="lg:hidden text-sm font-bold brand-gradient-text">Wordvexa</span>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </Button>
      </div>
    </header>
  )
}
