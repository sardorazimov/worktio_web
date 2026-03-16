/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";

const navItems = [
  { label: "Blog", href: "/content/blog" },
  { label: "Download", href: "/download" }, // Dowland → Download düzelttim
  { label: "Changelog", href: "/changelog" }, // Chanelog → Changelog
  { label: "Support", href: "/support" },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20); // 20px scroll'dan sonra efekt artsın
  });

  return (
    <>
      {/* SABİT HEADER – Huly tarzı glass + gradient border */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "border-b border-violet-500/20 bg-black/70 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            : "border-b border-white/5 bg-black/40 backdrop-blur-lg"
        }`}
      >
        <div className="mx-auto flex h-16 md:h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          {/* Logo – glow + hover scale */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.12, rotate: 8 }}
              className="relative"
            >
              <img
                src="/logo.png"
                alt="Logo"
                className="h-10 w-auto md:h-12 drop-shadow-[0_0_12px_rgba(139,92,246,0.6)] group-hover:drop-shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all duration-300"
              />
              {/* Hafif glow halkası */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30 blur-xl -z-10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
            {/* İstersen text logo da ekle */}
            {/* <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">YourApp</span> */}
          </Link>

          {/* Masaüstü Menü */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-6">
            {navItems.map((item) => (
              <motion.div
                key={item.label}
                whileHover={{ scale: 1.05 }}
                className="relative"
              >
                <Link
                  href={item.href}
                  className="px-4 py-2.5 text-sm lg:text-base font-medium text-neutral-300 hover:text-white transition-colors relative z-10"
                >
                  {item.label}
                </Link>
                {/* Huly tarzı glowing hover underline */}
                <motion.span
                  className="absolute inset-x-3 -bottom-1 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full blur-sm origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </nav>

          {/* Mobil Hamburger */}
          <button
            className="md:hidden text-neutral-100 p-2 rounded-lg hover:bg-white/5 transition"
            // onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* MOBİL DRAWER – gradient hover'lı */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="fixed top-0 right-0 z-50 h-full w-80 flex flex-col bg-gradient-to-b from-neutral-950 to-black border-l border-violet-500/20 p-8 shadow-2xl md:hidden"
            >
              <div className="flex justify-end mb-10">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-neutral-400 hover:text-white transition"
                >
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav className="flex flex-col gap-8 text-lg font-medium">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="text-neutral-300 hover:text-white hover:pl-3 transition-all duration-300 bg-gradient-to-r from-violet-500/0 to-fuchsia-500/0 hover:from-violet-500/10 hover:to-fuchsia-500/10 p-3 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-10 text-sm text-neutral-600 border-t border-white/5">
                © 2026 Your Company • Made with passion
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Header yüksekliği kadar boşluk bırak (içerik üstüne binmesin) */}
      <div className="h-16 md:h-20" />
    </>
  );
}