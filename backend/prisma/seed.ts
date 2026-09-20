import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Clean up existing data
  await prisma.auditLog.deleteMany()
  await prisma.lifeEvent.deleteMany()
  await prisma.benefit.deleteMany()
  await prisma.eligibilityResult.deleteMany()
  await prisma.familyAttribute.deleteMany()
  await prisma.familyMembership.deleteMany()
  await prisma.user.deleteMany()
  await prisma.member.deleteMany()
  await prisma.family.deleteMany()
  await prisma.scheme.deleteMany()

  // 1. Schemes
  const schemes = [
    {
      scheme_id: 'SCH_PENSION_01',
      department: 'Social Security',
      name: 'Senior Citizen Pension',
      description: 'Monthly pension for citizens above 60 years of age with low income.',
      status: 'ACTIVE'
    },
    {
      scheme_id: 'SCH_SCHOLAR_01',
      department: 'Education',
      name: 'Pre-Matric Scholarship',
      description: 'Scholarship for students in SC/ST category.',
      status: 'ACTIVE'
    },
    {
      scheme_id: 'SCH_PDS_01',
      department: 'Food & Civil Supplies',
      name: 'Antyodaya Anna Yojana (AAY)',
      description: 'Highly subsidized food grains for poorest of poor families.',
      status: 'ACTIVE'
    },
    {
      scheme_id: 'SCH_HOUSING_01',
      department: 'Rural Development',
      name: 'Housing Assistance',
      description: 'Financial assistance for construction of pucca house.',
      status: 'ACTIVE'
    }
  ]

  for (const s of schemes) {
    await prisma.scheme.create({ data: s })
  }

  // 2. Synthetic Families & Members
  const familyId1 = 'GJ-FAM-001245'
  const familyId2 = 'GJ-FAM-009876'

  // Family 1 (Eligible for pension, poor)
  await prisma.family.create({
    data: {
      family_id: familyId1,
      status: 'ACTIVE',
      address: '12, M.G. Road',
      district: 'Ahmedabad',
      taluka: 'City',
      village_or_ward: 'Ward 4',
      household_type: 'RURAL',
      verification_status: 'VERIFIED'
    }
  })

  const m1Id = 'GJ-MEM-1001' // Ramesh (62) - Eligible for pension
  const m2Id = 'GJ-MEM-1002' // Sita (57)
  const m3Id = 'GJ-MEM-1003' // Ravi (24)
  const m4Id = 'GJ-MEM-1004' // Priya (20)

  const members = [
    { member_id: m1Id, name: 'Ramesh Patel', date_of_birth: new Date('1964-05-10'), gender: 'MALE', life_status: 'ALIVE' },
    { member_id: m2Id, name: 'Sita Patel', date_of_birth: new Date('1969-08-15'), gender: 'FEMALE', life_status: 'ALIVE' },
    { member_id: m3Id, name: 'Ravi Patel', date_of_birth: new Date('2002-01-20'), gender: 'MALE', life_status: 'ALIVE' },
    { member_id: m4Id, name: 'Priya Patel', date_of_birth: new Date('2006-11-05'), gender: 'FEMALE', life_status: 'ALIVE' }
  ]

  for (const m of members) {
    await prisma.member.create({ data: m })
  }

  // Memberships for Family 1
  const relationships = [
    { member_id: m1Id, relationship: 'HEAD' },
    { member_id: m2Id, relationship: 'SPOUSE' },
    { member_id: m3Id, relationship: 'SON' },
    { member_id: m4Id, relationship: 'DAUGHTER' }
  ]

  for (const rel of relationships) {
    await prisma.familyMembership.create({
      data: {
        family_id: familyId1,
        member_id: rel.member_id,
        relationship: rel.relationship,
        membership_start_date: new Date('2010-01-01'),
        residency_status: 'RESIDENT',
        source: 'CITIZEN_DECLARATION',
        verification_status: 'VERIFIED'
      }
    })
  }

  // Attributes for Family 1 (Deprived)
  const attrs1 = [
    { attribute_key: 'CASTE', attribute_value: 'SC', source_department: 'Social Welfare', verification_status: 'VERIFIED' },
    { attribute_key: 'BPL', attribute_value: 'YES', source_department: 'Food Dept', verification_status: 'VERIFIED' },
    { attribute_key: 'HOUSE_STATUS', attribute_value: 'KUCCHA', source_department: 'Survey', verification_status: 'VERIFIED' },
    { attribute_key: 'TOILET_STATUS', attribute_value: 'NO', source_department: 'Survey', verification_status: 'VERIFIED' },
    { attribute_key: 'INCOME', attribute_value: '7500', source_department: 'Revenue', verification_status: 'VERIFIED' },
    { attribute_key: 'LAND_HOLDING', attribute_value: '0.5', source_department: 'Revenue', verification_status: 'VERIFIED' }
  ]

  for (const attr of attrs1) {
    await prisma.familyAttribute.create({
      data: {
        family_id: familyId1,
        ...attr,
        effective_date: new Date()
      }
    })
  }

  // Family 2 (Duplicate / Conflict scenario, rich family)
  await prisma.family.create({
    data: {
      family_id: familyId2,
      status: 'ACTIVE',
      address: '45, High Street',
      district: 'Surat',
      taluka: 'City',
      village_or_ward: 'Ward 9',
      household_type: 'URBAN',
      verification_status: 'PENDING_VERIFICATION'
    }
  })

  // Add an admin user and citizen users
  const salt = await bcrypt.genSalt(10)
  const hashAdmin = await bcrypt.hash('admin123', salt)
  const hashCitizen = await bcrypt.hash('citizen123', salt)

  await prisma.user.create({
    data: {
      username: 'admin',
      password_hash: hashAdmin,
      role: 'ADMIN'
    }
  })

  await prisma.user.create({
    data: {
      username: 'ramesh',
      password_hash: hashCitizen,
      role: 'CITIZEN',
      family_id: familyId1
    }
  })

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
