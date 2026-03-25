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

async function main() {
  console.log('🌱 Starting database seeding...')

  // Hash password for all test accounts
  const bcrypt = await import('bcryptjs')
  const password = 'password123'
  const hashedPassword = await bcrypt.default.hash(password, 12)

  // Clear existing data (optional - comment out if you want to preserve data)
  await prisma.application.deleteMany()
  await prisma.cscOperator.deleteMany()
  await prisma.user.deleteMany()
  await prisma.scheme.deleteMany()

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
      emailVerified: new Date(),
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
      emailVerified: new Date(),
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
      emailVerified: new Date(),
    }
  })

  // Create Operator Profile
  await prisma.cscOperator.create({
    data: {
      userId: seniorOperator.id,
      centerName: 'शिवाजी CSC सेंटर',
      cscId: 'CSC-BIHAR-1234',
      state: 'बिहार',
      district: 'पटना',
      address: 'गाँव - मानेर, पोस्ट - मानेर, जिला - पटना',
      isVerified: true,
      totalEarnings: 45670.50
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
      emailVerified: new Date(),
    }
  })

  // Create Junior Operator Profile
  await prisma.cscOperator.create({
    data: {
      userId: juniorOperator.id,
      centerName: 'शक्ति CSC सेंटर',
      cscId: 'CSC-UP-5678',
      state: 'उत्तर प्रदेश',
      district: 'लखनऊ',
      address: 'गाँव - गोमती नगर, पोस्ट - गोमती नगर, जिला - लखनऊ',
      isVerified: true,
      totalEarnings: 23450.25
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
      emailVerified: new Date(),
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
      emailVerified: new Date(),
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
      emailVerified: new Date(),
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
