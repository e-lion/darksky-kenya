import type React from "react"

interface CategoryCardProps {
  icon: React.ReactNode
  title: string
}

export default function CategoryCard({ icon, title }: CategoryCardProps) {
  return (
    <div className="bg-white dark:bg-[#13131f] hover:bg-gray-50 dark:hover:bg-[#1a1a2e] transition-colors rounded-lg p-6 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="mb-3 text-purple-600 dark:text-purple-400">{icon}</div>
      <h3 className="font-medium">{title}</h3>
    </div>
  )
}

