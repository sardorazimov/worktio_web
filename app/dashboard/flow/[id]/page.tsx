/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ReactFlow, addEdge, Background, Controls, MiniMap,
  useNodesState, useEdgesState,
  type Connection, type Node, type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { nodeTypes } from "@/components/flow/custom-nodes";
import NodeConfigPanel from "@/components/flow/node-config-panel";
import { Play, Save, Plus, Loader2, ArrowLeft, Copy, Clock, Search, X, CheckCircle, AlertCircle, Link } from "lucide-react";

const NODE_MENU = [
  { type: "trigger",   label: "Trigger",      color: "text-amber-400" },
  { type: "ai",        label: "AI / Gemini",   color: "text-purple-400" },
  { type: "http",      label: "HTTP İstek",    color: "text-blue-400" },
  { type: "condition", label: "Koşul",         color: "text-emerald-400" },
  { type: "code",      label: "Kod Çalıştır",  color: "text-rose-400" },
  { type: "gmail",     label: "Gmail",         color: "text-red-400" },
];

const defaultEdgeOptions = {
  style: { stroke: "#7c3aed", strokeWidth: 2 },
  animated: true,
};

type Execution = {
  id: string; status: string; duration: number;
  createdAt: string; results: any;
};

export default function FlowCanvasPage() {
  const { id: flowId } = useParams<{ id: string }>();
  const router = useRouter();

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [flowName, setFlowName] = useState("Yeni Flow");
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<any>(null);
  const [sideTab, setSideTab] = useState<"nodes" | "logs">("nodes");
  const [nodeSearch, setNodeSearch] = useState("");
  const [executions, setExecutions] = useState<Execution[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!flowId) return;
    fetch(`/api/flows/${flowId}`).then(r => r.json()).then(data => {
      if (data.nodes) setNodes(data.nodes);
      if (data.edges) setEdges(data.edges);
      if (data.name) setFlowName(data.name);
    });
    setWebhookUrl(`${window.location.origin}/api/webhooks/${flowId}`);
  }, [flowId]);

  const loadLogs = useCallback(() => {
    setLogsLoading(true);
    fetch(`/api/flows/${flowId}/executions`)
      .then(r => r.json())
      .then(data => { setExecutions(Array.isArray(data) ? data : []); setLogsLoading(false); });
  }, [flowId]);

  useEffect(() => {
    if (sideTab === "logs") loadLogs();
  }, [sideTab]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave(); }
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); handleRun(); }
      if (e.key === "Escape") setSelectedNode(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [nodes, edges, flowName]);

  const onConnect = useCallback((c: Connection) => setEdges(e => addEdge(c, e)), [setEdges]);
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => setSelectedNode(node), []);

  const handleNodeUpdate = useCallback((id: string, data: Record<string, unknown>) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data } : n));
    setSelectedNode(prev => prev?.id === id ? { ...prev, data } : prev);
  }, [setNodes]);

  const addNode = (type: string) => {
    const id = `${type}-${Date.now()}`;
    const newNode: Node = {
      id, type,
      position: { x: 200 + Math.random() * 300, y: 100 + Math.random() * 200 },
      data: { label: NODE_MENU.find(m => m.type === type)?.label ?? type },
    };
    setNodes(n => [...n, newNode]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/flows/${flowId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges, name: flowName }),
      });
    } finally { setSaving(false); }
  };

  const handleRun = async () => {
    setRunning(true);
    setRunResult(null);
    try {
      const res = await fetch(`/api/flows/${flowId}/run`, { method: "POST" });
      const data = await res.json();
      setRunResult(data);
      if (sideTab === "logs") loadLogs();
    } finally { setRunning(false); }
  };

  const handleDuplicate = async () => {
    const res = await fetch(`/api/flows/${flowId}/duplicate`, { method: "POST" });
    const data = await res.json();
    router.push(`/dashboard/flow/${data.id}`);
  };

  const copyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredMenu = NODE_MENU.filter(n =>
    n.label.toLowerCase().includes(nodeSearch.toLowerCase())
  );

  return (
    <div className="h-screen flex overflow-hidden bg-[#09090b]">
      {/* Sol panel */}
      <aside className="w-56 border-r border-zinc-800 bg-[#0d0d0d] flex flex-col shrink-0">
        <div className="p-3 border-b border-zinc-800">
          <button
            onClick={() => router.push("/dashboard/flow")}
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 mb-3 transition-colors"
          >
            <ArrowLeft size={12} /> Flow Listesi
          </button>
          <input
            value={flowName}
            onChange={e => setFlowName(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500"
          />
        </div>

        <div className="flex border-b border-zinc-800">
          {(["nodes", "logs"] as const).map(tab => (
            <button key={tab} onClick={() => setSideTab(tab)}
              className={`flex-1 py-2 text-xs font-medium transition-colors ${
                sideTab === tab ? "text-white border-b-2 border-purple-500" : "text-zinc-500 hover:text-zinc-300"
              }`}
            >
              {tab === "nodes" ? "Node'lar" : "Geçmiş"}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          {sideTab === "nodes" ? (
            <div className="flex flex-col gap-2">
              <div className="relative">
                <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input
                  value={nodeSearch}
                  onChange={e => setNodeSearch(e.target.value)}
                  placeholder="Node ara..."
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg pl-7 pr-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-purple-500"
                />
                {nodeSearch && (
                  <button onClick={() => setNodeSearch("")} className="absolute right-2 top-1/2 -translate-y-1/2">
                    <X size={10} className="text-zinc-500" />
                  </button>
                )}
              </div>

              {filteredMenu.map(n => (
                <button key={n.type} onClick={() => addNode(n.type)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors"
                >
                  <Plus size={12} className="text-zinc-500 shrink-0" />
                  <span className={`text-xs font-medium ${n.color}`}>{n.label}</span>
                </button>
              ))}

              <div className="mt-3 pt-3 border-t border-zinc-800">
                <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-2">Webhook</p>
                <div className="flex items-center gap-1">
                  <input readOnly value={webhookUrl}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-2 py-1.5 text-xs text-zinc-400 min-w-0"
                  />
                  <button onClick={copyWebhook}
                    className={`p-1.5 rounded-lg border transition-colors shrink-0 ${
                      copied ? "border-emerald-500 text-emerald-400" : "border-zinc-700 text-zinc-500 hover:text-white"
                    }`}
                  >
                    {copied ? <CheckCircle size={12} /> : <Link size={12} />}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {logsLoading ? (
                <div className="flex justify-center py-8"><Loader2 size={16} className="animate-spin text-zinc-500" /></div>
              ) : executions.length === 0 ? (
                <div className="text-center py-8 text-zinc-600 text-xs">Henüz çalıştırma yok</div>
              ) : (
                executions.map(ex => (
                  <div key={ex.id} className="bg-zinc-900 border border-zinc-800 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      {ex.status === "success"
                        ? <CheckCircle size={12} className="text-emerald-400" />
                        : <AlertCircle size={12} className="text-red-400" />
                      }
                      <span className="text-xs text-zinc-500">{ex.duration}ms</span>
                    </div>
                    <div className="text-xs text-zinc-400 flex items-center gap-1">
                      <Clock size={10} />
                      {new Date(ex.createdAt).toLocaleString("tr-TR")}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Canvas */}
      <div className="flex-1 relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button onClick={handleDuplicate}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 text-sm transition-colors border border-zinc-700"
          >
            <Copy size={14} />
          </button>
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors border border-zinc-700"
            title="Ctrl+S"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Kaydet
          </button>
          <button onClick={handleRun} disabled={running}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
            title="Ctrl+Enter"
          >
            {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Çalıştır
          </button>
        </div>

        <div className="absolute bottom-4 left-4 z-10 flex gap-3 text-xs text-zinc-600">
          <span>Ctrl+S kaydet</span>
          <span>Ctrl+Enter çalıştır</span>
          <span>Esc kapat</span>
        </div>

        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          onConnect={onConnect} onNodeClick={onNodeClick}
          onPaneClick={() => setSelectedNode(null)}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={{ stroke: "#7c3aed", strokeWidth: 2 }}
          fitView
          style={{ height: "100%", width: "100%", background: "#09090b" }}
        >
          <Background color="#27272a" gap={24} />
          <Controls />
          <MiniMap nodeColor="#52525b" style={{ background: "#18181b" }} />
        </ReactFlow>

        {runResult && (
          <div className="absolute bottom-10 left-4 right-4 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-xs font-mono text-zinc-300 max-h-48 overflow-auto z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {runResult.success
                  ? <CheckCircle size={14} className="text-emerald-400" />
                  : <AlertCircle size={14} className="text-red-400" />
                }
                <span className={runResult.success ? "text-emerald-400 font-semibold" : "text-red-400 font-semibold"}>
                  {runResult.success ? "Flow tamamlandı" : "Hata oluştu"}
                </span>
                <span className="text-zinc-600">{runResult.duration}ms</span>
              </div>
              <button onClick={() => setRunResult(null)} className="text-zinc-500 hover:text-white">
                <X size={14} />
              </button>
            </div>
            <pre>{JSON.stringify(runResult.results, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Config paneli */}
      <NodeConfigPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={handleNodeUpdate}
      />
    </div>
  );
}