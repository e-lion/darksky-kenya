"use client"
import Image from "next/image"
import Link from "next/link"
import { Telescope, Leaf, Compass, Building2, Heart, Zap, LightbulbOff, Users, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import SiteHeader from "@/components/site-header"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import CategoryCard from "@/components/category-card"
import ImpactCard from "@/components/impact-card"
import InitiativeCard from "@/components/initiative-card"

// Add this hook for intersection observer
function useIntersectionObserver(options = {}) {
  const [ref, setRef] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!ref) return

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting)
    }, options)

    observer.observe(ref)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return [setRef, isVisible]
}

export default function Home() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Define navigation items for the home page
  const navItems = [
    { href: "/our-work", label: "Our Work" },
    { href: "/mission", label: "The Mission" },
    { href: "/events", label: "Upcoming Events" },
  ]

  // Use intersection observer for lazy loading
  const [impactSectionRef, isImpactSectionVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
  })

  const [initiativeSectionRef, isInitiativeSectionVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: "100px",
  })

  return (
    <div className="min-h-screen bg-white dark:bg-[#0c0c14] text-gray-900 dark:text-white">
      <SiteHeader navItems={navItems} />

      {/* Add key to force re-render when theme changes */}
      <HeroSection
        key={mounted ? resolvedTheme : "initial"}
        title="Protecting and preserving the night skies of Kenya"
        subtitle="The mission of DarkSky Kenya is to protect and preserve the night skies of Kenya."
        forceDarkBackground={true}
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <CategoryCard icon={<Telescope className="h-6 w-6" />} title="Astronomy" />
            <CategoryCard icon={<Leaf className="h-6 w-6" />} title="Wildlife" />
            <CategoryCard icon={<Compass className="h-6 w-6" />} title="Tourism" />
            <CategoryCard icon={<Building2 className="h-6 w-6" />} title="Heritage" />
            <CategoryCard icon={<Heart className="h-6 w-6" />} title="Health" />
            <CategoryCard icon={<Zap className="h-6 w-6" />} title="Energy" />
          </div>
        </div>
      </section>

      <section ref={impactSectionRef} className="py-16 bg-gray-100 dark:bg-[#0a0a12]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Impact of Light Pollution</h2>
          {isImpactSectionVisible && (
            <div className="space-y-6">
              <ImpactCard
                title="Biodiversity"
                description="It affects the health of wildlife, ecosystems, and humans."
              />
              <ImpactCard title="Cultural Heritage" description="Affects the cultural heritage of communities." />
              <ImpactCard title="Economic Impact" description="Attracts tourists who travel to see dark skies." />
            </div>
          )}
        </div>
      </section>

      <section ref={initiativeSectionRef} className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Our Initiatives</h2>
          {isInitiativeSectionVisible && (
            <div className="space-y-6">
              <InitiativeCard
                icon={<LightbulbOff className="h-6 w-6" />}
                title="Lighting Assessments"
                description="Assess light pollution levels across Kenya."
              />
              <InitiativeCard
                icon={<Users className="h-6 w-6" />}
                title="Outreach"
                description="Engage with local communities."
              />
              <InitiativeCard
                icon={<FileText className="h-6 w-6" />}
                title="Policy Advocacy"
                description="Advocate for policies that promote smart lighting."
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gray-100 dark:bg-[#0a0a12]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Help us protect Kenya's night skies for future generations. Join our community of stargazers,
            conservationists, and dark sky enthusiasts.
          </p>
          <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-6 rounded-md text-lg">Join us</Button>
        </div>
      </section>

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
                  className="text-gray-400 dark:text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
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

