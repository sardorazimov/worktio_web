import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Workflow, Code2, Megaphone, Box, Headset, Zap } from "lucide-react";
import CategoryCard from "@/components/dashboard/categoty-card";
import DashboardRecommendations from "@/components/dashboard/dashboard-recommendations";
import QuickStats from "@/components/dashboard/quick-stats";

const WORKTIO_MODULES = [
  { title: "Flow Engine", description: "Görsel otomasyon akışları oluştur ve çalıştır.", icon: Workflow, href: "/dashboard/flow", color: "text-purple-500", tag: "Core" },
  { title: "AI Agent", description: "GPT-4o destekli akıllı ajan ile sohbet et.", icon: Code2, href: "/dashboard/agent", color: "text-blue-500", tag: "Beta" },
  { title: "AI Marketing", description: "Sosyal medya içeriklerini analiz et.", icon: Megaphone, href: "/dashboard/marketing", color: "text-orange-500" },
  { title: "Product Lab", description: "Yeni ürün fikirlerini doğrula.", icon: Box, href: "/dashboard/product", color: "text-emerald-500" },
  { title: "Smart Support", description: "Destek taleplerini otomatik yanıtla.", icon: Headset, href: "/dashboard/support", color: "text-rose-500" },
  { title: "Sales Hunter", description: "Potansiyel müşterileri bul ve mail gönder.", icon: Zap, href: "/dashboard/sales", color: "text-amber-500" },
];

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/");

  return (
    <div className="p-8 max-w-[1400px] mx-auto text-zinc-100">
      {/* Karşılama */}
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-500 mb-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Sistem Çevrimiçi
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Hoş geldin,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
            {session.user?.name?.split(" ")[0]}
          </span>
        </h1>
        <p className="text-zinc-500">Worktio mimarisi aktif. Bugün ne otomatize edelim?</p>
      </header>

      {/* Hızlı istatistikler */}
      <QuickStats />

      {/* AI Önerileri */}
      <DashboardRecommendations />

      {/* Modüller */}
      <div>
        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">Modüller</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {WORKTIO_MODULES.map(module => (
            <CategoryCard key={module.title} {...module} />
          ))}
        </div>
      </div>
    </div>
  );
}