import { auth } from "@/auth";

export async function matchSchemes() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  // Mock profile for now
  const profile = {
    age: 25,
    occupation: "student",
    annualIncome: 50000,
    caste: "general",
    isSeniorCitizen: false,
    state: "uttar pradesh"
  };

  // Mock schemes with matching logic
  const schemes = [
    {
      slug: "pm-kisan",
      nameEnglish: "PM Kisan Samman Nidhi",
      nameHindi: "पीएम किसान सम्मान निधि",
      descriptionEnglish: "Income support of ₹6,000 per year to small farmers",
      descriptionHindi: "छोटे किसानों को प्रति वर्ष ₹6,000 की आय सहायता",
      level: "central",
      category: "agriculture",
      eligibilityCriteria: {
        minAge: 18,
        maxAge: null,
        occupation: ["farmer"],
        maxAnnualIncome: 6000000,
        caste: ["all"],
        states: ["all"]
      }
    },
    {
      slug: "national-scholarship",
      nameEnglish: "National Scholarship Portal",
      nameHindi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
      descriptionEnglish: "Scholarships for students from economically weaker sections",
      descriptionHindi: "आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए छात्रवृत्तियां",
      level: "central",
      category: "education",
      eligibilityCriteria: {
        minAge: 16,
        maxAge: 35,
        occupation: ["student"],
        maxAnnualIncome: 8000000,
        caste: ["sc", "st", "obc", "general"],
        states: ["all"]
      }
    }
  ];

  // Simple matching logic
  const matchedSchemes = schemes.map(scheme => {
    let matchPercent = 0;
    const missingDocs = [];
    const reasoning = [];

    // Check age
    if (scheme.eligibilityCriteria.minAge && profile.age >= scheme.eligibilityCriteria.minAge) {
      matchPercent += 25;
    } else if (scheme.eligibilityCriteria.minAge) {
      reasoning.push(`आपकी आयु ${scheme.eligibilityCriteria.minAge} वर्ष से कम है`);
    }

    // Check occupation
    if (scheme.eligibilityCriteria.occupation.includes("all") || 
        scheme.eligibilityCriteria.occupation.includes(profile.occupation)) {
      matchPercent += 30;
    } else {
      reasoning.push(`यह योजना केवल ${scheme.eligibilityCriteria.occupation.join(", ")} के लिए है`);
    }

    // Check income
    if (profile.annualIncome <= scheme.eligibilityCriteria.maxAnnualIncome) {
      matchPercent += 25;
    } else {
      reasoning.push(`आपकी आय सीमा से अधिक है`);
    }

    // Check caste
    if (scheme.eligibilityCriteria.caste.includes("all") || 
        scheme.eligibilityCriteria.caste.includes(profile.caste)) {
      matchPercent += 20;
    } else {
      reasoning.push(`यह योजना केवल ${scheme.eligibilityCriteria.caste.join(", ")} वर्ग के लिए है`);
    }

    // Add missing documents based on scheme
    if (scheme.category === "education") {
      missingDocs.push("आधार कार्ड", "आय प्रमाण पत्र", "शैक्षणिक दस्तावेज");
    } else if (scheme.category === "agriculture") {
      missingDocs.push("आधार कार्ड", "भूमि के कागजात", "बैंक खाता");
    }

    return {
      ...scheme,
      matchPercent,
      reasoning: reasoning.join(", "),
      missingDocs
    };
  }).filter(scheme => scheme.matchPercent > 30)
   .sort((a, b) => b.matchPercent - a.matchPercent);

  return { schemes: matchedSchemes };
}
