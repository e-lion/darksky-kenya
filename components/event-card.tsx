import Link from "next/link"
import { Calendar, MapPin, ArrowRight } from "lucide-react"

interface EventProps {
  event: {
    title: string
    date: string
    location: string
    description: string
  }
}

export default function EventCard({ event }: EventProps) {
  return (
    <div className="bg-card rounded-lg p-6 hover:bg-card/90 transition-colors">
      <h3 className="text-xl font-bold mb-2">{event.title}</h3>
      <div className="flex items-center text-muted-foreground mb-2">
        <Calendar className="h-4 w-4 mr-2" />
        <span>{event.date}</span>
      </div>
      <div className="flex items-center text-muted-foreground mb-4">
        <MapPin className="h-4 w-4 mr-2" />
        <span>{event.location}</span>
      </div>
      <p className="text-foreground mb-4">{event.description}</p>
      <Link href="#" className="text-primary hover:text-primary/80 inline-flex items-center">
        Register <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  )
}

