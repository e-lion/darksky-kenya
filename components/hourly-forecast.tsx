"use client"
import { useState } from "react"
import { Sun, Cloud, CloudRain, CloudDrizzle, ChevronLeft, ChevronRight } from "lucide-react"

export default function HourlyForecast() {
  const [startIndex, setStartIndex] = useState(0)

  // Generate hourly forecast data
  const getHourlyData = () => {
    const now = new Date()
    return Array(24)
      .fill(null)
      .map((_, i) => {
        const hour = new Date(now)
        hour.setHours(now.getHours() + i)
        return {
          hour,
          temp: Math.round(22 + Math.sin(i / 4) * 5 + Math.random() * 2),
          condition: i % 4 === 0 ? "Sunny" : i % 4 === 1 ? "Cloudy" : i % 4 === 2 ? "Rain" : "Drizzle",
          precipitation: Math.round(
            i % 4 === 2 ? 60 + Math.random() * 20 : i % 4 === 3 ? 30 + Math.random() * 15 : Math.random() * 10,
          ),
        }
      })
  }

  const hourlyData = getHourlyData()
  const visibleHours = hourlyData.slice(startIndex, startIndex + 12)

  const getIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "Cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "Rain":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      case "Drizzle":
        return <CloudDrizzle className="h-5 w-5 text-blue-400" />
      default:
        return <Sun className="h-5 w-5 text-yellow-500" />
    }
  }

  const handlePrevious = () => {
    setStartIndex(Math.max(0, startIndex - 6))
  }

  const handleNext = () => {
    setStartIndex(Math.min(hourlyData.length - 12, startIndex + 6))
  }

  return (
    <div className="relative">
      <div className="flex overflow-x-hidden">
        {visibleHours.map((hour, index) => (
          <div key={index} className="flex-shrink-0 w-1/6 text-center">
            <div className="text-sm">
              {hour.hour.getHours() === new Date().getHours() && startIndex === 0 && index === 0
                ? "Now"
                : `${hour.hour.getHours()}:00`}
            </div>
            <div className="my-2 flex justify-center">{getIcon(hour.condition)}</div>
            <div className="font-medium">{hour.temp}°</div>
            <div className="text-xs text-blue-500 mt-1">{hour.precipitation}%</div>
          </div>
        ))}
      </div>

      {startIndex > 0 && (
        <button
          onClick={handlePrevious}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-sm"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {startIndex < hourlyData.length - 12 && (
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-1 shadow-sm"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}

