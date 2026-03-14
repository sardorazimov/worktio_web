"use client";
import { useEffect, useState } from "react";
import { Workflow, Zap, Bot, TrendingUp } from "lucide-react";

type Stats = {
  flows: number;
  agents: number;
  executions: number;
  successRate: number;
};

export default function QuickStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats").then(r => r.json()).then(setStats);
  }, []);

  const cards = [
    { label: "Flow", value: stats?.flows ?? 0, icon: <Workflow size={16} />, color: "text-purple-400", bg: "bg-purple-500/10" },
    { label: "Execution", value: stats?.executions ?? 0, icon: <Zap size={16} />, color: "text-amber-400", bg: "bg-amber-500/10" },
    { label: "Agent", value: stats?.agents ?? 0, icon: <Bot size={16} />, color: "text-blue-400", bg: "bg-blue-500/10" },
    { label: "Başarı", value: stats ? `${stats.successRate}%` : "—", icon: <TrendingUp size={16} />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {cards.map(card => (
        <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${card.bg} ${card.color}`}>
            {card.icon}
          </div>
          <div>
            <div className="text-xs text-zinc-500 mb-0.5">{card.label}</div>
            <div className="text-xl font-bold text-white">
              {stats ? card.value : <div className="h-5 w-8 bg-zinc-800 rounded animate-pulse" />}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}