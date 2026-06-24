import type { SavedPrompt } from '../types/prompt.types'
import type { ExportFormat } from '../types/history.types'

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[áàäâ]/g, 'a').replace(/[éèëê]/g, 'e')
    .replace(/[íìïî]/g, 'i').replace(/[óòöô]/g, 'o')
    .replace(/[úùüû]/g, 'u').replace(/ñ/g, 'n')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    .slice(0, 50)
}

export function exportPrompt(prompt: SavedPrompt, format: ExportFormat) {
  const filename = slugify(prompt.title) || 'prompt'
  const date = new Date(prompt.createdAt).toLocaleDateString('es-UY')

  switch (format) {
    case 'txt':
      downloadFile(
        `${prompt.title}\n${'='.repeat(prompt.title.length)}\nCreado: ${date}\nModo: ${prompt.mode === 'code' ? 'Código' : 'Texto'}\n\n${prompt.content}`,
        `${filename}.txt`,
        'text/plain;charset=utf-8'
      )
      break

    case 'md':
      downloadFile(
        `# ${prompt.title}\n\n> **Modo:** ${prompt.mode === 'code' ? 'Código' : 'Texto'} | **Creado:** ${date}\n\n${prompt.content}`,
        `${filename}.md`,
        'text/markdown;charset=utf-8'
      )
      break

    case 'json':
      downloadFile(
        JSON.stringify(prompt, null, 2),
        `${filename}.json`,
        'application/json'
      )
      break
  }
}

export function exportMultiple(prompts: SavedPrompt[], format: ExportFormat) {
  if (format === 'json') {
    downloadFile(JSON.stringify(prompts, null, 2), 'promptforge-export.json', 'application/json')
    return
  }
  prompts.forEach((p) => exportPrompt(p, format))
}

export function importFromJSON(jsonString: string): SavedPrompt[] {
  const data = JSON.parse(jsonString)
  const list = Array.isArray(data) ? data : [data]
  return list.filter(
    (item): item is SavedPrompt =>
      typeof item.id === 'string' &&
      typeof item.title === 'string' &&
      typeof item.content === 'string'
  )
}
