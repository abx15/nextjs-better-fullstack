import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";
import { matchSchemes } from "@/lib/ai/scheme-matcher";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const [
    profile,
    applications,
    reminders,
    savedSchemes
  ] = await Promise.all([
    prisma.userProfile.findUnique({ where: { userId: session.user.id } }),
    prisma.application.findMany({ 
      where: { userId: session.user.id },
      include: { scheme: true },
      orderBy: { appliedAt: "desc" }
    }),
    prisma.reminder.findMany({
      where: { userId: session.user.id, isRead: false },
      orderBy: { dueDate: "asc" },
      take: 5
    }),
    prisma.savedScheme.count({ where: { userId: session.user.id } })
  ]);

  // Use the matcher to get top 3 recommendations if profile exists
  let topSchemes: any[] = [];
  if (profile) {
    const matchResult = await matchSchemes();
    if (matchResult && 'schemes' in matchResult && matchResult.schemes) {
      topSchemes = matchResult.schemes.slice(0, 3);
    }
  }

  const stats = {
    total: applications.length,
    applied: applications.filter(a => a.status === "applied" || a.status === "approved").length,
    approved: applications.filter(a => a.status === "approved").length,
    pending: applications.filter(a => a.status === "applied").length,
    saved: savedSchemes,
  };

  const recentActivity = applications.slice(0, 5).map(a => ({
    id: a.id,
    description: `${a.scheme.nameHindi} में Apply किया ✅`,
    time: a.appliedAt,
    icon: "📋",
  }));

  return Response.json({
    stats,
    topSchemes,
    reminders: reminders.map(r => ({
      id: r.id,
      title: r.titleHindi,
      dueDate: r.dueDate,
      type: r.type,
      icon: r.type === "installment" ? "💰" : "🏥",
    })),
    recentActivity,
  });
}
