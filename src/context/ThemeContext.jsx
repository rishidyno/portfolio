import { createContext, useContext, useState, useEffect } from 'react'

export const themes = {
  nebula: {
    name: 'Nebula', emoji: '🌌',
    bg: '#0d0d20',
    accentFrom: '#6366f1', accentMid: '#a855f7', accentTo: '#ec4899',
    particleRgb: '99,102,241',
  },
  ocean: {
    name: 'Ocean', emoji: '🌊',
    bg: '#071520',
    accentFrom: '#06b6d4', accentMid: '#3b82f6', accentTo: '#818cf8',
    particleRgb: '6,182,212',
  },
  ember: {
    name: 'Ember', emoji: '🔥',
    bg: '#1a0a05',
    accentFrom: '#f97316', accentMid: '#ef4444', accentTo: '#ec4899',
    particleRgb: '249,115,22',
  },
  forest: {
    name: 'Forest', emoji: '🌿',
    bg: '#051508',
    accentFrom: '#10b981', accentMid: '#22c55e', accentTo: '#06b6d4',
    particleRgb: '16,185,129',
  },
  aurora: {
    name: 'Aurora', emoji: '✨',
    bg: '#0b0620',
    accentFrom: '#c084fc', accentMid: '#818cf8', accentTo: '#38bdf8',
    particleRgb: '192,132,252',
  },
}

const ThemeCtx = createContext(null)

export function ThemeProvider({ children }) {
  const [themeKey, setThemeKey] = useState('nebula')
  const theme = themes[themeKey]

  useEffect(() => {
    const r = document.documentElement
    r.style.setProperty('--af', theme.accentFrom)
    r.style.setProperty('--am', theme.accentMid)
    r.style.setProperty('--at', theme.accentTo)
    r.style.setProperty('--rgb', theme.particleRgb)
    document.body.style.background = theme.bg
    document.body.style.transition = 'background 0.6s ease'
  }, [theme])

  return (
    <ThemeCtx.Provider value={{ theme, themeKey, setThemeKey, themes }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
