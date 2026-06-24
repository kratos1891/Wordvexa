/**
 * AI Service stub.
 *
 * Security rule: never expose provider API keys in the browser. Variables that
 * start with VITE_ are bundled into client-side code and can be read by users.
 *
 * To integrate an external AI provider safely, create a small backend/proxy
 * endpoint that stores the API key server-side, authenticates requests, applies
 * rate limits, validates input size, and returns only the generated result.
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

const missingProviderMessage =
  'No hay un proveedor de IA configurado. Wordvexa funciona localmente con reglas; conecta un backend seguro para usar IA externa.'

const noneProvider: AIProvider = {
  name: 'none',
  isAvailable: () => false,
  generatePrompt: async () => {
    throw new Error(missingProviderMessage)
  },
  improvePrompt: async () => {
    throw new Error(missingProviderMessage)
  },
  humanizeText: async () => {
    throw new Error(missingProviderMessage)
  },
}

export const activeProvider: AIProvider = noneProvider

export function isAIAvailable(): boolean {
  return activeProvider.isAvailable()
}
