import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";

import { Media } from "./payload/collections/Media";
import { Pages } from "./payload/collections/Pages";
import { Users } from "./payload/collections/Users";

export default buildConfig({
  // Rich text editor
  editor: lexicalEditor(),

  // Collections
  collections: [Users, Media, Pages],

  // Secret for encryption (should be a complex and secure string)
  secret: process.env.PAYLOAD_SECRET || "",

  // Database adapter
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),

  // Admin panel configuration
  admin: {
    // Customize admin panel
    meta: {
      titleSuffix: "- full-stack-nextjs",
    },
  },

  // TypeScript configuration
  typescript: {
    outputFile: "./src/payload-types.ts",
  },
});
