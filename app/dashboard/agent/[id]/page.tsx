/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState, useRef, use } from "react";
import { Send, Loader2, Bot, Settings, Globe, Code2, Mail, Zap, Globe2 } from "lucide-react";
import AgentSettings from "@/components/dashboard/agent-setting";
import { useParams } from "next/navigation";

const MODELS = [
  { value: "gpt-4o", label: "GPT-4o" },
  { value: "gpt-4o-mini", label: "GPT-4o Mini" },
];

const TOOLS = [
  { id: "web_search", label: "Web Arama", icon: <Globe size={12} />, color: "text-blue-400" },
  { id: "code", label: "Kod Çalıştır", icon: <Code2 size={12} />, color: "text-rose-400" },
  { id: "gmail", label: "Gmail", icon: <Mail size={12} />, color: "text-red-400" },
  { id: "flow", label: "Flow Tetikle", icon: <Zap size={12} />, color: "text-amber-400" },
  { id: "http", label: "HTTP İstek", icon: <Globe2 size={12} />, color: "text-emerald-400" },
];

export default function AgentChatPage() {
  const { id: agentId } = useParams<{ id: string }>();
  const [agent, setAgent] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [editAgent, setEditAgent] = useState<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`/api/agents/${agentId}`).then(r => r.json()).then(data => { setAgent(data); setEditAgent(data); });
    fetch(`/api/agents/${agentId}/chat`).then(r => r.json()).then(data => setMessages(Array.isArray(data) ? data : []));
  }, [agentId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    const userMsg = { id: Date.now().toString(), role: "user", content: input };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setSending(true);
    const res = await fetch(`/api/agents/${agentId}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input }),
    });
    const data = await res.json();
    if (data.message) setMessages(m => [...m, data.message]);
    setSending(false);
  };

  const saveSettings = async () => {
    if (!editAgent) return;
    const { updatedAt, createdAt, ...safeBody } = editAgent;
    const res = await fetch(`/api/agents/${agentId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(safeBody),
    });
    const updated = await res.json();
    setAgent(updated);
    setShowSettings(false);
  };

  const deleteAgent = async () => {
    await fetch(`/api/agents/${agentId}`, { method: "DELETE" });
    window.location.href = "/dashboard/agent";
  };

  const toggleTool = (toolId: string) => {
    if (!editAgent) return;
    const tools = editAgent.tools.includes(toolId)
      ? editAgent.tools.filter((t: string) => t !== toolId)
      : [...editAgent.tools, toolId];
    setEditAgent({ ...editAgent, tools });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  if (!agent) return (
    <div className="h-full flex items-center justify-center">
      <Loader2 size={24} className="animate-spin text-purple-500" />
    </div>
  );

  return (
    <div className="h-full flex overflow-hidden">
      {/* Sohbet */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Header - SABIT */}
        <div className="h-14 shrink-0 border-b border-zinc-800 px-6 flex items-center justify-between bg-[#09090b]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Bot size={16} className="text-purple-400" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">{agent.name}</div>
              <div className="text-xs text-zinc-500">{MODELS.find(m => m.value === agent.model)?.label}</div>
            </div>
          </div>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-lg transition-all ${showSettings ? "bg-zinc-800 text-white" : "text-zinc-500 hover:bg-zinc-800"}`}
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Mesajlar - SCROLL */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Bot size={28} className="text-purple-400" />
              </div>
              <p className="text-zinc-400 font-medium">{agent.name} hazır</p>
              <p className="text-zinc-600 text-sm mt-1">Bir mesaj yaz ve sohbeti başlat</p>
            </div>
          )}

          {messages.filter(m => m?.role).map(msg => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs ${
                msg.role === "user" ? "bg-zinc-700 text-zinc-300" : "bg-purple-500/20"
              }`}>
                {msg.role === "user" ? "S" : <Bot size={13} className="text-purple-400" />}
              </div>
              <div className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                msg.role === "user"
                  ? "bg-purple-600 text-white rounded-tr-sm"
                  : "bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-sm"
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {sending && (
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Bot size={13} className="text-purple-400" />
              </div>
              <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-zinc-900 border border-zinc-800 flex items-center gap-1.5">
                {[0,1,2].map(i => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-zinc-500 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Input - SABIT */}
        <div className="shrink-0 p-4 border-t border-zinc-800 bg-[#09090b]">
          <div className="flex items-end gap-2 bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-colors">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`${agent.name}'e mesaj yaz...`}
              rows={1}
              className="flex-1 bg-transparent text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none resize-none max-h-32"
              onInput={e => {
                const t = e.target as HTMLTextAreaElement;
                t.style.height = "auto";
                t.style.height = Math.min(t.scrollHeight, 128) + "px";
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || sending}
              className="w-8 h-8 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-zinc-700 flex items-center justify-center shrink-0 transition-colors"
            >
              {sending ? <Loader2 size={13} className="animate-spin text-white" /> : <Send size={13} className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Ayarlar paneli - SAĞ */}
      <div className={`shrink-0 border-l border-zinc-800 bg-[#0a0a0a] transition-all duration-300 overflow-hidden ${
        showSettings ? "w-80" : "w-0 border-l-0"
      }`}>
        <div className="w-80 h-full">
          <AgentSettings
            editAgent={editAgent}
            setEditAgent={setEditAgent}
            MODELS={MODELS}
            TOOLS={TOOLS}
            setShowSettings={setShowSettings}
            saveSettings={saveSettings}
            deleteAgent={deleteAgent}
            toggleTool={toggleTool}
          />
        </div>
      </div>
    </div>
  );
}