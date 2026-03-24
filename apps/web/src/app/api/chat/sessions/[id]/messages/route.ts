import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const chatSession = await prisma.chatSession.findUnique({
    where: { 
      id: params.id,
      userId: session.user.id
    },
    include: {
      messages: {
        orderBy: { createdAt: "asc" }
      }
    }
  });

  if (!chatSession) return Response.json({ error: "Session not found" }, { status: 404 });

  return Response.json({
    messages: chatSession.messages
  });
}
