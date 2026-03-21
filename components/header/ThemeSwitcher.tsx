'use client'

import Iconify from '../shared/Iconify'
import { useTheme } from '@/components/layout/ThemeProvider'

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light (angel mode)' : 'Switch to dark (devil mode)'}
      title={isDark ? 'Angel mode' : 'Devil mode'}
      aria-pressed={isDark}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent transition-all duration-300 hover:border-accent hover:bg-accent/18 hover:shadow-accent focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 focus:ring-offset-background"
    >
      <Iconify
        // icon={isDark ? "hugeicons:angel" : "hugeicons:evil"}
        icon={isDark ? "hugeicons:angel" : "icomoon-free:evil"}
        width={19}
        className="transition-transform duration-300 hover:scale-110"
      />
    </button>
  )
}
