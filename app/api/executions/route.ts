import { db } from "@/lib/db";
import { executions } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const list = await db.select().from(executions)
    .where(eq(executions.userId, session.user.id))
    .orderBy(desc(executions.createdAt))
    .limit(100);

  return NextResponse.json(list);
}