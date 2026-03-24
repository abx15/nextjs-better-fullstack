import dotenv from "dotenv";
import path from "node:path";
import { defineConfig } from "prisma/config";

// Load .env from web app
dotenv.config({
  path: path.resolve(__dirname, "../../apps/web/.env"),
});

// Fallback to local .env
dotenv.config();

export default defineConfig({
  schema: path.join("prisma", "schema.prisma"),
  migrations: {
    path: path.join("prisma", "migrations"),
  },
  datasource: {
    url: process.env.DATABASE_URL!,
  },
});
