"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Workflow, Brain, Zap, Globe, Code2, Mail,
  ChevronRight, Check, X, Play, Star,
  ArrowRight, Sparkles, Shield, Clock
} from "lucide-react";

const FEATURES = [
  { icon: <Workflow size={24} />, title: "Flow Builder", desc: "n8n'den daha güçlü görsel otomasyon. Sürükle, bırak, çalıştır.", color: "from-purple-500 to-violet-600" },
  { icon: <Brain size={24} />, title: "AI Agent", desc: "GPT-4o destekli akıllı ajanlar. Web arama, kod çalıştırma, mail gönderme.", color: "from-blue-500 to-cyan-600" },
  { icon: <Zap size={24} />, title: "Anında Execution", desc: "Flowlarını tek tıkla çalıştır. Gerçek zamanlı sonuçlar.", color: "from-amber-500 to-orange-600" },
  { icon: <Globe size={24} />, title: "Webhook Trigger", desc: "Dış servislerden flow tetikle. Sınırsız entegrasyon.", color: "from-emerald-500 to-teal-600" },
  { icon: <Code2 size={24} />, title: "Kod Çalıştır", desc: "Flow içinde JavaScript çalıştır. Tam esneklik.", color: "from-rose-500 to-pink-600" },
  { icon: <Mail size={24} />, title: "Gmail Entegrasyon", desc: "Mail oku, gönder, kategorize et. Otomatik.", color: "from-red-500 to-orange-500" },
];

const TESTIMONIALS = [
  { name: "Ahmet Y.", role: "Startup Kurucu", text: "n8n'den geçtim, bir daha dönmeyeceğim. AI agent özelliği inanılmaz.", avatar: "AY" },
  { name: "Selin K.", role: "Freelancer", text: "Gmail otomasyonu saatlerimi kurtardı. Kurulum 5 dakika sürdü.", avatar: "SK" },
  { name: "Mert D.", role: "SaaS Developer", text: "Flow Builder'ın UI'ı çok akıcı. Müşterilerime de önerdim.", avatar: "MD" },
];

const FAQ = [
  { q: "n8n'den farkı ne?", a: "Worktio'nun yerleşik AI Agent sistemi var. Gemini ve GPT-4o ile doğrudan konuşabilir, flowlarınızı tetikleyebilirsiniz. n8n'de bu özellik yok." },
  { q: "Ücretsiz plan ne kadar sürer?", a: "Süresiz ücretsiz. 1000 execution/ay ve 5 flow ile başlayın, büyüdükçe yükseltin." },
  { q: "Hangi entegrasyonlar var?", a: "Gmail, GitHub, Slack, Webhook, HTTP API ve daha fazlası. Her ay yeni entegrasyon ekliyoruz." },
  { q: "Verilerim güvende mi?", a: "Tüm veriler Neon PostgreSQL'de şifreli saklanır. GDPR uyumlu altyapı kullanıyoruz." },
];

