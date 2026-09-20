import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Basic Probabilistic Matching Mock
export const scanForDuplicates = async (newFamily: any, newMembers: any[]) => {
  // In a real system we would compare against all existing records using trigrams, fuzzy matching, etc.
  const existingFamilies = await prisma.family.findMany({
    include: { members: { include: { member: true } } }
  })

  let potentialDuplicates = []

  for (const ef of existingFamilies) {
    if (ef.family_id === newFamily.family_id) continue;

    // Check member overlap
    let matchCount = 0
    for (const m1 of newMembers) {
      for (const m2 of ef.members) {
        if (m1.name.toLowerCase() === m2.member.name.toLowerCase() && m1.date_of_birth === m2.member.date_of_birth) {
          matchCount++
        }
      }
    }

    if (matchCount > 0) {
      potentialDuplicates.push({
        existing_family_id: ef.family_id,
        confidence_score: (matchCount / newMembers.length) * 100,
        reason: `${matchCount} members match exactly.`
      })
    }
  }

  return potentialDuplicates
}
