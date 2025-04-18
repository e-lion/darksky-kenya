"use client"

import { useState } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import Image from "next/image"

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2" aria-label="Open menu">
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
          className="lucide lucide-menu"
        >
          <line x1="4" x2="20" y1="12" y2="12" />
          <line x1="4" x2="20" y1="6" y2="6" />
          <line x1="4" x2="20" y1="18" y2="18" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-[#0c0c14] p-4">
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              <Image src="/images/logo.png" alt="DarkSky Kenya Logo" width={150} height={40} className="h-10 w-auto" />
            </Link>
            <button onClick={() => setIsOpen(false)} className="p-2" aria-label="Close menu">
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col space-y-6">
            <Link
              href="/our-work"
              className="text-lg font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Our Work
            </Link>
            <Link
              href="/blog"
              className="text-lg font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/mission"
              className="text-lg font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              The Mission
            </Link>
            <Link
              href="/learn-more"
              className="text-lg font-medium hover:text-purple-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Learn More
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}

