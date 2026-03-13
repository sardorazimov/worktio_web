/* eslint-disable @typescript-eslint/no-explicit-any */

import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { flows } from "../../../../../lib/db/schema";
import { db } from "../../../../../lib/db";

type NodeData = Record<string, string>;

async function executeNode(type: string, data: NodeData, input: unknown): Promise<unknown> {
  switch (type) {
    case "trigger":
      return { triggered: true, timestamp: new Date().toISOString() };

    case "ai": {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${data.prompt}\n\nInput: ${JSON.stringify(input)}` }] }],
          }),
        }
      );
      const json = await res.json();
      return { output: json.candidates?.[0]?.content?.parts?.[0]?.text ?? "" };
    }

    case "http": {
      const res = await fetch(data.url, {
        method: data.method ?? "GET",
        headers: data.headers ? JSON.parse(data.headers) : {},
        ...(data.method !== "GET" && { body: JSON.stringify(input) }),
      });
      return res.json();
    }

    case "condition": {
      const str = JSON.stringify(input);
      return { passed: str.includes(data.contains ?? ""), input };
    }

    case "code": {
      try {
        const fn = new Function("input", data.code ?? "return input;");
        return fn(input);
      } catch (e) {
        return { error: String(e) };
      }
    }

    case "gmail":
      // Gmail OAuth entegrasyonu ayrıca eklenecek
      return { sent: false, note: "Gmail OAuth henüz bağlanmadı" };

    default:
      return input;
  }
}

// Topological sort — graph traversal
function topoSort(nodes: any[], edges: any[]): any[] {
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};

  nodes.forEach(n => { inDegree[n.id] = 0; adj[n.id] = []; });
  edges.forEach((e: any) => {
    adj[e.source]?.push(e.target);
    inDegree[e.target] = (inDegree[e.target] ?? 0) + 1;
  });

  const queue = nodes.filter(n => inDegree[n.id] === 0);
  const result: any[] = [];

  while (queue.length > 0) {
    const node = queue.shift()!;
    result.push(node);
    adj[node.id]?.forEach(targetId => {
      inDegree[targetId]--;
      if (inDegree[targetId] === 0) {
        const target = nodes.find(n => n.id === targetId);
        if (target) queue.push(target);
      }
    });
  }

  return result;
}

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [flow] = await db.select().from(flows)
    .where(and(eq(flows.id, params.id), eq(flows.userId, session.user.id)));

  if (!flow) return NextResponse.json({ error: "Flow not found" }, { status: 404 });

  const nodes = flow.nodes as any[];
  const edges = flow.edges as any[];
  const ordered = topoSort(nodes, edges);

  const results: Record<string, unknown> = {};
  const outputs: Record<string, unknown> = {};

  for (const node of ordered) {
    // Bu node'a gelen edge'lerin output'larını input olarak ver
    const incomingEdges = edges.filter((e: any) => e.target === node.id);
    const input = incomingEdges.length > 0
      ? outputs[incomingEdges[0].source]
      : {};

    const output = await executeNode(node.type, node.data ?? {}, input);
    outputs[node.id] = output;
    results[node.id] = { type: node.type, label: node.data?.label, output };
  }

  return NextResponse.json({ success: true, results });
}