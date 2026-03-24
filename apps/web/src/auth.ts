import NextAuth from 'next-auth'
// import { PrismaAdapter } from '@auth/prisma-adapter'
// import prisma from '@full-stack-nextjs/db'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  // adapter: PrismaAdapter(prisma), // Temporarily disabled
  session: { strategy: 'jwt' },
  providers: [
    ...authConfig.providers.filter((p) => (p as any).id !== 'credentials'),
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const parsed = z.object({
          email: z.string().email(),
          password: z.string().min(8),
        }).safeParse(credentials)

        if (!parsed.success) return null

        // Mock user for now - replace with actual DB logic later
        return {
          id: "1",
          name: "Demo User",
          email: parsed.data.email,
          role: "user",
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
})
