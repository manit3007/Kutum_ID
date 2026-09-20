import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { authenticate, requireRole, AuthRequest } from '../middleware/auth'

const router = Router()
const prisma = new PrismaClient()

// Get full family profile
router.get('/:id', authenticate, async (req: AuthRequest, res) => {
  try {
    const familyId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const family = await prisma.family.findUnique({
      where: { family_id: familyId },
      include: {
        members: {
          include: {
            member: true
          }
        },
        attributes: true,
        benefits: {
          include: {
            scheme: true
          }
        }
      }
    })

    if (!family) {
      return res.status(404).json({ message: 'Family not found' })
    }

    // Calculate mock data quality score based on verified attributes
    const totalAttrs = family.attributes.length
    const verifiedAttrs = family.attributes.filter((a: any) => a.verification_status === 'VERIFIED').length
    const dataQuality = totalAttrs === 0 ? 0 : Math.round((verifiedAttrs / totalAttrs) * 100)

    // Auto-update family status if all attributes are verified
    if (totalAttrs > 0 && verifiedAttrs === totalAttrs && family.status === 'PENDING_VERIFICATION') {
      await prisma.family.update({
        where: { family_id: familyId },
        data: {
          status: 'VERIFIED',
          verification_status: 'VERIFIED',
          last_verified_date: new Date()
        }
      })
      family.status = 'VERIFIED'
      family.verification_status = 'VERIFIED'
    }

    res.json({
      ...family,
      dataQuality
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Search candidate families
router.get('/search', authenticate, async (req: AuthRequest, res) => {
  try {
    const { query } = req.query
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ message: 'Query parameter required' })
    }

    const families = await prisma.family.findMany({
      where: {
        family_id: { contains: query }
      },
      include: {
        members: {
          include: {
            member: true
          }
        }
      },
      take: 10
    })

    res.json(families)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Create new family declaration (Citizen flow)
router.post('/', authenticate, requireRole(['CITIZEN', 'ADMIN']), async (req: AuthRequest, res) => {
  try {
    const { address, district, taluka, village_or_ward, household_type, members, attributes } = req.body

    if (!address || !district) {
      return res.status(400).json({ message: 'Address and district are required' })
    }

    // Generate unique family ID
    const family_id = `GJ-FAM-${Date.now().toString().slice(-6)}`

    // Create family
    const family = await prisma.family.create({
      data: {
        family_id,
        address,
        district: district || 'Ahmedabad',
        taluka: taluka || 'Unknown',
        village_or_ward: village_or_ward || 'Unknown',
        household_type: household_type || 'KUCCHA',
        status: 'PENDING_VERIFICATION',
        verification_status: 'PENDING'
      }
    })

    // Add members if provided
    if (members && Array.isArray(members)) {
      for (const memberData of members) {
        const member_id = `GJ-MEM-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`
        const member = await prisma.member.create({
          data: {
            member_id,
            name: memberData.name,
            date_of_birth: new Date(memberData.date_of_birth),
            gender: memberData.gender,
            life_status: 'ALIVE'
          }
        })

        await prisma.familyMembership.create({
          data: {
            family_id: family.family_id,
            member_id: member.member_id,
            relationship: memberData.relationship,
            membership_start_date: new Date(),
            residency_status: 'RESIDENT',
            source: 'CITIZEN_DECLARATION',
            verification_status: 'PENDING'
          }
        })
      }
    }

    // Add attributes if provided
    if (attributes && Array.isArray(attributes)) {
      for (const attr of attributes) {
        await prisma.familyAttribute.create({
          data: {
            family_id: family.family_id,
            attribute_key: attr.key,
            attribute_value: attr.value,
            source_department: attr.source || 'CITIZEN_DECLARATION',
            verification_status: 'PENDING',
            effective_date: new Date()
          }
        })
      }
    }

    // Update user with family_id
    await prisma.user.update({
      where: { id: req.userId },
      data: { family_id: family.family_id }
    })

    res.status(201).json({
      message: 'Family created successfully',
      family: {
        family_id: family.family_id,
        address: family.address,
        status: family.status
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

// Verify family (Admin flow)
router.post('/:id/verify', authenticate, requireRole(['ADMIN']), async (req: AuthRequest, res) => {
  try {
    const familyId = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const { status } = req.body

    if (!status || !['VERIFIED', 'REJECTED'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' })
    }

    const family = await prisma.family.update({
      where: { family_id: familyId },
      data: {
        status,
        verification_status: status,
        last_verified_date: new Date()
      }
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        actor_id: req.userId || 'unknown',
        actor_role: req.role || 'ADMIN',
        action: 'VERIFY_FAMILY',
        entity_type: 'FAMILY',
        entity_id: familyId,
        fields_accessed: JSON.stringify(['status', 'verification_status']),
        purpose: 'Family verification'
      }
    })

    res.json({
      message: `Family ${status.toLowerCase()} successfully`,
      family
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
