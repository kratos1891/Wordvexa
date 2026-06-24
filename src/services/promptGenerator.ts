import type { CodeModeForm } from '../types/codeMode.types'

const roleByLevel: Record<string, string> = {
  Principiante: 'un desarrollador senior paciente y didáctico, experto en explicar conceptos de forma clara y simple',
  Intermedio: 'un desarrollador senior con amplia experiencia en proyectos del mundo real',
  Avanzado: 'un arquitecto de software senior con profundo conocimiento técnico y buenas prácticas de la industria',
}

const resultInstruction: Record<string, string> = {
  'Código completo': 'Entregá el código completo, funcional y listo para usar. No omitas ninguna parte.',
  'Explicación paso a paso': 'Explicá el proceso paso a paso con código funcional en cada etapa.',
  'Solo corregir errores': 'Identificá y corregí todos los errores. Explicá cada corrección realizada.',
  'Mejorar código existente': 'Mejorá el código manteniendo toda la funcionalidad existente. Explicá cada mejora.',
  'Crear estructura del proyecto': 'Creá la estructura completa del proyecto con todos los archivos y carpetas necesarios.',
  'Agregar una funcionalidad': 'Implementá la funcionalidad solicitada sin modificar las existentes.',
  'Revisar seguridad': 'Identificá todas las vulnerabilidades de seguridad y proporcioná las correcciones.',
  'Optimizar rendimiento': 'Analizá y optimizá el rendimiento del código con métricas antes/después.',
}

