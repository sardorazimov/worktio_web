import { db } from "@/lib/db";
import { variables } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await db.select().from(variables).where(eq(variables.userId, session.user.id));
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key, value, encrypted } = await req.json();
  const [variable] = await db.insert(variables).values({
    userId: session.user.id,
    key, value, encrypted: encrypted ?? false,
  }).returning();
  return NextResponse.json(variable);
}