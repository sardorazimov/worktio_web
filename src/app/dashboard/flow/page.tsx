/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Workflow, Trash2, Loader2, Clock } from "lucide-react";

type Flow = { id: string; name: string; updatedAt: string; nodes: any[] };

export default function FlowListPage() {
  const [flows, setFlows] = useState<Flow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/flows")
      .then(r => r.json())
      .then(data => { setFlows(data); setLoading(false); });
  }, []);

  const createFlow = async () => {
    setCreating(true);
    const res = await fetch("/api/flows", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Yeni Flow", nodes: [], edges: [] }),
    });
    const data = await res.json();
    router.push(`/dashboard/flow/${data.id}`);
  };

  const deleteFlow = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await fetch(`/api/flows/${id}`, { method: "DELETE" });
    setFlows(f => f.filter(flow => flow.id !== id));
  };

  return (
    <div className="p-8 text-zinc-100">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Flow Builder</h1>
          <p className="text-zinc-400 text-sm mt-1">Otomasyon akışlarını oluştur ve yönet</p>
        </div>
        <button
          onClick={createFlow}
          disabled={creating}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
        >
          {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />}
          Yeni Flow
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48">
          <Loader2 size={24} className="animate-spin text-zinc-500" />
        </div>
      ) : flows.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-zinc-700 rounded-2xl">
          <Workflow size={40} className="text-zinc-600 mb-3" />
          <p className="text-zinc-400 font-medium">Henüz flow yok</p>
          <p className="text-zinc-600 text-sm mt-1">Yeni Flow butonuna tıkla</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {flows.map(flow => (
            <div
              key={flow.id}
              onClick={() => router.push(`/dashboard/flow/${flow.id}`)}
              className="group bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl p-5 cursor-pointer transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                  <Workflow size={20} className="text-purple-400" />
                </div>
                <button
                  onClick={e => deleteFlow(flow.id, e)}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all p-1"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="font-semibold text-zinc-200 mb-1">{flow.name}</div>
              <div className="text-xs text-zinc-500 flex items-center gap-1">
                <Clock size={11} />
                {new Date(flow.updatedAt).toLocaleDateString("tr-TR")}
                <span className="ml-2 text-zinc-600">{flow.nodes?.length ?? 0} node</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}