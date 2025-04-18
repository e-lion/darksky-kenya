"use client"

import { useState } from "react"

interface DebugBoundaryProps {
  enabled?: boolean
  color?: string
  label?: string
}

export default function DebugBoundary({
  enabled = false,
  color = "rgba(255, 0, 0, 0.5)",
  label = "Debug Boundary",
}: DebugBoundaryProps) {
  const [isVisible, setIsVisible] = useState(enabled)

  if (!isVisible) return null

  return (
    <div
      className="absolute inset-0 pointer-events-none z-50 border-2 flex items-center justify-center"
      style={{ borderColor: color }}
    >
      <div className="bg-black/70 text-white px-2 py-1 rounded text-xs" style={{ color: color }}>
        {label}
      </div>
      <button
        className="absolute top-1 right-1 bg-black/70 text-white px-2 py-1 rounded text-xs pointer-events-auto"
        onClick={() => setIsVisible(false)}
      >
        Hide
      </button>
    </div>
  )
}

