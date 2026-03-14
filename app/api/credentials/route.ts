import { db } from "@/lib/db";
import { credentials } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await db.select().from(credentials).where(eq(credentials.userId, session.user.id));
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, type, data } = await req.json();
  const [cred] = await db.insert(credentials).values({
    userId: session.user.id,
    name, type, data: data ?? {},
  }).returning();
  return NextResponse.json(cred);
}