import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { dailyReminderCheck } from "@/inngest/reminders";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [dailyReminderCheck],
});
