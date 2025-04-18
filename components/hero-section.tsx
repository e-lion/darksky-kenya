"use client"

import { useRef, useEffect, useState, useMemo, memo } from "react"
import { useTheme } from "next-themes"
import AnimatedStarsBackground from "./animated-stars-background"
import ShootingStars from "./shooting-stars"

interface HeroSectionProps {
  title: string
  subtitle: string
  forceDarkBackground?: boolean
}

// Create memoized versions of the background components
const MemoizedAnimatedStarsBackground = memo(AnimatedStarsBackground)
const MemoizedShootingStars = memo(ShootingStars)

export default function HeroSection({ title, subtitle, forceDarkBackground = false }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Avoid hydration mismatch by only rendering theme-dependent elements after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determine if we should show the dark background
  const showDarkBackground = mounted ? resolvedTheme === "dark" || forceDarkBackground : forceDarkBackground

  // Determine if we should show shooting stars (only in dark mode)
  const showShootingStars = mounted && resolvedTheme === "dark"

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    // Initial update after DOM is ready
    updateDimensions()

    // Use ResizeObserver for more accurate dimension tracking
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === containerRef.current) {
          const { width, height } = entry.contentRect
          setDimensions({ width, height })
        }
      }
    })

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Also listen for window resize as a fallback
    window.addEventListener("resize", updateDimensions)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Optional parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const scrollPosition = window.scrollY
      if (scrollPosition < window.innerHeight) {
        const opacity = 1 - (scrollPosition / window.innerHeight) * 0.5
        containerRef.current.style.opacity = opacity.toString()

        // Subtle parallax effect
        containerRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Memoize the title and subtitle classes calculation
  const titleClass = useMemo(() => {
    if (!mounted) {
      return forceDarkBackground ? "text-white" : "text-gray-900"
    }

    if (forceDarkBackground && resolvedTheme === "light") {
      return "text-white"
    }
    return resolvedTheme === "dark" ? "text-white" : "text-gray-900"
  }, [mounted, forceDarkBackground, resolvedTheme])

  const subtitleClass = useMemo(() => {
    if (!mounted) {
      return forceDarkBackground ? "text-gray-300" : "text-gray-600"
    }

    if (forceDarkBackground && resolvedTheme === "light") {
      return "text-gray-300"
    }
    return resolvedTheme === "dark" ? "text-gray-300" : "text-gray-600"
  }, [mounted, forceDarkBackground, resolvedTheme])

  return (
    <section className="relative h-[500px] md:h-[600px] overflow-hidden">
      <div ref={containerRef} className="absolute inset-0">
        {showDarkBackground && (
          <div
            ref={backgroundRef}
            className="absolute inset-0 z-0"
            style={{
              width: dimensions.width > 0 ? `${dimensions.width}px` : "100%",
              height: dimensions.height > 0 ? `${dimensions.height}px` : "100%",
            }}
          >
            <MemoizedAnimatedStarsBackground parentDimensions={dimensions} />
            {showShootingStars && <MemoizedShootingStars parentDimensions={dimensions} />}
          </div>
        )}
        {/* Use a safe default for the gradient before hydration */}
        <div
          className={`absolute inset-0 bg-gradient-to-b ${
            !mounted
              ? forceDarkBackground
                ? "from-transparent to-[#0c0c14]/80"
                : "from-transparent to-white/80"
              : forceDarkBackground || resolvedTheme === "dark"
                ? "from-transparent to-[#0c0c14]/80"
                : "from-transparent to-white/80"
          }`}
        ></div>
      </div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center z-10">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 ${titleClass} transition-colors duration-300`}>
          {title}
        </h1>
        <p className={`text-lg md:text-xl ${subtitleClass} max-w-3xl transition-colors duration-300`}>{subtitle}</p>
      </div>
    </section>
  )
}

