import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const state = searchParams.get("state");
  const search = searchParams.get("search");

  const where: any = { isActive: true };

  if (category && category !== "all") {
    where.category = category;
  }

  if (state && state !== "all") {
    where.OR = [
      { level: "central" },
      { tags: { has: state } }
    ];
  }

  if (search) {
    where.OR = [
      ...(where.OR || []),
      { nameHindi: { contains: search, mode: 'insensitive' } },
      { nameEnglish: { contains: search, mode: 'insensitive' } },
    ];
  }

  const schemes = await prisma.scheme.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  return Response.json({ schemes });
}
