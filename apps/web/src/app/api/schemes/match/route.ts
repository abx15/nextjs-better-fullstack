import { matchSchemes } from "@/lib/ai/scheme-matcher";

export async function POST() {
  const result = await matchSchemes();
  if ('error' in result) {
    return Response.json({ error: result.error }, { status: result.error === "Unauthorized" ? 401 : 400 });
  }
  return Response.json({ schemes: result.schemes });
}
