export const calculateDeprivation = (family: any) => {
  const attrs = family.attributes.reduce((acc: any, attr: any) => {
    acc[attr.attribute_key] = attr.attribute_value
    return acc
  }, {})

  const members = family.members.map((m: any) => m.member)

  const d1 = attrs['HOUSE_STATUS'] === 'KUCCHA' // One-room/Kuccha
  
  const adultMales = members.filter((m: any) => {
    const age = new Date().getFullYear() - new Date(m.date_of_birth).getFullYear()
    return m.gender === 'MALE' && age >= 16 && age <= 59
  })
  const d2 = adultMales.length === 0 // Female-headed

  const d3 = attrs['CASTE'] === 'SC' || attrs['CASTE'] === 'ST' // SC/ST

  const disabled = false // Mock disabled check for MVP
  const ableBodiedAdult = members.some((m: any) => {
     const age = new Date().getFullYear() - new Date(m.date_of_birth).getFullYear()
     return age >= 16 && age <= 59 // Simplifying check
  })
  const d4 = disabled && !ableBodiedAdult

  const d5 = true // Mock: No literate adult above 25
  const d6 = attrs['LAND_HOLDING'] === '0' // Landless + manual labor (simplified)
  
  const adults = members.filter((m: any) => {
    const age = new Date().getFullYear() - new Date(m.date_of_birth).getFullYear()
    return age >= 16 && age <= 59
  })
  const d7 = adults.length === 0

  let score = 0
  if (d1) score++
  if (d2) score++
  if (d3) score++
  if (d4) score++
  if (d5) score++
  if (d6) score++
  if (d7) score++

  return {
    score,
    indicators: { d1, d2, d3, d4, d5, d6, d7 },
    isDeprived: score >= 3
  }
}
