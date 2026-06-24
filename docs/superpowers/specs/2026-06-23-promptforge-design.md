# PromptForge — Diseño de la aplicación
**Fecha:** 2026-06-23  
**Estado:** Aprobado

---

## 1. Visión general

PromptForge es una SPA (Single Page Application) que ayuda al usuario a transformar ideas simples en prompts profesionales listos para usar en ChatGPT, Claude, Gemini, Copilot, Midjourney y otras IA. Funciona 100% en el cliente (sin backend) en la primera versión, con arquitectura preparada para conectar APIs de IA posteriormente.

---

## 2. Stack técnico

| Tecnología | Versión | Rol |
|---|---|---|
| React | 18 | UI framework |
| TypeScript | 5 (strict) | Tipado |
| Vite | 5 | Build tool |
| Tailwind CSS | 3 | Estilos (dark mode por clase) |
| React Router | 6 | Routing cliente |
| Zustand | 4 | Estado global por dominio |
| Lucide React | latest | Iconos |
| LocalStorage | nativo | Persistencia |

Sin librerías de componentes externas (UI propia). Sin backend en v1.

---

## 3. Modos principales

### 3.1 Modo Código

Orientado a programación y desarrollo de software.

**Selectores:**
- Lenguaje: JavaScript, TypeScript, Python, Java, C#, C++, PHP, HTML/CSS, SQL, Otro
- Tipo de proyecto: Página web, App web, API, Desktop, Móvil, Script, Base de datos, Bot, Videojuego, Automatización, Corrección de errores, Refactorización, Otro
- Framework/tecnología: React, Next.js, Vue, Angular, Node.js, Express, Django, Flask, Spring Boot, .NET, Laravel, Tailwind CSS, Supabase, Firebase, Otro
- Nivel del usuario: Principiante, Intermedio, Avanzado
- Tipo de resultado: Código completo, Explicación paso a paso, Solo corregir errores, Mejorar código, Crear estructura, Agregar funcionalidad, Revisar seguridad, Optimizar rendimiento

**Campos de texto:**
- Descripción de la idea (requerido)
- Funciones necesarias
- Requisitos técnicos
- Código existente (textarea grande)
- Errores actuales
- Diseño deseado
- Restricciones
- Formato de respuesta
- Información adicional

**Prompt generado incluye:**
- Rol que debe asumir la IA
- Objetivo principal
- Contexto del proyecto + tecnologías
- Funcionalidades requeridas
- Restricciones y reglas de calidad
- Manejo de errores + seguridad
- Diseño responsive + accesibilidad + rendimiento
- Formato de entrega
- Instrucción de no eliminar funciones existentes
- Instrucción de entregar archivos completos con rutas

**Botones de mejora:**
Mejorar prompt · Hacerlo más técnico · Hacerlo más corto · Agregar seguridad · Agregar diseño profesional · Agregar manejo de errores · Agregar pruebas

---

### 3.2 Modo Texto

Orientado a escritura, estudio, marketing y redes sociales.

**Tipos de trabajo:**
Crear desde cero · Mejorar texto · Corregir ortografía · Resumir · Expandir · Simplificar · Cambiar tono · Reescribir · Traducir · Humanizar · Crear historia · Crear guion · Publicación redes sociales · Correo electrónico · Trabajo académico · Otro

**Opciones de configuración:**
- Idioma + variante regional (incluye Español de Uruguay)
- Público objetivo (texto libre)
- Tono: Natural · Profesional · Académico · Formal · Informal · Juvenil · Amigable · Persuasivo · Emocional · Divertido · Serio · Narrativo · Directo
- Extensión: Muy corto / Corto / Medio / Largo / Muy largo
- Nivel de vocabulario: Básico / Estándar / Avanzado / Técnico
- Objetivo del texto
- Plataforma de publicación
- Palabras que deben mantenerse
- Palabras que deben evitarse
- Información obligatoria
- Formato de salida

---

### 3.3 Humanizador de texto

Herramienta destacada dentro del Modo Texto.

**Entrada:** textarea para pegar texto existente.

**Estilos de humanización:**
Más natural · Más fluido · Menos repetitivo · Más cercano · Más profesional · Más juvenil · Más académico · Más informal · Más emocional · Más convincente · Más fácil de entender

**Reglas del humanizador:**
- Mantiene el significado original
- Corrige frases poco naturales
- Varía la longitud de las oraciones
- Elimina repeticiones innecesarias
- Mejora conectores y transiciones
- Evita palabras robóticas o genéricas
- Mantiene nombres, datos, fechas y conceptos
- No inventa información
- Permite conservar expresiones del usuario
- Permite seleccionar variante regional del idioma

**Salida:**
- Texto original y texto mejorado en columnas
- Vista de comparación (diff visual)
- Lista de cambios principales realizados
- Sin afirmar que supera detectores de IA

---

## 4. Generador inteligente de prompts

El usuario escribe una idea simple (ej: "quiero crear una página para vender ropa") y el sistema:

1. Detecta el dominio (código vs. texto)
2. Identifica información faltante
3. Muestra sugerencias editables (no bloqueantes — se puede continuar)
4. Genera el prompt completo con: rol, contexto, objetivo, público, funciones, estilo, restricciones, formato, criterios de calidad
5. Muestra indicador de calidad (0–100)

---

## 5. Indicador de calidad

Puntuación heurística basada en campos completados:

| Criterio | Puntos |
|---|---|
| Claridad (descripción presente) | 20 |
| Contexto (tipo de proyecto/texto) | 15 |
| Nivel de detalle (campos rellenos) | 20 |
| Restricciones definidas | 10 |
| Formato esperado | 10 |
| Objetivo claro | 15 |
| Público objetivo | 10 |
| **Total** | **100** |

