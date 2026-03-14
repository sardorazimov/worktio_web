"use client";
import { usePathname } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";

export default function DashboardShell({ 
  children, 
  header 
}: { 
  children: React.ReactNode; 
  header: React.ReactNode; // Header'ı dışarıdan Server Component olarak alacağız
}) {
  const pathname = usePathname();
  const HIDDEN_PATHS = ["/dashboard/agent/", "/dashboard/flow/"];
  const sidebarHidden = HIDDEN_PATHS.some(p => pathname.startsWith(p));

  return (
    <div className="min-h-screen bg-[#09090b]">
      {!sidebarHidden && <DashboardSidebar />}
      <div className={sidebarHidden ? "" : "ml-60"}>
        {header}
        {children}
      </div>
    </div>
  );
}