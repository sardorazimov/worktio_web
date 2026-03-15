"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { LaserFlow } from './LaserFlow';
import { Zap, ArrowRight, Check } from 'lucide-react';
import Link from 'next/link';
import FlowAnimation from './flow-animation';
import { NoiseBackground } from '../ui/noise-background';
import GlowButton from './GlowButton';

export function Laserlanding() {
    const revealImgRef = useRef<HTMLImageElement>(null);

    return (
        <div
            style={{
                minHeight: '100vh',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: '#060010'
            }}
            onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', `${x}px`);
                    el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
                }
            }}
            onMouseLeave={() => {
                const el = revealImgRef.current;
                if (el) {
                    el.style.setProperty('--mx', '-9999px');
                    el.style.setProperty('--my', '-9999px');
                }
            }}
        >
            {/* LaserFlow arka plan */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 0, left: '7%', }}>
                <LaserFlow
                    horizontalBeamOffset={0.1}
                    verticalBeamOffset={0.0}
                    color="#ff7300"
                    horizontalSizing={0.95}
                    verticalSizing={5}
                    wispDensity={5}
                    wispSpeed={35.5}
                    wispIntensity={15.1}
                    flowSpeed={0.33}
                    flowStrength={0.39}
                    fogIntensity={0.45}
                    fogScale={1}
                    fogFallSpeed={0.6}
                    decay={1.06}

                    falloffStart={2.73}
                />
            </div>

            {/* Sol yazılar */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '50%',
                height: '100%',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 60px',
            }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#c4b5fd',
                        fontSize: '11px',
                        fontWeight: 600,
                        padding: '6px 14px',
                        borderRadius: '100px',
                        marginBottom: '24px',
                        width: 'fit-content',
                    }}
                >
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa' }} />
                    Provider by Miransas
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    style={{
                        fontSize: '64px',
                        fontWeight: 700,
                        letterSpacing: '-3px',
                        lineHeight: 0.9,
                        marginBottom: '24px',
                        background: 'linear-gradient(135deg, #ffffff 30%, #d5d8f6 80%, #fdf7fe 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                    }}
                >
                    Otomasyonu
                    <br />
                    Yeniden Düşün
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{
                        fontSize: '18px',
                        lineHeight: 1.7,
                        marginBottom: '32px',
                        maxWidth: '420px',
                        background: 'linear-gradient(135deg, #a1a1aa 0%, #71717a 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        fontWeight: 400,
                    }}
                >
                    Flow Builder + AI Agent + Gerçek zamanlı execution.
                    Daha fazla AI entegrasyonu yolda!
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}
                >
                    <GlowButton href="/dashboard" label="Dashboard" />
                    {/* <Link
                        href="/docs"
                        className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white border border-orange-500 text-orange-500 text-[13px] font-bold tracking-widest uppercase transition-all duration-300 hover:bg-orange-500 hover:text-white shadow-sm hover:shadow-[0_0_20px_rgba(249,115,22,0.4)]"
                    >
                        DOCS →
                    </Link> */}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                    {["Kredi kartı gerekmez", "1000 execution ücretsiz", "2 dakikada kurulum"].map(t => (
                        <div key={t} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '12px',
                            color: '#71717a',
                            letterSpacing: '0.05em',
                        }}>
                            <div style={{
                                width: '16px',
                                height: '16px',
                                borderRadius: '50%',
                                background: 'rgba(255,115,0,0.1)',
                                border: '1px solid rgba(255,115,0,0.3)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                            }}>
                                <Check size={9} color="#ff7300" />
                            </div>
                            {t}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Sağ — Dashboard preview box */}
            {/* Sağ — Dashboard preview box — laser beam üstünde */}
            {/* Sağ — Dashboard preview box */}
            <div style={{
                position: 'absolute',
                top: '82%',
                right: '2%',
                transform: 'translateY(-50%)',
                width: '66%',
                height: '65%',
                borderRadius: '20px',
                zIndex: 20,
                overflow: 'hidden',
                padding: '1px', // border için
                background: 'linear-gradient(135deg, rgba(255,115,0,0.6), rgba(255,80,0,0.2), rgba(255,115,0,0.6))',
                backgroundSize: '200% 200%',
                animation: 'borderBeam 3s linear infinite',
                boxShadow: '0 0 40px rgba(255,115,0,0.2), 0 0 80px rgba(255,115,0,0.1)',
            }}>
                {/* İç container */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '19px',
                    overflow: 'hidden',
                    background: '#060010',
                    top: 20,
                }}>
                    <FlowAnimation />
                    {/* <img
                        src="/hero.png"
                        alt="Dashboard"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'top',
                        }}
                    /> */}
                </div>
            </div>

            {/* Mouse reveal overlay */}
            <img
                ref={revealImgRef}
                src="/hero.png"
                alt="Reveal effect"
                style={{
                    position: 'absolute',
                    width: '100%',
                    top: '-50%',
                    zIndex: 5,
                    mixBlendMode: 'lighten',
                    opacity: 0.3,
                    pointerEvents: 'none',
                    '--mx': '-9999px',
                    '--my': '-9999px',
                    WebkitMaskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    maskImage: 'radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)',
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat'
                } as React.CSSProperties}
            />

            {/* Alt fade */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '120px',
                background: 'linear-gradient(to top, #030303, transparent)',
                zIndex: 20,
                pointerEvents: 'none',
            }} />
        </div>
    );
}