const PLANS = [
  {
    name: "Free", price: 0, desc: "Başlamak için",
    features: ["1.000 execution/ay", "5 flow", "AI Agent", "Temel node'lar"],
    missing: ["Webhook trigger", "Öncelikli destek"],
    cta: "Ücretsiz Başla", highlight: false,
  },
  {
    name: "Pro", price: 29, desc: "Profesyoneller için",
    features: ["50.000 execution/ay", "50 flow", "AI Agent", "Webhook trigger", "Tüm node'lar", "Flow şablonları"],
    missing: ["Öncelikli destek"],
    cta: "Pro'ya Geç", highlight: true,
  },
  {
    name: "Enterprise", price: 99, desc: "Büyük ekipler",
    features: ["Sınırsız execution", "Sınırsız flow", "AI Agent", "Webhook trigger", "Öncelikli destek", "SLA garantisi"],
    missing: [],
    cta: "Enterprise'a Geç", highlight: false,
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#030303] text-white overflow-x-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-[30%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
            <Workflow size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase italic">Worktio</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-400">
          <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
          <a href="#pricing" className="hover:text-white transition-colors">Fiyatlar</a>
          <a href="#faq" className="hover:text-white transition-colors">SSS</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">
            Giriş
          </Link>
          <Link href="/dashboard" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-zinc-100 transition-colors">
            Ücretsiz Başla <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 pt-24 pb-32 px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium px-4 py-2 rounded-full mb-8">
          <Sparkles size={12} />
          n8n&rsquo;den Daha Güçlü Otomasyon Platformu
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-none">
          <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Otomasyonu
          </span>
          <br />
          <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
            Yeniden Düşün
          </span>
        </h1>

        <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Flow Builder + AI Agent + Gerçek zamanlı execution. <br />
          Sürükle bırak ile karmaşık otomasyonlar kur, GPT-4o ile zekice kararlar al.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/dashboard"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-8 py-4 rounded-2xl text-base font-semibold transition-all shadow-lg shadow-purple-500/25"
          >
            <Zap size={18} /> Ücretsiz Başla
          </Link>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-2xl text-base font-medium transition-all">
            <Play size={18} /> Demo İzle
          </button>
        </div>

        <div className="flex items-center justify-center gap-8 mt-12 text-sm text-zinc-500">
          <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> Kredi kartı gerektirmez</div>
          <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 1000 execution ücretsiz</div>
          <div className="flex items-center gap-2"><Check size={14} className="text-emerald-400" /> 2 dakikada kurulum</div>
        </div>

        {/* Dashboard preview */}
        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10 pointer-events-none" />
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl shadow-purple-500/10 backdrop-blur-sm">
            <div className="h-8 bg-zinc-800/80 flex items-center gap-2 px-4">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-amber-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="text-xs text-zinc-500 ml-2">localhost:3000/dashboard</span>
            </div>
            <div className="h-80 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center">
              <div className="text-zinc-600 flex flex-col items-center gap-3">
                <Workflow size={48} className="text-purple-500/40" />
                <span className="text-sm">Dashboard Preview</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Her şey{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              dahili
            </span>
          </h2>
          <p className="text-zinc-400 text-lg">Dışarıdan eklenti almanıza gerek yok.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="group bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 rounded-2xl p-6 transition-all hover:bg-zinc-900">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-4 text-white shadow-lg`}>
                {f.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="relative z-10 py-16 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10K+", label: "Kullanıcı" },
            { value: "1M+", label: "Execution" },
            { value: "50+", label: "Entegrasyon" },
            { value: "99.9%", label: "Uptime" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-1">{s.value}</div>
              <div className="text-zinc-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter mb-4">Kullanıcılar ne diyor?</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <p className="text-zinc-300 text-sm leading-relaxed mb-5">&#34;{t.text}&#34;</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-zinc-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative z-10 py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
            Basit{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              fiyatlandırma
            </span>
          </h2>
          <p className="text-zinc-400">Sürpriz yok. Gizli ücret yok.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <div key={i} className={`relative rounded-2xl p-6 ${
              plan.highlight
                ? "bg-gradient-to-b from-purple-600/20 to-violet-600/10 border border-purple-500/40"
                : "bg-zinc-900/50 border border-zinc-800"
            }`}>
              {plan.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Popüler
                </div>
              )}
              <div className="mb-6">
                <div className="font-bold text-lg mb-1">{plan.name}</div>
                <div className="text-zinc-400 text-sm">{plan.desc}</div>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-black">${plan.price}</span>
                {plan.price > 0 && <span className="text-zinc-500 text-sm ml-1">/ay</span>}
              </div>
              <div className="space-y-2.5 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check size={14} className="text-emerald-400 shrink-0" /> {f}
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-zinc-600">
                    <X size={14} className="shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/dashboard"
                className={`block w-full py-3 rounded-xl text-center text-sm font-semibold transition-all ${
                  plan.highlight
                    ? "bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white shadow-lg shadow-purple-500/25"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-24 px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black tracking-tighter mb-4">Sık sorulan sorular</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((f, i) => (
            <div key={i} className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-zinc-800/50 transition-colors"
              >
                <span className="font-medium">{f.q}</span>
                <ChevronRight size={16} className={`text-zinc-500 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
              </button>
              {openFaq === i && (
                <div className="px-6 pb-4 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800">
                  <div className="pt-4">{f.a}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 py-24 px-8 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">
            Hemen başla,{" "}
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              ücretsiz
            </span>
          </h2>
          <p className="text-zinc-400 mb-8">Kredi kartı gerekmez. 2 dakikada kurulum.</p>
          <Link href="/dashboard"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white px-10 py-4 rounded-2xl text-base font-semibold transition-all shadow-lg shadow-purple-500/25"
          >
            <Zap size={18} /> Ücretsiz Başla
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-800 py-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Workflow size={12} className="text-white" />
            </div>
            <span className="font-bold tracking-tighter uppercase italic">Worktio</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
          <div className="text-sm text-zinc-600">© 2026 Worktio. Tüm hakları saklıdır.</div>
        </div>
      </footer>
    </div>
  );
}