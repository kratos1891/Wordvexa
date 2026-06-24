export const INPUT_LIMITS = {
  shortText: 1000,
  mediumText: 8000,
  longText: 20000,
  codeText: 30000,
} as const

export function isWithinLimit(value: string, limit: number): boolean {
  return value.length <= limit
}
