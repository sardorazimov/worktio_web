"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";

export default function CreateAgentButton() {
  const [creating, setCreating] = useState(false);
  const router = useRouter();

  const createAgent = async () => {
    setCreating(true);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Yeni Agent" }),
      });
      const newAgent = await res.json();
      
      router.refresh(); // Sol listeyi güncelle
      router.push(`/dashboard/agent/${newAgent.id}`); // Yeni ajanın sohbetine uç
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <button
      onClick={createAgent}
      disabled={creating}
      className="w-7 h-7 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-400 flex items-center justify-center transition-all disabled:opacity-50"
      title="Yeni Agent Oluştur"
    >
      {creating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
    </button>
  );
}