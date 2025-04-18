import type React from "react"
import Link from "next/link"

interface InitiativeCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export default function InitiativeCard({ icon, title, description }: InitiativeCardProps) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white dark:bg-[#13131f] rounded-lg shadow-sm">
      <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-full text-purple-600 dark:text-purple-400">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400">{description}</p>
        <div className="flex justify-end mt-2">
          <Link
            href="#"
            className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  )
}

