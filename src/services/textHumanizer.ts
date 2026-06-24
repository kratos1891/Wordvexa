import type {
  HumanizerForm,
  HumanizerResult,
  HumanizerStats,
  DiffSegment,
} from '../types/textMode.types'

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function splitSentences(text: string): string[] {
  return text.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) ?? [text]
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function countWords(t: string): number {
  return t.trim() ? t.trim().split(/\s+/).length : 0
}

// ─── Keyword protection ───────────────────────────────────────────────────────

function protectKeywords(
  text: string,
  keywords: string[]
): { result: string; map: Map<string, string> } {
  const map = new Map<string, string>()
  let result = text
  let i = 0
  for (const kw of keywords) {
    if (!kw) continue
    const placeholder = `__KW${i}__`
    const regex = new RegExp(escapeRegex(kw), 'gi')
    if (regex.test(result)) {
      result = result.replace(regex, placeholder)
      map.set(placeholder, kw)
      i++
    }
  }
  return { result, map }
}

function restoreKeywords(text: string, map: Map<string, string>): string {
  let result = text
  for (const [placeholder, keyword] of map) {
    result = result.replace(new RegExp(escapeRegex(placeholder), 'g'), keyword)
  }
  return result
}

// ─── Diccionario léxico ───────────────────────────────────────────────────────

