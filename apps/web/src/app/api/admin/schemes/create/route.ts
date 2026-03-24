import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { 
    nameHindi, nameEnglish, slug, descriptionHindi, descriptionEnglish,
    category, subcategory, level, state, ministry, ministryHindi,
    benefitType, benefitAmount, benefitAmountHindi, eligibilityCriteria,
    documentsRequired, applicationMode, applicationUrl, offlineProcess,
    offlineProcessHindi, difficulty, tags
  } = body;

  const scheme = await prisma.scheme.create({
    data: {
      nameHindi, nameEnglish, slug, descriptionHindi, descriptionEnglish,
      category, subcategory, level, state, ministry, ministryHindi,
      benefitType, benefitAmount, benefitAmountHindi, eligibilityCriteria,
      documentsRequired, applicationMode, applicationUrl, offlineProcess,
      offlineProcessHindi, difficulty, tags
    }
  });

  return Response.json({ scheme });
}
