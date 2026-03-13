import { Zap, Bell, User, LayoutDashboard } from 'lucide-react';
import { auth } from '../../../auth';
import { redirect } from 'next/navigation';

export default async function DashboardHeader() {
      const session = await auth();
    
      if (!session) redirect("/");
  return (
    <header className="h-16 border-b border-zinc-800 bg-black/40 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Quota / Status Bar (n8n stili) */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-3 py-1.5 rounded-full text-[12px]">
          <span className="text-zinc-500 font-medium italic">Deneme: 14 gün kaldı</span>
          <div className="w-24 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-emerald-500" />
          </div>
          <span className="text-emerald-500 font-bold">0/1000 Yürütme</span>
          <button className="flex items-center gap-1 text-zinc-300 hover:text-white ml-2 transition-colors">
            <Zap size={14} className="fill-current text-amber-400" /> ŞİMDİ YÜKSELTİN
          </button>
        </div>
      </div>

      {/* Kullanıcı Aksiyonları */}
      <div className="flex items-center gap-4">
          <nav className="border-b border-zinc-800 bg-black/20 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
      
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-400 font-medium hidden sm:block">
              {session.user?.email}
            </span>
            <div className="w-9 h-9 rounded-full border border-zinc-700 overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={session.user?.image || ""} alt="User" />
            </div>
          </div>
        </div>
      </nav>
      </div>
    </header>
  );
}