import { PrismaClient } from "../prisma/generated";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config({ path: "../../apps/web/.env" });

const connectionString = process.env.DATABASE_URL;
console.log("Database URL present:", !!connectionString);

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

const hashedPassword = "$2b$10$fGLcXriD73gjnfTTRZxU/AQV1lclvaK7jyIxzPOR"; // Sarkari@123

const users = [
  {
    email: "admin@sarkari.com",
    name: "System Admin",
    password: hashedPassword,
    role: "admin",
    phone: "9999999999",
  },
  {
    email: "operator@sarkari.com",
    name: "CSC Operator",
    password: hashedPassword,
    role: "operator",
    phone: "8888888888",
  },
  {
    email: "user@sarkari.com",
    name: "Ramesh Kumar",
    password: hashedPassword,
    role: "user",
    phone: "7777777777",
  },
];

const schemes = [
  {
    slug: "pm-kisan-samman-nidhi",
    nameHindi: "प्रधानमंत्री किसान सम्मान निधि",
    nameEnglish: "PM-KISAN Samman Nidhi",
    descriptionHindi:
      "इस योजना के तहत सभी भूमिधारक किसान परिवारों को ₹6,000 प्रति वर्ष की आय सहायता तीन समान किस्तों में दी जाती है। यह राशि सीधे किसान के बैंक खाते में ट्रांसफर की जाती है।",
    descriptionEnglish:
      "Under this scheme, all landholding farmer families receive income support of ₹6,000 per year in three equal installments. The amount is directly transferred to the farmer's bank account.",
    category: "kisan",
    subcategory: "income-support",
    level: "central",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय",
    ministryHindi: "कृषि एवं किसान कल्याण मंत्रालय",
    benefitType: "cash",
    benefitAmount: "₹6,000/वर्ष",
    benefitAmountHindi: "₹6,000/वर्ष",
    maxBenefit: 6000,
    eligibilityCriteria: {
      occupation: ["farmer"],
      landHolding: { min: 0.01 },
      annualIncome: { max: 1000000 },
    },
    documentsRequired: [
      "आधार कार्ड",
      "बैंक पासबुक",
      "भूमि स्वामित्व दस्तावेज़",
      "मोबाइल नंबर",
    ],
    applicationUrl: "https://pmkisan.gov.in",
    offlineProcess:
      "नजदीकी CSC सेंटर या लेखपाल/पटवारी से संपर्क करें। आधार, बैंक पासबुक और खतौनी लेकर जाएं।",
    isOngoing: true,
    difficulty: "easy",
    tags: ["kisan", "income", "direct-benefit", "central"],
    totalBeneficiaries: 110000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "ayushman-bharat-pmjay",
    nameHindi: "आयुष्मान भारत - प्रधानमंत्री जन आरोग्य योजना",
    nameEnglish: "Ayushman Bharat - PM Jan Arogya Yojana (PMJAY)",
    descriptionHindi:
      "दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना जो गरीब और कमजोर परिवारों को ₹5 लाख तक का मुफ्त इलाज प्रदान करती है। 1,500 से अधिक बीमारियों का इलाज कवर किया जाता है।",
    descriptionEnglish:
      "The world's largest health insurance scheme providing free treatment up to ₹5 lakh to poor and vulnerable families. Covers treatment of over 1,500 diseases.",
    category: "swasthya",
    subcategory: "health-insurance",
    level: "central",
    ministry: "स्वास्थ्य और परिवार कल्याण मंत्रालय",
    ministryHindi: "स्वास्थ्य और परिवार कल्याण मंत्रालय",
    benefitType: "insurance",
    benefitAmount: "₹5,00,000/परिवार/वर्ष",
    benefitAmountHindi: "₹5,00,000/परिवार/वर्ष",
    maxBenefit: 500000,
    eligibilityCriteria: {
      annualIncome: { max: 300000 },
      bplCard: true,
    },
    documentsRequired: [
      "आधार कार्ड",
      "राशन कार्ड",
      "आय प्रमाण पत्र",
      "मोबाइल नंबर",
    ],
    applicationUrl: "https://pmjay.gov.in",
    offlineProcess:
      "नजदीकी आयुष्मान मित्र या CSC सेंटर पर जाएं। आधार और राशन कार्ड लेकर जाएं।",
    isOngoing: true,
    difficulty: "easy",
    tags: ["health", "insurance", "bpl", "hospital", "free-treatment"],
    totalBeneficiaries: 50000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "pm-awas-yojana",
    nameHindi: "प्रधानमंत्री आवास योजना",
    nameEnglish: "PM Awas Yojana (PMAY)",
    descriptionHindi:
      "इस योजना के तहत ग्रामीण और शहरी गरीब परिवारों को पक्का घर बनाने के लिए ₹1.20 लाख से ₹2.50 लाख तक की सहायता दी जाती है। सब्सिडी होम लोन पर भी उपलब्ध है।",
    descriptionEnglish:
      "Under this scheme, rural and urban poor families get assistance of ₹1.20 lakh to ₹2.50 lakh for building a pucca house. Subsidy is also available on home loans.",
    category: "awas",
    subcategory: "housing",
    level: "central",
    ministry: "आवास और शहरी कार्य मंत्रालय",
    ministryHindi: "आवास और शहरी कार्य मंत्रालय",
    benefitType: "subsidy",
    benefitAmount: "₹1.20 लाख - ₹2.50 लाख",
    benefitAmountHindi: "₹1.20 लाख - ₹2.50 लाख",
    maxBenefit: 250000,
    eligibilityCriteria: {
      annualIncome: { max: 300000 },
      bplCard: true,
      caste: ["sc", "st", "obc", "general"],
    },
    documentsRequired: [
      "आधार कार्ड",
      "आय प्रमाण पत्र",
      "जमीन के कागज़ात",
      "बैंक पासबुक",
      "जाति प्रमाण पत्र",
      "राशन कार्ड",
    ],
    applicationUrl: "https://pmaymis.gov.in",
    offlineProcess: "ग्राम पंचायत या नगर पालिका कार्यालय में आवेदन करें।",
    isOngoing: true,
    difficulty: "medium",
    tags: ["housing", "subsidy", "rural", "urban", "pucca-house"],
    totalBeneficiaries: 30000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "pm-mudra-yojana",
    nameHindi: "प्रधानमंत्री मुद्रा योजना",
    nameEnglish: "PM MUDRA Yojana",
    descriptionHindi: "छोटे व्यापारियों को ₹10 लाख तक का बिना गारंटी लोन।",
    descriptionEnglish: "Collateral-free loans up to ₹10 lakh for small businesses.",
    category: "employment",
    subcategory: "loan",
    level: "central",
    ministry: "Ministry of Finance",
    ministryHindi: "वित्त मंत्रालय",
    benefitType: "loan",
    benefitAmount: "₹10,00,000 तक",
    benefitAmountHindi: "₹10,00,000 तक",
    maxBenefit: 1000000,
    eligibilityCriteria: {
      occupation: ["business", "other"],
      age: { min: 18 },
    },
    documentsRequired: ["Aadhar", "PAN", "Business Proof"],
    applicationUrl: "https://www.mudra.org.in",
    isActive: true,
    isVerified: true,
    difficulty: "medium",
  }
];

async function main() {
  console.log("🌱 Seeding SarkariSaathi database...\n");

  // Seed Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    console.log(`  ✅ User created: ${user.email} (${user.role})`);
  }

  // Seed Schemes
  for (const scheme of schemes) {
    try {
      console.log(`  ⌛ Processing: ${scheme.nameEnglish}...`);
      await prisma.scheme.upsert({
        where: { slug: scheme.slug },
        update: scheme as any,
        create: scheme as any,
      });
      console.log(`  ✅ Scheme created: ${scheme.nameEnglish}`);
    } catch (err: any) {
      console.error(`  ❌ Failed to seed ${scheme.slug}:`, err.message);
    }
  }

  console.log(`\n🎉 Seed process finished!`);
}

main()
  .catch((e) => {
    console.error("❌ Fatal seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
