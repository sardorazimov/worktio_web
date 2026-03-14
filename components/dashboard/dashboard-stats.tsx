/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { Workflow, Zap, Bot, CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { PLANS } from "@/lib/plans";

type Stats = {
  flows: number;
  agents: number;
  executions: number;
  successRate: number;
  recentExecutions: any[];
  weeklyChart: { day: string; count: number }[];
};

type Sub = { plan: string };

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [sub, setSub] = useState<Sub | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats").then(r => r.json()).then(setStats);
    fetch("/api/subscription").then(r => r.json()).then(setSub);
  }, []);

  const plan = (sub?.plan ?? "free") as keyof typeof PLANS;
  const limits = PLANS[plan].limits;
  const maxChart = stats ? Math.max(...stats.weeklyChart.map(d => d.count), 1) : 1;

  return (
    <div className="space-y-6">
      {/* Stat kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Toplam Flow", value: stats?.flows ?? 0, icon: <Workflow size={18} />, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Toplam Execution", value: stats?.executions ?? 0, icon: <Zap size={18} />, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Aktif Agent", value: stats?.agents ?? 0, icon: <Bot size={18} />, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Başarı Oranı", value: `${stats?.successRate ?? 100}%`, icon: <TrendingUp size={18} />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ].map(card => (
          <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-zinc-500 font-medium">{card.label}</span>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
                {card.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-white">
              {stats ? card.value : <div className="h-7 w-12 bg-zinc-800 rounded animate-pulse" />}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Haftalık grafik */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 mb-6">Haftalık Execution</h2>
          {stats ? (
            <div className="flex items-end gap-2 h-32">
              {stats.weeklyChart.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center" style={{ height: "96px" }}>
                    <div
                      className="w-full bg-purple-500/30 hover:bg-purple-500/50 rounded-t-lg transition-all"
                      style={{ height: `${Math.max((d.count / maxChart) * 96, d.count > 0 ? 8 : 2)}px` }}
                      title={`${d.count} execution`}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-600">{d.day}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-32 bg-zinc-800 rounded-xl animate-pulse" />
          )}
        </div>

        {/* Plan kullanımı */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-zinc-300">Plan Kullanımı</h2>
            <span className="text-xs px-2 py-1 rounded-full bg-purple-500/20 text-purple-400 font-medium capitalize">
              {PLANS[plan].name}
            </span>
          </div>
          <div className="space-y-4">
            {[
              {
                label: "Execution",
                used: stats?.executions ?? 0,
                limit: limits.executions,
              },
              {
                label: "Flow",
                used: stats?.flows ?? 0,
                limit: limits.flows,
              },
            ].map(item => {
              const pct = item.limit === -1 ? 5 : Math.min((item.used / item.limit) * 100, 100);
              const danger = pct > 80;
              return (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-zinc-400">{item.label}</span>
                    <span className="text-xs text-zinc-500">
                      {item.used} / {item.limit === -1 ? "∞" : item.limit.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${danger ? "bg-red-500" : "bg-purple-500"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          
            <a href="/dashboard/billing"
            className="mt-4 block w-full py-2 rounded-xl border border-zinc-700 hover:border-purple-500/50 text-center text-xs text-zinc-400 hover:text-purple-400 transition-colors"
          >
            Planı Yükselt →
          </a>
        </div>
      </div>

      {/* Son executionlar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-zinc-300 mb-4">Son Çalıştırmalar</h2>
        {stats?.recentExecutions.length === 0 ? (
          <div className="text-center py-8 text-zinc-600 text-sm">
            Henüz execution yok — bir flow çalıştır!
          </div>
        ) : (
          <div className="space-y-2">
            {stats?.recentExecutions.map(ex => (
              <div key={ex.id} className="flex items-center justify-between p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  {ex.status === "success"
                    ? <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                    : <AlertCircle size={14} className="text-red-400 shrink-0" />
                  }
                  <span className="text-sm text-zinc-300 font-mono truncate max-w-[200px]">
                    {ex.flowId}
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-zinc-500">{ex.duration}ms</span>
                  <div className="flex items-center gap-1 text-xs text-zinc-600">
                    <Clock size={10} />
                    {new Date(ex.createdAt).toLocaleString("tr-TR")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}