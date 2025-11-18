'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ReactNode } from 'react'

interface ThemeProviderProps {
  children: ReactNode
  attribute: string
  defaultTheme: string
}

export function ThemeProvider({ children, attribute, defaultTheme }: ThemeProviderProps) {
  return (
    <NextThemesProvider attribute={attribute} defaultTheme={defaultTheme}>
      {children}
    </NextThemesProvider>
  )
}
