
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../auth";
import { db } from "../../../lib/db";
import { flows } from "../../../lib/db/schema";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userFlows = await db.select().from(flows).where(eq(flows.userId, session.user.id));
  return NextResponse.json(userFlows);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const [flow] = await db.insert(flows).values({
    userId: session.user.id,
    name: body.name ?? "İsimsiz Flow",
    nodes: body.nodes ?? [],
    edges: body.edges ?? [],
  }).returning();

  return NextResponse.json(flow);
}