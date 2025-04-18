"use client"

import { useRef, useEffect, useState } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  speed: number
  maxOpacity: number
  color: string
  points: number
  rotation: number
  rotationSpeed: number
}

interface AnimatedStarsBackgroundProps {
  parentDimensions?: { width: number; height: number }
}

const FPS_LIMIT = 30 // Limit frames per second
const FRAME_MIN_TIME = 1000 / FPS_LIMIT

export default function AnimatedStarsBackground({ parentDimensions }: AnimatedStarsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>(0)
  const devicePixelRatioRef = useRef<number>(1)
  const [isVisible, setIsVisible] = useState(true)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
  const initializedRef = useRef(false)

  // Draw a star shape instead of a simple circle
  const drawStar = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    points: number,
    rotation: number,
  ) => {
    ctx.beginPath()
    for (let i = 0; i < points * 2; i++) {
      const radius2 = i % 2 === 0 ? radius : radius * 0.4
      const angle = (Math.PI * i) / points + rotation
      ctx.lineTo(x + radius2 * Math.cos(angle), y + radius2 * Math.sin(angle))
    }
    ctx.closePath()
  }

  // Initialize stars - distribute them across the entire canvas
  const initStars = () => {
    if (!canvasRef.current) return

    const { width, height } = canvasRef.current

    // Adjust star density based on screen size, but ensure full coverage
    const starCount = Math.min(Math.floor((width * height) / 2000), 300) // Increased density

    // Star colors with improved variety
    const starColors = [
      "rgba(255, 255, 255, 1)", // Pure white
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(255, 255, 255, 1)",
      "rgba(220, 220, 255, 1)", // Blue tint
      "rgba(255, 255, 220, 1)", // Yellow tint
      "rgba(255, 220, 220, 1)", // Red tint
      "rgba(220, 255, 255, 1)", // Cyan tint
      "rgba(255, 220, 255, 1)", // Magenta tint
    ]

    const stars: Star[] = []

    // Create stars distributed across the full canvas area
    for (let i = 0; i < starCount; i++) {
      // Vary the number of points for different star shapes
      const points = Math.random() < 0.7 ? 5 : Math.random() < 0.5 ? 4 : 6

      // Distribute stars across the full canvas area
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.8, // Slightly larger base size
        opacity: Math.random(),
        speed: Math.random() * 0.005 + 0.001,
        maxOpacity: Math.random() * 0.7 + 0.3,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        points: points,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.001, // Some stars rotate slowly
      })
    }

    starsRef.current = stars
    initializedRef.current = true
  }

  // Update canvas dimensions when parent dimensions change
  useEffect(() => {
    if (parentDimensions && parentDimensions.width > 0 && parentDimensions.height > 0) {
      setCanvasDimensions(parentDimensions)
    }
  }, [parentDimensions])

  // Handle resize and setup
  useEffect(() => {
    const updateCanvasSize = () => {
      if (!canvasRef.current) return

      // Get the device pixel ratio for crisp rendering
      devicePixelRatioRef.current = window.devicePixelRatio || 1

      // Use parent dimensions if available, otherwise get from parent element
      let width = canvasDimensions.width
      let height = canvasDimensions.height

      if (width === 0 || height === 0) {
        const parent = canvasRef.current.parentElement
        if (parent) {
          const rect = parent.getBoundingClientRect()
          width = rect.width
          height = rect.height
          setCanvasDimensions({ width, height })
        }
      }

      if (width > 0 && height > 0) {
        // Set the canvas size in CSS pixels to match parent EXACTLY
        canvasRef.current.style.width = `${width}px`
        canvasRef.current.style.height = `${height}px`

        // Set the canvas internal dimensions accounting for device pixel ratio
        canvasRef.current.width = width * devicePixelRatioRef.current
        canvasRef.current.height = height * devicePixelRatioRef.current

        // Regenerate stars when resizing
        initStars()
      }
    }

    // Initial setup
    updateCanvasSize()

    // Add resize listener
    window.addEventListener("resize", updateCanvasSize)

    // Visibility check
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden)
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)

    // Set up intersection observer to check if canvas is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (canvasRef.current) {
      observer.observe(canvasRef.current)
    }

    // Use ResizeObserver for more accurate dimension tracking
    const resizeObserver = new ResizeObserver(() => {
      updateCanvasSize()
    })

    if (canvasRef.current && canvasRef.current.parentElement) {
      resizeObserver.observe(canvasRef.current.parentElement)
    }

    let lastFrameTime = 0

    const animate = (timestamp: number) => {
      if (!canvasRef.current || !isVisible) return

      // Throttle the frame rate
      const deltaTime = timestamp - lastFrameTime
      if (deltaTime < FRAME_MIN_TIME) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }
      lastFrameTime = timestamp

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Scale all drawing operations by the device pixel ratio
      ctx.setTransform(devicePixelRatioRef.current, 0, 0, devicePixelRatioRef.current, 0, 0)

      // Clear canvas - use the FULL canvas dimensions
      ctx.clearRect(0, 0, canvas.width / devicePixelRatioRef.current, canvas.height / devicePixelRatioRef.current)

      // Draw background gradient - ensure it covers the ENTIRE canvas
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height / devicePixelRatioRef.current)
      gradient.addColorStop(0, "#1e1b4b") // Darker purple at top
      gradient.addColorStop(1, "#2e1065") // Lighter purple at bottom
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width / devicePixelRatioRef.current, canvas.height / devicePixelRatioRef.current)

      // Update and draw stars on main thread
      starsRef.current.forEach((star) => {
        // Update opacity for twinkling effect
        star.opacity += star.speed
        if (star.opacity > star.maxOpacity) {
          star.speed = -star.speed
        } else if (star.opacity < 0.1) {
          star.speed = Math.abs(star.speed)
        }

        // Update rotation only for larger stars to save CPU
        if (star.size > 1.2) {
          star.rotation += star.rotationSpeed
        }

        // Draw star with color based on opacity
        const color = star.color.replace("1)", `${star.opacity})`)

        if (star.size > 1.2) {
          // Add glow effect for larger stars
          ctx.save()
          ctx.shadowBlur = star.size * 3
          ctx.shadowColor = color

          // Draw the star shape
          drawStar(ctx, star.x, star.y, star.size, star.points, star.rotation)
          ctx.fillStyle = color
          ctx.fill()

          ctx.restore()
        } else {
          // For smaller stars, use a simpler rendering
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fillStyle = color
          ctx.fill()
        }
      })

      // Reset the transformation
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate(0)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
      observer.disconnect()
      resizeObserver.disconnect()
      cancelAnimationFrame(animationRef.current)
    }
  }, [canvasDimensions])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{
        background: "transparent",
        width: canvasDimensions.width > 0 ? `${canvasDimensions.width}px` : "100%",
        height: canvasDimensions.height > 0 ? `${canvasDimensions.height}px` : "100%",
      }}
      aria-hidden="true"
    />
  )
}

