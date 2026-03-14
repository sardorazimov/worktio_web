import { db } from "@/lib/db";
import { variables } from "@/lib/db/schema";
import { auth } from "@/auth";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await db.delete(variables).where(and(eq(variables.id, id), eq(variables.userId, session.user.id)));
  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const [updated] = await db.update(variables).set(body)
    .where(and(eq(variables.id, id), eq(variables.userId, session.user.id)))
    .returning();
  return NextResponse.json(updated);
}