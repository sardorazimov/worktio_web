"use client";
import { Workflow, Brain, Zap } from "lucide-react";
import FeatureCard from "./feature-card";
import GradualBlur from './GradualBlur';
import ScrollStack from "./ScrollStack";

const CARDS = [
  {
    tag: "Flow Builder",
    tagColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    title: "Kod gerekince yaz, UI yetince kullan",
    desc: "Diğer araçlar seni görsel builder veya kod arasında sıkıştırır. Worktio ile ikisini de kullanırsın.",
    bullets: [
      "<strong>Sürükle bırak</strong> ile otomasyon akışları oluştur",
      "<strong>JavaScript kodu</strong> flow içinde çalıştır",
      "<strong>50+ node tipi</strong> ile her süreci otomatize et",
    ],
    ctaLabel: "Flow Builder'ı keşfet",
    ctaHref: "/dashboard/flow",
    gradient: "linear-gradient(135deg, #1a0533 0%, #0d0d1a 50%, #030303 100%)",
    reverse: false,
    visual: (
      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
          <div className="w-2 h-2 rounded-full bg-red-500/60" />
          <div className="w-2 h-2 rounded-full bg-amber-500/60" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/60" />
          <span className="text-xs text-zinc-600 ml-2">Flow Builder</span>
        </div>
        <div className="flex items-center gap-3">
          {[
            { icon: <Workflow size={16} />, label: "Trigger", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
            { icon: <Brain size={16} />, label: "AI Node", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/20" },
            { icon: <Zap size={16} />, label: "Output", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          ].map((node, i) => (
            <div key={i} className="flex-1">
              <div className={`border rounded-xl p-3 flex flex-col items-center gap-2 ${node.bg}`}>
                <div className={node.color}>{node.icon}</div>
                <span className="text-xs text-zinc-400">{node.label}</span>
              </div>
              {i < 2 && (
                <div className="flex items-center justify-end mt-2">
                  <div className="h-px flex-1 bg-purple-500/30" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 bg-zinc-900/50 rounded-xl p-3 border border-white/5">
          <div className="text-xs text-zinc-600 mb-1">Son execution</div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400">Başarılı · 234ms</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "AI Agent",
    tagColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    title: "Hızlı hareket et. Hiçbir şeyi bozma.",
    desc: "Kısa geri bildirim döngüleri ile geliştir. Her adımı test et, her şeyi izle.",
    bullets: [
      "<strong>GPT-4o</strong> ile akıllı kararlar al",
      "<strong>Web arama</strong> ve kod çalıştırma desteği",
      "<strong>Gmail, Slack</strong> entegrasyonları ile otomatik aksiyon",
    ],
    ctaLabel: "AI Agent'ı dene",
    ctaHref: "/dashboard/agent",
    gradient: "linear-gradient(135deg, #001533 0%, #0a0d1a 50%, #030303 100%)",
    reverse: true,
    visual: (
      <div className="bg-black/40 border border-white/10 rounded-2xl p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-7 h-7 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Brain size={14} className="text-purple-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-white">AI Agent</div>
            <div className="text-[10px] text-zinc-600">GPT-4o</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-end">
            <div className="bg-purple-600 text-white text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[80%]">
              Gmail&lsquo;imdeki faturaları kategorize et
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
              <Brain size={10} className="text-purple-400" />
            </div>
            <div className="bg-zinc-800 text-zinc-300 text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[80%]">
              Gmail&apos;inize bağlanıyorum...
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-5 h-5 rounded-lg bg-purple-500/20 flex items-center justify-center shrink-0">
              <Brain size={10} className="text-purple-400" />
            </div>
            <div className="bg-zinc-800 text-zinc-300 text-xs px-3 py-2 rounded-2xl rounded-tl-sm">
              ✓ 24 fatura bulundu ve kategorize edildi
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeatureCardsSection() {
  return (
   <>
     <section className="py-24 px-6 bg-[#030303]" >
      <div className="max-full mx-auto space-y-6">
        {CARDS.map((card, i) => (
          <FeatureCard key={i} {...card} />
        ))}
      </div>
    </section>
   </>
  );
}