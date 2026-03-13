/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useCallback, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ReactFlow,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Play, Save, Plus, Loader2, ArrowLeft } from "lucide-react";
import { nodeTypes } from "../../../../components/flow/custom-nodes";
import NodeConfigPanel from "../../../../components/flow/node-config-panel";

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

const connectionLineStyle = {
  stroke: "#7c3aed",
  strokeWidth: 2,
};

export default function FlowCanvasPage() {
  const params = useParams();
  const router = useRouter();
  const flowId = params.id as string;

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [flowName, setFlowName] = useState("Yeni Flow");
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);
  const [runResult, setRunResult] = useState<any>(null);

  // Flow'u yükle
  useEffect(() => {
    if (!flowId) return;
    fetch(`/api/flows/${flowId}`)
      .then(r => r.json())
      .then(data => {
        if (data.nodes) setNodes(data.nodes);
        if (data.edges) setEdges(data.edges);
        if (data.name) setFlowName(data.name);
      });
  }, [flowId]);

  const onConnect = useCallback(
    (c: Connection) => setEdges(e => addEdge(c, e)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleNodeUpdate = useCallback((id: string, data: Record<string, unknown>) => {
    setNodes(ns => ns.map(n => n.id === id ? { ...n, data } : n));
    setSelectedNode(prev => prev?.id === id ? { ...prev, data } : prev);
  }, [setNodes]);

  const addNode = (type: string) => {
    const id = `${type}-${Date.now()}`;
    const newNode: Node = {
      id,
      type,
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
    } finally {
      setSaving(false);
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setRunResult(null);
    try {
      const res = await fetch(`/api/flows/${flowId}/run`, { method: "POST" });
      const data = await res.json();
      setRunResult(data);
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ height: "calc(100vh - 64px)", display: "flex", overflow: "hidden" }}>
      {/* Sol panel */}
      <aside className="w-52 border-r border-zinc-800 bg-[#0d0d0d] p-3 flex flex-col gap-2 shrink-0">
        <button
          onClick={() => router.push("/dashboard/flow")}
          className="flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 mb-2 transition-colors"
        >
          <ArrowLeft size={12} /> Flow Listesi
        </button>

        <input
          value={flowName}
          onChange={e => setFlowName(e.target.value)}
          className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 mb-2"
          placeholder="Flow adı..."
        />

        <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider mb-1">Node Ekle</p>
        {NODE_MENU.map(n => (
          <button
            key={n.type}
            onClick={() => addNode(n.type)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-left transition-colors"
          >
            <Plus size={12} className="text-zinc-500" />
            <span className={`text-xs font-medium ${n.color}`}>{n.label}</span>
          </button>
        ))}
      </aside>

      {/* Canvas */}
      <div className="flex-1 relative" style={{ height: "100%" }}>
        {/* Toolbar */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors border border-zinc-700"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Kaydet
          </button>
          <button
            onClick={handleRun}
            disabled={running}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium transition-colors"
          >
            {running ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
            Çalıştır
          </button>
        </div>

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
          connectionLineStyle={connectionLineStyle}
          fitView
          style={{ height: "100%", width: "100%", background: "#09090b" }}
        >
          <Background color="#27272a" gap={24} />
          <Controls />
          <MiniMap nodeColor="#52525b" style={{ background: "#18181b" }} />
        </ReactFlow>

        {/* Run sonucu */}
        {runResult && (
          <div className="absolute bottom-4 left-4 right-80 bg-zinc-900 border border-zinc-700 rounded-xl p-4 text-xs font-mono text-zinc-300 max-h-48 overflow-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-emerald-400 font-semibold">✓ Flow tamamlandı</span>
              <button onClick={() => setRunResult(null)} className="text-zinc-500 hover:text-white">✕</button>
            </div>
            <pre>{JSON.stringify(runResult.results, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* Sağ config paneli */}
      <NodeConfigPanel
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onUpdate={handleNodeUpdate}
      />
    </div>
  );
}