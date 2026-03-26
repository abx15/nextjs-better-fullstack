import { auth } from './auth'

// Server-only authentication utilities
export async function getServerSession() {
  return await auth()
}

export async function requireServerAuth() {
  const session = await getServerSession()
  
  if (!session?.user) {
    throw new Error('Authentication required')
  }
  
  return session
}
