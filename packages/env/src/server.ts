import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    CORS_ORIGIN: z.string().url(),
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    
    // AI Integration - Optional for development
    OPENAI_API_KEY: z.string().min(1).optional(),
    
    // Redis Integration - Optional for development
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1).optional(),
    
    // Sarvam TTS Integration - Optional for development
    SARVAM_API_KEY: z.string().min(1).optional(),
    
    // Auth - Optional for development
    AUTH_SECRET: z.string().min(1).optional(),
    GOOGLE_CLIENT_ID: z.string().min(1).optional(),
    GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