Muestra: anillo de progreso circular + puntuación + lista de recomendaciones concretas.

---

## 6. Historial y organización

- Historial de prompts con fecha de creación y modificación
- Favoritos
- Carpetas (crear, renombrar, eliminar)
- Etiquetas (multi-tag)
- Buscador full-text sobre título + contenido
- Filtros por categoría, modo, fecha, etiquetas
- Acciones: Duplicar · Editar · Eliminar · Exportar
- Exportación: TXT · Markdown · JSON (individual o bulk)
- Importación de prompts en JSON
- Auto-guardado de borradores (debounce 800ms)

---

## 7. Plantillas prediseñadas (14)

1. Crear una página web
2. Corregir un programa
3. Crear una API
4. Diseñar una base de datos
5. Crear una aplicación
6. Mejorar una interfaz
7. Crear una historia
8. Humanizar un texto
9. Resumir un documento
10. Crear un trabajo académico
11. Crear contenido para TikTok
12. Crear contenido para YouTube
13. Crear un correo profesional
14. Crear una campaña de marketing

---

## 8. Interfaz y diseño

- **Modo por defecto:** oscuro (dark mode)
- **Toggle:** dark/light persistido en Zustand + LocalStorage
- **Layout desktop:** sidebar fija (240px) + panel doble (formulario | preview)
- **Layout móvil/tablet:** sidebar como drawer + panel único con tabs

### Secciones de navegación
Inicio · Crear prompt · Modo Código · Modo Texto · Humanizador · Plantillas · Historial · Favoritos · Configuración

### Componentes UI globales
- Toast notifications (copiar, guardar, error)
- Modal de confirmación (eliminar)
- Contador de caracteres y palabras (en tiempo real)
- Botón de copiar flotante visible en el preview
- Estado vacío en historial, favoritos y carpetas

---

## 9. Estructura de carpetas

```
src/
├── components/
│   ├── layout/          # Sidebar, Header, MainLayout, MobileDrawer
│   ├── ui/              # Button, Input, Textarea, Select, Badge, Toast,
│   │                    # Modal, Card, Tooltip, ProgressRing, Tabs
│   ├── code-mode/       # CodeModeForm, LanguageSelector, FrameworkSelector,
│   │                    # ResultTypeSelector, FieldGroup
│   ├── text-mode/       # TextModeForm, ToneSelector, AudienceSelector
│   ├── humanizer/       # HumanizerTool, DiffViewer, StyleSelector
│   ├── prompt/          # PromptPreview, QualityIndicator, ActionBar,
│   │                    # ImprovementButtons, CharWordCounter
│   ├── history/         # HistoryList, HistoryCard, FolderTree, TagFilter
│   └── templates/       # TemplateGallery, TemplateCard
├── pages/
│   ├── HomePage.tsx
│   ├── CodeModePage.tsx
│   ├── TextModePage.tsx
│   ├── HumanizerPage.tsx
│   ├── TemplatesPage.tsx
│   ├── HistoryPage.tsx
│   ├── FavoritesPage.tsx
│   └── SettingsPage.tsx
├── stores/
│   ├── appStore.ts        # tema, sidebar, notificaciones toast
│   ├── codeModeStore.ts   # estado formulario Code Mode + draft
│   ├── textModeStore.ts   # estado formulario Text Mode + draft
│   ├── humanizerStore.ts  # texto original + resultado + estilo
│   └── historyStore.ts    # prompts, favoritos, carpetas, etiquetas
├── services/
│   ├── promptGenerator.ts   # generación Code Mode (rule-based)
│   ├── textPromptGenerator.ts # generación Text Mode (rule-based)
│   ├── textHumanizer.ts     # lógica de humanización (rule-based)
│   ├── qualityAnalyzer.ts   # puntuación 0-100 + sugerencias
│   ├── promptImprover.ts    # mejoras: técnico, corto, seguridad, etc.
│   └── aiService.ts         # stub preparado para OpenAI/Anthropic/Gemini
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useAutosave.ts
│   ├── useToast.ts
│   └── useExport.ts
├── types/
│   ├── prompt.types.ts
│   ├── codeMode.types.ts
│   ├── textMode.types.ts
│   └── history.types.ts
├── data/
│   ├── templates.ts
│   ├── languages.ts
│   ├── frameworks.ts
│   └── tones.ts
└── utils/
    ├── export.ts          # TXT, Markdown, JSON
    ├── import.ts
    └── storage.ts
```

---

## 10. Servicio de IA (futuro)

`aiService.ts` implementa un patrón strategy:

```typescript
interface AIProvider {
  generatePrompt(input: string, options: AIOptions): Promise<string>;
  improvePrompt(prompt: string, instruction: string): Promise<string>;
  humanizeText(text: string, style: string): Promise<string>;
}
```

Proveedores planificados: OpenAI, Anthropic, Google Gemini, Ollama (local).  
**Las claves API se leen desde variables de entorno `.env.local`, nunca hardcodeadas en el frontend.**

---

## 11. Requisitos de calidad

- TypeScript strict sin `any` innecesarios
- Validaciones en formularios (campos requeridos)
- Estados vacíos en todas las listas
- Mensajes de confirmación antes de eliminar
- Accesibilidad: `aria-label`, roles semánticos, navegación por teclado
- No perder información al navegar entre secciones (Zustand persiste el estado)
- Auto-save de borradores con debounce 800ms
- `npm install` + `npm run dev` suficiente para correr el proyecto

---

## 12. Fuera de alcance (v1)

- Backend / servidor
- Autenticación / cuentas de usuario
- Sincronización en la nube
- Llamadas reales a APIs de IA (servicio preparado pero no conectado)
- i18n (la app está en español, sin internacionalización dinámica)
