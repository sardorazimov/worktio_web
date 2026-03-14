"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const beams: {
      x: number; y: number; angle: number;
      speed: number; length: number;
      color: string; opacity: number; width: number;
    }[] = [];

    const colors = ["#7c3aed", "#a855f7", "#6366f1", "#3b82f6", "#8b5cf6"];

    for (let i = 0; i < 12; i++) {
      beams.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        angle: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.5,
        length: 200 + Math.random() * 400,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: 0.3 + Math.random() * 0.5,
        width: 1 + Math.random() * 2,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      beams.forEach(beam => {
        beam.x += Math.cos(beam.angle) * beam.speed;
        beam.y += Math.sin(beam.angle) * beam.speed;

        if (beam.x < -beam.length) beam.x = canvas.width + beam.length;
        if (beam.x > canvas.width + beam.length) beam.x = -beam.length;
        if (beam.y < -beam.length) beam.y = canvas.height + beam.length;
        if (beam.y > canvas.height + beam.length) beam.y = -beam.length;

        const grad = ctx.createLinearGradient(
          beam.x, beam.y,
          beam.x - Math.cos(beam.angle) * beam.length,
          beam.y - Math.sin(beam.angle) * beam.length
        );
        grad.addColorStop(0, beam.color + "ff");
        grad.addColorStop(0.3, beam.color + "88");
        grad.addColorStop(1, beam.color + "00");

        ctx.save();
        ctx.globalAlpha = beam.opacity;
        ctx.strokeStyle = grad;
        ctx.lineWidth = beam.width;
        ctx.shadowColor = beam.color;
        ctx.shadowBlur = 15;
        ctx.beginPath();
        ctx.moveTo(beam.x, beam.y);
        ctx.lineTo(
          beam.x - Math.cos(beam.angle) * beam.length,
          beam.y - Math.sin(beam.angle) * beam.length
        );
        ctx.stroke();
        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303]">
      {/* Laser beam canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Radial glow center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-[100px]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[300px] h-[300px] rounded-full bg-violet-500/15 blur-[60px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-purple-300 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          n8n&#39;den Daha Güçlü Otomasyon Platformu
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9]"
        >
          <span className="text-white">Otomasyonu</span>
          <br />
          <span
            className="bg-gradient-to-r from-purple-400 via-violet-300 to-blue-400 bg-clip-text text-transparent"
            style={{ filter: "drop-shadow(0 0 30px rgba(139,92,246,0.5))" }}
          >
            Yeniden Düşün
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Flow Builder + AI Agent + Gerçek zamanlı execution.
          GPT-4o ile zekice kararlar al, sürükle bırak ile karmaşık otomasyonlar kur.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-4 flex-wrap"
        >
          <Link
            href="/dashboard"
            className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-2xl text-sm font-bold hover:bg-zinc-100 transition-all"
            style={{ boxShadow: "0 0 40px rgba(139,92,246,0.3)" }}
          >
            <Zap size={16} className="text-purple-600" />
            Ücretsiz Başla
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl text-sm font-medium hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Demo İzle
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex items-center justify-center gap-8 mt-10 text-xs text-zinc-600"
        >
          {["Kredi kartı gerekmez", "1000 execution ücretsiz", "2 dakikada kurulum"].map(t => (
            <div key={t} className="flex items-center gap-1.5">
              <div className="w-1 h-1 rounded-full bg-purple-500" />
              {t}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
    </section>
  );
}