const LEXICAL_MAP: Record<string, string[]> = {
  'una herramienta clave': ['un recurso esencial', 'una alternativa eficaz'],
  'una herramienta fundamental': ['un recurso básico', 'una herramienta de base'],
  'una herramienta importante': ['un recurso valioso', 'una alternativa útil'],
  'una herramienta': ['un recurso', 'una alternativa'],
  'la herramienta': ['el recurso', 'la alternativa'],
  'las herramientas': ['los recursos', 'las alternativas'],
  'la productividad y la eficiencia': ['el rendimiento y la efectividad'],
  'la eficiencia y la productividad': ['la efectividad y el rendimiento'],
  'la eficiencia': ['la efectividad', 'el desempeño'],
  'la productividad': ['la capacidad', 'la efectividad'],
  'los desafíos': ['los obstáculos', 'las dificultades', 'los problemas'],
  'los retos': ['los obstáculos', 'las dificultades'],
  'un futuro': ['un horizonte', 'un porvenir', 'un escenario'],
  'el futuro': ['el horizonte', 'lo que viene', 'el porvenir'],
  'una oportunidad única': ['una chance real', 'una posibilidad concreta'],
  'una oportunidad': ['una chance', 'una posibilidad', 'una ventana'],
  'la oportunidad': ['la chance', 'la posibilidad'],
  'en conclusión': ['total', 'al fin y al cabo', 'para cerrar', 'dicho esto'],
  'en primer lugar': ['antes que nada', 'para empezar', 'lo primero'],
  'en segundo lugar': ['además de eso', 'por otro lado', 'tampoco hay que olvidar'],
  'en tercer lugar': ['a esto se suma', 'otro punto que importa'],
  'en resumen': ['en pocas palabras', 'a grandes rasgos', 'total que'],
  'cabe destacar que': ['vale la pena notar que', 'llama la atención que', 'hay que resaltar que'],
  'cabe mencionar que': ['también hay que decir que', 'vale aclarar que'],
  'es importante destacar': ['importa resaltar', 'hay que subrayar', 'no es menor que'],
  'es importante mencionar': ['también hay que notar', 'vale la pena decir'],
  'es importante tener en cuenta': ['conviene tener presente', 'hay que considerar'],
  'en este sentido': ['en ese marco', 'desde esa óptica', 'visto así'],
  'con respecto a': ['sobre', 'en cuanto a', 'hablando de'],
  'en relación a': ['respecto de', 'en torno a'],
  'a través de': ['mediante', 'usando', 'por medio de'],
  'sin lugar a dudas': ['sin dudas', 'está claro', 'no hay vuelta que darle'],
  'de igual manera': ['del mismo modo', 'igual', 'de la misma forma'],
  'llevar a cabo': ['hacer', 'concretar', 'sacar adelante'],
  'hacer uso de': ['usar', 'valerse de', 'echar mano de'],
  'no obstante': ['igual', 'aun así', 'eso sí', 'pero bueno'],
  'sin embargo': ['pero', 'igual', 'aunque', 'eso sí', 'ahora bien'],
  'asimismo': ['también', 'igualmente'],
  'por consiguiente': ['por eso', 'entonces', 'así que'],
  'adicionalmente': ['además', 'encima de eso', 'sumado a eso'],
  'en consecuencia': ['entonces', 'por eso', 'de ahí que'],
  'actualmente': ['hoy', 'hoy en día', 'ahora mismo'],
  'en la actualidad': ['hoy en día', 'ahora mismo', 'a esta altura'],
  'recientemente': ['hace poco', 'no hace mucho', 'últimamente'],
  'indudablemente': ['sin dudas', 'está claro', 'es evidente'],
  'de esta manera': ['así', 'de este modo', 'así las cosas'],
  'en definitiva': ['al final', 'en el fondo', 'total'],
  'dado que': ['ya que', 'porque', 'visto que'],
  'debido a': ['por', 'a causa de'],
  'con el fin de': ['para', 'buscando', 'con la idea de'],
  'con el objetivo de': ['para', 'buscando', 'apuntando a'],
  'con la finalidad de': ['para', 'con el fin de'],
  'a fin de': ['para', 'con la idea de'],
  'en términos de': ['en cuanto a', 'sobre'],
  'por otro lado': ['pero también', 'eso sí', 'aunque'],
  'de igual forma': ['del mismo modo', 'igual'],
  'es decir': ['o sea', 'dicho de otro modo'],
  'en otras palabras': ['dicho de otro modo', 'o sea', 'básicamente'],
  'a nivel general': ['en términos generales', 'por lo general', 'en el fondo'],
  'utilizar': ['usar', 'echar mano de', 'recurrir a', 'valerse de'],
  'implementar': ['aplicar', 'poner en práctica', 'llevar adelante'],
  'desarrollar': ['construir', 'elaborar', 'armar', 'trabajar en'],
  'realizar': ['hacer', 'concretar', 'ejecutar'],
  'demostrar': ['mostrar', 'evidenciar', 'dejar en claro'],
  'proporcionar': ['dar', 'ofrecer', 'brindar'],
  'obtener': ['conseguir', 'lograr', 'alcanzar'],
  'establecer': ['fijar', 'definir', 'determinar'],
  'identificar': ['detectar', 'reconocer', 'notar'],
  'permitir': ['dejar', 'posibilitar', 'hacer posible'],
  'garantizar': ['asegurar', 'confirmar'],
  'transformar': ['cambiar', 'alterar', 'modificar'],
  'optimizar': ['mejorar', 'afinar'],
  'generar': ['crear', 'producir', 'dar lugar a'],
  'consolidar': ['afianzar', 'fortalecer', 'asentar'],
  'interactuar': ['relacionarse', 'conectar', 'vincularse'],
  'analizar': ['estudiar', 'revisar', 'mirar de cerca'],
  'representar': ['ser', 'significar'],
  'evidenciar': ['mostrar', 'dejar en claro', 'revelar'],
  'destacar': ['resaltar', 'subrayar', 'señalar'],
  'señalar': ['apuntar', 'indicar', 'notar'],
  'importante': ['relevante', 'clave', 'de peso'],
  'fundamental': ['esencial', 'básico', 'clave'],
  'significativo': ['notable', 'relevante', 'de peso'],
  'eficiente': ['efectivo', 'que da resultados'],
  'innovadoras': ['novedosas', 'creativas', 'originales'],
  'innovador': ['novedoso', 'creativo', 'original'],
  'responsable': ['consciente', 'sensato'],
  'sostenible': ['viable', 'duradero'],
  'sostenibles': ['viables', 'duraderos'],
  'estratégica': ['planificada', 'pensada'],
  'estratégico': ['planificado', 'pensado'],
  'adecuado': ['apropiado', 'correcto'],
  'específico': ['concreto', 'puntual'],
  'diversas': ['varias', 'distintas'],
  'diversos': ['varios', 'distintos'],
  'numerosas': ['muchas', 'varias'],
  'numerosos': ['muchos', 'varios'],
  'centrada en las necesidades del ser humano': ['pensando en las personas', 'con foco en la gente'],
  'centrado en las necesidades del ser humano': ['pensando en las personas', 'con foco en la gente'],
  'del ser humano': ['de las personas', 'de la gente'],
  'el ser humano': ['las personas', 'la gente'],
  'grandes volúmenes de información': ['enormes cantidades de datos', 'montones de datos'],
  'grandes volúmenes de datos': ['enormes cantidades de datos', 'montones de información'],
  'de manera responsable': ['con responsabilidad', 'con cabeza'],
  'de forma responsable': ['con responsabilidad', 'con cuidado'],
  'de manera estratégica': ['con criterio', 'pensándolo bien'],
  'de forma eficiente': ['de forma efectiva', 'con buenos resultados'],
  'es insuficiente': ['deja bastante que desear', 'no alcanza'],
  'resulta insuficiente': ['deja bastante que desear', 'no alcanza'],
  'está ausente': ['brilla por su ausencia'],
  'están ausentes': ['brillan por su ausencia'],
  'es escasa': ['brilla por su ausencia'],
  'es escaso': ['brilla por su ausencia'],
  'es urgente': ['no puede esperar', 'urge'],
  'especialmente': ['sobre todo', 'en particular'],
  'principalmente': ['sobre todo', 'antes que nada'],
  'claramente': ['está claro', 'queda claro'],
  'evidentemente': ['está claro', 'es evidente'],
  'probablemente': ['seguramente', 'a lo mejor', 'lo más probable es que'],
  'generalmente': ['por lo general', 'la mayoría de las veces'],
  'siempre que': ['con la condición de que', 'siempre y cuando'],
}

// ─── Mode options ─────────────────────────────────────────────────────────────

interface ModeOpts {
  applyAIRemoval: boolean
  applyLexical: boolean
  applyYPero: boolean
  applySemicolons: boolean
  applyHedging: boolean
  applyRhetoricalQ: boolean
  applyParentheticals: boolean
  applyRestructure: boolean
  applyBurstiness: boolean
  burstinessThreshold: number
  applyPersonalVoice: boolean
  applyConcise: boolean
  style: string
  regionalVariant: string
  protectedKeywords: string[]
  avoidExpressions: string[]
}

