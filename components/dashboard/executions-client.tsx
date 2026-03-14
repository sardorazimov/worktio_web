/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Clock, Loader2, ChevronDown, ChevronRight, Zap, Search } from "lucide-react";

type Execution = {
  id: string;
  flowId: string;
  status: string;
  duration: number;
  createdAt: string;
  results: any;
};

export default function ExecutionsClient() {
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "success" | "error">("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/executions")
      .then(r => r.json())
      .then(data => { setExecutions(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const filtered = executions.filter(ex => {
    if (filter === "success" && ex.status !== "success") return false;
    if (filter === "error" && ex.status !== "error") return false;
    if (search && !ex.flowId.includes(search)) return false;
    return true;
  });

  const successCount = executions.filter(e => e.status === "success").length;
  const errorCount = executions.filter(e => e.status !== "success").length;

  return (
    <div className="p-8 max-w-[1400px] mx-auto text-zinc-100">
      {/* Başlık */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Executions</h1>
        <p className="text-zinc-400 text-sm mt-1">Tüm flow çalıştırma geçmişi</p>
      </div>

      {/* Özet kartlar */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="text-xs text-zinc-500 mb-2">Toplam</div>
          <div className="text-2xl font-bold text-white flex items-center gap-2">
            <Zap size={18} className="text-purple-400" />
            {executions.length}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="text-xs text-zinc-500 mb-2">Başarılı</div>
          <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <CheckCircle size={18} />
            {successCount}
          </div>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
          <div className="text-xs text-zinc-500 mb-2">Hatalı</div>
          <div className="text-2xl font-bold text-red-400 flex items-center gap-2">
            <AlertCircle size={18} />
            {errorCount}
          </div>
        </div>
      </div>

      {/* Filtreler */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Flow ID ara..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:border-purple-500"
          />
        </div>
        <div className="flex gap-1 bg-zinc-900 border border-zinc-800 rounded-xl p-1">
          {(["all", "success", "error"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize ${
                filter === f ? "bg-zinc-800 text-white" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {f === "all" ? "Tümü" : f === "success" ? "Başarılı" : "Hatalı"}
            </button>
          ))}
        </div>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 size={24} className="animate-spin text-zinc-500" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border border-dashed border-zinc-800 rounded-2xl">
          <Zap size={32} className="text-zinc-700 mb-3" />
          <p className="text-zinc-500">Henüz execution yok</p>
          <p className="text-zinc-600 text-sm mt-1">Bir flow çalıştır!</p>
        </div>
      ) : (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
          {filtered.map((ex, i) => (
            <div key={ex.id}>
              <div
                className={`flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-zinc-800/50 transition-colors ${
                  i !== 0 ? "border-t border-zinc-800" : ""
                }`}
                onClick={() => setExpanded(expanded === ex.id ? null : ex.id)}
              >
                {/* Status */}
                <div className="shrink-0">
                  {ex.status === "success"
                    ? <CheckCircle size={16} className="text-emerald-400" />
                    : <AlertCircle size={16} className="text-red-400" />
                  }
                </div>

                {/* Flow ID */}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono text-zinc-300 truncate">{ex.flowId}</div>
                  <div className={`text-xs mt-0.5 ${ex.status === "success" ? "text-emerald-500" : "text-red-500"}`}>
                    {ex.status === "success" ? "Başarılı" : "Hata"}
                  </div>
                </div>

                {/* Duration */}
                <div className="text-xs text-zinc-500 font-mono shrink-0">{ex.duration}ms</div>

                {/* Time */}
                <div className="flex items-center gap-1 text-xs text-zinc-600 shrink-0">
                  <Clock size={10} />
                  {new Date(ex.createdAt).toLocaleString("tr-TR")}
                </div>

                {/* Expand */}
                <div className="text-zinc-600 shrink-0">
                  {expanded === ex.id ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </div>
              </div>

              {/* Expanded results */}
              {expanded === ex.id && (
                <div className="px-5 pb-4 border-t border-zinc-800/50 bg-zinc-800/20">
                  <div className="pt-3">
                    <div className="text-xs text-zinc-500 mb-2 font-semibold uppercase tracking-wider">Sonuçlar</div>
                    <pre className="text-xs font-mono text-zinc-400 bg-zinc-900 rounded-xl p-4 overflow-auto max-h-48">
                      {JSON.stringify(ex.results, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}