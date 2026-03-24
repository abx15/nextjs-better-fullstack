import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "operator") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const operator = await prisma.cscOperator.findUnique({
    where: { userId: session.user.id }
  });

  if (!operator) return Response.json({ error: "Operator profile not found" }, { status: 404 });

  const customers = await prisma.user.findMany({
    where: {
      applications: {
        some: { operatorId: operator.id }
      }
    },
    include: {
      profile: true,
      _count: {
        select: {
          applications: { where: { operatorId: operator.id } }
        }
      }
    },
    orderBy: { updatedAt: "desc" },
    take: 10
  });

  return Response.json({
    customers: customers.map(c => ({
      id: (c as any).id,
      name: (c as any).name,
      phone: (c as any).phone,
      state: (c as any).profile?.state || "N/A",
      lastVisit: (c as any).updatedAt,
      schemesApplied: (c as any)._count.applications
    }))
  });
}
