/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Workflow, Trash2, Loader2, Clock, Zap, Play, Copy } from "lucide-react";

type Flow = { id: string; name: string; updatedAt: string; nodes: any[]; edges: any[] };

const TEMPLATES = [
  { name: "Gmail Otomasyonu", description: "Mailleri AI ile kategorize et", icon: "📧", nodes: 3 },
  { name: "AI İçerik Üretici", description: "Gemini ile içerik oluştur", icon: "✨", nodes: 2 },
  { name: "HTTP → AI → Mail", description: "API çek, işle, gönder", icon: "🔄", nodes: 3 },
  { name: "Webhook Tetikleyici", description: "Dış servisten flow başlat", icon: "🪝", nodes: 2 },
];

export default function FlowListPage() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/flows").then(r => r.json())
      .then(data => { setFlows(Array.isArray(data) ? data : []); setLoading(false); });
  }, []);

  const createFlow = async (name = "Yeni Flow") => {
    setCreating(true);
    const res = await fetch("/api/flows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, nodes: [], edges: [] }),
    });
    const data = await res.json();
    router.push(`/dashboard/flow/${data.id}`);
  };

  const deleteFlow = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/flows/${id}`, { method: "DELETE" });
    setFlows(f => f.filter(flow => flow.id !== id));
  };

  const duplicateFlow = async (flow: Flow, e: React.MouseEvent) => {
    e.stopPropagation();
    const res = await fetch(`/api/flows/${flow.id}/duplicate`, { method: "POST" });
    const data = await res.json();
    setFlows(f => [...f, data]);
  };

  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Başlık */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Flow Builder</h1>
          <p className="text-zinc-400 text-sm mt-1">Otomasyon akışlarını oluştur ve yönet</p>
        </div>
        <button
          onClick={() => createFlow()}
          disabled={creating}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Yeni Flow
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 size={24} className="animate-spin text-zinc-500" />
        </div>
      ) : (
        <>
          {/* Flow listesi */}
          {flows.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">Flowlarım</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {flows.map(flow => (
                  <div
                    key={flow.id}
                    onClick={() => router.push(`/dashboard/flow/${flow.id}`)}
                    className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-5 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                        <Workflow size={20} className="text-purple-400" />
                      </div>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                        <button
                          onClick={e => duplicateFlow(flow, e)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                          title="Kopyala"
                        >
                          <Copy size={13} />
                        </button>
                        <button
                          onClick={e => deleteFlow(flow.id, e)}
                          className="p-1.5 rounded-lg text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors"
                          title="Sil"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <div className="font-semibold text-zinc-200 mb-1">{flow.name}</div>

                    <div className="flex items-center justify-between">
                      <div className="text-xs text-zinc-500 flex items-center gap-1.5">
                        <Clock size={10} />
                        {new Date(flow.updatedAt).toLocaleDateString("tr-TR")}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-600">{flow.nodes?.length ?? 0} node</span>
                        {flow.nodes?.length > 0 && (
                          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Play size={8} /> Hazır
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Şablonlar */}
          <div>
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">
              {flows.length === 0 ? "Şablonla Başla" : "Şablonlar"}
            </h2>

            {flows.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 mb-8 border border-dashed border-zinc-800 rounded-2xl">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                  <Workflow size={28} className="text-purple-400" />
                </div>
                <p className="text-zinc-400 font-medium mb-1">Henüz flow yok</p>
                <p className="text-zinc-600 text-sm mb-4">Aşağıdan bir şablon seç veya sıfırdan başla</p>
                <button
                  onClick={() => createFlow()}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm transition-colors"
                >
                  <Plus size={14} /> Sıfırdan Başla
                </button>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {TEMPLATES.map(t => (
                <div
                  key={t.name}
                  onClick={() => createFlow(t.name)}
                  className="group bg-zinc-900 border border-zinc-800 hover:border-purple-500/40 rounded-2xl p-5 cursor-pointer transition-all hover:bg-purple-500/5"
                >
                  <div className="text-2xl mb-3">{t.icon}</div>
                  <div className="font-semibold text-zinc-200 text-sm mb-1 group-hover:text-purple-300 transition-colors">
                    {t.name}
                  </div>
                  <div className="text-xs text-zinc-500 mb-3">{t.description}</div>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-600">
                    <Zap size={9} />
                    {t.nodes} node ile başlar
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}