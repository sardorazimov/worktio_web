
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { flows } from "../../../../lib/db/schema";
import { db } from "../../../../lib/db";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [flow] = await db.select().from(flows)
    .where(and(eq(flows.id, params.id), eq(flows.userId, session.user.id)));

  if (!flow) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(flow);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const [updated] = await db.update(flows)
    .set({ ...body, updatedAt: new Date() })
    .where(and(eq(flows.id, params.id), eq(flows.userId, session.user.id)))
    .returning();

  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await db.delete(flows)
    .where(and(eq(flows.id, params.id), eq(flows.userId, session.user.id)));

  return NextResponse.json({ success: true });
}