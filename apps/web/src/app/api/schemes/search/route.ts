import { auth } from "@/auth";
// import prisma from "@full-stack-nextjs/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const state = searchParams.get("state");
  const search = searchParams.get("search");

  // Mock schemes data
  const allSchemes = [
    {
      id: "1",
      slug: "pm-kisan",
      nameHindi: "पीएम किसान सम्मान निधि",
      nameEnglish: "PM Kisan Samman Nidhi",
      descriptionHindi: "छोटे किसानों को प्रति वर्ष ₹6,000 की आय सहायता",
      descriptionEnglish: "Income support of ₹6,000 per year to small farmers",
      category: "agriculture",
      level: "central",
      state: "all",
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      slug: "national-scholarship",
      nameHindi: "राष्ट्रीय छात्रवृत्ति पोर्टल",
      nameEnglish: "National Scholarship Portal",
      descriptionHindi: "आर्थिक रूप से कमजोर वर्गों के छात्रों के लिए छात्रवृत्तियां",
      descriptionEnglish: "Scholarships for students from economically weaker sections",
      category: "education",
      level: "central",
      state: "all",
      isActive: true,
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      slug: "ayushman-bharat",
      nameHindi: "आयुष्मान भारत",
      nameEnglish: "Ayushman Bharat",
      descriptionHindi: "गरीब परिवारों को मुफ्त स्वास्थ्य बीमा",
      descriptionEnglish: "Free health insurance for poor families",
      category: "health",
      level: "central",
      state: "all",
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  let schemes = allSchemes.filter(scheme => scheme.isActive);

  if (category && category !== "all") {
    schemes = schemes.filter(scheme => scheme.category === category);
  }

  if (state && state !== "all") {
    schemes = schemes.filter(scheme => 
      scheme.level === "central" || scheme.state === state || scheme.state === "all"
    );
  }

  if (search) {
    const searchLower = search.toLowerCase();
    schemes = schemes.filter(scheme =>
      scheme.nameHindi.toLowerCase().includes(searchLower) ||
      scheme.nameEnglish.toLowerCase().includes(searchLower)
    );
  }

  return Response.json({ schemes });
}
