export type ExamName = 'JEE Mains' | 'JEE Advanced' | 'NEET'
export type RevisionMode = 'quick' | 'deep' | 'last_night'
export type Language = 'english' | 'hindi'

export interface Formula {
  formula: string
  meaning: string
}

export interface RevisionContent {
  chapterName: string
  subject: string
  examType: string
  mode: RevisionMode
  keyConcepts: string[]
  formulas: Formula[]
  examTips: string[]
  memoryTricks: string[]
  commonMistakes: string[]
}

export interface MCQQuestion {
  id: string
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  topic: string
}

export interface WeakTopic {
  chapterName: string
  subject: string
  accuracy: number
  attempts: number
}

export interface HistoryItem {
  id: string
  chapterName: string
  subject: string
  examType: string
  mode: RevisionMode
  revisedAt: string
}

export type AppView =
  | 'home'
  | 'search'
  | 'modeSelect'
  | 'revision'
  | 'practice'
  | 'score'
  | 'progress'
  | 'profile'
