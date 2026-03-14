"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Check, X } from "lucide-react";

const PLANS = [
  {
    name: "Free", price: 0, desc: "Başlamak için",
    features: ["1.000 execution/ay", "5 flow", "AI Agent", "Temel node'lar"],
    missing: ["Webhook trigger", "Öncelikli destek"],
    cta: "Ücretsiz Başla", highlight: false,
  },
  {
    name: "Pro", price: 29, desc: "Profesyoneller için",
    features: ["50.000 execution/ay", "50 flow", "AI Agent", "Webhook trigger", "Tüm node'lar"],
    missing: ["Öncelikli destek"],
    cta: "Pro'ya Geç", highlight: true,
  },
  {
    name: "Enterprise", price: 99, desc: "Büyük ekipler",
    features: ["Sınırsız execution", "Sınırsız flow", "Webhook trigger", "Öncelikli destek", "SLA garantisi"],
    missing: [],
    cta: "Enterprise'a Geç", highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 bg-[#030303]">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-4">
            Basit{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              fiyatlandırma
            </span>
          </h2>
          <p className="text-zinc-500">Sürpriz yok. Gizli ücret yok.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl p-6 ${
                plan.highlight
                  ? "bg-gradient-to-b from-purple-600/20 to-transparent border border-purple-500/30"
                  : "bg-white/[0.03] border border-white/[0.06]"
              }`}
              style={plan.highlight ? { boxShadow: "0 0 60px rgba(124,58,237,0.15)" } : {}}
            >
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popüler
                </div>
              )}
              <div className="mb-6">
                <div className="font-bold text-white text-lg mb-1">{plan.name}</div>
                <div className="text-zinc-500 text-sm">{plan.desc}</div>
              </div>
              <div className="mb-6">
                <span className="text-5xl font-black text-white">${plan.price}</span>
                {plan.price > 0 && <span className="text-zinc-500 text-sm ml-1">/ay</span>}
              </div>
              <div className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={14} className="text-emerald-400 shrink-0" /> {f}
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-700">
                    <X size={14} className="shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/dashboard"
                className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-purple-600 hover:bg-purple-500 text-white"
                    : "bg-white/5 hover:bg-white/10 text-zinc-300 border border-white/10"
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}