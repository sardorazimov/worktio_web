
import { redirect } from "next/navigation";
import { 
  Workflow, 
  Code2, 
  Megaphone, 
  Box, 
  Headset, 
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { auth } from "../../../auth";
import CategoryCard from "../../components/dashboard/category-card";


const WORKTIO_MODULES = [
  {
    title: "Flow Engine",
    description: "Gemini, YouTube ve Gmail'i birbirine bağlayan görsel otomasyon akışları oluştur.",
    icon: Workflow,
    href: "/dashboard/flow",
    color: "text-purple-500",
    tag: "Core"
  },
  {
    title: "Code Agent",
    description: "Senin yerine kod yazan, hata ayıklayan ve GitHub'a pushlayan yapay zeka ajanı.",
    icon: Code2,
    href: "/dashboard/agent",
    color: "text-blue-500",
    tag: "Beta"
  },
  {
    title: "AI Marketing",
    description: "Sosyal medya içeriklerini analiz et, Gemini ile kampanya metinleri oluştur.",
    icon: Megaphone,
    href: "/dashboard/marketing",
    color: "text-orange-500"
  },
  {
    title: "Product Lab",
    description: "Yeni ürün fikirlerini doğrula, rakip analizi yap ve roadmap oluştur.",
    icon: Box,
    href: "/dashboard/product",
    color: "text-emerald-500"
  },
  {
    title: "Smart Support",
    description: "Gelen destek taleplerini kategorize et ve otomatik yanıtlar hazırla.",
    icon: Headset,
    href: "/dashboard/support",
    color: "text-rose-500"
  },
  {
    title: "Sales Hunter",
    description: "Potansiyel müşterileri bul ve kişiselleştirilmiş soğuk mailler gönder.",
    icon: Zap,
    href: "/dashboard/sales",
    color: "text-amber-500"
  }
];

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      {/* İnce Üst Bar */}
    

      <main className="w-full mx-auto px-6 py-16">
        {/* Karşılama Bölümü */}
        <header className="mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-500 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Sistem Çevrimiçi
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">
            Hoş geldin, <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">{session.user?.name?.split(' ')[0]}</span>
          </h1>
          <p className="text-zinc-400 text-xl max-w-2xl">
            Worktio mimarisi hazır. Hangi departmanı devreye almak istersin?
          </p>
        </header>

        {/* Grid Yapısı */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {WORKTIO_MODULES.map((module) => (
            <CategoryCard key={module.title} {...module} />
          ))}
        </div>
      </main>
    </div>
  );
}