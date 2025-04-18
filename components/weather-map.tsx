"use client"

import { useState } from "react"
import Image from "next/image"

export default function WeatherMap() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden bg-blue-50">
      <div className="absolute inset-0">
        <Image src="/placeholder.svg?height=400&width=600" alt="Weather Map of Kenya" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-900/20"></div>
      </div>
      <div className="absolute top-0 right-0 p-3">
        <div className="bg-white/90 rounded-md shadow-sm p-2 text-sm">
          <select className="bg-transparent border-none text-sm outline-none" defaultValue="precipitation">
            <option value="precipitation">Precipitation</option>
            <option value="temperature">Temperature</option>
            <option value="wind">Wind</option>
            <option value="cloud">Cloud Cover</option>
          </select>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <div className="flex justify-between items-center bg-white/90 rounded-md shadow-sm p-2 text-xs">
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-900"></span>
            <span>Heavy</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-700"></span>
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>Light</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-300"></span>
            <span>Drizzle</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-full bg-blue-100"></span>
            <span>None</span>
          </div>
        </div>
      </div>
    </div>
  )
}

