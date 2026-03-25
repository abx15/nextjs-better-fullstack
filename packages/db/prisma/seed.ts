import { PrismaClient } from './generated'
import { PrismaNeon } from '@prisma/adapter-neon'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

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
  }
]

async function main() {
  console.log('🌱 Starting database seeding...')

  // Hash password for all test accounts
  const password = 'password123'
  const hashedPassword = await bcrypt.hash(password, 12)

  // Clear existing data (optional - comment out if you want to preserve data)
  await prisma.application.deleteMany()
  await prisma.cscOperator.deleteMany()
  await prisma.adminProfile.deleteMany()
  await prisma.userProfile.deleteMany()
  await prisma.user.deleteMany()
  await prisma.scheme.deleteMany()
  
  // Insert schemes
  for (const scheme of schemes) {
    await prisma.scheme.create({
      data: scheme
    })
  }
  
  console.log(`✅ Seeded ${schemes.length} government schemes`)

  // Create Super Admin
  const superAdmin = await prisma.user.create({
    data: {
      email: 'superadmin@sarkarisaathi.in',
      name: 'Super Admin',
      phone: '+91 9876543210',
      password: hashedPassword,
      role: 'SUPER_ADMIN',
      language: 'hi',
      isPremium: false,
      isActive: true,
      emailVerified: new Date(),
      adminProfile: {
        create: {
          department: 'System Administration',
          jurisdiction: 'राष्ट्रीय स्तर',
          permissions: {
            canManageUsers: true,
            canManageSchemes: true,
            canViewAnalytics: true,
            canManageOperators: true,
            canSystemSettings: true
          },
          canManageUsers: true,
          canManageSchemes: true,
          canViewAnalytics: true
        }
      }
    },
    include: {
      adminProfile: true
    }
  })

  // Create Admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@sarkarisaathi.in',
      name: 'Admin User',
      phone: '+91 9876543211',
      password: hashedPassword,
      role: 'ADMIN',
      language: 'hi',
      isPremium: false,
      isActive: true,
      emailVerified: new Date(),
      adminProfile: {
        create: {
          department: 'Scheme Management',
          jurisdiction: 'राज्य स्तर',
          permissions: {
            canManageUsers: true,
            canManageSchemes: true,
            canViewAnalytics: true,
            canManageOperators: false,
            canSystemSettings: false
          },
          canManageUsers: true,
          canManageSchemes: true,
          canViewAnalytics: true
        }
      }
    },
    include: {
      adminProfile: true
    }
  })

  // Create Senior Operator
  const seniorOperator = await prisma.user.create({
    data: {
      email: 'senior.operator@csc.in',
      name: 'Ramesh Kumar',
      phone: '+91 9876543212',
      password: hashedPassword,
      role: 'OPERATOR',
      language: 'hi',
      isPremium: false,
      isActive: true,
      emailVerified: new Date(),
      operator: {
        create: {
          centerName: 'शिवाजी CSC सेंटर',
          cscId: 'CSC-BIHAR-1234',
          state: 'बिहार',
          district: 'पटना',
          address: 'गाँव - मानेर, पोस्ट - मानेर, जिला - पटना',
          isVerified: true,
          totalEarnings: 45670.50
        }
      }
    },
    include: {
      operator: true
    }
  })

  // Create Junior Operator
  const juniorOperator = await prisma.user.create({
    data: {
      email: 'junior.operator@csc.in',
      name: 'Sunita Devi',
      phone: '+91 9876543213',
      password: hashedPassword,
      role: 'OPERATOR',
      language: 'hi',
      isPremium: false,
      isActive: true,
      emailVerified: new Date(),
      operator: {
        create: {
          centerName: 'शक्ति CSC सेंटर',
          cscId: 'CSC-UP-5678',
          state: 'उत्तर प्रदेश',
          district: 'लखनऊ',
          address: 'गाँव - गोमती नगर, पोस्ट - गोमती नगर, जिला - लखनऊ',
          isVerified: true,
          totalEarnings: 23450.25
        }
      }
    },
    include: {
      operator: true
    }
  })

  // Create Premium User
  const premiumUser = await prisma.user.create({
    data: {
      email: 'premium.user@example.com',
      name: 'Amit Sharma',
      phone: '+91 9876543214',
      password: hashedPassword,
      role: 'USER',
      language: 'hi',
      isPremium: true,
      isActive: true,
      emailVerified: new Date(),
      profile: {
        create: {
          state: 'महाराष्ट्र',
          district: 'मुंबई',
          pincode: '400001',
          age: 32,
          gender: 'पुरुष',
          caste: 'सामान्य',
          annualIncome: 450000,
          bplCard: false,
          rationCardType: 'एपीएल',
          occupation: 'व्यवसायी',
          educationLevel: 'स्नातक',
          isProfileComplete: true
        }
      }
    },
    include: {
      profile: true
    }
  })

  // Create Regular User
  const regularUser = await prisma.user.create({
    data: {
      email: 'user@example.com',
      name: 'Priya Patel',
      phone: '+91 9876543215',
      password: hashedPassword,
      role: 'USER',
      language: 'hi',
      isPremium: false,
      isActive: true,
      emailVerified: new Date(),
      profile: {
        create: {
          state: 'गुजरात',
          district: 'अहमदाबाद',
          pincode: '380001',
          age: 28,
          gender: 'महिला',
          caste: 'अन्य पिछड़ा वर्ग',
          annualIncome: 250000,
          bplCard: true,
          rationCardType: 'बीपीएल',
          occupation: 'घरेलू',
          educationLevel: '12वीं',
          isProfileComplete: true
        }
      }
    },
    include: {
      profile: true
    }
  })

  // Create New User (Demo)
  const newUser = await prisma.user.create({
    data: {
      email: 'new.user@example.com',
      name: 'Rahul Kumar',
      phone: '+91 9876543216',
      password: hashedPassword,
      role: 'USER',
      language: 'hi',
      isPremium: false,
      isActive: true,
      emailVerified: new Date(),
      profile: {
        create: {
          state: 'राजस्थान',
          district: 'जयपुर',
          pincode: '302001',
          age: 24,
          gender: 'पुरुष',
          caste: 'अनुसूचित जाति',
          annualIncome: 180000,
          bplCard: false,
          rationCardType: 'एपीएल',
          occupation: 'छात्र',
          educationLevel: 'स्नातक',
          isProfileComplete: false
        }
      }
    },
    include: {
      profile: true
    }
  })

  console.log('✅ Database seeded successfully!')
  console.log('\n📋 Created Accounts:')
  console.log('🔐 Super Admin: superadmin@sarkarisaathi.in')
  console.log('👨‍💼 Admin: admin@sarkarisaathi.in')
  console.log('🏪 Senior Operator: senior.operator@csc.in')
  console.log('🏪 Junior Operator: junior.operator@csc.in')
  console.log('👤 Premium User: premium.user@example.com')
  console.log('👤 Regular User: user@example.com')
  console.log('👤 New User: new.user@example.com')
  console.log('\n🔑 Password for all accounts: password123')
  console.log('\n🎯 Role-Based Access:')
  console.log('• Super Admin: Full system control')
  console.log('• Admin: User & scheme management')
  console.log('• Operator: Customer service & applications')
  console.log('• User: Personal dashboard & schemes')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
