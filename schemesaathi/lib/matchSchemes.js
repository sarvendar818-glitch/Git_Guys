import schemes from '@/data/schemes'

export function matchSchemes(formData) {
  const {
    category,       // "General" | "OBC" | "SC" | "ST"
    gender,         // "Male" | "Female" | "Other"
    familySize,     // number
    incomeMode,     // "select" | "manual"
    incomeRange,    // selected range string
    manualIncome,   // number string (monthly)
    state,          // state name string
    isWidow,        // boolean
  } = formData

  // Resolve monthly income from either mode
  let monthlyIncome = 0
  if (incomeMode === 'manual') {
    monthlyIncome = parseInt(manualIncome) || 0
  } else {
    // Map selected range string to a representative value for calculation
    // 'Below ₹1L' -> ~7k/mo, '₹1L-₹3L' -> ~16k/mo, etc.
    const rangeMap = {
      'Below ₹1 Lakh': 7000,
      '₹1 Lakh - ₹3 Lakh': 16000,
      '₹3 Lakh - ₹5 Lakh': 33000,
      'Above ₹5 Lakh': 50000,
    }
    // Matching the strings exactly as they are in the component
    monthlyIncome = rangeMap[incomeRange] || 0
  }

  const matched = schemes.filter((scheme) => {
    const e = scheme.eligibility

    // 1. Income check
    if (monthlyIncome > e.max_monthly_income) return false

    // 2. Caste/category check
    if (!e.caste.includes(category)) return false

    // 3. Family size check
    if (parseInt(familySize) < e.min_family_size) return false

    // 4. Gender check
    if (e.gender !== 'ANY') {
      if (e.gender === 'FEMALE' && gender !== 'Female') return false
      if (e.gender === 'MALE' && gender !== 'Male') return false
    }

    // 5. Widow check — only filter out widow-required schemes if user is not a widow
    if (e.is_widow === true && !isWidow) return false

    // 6. State check — all schemes currently support ALL states
    if (e.states !== 'ALL' && e.states !== state) return false

    return true
  })

  // Replace {income} placeholder in why_eligible_template
  return matched.map((scheme) => ({
    ...scheme,
    why_eligible: scheme.why_eligible_template.replace('{income}', monthlyIncome.toLocaleString('en-IN'))
  }))
}
