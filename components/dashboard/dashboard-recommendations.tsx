"use client";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, Zap, Bot, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

type Recommendation = {
  title: string;
  description: string;
  category: "flow" | "agent";
  icon: string;
  why: string;
};

const STATIC_TEMPLATES = [
  {
    title: "Gmail → AI Kategorizasyon",
    description: "Gelen mailleri otomatik kategorize et",
    category: "flow" as const,
    icon: "📧",
    why: "En popüler otomasyon",
  },
  {
    title: "Haftalık Rapor Ajansı",
    description: "Her Pazartesi otomatik rapor oluştur",
    category: "flow" as const,
    icon: "📊",
    why: "Zaman kazandırır",
  },
  {
    title: "Müşteri Destek Botu",
    description: "Gelen soruları AI ile yanıtla",
    category: "agent" as const,
    icon: "🤖",
    why: "7/24 destek",
  },
];

export default function DashboardRecommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiGenerated, setAiGenerated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/dashboard/recommendations")
      .then(r => r.json())
      .then(data => {
        setRecommendations(
          data.recommendations?.length > 0 ? data.recommendations : STATIC_TEMPLATES
        );
        setAiGenerated(data.aiGenerated);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (rec: Recommendation) => {
    if (rec.category === "flow") {
      const res = await fetch("/api/flows", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: rec.title, nodes: [], edges: [] }),
      });
      const data = await res.json();
      router.push(`/dashboard/flow/${data.id}`);
    } else {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: rec.title,
          systemPrompt: `Sen ${rec.title} için özelleştirilmiş bir asistansın. ${rec.description}`,
          model: "gpt-4o",
          tools: [],
        }),
      });
      const data = await res.json();
      router.push(`/dashboard/agent/${data.id}`);
    }
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles size={16} className="text-purple-400" />
        <h2 className="text-sm font-semibold text-zinc-300">
          {aiGenerated ? "AI Önerileri" : "Önerilen Şablonlar"}
        </h2>
        {loading && <Loader2 size={12} className="animate-spin text-zinc-500" />}
        {aiGenerated && (
          <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full">
            GPT-4o
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-28 bg-zinc-900 border border-zinc-800 rounded-2xl animate-pulse" />
          ))
        ) : (
          recommendations.map((rec, i) => (
            <div
              key={i}
              onClick={() => handleCreate(rec)}
              className="group bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-5 cursor-pointer transition-all hover:bg-purple-500/5"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{rec.icon}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                    rec.category === "flow"
                      ? "bg-purple-500/20 text-purple-400"
                      : "bg-blue-500/20 text-blue-400"
                  }`}>
                    {rec.category === "flow" ? <Zap size={10} className="inline mr-1" /> : <Bot size={10} className="inline mr-1" />}
                    {rec.category === "flow" ? "Flow" : "Agent"}
                  </span>
                </div>
                <ArrowRight size={14} className="text-zinc-600 group-hover:text-purple-400 transition-colors" />
              </div>
              <div className="font-semibold text-zinc-200 text-sm mb-1">{rec.title}</div>
              <div className="text-xs text-zinc-500">{rec.description}</div>
              {rec.why && (
                <div className="text-[10px] text-zinc-600 mt-2 italic">{rec.why}</div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}