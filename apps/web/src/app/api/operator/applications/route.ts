import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "operator") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const operator = await prisma.cscOperator.findUnique({
    where: { userId: session.user.id }
  });

  if (!operator) return Response.json({ error: "Operator profile not found" }, { status: 404 });

  const applications = await prisma.application.findMany({
    where: { operatorId: operator.id },
    include: {
      user: true,
      scheme: true
    },
    orderBy: { appliedAt: "desc" },
    take: 10
  });

  return Response.json({
    applications: applications.map(a => ({
      id: (a as any).id,
      customerName: (a as any).user.name,
      schemeName: (a as any).scheme.nameEnglish,
      status: (a as any).status,
      createdAt: (a as any).appliedAt
    }))
  });
}
