import { PrismaClient } from "../prisma/generated/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool } from "@neondatabase/serverless";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  console.log("Connection string from env:", connectionString ? "EXISTS" : "MISSING");
  if (connectionString) {
    console.log("Starts with:", connectionString.substring(0, 20));
  }
  if (!connectionString) throw new Error("DATABASE_URL is not set");

  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  console.log("Testing connection...");
  try {
    const userCount = await prisma.user.count();
    console.log("Connection successful! User count:", userCount);

    console.log("Testing create scheme...");
    const testScheme = await prisma.scheme.create({
      data: {
        slug: "test-scheme-" + Date.now(),
        nameHindi: "टेस्ट योजना",
        nameEnglish: "Test Scheme",
        descriptionHindi: "टेस्ट",
        descriptionEnglish: "Test",
        category: "test",
        ministry: "test",
        benefitType: "test",
      }
    });
    console.log("Create successful! Scheme ID:", testScheme.id);

    // Clean up
    await prisma.scheme.delete({ where: { id: testScheme.id } });
    console.log("Delete successful!");

  } catch (err: any) {
    console.error("Test failed:", err.message);
    if (err.code) console.error("Error code:", err.code);
  } finally {
    await prisma.$disconnect();
  }
}

main();
