import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { calculateDeprivation } from '../engines/deprivation'
import { calculateExclusion } from '../engines/exclusion'
import { evaluateEligibility } from '../engines/eligibility'
import { authenticate, requireRole, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Get all entitlements for a family
router.get('/entitlements/:familyId', authenticate, async (req: AuthRequest, res) => {
  try {
    const familyId = Array.isArray(req.params.familyId) ? req.params.familyId[0] : req.params.familyId
    const family = await prisma.family.findUnique({
      where: { family_id: familyId },
      include: {
        members: { include: { member: true } },
        attributes: true,
        benefits: true
      }
    })

    if (!family) {
      return res.status(404).json({ message: 'Family not found' })
    }

    const schemes = await prisma.scheme.findMany({
      where: { status: 'ACTIVE' }
    })

    const deprivation = calculateDeprivation(family)
    const exclusion = calculateExclusion(family)

    if (exclusion.isExcluded) {
      return res.json({
        deprivation,
        exclusion,
        entitlements: []
      })
    }

    const entitlements = schemes.map(scheme => {
      const eligibility = evaluateEligibility(family, scheme)

      // Check if already receiving this benefit
      const isEnrolled = (family as any).benefits.some((b: any) => b.scheme_id === scheme.scheme_id)

      return {
        scheme,
        isEligible: eligibility.isEligible,
        reasons: eligibility.reasons,
        isEnrolled
      }
    })

    res.json({
      deprivation,
      exclusion,
      entitlements
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Apply for a scheme
router.post('/apply', authenticate, requireRole(['CITIZEN']), async (req: AuthRequest, res) => {
  // Mock application process
  const { familyId, schemeId } = req.body

  // In a real system we would create an application record here
  res.status(201).json({ message: 'Application submitted successfully', status: 'PENDING_VERIFICATION' })
})

export default router
