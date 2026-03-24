import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  
  const scheme = await prisma.scheme.update({
    where: { id: params.id },
    data: body
  });

  return Response.json({ scheme });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (session?.user?.role !== "admin") return Response.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.scheme.delete({
    where: { id: params.id }
  });

  return Response.json({ success: true });
}
