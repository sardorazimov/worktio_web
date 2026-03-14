import { eq, and, asc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { agents, messages } from "../../../../lib/db/schema";
import { db } from "../../../../lib/db";

type Params = Promise<{ id: string }>;

export async function GET(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [agent] = await db
    .select()
    .from(agents)
    .where(and(eq(agents.id, id), eq(agents.userId, session.user.id)));
  if (!agent) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(agent);
}

export async function PATCH(req: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  // updatedAt'i body'den çıkar, Drizzle kendi halletsin
  const { updatedAt, createdAt, ...safeBody } = body;

  const [updated] = await db
    .update(agents)
    .set(safeBody)
    .where(and(eq(agents.id, id), eq(agents.userId, session.user.id)))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: Params }) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await db
    .delete(agents)
    .where(and(eq(agents.id, id), eq(agents.userId, session.user.id)));
  return NextResponse.json({ success: true });
}
