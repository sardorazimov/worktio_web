import { db } from "@/lib/db";
import { environments } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const list = await db.select().from(environments).where(eq(environments.userId, session.user.id));
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, variables: vars } = await req.json();
  const [env] = await db.insert(environments).values({
    userId: session.user.id,
    name, variables: vars ?? {},
  }).returning();
  return NextResponse.json(env);
}