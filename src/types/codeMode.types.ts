export type ProgrammingLanguage =
  | 'JavaScript' | 'TypeScript' | 'Python' | 'Java' | 'C#'
  | 'C++' | 'PHP' | 'HTML/CSS' | 'SQL' | 'Otro'

export type ProjectType =
  | 'Página web' | 'Aplicación web' | 'API' | 'Aplicación de escritorio'
  | 'Aplicación móvil' | 'Script' | 'Base de datos' | 'Bot'
  | 'Videojuego' | 'Automatización' | 'Corrección de errores'
  | 'Refactorización' | 'Otro'

export type Framework =
  | 'React' | 'Next.js' | 'Vue' | 'Angular' | 'Node.js' | 'Express'
  | 'Django' | 'Flask' | 'Spring Boot' | '.NET' | 'Laravel'
  | 'Tailwind CSS' | 'Supabase' | 'Firebase' | 'Otro'

export type UserLevel = 'Principiante' | 'Intermedio' | 'Avanzado'

export type ExpectedResult =
  | 'Código completo' | 'Explicación paso a paso' | 'Solo corregir errores'
  | 'Mejorar código existente' | 'Crear estructura del proyecto'
  | 'Agregar una funcionalidad' | 'Revisar seguridad' | 'Optimizar rendimiento'

export interface CodeModeForm {
  language: ProgrammingLanguage | ''
  projectType: ProjectType | ''
  framework: Framework | ''
  userLevel: UserLevel | ''
  expectedResult: ExpectedResult | ''
  description: string
  features: string
  technicalRequirements: string
  existingCode: string
  currentErrors: string
  desiredDesign: string
  restrictions: string
  responseFormat: string
  additionalInfo: string
}
