/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Workflow, Github, Twitter, Youtube, MessageCircle } from "lucide-react";

const MAIN_LINKS = {
  Şirket: [
    { label: "Hakkımızda", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Kariyer", href: "/careers", badge: "Hiring" },
    { label: "İletişim", href: "/contact" },
    { label: "Basın", href: "/press" },
  ],
  Kaynaklar: [
    { label: "Docs", href: "/docs" },
    { label: "Changelog", href: "/changelog" },
    { label: "Community", href: "/community" },
    { label: "Destek", href: "/support" },
    { label: "API Referansı", href: "/docs/api" },
  ],
  Karşılaştırma: [
    { label: "Worktio vs n8n", href: "/blog/n8n-vs-worktio" },
    { label: "Worktio vs Zapier", href: "/blog/zapier-vs-worktio" },
    { label: "Worktio vs Make", href: "/blog/make-vs-worktio" },
  ],
  Yasal: [
    { label: "Gizlilik", href: "/privacy" },
    { label: "Kullanım Şartları", href: "/terms" },
    { label: "Çerezler", href: "/cookies" },
  ],
};

const INTEGRATIONS = [
  "Gmail", "GitHub", "Slack", "Telegram", "Discord",
  "PostgreSQL", "MySQL", "Redis", "Stripe", "Shopify",
];

const TRENDING = [
  "Gmail + AI Sınıflandırma", "GitHub + Slack Bildirim",
  "Stripe + CRM Sync", "Telegram Bot Oluştur",
  "PostgreSQL + AI Analiz", "Shopify + Mail Kampanya",
];

const CATEGORIES = [
  "İletişim", "Geliştirme", "Pazarlama",
  "Veri & Depolama", "AI & ML", "E-Ticaret",
];

const GUIDES = [
  "Telegram Botu Nasıl Kurulur?",
  "Gmail Otomasyonu Rehberi",
  "GPT-4o ile AI Agent",
  "Webhook Trigger Kullanımı",
  "Zapier Alternatifleri",
  "n8n'den Geçiş Rehberi",
];

export default function Footer() {
  return (
    <footer className=" bg-gradient-to-b from-[#030303] via-orange-950  to-[#1a1a1a] border-t border-white/[0.06]">
      {/* Ana footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-primary/10 blur-[100px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Logo + sosyal */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div
                className="w-16 h-16  flex items-center justify-center"
               
              >
                <img src="./logo.png" alt="Miransaas" className="text-white" />
              </div>
              <span className="font-black text-lg tracking-tighter uppercase italic text-white">
                Worktio
              </span>
            </Link>
            <p className="text-zinc-600 text-xs leading-relaxed mb-5">
              Limitler olmadan otomatize et.
            </p>
            <div className="flex items-center gap-2">
              {[
                { icon: <Twitter size={14} />, href: "https://twitter.com/miransaas" },
                { icon: <Github size={14} />, href: "https://github.com/miransas" },
                { icon: <MessageCircle size={14} />, href: "/community" },
                { icon: <Youtube size={14} />, href: "https://youtube.com/miransas" },
              ].map((s, i) => (
                <a key={i} href={s.href}
                  className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-200 hover:text-white hover:bg-white/10 transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link kolonları */}
          {Object.entries(MAIN_LINKS).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link href={link.href}
                      className="text-sm text-zinc-600 hover:text-white transition-colors flex items-center gap-2"
                    >
                      {link.label}
                      {"badge" in link && link.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Alt bölüm — entegrasyonlar */}
        <div className="border-t border-white/[0.06] pt-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Popüler entegrasyonlar */}
            <div>
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">
                Popüler Entegrasyonlar
              </h3>
              <ul className="space-y-2">
                {INTEGRATIONS.map(item => (
                  <li key={item}>
                    <Link href={`/docs/integrations/${item.toLowerCase()}`}
                      className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Trending kombinasyonlar */}
            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4">
                Popüler Kombinasyonlar
              </h3>
              <ul className="space-y-2">
                {TRENDING.map(item => (
                  <li key={item}>
                    <Link href="/blog"
                      className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Kategoriler */}
            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4">
                Entegrasyon Kategorileri
              </h3>
              <ul className="space-y-2">
                {CATEGORIES.map(item => (
                  <li key={item}>
                    <Link href="/docs"
                      className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Rehberler */}
            <div>
              <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider mb-4">
                Popüler Rehberler
              </h3>
              <ul className="space-y-2">
                {GUIDES.map(item => (
                  <li key={item}>
                    <Link href="/blog"
                      className="text-xs text-zinc-200 hover:text-zinc-400 transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* En alt bar */}
        <div className="border-t border-white/[0.04] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="https://miransas.com" className="flex items-center gap-1">
            <img src="./miransas.png" alt="" className="w-12" /> <p className="text-xl text-zinc-100">
              © 2026 Miransaas
            </p>
          </Link>

          <div className="flex items-center gap-1 text-xs text-zinc-700">
            Sardor&rsquo; <span className="text-red-500 mx-1">❤️</span> Azimov
          </div>
        </div>
      </div>
    </footer>
  );
}