function getModeOpts(form: HumanizerForm): ModeOpts {
  const cs = form.customSettings
  const pkw = cs.protectedKeywords.split(',').map((k) => k.trim()).filter(Boolean)
  const avoid = cs.avoidExpressions.split(',').map((k) => k.trim()).filter(Boolean)
  const reg = cs.regionalVariant

  switch (form.mode) {
    case 'natural':
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: true,
        applySemicolons: true, applyHedging: true, applyRhetoricalQ: false,
        applyParentheticals: true, applyRestructure: true,
        applyBurstiness: true, burstinessThreshold: 28,
        applyPersonalVoice: false, applyConcise: false,
        style: 'Más natural', regionalVariant: reg,
        protectedKeywords: pkw, avoidExpressions: avoid,
      }
    case 'academico':
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: false,
        applySemicolons: true, applyHedging: false, applyRhetoricalQ: false,
        applyParentheticals: true, applyRestructure: false,
        applyBurstiness: true, burstinessThreshold: 38,
        applyPersonalVoice: false, applyConcise: false,
        style: 'Más académico', regionalVariant: reg,
        protectedKeywords: pkw, avoidExpressions: avoid,
      }
    case 'profesional':
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: false,
        applySemicolons: true, applyHedging: false, applyRhetoricalQ: false,
        applyParentheticals: false, applyRestructure: false,
        applyBurstiness: true, burstinessThreshold: 35,
        applyPersonalVoice: false, applyConcise: false,
        style: 'Más profesional', regionalVariant: reg,
        protectedKeywords: pkw, avoidExpressions: avoid,
      }
    case 'conversacional':
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: true,
        applySemicolons: false, applyHedging: true, applyRhetoricalQ: true,
        applyParentheticals: true, applyRestructure: true,
        applyBurstiness: true, burstinessThreshold: 25,
        applyPersonalVoice: true, applyConcise: false,
        style: 'Más cercano', regionalVariant: reg,
        protectedKeywords: pkw, avoidExpressions: avoid,
      }
    case 'creativo':
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: true,
        applySemicolons: true, applyHedging: true, applyRhetoricalQ: true,
        applyParentheticals: true, applyRestructure: true,
        applyBurstiness: true, burstinessThreshold: 22,
        applyPersonalVoice: true, applyConcise: false,
        style: 'Más informal', regionalVariant: reg,
        protectedKeywords: pkw, avoidExpressions: avoid,
      }
    case 'conciso':
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: false,
        applySemicolons: false, applyHedging: false, applyRhetoricalQ: false,
        applyParentheticals: false, applyRestructure: true,
        applyBurstiness: true, burstinessThreshold: 22,
        applyPersonalVoice: false, applyConcise: true,
        style: 'Directo', regionalVariant: reg,
        protectedKeywords: pkw, avoidExpressions: avoid,
      }
    case 'personalizado': {
      const formal = cs.formalityLevel
      const variation = cs.sentenceVariation
      const creative = cs.creativityLevel
      return {
        applyAIRemoval: true,
        applyLexical: true,
        applyYPero: variation >= 3 && formal <= 3,
        applySemicolons: formal >= 3,
        applyHedging: formal <= 2 || creative >= 4,
        applyRhetoricalQ: creative >= 4 && formal <= 3,
        applyParentheticals: variation >= 3,
        applyRestructure: variation >= 3,
        applyBurstiness: variation >= 2,
        burstinessThreshold: variation >= 4 ? 22 : variation >= 3 ? 28 : 35,
        applyPersonalVoice: cs.usePOV === 'first' || creative >= 4,
        applyConcise: cs.lengthPreference === 'shorter',
        style: formal >= 4 ? 'Más profesional' : formal <= 2 ? 'Más cercano' : 'Más natural',
        regionalVariant: reg,
        protectedKeywords: pkw,
        avoidExpressions: avoid,
      }
    }
    default:
      return {
        applyAIRemoval: true, applyLexical: true, applyYPero: true,
        applySemicolons: true, applyHedging: true, applyRhetoricalQ: false,
        applyParentheticals: true, applyRestructure: true,
        applyBurstiness: true, burstinessThreshold: 28,
        applyPersonalVoice: false, applyConcise: false,
        style: 'Más natural', regionalVariant: 'Español (neutro)',
        protectedKeywords: [], avoidExpressions: [],
      }
  }
}

