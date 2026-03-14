import { auth } from "@/auth";
import { db } from "@/lib/db";
import { agents, flows } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [userFlows, userAgents] = await Promise.all([
    db.select().from(flows).where(eq(flows.userId, session.user.id)),
    db.select().from(agents).where(eq(agents.userId, session.user.id)),
  ]);

  const prompt = `Sen bir otomasyon uzmanısın. Kullanıcının mevcut durumu:
- ${userFlows.length} adet flow var: ${userFlows.map(f => f.name).join(", ") || "yok"}
- ${userAgents.length} adet AI agent var: ${userAgents.map(a => a.name).join(", ") || "yok"}

Bu kullanıcı için 3 adet kişiselleştirilmiş otomasyon önerisi yap. 
JSON formatında döndür, başka hiçbir şey yazma:
[
  {
    "title": "Öneri başlığı",
    "description": "Kısa açıklama (max 1 cümle)",
    "category": "flow veya agent",
    "icon": "emoji",
    "why": "Neden bu öneri (max 1 cümle)"
  }
]`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 500,
    }),
  });

  const data = await res.json();
  const text = data.choices?.[0]?.message?.content ?? "[]";

  try {
    const recommendations = JSON.parse(text.replace(/```json|```/g, "").trim());
    return NextResponse.json({ recommendations, aiGenerated: true });
  } catch {
    return NextResponse.json({ recommendations: [], aiGenerated: false });
  }
}