"use client";
import { X } from "lucide-react";
import { type Node } from "@xyflow/react";

type Props = {
  node: Node | null;
  onClose: () => void;
  onUpdate: (id: string, data: Record<string, unknown>) => void;
};

const CONFIGS: Record<string, { label: string; fields: { key: string; label: string; type: string; placeholder?: string }[] }> = {
  trigger: {
    label: "Trigger Ayarları",
    fields: [
      { key: "label", label: "İsim", type: "text", placeholder: "Başlangıç" },
      { key: "triggerType", label: "Tetikleyici Tipi", type: "select" },
      { key: "cronExpression", label: "Cron (zamanlayıcı)", type: "text", placeholder: "0 9 * * *" },
    ],
  },
  ai: {
    label: "AI / Gemini Ayarları",
    fields: [
      { key: "label", label: "İsim", type: "text", placeholder: "AI Adımı" },
      { key: "prompt", label: "Prompt", type: "textarea", placeholder: "Şunu yap..." },
      { key: "model", label: "Model", type: "text", placeholder: "gemini-pro" },
    ],
  },
  http: {
    label: "HTTP İstek Ayarları",
    fields: [
      { key: "label", label: "İsim", type: "text", placeholder: "API Çağrısı" },
      { key: "url", label: "URL", type: "text", placeholder: "https://api.example.com" },
      { key: "method", label: "Method", type: "text", placeholder: "GET" },
      { key: "headers", label: "Headers (JSON)", type: "textarea", placeholder: '{"Authorization": "Bearer ..."}' },
    ],
  },
  condition: {
    label: "Koşul Ayarları",
    fields: [
      { key: "label", label: "İsim", type: "text", placeholder: "Koşul Kontrolü" },
      { key: "contains", label: "İçeriyorsa", type: "text", placeholder: "success" },
    ],
  },
  code: {
    label: "Kod Ayarları",
    fields: [
      { key: "label", label: "İsim", type: "text", placeholder: "Kod Çalıştır" },
      { key: "code", label: "JavaScript Kodu", type: "textarea", placeholder: "return input;" },
    ],
  },
  gmail: {
    label: "Gmail Ayarları",
    fields: [
      { key: "label", label: "İsim", type: "text", placeholder: "Mail Gönder" },
      { key: "to", label: "Alıcı", type: "text", placeholder: "ornek@gmail.com" },
      { key: "subject", label: "Konu", type: "text", placeholder: "Otomatik Mail" },
      { key: "body", label: "İçerik", type: "textarea", placeholder: "Merhaba..." },
    ],
  },
};

export default function NodeConfigPanel({ node, onClose, onUpdate }: Props) {
  if (!node) return null;

  const config = CONFIGS[node.type as string];
  if (!config) return null;

  const data = (node.data ?? {}) as Record<string, string>;

  const handleChange = (key: string, value: string) => {
    onUpdate(node.id, { ...data, [key]: value });
  };

  return (
    <div className="w-80 border-l border-zinc-800 bg-[#0d0d0d] flex flex-col shrink-0 h-full overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-sm font-semibold text-zinc-200">{config.label}</span>
        <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {config.fields.map(field => (
          <div key={field.key} className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-zinc-400">{field.label}</label>
            {field.type === "textarea" ? (
              <textarea
                value={data[field.key] ?? ""}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                rows={4}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 resize-none transition-colors font-mono"
              />
            ) : field.type === "select" && field.key === "triggerType" ? (
              <select
                value={data[field.key] ?? "manual"}
                onChange={e => handleChange(field.key, e.target.value)}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="manual">Manuel</option>
                <option value="webhook">Webhook</option>
                <option value="cron">Zamanlayıcı</option>
              </select>
            ) : (
              <input
                type="text"
                value={data[field.key] ?? ""}
                onChange={e => handleChange(field.key, e.target.value)}
                placeholder={field.placeholder}
                className="bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-auto p-4 border-t border-zinc-800">
        <p className="text-xs text-zinc-600">Node ID: {node.id}</p>
      </div>
    </div>
  );
}