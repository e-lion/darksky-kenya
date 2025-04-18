"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/hero-section"
import SiteHeader from "@/components/site-header"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export default function Mission() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { href: "/our-work", label: "Our Work" },
    { href: "/blog", label: "Blog" },
    { href: "/mission", label: "The Mission", active: true },
    { href: "/learn-more", label: "Learn More" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader navItems={navItems} />

      <HeroSection
        title="Our Mission"
        subtitle="DarkSky Kenya is dedicated to protecting and preserving the night skies of Kenya for current and future generations."
      />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-4">Why Dark Skies Matter</h2>
              <p className="text-muted-foreground mb-4">
                Kenya's night skies are a natural resource of immense value. They are integral to wildlife behavior,
                cultural heritage, and human well-being. Light pollution threatens this resource, disrupting ecosystems
                and obscuring our view of the stars.
              </p>
              <p className="text-muted-foreground">
                By preserving dark skies, we protect Kenya's biodiversity, cultural traditions, and create opportunities
                for astro-tourism that can benefit local communities economically.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Night sky over Kenyan landscape"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
            <div className="order-2 md:order-1 relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Light pollution in urban Kenya"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-4">The Challenge</h2>
              <p className="text-muted-foreground mb-4">
                Rapid urbanization and development in Kenya have led to increasing light pollution. Many outdoor
                lighting installations are inefficient, poorly designed, and excessively bright, causing unnecessary sky
                glow that obscures the stars.
              </p>
              <p className="text-muted-foreground">
                Without intervention, Kenya risks losing the natural darkness that is essential for wildlife, cultural
                practices, and the opportunity to experience the wonder of a truly dark night sky.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
              <p className="text-muted-foreground mb-4">
                DarkSky Kenya takes a comprehensive approach to protecting night skies through education, advocacy, and
                practical solutions. We work with communities, governments, and businesses to implement responsible
                lighting practices.
              </p>
              <p className="text-muted-foreground">
                Our initiatives include conducting light pollution surveys, developing dark sky-friendly lighting
                guidelines, and establishing dark sky places where the natural nighttime environment is preserved.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="DarkSky Kenya community workshop"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Conservation</h3>
              <p className="text-muted-foreground">
                We are committed to preserving Kenya's natural darkness as a vital resource for wildlife, ecosystems,
                and human well-being.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Education</h3>
              <p className="text-muted-foreground">
                We believe in raising awareness about the importance of dark skies and empowering communities with
                knowledge about light pollution.
              </p>
            </div>
            <div className="bg-card p-8 rounded-lg">
              <h3 className="text-xl font-bold mb-4 text-primary">Collaboration</h3>
              <p className="text-muted-foreground">
                We work together with diverse stakeholders, from local communities to government agencies, to create
                sustainable solutions for protecting night skies.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Help us protect Kenya's night skies for future generations. Together, we can preserve the wonder of starry
            nights and the natural darkness that is essential for wildlife and human well-being.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 rounded-md text-lg">
            Get Involved
          </Button>
        </div>
      </section>

      <footer className="py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <Image
                src={
                  mounted
                    ? resolvedTheme === "light"
                      ? "/images/logo-black.png"
                      : "/images/logo-white.png"
                    : "/images/logo-white.png"
                }
                alt="DarkSky Kenya Logo"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <p className="text-muted-foreground mt-2">© 2025 DarkSky Kenya</p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" aria-label="Twitter">
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
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </Link>
              <Link href="#" aria-label="Facebook">
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
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </Link>
              <Link href="#" aria-label="Instagram">
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

