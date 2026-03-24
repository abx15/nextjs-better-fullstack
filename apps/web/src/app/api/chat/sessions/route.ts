import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const sessions = await prisma.chatSession.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
    include: {
      _count: {
        select: { messages: true }
      }
    }
  });

  return Response.json({ 
    sessions: sessions.map(s => ({
      ...s,
      messageCount: s._count.messages
    })) 
  });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { language, title } = await req.json();

  const chatSession = await prisma.chatSession.create({
    data: {
      userId: session.user.id,
      title: title || (language === "hi" ? "नई बातचीत" : "New Chat"),
      language: language || "hi",
    },
  });

  return Response.json({ session: chatSession });
}
