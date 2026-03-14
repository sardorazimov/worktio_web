"use client";
import { motion } from "framer-motion";
import { Workflow, Brain, Zap, Globe, Code2, Mail } from "lucide-react";

const FEATURES = [
  { icon: Workflow, title: "Flow Builder", desc: "n8n'den güçlü görsel otomasyon. Sürükle, bırak, çalıştır.", color: "#7c3aed", glow: "rgba(124,58,237,0.3)" },
  { icon: Brain, title: "AI Agent", desc: "GPT-4o destekli ajanlar. Web arama, kod çalıştırma, mail.", color: "#3b82f6", glow: "rgba(59,130,246,0.3)" },
  { icon: Zap, title: "Anında Execution", desc: "Flowlarını tek tıkla çalıştır. Gerçek zamanlı sonuçlar.", color: "#f59e0b", glow: "rgba(245,158,11,0.3)" },
  { icon: Globe, title: "Webhook Trigger", desc: "Dış servislerden flow tetikle. Sınırsız entegrasyon.", color: "#10b981", glow: "rgba(16,185,129,0.3)" },
  { icon: Code2, title: "Kod Çalıştır", desc: "Flow içinde JavaScript çalıştır. Tam esneklik.", color: "#f43f5e", glow: "rgba(244,63,94,0.3)" },
  { icon: Mail, title: "Gmail", desc: "Mail oku, gönder, kategorize et. Otomatik.", color: "#ef4444", glow: "rgba(239,68,68,0.3)" },
];

export default function Features() {
  return (
    <section id="features" className="py-32 px-6 bg-[#030303]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Her şey{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              dahili
            </span>
          </h2>
          <p className="text-zinc-500 text-lg">Dışarıdan eklenti almanıza gerek yok.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-white/10 transition-all overflow-hidden"
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl"
                style={{ background: `radial-gradient(circle at 50% 0%, ${f.glow} 0%, transparent 60%)` }}
              />

              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.color + "20", boxShadow: `0 0 20px ${f.glow}` }}
              >
                <f.icon size={22} style={{ color: f.color }} />
              </div>
              <h3 className="font-bold text-white text-lg mb-2">{f.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}