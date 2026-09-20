export const calculateExclusion = (family: any) => {
  const attrs = family.attributes.reduce((acc: any, attr: any) => {
    acc[attr.attribute_key] = attr.attribute_value
    return acc
  }, {})

  const land = parseFloat(attrs['LAND_HOLDING'] || '0')
  const income = parseFloat(attrs['INCOME'] || '0')

  const exclusions = {
    e1: land > 5, // Land > 5 acres
    e2: false, // IT payer
    e3: false, // PT payer
    e4: attrs['HOUSE_STATUS'] === 'PUCCA_3_ROOM', 
    e5: false, // Govt employee
    e6: income > 10000, // Income > 10k
    e7: false, // 2/3/4 wheeler
    e8: false, // KCC limit
    e9: false, // Landline
    e10: false // Refrigerator
  }

  const isExcluded = Object.values(exclusions).some(val => val === true)

  return {
    isExcluded,
    details: exclusions
  }
}
