"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"
import { useState, useEffect } from "react"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // Add a forced rendering optimization
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent flash during theme change
  if (!mounted) {
    // Provide a minimal, non-flashy placeholder
    return <div style={{ visibility: "hidden" }}>{children}</div>
  }

  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      enableColorScheme={true}
      storageKey="darksky-theme"
      // Add attribute to improve theme switching performance
      disableTransitionOnChange={true}
    >
      {children}
    </NextThemesProvider>
  )
}

