import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface ProjectProps {
  project: {
    title: string
    description: string
    image: string
    category: string
  }
}

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <div className="bg-card rounded-lg overflow-hidden hover:transform hover:scale-[1.02] transition-all">
      <div className="h-48 relative">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1">
          {project.category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <Link href="#" className="text-primary hover:text-primary/80 inline-flex items-center">
          Learn more <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}

