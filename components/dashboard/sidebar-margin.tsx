"use client";
import { usePathname } from "next/navigation";

const MINI_PATHS = ["/dashboard/agent/", "/dashboard/flow/"];

export default function SidebarMargin({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMini = MINI_PATHS.some(p => pathname.startsWith(p));

  return (
    <div
      className="transition-all duration-300"
      style={{ marginLeft: isMini ? "70px" : "240px" }}
    >
      {children}
    </div>
  );
}