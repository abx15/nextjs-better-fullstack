import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.role !== "operator") return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
      emailVerified: new Date(),
    }
  });

  // Create a record in operator's assisted applications or just track the user relation if needed
  // For now we just create the user.

  return Response.json({ user });
}
