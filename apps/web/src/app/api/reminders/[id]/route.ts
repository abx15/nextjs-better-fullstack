import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { isRead, title, titleHindi, message, messageHindi, dueDate } = body;

    const reminder = await prisma.reminder.updateMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      data: {
        ...(isRead !== undefined && { isRead }),
        ...(title && { title }),
        ...(titleHindi && { titleHindi }),
        ...(message && { message }),
        ...(messageHindi && { messageHindi }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
      },
    });

    if (reminder.count === 0) {
      return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating reminder:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reminder = await prisma.reminder.deleteMany({
      where: {
        id: params.id,
        userId: session.user.id,
      },
    });

    if (reminder.count === 0) {
      return NextResponse.json({ error: "Reminder not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
