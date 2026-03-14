/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Clock, Zap, TrendingUp, Workflow, Bot, Loader2 } from "lucide-react";

type Stats = {
  flows: number;
  agents: number;
  executions: number;
  successRate: number;
  recentExecutions: any[];
  weeklyChart: { day: string; count: number }[];
};

export default function AnalyticsClient() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/dashboard/stats").then(r => r.json()).then(setStats);
  }, []);

  const maxChart = stats ? Math.max(...stats.weeklyChart.map(d => d.count), 1) : 1;

  return (
    <div className="p-8 max-w-[1400px] mx-auto text-zinc-100">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-zinc-400 text-sm mt-1">Kullanım istatistikleri ve performans</p>
      </div>

      {/* Üst stat kartları */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Toplam Flow", value: stats?.flows ?? 0, icon: <Workflow size={18} />, color: "text-purple-400", bg: "bg-purple-500/10" },
          { label: "Toplam Execution", value: stats?.executions ?? 0, icon: <Zap size={18} />, color: "text-amber-400", bg: "bg-amber-500/10" },
          { label: "Aktif Agent", value: stats?.agents ?? 0, icon: <Bot size={18} />, color: "text-blue-400", bg: "bg-blue-500/10" },
          { label: "Başarı Oranı", value: stats ? `${stats.successRate}%` : "—", icon: <TrendingUp size={18} />, color: "text-emerald-400", bg: "bg-emerald-500/10" },
        ].map(card => (
          <div key={card.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-zinc-500">{card.label}</span>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Haftalık grafik */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 mb-6">Haftalık Execution</h2>
          {stats ? (
            <div className="flex items-end gap-2 h-40">
              {stats.weeklyChart.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center" style={{ height: "120px" }}>
                    <div
                      className="w-full bg-purple-500/30 hover:bg-purple-500/60 rounded-t-lg transition-all cursor-pointer"
                      style={{ height: `${Math.max((d.count / maxChart) * 120, d.count > 0 ? 8 : 2)}px` }}
                      title={`${d.count} execution`}
                    />
                  </div>
                  <span className="text-[10px] text-zinc-600">{d.day}</span>
                  {d.count > 0 && <span className="text-[10px] text-zinc-500">{d.count}</span>}
                </div>
              ))}
            </div>
          ) : (
            <div className="h-40 bg-zinc-800 rounded-xl animate-pulse" />
          )}
        </div>

        {/* Başarı/Hata oranı */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-zinc-300 mb-6">Execution Durumu</h2>
          {stats ? (
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <CheckCircle size={12} className="text-emerald-400" /> Başarılı
                  </span>
                  <span className="text-xs text-zinc-400">{stats.successRate}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats.successRate}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-xs text-zinc-400 flex items-center gap-1.5">
                    <AlertCircle size={12} className="text-red-400" /> Hatalı
                  </span>
                  <span className="text-xs text-zinc-400">{100 - stats.successRate}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${100 - stats.successRate}%` }} />
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-800 grid grid-cols-2 gap-4">
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-emerald-400">
                    {Math.round(stats.executions * stats.successRate / 100)}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Başarılı</div>
                </div>
                <div className="bg-zinc-800/50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {Math.round(stats.executions * (100 - stats.successRate) / 100)}
                  </div>
                  <div className="text-xs text-zinc-500 mt-1">Hatalı</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-40 bg-zinc-800 rounded-xl animate-pulse" />
          )}
        </div>
      </div>

      {/* Son executionlar */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-zinc-300 mb-4">Son Çalıştırmalar</h2>
        {!stats ? (
          <div className="space-y-2">
            {[1,2,3].map(i => <div key={i} className="h-12 bg-zinc-800 rounded-xl animate-pulse" />)}
          </div>
        ) : stats.recentExecutions.length === 0 ? (
          <div className="text-center py-10 text-zinc-600 text-sm">
            Henüz execution yok — bir flow çalıştır!
          </div>
        ) : (
          <div className="space-y-2">
            {stats.recentExecutions.map(ex => (
              <div key={ex.id} className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl border border-zinc-800">
                <div className="flex items-center gap-3">
                  {ex.status === "success"
                    ? <CheckCircle size={16} className="text-emerald-400 shrink-0" />
                    : <AlertCircle size={16} className="text-red-400 shrink-0" />
                  }
                  <div>
                    <div className="text-sm text-zinc-300 font-mono truncate max-w-[300px]">
                      {ex.flowId}
                    </div>
                    <div className={`text-xs mt-0.5 ${ex.status === "success" ? "text-emerald-500" : "text-red-500"}`}>
                      {ex.status === "success" ? "Başarılı" : "Hata"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs text-zinc-500 font-mono">{ex.duration}ms</span>
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