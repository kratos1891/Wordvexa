import { Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { HistoryCard } from '../components/history/HistoryCard'
import { EmptyState } from '../components/ui/EmptyState'
import { useHistoryStore } from '../stores/historyStore'

export function FavoritesPage() {
  const navigate = useNavigate()
  const prompts = useHistoryStore((s) => s.prompts)
  const favorites = prompts.filter((p) => p.favorite)

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-lg bg-amber-500/20 p-2">
          <Star size={20} className="text-amber-400" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-100">Favoritos</h1>
          <p className="text-sm text-slate-500">{favorites.length} prompt{favorites.length !== 1 ? 's' : ''} guardado{favorites.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {favorites.length === 0 ? (
        <EmptyState
          icon={<Star size={32} />}
          title="Sin favoritos aún"
          description="Marcá prompts con la estrella para encontrarlos rápido aquí."
          action={{ label: 'Ver historial', onClick: () => navigate('/history') }}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((p) => <HistoryCard key={p.id} prompt={p} />)}
        </div>
      )}
    </div>
  )
}
