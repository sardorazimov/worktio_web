"use client";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GlowButton({ href = "/dashboard", label = "SEE IN ACTION" }) {
  return (
    <Link href={href}>
      <div style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Glow arka plan */}
        <div style={{
          position: "absolute",
          right: "-10px",
          top: "50%",
          transform: "translateY(-50%)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,115,0,0.8) 0%, rgba(255,80,0,0.4) 40%, transparent 70%)",
          filter: "blur(8px)",
          pointerEvents: "none",
        }} />

        {/* Button */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "14px 28px",
          borderRadius: "100px",
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(10px)",
          color: "#7a2800",
          fontSize: "13px",
          fontWeight: 800,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          cursor: "pointer",
          position: "relative",
          zIndex: 1,
          boxShadow: "0 0 30px rgba(255,115,0,0.3), inset 0 1px 1px rgba(255,255,255,0.8)",
          transition: "all 0.3s ease",
        }}>
          {label}
          <ArrowRight size={14} />
        </div>
      </div>
    </Link>
  );
}