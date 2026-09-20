export const evaluateEligibility = (family: any, scheme: any) => {
  // Mock logic based on Scheme Rules. In a real system, we'd parse JSON rules from the DB.
  let isEligible = false
  let reasons: string[] = []

  const attrs = family.attributes.reduce((acc: any, attr: any) => {
    acc[attr.attribute_key] = attr.attribute_value
    return acc
  }, {})

  const income = parseFloat(attrs['INCOME'] || '0')

  switch (scheme.scheme_id) {
    case 'SCH_PENSION_01':
      const hasElderly = family.members.some((m: any) => {
        const age = new Date().getFullYear() - new Date(m.member.date_of_birth).getFullYear()
        return age >= 60
      })
      if (hasElderly && income <= 10000) {
        isEligible = true
        reasons.push('Contains member above 60 years of age.')
        reasons.push('Family income is below threshold (10000).')
      } else {
        if (!hasElderly) reasons.push('No member above 60 years found.')
        if (income > 10000) reasons.push('Family income exceeds threshold.')
      }
      break

    case 'SCH_PDS_01':
      if (attrs['BPL'] === 'YES') {
        isEligible = true
        reasons.push('Family is categorized as BPL.')
      } else {
        reasons.push('Family is not BPL.')
      }
      break

    case 'SCH_HOUSING_01':
      if (attrs['HOUSE_STATUS'] === 'KUCCHA' && attrs['BPL'] === 'YES') {
        isEligible = true
        reasons.push('Family lives in a Kuccha house.')
        reasons.push('Family is BPL.')
      } else {
        reasons.push('Does not meet housing or BPL criteria.')
      }
      break
    
    default:
      reasons.push('Eligibility rules not defined for this mock scheme.')
  }

  return {
    isEligible,
    reasons
  }
}
