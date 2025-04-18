"use client"

import { useTheme } from "next-themes"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"
import ThemeToggle from "./theme-toggle"
import { Menu, X } from "lucide-react"

interface NavItem {
  href: string
  label: string
  active?: boolean
}

// Add this debounce utility
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export default function SiteHeader({ navItems }: { navItems?: NavItem[] }) {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Default nav items if none provided
  const defaultNavItems: NavItem[] = [
    { href: "/our-work", label: "Our Work" },
    { href: "/blog", label: "Blog" },
    { href: "/mission", label: "The Mission" },
    { href: "/learn-more", label: "Learn More" },
  ]

  const items = navItems || defaultNavItems

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  // Determine which logo to use based on theme
  const logoSrc = mounted && resolvedTheme === "light" ? "/images/logo-black.png" : "/images/logo-white.png"

  // Use debounced handlers for mobile menu
  const handleMobileMenuToggle = useCallback(
    debounce(() => {
      setMobileMenuOpen(!mobileMenuOpen)
    }, 100),
    [mobileMenuOpen],
  )

  return (
    <>
      <header className="border-b border-gray-800 dark:border-gray-800 bg-white dark:bg-[#0c0c14] relative z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src={logoSrc || "/placeholder.svg"}
              alt="DarkSky Kenya Logo"
              width={180}
              height={50}
              className="h-12 w-auto"
              priority
            />
          </Link>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center space-x-8">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium ${
                    item.active
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-800 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
                  } transition-colors`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <ThemeToggle />
            <button
              className="md:hidden p-2 mobile-menu-button z-50"
              onClick={handleMobileMenuToggle}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-sm bg-gradient-to-b from-[#13131f] to-[#0c0c14] p-6 transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-white hover:text-purple-400 transition-colors"
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            <Image
              src={"/images/logo-white.png"}
              alt="DarkSky Kenya Logo"
              width={150}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <nav className="space-y-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block text-xl font-medium ${
                  item.active ? "text-purple-400" : "text-white hover:text-purple-400"
                } transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-10 left-6 right-6">
            <div className="border-t border-gray-700 pt-6 mt-6">
              <p className="text-gray-400 text-sm mb-4">© 2025 DarkSky Kenya</p>
              <div className="flex justify-left">
                <a
                  href="https://www.instagram.com/darkskykenya/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
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
        </div>
      </div>
    </>
  )
}

