import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import prisma from '@full-stack-nextjs/db'

export async function POST(req: Request) {
  const body = await req.json()
  
  // Check if phone already exists
  const existing = await prisma.user.findUnique({ where: { phone: body.phone } })
  if (existing) {
    return Response.json({ error: 'यह मोबाइल नंबर पहले से registered है' }, { status: 400 })
  }
  
  const hashedPassword = await bcrypt.hash(body.password, 12)
  
  const user = await prisma.user.create({
    data: {
      name: body.name,
      phone: body.phone,
      email: body.email || null,
      password: hashedPassword,
    }
  })
  
  return Response.json({ success: true, userId: user.id })
}
