import { Sun, Cloud, CloudRain, CloudDrizzle } from "lucide-react"

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function DailyForecast() {
  // Get the next 7 days
  const getDays = () => {
    const today = new Date()
    return Array(7)
      .fill(null)
      .map((_, i) => {
        const date = new Date(today)
        date.setDate(today.getDate() + i)
        return {
          date,
          day: i === 0 ? "Today" : WEEKDAYS[date.getDay()],
          high: Math.round(25 + Math.random() * 5),
          low: Math.round(18 + Math.random() * 3),
          condition: i % 3 === 0 ? "Sunny" : i % 3 === 1 ? "Partly Cloudy" : "Rain",
        }
      })
  }

  const days = getDays()

  const getIcon = (condition: string) => {
    switch (condition) {
      case "Sunny":
        return <Sun className="h-5 w-5 text-yellow-500" />
      case "Partly Cloudy":
        return <Cloud className="h-5 w-5 text-gray-400" />
      case "Rain":
        return <CloudRain className="h-5 w-5 text-blue-500" />
      default:
        return <CloudDrizzle className="h-5 w-5 text-blue-400" />
    }
  }

  return (
    <div className="space-y-2">
      {days.map((day, index) => (
        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
          <div className="w-24 font-medium">{day.day}</div>
          <div className="flex items-center gap-2">
            {getIcon(day.condition)}
            <span className="text-sm">{day.condition}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">{day.high}°</span>
            <span className="text-gray-500">{day.low}°</span>
          </div>
        </div>
      ))}
    </div>
  )
}

