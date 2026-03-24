import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "operator") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const operator = await prisma.cscOperator.findUnique({
    where: { userId: session.user.id },
    include: {
      _count: {
        select: { assistedApplications: true }
      }
    }
  });

  if (!operator) return Response.json({ error: "Operator profile not found" }, { status: 404 });

  const [
    pendingApps,
    completedApps,
    todayApps
  ] = await Promise.all([
    prisma.application.count({ 
      where: { operatorId: operator.id, status: "pending" } 
    }),
    prisma.application.count({ 
      where: { operatorId: operator.id, status: "approved" } 
    }),
    prisma.application.count({ 
      where: { 
        operatorId: operator.id, 
        appliedAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
      } 
    })
  ]);

  return Response.json({
    stats: {
      totalApplications: (operator as any)._count.assistedApplications,
      pendingApplications: pendingApps,
      completedApplications: completedApps,
      todayApplications: todayApps,
      walletBalance: 0, // Not in schema, setting to 0
      totalEarnings: operator.totalEarnings,
    }
  });
}
