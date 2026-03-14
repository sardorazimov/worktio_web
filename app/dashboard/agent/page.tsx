import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { agents } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { Bot } from "lucide-react";
import Link from "next/link";

export default async function AgentPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/");

  const userAgents = await db.query.agents.findMany({
    where: eq(agents.userId, session.user.id),
    orderBy: [desc(agents.createdAt)],
  });

  if (userAgents.length > 0) {
    redirect(`/dashboard/agent/${userAgents[0].id}`);
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8">
      <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
        <Bot size={28} className="text-purple-400" />
      </div>
      <p className="text-zinc-300 font-semibold mb-1">Henüz agent yok</p>
      <p className="text-zinc-600 text-sm">Sol taraftan + butonuna tıkla</p>
    </div>
  );
}