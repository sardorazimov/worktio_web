/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { X, Save, Trash2 } from "lucide-react";

export default function AgentSettings({
  editAgent, setEditAgent, setShowSettings,
  MODELS, TOOLS, saveSettings, deleteAgent, toggleTool
}: any) {
  if (!editAgent) return null;

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a]">

      {/* Başlık - SABIT */}
      <div className="h-14 shrink-0 border-b border-zinc-800 px-5 flex items-center justify-between">
        <span className="text-sm font-bold text-white">Agent Ayarları</span>
        <button onClick={() => setShowSettings(false)} className="text-zinc-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      {/* İçerik - SCROLL */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">İsim</label>
          <input
            value={editAgent.name}
            onChange={e => setEditAgent({ ...editAgent, name: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Model</label>
          <select
            value={editAgent.model}
            onChange={e => setEditAgent({ ...editAgent, model: e.target.value })}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
          >
            {MODELS.map((m: any) => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Sistem Prompt</label>
          <textarea
            value={editAgent.systemPrompt}
            onChange={e => setEditAgent({ ...editAgent, systemPrompt: e.target.value })}
            rows={6}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2.5 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors resize-none font-mono"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Yetenekler</label>
          <div className="space-y-2">
            {TOOLS.map((t: any) => (
              <label
                key={t.id}
                className="flex items-center gap-3 p-3 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-600 cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={editAgent.tools?.includes(t.id) ?? false}
                  onChange={() => toggleTool(t.id)}
                  className="accent-purple-500 w-4 h-4"
                />
                <span className={t.color}>{t.icon}</span>
                <span className="text-xs text-zinc-300">{t.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Butonlar - SABIT */}
      <div className="shrink-0 p-5 border-t border-zinc-800 space-y-2">
        <button
          onClick={saveSettings}
          className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl font-semibold text-sm text-white transition-colors flex items-center justify-center gap-2"
        >
          <Save size={14} /> Kaydet
        </button>
        <button
          onClick={deleteAgent}
          className="w-full py-2.5 border border-red-500/20 hover:border-red-500/50 hover:bg-red-500/5 text-red-500 rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 size={14} /> Ajanı Sil
        </button>
      </div>
    </div>
  );
}