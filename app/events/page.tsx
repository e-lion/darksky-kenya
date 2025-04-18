"use client"

import Image from "next/image"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import SiteHeader from "@/components/site-header"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import EventCard from "@/components/event-card"

export default function Events() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/our-work", label: "Our Work" },
    { href: "/mission", label: "The Mission" },
    { href: "/events", label: "Upcoming Events", active: true },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader navItems={navItems} />

      <HeroSection
        title="Upcoming Events"
        subtitle="Join us for our upcoming events and activities to learn more about dark skies and how you can help protect them."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Host Your Own Event</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Interested in hosting a dark sky event in your community? We can provide resources, speakers, and support to
            help you create a successful stargazing or educational event.
          </p>
          <Link 
            href="/contact" 
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-8 py-3 text-lg font-medium hover:bg-primary/90"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src={mounted && resolvedTheme === "light" ? "/images/logo-black.png" : "/images/logo-white.png"}
                alt="DarkSky Kenya Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <p className="text-muted-foreground mt-2">© 2025 DarkSky Kenya</p>
            </div>
            <div className="flex space-x-6">
              <Link href="https://www.instagram.com/darkskykenya/" aria-label="Instagram">
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
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

interface Event {
  title: string
  date: string
  location: string
  description: string
  registrationLink?: string
}

const events: Event[] = [
  {
    title: "Kenya Dark Sky Festival 2025",
    date: "April 21-28, 2025",
    location: "Oloshoibor, Kajiado West",
    description:
      "A week-long extravaganza of learning activities and exciting outdoors action including rocket building, star gazing, fireside chats, Space Challenge and many more, all under the bright twinkling stars deep in Kajiado West.",
    registrationLink: "https://forms.office.com/r/ytLwBiiSNy",
  },
]
