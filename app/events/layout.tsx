"use client"

import SiteHeader from "@/components/site-header"
import Image from "next/image"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

// Define navigation items for the events section
const navItems = [
  { href: "/our-work", label: "Our Work" },
  { href: "/mission", label: "The Mission" },
  { href: "/events", label: "Upcoming Events", active: true },
]

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <SiteHeader navItems={navItems} />
      <main>{children}</main>
      <footer className="py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              {/* Use the appropriate logo based on theme */}
              <Image
                src={mounted && resolvedTheme === "light" ? "/images/logo-black.png" : "/images/logo-white.png"}
                alt="DarkSky Kenya Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <p className="text-gray-500 dark:text-gray-400 mt-2">© 2025 DarkSky Kenya</p>
            </div>
            <div className="flex space-x-6">
              <a href="https://www.instagram.com/darkskykenya/" aria-label="Instagram" className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
