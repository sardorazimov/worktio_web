import { db } from "@/lib/db";
import { credentials } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await db.delete(credentials).where(and(eq(credentials.id, id), eq(credentials.userId, session.user.id)));
  return NextResponse.json({ success: true });
}