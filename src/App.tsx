import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { MainLayout } from './components/layout/MainLayout'
import { HomePage } from './pages/HomePage'
import { CodeModePage } from './pages/CodeModePage'
import { TextModePage } from './pages/TextModePage'
import { HumanizerPage } from './pages/HumanizerPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { SettingsPage } from './pages/SettingsPage'
import { useAppStore } from './stores/appStore'

function ThemeInitializer() {
  const theme = useAppStore((s) => s.theme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.classList.toggle('light', theme === 'light')
  }, [theme])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeInitializer />
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/code" element={<CodeModePage />} />
          <Route path="/text" element={<TextModePage />} />
          <Route path="/humanizer" element={<HumanizerPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
