import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../auth";
import prisma from "@full-stack-nextjs/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";

    let whereClause: any = { userId: session.user.id };

    if (filter === "unread") {
      whereClause.isRead = false;
    } else if (filter === "deadline") {
      whereClause.type = "deadline";
    } else if (filter === "new_scheme") {
      whereClause.type = "new_scheme";
    } else if (filter === "benefit") {
      whereClause.type = { in: ["installment", "approval"] };
    }

    const reminders = await prisma.reminder.findMany({
      where: whereClause,
      orderBy: [{ isRead: "asc" }, { dueDate: "asc" }],
    });

    return NextResponse.json({ reminders });
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      type,
      title,
      titleHindi,
      message,
      messageHindi,
      dueDate,
      schemeId,
    } = body;

    const reminderData: any = {
      userId: session.user.id,
      type,
      title,
      titleHindi,
      message,
      messageHindi,
      schemeId,
    };

    if (dueDate) {
      reminderData.dueDate = new Date(dueDate);
    }

    const reminder = await prisma.reminder.create({
      data: reminderData,
    });

    return NextResponse.json({ reminder });
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
