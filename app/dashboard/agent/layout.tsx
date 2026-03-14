import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import Link from "next/link";
import { Bot } from "lucide-react";
import CreateAgentButton from "@/components/dashboard/create-agent-button";

export default async function AgentLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const userAgents = await db.query.agents.findMany({
    where: eq(agents.userId, session.user.id),
    orderBy: [desc(agents.createdAt)],
  });

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden">
      <aside className="w-60 shrink-0 border-r border-zinc-800 bg-[#0d0d0d] flex flex-col">
        <div className="h-14 shrink-0 px-4 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Ajanlar</span>
            <span className="text-[10px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-full">{userAgents.length}</span>
          </div>
          <CreateAgentButton />
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {userAgents.map(agent => (
            <Link key={agent.id} href={`/dashboard/agent/${agent.id}`}>
              <div className="flex items-center gap-3 p-3 rounded-xl border border-transparent hover:border-zinc-800 hover:bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 group transition-all">
                <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 group-hover:bg-purple-500/10 transition-colors">
                  <Bot size={14} className="text-zinc-500 group-hover:text-purple-400" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium truncate">{agent.name}</span>
                  <span className="text-[10px] text-zinc-600 font-mono">{agent.model}</span>
                </div>
              </div>
            </Link>
          ))}
          {userAgents.length === 0 && (
            <div className="text-center py-8 text-zinc-600 text-xs">Agent yok, + ile ekle</div>
          )}
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-hidden">
        {children}
      </main>
    </div>
  );
}