export type ExportFormat = 'txt' | 'md' | 'json'

export interface HistoryFilter {
  search: string
  mode: 'all' | 'code' | 'text'
  folderId: string | null
  tag: string | null
  onlyFavorites: boolean
}
