import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config({ path: "../../apps/web/.env" });

// Since we're running this as a script, we'll manually load the env var
const connectionString = process.env.DATABASE_URL;
console.log("Database URL present:", !!connectionString);

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

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
    benefitType: "cash",
    benefitAmount: "₹6,000/वर्ष",
    maxBenefit: 6000,
    eligibilityCriteria: {
      occupation: ["kisan"],
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
    benefitType: "insurance",
    benefitAmount: "₹5,00,000/परिवार/वर्ष",
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
    benefitType: "subsidy",
    benefitAmount: "₹1.20 लाख - ₹2.50 लाख",
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
    slug: "kisan-credit-card",
    nameHindi: "किसान क्रेडिट कार्ड योजना",
    nameEnglish: "Kisan Credit Card (KCC)",
    descriptionHindi:
      "किसानों को 4% ब्याज दर पर ₹3 लाख तक का कृषि ऋण। फसल बीमा और दुर्घटना बीमा भी शामिल। समय पर भुगतान करने पर ब्याज में 3% की अतिरिक्त छूट।",
    descriptionEnglish:
      "Agricultural loan up to ₹3 lakh at 4% interest rate for farmers. Includes crop insurance and accident insurance. Additional 3% interest subvention for timely repayment.",
    category: "kisan",
    subcategory: "credit",
    level: "central",
    ministry: "कृषि एवं किसान कल्याण मंत्रालय",
    benefitType: "loan",
    benefitAmount: "₹3,00,000 तक @ 4% ब्याज",
    maxBenefit: 300000,
    eligibilityCriteria: {
      occupation: ["kisan"],
      age: { min: 18, max: 75 },
    },
    documentsRequired: [
      "आधार कार्ड",
      "पैन कार्ड",
      "भूमि दस्तावेज़",
      "पासपोर्ट साइज फोटो",
      "बैंक पासबुक",
    ],
    applicationUrl: "https://pmkisan.gov.in/KCC",
    offlineProcess:
      "नजदीकी बैंक शाखा में जाएं। आधार, पैन, खतौनी और पासपोर्ट फोटो लेकर जाएं।",
    isOngoing: true,
    difficulty: "medium",
    tags: ["kisan", "loan", "credit", "agriculture", "bank"],
    totalBeneficiaries: 75000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "sukanya-samriddhi-yojana",
    nameHindi: "सुकन्या समृद्धि योजना",
    nameEnglish: "Sukanya Samriddhi Yojana (SSY)",
    descriptionHindi:
      "बेटियों के भविष्य के लिए बचत योजना। 10 वर्ष से कम उम्र की बेटी के नाम पर खाता खोलें। वर्तमान ब्याज दर 8.2%। ₹250 से शुरू, अधिकतम ₹1.5 लाख/वर्ष जमा करें।",
    descriptionEnglish:
      "Savings scheme for girl child. Open account for daughters below 10 years. Current interest rate 8.2%. Start with ₹250, maximum deposit ₹1.5 lakh/year.",
    category: "mahila",
    subcategory: "savings",
    level: "central",
    ministry: "वित्त मंत्रालय",
    benefitType: "savings",
    benefitAmount: "8.2% ब्याज दर",
    maxBenefit: 150000,
    eligibilityCriteria: {
      gender: ["female"],
      age: { max: 10 },
    },
    documentsRequired: [
      "बेटी का जन्म प्रमाण पत्र",
      "माता-पिता का आधार कार्ड",
      "पता प्रमाण",
      "पासपोर्ट साइज फोटो",
    ],
    applicationUrl: "https://www.india.gov.in/sukanya-samriddhi-yojna",
    offlineProcess: "नजदीकी पोस्ट ऑफिस या बैंक में खाता खोलें।",
    isOngoing: true,
    difficulty: "easy",
    tags: ["girl-child", "savings", "education", "women", "investment"],
    totalBeneficiaries: 30000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "pm-ujjwala-yojana",
    nameHindi: "प्रधानमंत्री उज्ज्वला योजना",
    nameEnglish: "PM Ujjwala Yojana (PMUY)",
    descriptionHindi:
      "BPL परिवारों की महिलाओं को मुफ्त LPG कनेक्शन। पहली बार रिफिल और चूल्हा भी मुफ्त। स्वच्छ ईंधन से स्वस्थ जीवन।",
    descriptionEnglish:
      "Free LPG connection for women of BPL families. First refill and stove also free. Clean fuel for healthy living.",
    category: "mahila",
    subcategory: "fuel",
    level: "central",
    ministry: "पेट्रोलियम और प्राकृतिक गैस मंत्रालय",
    benefitType: "in-kind",
    benefitAmount: "मुफ्त LPG कनेक्शन + रिफिल",
    maxBenefit: 3200,
    eligibilityCriteria: {
      gender: ["female"],
      bplCard: true,
      annualIncome: { max: 200000 },
    },
    documentsRequired: [
      "आधार कार्ड",
      "BPL राशन कार्ड",
      "बैंक पासबुक",
      "पासपोर्ट साइज फोटो",
      "निवास प्रमाण पत्र",
    ],
    applicationUrl: "https://www.pmuy.gov.in",
    offlineProcess:
      "नजदीकी LPG वितरक (HP, Bharat, Indane) से संपर्क करें।",
    isOngoing: true,
    difficulty: "easy",
    tags: ["lpg", "women", "bpl", "clean-fuel", "free"],
    totalBeneficiaries: 100000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "post-matric-scholarship-sc-st",
    nameHindi: "पोस्ट मैट्रिक छात्रवृत्ति (SC/ST)",
    nameEnglish: "Post Matric Scholarship for SC/ST Students",
    descriptionHindi:
      "अनुसूचित जाति/जनजाति के छात्रों को कक्षा 11 से Ph.D तक की पढ़ाई के लिए छात्रवृत्ति। ट्यूशन फीस, रहने का खर्च और किताबों का अनुदान शामिल।",
    descriptionEnglish:
      "Scholarship for SC/ST students for studies from Class 11 to Ph.D. Covers tuition fees, living expenses, and book grants.",
    category: "shiksha",
    subcategory: "scholarship",
    level: "central",
    ministry: "सामाजिक न्याय और अधिकारिता मंत्रालय",
    benefitType: "scholarship",
    benefitAmount: "₹5,000 - ₹1,50,000/वर्ष",
    maxBenefit: 150000,
    eligibilityCriteria: {
      caste: ["sc", "st"],
      occupation: ["student"],
      annualIncome: { max: 250000 },
    },
    documentsRequired: [
      "आधार कार्ड",
      "जाति प्रमाण पत्र",
      "आय प्रमाण पत्र",
      "पिछले वर्ष का मार्कशीट",
      "बैंक पासबुक",
      "प्रवेश पत्र",
    ],
    applicationUrl: "https://scholarships.gov.in",
    offlineProcess: "स्कूल/कॉलेज के प्रिंसिपल से फॉर्म लें और जमा करें।",
    isOngoing: true,
    difficulty: "medium",
    tags: ["scholarship", "sc", "st", "education", "student"],
    totalBeneficiaries: 5000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "pm-mudra-yojana",
    nameHindi: "प्रधानमंत्री मुद्रा योजना (MSME लोन)",
    nameEnglish: "PM MUDRA Yojana (MSME Loan)",
    descriptionHindi:
      "छोटे व्यापारियों को बिना गारंटी ₹10 लाख तक का लोन। शिशु (₹50,000), किशोर (₹5 लाख) और तरुण (₹10 लाख) तीन श्रेणियां। कम ब्याज दर।",
    descriptionEnglish:
      "Collateral-free loan up to ₹10 lakh for small businesses. Three categories: Shishu (₹50K), Kishor (₹5L) and Tarun (₹10L). Low interest rates.",
    category: "rojgar",
    subcategory: "msme-loan",
    level: "central",
    ministry: "वित्त मंत्रालय",
    benefitType: "loan",
    benefitAmount: "₹50,000 - ₹10,00,000",
    maxBenefit: 1000000,
    eligibilityCriteria: {
      age: { min: 18 },
      occupation: ["business", "self-employed"],
    },
    documentsRequired: [
      "आधार कार्ड",
      "पैन कार्ड",
      "व्यापार का प्रमाण",
      "बैंक स्टेटमेंट (6 महीने)",
      "पासपोर्ट साइज फोटो",
      "व्यापार योजना",
    ],
    applicationUrl: "https://www.mudra.org.in",
    offlineProcess: "किसी भी बैंक शाखा में मुद्रा लोन के लिए आवेदन करें।",
    isOngoing: true,
    difficulty: "medium",
    tags: ["msme", "loan", "business", "entrepreneur", "mudra"],
    totalBeneficiaries: 40000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "indira-gandhi-vidhwa-pension",
    nameHindi: "इंदिरा गांधी राष्ट्रीय विधवा पेंशन योजना",
    nameEnglish: "Indira Gandhi National Widow Pension Scheme",
    descriptionHindi:
      "40-79 वर्ष की विधवा महिलाओं को ₹300/माह पेंशन (केंद्र सरकार)। राज्य सरकार अतिरिक्त ₹200-₹1,500 देती है। BPL परिवार की विधवाएं पात्र हैं।",
    descriptionEnglish:
      "Pension of ₹300/month for widows aged 40-79 (central govt). State govt adds ₹200-₹1,500. BPL family widows are eligible.",
    category: "mahila",
    subcategory: "pension",
    level: "central",
    ministry: "ग्रामीण विकास मंत्रालय",
    benefitType: "pension",
    benefitAmount: "₹300 - ₹1,800/माह",
    maxBenefit: 21600,
    eligibilityCriteria: {
      gender: ["female"],
      isWidow: true,
      age: { min: 40, max: 79 },
      bplCard: true,
    },
    documentsRequired: [
      "आधार कार्ड",
      "पति का मृत्यु प्रमाण पत्र",
      "आय प्रमाण पत्र",
      "BPL प्रमाण पत्र",
      "बैंक पासबुक",
      "आयु प्रमाण",
    ],
    applicationUrl: "https://nsap.nic.in",
    offlineProcess:
      "ग्राम पंचायत / नगरपालिका कार्यालय में आवेदन करें। तहसील या SDM कार्यालय से भी आवेदन कर सकते हैं।",
    isOngoing: true,
    difficulty: "easy",
    tags: ["widow", "pension", "women", "bpl", "monthly-income"],
    totalBeneficiaries: 8000000,
    isActive: true,
    isVerified: true,
  },
  {
    slug: "indira-gandhi-vridhavastha-pension",
    nameHindi: "इंदिरा गांधी राष्ट्रीय वृद्धावस्था पेंशन योजना",
    nameEnglish: "Indira Gandhi National Old Age Pension Scheme",
    descriptionHindi:
      "60 वर्ष से अधिक उम्र के BPL वरिष्ठ नागरिकों को ₹200-₹500/माह पेंशन। 80+ उम्र के लिए ₹500/माह। राज्य सरकार अतिरिक्त राशि जोड़ती है।",
    descriptionEnglish:
      "Pension of ₹200-₹500/month for BPL senior citizens aged 60+. ₹500/month for 80+ age. State govt adds additional amount.",
    category: "vridh",
    subcategory: "pension",
    level: "central",
    ministry: "ग्रामीण विकास मंत्रालय",
    benefitType: "pension",
    benefitAmount: "₹200 - ₹2,000/माह",
    maxBenefit: 24000,
    eligibilityCriteria: {
      isSeniorCitizen: true,
      age: { min: 60 },
      bplCard: true,
    },
    documentsRequired: [
      "आधार कार्ड",
      "आयु प्रमाण (जन्म प्रमाण पत्र)",
      "BPL प्रमाण पत्र",
      "आय प्रमाण पत्र",
      "बैंक पासबुक",
      "निवास प्रमाण पत्र",
    ],
    applicationUrl: "https://nsap.nic.in",
    offlineProcess:
      "ग्राम पंचायत या नगरपालिका कार्यालय में आवेदन करें। सभी दस्तावेज़ की फोटोकॉपी लेकर जाएं।",
    isOngoing: true,
    difficulty: "easy",
    tags: ["senior-citizen", "pension", "old-age", "bpl", "elderly"],
    totalBeneficiaries: 35000000,
    isActive: true,
    isVerified: true,
  },
];

async function main() {
  console.log("🌱 Seeding SarkariSaathi database...\n");

  for (const scheme of schemes) {
    try {
      console.log(`  ⌛ Processing: ${scheme.nameEnglish}...`);
      const created = await prisma.scheme.upsert({
        where: { slug: scheme.slug },
        update: scheme,
        create: scheme,
      });
      console.log(`  ✅ ${created.nameEnglish} (${created.slug})`);
    } catch (err: any) {
      console.error(`  ❌ Failed to seed ${scheme.slug}:`, err.message);
      if (err.code) console.error(`     Error code: ${err.code}`);
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
