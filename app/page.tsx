"use client";
import { useState } from "react";
import Link from "next/link";
import { Workflow, ArrowRight, ChevronRight, Star } from "lucide-react";
import Hero from "@/components/landing/hero";
import Features from "@/components/landing/features";
import Pricing from "@/components/landing/pricing";
import EcosystemSection from "@/components/hero/EcosystemSection";

const FAQ = [
  { q: "n8n'den farkı ne?", a: "Worktio'nun yerleşik AI Agent sistemi var. GPT-4o ile doğrudan konuşabilir, flowlarınızı tetikleyebilirsiniz." },
  { q: "Ücretsiz plan ne kadar sürer?", a: "Süresiz ücretsiz. 1000 execution/ay ve 5 flow ile başlayın." },
  { q: "Hangi entegrasyonlar var?", a: "Gmail, GitHub, Slack, Webhook, HTTP API ve daha fazlası." },
  { q: "Verilerim güvende mi?", a: "Tüm veriler Neon PostgreSQL'de şifreli saklanır. GDPR uyumlu." },
];

const TESTIMONIALS = [
  { name: "Ahmet Y.", role: "Startup Kurucu", text: "n8n'den geçtim, bir daha dönmeyeceğim. AI agent özelliği inanılmaz.", avatar: "AY" },
  { name: "Selin K.", role: "Freelancer", text: "Gmail otomasyonu saatlerimi kurtardı. Kurulum 5 dakika sürdü.", avatar: "SK" },
  { name: "Mert D.", role: "SaaS Developer", text: "Flow Builder'ın UI'ı çok akıcı. Müşterilerime de önerdim.", avatar: "MD" },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="bg-[#030303] text-white overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#030303]/80 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center" style={{ boxShadow: "0 0 20px rgba(124,58,237,0.5)" }}>
            <Workflow size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tighter uppercase italic">Worktio</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-zinc-500">
          <a href="#features" className="hover:text-white transition-colors">Özellikler</a>
          <a href="#pricing" className="hover:text-white transition-colors">Fiyatlar</a>
          <a href="#faq" className="hover:text-white transition-colors">SSS</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="text-sm text-zinc-500 hover:text-white transition-colors">Giriş</Link>
          <Link href="/dashboard"
            className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-100 transition-colors"
            style={{ boxShadow: "0 0 20px rgba(255,255,255,0.1)" }}
          >
            Başla <ArrowRight size={14} />
          </Link>
        </div>
      </nav>

      {/* Hero — laser beams */}
      <Hero />

      {/* Ecosystem — senin animasyonlu diagram'ın */}
      <EcosystemSection />

      {/* Features */}
      <Features />

      {/* Testimonials */}
      <section className="py-24 px-6 bg-[#030303]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-center text-white mb-12">Kullanıcılar ne diyor?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
                <div className="flex gap-1 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">&rdquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-zinc-600">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <Pricing />

      {/* FAQ */}
      <section id="faq" className="py-24 px-6 bg-[#030303]">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-black text-center text-white mb-12">SSS</h2>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={i} className="bg-white/[0.03] border border-white/[0.06] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left text-white hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-sm">{f.q}</span>
                  <ChevronRight size={16} className={`text-zinc-500 transition-transform ${openFaq === i ? "rotate-90" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4 pt-2 text-zinc-500 text-sm border-t border-white/5">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-lg flex items-center justify-center">
              <Workflow size={12} className="text-white" />
            </div>
            <span className="font-bold tracking-tighter uppercase italic text-sm">Worktio</span>
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Gizlilik</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white transition-colors">İletişim</a>
          </div>
          <div className="text-xs text-zinc-700">© 2026 Worktio</div>
        </div>
      </footer>
    </div>
  );
}