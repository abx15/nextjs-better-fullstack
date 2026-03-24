import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";

export async function matchSchemes() {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };

  const profile = await prisma.userProfile.findUnique({
    where: { userId: session.user.id },
  });

  if (!profile) return { error: "Profile not found" };

  // Fetch candidate schemes (filtering by state for now)
  const schemes = await prisma.scheme.findMany({
    where: {
      isActive: true,
      OR: [
        { level: "central" },
        { tags: { has: profile.state } }
      ]
    },
  });

  if (schemes.length === 0) return { schemes: [] };

  // Use LLM to score and filter
  const { object } = await generateObject({
    model: openai("gpt-4o-mini"),
    schema: z.object({
      matchedSchemes: z.array(z.object({
        slug: z.string(),
        matchPercent: z.number().min(0).max(100),
        reasoning: z.string(),
        missingDocs: z.array(z.string()),
      })),
    }),
    prompt: `
      Identify which of these government schemes the following user is eligible for.
      
      User Profile:
      - Age: ${profile.age}
      - Occupation: ${profile.occupation}
      - Annual Income: ₹${profile.annualIncome}
      - Caste: ${profile.caste}
      - Senior Citizen: ${profile.isSeniorCitizen ? "Yes" : "No"}
      - State: ${profile.state}
      
      Schemes:
      ${schemes.map(s => `- ${s.nameEnglish} (Slug: ${s.slug}): ${s.descriptionEnglish}`).join("\n")}
      
      Return a list of matched schemes with:
      - slug: The scheme slug.
      - matchPercent: A number from 0-100 indicating how well they fit.
      - reasoning: Why they qualify or why they are a good match (in simple Hindi).
      - missingDocs: Any documents from the common list they might need to apply.
    `,
  });

  // Enrich with full scheme data
  const result = object.matchedSchemes
    .filter(m => m.matchPercent > 50)
    .map(m => {
      const scheme = schemes.find(s => s.slug === m.slug);
      return {
        ...scheme,
        matchPercent: m.matchPercent,
        reasoning: m.reasoning,
        missingDocs: m.missingDocs,
      };
    })
    .sort((a, b) => b.matchPercent - a.matchPercent);

  return { schemes: result };
}
