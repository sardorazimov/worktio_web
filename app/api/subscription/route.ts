
import { auth } from "@/auth";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { subscriptions } from "../../../lib/db/schema";
import { db } from "../../../lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [sub] = await db.select().from(subscriptions)
    .where(eq(subscriptions.userId, session.user.id));

  // Yoksa free plan döndür
  if (!sub) {
    return NextResponse.json({ plan: "free", status: "active" });
  }

  return NextResponse.json(sub);
}