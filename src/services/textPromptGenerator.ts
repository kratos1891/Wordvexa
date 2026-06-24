import type { TextModeForm } from '../types/textMode.types'

const workTypeRole: Record<string, string> = {
  'Crear texto desde cero': 'un redactor profesional creativo con amplia experiencia en escritura persuasiva y clara',
  'Mejorar texto': 'un editor experto en mejora y optimización de textos manteniendo la voz del autor',
  'Corregir ortografía': 'un corrector ortográfico y gramatical experto en la lengua española',
  'Resumir': 'un analista experto en síntesis y creación de resúmenes ejecutivos claros y precisos',
  'Expandir': 'un escritor experto en desarrollar y ampliar ideas con profundidad y coherencia',
  'Simplificar': 'un comunicador experto en hacer textos complejos accesibles para cualquier audiencia',
  'Cambiar tono': 'un escritor versátil capaz de adaptar cualquier texto al tono y estilo requerido',
  'Reescribir': 'un redactor creativo experto en reescribir textos con perspectiva fresca sin perder el mensaje',
  'Traducir': 'un traductor profesional bilingüe con conocimiento profundo de matices culturales',
  'Humanizar texto': 'un redactor especializado en hacer textos más naturales, fluidos y humanos',
  'Crear historia': 'un escritor creativo narrativo con experiencia en construcción de mundos y personajes',
  'Crear guion': 'un guionista profesional con experiencia en escritura para cine, teatro y medios digitales',
  'Crear publicación para redes sociales': 'un experto en marketing de contenidos y redes sociales',
  'Crear correo electrónico': 'un comunicador corporativo especializado en redacción de emails efectivos',
  'Crear trabajo académico': 'un académico e investigador con experiencia en redacción universitaria formal',
}

export function generateTextPrompt(form: TextModeForm): string {
  const role = workTypeRole[form.workType] ?? 'un redactor profesional experto'

  const sections: string[] = []

  sections.push(`Actúa como ${role}.`)
  sections.push('')

  sections.push(`## Tarea principal`)
  sections.push(form.workType ? `**${form.workType}**` : 'Procesá el siguiente texto.')
  sections.push('')

  if (form.textContent) {
    sections.push(`## Texto a trabajar`)
    sections.push(form.textContent)
    sections.push('')
  }

  const config: string[] = []
  if (form.language || form.regionalVariant) {
    config.push(`- Idioma/variante: ${form.regionalVariant || form.language}`)
  }
  if (form.tone) config.push(`- Tono: ${form.tone}`)
  if (form.length) config.push(`- Extensión: ${form.length}`)
  if (form.vocabularyLevel) config.push(`- Nivel de vocabulario: ${form.vocabularyLevel}`)
  if (form.targetAudience) config.push(`- Público objetivo: ${form.targetAudience}`)
  if (form.platform) config.push(`- Plataforma de publicación: ${form.platform}`)

  if (config.length > 0) {
    sections.push(`## Parámetros`)
    sections.push(...config)
    sections.push('')
  }

  if (form.objective) {
    sections.push(`## Objetivo del texto`)
    sections.push(form.objective)
    sections.push('')
  }

  if (form.requiredInfo) {
    sections.push(`## Información obligatoria a incluir`)
    sections.push(form.requiredInfo)
    sections.push('')
  }

  const constraints: string[] = []
  if (form.wordsToKeep) constraints.push(`- Palabras/frases que DEBEN mantenerse: ${form.wordsToKeep}`)
  if (form.wordsToAvoid) constraints.push(`- Palabras/frases que DEBEN evitarse: ${form.wordsToAvoid}`)

  if (constraints.length > 0) {
    sections.push(`## Restricciones de vocabulario`)
    sections.push(...constraints)
    sections.push('')
  }

  sections.push(`## Reglas de calidad`)
  sections.push(`- Mantené la coherencia y cohesión en todo el texto`)
  sections.push(`- Usá conectores y transiciones fluidas`)
  sections.push(`- Evitá repeticiones innecesarias`)
  sections.push(`- Respetá la gramática y ortografía del ${form.regionalVariant || 'español'}`)
  sections.push(`- No inventés información que no esté en el contexto proporcionado`)
  sections.push('')

  if (form.outputFormat) {
    sections.push(`## Formato de salida`)
    sections.push(form.outputFormat)
  } else {
    sections.push(`## Formato de salida`)
    sections.push(`Entregá el texto final listo para usar, sin explicaciones adicionales a menos que se soliciten.`)
  }

  return sections.join('\n')
}