// ─── 1. Eliminar patrones IA ──────────────────────────────────────────────────
function removeAIPatterns(text: string): { result: string; changes: string[] } {
  let result = text
  const changes: string[] = []

  const listPattern = /(?:Primero[,:]|En primer lugar[,:])\s*([^.!?]+[.!?])\s*(?:Segundo[,:]|En segundo lugar[,:])\s*([^.!?]+[.!?])/gi
  if (listPattern.test(result)) {
    result = result.replace(listPattern, (_m, p1, p2) =>
      `${p1.trim()} Además, ${p2.trim().charAt(0).toLowerCase()}${p2.trim().slice(1)}`
    )
    changes.push('Convertida estructura de lista en prosa')
  }

  result = result.replace(/^En conclusión[,:]?\s*/gim, 'Total, ')
  result = result.replace(/^Para concluir[,:]?\s*/gim, 'Al final, ')
  result = result.replace(/^En síntesis[,:]?\s*/gim, 'En pocas palabras, ')
  result = result.replace(/^En definitiva[,:]?\s*/gim, 'Al fin y al cabo, ')
  result = result.replace(/^Finalmente[,:]?\s*/gim, 'Para cerrar, ')
  result = result.replace(/^Por último[,:]?\s*/gim, 'Y por último, ')

  const excCount = (result.match(/!/g) ?? []).length
  if (excCount > 3) {
    let replaced = 0
    result = result.replace(/!/g, (m) => (replaced++ < excCount - 2 ? '.' : m))
    changes.push('Reducidos los signos de exclamación')
  }

  result = result.replace(/\bEs fundamental que\b/gi, 'Hace falta que')
  result = result.replace(/\bEs esencial que\b/gi, 'Es clave que')
  result = result.replace(/\bEs necesario que\b/gi, 'Hace falta que')
  result = result.replace(/\bEs importante que\b/gi, 'Conviene que')
  result = result.replace(/\bResulta imprescindible\b/gi, 'Hace falta')
  result = result.replace(/\btambién resulta esencial\b/gi, 'también hace falta')
  result = result.replace(/\btambién resulta fundamental\b/gi, 'también importa')
  result = result.replace(/\btambién resulta importante\b/gi, 'también vale la pena')

  result = result.replace(/\bse ha consolidado como\b/gi, 'se convirtió en')
  result = result.replace(/\bse ha posicionado como\b/gi, 'se volvió')
  result = result.replace(/\bse ha convertido en\b/gi, 'se volvió')
  result = result.replace(/\bha permitido\b/gi, 'permitió')
  result = result.replace(/\bha generado\b/gi, 'generó')
  result = result.replace(/\bha demostrado\b/gi, 'demostró')
  result = result.replace(/\bha posibilitado\b/gi, 'posibilitó')
  result = result.replace(/\bha facilitado\b/gi, 'facilitó')
  result = result.replace(/\bha contribuido\b/gi, 'contribuyó')
  result = result.replace(/\bha transformado\b/gi, 'transformó')
  result = result.replace(/\bha mejorado\b/gi, 'mejoró')

  if (changes.length > 0) changes.push('Eliminados patrones lingüísticos predecibles')
  return { result, changes }
}

// ─── 2. Modo conciso ──────────────────────────────────────────────────────────
function applyConciseMode(text: string): { result: string; changes: string[] } {
  let result = text
  const fillers: [RegExp, string][] = [
    [/\b(?:de hecho),?\s*/gi, ''],
    [/\b(?:básicamente),?\s*/gi, ''],
    [/\b(?:en términos generales),?\s*/gi, ''],
    [/\b(?:por supuesto),?\s*/gi, ''],
    [/\b(?:cabe (?:aclarar|destacar|mencionar) que\s*)/gi, ''],
    [/\b(?:vale la pena (?:señalar|aclarar|notar) que\s*)/gi, ''],
    [/\b(?:resulta (?:evidente|claro|obvio) que\s*)/gi, ''],
    [/\b(?:se puede (?:observar|ver|notar) que\s*)/gi, ''],
    [/\b(?:es (?:preciso|necesario) (?:señalar|destacar|mencionar) que\s*)/gi, ''],
    [/\b(?:en el contexto de\s+)/gi, 'En '],
    [/\b(?:en materia de\s+)/gi, 'sobre '],
    [/\b(?:tal y como se mencionó),?\s*/gi, ''],
  ]

  const before = result
  for (const [pattern, replacement] of fillers) {
    result = result.replace(pattern, replacement)
  }

  result = result.replace(/  +/g, ' ').replace(/\s+([.!?,])/g, '$1').trim()

  return {
    result,
    changes: result !== before ? ['Eliminadas frases de relleno (modo conciso)'] : [],
  }
}

// ─── 3. Sustitución léxica ────────────────────────────────────────────────────
function applyLexicalSubstitution(text: string, seed: number): { result: string; changes: string[] } {
  let result = text
  let count = 0

  const entries = Object.entries(LEXICAL_MAP).sort((a, b) => b[0].length - a[0].length)

  for (const [original, alternatives] of entries) {
    const regex = new RegExp(escapeRegex(original), 'gi')
    if (!regex.test(result)) continue

    let matchIndex = 0
    result = result.replace(new RegExp(escapeRegex(original), 'gi'), (match, offset: number) => {
      const idx = (seed + offset + matchIndex++ + original.length) % alternatives.length
      const replacement = alternatives[idx]
      if (match.charAt(0) !== match.charAt(0).toLowerCase()) {
        return capitalize(replacement)
      }
      return replacement
    })
    count++
  }

  return { result, changes: count > 0 ? [`${count} sustituciones léxicas aplicadas`] : [] }
}

