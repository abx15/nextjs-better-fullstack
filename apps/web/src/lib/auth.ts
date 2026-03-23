import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@full-stack-nextjs/db";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

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
        // Add your own authentication logic here
        // This is a placeholder - implement proper password validation
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Example: Replace with your actual user lookup and password verification
        // const user = await db.query.users.findFirst({
        //   where: eq(users.email, credentials.email),
        // });
        // if (user && await verifyPassword(credentials.password, user.password)) {
        //   return { id: user.id, email: user.email, name: user.name };
        // }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user, token }) {
      if (session.user) {
        session.user.id = user?.id ?? token?.sub ?? "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  trustHost: true,
});
