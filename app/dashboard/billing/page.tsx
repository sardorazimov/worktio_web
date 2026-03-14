"use client";
import { useEffect, useState } from "react";
import { Check, X, Zap, Crown, Building2, Loader2 } from "lucide-react";
import { PLANS, type PlanKey } from "@/lib/plans";
import { initializePaddle, type Paddle } from "@paddle/paddle-js";

type Sub = { plan: PlanKey; status: string; currentPeriodEnd?: string };

const ICONS = {
  free: <Zap size={20} className="text-zinc-400" />,
  pro: <Crown size={20} className="text-purple-400" />,
  enterprise: <Building2 size={20} className="text-amber-400" />,
};

export default function BillingPage() {
  const [sub, setSub] = useState<Sub | null>(null);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/subscription").then(r => r.json()).then(setSub);

    initializePaddle({
      environment: process.env.NODE_ENV === "production" ? "production" : "sandbox",
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    }).then(p => p && setPaddle(p));
  }, []);

  const handleUpgrade = async (planKey: PlanKey) => {
    if (!paddle || planKey === "free") return;
    const plan = PLANS[planKey];
    if (!("paddlePriceId" in plan)) return;

    setLoading(planKey);
    try {
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      paddle.Checkout.open({
        items: [{ priceId: plan.paddlePriceId as string, quantity: 1 }],
        customData: { userId: session.user?.id },
        settings: { theme: "dark" },
      });
    } finally {
      setLoading(null);
    }
  };

  const currentPlan = sub?.plan ?? "free";

  return (
    <div className="p-8 max-w-5xl mx-auto text-zinc-100">
      {/* Başlık */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-white mb-2">Plan & Faturalama</h1>
        <p className="text-zinc-400">Planını yönet ve yükselt</p>
      </div>

      {/* Mevcut plan */}
      {sub && (
        <div className="mb-8 p-5 bg-zinc-900 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${PLANS[currentPlan].badge}`}>
              {ICONS[currentPlan]}
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-200">
                Mevcut Plan: <span className={PLANS[currentPlan].color}>{PLANS[currentPlan].name}</span>
              </div>
              <div className="text-xs text-zinc-500 mt-0.5">
                {sub.status === "active" ? "Aktif" : "İptal edildi"}
                {sub.currentPeriodEnd && ` · ${new Date(sub.currentPeriodEnd).toLocaleDateString("tr-TR")} tarihine kadar`}
              </div>
            </div>
          </div>
          {currentPlan !== "free" && (
            <button className="text-xs text-zinc-500 hover:text-red-400 transition-colors">
              İptal et
            </button>
          )}
        </div>
      )}

      {/* Plan kartları */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.entries(PLANS) as [PlanKey, typeof PLANS[PlanKey]][]).map(([key, plan]) => {
          const isCurrent = currentPlan === key;
          const isPopular = key === "pro";

          return (
            <div
              key={key}
              className={`relative flex flex-col rounded-2xl border p-6 transition-all ${
                isCurrent
                  ? "border-purple-500/50 bg-purple-500/5"
                  : isPopular
                  ? "border-purple-500/30 bg-zinc-900"
                  : "border-zinc-800 bg-zinc-900"
              }`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Popüler
                  </span>
                </div>
              )}

              {/* Plan başlık */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${plan.badge}`}>
                  {ICONS[key]}
                </div>
                <div>
                  <div className={`font-bold ${plan.color}`}>{plan.name}</div>
                  <div className="text-xs text-zinc-500">{plan.description}</div>
                </div>
              </div>

              {/* Fiyat */}
              <div className="mb-6">
                <span className="text-3xl font-extrabold text-white">${plan.price}</span>
                {plan.price > 0 && <span className="text-zinc-500 text-sm ml-1">/ay</span>}
                {plan.price === 0 && <span className="text-zinc-500 text-sm ml-1">ücretsiz</span>}
              </div>

              {/* Özellikler */}
              <div className="flex-1 space-y-2.5 mb-6">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={14} className="text-emerald-400 shrink-0" />
                    {f}
                  </div>
                ))}
                {plan.notIncluded.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                    <X size={14} className="shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              {/* Buton */}
              {isCurrent ? (
                <div className="w-full py-2.5 rounded-xl border border-zinc-700 text-center text-sm text-zinc-500 font-medium">
                  Mevcut Plan
                </div>
              ) : key === "free" ? (
                <div className="w-full py-2.5 rounded-xl border border-zinc-800 text-center text-sm text-zinc-600 font-medium">
                  Ücretsiz
                </div>
              ) : (
                <button
                  onClick={() => handleUpgrade(key)}
                  disabled={!!loading}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                    isPopular
                      ? "bg-purple-600 hover:bg-purple-500 text-white"
                      : "bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30"
                  }`}
                >
                  {loading === key
                    ? <Loader2 size={14} className="animate-spin" />
                    : key === "pro" ? "Pro'ya Geç" : "Enterprise'a Geç"
                  }
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Kullanım istatistikleri */}
      <div className="mt-10">
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Bu Ay Kullanım</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Yürütme", used: 0, limit: PLANS[currentPlan].limits.executions },
            { label: "Flow", used: 0, limit: PLANS[currentPlan].limits.flows },
            { label: "Agent Mesajı", used: 0, limit: 500 },
          ].map(stat => (
            <div key={stat.label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-zinc-400">{stat.label}</span>
                <span className="text-xs text-zinc-500">
                  {stat.used} / {stat.limit === -1 ? "∞" : stat.limit}
                </span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all"
                  style={{ width: stat.limit === -1 ? "5%" : `${Math.min((stat.used / stat.limit) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}