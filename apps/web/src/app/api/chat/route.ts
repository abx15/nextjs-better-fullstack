import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();
  
  const result = streamText({
    model: openai('gpt-4o-mini'),
    messages,
    system: 'You are a helpful AI assistant. Be concise, clear, and friendly in your responses.',
  });
  
  return result.toTextStreamResponse();
}
