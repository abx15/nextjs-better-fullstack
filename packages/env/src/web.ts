import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
