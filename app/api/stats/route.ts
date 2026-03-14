
import { auth } from "@/auth";
import { eq, desc, gte, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { agents, executions, flows } from "../../../lib/db/schema";
import { db } from "../../../lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const userId = session.user.id;

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [
    allFlows,
    allAgents,
    allExecutions,
    recentExecutions,
    weeklyExecutions,
  ] = await Promise.all([
    db.select().from(flows).where(eq(flows.userId, userId)),
    db.select().from(agents).where(eq(agents.userId, userId)),
    db.select().from(executions).where(eq(executions.userId, userId)),
    db.select().from(executions)
      .where(eq(executions.userId, userId))
      .orderBy(desc(executions.createdAt))
      .limit(5),
    db.select().from(executions)
      .where(and(eq(executions.userId, userId), gte(executions.createdAt, weekAgo)))
      .orderBy(desc(executions.createdAt)),
  ]);

  // Haftalık grafik — son 7 gün
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split("T")[0];
  });

  const weeklyChart = days.map(day => ({
    day: new Date(day).toLocaleDateString("tr-TR", { weekday: "short" }),
    count: weeklyExecutions.filter(e =>
      e.createdAt && new Date(e.createdAt).toISOString().split("T")[0] === day
    ).length,
  }));

  const successCount = allExecutions.filter(e => e.status === "success").length;

  return NextResponse.json({
    flows: allFlows.length,
    agents: allAgents.length,
    executions: allExecutions.length,
    successRate: allExecutions.length > 0
      ? Math.round((successCount / allExecutions.length) * 100)
      : 100,
    recentExecutions,
    weeklyChart,
  });
}