"use client"

import Image from "next/image"
import Link from "next/link"
import HeroSection from "@/components/hero-section"
import SiteHeader from "@/components/site-header"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

// Import components directly for now to troubleshoot
import ProjectCard from "@/components/project-card"
import EventCard from "@/components/event-card"

export default function OurWork() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/our-work", label: "Our Work", active: true },
    { href: "/mission", label: "The Mission" },
    { href: "/events", label: "Upcoming Events" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader navItems={navItems} />

      <HeroSection
        title="Our Work"
        subtitle="DarkSky Kenya works to protect the night skies through education, advocacy, and community engagement."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {events.map((event, index) => (
              <EventCard key={index} event={event} />
            ))}
          </div>
          <div className="text-center">
            <Link 
              href="/events"
              className="inline-flex items-center justify-center px-6 py-3 border border-primary rounded-md text-base font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
            >
              View all events <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="bg-card p-6 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-secondary rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl font-bold text-muted-foreground">{partner.initial}</span>
                  </div>
                  <h3 className="font-medium">{partner.name}</h3>
                </div>
              </div>
            ))}
          </div>
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

interface Project {
  title: string
  description: string
  image: string
  category: string
}

const projects: Project[] = [
  {
    title: "Nairobi Light Pollution Survey",
    description:
      "We plan to conduct a comprehensive assessment of light pollution in Kenya's capital city, identifying hotspots and recommending mitigation strategies.",
    image: "/images/ds-placeholder-1.png?height=300&width=400",
    category: "Research",
  },
  {
    title: "Dark Sky Places",
    description:
      "Working with conservancies to establish Kenya's first Dark Sky Places.",
    image: "/images/ds-placeholder-2.png?height=300&width=400",
    category: "Conservation",
  },
  {
    title: "School Outreach Program",
    description:
      "Educational initiative bringing dark sky awareness to schools across Kenya, with a focus on rural areas with minimal light pollution.",
    image: "/images/ds-placeholder-3.png?height=300&width=400",
    category: "Education",
  },
  {
    title: "Smart Lighting Guidelines",
    description:
      "Development of guidelines for municipalities and businesses to implement dark sky-friendly lighting solutions.",
    image: "/images/ds-placeholder-4.png?height=300&width=400",
    category: "Policy",
  },
  {
    title: "Astro-Tourism Development",
    description:
      "Partnership with tourism stakeholders to develop and promote astro-tourism experiences in Kenya's dark sky areas.",
    image: "/images/ds-placeholder-5.png?height=300&width=400",
    category: "Tourism",
  },
  {
    title: "Community Star Parties",
    description: "We envision hosting regular stargazing events for communities across Kenya, fostering appreciation for the night sky.",
    image: "/images/ds-placeholder-6.png?height=300&width=400",
    category: "Community",
  },
]

interface Event {
  title: string
  date: string
  location: string
  description: string
}

const events: Event[] = [
  {
    title: "Kenya Dark Sky Festival 2025",
    date: "April 21-28, 2025",
    location: "Oloshoibor, Kajiado West",
    description:
      "A week-long extravaganza of learning activities and exciting outdoors action including rocket building, star gazing, fireside chats, Space Challenge and many more, all under the bright twinkling stars deep in Kajiado West.",
    registrationLink: "#",
  },
]

const partners = [
  // { name: "Kenya Wildlife Service", initial: "KWS" },
  // { name: "Ministry of Tourism", initial: "MT" },
  // { name: "University of Nairobi", initial: "UoN" },
  // { name: "Kenya Astronomical Society", initial: "KAS" },
  // { name: "National Museums of Kenya", initial: "NMK" },
  // { name: "Kenya Tourism Board", initial: "KTB" },
  // { name: "DarkSky International", initial: "IDA" },
  // { name: "African Astronomical Society", initial: "AAS" },
  { name: "DarkSky International", initial: "DarkSky" },
  { name: "Kenya Wildlife Conservancies Association", initial: "KCWA" },
  { name: "Travelling Telescope", initial: "TT" },
  { name: "Space Society Kenya", initial: "SSK" },
]

