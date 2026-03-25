import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@full-stack-nextjs/db";
import NextAuth from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { UserRole } from "./rbac";

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

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
    isActive: boolean;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "database",
  },
  providers: [
    // OAuth providers - configure in your .env file
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
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

        // Find user by email or phone
        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.email as string },
              { phone: credentials.email as string }
            ]
          },
        });

        if (!user || !user.password) {
          return null;
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          phone: user.phone,
          image: user.image,
          role: user.role,
          isActive: (user as any).isActive ?? true,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user && user) {
        session.user.id = user.id;
        session.user.role = (user as any).role;
        session.user.isActive = (user as any).isActive;
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
