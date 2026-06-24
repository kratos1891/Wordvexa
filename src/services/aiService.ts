/**
 * AI Service — stub para futura integración con APIs de IA.
 *
 * Para activar un proveedor:
 * 1. Instalá el SDK correspondiente (openai, @anthropic-ai/sdk, @google/generative-ai)
 * 2. Creá un archivo .env.local con las claves:
 *    VITE_OPENAI_API_KEY=sk-...
 *    VITE_ANTHROPIC_API_KEY=sk-ant-...
 *    VITE_GEMINI_API_KEY=...
 * 3. Implementá el proveedor correspondiente abajo
 * 4. Cambiá el activeProvider
 */

export type AIProviderName = 'openai' | 'anthropic' | 'gemini' | 'ollama' | 'none'

export interface AIOptions {
  temperature?: number
  maxTokens?: number
  model?: string
}

export interface AIProvider {
  name: AIProviderName
  isAvailable: () => boolean
  generatePrompt: (input: string, options?: AIOptions) => Promise<string>
  improvePrompt: (prompt: string, instruction: string, options?: AIOptions) => Promise<string>
  humanizeText: (text: string, style: string, variant: string, options?: AIOptions) => Promise<string>
}

// ─── Proveedor nulo (modo sin IA) ──────────────────────────────────────────
const noneProvider: AIProvider = {
  name: 'none',
  isAvailable: () => false,
  generatePrompt: async () => {
    throw new Error('No hay un proveedor de IA configurado. La app usa generación basada en reglas.')
  },
  improvePrompt: async () => {
    throw new Error('No hay un proveedor de IA configurado.')
  },
  humanizeText: async () => {
    throw new Error('No hay un proveedor de IA configurado.')
  },
}

// ─── Proveedor OpenAI (descomenta cuando tengas la key) ───────────────────
// import OpenAI from 'openai'
// const openaiProvider: AIProvider = {
//   name: 'openai',
//   isAvailable: () => !!import.meta.env.VITE_OPENAI_API_KEY,
//   generatePrompt: async (input, options = {}) => {
//     const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
//     const res = await client.chat.completions.create({
//       model: options.model ?? 'gpt-4o',
//       messages: [
//         { role: 'system', content: 'Eres un experto en creación de prompts para IA. Genera prompts detallados y profesionales.' },
//         { role: 'user', content: input },
//       ],
//       temperature: options.temperature ?? 0.7,
//       max_tokens: options.maxTokens ?? 2000,
//     })
//     return res.choices[0]?.message?.content ?? ''
//   },
//   improvePrompt: async (prompt, instruction, options = {}) => {
//     const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
//     const res = await client.chat.completions.create({
//       model: options.model ?? 'gpt-4o',
//       messages: [
//         { role: 'system', content: `Mejora el siguiente prompt según esta instrucción: ${instruction}. Mantén el formato y agrega las secciones necesarias.` },
//         { role: 'user', content: prompt },
//       ],
//       temperature: 0.5,
//       max_tokens: options.maxTokens ?? 2000,
//     })
//     return res.choices[0]?.message?.content ?? prompt
//   },
//   humanizeText: async (text, style, variant, options = {}) => {
//     const client = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true })
//     const res = await client.chat.completions.create({
//       model: options.model ?? 'gpt-4o',
//       messages: [
//         { role: 'system', content: `Humaniza el siguiente texto para que suene ${style}. Variante del idioma: ${variant}. Mantén el significado original.` },
//         { role: 'user', content: text },
//       ],
//       temperature: 0.8,
//       max_tokens: options.maxTokens ?? 3000,
//     })
//     return res.choices[0]?.message?.content ?? text
//   },
// }

// ─── Proveedor Anthropic (descomenta cuando tengas la key) ────────────────
// import Anthropic from '@anthropic-ai/sdk'
// const anthropicProvider: AIProvider = { ... }

// ─── Configuración activa ─────────────────────────────────────────────────
export const activeProvider: AIProvider = noneProvider

export function isAIAvailable(): boolean {
  return activeProvider.isAvailable()
}
