export async function matchSchemes(formData) {
  const {
    name,
    category,       // "General" | "OBC" | "SC" | "ST"
    gender,         // "Male" | "Female" | "Other"
    familySize,     // number
    incomeMode,     // "select" | "manual"
    incomeRange,    // selected range string
    manualIncome,   // number string (monthly)
    state,          // state name string
    isWidow,        // boolean
    occupation
  } = formData

  // Resolve monthly income from either mode
  let monthlyIncome = 0
  if (incomeMode === 'manual') {
    monthlyIncome = parseInt(manualIncome) || 0
  } else {
    // Map selected range string to a representative value for calculation
    const rangeMap = {
      'Below ₹1 Lakh': 7000,
      '₹1 Lakh - ₹3 Lakh': 16000,
      '₹3 Lakh - ₹5 Lakh': 33000,
      'Above ₹5 Lakh': 50000,
    }
    monthlyIncome = rangeMap[incomeRange] || 0
  }

  // Handle translation for Hindi options
  let mappedOccupation = occupation || "Any";
  const occMap = {
    'किसान': 'Farmer',
    'छात्र': 'Student',
    'प्राइवेट जॉब': 'Private Job',
    'स्वरोजगार': 'Self Employed',
    'बेरोजगार': 'Unemployed'
  };
  if (occMap[occupation]) {
    mappedOccupation = occMap[occupation];
  }

  const payload = {
    name: name || "Citizen",
    state: state || "All States",
    income_monthly: monthlyIncome,
    caste: category || "General",
    family_size: String(familySize || "1"),
    employment_status: mappedOccupation,
    is_widow: !!isWidow,
    language: "en"
  };

  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
    const response = await fetch(`${API_URL}/match`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`Backend returned ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.schemes || [];
  } catch (err) {
    console.error('Error fetching schemes:', err);
    return [];
  }
}
