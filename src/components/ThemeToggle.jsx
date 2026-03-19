import { useState, useEffect } from 'react'
import { Sun, Moon } from 'lucide-react'

/**
 * ThemeToggle — dark / light mode switch
 * Reads initial preference from localStorage then system preference.
 * Toggles the `dark` class on <html> (Tailwind darkMode: 'class').
 */
export default function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false
    const saved = localStorage.getItem('theme')
    if (saved) return saved === 'dark'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <button
      onClick={() => setDark(d => !d)}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={dark}
      className="relative flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-300 text-plum dark:text-gold hover:bg-plum/10 dark:hover:bg-gold/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose dark:focus-visible:ring-gold"
    >
      {dark
        ? <Sun  size={18} strokeWidth={2} aria-hidden="true" />
        : <Moon size={18} strokeWidth={2} aria-hidden="true" />
      }
    </button>
  )
}
