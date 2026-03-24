import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const [
    totalUsers,
    totalSchemes,
    totalApplications,
    activeSchemes,
    newUsersToday,
    pendingApplications
  ] = await Promise.all([
    prisma.user.count(),
    prisma.scheme.count(),
    prisma.application.count(),
    prisma.scheme.count({ where: { isActive: true } }),
    prisma.user.count({ 
      where: { 
        createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } 
      } 
    }),
    prisma.application.count({ where: { status: "pending" } })
  ]);

  return Response.json({
    stats: {
      totalUsers,
      totalSchemes,
      totalApplications,
      activeSchemes,
      newUsersToday,
      pendingApplications
    }
  });
}
