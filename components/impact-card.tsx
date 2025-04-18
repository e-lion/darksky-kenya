interface ImpactCardProps {
  title: string
  description: string
}

export default function ImpactCard({ title, description }: ImpactCardProps) {
  return (
    <div className="border-l-2 border-purple-600 dark:border-purple-600 pl-4">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  )
}

