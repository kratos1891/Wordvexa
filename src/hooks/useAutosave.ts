import { useEffect, useRef } from 'react'

export function useAutosave<T>(value: T, onSave: (value: T) => void, delay = 800) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => onSave(value), delay)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [value, delay, onSave])
}
