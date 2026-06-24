import type { ProgrammingLanguage, ProjectType, Framework, UserLevel, ExpectedResult } from '../types/codeMode.types'

export const LANGUAGES: ProgrammingLanguage[] = [
  'JavaScript', 'TypeScript', 'Python', 'Java', 'C#',
  'C++', 'PHP', 'HTML/CSS', 'SQL', 'Otro',
]

export const PROJECT_TYPES: ProjectType[] = [
  'Página web', 'Aplicación web', 'API', 'Aplicación de escritorio',
  'Aplicación móvil', 'Script', 'Base de datos', 'Bot',
  'Videojuego', 'Automatización', 'Corrección de errores', 'Refactorización', 'Otro',
]

export const FRAMEWORKS: Framework[] = [
  'React', 'Next.js', 'Vue', 'Angular', 'Node.js', 'Express',
  'Django', 'Flask', 'Spring Boot', '.NET', 'Laravel',
  'Tailwind CSS', 'Supabase', 'Firebase', 'Otro',
]

export const USER_LEVELS: UserLevel[] = ['Principiante', 'Intermedio', 'Avanzado']

export const EXPECTED_RESULTS: ExpectedResult[] = [
  'Código completo', 'Explicación paso a paso', 'Solo corregir errores',
  'Mejorar código existente', 'Crear estructura del proyecto',
  'Agregar una funcionalidad', 'Revisar seguridad', 'Optimizar rendimiento',
]
