'use client'

import Iconify from '../shared/Iconify'
import { useTheme } from '@/components/layout/ThemeProvider'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent text-accent hover:bg-accent hover:text-on-accent transition"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Iconify icon="hugeicons:evil" />
        // <Iconify icon="fa6-solid:moon" />
      ) : (
        <Iconify icon="hugeicons:angel" />
        // <Iconify icon="fa6-solid:sun" />
      )}
    </button>
  )
}
