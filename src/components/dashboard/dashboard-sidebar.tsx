"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Workflow, MessageSquare, ChevronLeft, ChevronRight, Database } from 'lucide-react';
import { useSidebar } from '../context/sidebar-context';

export default function DashboardSidebar() {
  const { isCollapsed, toggle } = useSidebar();
  const pathname = usePathname();

  return (
    <aside className={`fixed left-0 top-0 h-screen bg-[#0d0d0d] border-r border-zinc-800 transition-all duration-300 z-50 flex flex-col ${isCollapsed ? 'w-[70px]' : 'w-64'}`}>
      <div className="h-16 flex items-center px-4 border-b border-zinc-800">
        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <Database size={20} className="text-white" />
        </div>
        {!isCollapsed && <span className="ml-3 font-bold text-white tracking-tighter uppercase italic text-xl">Worktio</span>}
      </div>

      <nav className="flex-1 p-3 space-y-2">
        {[
          { name: 'Genel Bakış', icon: LayoutDashboard, href: '/dashboard' },
          { name: 'Flow Builder', icon: Workflow, href: '/dashboard/flow' },
          { name: 'Sohbet', icon: MessageSquare, href: '/dashboard/agent' },
        ].map((item) => (
          <Link key={item.href} href={item.href} className={`flex items-center p-3 rounded-xl transition-all ${pathname === item.href ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900'}`}>
            <item.icon size={22} />
            {!isCollapsed && <span className="ml-3 text-sm font-medium">{item.name}</span>}
          </Link>
        ))}
      </nav>

      <button onClick={toggle} className="p-4 border-t border-zinc-800 text-zinc-500 hover:text-white flex items-center justify-center">
        {isCollapsed ? <ChevronRight size={20} /> : <div className="flex items-center gap-2"><ChevronLeft size={20} /> <span className="text-sm">Daralt</span></div>}
      </button>
    </aside>
  );
}