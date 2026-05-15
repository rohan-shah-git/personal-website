'use client'

import { createContext, useContext, useState } from 'react'

interface FilmModeContextValue {
  filmMode: boolean
  toggleFilmMode: () => void
}

const FilmModeContext = createContext<FilmModeContextValue | null>(null)

export function FilmModeProvider({ children }: { children: React.ReactNode }) {
  const [filmMode, setFilmMode] = useState(false)
  return (
    <FilmModeContext.Provider value={{ filmMode, toggleFilmMode: () => setFilmMode(f => !f) }}>
      {children}
    </FilmModeContext.Provider>
  )
}

export function useFilmMode(): FilmModeContextValue {
  const ctx = useContext(FilmModeContext)
  if (!ctx) throw new Error('useFilmMode must be used within a FilmModeProvider')
  return ctx
}
