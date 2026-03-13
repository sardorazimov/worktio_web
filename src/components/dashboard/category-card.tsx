import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
  color: string;
  tag?: string;
}

export default function CategoryCard({ title, description, icon: Icon, href, color, tag }: CategoryCardProps) {
  return (
    <Link href={href} className="group relative block">
      <div className="h-full bg-zinc-900/40 border border-zinc-800 p-8 rounded-3xl hover:border-zinc-400 hover:bg-zinc-900/60 transition-all duration-300">
        {/* Glow Efekti */}
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 blur-3xl transition-opacity rounded-3xl bg-current ${color}`} />
        
        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 bg-zinc-800/50 ${color}`}>
            <Icon size={28} />
          </div>

          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            {tag && (
              <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400 text-[10px] font-bold tracking-wider uppercase">
                {tag}
              </span>
            )}
          </div>
          
          <p className="text-zinc-400 leading-relaxed text-sm">
            {description}
          </p>

          <div className="mt-8 flex items-center text-xs font-semibold uppercase tracking-widest text-zinc-500 group-hover:text-white transition-colors">
            Sistemi Başlat
            <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}