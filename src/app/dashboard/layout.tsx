import DashboardHeader from "../../components/dashboard/dashboard-header";
import DashboardSidebar from "../../components/dashboard/dashboard-sidebar";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#050505]">
      <DashboardSidebar />
      
      {/* İçerik Alanı: 
          Sidebar genişliği kadar soldan boşluk bırakıyoruz.
          Mobilde 70px (ml-[70px]), masaüstünde 256px (lg:ml-64).
      */}
      <div className="flex-1 flex flex-col ml-[70px] lg:ml-64 transition-all duration-300">
        <DashboardHeader />
        <main className="flex-1 overflow-x-hidden p-6 lg:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}