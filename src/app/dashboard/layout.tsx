import { SidebarProvider } from "../../components/context/sidebar-context";
import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardSidebar from "../../components/dashboard/dashboard-sidebar";
import MainWrapper from "../../components/dashboard/MainWrapper";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex bg-[#09090b]">
        <DashboardSidebar />
        <MainWrapper>
          <DashboardHeader />
          {children}
        </MainWrapper>
      </div>
    </SidebarProvider>
  );
}