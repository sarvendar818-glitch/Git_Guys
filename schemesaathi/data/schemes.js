const schemes = [
  {
    scheme_name: "PM-KISAN Samman Nidhi",
    ministry: "Ministry of Agriculture",
    benefit_amount: "₹6,000/year (₹2,000 every 4 months)",
    category: "Agriculture",
    how_to_apply: "Visit pmkisan.gov.in or nearest CSC centre",
    eligibility: {
      max_monthly_income: 15000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Your income of ₹{income}/month is within the scheme limit"
  },
  {
    scheme_name: "NSAP Widow Pension (Indira Gandhi National Widow Pension)",
    ministry: "Ministry of Rural Development",
    benefit_amount: "₹300–₹500/month",
    category: "Women",
    how_to_apply: "Apply at Gram Panchayat or block office with death certificate of spouse",
    eligibility: {
      max_monthly_income: 10000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "FEMALE",
      is_widow: true
    },
    why_eligible_template: "As a widow with income below ₹10,000/month you qualify for monthly pension"
  },
  {
    scheme_name: "PM Awas Yojana Gramin (PMAY-G)",
    ministry: "Ministry of Rural Development",
    benefit_amount: "₹1,20,000 one-time housing grant",
    category: "Housing",
    how_to_apply: "Apply through Gram Panchayat or pmayg.nic.in",
    eligibility: {
      max_monthly_income: 15000,
      caste: ["OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Your caste category and income make you eligible for housing assistance"
  },
  {
    scheme_name: "Pradhan Mantri Ujjwala Yojana 2.0",
    ministry: "Ministry of Petroleum and Natural Gas",
    benefit_amount: "Free LPG connection + first refill free",
    category: "Women",
    how_to_apply: "Visit nearest LPG distributor with Aadhaar and ration card",
    eligibility: {
      max_monthly_income: 10000,
      caste: ["OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "FEMALE"
    },
    why_eligible_template: "As a woman in a low-income household you qualify for a free LPG connection"
  },
  {
    scheme_name: "Ayushman Bharat PM-JAY",
    ministry: "Ministry of Health and Family Welfare",
    benefit_amount: "₹5,00,000/year health insurance cover",
    category: "Health",
    how_to_apply: "Check eligibility at pmjay.gov.in or visit empanelled hospital",
    eligibility: {
      max_monthly_income: 20000,
      caste: ["OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Your family income and caste qualify for ₹5 lakh annual health coverage"
  },
  {
    scheme_name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    ministry: "Ministry of Women and Child Development",
    benefit_amount: "₹5,000 in 3 instalments",
    category: "Women",
    how_to_apply: "Register at nearest Anganwadi centre during first pregnancy",
    eligibility: {
      max_monthly_income: 15000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "FEMALE"
    },
    why_eligible_template: "As a woman with low household income you qualify for maternity benefit"
  },
  {
    scheme_name: "Post Matric Scholarship for SC Students",
    ministry: "Ministry of Social Justice and Empowerment",
    benefit_amount: "Full tuition fee + ₹380–₹1,200/month maintenance",
    category: "Education",
    how_to_apply: "Apply at scholarships.gov.in before academic year deadline",
    eligibility: {
      max_monthly_income: 20833,
      caste: ["SC"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "SC category with annual income below ₹2.5 lakh qualifies for full scholarship"
  },
  {
    scheme_name: "MGNREGA",
    ministry: "Ministry of Rural Development",
    benefit_amount: "100 days work/year at ₹200–₹300/day",
    category: "Livelihood",
    how_to_apply: "Apply for Job Card at Gram Panchayat office",
    eligibility: {
      max_monthly_income: 20000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Any rural adult household qualifies for 100 days of guaranteed employment"
  },
  {
    scheme_name: "Pradhan Mantri Garib Kalyan Anna Yojana (Free Ration)",
    ministry: "Ministry of Consumer Affairs",
    benefit_amount: "5 kg free grain per person per month",
    category: "Food",
    how_to_apply: "Collect from ration shop using existing ration card",
    eligibility: {
      max_monthly_income: 15000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Your income level qualifies for free monthly ration under PMGKAY"
  },
  {
    scheme_name: "National Family Benefit Scheme (NFBS)",
    ministry: "Ministry of Rural Development",
    benefit_amount: "₹20,000 one-time payment",
    category: "Social Security",
    how_to_apply: "Apply at District Social Welfare Office within 90 days of death",
    eligibility: {
      max_monthly_income: 10000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 2,
      gender: "ANY",
      is_widow: true
    },
    why_eligible_template: "As a widow below poverty line you qualify for one-time family benefit"
  },
  {
    scheme_name: "Sukanya Samriddhi Yojana",
    ministry: "Ministry of Finance",
    benefit_amount: "8.2% interest rate savings scheme for girl child",
    category: "Education",
    how_to_apply: "Open account at any post office or bank with girl child's birth certificate",
    eligibility: {
      max_monthly_income: 999999,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 2,
      gender: "ANY"
    },
    why_eligible_template: "Any family with a girl child under 10 years can open this high-interest savings account"
  },
  {
    scheme_name: "Stand Up India Scheme",
    ministry: "Ministry of Finance (SIDBI)",
    benefit_amount: "Loan ₹10 lakh to ₹1 crore at subsidised rate",
    category: "Livelihood",
    how_to_apply: "Apply at standupmitra.in or any scheduled commercial bank",
    eligibility: {
      max_monthly_income: 999999,
      caste: ["SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "SC/ST category qualifies for subsidised business loans under Stand Up India"
  },
  {
    scheme_name: "Kisan Credit Card (KCC)",
    ministry: "Ministry of Agriculture",
    benefit_amount: "Credit up to ₹3 lakh at 4% interest",
    category: "Agriculture",
    how_to_apply: "Apply at nearest bank branch or through PM-KISAN portal",
    eligibility: {
      max_monthly_income: 25000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Farmers with agricultural land qualify for subsidised credit card"
  },
  {
    scheme_name: "Beti Bachao Beti Padhao",
    ministry: "Ministry of Women and Child Development",
    benefit_amount: "Education support + conditional cash transfers",
    category: "Education",
    how_to_apply: "Enrol at nearest Anganwadi or school, register at wcd.nic.in",
    eligibility: {
      max_monthly_income: 20000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 2,
      gender: "FEMALE"
    },
    why_eligible_template: "Female members of the family qualify for education support under BBBP"
  },
  {
    scheme_name: "PM SVANidhi (Street Vendor Loan)",
    ministry: "Ministry of Housing and Urban Affairs",
    benefit_amount: "₹10,000 → ₹20,000 → ₹50,000 collateral-free loan",
    category: "Livelihood",
    how_to_apply: "Apply at pmsvanidhi.mohua.gov.in or nearest ULB office",
    eligibility: {
      max_monthly_income: 15000,
      caste: ["General", "OBC", "SC", "ST"],
      states: "ALL",
      min_family_size: 1,
      gender: "ANY"
    },
    why_eligible_template: "Low-income individuals qualify for collateral-free microloan for livelihood"
  }
]

export default schemes
