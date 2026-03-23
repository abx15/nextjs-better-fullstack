import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import prisma from "@full-stack-nextjs/db";

export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Mock stats - replace with actual database queries
    const stats = {
      totalUsers: 50234,
      activeSchemes: 1043,
      applicationsToday: 234,
      premiumUsers: 1200,
      userGrowth: 12,
      applicationGrowth: 5,
      premiumGrowth: 8,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
