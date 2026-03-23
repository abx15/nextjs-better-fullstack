import { inngest } from "./client";
import prisma from "@full-stack-nextjs/db";

// Daily reminder check at 9 AM
export const dailyReminderCheck = inngest.createFunction(
  { id: "daily-reminder-check" },
  { cron: "0 9 * * *" },
  async ({ step }) => {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    // Find schemes with deadlines in next 7 days
    const urgentSchemes = await step.run("find-urgent-schemes", async () => {
      return prisma.scheme.findMany({
        where: {
          deadline: { 
            lte: sevenDaysFromNow, 
            gte: new Date() 
          },
          isActive: true,
        },
      });
    });

    // For each scheme, find users who saved it and create reminders
    for (const scheme of urgentSchemes) {
      await step.run(`notify-scheme-${scheme.id}`, async () => {
        const savedByUsers = await prisma.savedScheme.findMany({
          where: { schemeId: scheme.id },
          select: { userId: true },
        });

        for (const { userId } of savedByUsers) {
          // Check if reminder already exists
          const existingReminder = await prisma.reminder.findFirst({
            where: {
              userId,
              schemeId: scheme.id,
              type: "deadline",
            },
          });

          if (!existingReminder) {
            await prisma.reminder.create({
              data: {
                userId,
                type: "deadline",
                title: "Deadline approaching",
                titleHindi: `${scheme.nameHindi} का समय कम है!`,
                message: "Application deadline is soon",
                messageHindi: `${scheme.nameHindi} के आवेदन की last date जल्द आ रही है।`,
                dueDate: scheme.deadline!,
                schemeId: scheme.id,
              },
            });
          }
        }
      });
    }

    return { processed: urgentSchemes.length };
  }
);
