"use client"
import { useState } from "react"
import type React from "react"

import { Search } from "lucide-react"

export default function LocationSearch() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  const kenyanLocations = [
    "Nairobi",
    "Mombasa",
    "Kisumu",
    "Nakuru",
    "Eldoret",
    "Thika",
    "Malindi",
    "Kitale",
    "Garissa",
    "Kakamega",
    "Nyeri",
    "Meru",
    "Lamu",
    "Machakos",
    "Naivasha",
    "Kericho",
  ]

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)

    if (value.length > 0) {
      const filtered = kenyanLocations.filter((location) => location.toLowerCase().includes(value.toLowerCase()))
      setSuggestions(filtered)
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search for a location in Kenya..."
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((location, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setQuery(location)
                setSuggestions([])
              }}
            >
              {location}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

