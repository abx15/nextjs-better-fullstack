import { env } from "@full-stack-nextjs/env/server";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../prisma/generated";

// Singleton pattern for Prisma client
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaNeon({
  connectionString: env.DATABASE_URL,
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
