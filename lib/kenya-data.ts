export const kenyanCities = [
  {
    name: "Nairobi",
    temperature: 27,
    condition: "Sunny",
    icon: "sun",
  },
  {
    name: "Mombasa",
    temperature: 30,
    condition: "Partly Cloudy",
    icon: "cloud",
  },
  {
    name: "Kisumu",
    temperature: 29,
    condition: "Cloudy",
    icon: "cloud",
  },
  {
    name: "Nakuru",
    temperature: 25,
    condition: "Sunny",
    icon: "sun",
  },
  {
    name: "Eldoret",
    temperature: 22,
    condition: "Light Rain",
    icon: "rain",
  },
  {
    name: "Malindi",
    temperature: 31,
    condition: "Sunny",
    icon: "sun",
  },
  {
    name: "Kitale",
    temperature: 24,
    condition: "Cloudy",
    icon: "cloud",
  },
  {
    name: "Garissa",
    temperature: 34,
    condition: "Hot",
    icon: "sun",
  },
]

export const kenyaRegions = [
  {
    name: "Central",
    counties: ["Kiambu", "Kirinyaga", "Murang'a", "Nyandarua", "Nyeri"],
  },
  {
    name: "Coast",
    counties: ["Kilifi", "Kwale", "Lamu", "Mombasa", "Taita-Taveta", "Tana River"],
  },
  {
    name: "Eastern",
    counties: ["Embu", "Isiolo", "Kitui", "Machakos", "Makueni", "Marsabit", "Meru", "Tharaka-Nithi"],
  },
  {
    name: "Nairobi",
    counties: ["Nairobi"],
  },
  {
    name: "North Eastern",
    counties: ["Garissa", "Mandera", "Wajir"],
  },
  {
    name: "Nyanza",
    counties: ["Homa Bay", "Kisii", "Kisumu", "Migori", "Nyamira", "Siaya"],
  },
  {
    name: "Rift Valley",
    counties: [
      "Baringo",
      "Bomet",
      "Elgeyo-Marakwet",
      "Kajiado",
      "Kericho",
      "Laikipia",
      "Nakuru",
      "Nandi",
      "Narok",
      "Samburu",
      "Trans-Nzoia",
      "Turkana",
      "Uasin Gishu",
      "West Pokot",
    ],
  },
  {
    name: "Western",
    counties: ["Bungoma", "Busia", "Kakamega", "Vihiga"],
  },
]

export const weatherAlerts = [
  {
    region: "Coast",
    severity: "warning",
    message:
      "Heavy rainfall expected in the coastal regions of Mombasa and Malindi over the next 48 hours. Possible flooding in low-lying areas.",
  },
  {
    region: "Rift Valley",
    severity: "watch",
    message: "Strong winds expected in parts of Narok and Kajiado counties. Herders advised to take precautions.",
  },
  {
    region: "Western",
    severity: "advisory",
    message: "Moderate rainfall expected in Kakamega and surrounding areas. Agricultural activities may be affected.",
  },
]

