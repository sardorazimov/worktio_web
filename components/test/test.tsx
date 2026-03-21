"use client";

import LaserFlow from "./test-laser-flow";


import React from 'react';


export default function BridgeFlowCards() {
  const flowColor = "#06b6d4"; // Cyan/Turkuaz rengi (Siberpunk bir veri köprüsü hissi için)

  return (
    // Ana Taşıyıcı
    <div className="flex items-center justify-center w-full max-w-6xl p-8 mx-auto bg-black rounded-3xl border border-white/5 min-h-[500px]">
      
      {/* --- KART A (SOL UÇ) --- */}
      <div className="relative z-10 w-80 bg-zinc-950 border-2 border-cyan-900/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)] flex-shrink-0">
        {/* Kartın içindeki "Bağlantı Noktası" efekti (Işının çıktığı yer hissiyatı) */}
        <div className="absolute top-1/2 -right-1.5 w-3 h-12 bg-cyan-500 rounded-full -translate-y-1/2 shadow-[0_0_15px_#06b6d4]" />
        
        <div className="w-12 h-12 mb-6 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/50">
          <span className="text-cyan-400 font-black text-xl">A</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Kaynak Düğüm</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Veri akışı buradan başlar. Sistem, köprü üzerinden karşı tarafa kesintisiz enerji gönderir.
        </p>
      </div>

      {/* --- KÖPRÜ (LASER FLOW) --- */}
      {/* flex-1: Aradaki tüm boşluğu kaplar.
        -mx-4: Işının uçlarını kartların içine hafifçe sokar (kopukluğu engeller).
        z-0: Kartların altında kalır.
      */}
      <div className="relative flex-1 h-[300px] -mx-4 z-0 pointer-events-none">
        <LaserFlow 
          color={flowColor}
          horizontalSizing={1.8} // Işının sağa sola tam dayanması için genişliği artırdık
          verticalSizing={2.0} // Çizimindeki gibi ortada kocaman bir enerji patlaması/dağılması yaratır
          wispDensity={4.5} // Işığın içinden geçen parçacık (veri) yoğunluğu
          flowSpeed={1.2} // Akış hızı
          wispSpeed={20.0} // Parçacıkların hızı
          fogIntensity={0.8} // Ortamın parlaklığı
          className="w-full h-full drop-shadow-[0_0_20px_rgba(6,182,212,0.5)]"
        />
      </div>

      {/* --- KART B (SAĞ UÇ) --- */}
      <div className="relative z-10 w-80 bg-zinc-950 border-2 border-cyan-900/50 rounded-2xl p-8 shadow-[0_0_30px_rgba(6,182,212,0.1)] flex-shrink-0">
        {/* Kartın içindeki "Bağlantı Noktası" efekti (Işının girdiği yer hissiyatı) */}
        <div className="absolute top-1/2 -left-1.5 w-3 h-12 bg-cyan-500 rounded-full -translate-y-1/2 shadow-[0_0_15px_#06b6d4]" />

        <div className="w-12 h-12 mb-6 bg-cyan-500/10 rounded-xl flex items-center justify-center border border-cyan-500/50">
          <span className="text-cyan-400 font-black text-xl">B</span>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Hedef Düğüm</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          Köprüden gelen yüksek yoğunluklu enerji ve veri paketleri burada toplanır.
        </p>
      </div>

    </div>
  );
}