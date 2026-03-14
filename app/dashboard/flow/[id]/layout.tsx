export default function FlowCanvasLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen bg-[#09090b] overflow-hidden">
      {children}
    </div>
  );
}