// ─── 4. Inicios con Y / Pero ──────────────────────────────────────────────────
function injectYPeroStarters(text: string): { result: string; changes: string[] } {
  const replacements: [RegExp, string][] = [
    [/\.\s+Además,\s+/g, '. Y además, '],
    [/\.\s+También\s+/g, '. Y también '],
    [/\.\s+También,\s+/g, '. Y también, '],
    [/\.\s+Incluso\s+/g, '. Y encima '],
    [/\.\s+Sin embargo,\s+/g, '. Pero '],
    [/\.\s+No obstante,\s+/g, '. Pero '],
    [/\.\s+Aun así,\s+/g, '. Pero igual, '],
    [/\.\s+Ahora bien,\s+/g, '. Pero '],
    [/\.\s+Eso sí,\s+/g, '. Y eso sí, '],
    [/\.\s+De hecho,\s+/g, '. Y de hecho, '],
    [/\.\s+Encima,\s+/g, '. Y encima, '],
  ]

  let result = text
  let applied = 0

  for (const [pattern, replacement] of replacements) {
    if (applied >= 2) break
    if (pattern.test(result)) {
      result = result.replace(pattern, replacement)
      applied++
    }
  }

  if (applied === 0) return { result: text, changes: [] }
  return { result, changes: ['Inicios de oración con Y/Pero (patrón altamente humano)'] }
}

// ─── 5. Punto y coma ─────────────────────────────────────────────────────────
function injectSemicolons(text: string): { result: string; changes: string[] } {
  const triggers: [RegExp, string][] = [
    [/\.\s+(Hace falta\s)/g, '; $1'],
    [/\.\s+(Hay que\s)/g, '; $1'],
    [/\.\s+(No alcanza\s)/g, '; $1'],
    [/\.\s+(Conviene\s)/g, '; $1'],
  ]

  let result = text
  let applied = 0

  for (const [pattern] of triggers) {
    if (applied >= 1) break
    if (pattern.test(result)) {
      result = result.replace(pattern, (_m, g1) => {
        applied++
        return '; ' + g1.charAt(0).toLowerCase() + g1.slice(1)
      })
    }
  }

  if (applied === 0) return { result: text, changes: [] }
  return { result, changes: ['Añadido punto y coma (infrecuente en texto IA)'] }
}

// ─── 6. Hedging ───────────────────────────────────────────────────────────────
function injectHedging(text: string): { result: string; changes: string[] } {
  const sentences = splitSentences(text)
  if (sentences.length < 3) return { result: text, changes: [] }

  const prefixes = [
    'Creo que ', 'Me parece que ', 'Al menos en principio, ',
    'A mi modo de ver, ', 'Diría que ', 'Parecería que ',
    'Por lo que entiendo, ', 'En cierta forma, ',
  ]

  const appends = [
    ', o al menos eso parece',
    ', aunque no siempre es tan simple',
    ', si bien hay matices',
    ', aunque depende del contexto',
    ', que no es poca cosa',
    ', más o menos',
  ]

  const modified = [...sentences]
  let applied = 0

  for (let i = 1; i < modified.length && applied < 2; i += 3) {
    const s = modified[i].trim()
    if (s.length < 35 || s.startsWith('¿') || s.startsWith('Y ') || s.startsWith('Pero ')) continue
    if (s.match(/^(Creo|Me parece|Al menos|A mi|Diría|Parecería|Por lo|En cierta)/i)) continue

    if (i % 2 === 0) {
      const prefix = prefixes[(i + text.length) % prefixes.length]
      modified[i] = prefix + s.charAt(0).toLowerCase() + s.slice(1)
    } else {
      const ending = s.replace(/[.!?]$/, '')
      const punct = s.match(/[.!?]$/)?.[0] ?? '.'
      const append = appends[(i + text.length) % appends.length]
      modified[i] = ending + append + punct
    }
    applied++
  }

  if (applied === 0) return { result: text, changes: [] }
  return {
    result: modified.map((s) => s.trim()).filter(Boolean).join(' '),
    changes: [`Añadidas ${applied} frases de matiz/incertidumbre`],
  }
}

// ─── 7. Preguntas retóricas ───────────────────────────────────────────────────
function injectRhetoricalQuestions(text: string): { result: string; changes: string[] } {
  const paragraphs = text.split(/\n{2,}/)
  if (paragraphs.length < 2) return { result: text, changes: [] }

  const inserts = [
    '¿Y eso qué significa? Que ',
    '¿Por qué importa esto? Porque ',
    '¿Cuál es el punto? ',
    '¿Vale la pena pensarlo? Sin dudas. ',
    '¿Qué cambia con esto? Bastante. ',
  ]

  const targetIdx = Math.min(1, paragraphs.length - 1)
  const target = paragraphs[targetIdx]
  if (target.length < 30) return { result: text, changes: [] }

  const insert = inserts[text.length % inserts.length]
  const lower = target.charAt(0).toLowerCase() + target.slice(1)
  paragraphs[targetIdx] = insert + lower

  return {
    result: paragraphs.join('\n\n'),
    changes: ['Añadida pregunta retórica'],
  }
}