export function generateCodePrompt(form: CodeModeForm): string {
  const level = form.userLevel || 'Intermedio'
  const role = roleByLevel[level] ?? roleByLevel.Intermedio

  const tech = [form.language, form.framework].filter(Boolean).join(' con ')

  const sections: string[] = []

  sections.push(`Actúa como ${role}.`)
  sections.push('')

  sections.push(`## Objetivo principal`)
  sections.push(
    form.expectedResult
      ? resultInstruction[form.expectedResult] ?? `Resultado esperado: ${form.expectedResult}.`
      : 'Ayudame a desarrollar el siguiente proyecto.'
  )
  sections.push('')

  if (form.description) {
    sections.push(`## Descripción del proyecto`)
    sections.push(form.description)
    sections.push('')
  }

  if (form.projectType || tech) {
    sections.push(`## Contexto tecnológico`)
    if (form.projectType) sections.push(`- Tipo de proyecto: ${form.projectType}`)
    if (form.language) sections.push(`- Lenguaje: ${form.language}`)
    if (form.framework) sections.push(`- Framework/Tecnología: ${form.framework}`)
    if (form.userLevel) sections.push(`- Nivel del desarrollador: ${form.userLevel}`)
    sections.push('')
  }

  if (form.features) {
    sections.push(`## Funcionalidades requeridas`)
    sections.push(form.features)
    sections.push('')
  }

  if (form.technicalRequirements) {
    sections.push(`## Requisitos técnicos`)
    sections.push(form.technicalRequirements)
    sections.push('')
  }

  if (form.existingCode) {
    sections.push(`## Código existente`)
    const lang = form.language?.toLowerCase().replace(/[/#\s]/g, '') || ''
    sections.push(`\`\`\`${lang}`)
    sections.push(form.existingCode)
    sections.push('```')
    sections.push('')
  }

  if (form.currentErrors) {
    sections.push(`## Errores actuales`)
    sections.push(form.currentErrors)
    sections.push('')
  }

  if (form.desiredDesign) {
    sections.push(`## Diseño deseado`)
    sections.push(form.desiredDesign)
    sections.push('')
  }

  sections.push(`## Reglas de calidad obligatorias`)
  sections.push(`- Escribí código limpio, bien estructurado y fácilmente mantenible`)
  sections.push(`- Implementá manejo de errores en todas las operaciones críticas`)
  sections.push(`- Aplicá principios de seguridad: validación de inputs, sanitización, protección contra inyecciones`)
  sections.push(`- El código debe ser responsive y compatible con dispositivos móviles (si aplica)`)
  sections.push(`- Seguí las mejores prácticas y convenciones del lenguaje/framework`)
  sections.push(`- Optimizá el rendimiento y evitá operaciones innecesarias`)
  sections.push(`- Aplicá accesibilidad básica (ARIA labels, roles semánticos) si hay interfaz visual`)
  sections.push('')

  if (form.restrictions) {
    sections.push(`## Restricciones`)
    sections.push(form.restrictions)
    sections.push('')
  }

  if (form.responseFormat) {
    sections.push(`## Formato de respuesta`)
    sections.push(form.responseFormat)
    sections.push('')
  }

  sections.push(`## Instrucciones de entrega`)
  sections.push(`- **No elimines ninguna función o funcionalidad existente** bajo ninguna circunstancia`)
  sections.push(`- Entregá los archivos completos, no fragmentos parciales`)
  sections.push(`- Indicá claramente el nombre y la ruta de cada archivo`)
  sections.push(`- Si hay múltiples archivos, especificá el orden de creación`)
  sections.push(`- Incluí instrucciones de instalación y ejecución si son necesarias`)

  if (form.additionalInfo) {
    sections.push('')
    sections.push(`## Información adicional`)
    sections.push(form.additionalInfo)
  }

  return sections.join('\n')
}

export function improvePrompt(prompt: string, instruction: string): string {
  const additions: Record<string, string> = {
    technical: `\n\n## Especificaciones técnicas adicionales\n- Implementá patrones de diseño apropiados (Factory, Observer, Repository según aplique)\n- Usá tipado estricto en todo el código\n- Documentá todas las funciones públicas con JSDoc/docstrings\n- Implementá logging adecuado para debugging y monitoreo\n- Considerá la escalabilidad horizontal de la solución`,

    shorter: '', // handled below

    security: `\n\n## Requisitos de seguridad avanzados\n- Implementá autenticación y autorización robusta\n- Sanitizá y validá TODOS los inputs del usuario\n- Protegé contra: SQL Injection, XSS, CSRF, Path Traversal\n- Implementá rate limiting y protección contra fuerza bruta\n- Encriptá datos sensibles en reposo y en tránsito\n- Generá logs de auditoría para acciones críticas\n- Aplicá el principio de mínimo privilegio`,

    design: `\n\n## Requisitos de diseño profesional\n- Aplicá un sistema de diseño consistente con variables CSS/tokens\n- Implementá modo oscuro y modo claro\n- Usá animaciones y transiciones suaves (no más de 300ms)\n- Asegurate de que el contraste cumpla WCAG AA (4.5:1 mínimo)\n- Diseñá con mobile-first: breakpoints sm (640px), md (768px), lg (1024px), xl (1280px)\n- Implementá skeleton loaders para estados de carga\n- Agregá micro-interacciones en elementos interactivos`,

    errors: `\n\n## Manejo de errores exhaustivo\n- Implementá un sistema centralizado de manejo de errores\n- Mostrá mensajes de error amigables al usuario (no mensajes técnicos)\n- Registrá errores con contexto suficiente para debugging\n- Implementá retry logic para operaciones de red\n- Manejá estados de loading, error y vacío en la UI\n- Validá datos tanto en el frontend como en el backend\n- Implementá circuit breaker para servicios externos`,

    tests: `\n\n## Suite de pruebas requerida\n- Tests unitarios para toda la lógica de negocio (cobertura mínima 80%)\n- Tests de integración para las APIs y base de datos\n- Tests end-to-end para los flujos principales del usuario\n- Tests de regresión para los bugs corregidos\n- Mocks para dependencias externas\n- Describe claramente qué testea cada test y por qué`,
  }

  if (instruction === 'shorter') {
    const lines = prompt.split('\n').filter((l) => l.trim())
    const core = lines.slice(0, Math.ceil(lines.length * 0.6)).join('\n')
    return `${core}\n\n_Sé conciso. Priorizá la información esencial sobre la exhaustividad._`
  }

  const extra = additions[instruction]
  return extra ? `${prompt}${extra}` : prompt
}
