"use client";
import { useSidebar } from "../context/sidebar-context";

export default function MainWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();
  return (
    <main
      className="flex-1 min-h-screen transition-all duration-300"
      style={{ marginLeft: isCollapsed ? "70px" : "256px" }}
    >
      {children}
    </main>
  );
}