// ─── 8. Incisos entre comas ───────────────────────────────────────────────────
function injectParentheticalCommas(text: string): { result: string; changes: string[] } {
  const insertions = [
    ', entre otras cosas,',
    ', en general,',
    ', en cierta medida,',
    ', al menos en parte,',
    ', en muchos casos,',
    ', por lo general,',
  ]

  const sentences = splitSentences(text)
  const modified = [...sentences]
  let applied = 0

  for (let i = 0; i < modified.length && applied < 1; i++) {
    const s = modified[i]
    const words = s.split(/\s+/)
    if (words.length < 18 || s.includes(':') || s.startsWith('Y ') || s.startsWith('Pero ')) continue

    let wordCount = 0
    let insertPos = -1

    for (let j = 0; j < s.length; j++) {
      if (s[j] === ' ') wordCount++
      if (s[j] === ',' && wordCount >= 2 && wordCount <= 5) {
        insertPos = j + 1
        break
      }
    }

    if (insertPos > 0) {
      const insert = insertions[(i + text.length) % insertions.length]
      modified[i] = s.slice(0, insertPos) + insert + s.slice(insertPos)
      applied++
    }
  }

  if (applied === 0) return { result: text, changes: [] }
  return {
    result: modified.map((s) => s.trim()).join(' '),
    changes: ['Añadido inciso entre comas'],
  }
}

// ─── 9. Reestructuración de párrafos ─────────────────────────────────────────
function restructureParagraphs(text: string): { result: string; changes: string[] } {
  const paragraphs = text.split(/\n{2,}/)
  const result: string[] = []
  let applied = false

  const breakConnectors = /^(Sin embargo|Pero |Aunque|No obstante|Ahora bien|Eso sí|Y ahí|Y con eso|Y acá)/i

  for (const para of paragraphs) {
    if (!para.trim()) { result.push(para); continue }

    const sentences = splitSentences(para)
    if (sentences.length < 4) { result.push(para); continue }

    let breakIdx = -1
    for (let i = 1; i < sentences.length - 1; i++) {
      if (breakConnectors.test(sentences[i].trim())) {
        breakIdx = i
        break
      }
    }

    if (breakIdx > 0) {
      const part1 = sentences.slice(0, breakIdx).map((s) => s.trim()).join(' ')
      const part2 = sentences.slice(breakIdx).map((s) => s.trim()).join(' ')
      result.push(part1)
      result.push(part2)
      applied = true
    } else {
      result.push(para)
    }
  }

  return {
    result: result.join('\n\n'),
    changes: applied ? ['Párrafos reestructurados para mayor variación'] : [],
  }
}

// ─── 10. Burstiness ──────────────────────────────────────────────────────────
function applyBurstiness(text: string, threshold = 28): { result: string; changes: string[] } {
  const emphasisPool = [
    'No es poco.',
    'La diferencia existe.',
    'Vale la pena pensarlo.',
    'No es casualidad.',
    'Hay que tenerlo en cuenta.',
    'Es una realidad.',
    'Así son las cosas.',
    'No hay vuelta que darle.',
    'Es lo que hay.',
    'Y funciona.',
    'No está mal.',
    'Algo cambia.',
  ]

  const paragraphs = text.split(/\n{2,}/)
  const modified: string[] = []
  let applied = false

  for (let pIdx = 0; pIdx < paragraphs.length; pIdx++) {
    const para = paragraphs[pIdx]
    if (!para.trim()) { modified.push(para); continue }

    const sentences = splitSentences(para)
    const result: string[] = []

    for (const s of sentences) {
      const trimmed = s.trim()
      if (!trimmed) continue
      const wordCount = trimmed.split(/\s+/).length

      if (wordCount > threshold) {
        const split = splitLongSentence(trimmed)
        if (split) {
          result.push(split[0])
          result.push(split[1])
          applied = true
          continue
        }
      }
      result.push(trimmed)
    }

    if (result.length >= 3 && pIdx < paragraphs.length - 1) {
      const emphIdx = (pIdx + para.length) % emphasisPool.length
      result.push(emphasisPool[emphIdx])
      applied = true
    }

    modified.push(result.join(' ').trim())
  }

  return {
    result: modified.join('\n\n'),
    changes: applied ? ['Variación de longitud de oraciones aplicada (burstiness)'] : [],
  }
}

function splitLongSentence(s: string): [string, string] | null {
  const words = s.split(/\s+/)
  const mid = Math.floor(words.length / 2)
  const safeConjunctions = new Set(['aunque', 'pero', 'pues', 'porque'])

  for (let radius = 0; radius <= 8; radius++) {
    for (const offset of [radius, -radius]) {
      const idx = mid + offset
      if (idx <= 2 || idx >= words.length - 2) continue
      const raw = words[idx].toLowerCase()
      const word = raw.replace(/^[,;]+|[,;]+$/g, '')
      if (safeConjunctions.has(word)) {
        const part1 = words.slice(0, idx).join(' ').replace(/[,;]+$/, '') + '.'
        const part2 = capitalize(words.slice(idx).join(' '))
        return [part1, part2.match(/[.!?]$/) ? part2 : part2 + '.']
      }
    }
  }

  if (words.length > 35) {
    let bestComma = -1
    let bestDist = Infinity
    let wordsSoFar = 0

    for (let i = 0; i < s.length; i++) {
      if (s[i] === ' ') wordsSoFar++
      if (s[i] === ',' && wordsSoFar > 5 && wordsSoFar < words.length - 5) {
        const dist = Math.abs(wordsSoFar - mid)
        if (dist < bestDist) { bestDist = dist; bestComma = i }
      }
    }

    if (bestComma > 0) {
      const part1 = s.slice(0, bestComma) + '.'
      const part2 = capitalize(s.slice(bestComma + 1).trim())
      return [part1, part2.match(/[.!?]$/) ? part2 : part2 + '.']
    }
  }

  return null
}

