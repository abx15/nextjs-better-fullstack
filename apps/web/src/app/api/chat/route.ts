import { auth } from "@/auth";
import prisma from "@full-stack-nextjs/db";
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { messages, language, sessionId }: { messages: any[], language: string, sessionId?: string } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // System prompt based on language
  const systemPrompt = `
    You are 'AI Saathi', a helpful government scheme expert for SarkariSaathi.
    Your goal is to help citizens find and understand Indian government schemes.
    Current Language: ${language === "hi" ? "Hindi" : "English"}.
    Always respond in ${language === "hi" ? "Hindi" : "English"}.
    Be polite, professional, and empathetic. 
    If you don't know something, say so and suggest checking the official government website.
  `;

  const userContent = typeof lastMessage.content === 'string' ? lastMessage.content : "";

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemPrompt,
    messages,
    onFinish: async ({ text }) => {
      // Save messages to database if sessionId is provided
      if (sessionId) {
        try {
          // Save User Message
          await prisma.chatMessage.create({
            data: {
              sessionId,
              role: "user",
              content: userContent,
            },
          });
          // Save AI Message
          await prisma.chatMessage.create({
            data: {
              sessionId,
              role: "assistant",
              content: text,
            },
          });
          // Update session timestamp
          await prisma.chatSession.update({
            where: { id: sessionId },
            data: { updatedAt: new Date() },
          });
        } catch (error) {
          console.error("Failed to save chat history:", error);
        }
      }
    },
  });

  return result.toTextStreamResponse();
}
