import { Wand2, Code, Minimize2, Shield, Palette, AlertTriangle, TestTube } from 'lucide-react'
import { Button } from '../ui/Button'
import { improvePrompt } from '../../services/promptGenerator'
import { useToast } from '../../hooks/useToast'

interface ImprovementButtonsProps {
  prompt: string
  onImproved: (improved: string) => void
  disabled?: boolean
}

const improvements = [
  { key: 'technical', label: 'Más técnico', icon: Code },
  { key: 'shorter', label: 'Más corto', icon: Minimize2 },
  { key: 'security', label: 'Agregar seguridad', icon: Shield },
  { key: 'design', label: 'Diseño profesional', icon: Palette },
  { key: 'errors', label: 'Manejo de errores', icon: AlertTriangle },
  { key: 'tests', label: 'Agregar pruebas', icon: TestTube },
] as const

export function ImprovementButtons({ prompt, onImproved, disabled }: ImprovementButtonsProps) {
  const toast = useToast()

  const handleImprove = (key: string) => {
    if (!prompt) {
      toast.error('Primero generá un prompt.')
      return
    }
    const improved = improvePrompt(prompt, key)
    onImproved(improved)
    toast.success('Prompt mejorado.')
  }

  return (
    <div className="space-y-2">
      <p className="flex items-center gap-1.5 text-xs font-medium text-slate-400 uppercase tracking-wider">
        <Wand2 size={12} /> Mejorar prompt
      </p>
      <div className="flex flex-wrap gap-2">
        {improvements.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant="outline"
            size="xs"
            disabled={disabled || !prompt}
            onClick={() => handleImprove(key)}
          >
            <Icon size={12} />
            {label}
          </Button>
        ))}
      </div>
    </div>
  )
}
