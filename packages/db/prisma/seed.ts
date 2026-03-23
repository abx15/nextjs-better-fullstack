import { PrismaClient } from './generated'
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '../../apps/web/.env' })

const neon = new PrismaNeon({
  connectionString: process.env.DATABASE_URL
})

const prisma = new PrismaClient({
  adapter: neon
})

const schemes = [
  {
    slug: 'pm-kisan-samman-nidhi',
    nameHindi: 'पीएम-किसान सम्मान निधि',
    nameEnglish: 'PM-KISAN Samman Nidhi',
    descriptionHindi: 'छोटे और सीमांत किसानों को प्रति वर्ष 6,000 रुपये की आय सहायता, 3 किस्तों में दी जाती है',
    descriptionEnglish: 'Income support of ₹6,000 per year to small and marginal farmers, given in 3 installments',
    category: 'kisan',
    subcategory: 'direct_benefit',
    level: 'central',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    benefitType: 'financial',
    benefitAmount: '₹6,000 प्रति वर्ष',
    benefitAmountHindi: '₹6,000 प्रति वर्ष',
    maxBenefit: 6000,
    eligibilityCriteria: JSON.stringify({
      landHolding: { max: 2, unit: 'hectare' },
      farmerType: ['small', 'marginal'],
      citizenship: 'indian',
      exclusions: ['income_tax_payer', 'government_employee']
    }),
    documentsRequired: JSON.stringify([
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'भूमि रिकॉर्ड', nameEnglish: 'Land Records', required: true },
      { name: 'फोटो', nameEnglish: 'Photograph', required: false }
    ]),
    difficulty: 'easy',
    tags: ['kisan', 'direct_benefit', 'central', 'income_support'],
    totalBeneficiaries: 110000000,
    applicationUrl: 'https://pmkisan.gov.in/',
    applicationMode: 'online'
  },
  {
    slug: 'ayushman-bharat-pm-jay',
    nameHindi: 'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना',
    nameEnglish: 'Ayushman Bharat PM-JAY',
    descriptionHindi: 'गरीब परिवारों को प्रति वर्ष 5 लाख रुपये का स्वास्थ्य बीमा कवर',
    descriptionEnglish: 'Health insurance cover of ₹5 lakh per year for poor families',
    category: 'swasth',
    subcategory: 'health_insurance',
    level: 'central',
    ministry: 'Ministry of Health and Family Welfare',
    ministryHindi: 'स्वास्थ्य और परिवार कल्याण मंत्रालय',
    benefitType: 'insurance',
    benefitAmount: '₹5 लाख प्रति वर्ष',
    benefitAmountHindi: '₹5 लाख प्रति वर्ष',
    maxBenefit: 500000,
    eligibilityCriteria: JSON.stringify({
      bplCard: true,
      rationCard: ['yellow', 'pink', 'antyodaya'],
      incomeLimit: { annual: 200000 },
      citizenship: 'indian'
    }),
    documentsRequired: JSON.stringify([
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'राशन कार्ड', nameEnglish: 'Ration Card', required: true },
      { name: 'बीपीएल प्रमाण पत्र', nameEnglish: 'BPL Certificate', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: false }
    ]),
    difficulty: 'medium',
    tags: ['swasth', 'insurance', 'bpl', 'healthcare'],
    totalBeneficiaries: 50000000,
    applicationUrl: 'https://pmjay.gov.in/',
    applicationMode: 'both'
  },
  {
    slug: 'pm-awas-yojana-gramin',
    nameHindi: 'प्रधानमंत्री आवास योजना (ग्रामीण)',
    nameEnglish: 'PM Awas Yojana (Gramin)',
    descriptionHindi: 'ग्रामीण क्षेत्रों में गरीब परिवारों को आवास निर्माण के लिए वित्तीय सहायता',
    descriptionEnglish: 'Financial assistance for house construction to poor families in rural areas',
    category: 'awas',
    subcategory: 'housing',
    level: 'central',
    ministry: 'Ministry of Rural Development',
    ministryHindi: 'ग्रामीण विकास मंत्रालय',
    benefitType: 'financial',
    benefitAmount: '₹1.20-1.30 लाख',
    benefitAmountHindi: '₹1.20-1.30 लाख',
    maxBenefit: 130000,
    eligibilityCriteria: JSON.stringify({
      bplCard: true,
      houseCondition: ['homeless', 'kutcha_house'],
      landOwnership: true,
      citizenship: 'indian',
      incomeLimit: { annual: 300000 }
    }),
    documentsRequired: JSON.stringify([
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बीपीएल कार्ड', nameEnglish: 'BPL Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'भूमि कागजात', nameEnglish: 'Land Documents', required: true }
    ]),
    difficulty: 'medium',
    tags: ['awas', 'housing', 'rural', 'construction'],
    totalBeneficiaries: 25000000,
    applicationUrl: 'https://pmayg.nic.in/',
    applicationMode: 'both'
  },
  {
    slug: 'kisan-credit-card-kcc',
    nameHindi: 'किसान क्रेडिट कार्ड (KCC)',
    nameEnglish: 'Kisan Credit Card (KCC)',
    descriptionHindi: 'किसानों को 4% ब्याज दर पर अल्पकालिक फसल ऋण',
    descriptionEnglish: 'Short-term crop loan to farmers at 4% interest rate',
    category: 'kisan',
    subcategory: 'credit',
    level: 'central',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    benefitType: 'credit',
    benefitAmount: '4% ब्याज पर ऋण',
    benefitAmountHindi: '4% ब्याज पर ऋण',
    maxBenefit: 300000,
    eligibilityCriteria: JSON.stringify({
      occupation: ['farmer', 'fisherman', 'animal_husbandry'],
      landOwnership: true,
      citizenship: 'indian',
      creditScore: { min: 650 }
    }),
    documentsRequired: JSON.stringify([
      { name: 'भूमि रिकॉर्ड', nameEnglish: 'Land Records', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'पासपोर्ट साइज फोटो', nameEnglish: 'Passport Size Photo', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: false }
    ]),
    difficulty: 'medium',
    tags: ['kisan', 'credit', 'loan', 'agriculture'],
    totalBeneficiaries: 7000000,
    applicationUrl: 'https://kisancreditcard.in/',
    applicationMode: 'both'
  },
  {
    slug: 'sukanya-samriddhi-yojana',
    nameHindi: 'सुकन्या समृद्धि योजना',
    nameEnglish: 'Sukanya Samriddhi Yojana',
    descriptionHindi: 'बेटी बचाओ बेटी पढ़ाओ योजना के तहत बालिकाओं के लिए बचत योजना',
    descriptionEnglish: 'Savings scheme for girl children under Beti Bachao Beti Padhao',
    category: 'mahila',
    subcategory: 'savings',
    level: 'central',
    ministry: 'Ministry of Finance',
    ministryHindi: 'वित्त मंत्रालय',
    benefitType: 'savings',
    benefitAmount: '8.2% ब्याज, टैक्स-फ्री',
    benefitAmountHindi: '8.2% ब्याज, टैक्स-फ्री',
    maxBenefit: 1500000,
    eligibilityCriteria: JSON.stringify({
      girlAge: { max: 10 },
      parentCitizenship: 'indian',
      maxGirlsPerFamily: 2,
      accountType: 'savings'
    }),
    documentsRequired: JSON.stringify([
      { name: 'जन्म प्रमाण पत्र', nameEnglish: 'Birth Certificate', required: true },
      { name: 'अभिभावक आधार', nameEnglish: 'Parent Aadhar', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'पता प्रमाण', nameEnglish: 'Address Proof', required: false }
    ]),
    difficulty: 'easy',
    tags: ['mahila', 'girl_child', 'savings', 'education'],
    totalBeneficiaries: 3000000,
    applicationUrl: 'https://sukanyasamriddhi.gov.in/',
    applicationMode: 'offline'
  },
  {
    slug: 'pm-ujjwala-yojana-2.0',
    nameHindi: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
    nameEnglish: 'PM Ujjwala Yojana 2.0',
    descriptionHindi: 'गरीब परिवारों की महिलाओं को मुफ्त एलपीजी कनेक्शन',
    descriptionEnglish: 'Free LPG connections to women from poor families',
    category: 'mahila',
    subcategory: 'energy',
    level: 'central',
    ministry: 'Ministry of Petroleum & Natural Gas',
    ministryHindi: 'पेट्रोलियम और प्राकृतिक गैस मंत्रालय',
    benefitType: 'subsidy',
    benefitAmount: 'मुफ्त LPG कनेक्शन + पहला रिफिल',
    benefitAmountHindi: 'मुफ्त LPG कनेक्शन + पहला रिफिल',
    maxBenefit: 1600,
    eligibilityCriteria: JSON.stringify({
      gender: 'female',
      bplCard: true,
      caste: ['sc', 'st'],
      existingLPG: false,
      age: { min: 18 }
    }),
    documentsRequired: JSON.stringify([
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'राशन कार्ड', nameEnglish: 'Ration Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'फोटो', nameEnglish: 'Photograph', required: false }
    ]),
    difficulty: 'easy',
    tags: ['mahila', 'lpg', 'cooking', 'bpl'],
    totalBeneficiaries: 8000000,
    applicationUrl: 'https://pmujjwalayojana.com/',
    applicationMode: 'both'
  },
  {
    slug: 'national-scholarship-portal-nsp',
    nameHindi: 'राष्ट्रीय छात्रवृत्ति पोर्टल (NSP)',
    nameEnglish: 'National Scholarship Portal (NSP)',
    descriptionHindi: 'छात्रों के लिए विभिन्न छात्रवृत्ति योजनाओं का एकीकृत पोर्टल',
    descriptionEnglish: 'Integrated portal for various scholarship schemes for students',
    category: 'shiksha',
    subcategory: 'scholarship',
    level: 'central',
    ministry: 'Ministry of Education',
    ministryHindi: 'शिक्षा मंत्रालय',
    benefitType: 'scholarship',
    benefitAmount: '₹10,000 से ₹50,000 प्रति वर्ष',
    benefitAmountHindi: '₹10,000 से ₹50,000 प्रति वर्ष',
    maxBenefit: 50000,
    eligibilityCriteria: JSON.stringify({
      minMarks: 50,
      familyIncome: { max: 250000 },
      citizenship: 'indian',
      enrollment: 'full_time'
    }),
    documentsRequired: JSON.stringify([
      { name: 'मार्कशीट', nameEnglish: 'Marksheet', required: true },
      { name: 'आय प्रमाण पत्र', nameEnglish: 'Income Certificate', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true }
    ]),
    difficulty: 'medium',
    tags: ['shiksha', 'scholarship', 'students', 'education'],
    totalBeneficiaries: 15000000,
    applicationUrl: 'https://scholarships.gov.in/',
    applicationMode: 'online'
  },
  {
    slug: 'pm-mudra-yojana',
    nameHindi: 'प्रधानमंत्री मुद्रा योजना',
    nameEnglish: 'PM MUDRA Yojana',
    descriptionHindi: 'छोटे व्यवसायियों के लिए वित्तीय सहायता',
    descriptionEnglish: 'Financial assistance for small business owners',
    category: 'vyapar',
    subcategory: 'business_loan',
    level: 'central',
    ministry: 'Ministry of Finance',
    ministryHindi: 'वित्त मंत्रालय',
    benefitType: 'loan',
    benefitAmount: '₹50,000 से ₹10 लाख',
    benefitAmountHindi: '₹50,000 से ₹10 लाख',
    maxBenefit: 1000000,
    eligibilityCriteria: JSON.stringify({
      businessType: ['micro', 'small', 'medium'],
      businessAge: { min: 1 },
      creditScore: { min: 600 },
      citizenship: 'indian'
    }),
    documentsRequired: JSON.stringify([
      { name: 'व्यवसाय योजना', nameEnglish: 'Business Plan', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बैंक स्टेटमेंट', nameEnglish: 'Bank Statement', required: true },
      { name: 'पैन कार्ड', nameEnglish: 'PAN Card', required: false }
    ]),
    difficulty: 'medium',
    tags: ['vyapar', 'business', 'loan', 'entrepreneur'],
    totalBeneficiaries: 9000000,
    applicationUrl: 'https://mudra.org.in/',
    applicationMode: 'both'
  },
  {
    slug: 'old-age-pension-ignoaps',
    nameHindi: 'वृद्धावस्था पेंशन (IGNOAPS)',
    nameEnglish: 'Old Age Pension (IGNOAPS)',
    descriptionHindi: 'वृद्ध नागरिकों को मासिक पेंशन',
    descriptionEnglish: 'Monthly pension for senior citizens',
    category: 'vridh',
    subcategory: 'pension',
    level: 'central',
    ministry: 'Ministry of Rural Development',
    ministryHindi: 'ग्रामीण विकास मंत्रालय',
    benefitType: 'pension',
    benefitAmount: '₹200-500 प्रति माह',
    benefitAmountHindi: '₹200-500 प्रति माह',
    maxBenefit: 6000,
    eligibilityCriteria: JSON.stringify({
      age: { min: 60 },
      bplCard: true,
      citizenship: 'indian',
      incomeLimit: { annual: 100000 }
    }),
    documentsRequired: JSON.stringify([
      { name: 'आयु प्रमाण पत्र', nameEnglish: 'Age Proof', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बीपीएल कार्ड', nameEnglish: 'BPL Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true }
    ]),
    difficulty: 'easy',
    tags: ['vridh', 'pension', 'senior_citizen', 'bpl'],
    totalBeneficiaries: 4000000,
    applicationMode: 'offline'
  },
  {
    slug: 'widow-pension-ignwps',
    nameHindi: 'विधवा पेंशन (IGNWPS)',
    nameEnglish: 'Widow Pension (IGNWPS)',
    descriptionHindi: 'विधवा महिलाओं को मासिक पेंशन',
    descriptionEnglish: 'Monthly pension for widow women',
    category: 'mahila',
    subcategory: 'pension',
    level: 'central',
    ministry: 'Ministry of Rural Development',
    ministryHindi: 'ग्रामीण विकास मंत्रालय',
    benefitType: 'pension',
    benefitAmount: '₹300 प्रति माह',
    benefitAmountHindi: '₹300 प्रति माह',
    maxBenefit: 3600,
    eligibilityCriteria: JSON.stringify({
      gender: 'female',
      maritalStatus: 'widow',
      age: { min: 40, max: 79 },
      bplCard: true,
      citizenship: 'indian'
    }),
    documentsRequired: JSON.stringify([
      { name: 'पति की मृत्यु प्रमाण पत्र', nameEnglish: 'Husband Death Certificate', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बीपीएल कार्ड', nameEnglish: 'BPL Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: false }
    ]),
    difficulty: 'easy',
    tags: ['mahila', 'widow', 'pension', 'bpl'],
    totalBeneficiaries: 2500000,
    applicationMode: 'offline'
  },
  {
    slug: 'disability-pension-igndps',
    nameHindi: 'दिव्यांग पेंशन (IGNDPS)',
    nameEnglish: 'Disability Pension (IGNDPS)',
    descriptionHindi: 'दिव्यांग व्यक्तियों को मासिक पेंशन',
    descriptionEnglish: 'Monthly pension for disabled persons',
    category: 'divyang',
    subcategory: 'pension',
    level: 'central',
    ministry: 'Ministry of Rural Development',
    ministryHindi: 'ग्रामीण विकास मंत्रालय',
    benefitType: 'pension',
    benefitAmount: '₹300 प्रति माह',
    benefitAmountHindi: '₹300 प्रति माह',
    maxBenefit: 3600,
    eligibilityCriteria: JSON.stringify({
      disabilityPercent: { min: 80 },
      age: { min: 18, max: 79 },
      bplCard: true,
      citizenship: 'indian'
    }),
    documentsRequired: JSON.stringify([
      { name: 'दिव्यांगता प्रमाण पत्र', nameEnglish: 'Disability Certificate', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बीपीएल कार्ड', nameEnglish: 'BPL Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: false }
    ]),
    difficulty: 'medium',
    tags: ['divyang', 'disability', 'pension', 'bpl'],
    totalBeneficiaries: 2000000,
    applicationMode: 'offline'
  },
  {
    slug: 'pm-fasal-bima-yojana',
    nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
    nameEnglish: 'PM Fasal Bima Yojana',
    descriptionHindi: 'किसानों की फसलों को नुकसान से बचाव के लिए बीमा',
    descriptionEnglish: 'Crop insurance to protect farmers from crop losses',
    category: 'kisan',
    subcategory: 'insurance',
    level: 'central',
    ministry: 'Ministry of Agriculture & Farmers Welfare',
    ministryHindi: 'कृषि एवं किसान कल्याण मंत्रालय',
    benefitType: 'insurance',
    benefitAmount: 'फसल नुकसान पर बीमा कवर',
    benefitAmountHindi: 'फसल नुकसान पर बीमा कवर',
    maxBenefit: 200000,
    eligibilityCriteria: JSON.stringify({
      occupation: 'farmer',
      landOwnership: true,
      citizenship: 'indian',
      cropType: 'food_crops'
    }),
    documentsRequired: JSON.stringify([
      { name: 'भूमि रिकॉर्ड', nameEnglish: 'Land Records', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बोई प्रमाण पत्र', nameEnglish: 'Sowing Certificate', required: true }
    ]),
    difficulty: 'medium',
    tags: ['kisan', 'insurance', 'crop_protection', 'agriculture'],
    totalBeneficiaries: 5000000,
    applicationUrl: 'https://pmfby.gov.in/',
    applicationMode: 'both'
  },
  {
    slug: 'atal-pension-yojana',
    nameHindi: 'अटल पेंशन योजना',
    nameEnglish: 'Atal Pension Yojana',
    descriptionHindi: 'असंगठित क्षेत्र के श्रमिकों के लिए पेंशन योजना',
    descriptionEnglish: 'Pension scheme for unorganized sector workers',
    category: 'finance',
    subcategory: 'pension',
    level: 'central',
    ministry: 'Ministry of Finance',
    ministryHindi: 'वित्त मंत्रालय',
    benefitType: 'pension',
    benefitAmount: '₹1,000-5,000 मासिक पेंशन',
    benefitAmountHindi: '₹1,000-5,000 मासिक पेंशन',
    maxBenefit: 60000,
    eligibilityCriteria: JSON.stringify({
      age: { min: 18, max: 40 },
      bankAccount: true,
      mobileNumber: true,
      citizenship: 'indian',
      incomeTax: false
    }),
    documentsRequired: JSON.stringify([
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'मोबाइल नंबर', nameEnglish: 'Mobile Number', required: true },
      { name: 'पैन कार्ड', nameEnglish: 'PAN Card', required: false }
    ]),
    difficulty: 'easy',
    tags: ['finance', 'pension', 'unorganized_sector', 'retirement'],
    totalBeneficiaries: 12000000,
    applicationUrl: 'https://npslite.nsdl.co.in/atal-pension-yojana',
    applicationMode: 'online'
  },
  {
    slug: 'msme-emergency-credit-eclgs',
    nameHindi: 'एमएसएमई आपातकालीन क्रेडिट (ECLGS)',
    nameEnglish: 'MSME Emergency Credit (ECLGS)',
    descriptionHindi: 'एमएसएमई के लिए 100% गारंटी ऋण',
    descriptionEnglish: '100% guaranteed loan for MSMEs',
    category: 'vyapar',
    subcategory: 'emergency_loan',
    level: 'central',
    ministry: 'Ministry of Finance',
    ministryHindi: 'वित्त मंत्रालय',
    benefitType: 'loan',
    benefitAmount: '₹3 करोड़ तक ऋण',
    benefitAmountHindi: '₹3 करोड़ तक ऋण',
    maxBenefit: 30000000,
    eligibilityCriteria: JSON.stringify({
      businessType: 'msme',
      existingLoan: true,
      gstRegistered: true,
      creditScore: { min: 700 },
      businessVintage: { min: 2 }
    }),
    documentsRequired: JSON.stringify([
      { name: 'जीएसटी प्रमाण पत्र', nameEnglish: 'GST Certificate', required: true },
      { name: 'बैंक स्टेटमेंट', nameEnglish: 'Bank Statement', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'व्यवसाय पंजीकरण', nameEnglish: 'Business Registration', required: true }
    ]),
    difficulty: 'hard',
    tags: ['vyapar', 'msme', 'emergency', 'business_loan'],
    totalBeneficiaries: 1500000,
    applicationUrl: 'https://eclspsbi.co.in/',
    applicationMode: 'online'
  },
  {
    slug: 'pradhan-mantri-matru-vandana-yojana-pmmvy',
    nameHindi: 'प्रधानमंत्री मातृ वंदना योजना (PMMVY)',
    nameEnglish: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    descriptionHindi: 'गर्भवती और स्तनपान कराने वाली महिलाओं को वित्तीय सहायता',
    descriptionEnglish: 'Financial assistance to pregnant and lactating mothers',
    category: 'mahila',
    subcategory: 'maternity',
    level: 'central',
    ministry: 'Ministry of Women & Child Development',
    ministryHindi: 'महिला एवं बाल विकास मंत्रालय',
    benefitType: 'financial',
    benefitAmount: '₹5,000, 3 किस्तों में',
    benefitAmountHindi: '₹5,000, 3 किस्तों में',
    maxBenefit: 5000,
    eligibilityCriteria: JSON.stringify({
      pregnancyStatus: ['pregnant', 'lactating'],
      firstChild: true,
      age: { min: 19 },
      citizenship: 'indian',
      bankAccount: true
    }),
    documentsRequired: JSON.stringify([
      { name: 'एमसीपी कार्ड', nameEnglish: 'MCP Card', required: true },
      { name: 'आधार कार्ड', nameEnglish: 'Aadhar Card', required: true },
      { name: 'बैंक खाता', nameEnglish: 'Bank Account', required: true },
      { name: 'फोटो', nameEnglish: 'Photograph', required: false }
    ]),
    difficulty: 'easy',
    tags: ['mahila', 'maternity', 'pregnancy', 'childcare'],
    totalBeneficiaries: 10000000,
    applicationUrl: 'https://pmmvy-wcd.nic.in/',
    applicationMode: 'both'
  }
]

async function main() {
  console.log('🌱 Seeding database with government schemes...')
  
  // Clear existing schemes
  await prisma.scheme.deleteMany()
  
  // Insert schemes
  for (const scheme of schemes) {
    await prisma.scheme.create({
      data: scheme
    })
  }
  
  console.log(`✅ Seeded ${schemes.length} government schemes`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
