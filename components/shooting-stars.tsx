"use client"

import { useEffect, useRef, useState } from "react"

interface ShootingStar {
  x: number
  y: number
  length: number
  speed: number
  opacity: number
  active: boolean
  angle: number
  width: number
  color: string
}

interface ShootingStarsProps {
  parentDimensions?: { width: number; height: number }
}

export default function ShootingStars({ parentDimensions }: ShootingStarsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shootingStarsRef = useRef<ShootingStar[]>([])
  const animationRef = useRef<number>(0)
  const devicePixelRatioRef = useRef<number>(1)
  const [mounted, setMounted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 0, height: 0 })
  const initializedRef = useRef(false)

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Update canvas dimensions when parent dimensions change
  useEffect(() => {
    if (parentDimensions && parentDimensions.width > 0 && parentDimensions.height > 0) {
      setCanvasDimensions(parentDimensions)
    }
  }, [parentDimensions])

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

        // Initialize shooting stars
        initShootingStars()
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0 },
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

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      observer.disconnect()
      resizeObserver.disconnect()
    }
  }, [canvasDimensions])

  // Create shooting stars across the entire canvas
  const initShootingStars = () => {
    if (!canvasRef.current) return

    const { width, height } = canvasRef.current
    const stars: ShootingStar[] = []

    // Adjust star count based on screen size
    const starCount = Math.max(3, Math.min(5, Math.floor(width / 300)))

    // Create a pool of shooting stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height, // Use full height
        length: Math.random() * 80 + 50,
        speed: Math.random() * 5 + 10,
        opacity: 0,
        active: false,
        angle: Math.PI / 4 + (Math.random() * Math.PI) / 4, // Angle between 45-90 degrees
        width: Math.random() * 2 + 1, // Vary the width of the shooting star
        color: getRandomStarColor(),
      })
    }

    shootingStarsRef.current = stars
    initializedRef.current = true
  }

  const getRandomStarColor = () => {
    // Create a variety of star colors
    const colors = [
      "255, 255, 255", // White
      "255, 255, 240", // Warm white
      "240, 240, 255", // Cool white
      "255, 240, 220", // Slight yellow
      "220, 240, 255", // Slight blue
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  useEffect(() => {
    if (!canvasRef.current || !mounted) return

    let lastShootingStarTime = 0
    const minTimeBetweenStars = 3000 // Minimum 3 seconds between shooting stars
    const maxTimeBetweenStars = 8000 // Maximum 8 seconds between shooting stars

    // Add throttling to the animation frame
    const FPS_LIMIT = 24 // Can be lower for shooting stars
    const FRAME_MIN_TIME = 1000 / FPS_LIMIT
    let lastFrameTime = 0

    const animate = (timestamp: number) => {
      if (!canvasRef.current || !mounted || !isVisible) return

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

      // Check if we should activate a new shooting star
      if (timestamp - lastShootingStarTime > minTimeBetweenStars) {
        const inactiveStars = shootingStarsRef.current.filter((star) => !star.active)

        if (inactiveStars.length > 0 && Math.random() < 0.1) {
          // 10% chance each frame after min time
          const randomIndex = Math.floor(Math.random() * inactiveStars.length)
          const randomStar = inactiveStars[randomIndex]

          randomStar.active = true
          randomStar.opacity = 1

          // Position the star at a random location in the top half of the canvas
          randomStar.x = Math.random() * (canvas.width / devicePixelRatioRef.current)
          randomStar.y = Math.random() * (canvas.height / devicePixelRatioRef.current / 2)

          randomStar.angle = Math.PI / 4 + (Math.random() * Math.PI) / 4
          randomStar.width = Math.random() * 2 + 1
          randomStar.color = getRandomStarColor()

          // Set next shooting star to appear after a random time
          lastShootingStarTime = timestamp + Math.random() * (maxTimeBetweenStars - minTimeBetweenStars)
        }
      }

      // Update and draw shooting stars
      shootingStarsRef.current.forEach((star) => {
        if (!star.active) return

        // Update position
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Fade out as it moves
        star.opacity -= 0.01

        // Deactivate if off screen or faded out
        if (
          star.x > canvas.width / devicePixelRatioRef.current ||
          star.y > canvas.height / devicePixelRatioRef.current ||
          star.opacity <= 0
        ) {
          star.active = false
          return
        }

        // Draw shooting star with enhanced effects
        ctx.save()

        // Add glow effect
        ctx.shadowBlur = 10
        ctx.shadowColor = `rgba(${star.color}, ${star.opacity * 0.7})`

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)

        // Calculate tail end position
        const tailX = star.x - Math.cos(star.angle) * star.length
        const tailY = star.y - Math.sin(star.angle) * star.length

        // Create gradient for tail
        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY)
        gradient.addColorStop(0, `rgba(${star.color}, ${star.opacity})`)
        gradient.addColorStop(0.3, `rgba(${star.color}, ${star.opacity * 0.6})`)
        gradient.addColorStop(1, `rgba(${star.color}, 0)`)

        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = star.width
        ctx.lineCap = "round"
        ctx.stroke()

        // Draw bright point at the head
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.width, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`
        ctx.fill()

        ctx.restore()
      })

      // Reset the transformation
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [mounted, isVisible])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none transition-opacity duration-500"
      style={{
        background: "transparent",
        width: canvasDimensions.width > 0 ? `${canvasDimensions.width}px` : "100%",
        height: canvasDimensions.height > 0 ? `${canvasDimensions.height}px` : "100%",
      }}
      aria-hidden="true"
    />
  )
}

