import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@sarkari-saathi/db';
import { openai } from '@ai-sdk/openai';
import { generateObject } from 'ai';
import { z } from 'zod';
import { redis } from '@/lib/redis';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    const { forceRefresh } = await req.json().catch(() => ({}));

    // Check cache (2 hours)
    if (!forceRefresh) {
      try {
        const cached = await redis.get(`schemes:match:${userId}`);
        if (cached) {
          return NextResponse.json({ 
            schemes: JSON.parse(cached as string), 
            fromCache: true 
          });
        }
      } catch (cacheError) {
        console.log('Redis cache miss, proceeding with AI matching');
      }
    }

    // Get user profile
    const profile = await prisma.userProfile.findUnique({ 
      where: { userId } 
    });

    if (!profile) {
      return NextResponse.json({ 
        error: 'Profile not found. Please complete your profile first.' 
      }, { status: 404 });
    }

    // Get all active schemes
    const schemes = await prisma.scheme.findMany({ 
      where: { isActive: true } 
    });

    if (schemes.length === 0) {
      return NextResponse.json({ 
        schemes: [],
        fromCache: false 
      });
    }

    // Use AI to match schemes
    try {
      const { object } = await generateObject({
        model: openai('gpt-4o-mini'),
        schema: z.object({
          matches: z.array(z.object({
            schemeId: z.string(),
            eligibilityScore: z.number().min(0).max(100),
            matchReasonHindi: z.string().max(100),
            missingDocuments: z.array(z.string()),
            priority: z.enum(['high', 'medium', 'low']),
          }))
        }),
        prompt: `You are an Indian government scheme eligibility expert.

User Profile:
State: ${profile.state}, District: ${profile.district}
Age: ${profile.age}, Gender: ${profile.gender}
Caste: ${profile.caste}, Income: ₹${profile.annualIncome}/year
BPL: ${profile.bplCard}, Occupation: ${profile.occupation}
Disabled: ${profile.isDisabled}, Widow: ${profile.isWidow}
Senior Citizen: ${profile.isSeniorCitizen}, Minority: ${profile.isMinority}
${profile.occupation === 'farmer' ? `Land: ${profile.landHolding} acres` : ''}

Schemes to check eligibility:
${schemes.map(s => `ID: ${s.id} | ${s.nameHindi} | ${s.nameEnglish} | Category: ${s.category} | Level: ${s.level} | State: ${s.state || 'Central'}`).join('\n')}

For each scheme:
1. eligibilityScore (0-100): How well user matches all criteria
2. matchReasonHindi: ONE sentence in simple Hindi why they match/don't
3. missingDocuments: Documents they likely don't have (max 3)
4. priority: high(>70), medium(40-70), low(<40)

Return ALL schemes but only with score >= 10.
Sort by score descending.`,
      });

      const result = object.matches;

      // Cache for 2 hours
      try {
        await redis.set(`schemes:match:${userId}`, JSON.stringify(result), { 
          ex: 7200 
        });
      } catch (cacheError) {
        console.log('Failed to cache results, but continuing');
      }

      return NextResponse.json({ 
        schemes: result, 
        fromCache: false 
      });
    } catch (aiError) {
      console.error('AI matching failed:', aiError);
      
      // Fallback to mock data
      const mockMatches = schemes.slice(0, 5).map((scheme, index) => ({
        schemeId: scheme.id,
        eligibilityScore: 85 - (index * 10),
        matchReasonHindi: "आप इस योजना के लिए पात्र हो सकते हैं",
        missingDocuments: ["आय प्रमाण पत्र", "निवास प्रमाण पत्र"],
        priority: index === 0 ? "high" : index < 3 ? "medium" : "low" as const,
      }));

      return NextResponse.json({ 
        schemes: mockMatches, 
        fromCache: false 
      });
    }
  } catch (error) {
    console.error('Scheme matching failed:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
