import type { PromptMode } from '../types/prompt.types'

export interface Template {
  id: string
  title: string
  description: string
  mode: PromptMode
  tags: string[]
  icon: string
  content: string
}

export const TEMPLATES: Template[] = [
  {
    id: 'tpl-web-page',
    title: 'Crear una página web',
    description: 'Genera un prompt completo para crear una página web desde cero.',
    mode: 'code',
    tags: ['web', 'HTML', 'CSS', 'frontend'],
    icon: 'Globe',
    content: `Actúa como un desarrollador web senior fullstack con más de 10 años de experiencia en diseño y desarrollo de páginas web modernas y responsive.

## Objetivo
Crea una página web completa y funcional con las siguientes características:

**Descripción:** [DESCRIBE AQUÍ TU PÁGINA]

## Tecnologías requeridas
- HTML5 semántico
- CSS3 con variables CSS y diseño responsive
- JavaScript vanilla o [FRAMEWORK]

## Requisitos técnicos
- Diseño responsive (mobile-first)
- Compatible con los principales navegadores
- Tiempo de carga optimizado
- Accesibilidad WCAG 2.1 nivel AA
- SEO básico implementado

## Entregables
Entrega todos los archivos completos e indicá exactamente en qué carpeta colocar cada uno. No omitás ninguna función existente. Incluí comentarios explicativos en el código.`,
  },
  {
    id: 'tpl-fix-program',
    title: 'Corregir un programa',
    description: 'Prompt para detectar y corregir errores en código existente.',
    mode: 'code',
    tags: ['debug', 'errores', 'corrección'],
    icon: 'Bug',
    content: `Actúa como un ingeniero de software experto en debugging y resolución de errores en [LENGUAJE].

## Objetivo
Analiza el siguiente código y corregí todos los errores presentes.

## Código con errores
\`\`\`[LENGUAJE]
[PEGA AQUÍ TU CÓDIGO]
\`\`\`

## Errores reportados
[DESCRIBE LOS ERRORES O MENSAJES DE ERROR]

## Instrucciones
1. Identificá cada error y explicá por qué ocurre
2. Proporcioná el código corregido completo
3. Explicá qué cambios realizaste y por qué
4. No elimines ninguna funcionalidad existente
5. Entregá el archivo completo, no solo el fragmento corregido`,
  },
  {
    id: 'tpl-api',
    title: 'Crear una API',
    description: 'Prompt para desarrollar una API REST completa.',
    mode: 'code',
    tags: ['API', 'REST', 'backend'],
    icon: 'Server',
    content: `Actúa como un arquitecto de software backend especializado en el diseño y desarrollo de APIs RESTful escalables y seguras.

## Objetivo
Desarrolla una API REST completa para [DESCRIPCIÓN DE LA API].

## Tecnologías
- Runtime/Framework: [NODE.JS/DJANGO/SPRING/ETC]
- Base de datos: [POSTGRESQL/MONGODB/ETC]
- Autenticación: [JWT/OAuth/API Keys]

## Endpoints requeridos
[LISTA LOS ENDPOINTS QUE NECESITÁS]

## Requisitos de calidad
- Validación de datos en todas las entradas
- Manejo centralizado de errores
- Respuestas HTTP correctas (200, 201, 400, 401, 404, 500)
- Documentación de endpoints
- Seguridad: rate limiting, sanitización de inputs, protección contra inyecciones
- Logs de errores

## Entregables
Entregá todos los archivos con su ruta completa. No omitás ningún archivo. Incluí instrucciones de instalación y uso.`,
  },
  {
    id: 'tpl-database',
    title: 'Diseñar una base de datos',
    description: 'Crea el esquema y diseño de una base de datos profesional.',
    mode: 'code',
    tags: ['SQL', 'base de datos', 'esquema'],
    icon: 'Database',
    content: `Actúa como un administrador de bases de datos (DBA) senior con amplia experiencia en diseño de esquemas relacionales y optimización de consultas.

## Objetivo
Diseñá el esquema completo de una base de datos para [DESCRIPCIÓN DEL SISTEMA].

## Motor de base de datos
[POSTGRESQL / MYSQL / SQLITE / SQL SERVER]

## Entidades principales
[DESCRIBE LAS ENTIDADES PRINCIPALES, ej: usuarios, productos, pedidos]

## Requisitos
- Diagrama ER en texto o SQL
- Tablas con tipos de datos correctos
- Claves primarias y foráneas
- Índices para optimizar consultas frecuentes
- Restricciones de integridad
- Datos de ejemplo (seed data)
- Consultas SQL más frecuentes del sistema

## Consideraciones
- Normalización hasta 3FN
- Nombrado consistente (snake_case)
- Campos de auditoría (created_at, updated_at)`,
  },
  {
    id: 'tpl-app',
    title: 'Crear una aplicación',
    description: 'Desarrolla una aplicación completa con todas sus funcionalidades.',
    mode: 'code',
    tags: ['app', 'fullstack', 'aplicación'],
    icon: 'AppWindow',
    content: `Actúa como un desarrollador fullstack senior con experiencia en el desarrollo de aplicaciones web modernas, escalables y mantenibles.

## Objetivo
Desarrolla una aplicación completa para [DESCRIPCIÓN DE LA APP].

## Stack tecnológico
- Frontend: [REACT/VUE/ANGULAR]
- Backend: [NODE.JS/PYTHON/JAVA]
- Base de datos: [POSTGRESQL/MONGODB]
- Estilos: [TAILWIND CSS/MUI/ETC]

## Funcionalidades principales
[LISTA LAS FUNCIONALIDADES]

## Requisitos de calidad
- Arquitectura limpia y escalable
- Componentes reutilizables
- Manejo de estado global
- Autenticación y autorización
- Responsive design
- Manejo de errores y loading states
- Validación de formularios

## Entregables
Entregá la estructura completa del proyecto con todos los archivos. Indicá qué hace cada archivo y dónde colocarlo. No uses código simulado ni incompleto.`,
  },
  {
    id: 'tpl-ui',
    title: 'Mejorar una interfaz',
    description: 'Rediseña y mejora la UI/UX de una interfaz existente.',
    mode: 'code',
    tags: ['UI', 'UX', 'diseño', 'frontend'],
    icon: 'Palette',
    content: `Actúa como un diseñador UI/UX y desarrollador frontend especializado en crear interfaces modernas, accesibles y con excelente experiencia de usuario.

## Objetivo
Mejorá y rediseñá la siguiente interfaz manteniendo todas sus funcionalidades existentes.

## Interfaz actual
\`\`\`
[PEGA AQUÍ EL CÓDIGO HTML/JSX/VUE DE LA INTERFAZ]
\`\`\`

## Problemas identificados
[DESCRIBE QUÉ QUERÉS MEJORAR]

## Estilo deseado
[DESCRIBE EL ESTILO: moderno, minimalista, colorido, corporativo, etc.]

## Requisitos
- Mantener TODAS las funcionalidades existentes
- Diseño responsive (mobile-first)
- Paleta de colores cohesiva
- Tipografía legible y jerarquía visual clara
- Micro-animaciones suaves
- Estados hover, focus y active en elementos interactivos
- Accesibilidad mejorada`,
  },
  {
    id: 'tpl-story',
    title: 'Crear una historia',
    description: 'Genera una historia creativa y atrapante con tu idea.',
    mode: 'text',
    tags: ['escritura', 'ficción', 'historia'],
    icon: 'BookOpen',
    content: `Actúa como un escritor creativo con experiencia en narrativa y construcción de mundos.

## Objetivo
Escribí una historia completa basada en la siguiente idea:

**Idea central:** [TU IDEA AQUÍ]

## Detalles de la historia
- Género: [FANTASÍA/CIENCIA FICCIÓN/ROMANCE/THRILLER/ETC]
- Extensión: [CORTO/MEDIANO/LARGO]
- Tono: [OSCURO/AVENTURERO/ROMÁNTICO/MISTERIOSO]
- Público: [ADULTOS/JÓVENES/INFANTIL]

## Elementos a incluir
- Protagonista bien desarrollado con motivaciones claras
- Conflicto central atrapante
- Giros de trama inesperados
- Diálogos naturales y fluidos
- Descripción de ambientes que genere inmersión
- Desenlace satisfactorio

## Estilo
Usá un lenguaje vívido y evocador. Mostrá, no cuentes. Variá el ritmo narrativo.`,
  },
  {
    id: 'tpl-humanize',
    title: 'Humanizar un texto',
    description: 'Transforma un texto robótico en uno más natural y fluido.',
    mode: 'text',
    tags: ['humanizar', 'reescritura', 'natural'],
    icon: 'Heart',
    content: `Actúa como un redactor profesional especializado en hacer textos más naturales, fluidos y humanos, sin perder el significado original.

## Objetivo
Reescribí el siguiente texto para que suene más natural y menos artificial:

**Texto original:**
[PEGA AQUÍ EL TEXTO]

## Instrucciones de humanización
- Mantené el significado original sin cambios
- Variá la longitud de las oraciones (mezcla cortas y largas)
- Usá conectores naturales en lugar de listas robóticas
- Eliminá palabras genéricas y repetitivas
- Agregá fluidez y ritmo natural
- Conservá todos los datos, fechas y nombres originales
- No inventés información nueva
- Usá [VARIANTE REGIONAL: ESPAÑOL DE URUGUAY/ARGENTINA/NEUTRO]

## Formato de respuesta
1. Texto reescrito completo
2. Lista de los principales cambios realizados
3. Breve explicación de las mejoras aplicadas`,
  },
  {
    id: 'tpl-summarize',
    title: 'Resumir un documento',
    description: 'Crea un resumen claro y estructurado de cualquier texto.',
    mode: 'text',
    tags: ['resumen', 'síntesis', 'documento'],
    icon: 'FileText',
    content: `Actúa como un analista experto en síntesis de información y redacción de resúmenes ejecutivos claros y precisos.

## Objetivo
Creá un resumen completo y estructurado del siguiente texto:

**Texto a resumir:**
[PEGA AQUÍ EL TEXTO]

## Instrucciones
- Extensión del resumen: [MUY CORTO (3-5 líneas) / CORTO (1 párrafo) / MEDIO (3-5 párrafos)]
- Nivel de vocabulario: [BÁSICO / ESTÁNDAR / TÉCNICO]
- Público objetivo: [A QUIÉN VA DIRIGIDO]

## Formato de salida
1. **Idea principal** (1-2 oraciones)
2. **Puntos clave** (lista de los más importantes)
3. **Conclusión** (1 párrafo)
4. **Términos importantes** (si aplica)

Mantené todos los datos, cifras y nombres originales. No agregués información que no esté en el texto.`,
  },
  {
    id: 'tpl-academic',
    title: 'Crear un trabajo académico',
    description: 'Genera la estructura y contenido de un trabajo académico profesional.',
    mode: 'text',
    tags: ['académico', 'universidad', 'investigación'],
    icon: 'GraduationCap',
    content: `Actúa como un académico e investigador con amplia experiencia en la redacción de trabajos universitarios, tesis y ensayos académicos formales.

## Objetivo
Creá un trabajo académico sobre el siguiente tema:

**Tema:** [TU TEMA AQUÍ]

## Parámetros
- Tipo: [ENSAYO / MONOGRAFÍA / INFORME / TESIS / TRABAJO PRÁCTICO]
- Extensión aproximada: [PÁGINAS O PALABRAS]
- Nivel educativo: [SECUNDARIO / UNIVERSITARIO / POSTGRADO]
- Institución/Materia: [OPCIONAL]

## Estructura requerida
1. Portada (datos básicos)
2. Resumen/Abstract
3. Introducción con hipótesis o pregunta de investigación
4. Desarrollo con subtítulos organizados
5. Conclusiones
6. Bibliografía en formato [APA / MLA / CHICAGO]

## Estilo
- Lenguaje formal y académico
- Tercera persona o impersonal
- Argumentación sólida con fuentes
- Sin plagios ni información inventada
- Coherencia y cohesión textual`,
  },
  {
    id: 'tpl-tiktok',
    title: 'Crear contenido para TikTok',
    description: 'Genera ideas y guiones virales para TikTok.',
    mode: 'text',
    tags: ['TikTok', 'redes sociales', 'viral', 'video'],
    icon: 'Video',
    content: `Actúa como un creador de contenido digital experto en TikTok con experiencia generando videos virales y con alta retención de audiencia.

## Objetivo
Creá contenido para TikTok sobre el siguiente tema:

**Tema/Nicho:** [TU TEMA AQUÍ]

## Detalles
- Duración aproximada: [15 seg / 30 seg / 1 min / 3 min]
- Tono: [EDUCATIVO / ENTRETENIDO / EMOCIONAL / INSPIRACIONAL / HUMOR]
- Público objetivo: [DESCRIBE TU AUDIENCIA]
- Objetivo: [GANAR SEGUIDORES / VENDER / INFORMAR / ENTRETENER]

## Entregables
1. **Hook inicial** (primeros 3 segundos que enganchen)
2. **Guion completo** con indicaciones de cortes y transiciones
3. **Texto en pantalla** (captions sugeridos)
4. **Call to action** final
5. **30 hashtags** relevantes y de tendencia
6. **3 ideas alternativas** para el mismo tema

## Formato
Usá lenguaje casual, energético y adaptado a la generación Z. Incluí emojis estratégicamente.`,
  },
  {
    id: 'tpl-youtube',
    title: 'Crear contenido para YouTube',
    description: 'Estructura y guion para videos de YouTube optimizados.',
    mode: 'text',
    tags: ['YouTube', 'video', 'guion', 'SEO'],
    icon: 'Youtube',
    content: `Actúa como un YouTuber experto y estratega de contenido con experiencia en crear videos que generan visualizaciones, retención alta y suscriptores.

## Objetivo
Creá contenido completo para un video de YouTube sobre:

**Tema:** [TU TEMA AQUÍ]

## Detalles del canal
- Nicho: [TU NICHO]
- Duración objetivo: [5 min / 10 min / 20 min / +30 min]
- Estilo: [TUTORIAL / VLOG / REVIEW / EDUCATIVO / ENTRETENIMIENTO]
- Audiencia: [DESCRIBE TU PÚBLICO]

## Entregables completos
1. **Título optimizado para SEO** (3 opciones con keywords)
2. **Thumbnail concept** (descripción visual detallada)
3. **Descripción para YouTube** con keywords y timestamps
4. **Guion completo** con intro, desarrollo y outro
5. **Tarjetas y pantallas finales** sugeridas
6. **Tags** para SEO (20 tags relevantes)
7. **Chapters/timestamps** para la descripción

Optimizá para retención, CTR alto y posicionamiento en búsquedas.`,
  },
  {
    id: 'tpl-email',
    title: 'Crear un correo profesional',
    description: 'Redacta correos electrónicos profesionales y efectivos.',
    mode: 'text',
    tags: ['email', 'correo', 'profesional', 'comunicación'],
    icon: 'Mail',
    content: `Actúa como un comunicador profesional especializado en redacción de correos electrónicos corporativos efectivos y persuasivos.

## Objetivo
Redactá un correo electrónico profesional con el siguiente propósito:

**Propósito:** [DESCRIBE EL OBJETIVO DEL CORREO]

## Contexto
- Remitente: [TU ROL/EMPRESA]
- Destinatario: [A QUIÉN VA DIRIGIDO]
- Relación: [CLIENTE / PROVEEDOR / JEFE / COLEGA / DESCONOCIDO]
- Urgencia: [ALTA / MEDIA / BAJA]

## Tono deseado
[FORMAL / CORDIAL / DIRECTO / PERSUASIVO]

## Información a incluir
[LISTA LOS PUNTOS CLAVE QUE DEBE CONTENER]

## Formato
- Asunto del correo (3 opciones)
- Saludo apropiado
- Cuerpo claro y estructurado
- Llamada a la acción específica
- Cierre profesional

Usá párrafos cortos, lenguaje claro y evitá ambigüedades.`,
  },
  {
    id: 'tpl-marketing',
    title: 'Crear una campaña de marketing',
    description: 'Diseña una campaña de marketing digital completa y estratégica.',
    mode: 'text',
    tags: ['marketing', 'campaña', 'publicidad', 'estrategia'],
    icon: 'Megaphone',
    content: `Actúa como un director de marketing digital con más de 10 años de experiencia diseñando campañas exitosas para marcas de distintos tamaños e industrias.

## Objetivo
Diseñá una campaña de marketing completa para:

**Producto/Servicio:** [QUÉ ESTÁS PROMOCIONANDO]
**Objetivo de la campaña:** [VENTAS / AWARENESS / LEADS / FIDELIZACIÓN]

## Información de la marca
- Empresa: [NOMBRE Y RUBRO]
- Público objetivo: [DEMOGRAFÍA, INTERESES, COMPORTAMIENTOS]
- Presupuesto aproximado: [BAJO / MEDIO / ALTO]
- Duración: [SEMANAS O MESES]

## Canales disponibles
[REDES SOCIALES / EMAIL / ADS / SEO / INFLUENCERS / ETC]

## Entregables
1. **Estrategia general** y propuesta de valor
2. **Calendario de contenidos** (30 días)
3. **3 copies** para redes sociales listos para publicar
4. **Asunto y cuerpo** de email de campaña
5. **KPIs** y métricas a medir
6. **Presupuesto sugerido** por canal

Basate en técnicas reales de marketing digital. Sé específico y accionable.`,
  },
]
