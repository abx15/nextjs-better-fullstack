import { auth } from '../../../../auth'
import prisma from '@full-stack-nextjs/db'

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  
  const data = await req.json()
  
  // Auto-detect senior citizen
  if (data.age >= 60) data.isSeniorCitizen = true
  
  const profile = await prisma.userProfile.upsert({
    where: { userId: session.user.id },
    update: { 
      ...data, 
      isProfileComplete: true 
    },
    create: { 
      userId: session.user.id, 
      ...data, 
      isProfileComplete: true 
    },
  })
  
  return Response.json({ success: true, profile })
}
