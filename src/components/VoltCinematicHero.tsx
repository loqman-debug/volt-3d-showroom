'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ChevronRight } from 'lucide-react';

export default function VoltCinematicHero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [smoothPointer, setSmoothPointer] = useState({ x: 0, y: 0 });

  // Handle pointer tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    // Normalized coords from -1 to 1
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setPointer({ x, y });
  };

  const handleMouseLeave = () => {
    setPointer({ x: 0, y: 0 });
  };

  // Smooth lerp animation loop for pointer tracking
  useEffect(() => {
    let animId: number;
    const loop = () => {
      setSmoothPointer((prev) => ({
        x: prev.x + (pointer.x - prev.x) * 0.06,
        y: prev.y + (pointer.y - prev.y) * 0.06,
      }));
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [pointer]);

  // Dynamic transforms based on smooth pointer
  const phoneRotateX = smoothPointer.y * -14;
  const phoneRotateY = smoothPointer.x * 18;
  const phoneTranslateZ = 40;

  const bgHeadphonesX = smoothPointer.x * -25;
  const bgHeadphonesY = smoothPointer.y * -20;

  const bgWatchX = smoothPointer.x * 30;
  const bgWatchY = smoothPointer.y * -25;

  // Dynamic light position
  const lightX = 50 + smoothPointer.x * 25;
  const lightY = 35 + smoothPointer.y * 25;

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-[#050811] text-white pt-24 pb-14 select-none"
      style={{
        perspective: '1400px',
      }}
    >
      {/* 1. Dynamic Interactive Studio Lighting */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-300"
        style={{
          background: `radial-gradient(circle at ${lightX}% ${lightY}%, rgba(41, 151, 255, 0.14) 0%, rgba(5, 8, 17, 0.85) 65%, #050811 100%)`,
        }}
      />

      {/* Subtle Grid floor lines for depth */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050811] via-transparent to-transparent pointer-events-none z-10" />

      {/* 2. Editorial Hero Header Copy */}
      <div className="relative z-20 text-center max-w-3xl mx-auto px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono tracking-widest text-[#2997FF] uppercase mb-4 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2997FF] animate-pulse" />
          <span>VOLT DIGITAL SHOWROOM // THREE FLAGSHIPS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.08]">
          Technology, Beyond Ordinary.
        </h1>

        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed mb-8 font-normal">
          Discover thoughtfully engineered electronics designed to elevate your everyday experience.
        </p>

        {/* Primary and Secondary CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#collection"
            className="bg-[#2997FF] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-lg shadow-blue-500/25 active:scale-95"
          >
            Explore Collection
          </a>
          <a
            href="#about"
            className="text-neutral-300 hover:text-white border border-white/15 hover:border-white/30 bg-white/[0.03] text-xs sm:text-sm font-medium px-6 py-3 rounded-full transition-all backdrop-blur-md active:scale-95 flex items-center gap-1.5"
          >
            <span>Discover Our Story</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>
      </div>

      {/* 3. Three-Dimensional Multi-Depth Spatial Product Composition */}
      <div 
        className="relative w-full max-w-5xl h-[380px] sm:h-[480px] my-6 flex items-center justify-center z-10"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        
        {/* Background Depth 1: Headphones (Left Background) */}
        <div
          className="absolute left-[4%] sm:left-[12%] top-[10%] w-44 sm:w-60 h-44 sm:h-60 transition-transform duration-200 pointer-events-none opacity-80"
          style={{
            transform: `translate3d(${bgHeadphonesX}px, ${bgHeadphonesY}px, -180px) rotate(-12deg)`,
            filter: 'blur(1px) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
          }}
        >
          <Image
            src="/images/products/volt-headphones.jpg"
            alt="VOLT Pulse Studio Headphones"
            fill
            className="object-contain"
          />
        </div>

        {/* Background Depth 2: Smartwatch (Right Background) */}
        <div
          className="absolute right-[4%] sm:right-[12%] top-[15%] w-40 sm:w-56 h-40 sm:h-56 transition-transform duration-200 pointer-events-none opacity-85"
          style={{
            transform: `translate3d(${bgWatchX}px, ${bgWatchY}px, -140px) rotate(14deg)`,
            filter: 'blur(0.8px) drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
          }}
        >
          <Image
            src="/images/products/nova-watch.jpg"
            alt="VOLT Orbit Ultra Smartwatch"
            fill
            className="object-contain"
          />
        </div>

        {/* Primary Center Foreground: Flagship Smartphone with Mouse Tilt Response */}
        <div
          className="relative w-56 sm:w-72 h-[360px] sm:h-[460px] transition-transform duration-100 flex items-center justify-center z-20 cursor-grab"
          style={{
            transform: `translate3d(${smoothPointer.x * 12}px, ${smoothPointer.y * 10}px, ${phoneTranslateZ}px) rotateX(${phoneRotateX}deg) rotateY(${phoneRotateY}deg)`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Subtle Ambient Halo */}
          <div className="absolute inset-0 bg-[#2997FF]/15 rounded-full blur-3xl pointer-events-none" />

          <Image
            src="/images/products/titan-phone.jpg"
            alt="VOLT Horizon Pro Flagship Smartphone"
            fill
            priority
            className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          />

          {/* Real-time specular reflection gleam across the screen */}
          <div 
            className="absolute inset-y-6 inset-x-8 rounded-3xl pointer-events-none overflow-hidden opacity-30"
            style={{
              background: `linear-gradient(${120 + smoothPointer.x * 35}deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)`,
            }}
          />
        </div>

        {/* Reflective Studio Floor Plane */}
        <div 
          className="absolute -bottom-8 w-80 sm:w-96 h-8 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-md rounded-full pointer-events-none"
        />

      </div>

      {/* 4. Subtle Animated Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center gap-2 text-neutral-500 hover:text-white transition-colors cursor-pointer pt-2">
        <a href="#collection" className="flex flex-col items-center gap-1.5 text-[11px] font-mono tracking-wider">
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#2997FF]" />
        </a>
      </div>

    </section>
  );
}
