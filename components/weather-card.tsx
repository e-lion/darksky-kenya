import type { LucideIcon } from "lucide-react"
import { Sun, Cloud, CloudRain, CloudDrizzle, CloudFog, CloudLightning } from "lucide-react"

interface WeatherCardProps {
  city: string
  temperature: number
  condition: string
  icon: string
}

export default function WeatherCard({ city, temperature, condition, icon }: WeatherCardProps) {
  const getWeatherIcon = (iconName: string): LucideIcon => {
    switch (iconName) {
      case "sun":
        return Sun
      case "cloud":
        return Cloud
      case "rain":
        return CloudRain
      case "drizzle":
        return CloudDrizzle
      case "fog":
        return CloudFog
      case "thunder":
        return CloudLightning
      default:
        return Sun
    }
  }

  const WeatherIcon = getWeatherIcon(icon)

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg">{city}</h3>
          <p className="text-gray-500 text-sm">{condition}</p>
        </div>
        <WeatherIcon className="h-10 w-10 text-primary" />
      </div>
      <div className="mt-4">
        <div className="text-3xl font-bold">{temperature}°C</div>
      </div>
      <div className="mt-4 pt-4 border-t flex justify-between text-sm text-gray-500">
        <div>H: {temperature + 2}°C</div>
        <div>L: {temperature - 2}°C</div>
      </div>
    </div>
  )
}

