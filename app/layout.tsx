import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ErrorBoundary } from "@/components/error-boundary"
import Script from "next/script"

export const metadata: Metadata = {
  title: "DarkSky Kenya - Protecting Night Skies",
  description:
    "DarkSky Kenya is dedicated to protecting and preserving the night skies of Kenya for current and future generations.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/images/logo-icon.png" />
        <link rel="apple-touch-icon" href="/images/logo-icon.png" />
        
        {/* Add preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link rel="preload" href="/images/logo-white.png" as="image" />
        <link rel="preload" href="/images/logo-black.png" as="image" />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange={false}>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>

        {/* Simple error tracking script */}
        <Script id="error-handler" strategy="afterInteractive">
          {`
            window.addEventListener('error', function(e) {
              console.log('Caught error:', e.message);
            });
          `}
        </Script>
      </body>
    </html>
  )
}

