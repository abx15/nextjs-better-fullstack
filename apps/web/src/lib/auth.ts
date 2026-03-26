// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@full-stack-nextjs/db";
import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import type { UserRole } from "./rbac";

// Extend the built-in session type
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: UserRole;
      isPremium: boolean;
      language: string;
      isActive: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    role: UserRole;
    isActive: boolean;
  }
}

// Mock user storage (shared with register API)
declare global {
  var mockUsers: any[] | undefined
}

const mockUsers = globalThis.mockUsers || []

export async function getMockUser(emailOrPhone: string, password: string) {
  console.log('Looking for user:', emailOrPhone)
  console.log('Total mock users:', mockUsers.length)
  
  const user = mockUsers.find(u => u.email === emailOrPhone || u.phone === emailOrPhone)
  if (!user) {
    console.log('User not found')
    return null
  }
  
  const bcrypt = await import('bcryptjs')
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) {
    console.log('Invalid password')
    return null
  }
  
  console.log('User authenticated successfully:', user.name)
  return user
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: PrismaAdapter(prisma), // Temporarily disabled - using JWT strategy
  session: {
    strategy: "jwt",
  },
  providers: [
    // OAuth providers - configure in your .env file
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID || "",
      clientSecret: process.env.AUTH_GITHUB_SECRET || "",
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID || "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET || "",
    }),
    // Email/Password authentication
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // First try mock users (for registered users)
        const mockUser = await getMockUser(credentials.email as string, credentials.password as string);
        if (mockUser) {
          return {
            id: mockUser.id,
            email: mockUser.email,
            name: mockUser.name,
            role: mockUser.role,
            isActive: mockUser.isActive,
          };
        }

        // Mock authentication for demo - accept any email with password "password123"
        if (credentials.password === "password123") {
          return {
            id: "demo_user",
            email: credentials.email as string,
            name: "Demo User",
            role: "USER" as UserRole,
            isActive: true,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as UserRole;
        session.user.isActive = token.isActive as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.isActive = (user as any).isActive;
      }
      return token;
    },
  },
  trustHost: true,
});
