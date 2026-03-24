import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      profile: true,
      _count: {
        select: { 
          applications: true,
          chatSessions: true
        }
      }
    }
  });

  return Response.json({ 
    users: users.map(u => ({
      id: u.id,
      name: u.name,
      email: u.email,
      phone: u.phone,
      state: u.profile?.state || "N/A",
      role: u.role,
      isPremium: u.isPremium,
      isBanned: false, // Add a field to schema if banning is needed
      joinedAt: u.createdAt,
      lastActive: u.updatedAt,
      applicationsCount: u._count.applications,
      chatSessionsCount: u._count.chatSessions,
    })) 
  });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { userId, ...data } = await req.json();
  const user = await prisma.user.update({
    where: { id: userId },
    data,
  });

  return Response.json({ user });
}
