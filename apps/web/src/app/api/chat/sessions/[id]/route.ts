import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { title } = await req.json();

  const chatSession = await prisma.chatSession.update({
    where: { id: params.id, userId: session.user.id },
    data: { title },
  });

  return Response.json({ session: chatSession });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.chatSession.delete({
    where: { id: params.id, userId: session.user.id },
  });

  return Response.json({ success: true });
}
