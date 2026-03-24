import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const schemes = await prisma.scheme.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: {
        select: { applications: true }
      }
    }
  });

  return Response.json({ 
    schemes: schemes.map(s => ({
      ...s,
      applications: s._count.applications,
      views: 0, // Placeholder as we don't track views yet
    })) 
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await req.json();
  const scheme = await prisma.scheme.create({
    data,
  });

  return Response.json({ scheme });
}