// ─── 11. Variación sintáctica ─────────────────────────────────────────────────
function applySyntacticVariation(text: string, style: string): { result: string; changes: string[] } {
  let result = text
  const changes: string[] = []

  if (style === 'Más juvenil' || style === 'Más informal' || style === 'Más cercano') {
    result = result.replace(/\bno obstante\b/gi, 'igual')
    result = result.replace(/\bes decir\b/gi, 'o sea')
    result = result.replace(/\bsin embargo\b/gi, 'pero bueno')
    changes.push('Adaptado a registro informal y cercano')
  }

  if (style === 'Directo' || style === 'Más fácil de entender') {
    result = result.replace(/\bse puede observar que\b/gi, 'vemos que')
    result = result.replace(/\bes posible afirmar que\b/gi, '')
    result = result.replace(/\bcabe señalar que\b/gi, '')
    result = result.replace(/  +/g, ' ').trim()
    changes.push('Simplificado el lenguaje para mayor claridad')
  }

  if (style === 'Más profesional') {
    result = result.replace(/\bmontón\b/gi, 'gran cantidad')
    result = result.replace(/\bbueno\b/gi, 'positivo')
    changes.push('Adaptado a registro profesional')
  }

  return { result, changes }
}

// ─── 12. Voz personal ────────────────────────────────────────────────────────
function addPersonalVoice(text: string, style: string): { result: string; changes: string[] } {
  if (!['Más natural', 'Más cercano', 'Más informal', 'Más emocional'].includes(style)) {
    return { result: text, changes: [] }
  }

  const introductions = [
    'Dicho esto, ', 'A decir verdad, ', 'Sinceramente, ',
    'Personalmente creo que ', 'Mirándolo bien, ',
    'Lo que está claro es que ', 'Y hay algo que no se puede ignorar: ',
  ]

  const paragraphs = text.split(/\n{2,}/)
  if (paragraphs.length < 2) return { result: text, changes: [] }

  const idx = text.length % introductions.length
  const intro = introductions[idx]
  const p = paragraphs[1]
  paragraphs[1] = intro + p.charAt(0).toLowerCase() + p.slice(1)

  return {
    result: paragraphs.join('\n\n'),
    changes: [`Añadida voz personal (${intro.trim()})`],
  }
}

// ─── 13. Adaptación regional ──────────────────────────────────────────────────
function applyRegionalVariant(text: string, variant: string): { result: string; changes: string[] } {
  let result = text
  const changes: string[] = []

  if (variant.includes('Uruguay') || variant.includes('Argentina')) {
    const voseoMap: [RegExp, string][] = [
      [/\bpuedes\b/g, 'podés'], [/\btienes\b/g, 'tenés'],
      [/\bquieres\b/g, 'querés'], [/\bdebes\b/g, 'debés'],
      [/\bhaces\b/g, 'hacés'], [/\bsabes\b/g, 'sabés'],
      [/\beres\b/g, 'sos'], [/\btú\b/g, 'vos'],
      [/\bpiensas\b/g, 'pensás'], [/\bvives\b/g, 'vivís'],
    ]
    for (const [regex, repl] of voseoMap) result = result.replace(regex, repl)
    changes.push('Adaptado al español rioplatense (voseo)')
  } else if (variant.includes('España')) {
    result = result.replace(/\bustedes\b/g, 'vosotros')
    changes.push('Adaptado al español peninsular')
  }

  return { result, changes }
}

