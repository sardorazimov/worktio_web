import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import DashboardHeader from "@/components/dashboard/dashboard-header";
import SidebarMargin from "@/components/dashboard/sidebar-margin";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100">
      <DashboardSidebar />
      <SidebarMargin>
        <DashboardHeader />
        {children}
      </SidebarMargin>
    </div>
  );
}