// ─── Stats ────────────────────────────────────────────────────────────────────
function calculateStats(original: string, result: string, form: HumanizerForm): HumanizerStats {
  const origWords = countWords(original)
  const resWords = countWords(result)

  const origSents = splitSentences(original)
  const resSents = splitSentences(result)

  let modified = 0
  const minLen = Math.min(origSents.length, resSents.length)
  for (let i = 0; i < minLen; i++) {
    if (origSents[i].trim() !== resSents[i].trim()) modified++
  }
  modified += Math.abs(origSents.length - resSents.length)

  const avgWPS = resWords / Math.max(resSents.length, 1)
  const avgWL = result.replace(/\s/g, '').length / Math.max(resWords, 1)
  let readabilityLevel = 'Estándar'
  if (avgWPS < 12 && avgWL < 5) readabilityLevel = 'Muy fácil'
  else if (avgWPS < 18 && avgWL < 6) readabilityLevel = 'Fácil'
  else if (avgWPS > 30 || avgWL > 8) readabilityLevel = 'Muy complejo'
  else if (avgWPS > 22 || avgWL > 6.5) readabilityLevel = 'Complejo'

  const lo = original.toLowerCase()
  let detectedTone = 'Neutro'
  if (/\b(investigación|análisis|metodología|resultados|hipótesis|estudio|marco teórico)\b/.test(lo)) detectedTone = 'Académico'
  else if (/\b(empresa|cliente|proyecto|estrategia|equipo|reunión|informe|stakeholder)\b/.test(lo)) detectedTone = 'Profesional'
  else if (/\b(jaja|genial|buenísimo|emocionante|increíble|wow|dale|loco|re |copado)\b/.test(lo)) detectedTone = 'Informal'
  else if (/\b(estimado|cordialmente|atentamente|saluda|distinguido)\b/.test(lo)) detectedTone = 'Formal'

  const spanishMatches = (original.match(/\b(la|el|los|las|un|una|que|de|en|y|es|se|por|para|con)\b/gi) ?? []).length
  const englishMatches = (original.match(/\b(the|is|are|was|were|this|that|with|from|have|has|for)\b/gi) ?? []).length
  const detectedLanguage = englishMatches > spanishMatches ? 'Inglés' : 'Español'

  const pkw = form.customSettings.protectedKeywords.split(',').map((k) => k.trim()).filter(Boolean)
  const protectedKeywordsFound = pkw.filter((kw) => result.toLowerCase().includes(kw.toLowerCase()))

  return {
    originalWordCount: origWords,
    resultWordCount: resWords,
    wordCountDiff: resWords - origWords,
    originalCharCount: original.length,
    resultCharCount: result.length,
    sentencesModified: Math.min(modified, origSents.length),
    readabilityLevel,
    detectedTone,
    detectedLanguage,
    protectedKeywordsFound,
  }
}

// ─── Diff por oraciones ───────────────────────────────────────────────────────
function computeSentenceDiff(original: string, result: string): DiffSegment[] {
  const toSents = (t: string) =>
    (t.match(/[^.!?…]+[.!?…]+(?:\s|$)|[^.!?…]+$/g) ?? [t]).map((s) => s.trim()).filter(Boolean)

  const origSents = toSents(original)
  const resSents = toSents(result)
  const segments: DiffSegment[] = []
  const maxLen = Math.max(origSents.length, resSents.length)

  for (let i = 0; i < maxLen; i++) {
    if (i < origSents.length && i < resSents.length) {
      if (origSents[i] === resSents[i]) {
        segments.push({ type: 'equal', text: origSents[i] })
      } else {
        segments.push({ type: 'removed', text: origSents[i] })
        segments.push({ type: 'added', text: resSents[i] })
      }
    } else if (i < origSents.length) {
      segments.push({ type: 'removed', text: origSents[i] })
    } else {
      segments.push({ type: 'added', text: resSents[i] })
    }
  }

  return segments
}

// ─── Motor principal ──────────────────────────────────────────────────────────
export function humanizeText(form: HumanizerForm): HumanizerResult {
  const original = form.originalText
  if (!original.trim()) {
    return {
      humanizedText: '',
      changes: [],
      stats: calculateStats('', '', form),
      diff: [],
    }
  }

  const opts = getModeOpts(form)
  const allChanges: string[] = []
  const seed = original.length

  // Protect keywords before processing
  const { result: protected_, map: kwMap } = protectKeywords(original, opts.protectedKeywords)
  let text = protected_

  if (opts.applyConcise) {
    const r = applyConciseMode(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyAIRemoval) {
    const r = removeAIPatterns(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyLexical) {
    const r = applyLexicalSubstitution(text, seed)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyYPero) {
    const r = injectYPeroStarters(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applySemicolons) {
    const r = injectSemicolons(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyHedging) {
    const r = injectHedging(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyRhetoricalQ) {
    const r = injectRhetoricalQuestions(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyParentheticals) {
    const r = injectParentheticalCommas(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyRestructure) {
    const r = restructureParagraphs(text)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyBurstiness) {
    const r = applyBurstiness(text, opts.burstinessThreshold)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.style) {
    const r = applySyntacticVariation(text, opts.style)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.applyPersonalVoice) {
    const r = addPersonalVoice(text, opts.style)
    text = r.result; allChanges.push(...r.changes)
  }

  if (opts.regionalVariant) {
    const r = applyRegionalVariant(text, opts.regionalVariant)
    text = r.result; allChanges.push(...r.changes)
  }

  // Remove avoid expressions
  for (const expr of opts.avoidExpressions) {
    if (expr && text.includes(expr)) {
      text = text.replace(new RegExp(escapeRegex(expr), 'gi'), '')
      allChanges.push(`Eliminada expresión no deseada: "${expr}"`)
    }
  }

  // Restore protected keywords
  text = restoreKeywords(text, kwMap)

  // Final cleanup
  text = text.replace(/  +/g, ' ').replace(/\n{3,}/g, '\n\n').trim()

  const finalChanges = allChanges.filter(Boolean)
  if (finalChanges.length === 0) {
    finalChanges.push('El texto ya era bastante natural. Se aplicaron ajustes menores de fluidez.')
  }

  return {
    humanizedText: text,
    changes: finalChanges,
    stats: calculateStats(original, text, form),
    diff: computeSentenceDiff(original, text),
  }
}
