'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  ChevronRight, 
  RotateCw, 
  X, 
  Sparkles, 
  Layers, 
  ArrowUpRight, 
  ShieldCheck, 
  Check, 
  Cpu, 
  Compass, 
  Activity,
  Sliders,
  Volume2,
  Camera,
  Radio,
  Watch
} from 'lucide-react';
import VoltCinematicHero from '@/components/VoltCinematicHero';
import VoltProductModal from '@/components/VoltProductModal';
import Interactive3DViewer from '@/components/Interactive3DViewer';
import InteractiveHotspot from '@/components/InteractiveHotspot';
import MaterialColorSwitcher from '@/components/MaterialColorSwitcher';
import SpecComparisonMatrix from '@/components/SpecComparisonMatrix';
import ChapterProgressRail from '@/components/ChapterProgressRail';
import MobileStickyActionBar from '@/components/MobileStickyActionBar';

export default function VoltShowroomPage() {
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [show3DViewerModal, setShow3DViewerModal] = useState(false);

  // THREE FEATURED PRODUCTS SPECIFICATION
  const products = [
    {
      id: 'volt-phone',
      anchorId: 'smartphone',
      category: 'PRODUCT 01 — PREMIUM SMARTPHONE',
      name: 'VOLT Horizon Pro',
      tagline: 'Sculpted in Grade 5 Titanium.',
      description: 'A flagship smartphone engineered with aerospace-grade titanium, ultra-thin symmetric bezels, an edge-to-edge 120Hz LTPO display, and an uncompromising triple-camera periscope system.',
      price: 1199,
      priceFormatted: '$1,199',
      image: '/images/products/titan-phone.jpg',
      badge: 'Flagship Architecture 2026',
      accentColor: '#2997FF',
      ctaText: 'Explore Smartphone',
      annotations: [
        { title: 'Grade 5 Titanium', subtitle: 'Lightest & strongest structural frame' },
        { title: '3nm Bionic Silicon', subtitle: '45% efficiency boost with hardware ray tracing' },
        { title: '200MP Triple Camera', subtitle: '10x periscope zoom with dual OIS' },
        { title: '6.8" 120Hz LTPO', subtitle: '2,600 nits peak outdoor brightness' },
      ],
      features: [
        { title: 'Grade 5 Titanium Frame', desc: 'CNC-machined unibody skeleton with vapor blasted satin finish.' },
        { title: 'Periscope Optics', desc: 'Continuous optical focal length spanning 13mm to 120mm.' },
        { title: 'Dual Vapor Chamber', desc: 'Rapid passive heat dissipation sustaining peak clock speeds.' },
      ],
      finishes: [
        { name: 'Natural Titanium', hex: '#9A958D' },
        { name: 'Space Black', hex: '#2E2D2B' },
        { name: 'Deep Ocean Blue', hex: '#2B3848' },
        { name: 'Glacier White', hex: '#E3E4E5' },
      ],
      techSpecs: [
        { label: 'Processor', val: 'Orion X1 Extreme (3nm)' },
        { label: 'Display', val: '6.8" LTPO AMOLED (1-120Hz)' },
        { label: 'Main Camera', val: '200MP + 50MP + 50MP' },
        { label: 'Battery', val: '5,400 mAh • 90W GaN Wired' },
      ],
    },
    {
      id: 'volt-headphones',
      anchorId: 'headphones',
      category: 'PRODUCT 02 — WIRELESS HEADPHONES',
      name: 'VOLT Pulse Studio ANC',
      tagline: 'Pure Acoustic Purity.',
      description: 'Premium over-ear wireless headphones engineered with 45mm custom beryllium drivers, adaptive hybrid active noise cancellation (-48dB), memory foam ear cushions, and 60 hours of uncompromised studio playback.',
      price: 499,
      priceFormatted: '$499',
      image: '/images/products/volt-headphones.jpg',
      badge: 'Master Reference Audio',
      accentColor: '#38BDF8',
      ctaText: 'Explore Headphones',
      annotations: [
        { title: '45mm Beryllium Drivers', subtitle: 'Ultra-low distortion reference response' },
        { title: '-48dB Hybrid ANC', subtitle: 'Eight acoustic microphones cancelling ambient chaos' },
        { title: '60-Hour Battery', subtitle: 'Full week of listening with quick charge' },
        { title: 'Lossless LDAC & Spatial', subtitle: 'High-res audio streaming up to 990kbps' },
      ],
      features: [
        { title: 'Beryllium Diaphragms', desc: 'Rigid acoustic drivers delivering transient clarity up to 45kHz.' },
        { title: 'Ergonomic Memory Foam', desc: 'Breathable vegan leather cushions with magnetic quick-swap.' },
        { title: 'Dual-Hinged Titanium', desc: 'Foldable precision gimbal hinges designed for zero creak.' },
      ],
      finishes: [
        { name: 'Matte Space Black', hex: '#161922' },
        { name: 'Brushed Silver Titanium', hex: '#CBD5E1' },
      ],
      techSpecs: [
        { label: 'Acoustic Driver', val: '45mm Custom Beryllium' },
        { label: 'Noise Cancellation', val: '-48dB Hybrid Active ANC' },
        { label: 'Frequency Range', val: '5Hz - 45,000Hz' },
        { label: 'Playback Time', val: '60 Hours (ANC Enabled)' },
      ],
    },
    {
      id: 'volt-watch',
      anchorId: 'smartwatch',
      category: 'PRODUCT 03 — SMARTWATCH',
      name: 'VOLT Orbit Ultra GPS',
      tagline: 'Engineered for the Extremes.',
      description: 'A rugged yet refined luxury smartwatch featuring a solid 49mm titanium chassis, sapphire crystal display with 3,000 nits brightness, dual-frequency L1+L5 GPS, and certified 100m water resistance.',
      price: 799,
      priceFormatted: '$799',
      image: '/images/products/nova-watch.jpg',
      badge: 'Military Grade MIL-STD 810H',
      accentColor: '#FF9F0A',
      ctaText: 'Explore Smartwatch',
      annotations: [
        { title: '49mm Solid Titanium', subtitle: 'Raised edge bezel protecting sapphire crystal' },
        { title: '3,000 Nits Display', subtitle: 'Crystal clear visibility in blistering sunlight' },
        { title: '100m Water Resistance', subtitle: 'EN13319 certified for professional ocean diving' },
        { title: 'Dual L1+L5 Precision GPS', subtitle: 'Centimeter accuracy in dense forests and canyons' },
      ],
      features: [
        { title: 'Sapphire Crystal Face', desc: 'Mohs hardness 9 crystal virtually impervious to scratches.' },
        { title: 'Dual GPS Arrays', desc: 'Instant satellite locking even in urban concrete canyons.' },
        { title: 'Two-Week Battery', desc: 'Up to 14 days normal usage / 36 hours continuous tracking.' },
      ],
      finishes: [
        { name: 'Titanium with Trail Orange', hex: '#EA580C' },
        { name: 'Stealth Black Titanium', hex: '#1E293B' },
        { name: 'Alpine Natural Titanium', hex: '#94A3B8' },
      ],
      techSpecs: [
        { label: 'Case Material', val: 'Grade 5 Sculpted Titanium' },
        { label: 'Screen', val: '1.96" Sapphire OLED (3000 nits)' },
        { label: 'Water Rating', val: '100 Meters • 10 ATM' },
        { label: 'Battery Endurance', val: '14 Days Standard / 36h GPS' },
      ],
    },
  ];

  // Active finish state for each product
  const [phoneFinish, setPhoneFinish] = useState(products[0].finishes[0]);
  const [headphonesFinish, setHeadphonesFinish] = useState(products[1].finishes[0]);
  const [watchFinish, setWatchFinish] = useState(products[2].finishes[0]);

  return (
    <div 
      id="main-content"
      className="bg-[#050811] text-[#F5F5F7] min-h-screen selection:bg-[#2997FF] selection:text-white overflow-hidden relative"
    >
      {/* Chapter Progress Rail (Desktop Floating 01 // 02 // 03) */}
      <ChapterProgressRail />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyActionBar />
      
      {/* 1. CINEMATIC 3D HERO SECTION */}
      <VoltCinematicHero />

      {/* 2. COLLECTION ANCHOR / SECTION INTRO */}
      <div id="collection" className="pt-28 pb-12 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <span className="text-[11px] font-mono tracking-widest text-[#2997FF] uppercase block mb-3">
          VOLT THREE FEATURED MASTERPIECES
        </span>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
          The 2026 Flagship Showcase
        </h2>
        <p className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto leading-relaxed">
          Three visionary instruments engineered with aerospace-grade metallurgy, cutting-edge silicon, and uncompromising craftsmanship.
        </p>
      </div>

      {/* =========================================================================
          CHAPTER 01 // SMARTPHONE: VOLT HORIZON PRO
          ========================================================================= */}
      <section 
        id="smartphone" 
        className="relative min-h-[95vh] py-28 border-t border-b border-white/[0.07] bg-[#070A14] flex flex-col justify-center overflow-hidden"
      >
        {/* Ambient Halo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-[#2997FF]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Editorial Copy & Annotation Pointers */}
            <div className="lg:col-span-5 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-[#2997FF]">
                <span>{products[0].category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {products[0].name}
              </h2>

              <p className="text-lg text-neutral-300 font-medium">
                {products[0].tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {products[0].description}
              </p>

              {/* Price & Primary Action */}
              <div className="pt-1 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono text-white tabular-nums">
                  {products[0].priceFormatted}
                </span>
                <span className="text-xs text-neutral-500 font-mono">USD</span>
              </div>

              {/* Live Finish Switcher */}
              <MaterialColorSwitcher 
                finishes={products[0].finishes}
                activeFinish={phoneFinish}
                onSelectFinish={setPhoneFinish}
                accentColor="#2997FF"
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(products[0])}
                  className="bg-[#2997FF] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-white"
                >
                  {products[0].ctaText}
                </button>

                <button
                  type="button"
                  onClick={() => setShow3DViewerModal(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/15 hover:border-white/30 bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition-all cursor-pointer backdrop-blur-md active:scale-95 touch-manipulation focus-visible:ring-2 focus-visible:ring-[#2997FF]"
                >
                  <RotateCw className="w-3.5 h-3.5 text-[#2997FF]" />
                  <span>Interactive 3D 360°</span>
                </button>
              </div>

              {/* Technical Annotations connected to features */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs">
                {products[0].annotations.map((ann, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="font-semibold text-white font-mono text-[11px]">{ann.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 leading-snug">{ann.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Floating 3D Smartphone Render with Interactive Hotspots */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg h-[460px] sm:h-[580px] flex items-center justify-center">
                
                {/* Hotspot 1: Optics Periscope */}
                <InteractiveHotspot
                  x={67}
                  y={28}
                  title="200MP Triple Periscope"
                  subtitle="10x continuous optical focal length with dual optical stabilization."
                  badge="Optics"
                  icon={Camera}
                  accentColor="#2997FF"
                  align="left"
                />

                {/* Hotspot 2: Display LTPO */}
                <InteractiveHotspot
                  x={48}
                  y={52}
                  title="6.8-inch 120Hz LTPO"
                  subtitle="2,600 nits peak outdoor brightness with razor-thin titanium bezels."
                  badge="Display"
                  icon={Sparkles}
                  accentColor="#2997FF"
                  align="top"
                />

                {/* Hotspot 3: Chassis Frame */}
                <InteractiveHotspot
                  x={35}
                  y={78}
                  title="Grade 5 Titanium Unibody"
                  subtitle="Aerospace titanium skeleton engineered for maximum impact resilience."
                  badge="Chassis"
                  icon={ShieldCheck}
                  accentColor="#2997FF"
                  align="right"
                />

                <Image
                  src={products[0].image}
                  alt={products[0].name}
                  fill
                  priority
                  className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:scale-103 transition-transform duration-700 animate-float-slow"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 02 // WIRELESS HEADPHONES: VOLT PULSE STUDIO
          ========================================================================= */}
      <section 
        id="headphones" 
        className="relative min-h-[95vh] py-28 border-b border-white/[0.07] bg-[#050811] flex flex-col justify-center overflow-hidden"
      >
        {/* Soft Ambient Cyan Halo */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Suspended Headphones Render with Hotspots */}
            <div className="lg:col-span-7 order-2 lg:order-1 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg h-[440px] sm:h-[560px] flex items-center justify-center">
                
                {/* Hotspot 1: Gimbal Hinge */}
                <InteractiveHotspot
                  x={38}
                  y={22}
                  title="Dual-Hinged Gimbal"
                  subtitle="Zero-creak precision fluid rotation mechanisms."
                  badge="Gimbal"
                  icon={Sliders}
                  accentColor="#38BDF8"
                  align="right"
                />

                {/* Hotspot 2: Beryllium Driver */}
                <InteractiveHotspot
                  x={30}
                  y={56}
                  title="45mm Custom Beryllium"
                  subtitle="Acoustic transducer delivering hyper-crisp audio extending to 45kHz."
                  badge="Acoustics"
                  icon={Volume2}
                  accentColor="#38BDF8"
                  align="right"
                />

                {/* Hotspot 3: Cushion Seal */}
                <InteractiveHotspot
                  x={65}
                  y={60}
                  title="Ergonomic Memory Foam"
                  subtitle="Breathable vegan leather magnetic snap ear cushions."
                  badge="Comfort"
                  icon={Layers}
                  accentColor="#38BDF8"
                  align="left"
                />

                <Image
                  src={products[1].image}
                  alt={products[1].name}
                  fill
                  className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:scale-103 transition-transform duration-700 animate-float-slow"
                />
              </div>
            </div>

            {/* Right Column: Specifications & Editorial */}
            <div className="lg:col-span-5 order-1 lg:order-2 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-cyan-400">
                <span>{products[1].category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {products[1].name}
              </h2>

              <p className="text-lg text-neutral-300 font-medium">
                {products[1].tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {products[1].description}
              </p>

              {/* Price & Primary Action */}
              <div className="pt-1 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono text-white tabular-nums">
                  {products[1].priceFormatted}
                </span>
                <span className="text-xs text-neutral-500 font-mono">USD</span>
              </div>

              {/* Live Finish Switcher */}
              <MaterialColorSwitcher 
                finishes={products[1].finishes}
                activeFinish={headphonesFinish}
                onSelectFinish={setHeadphonesFinish}
                accentColor="#38BDF8"
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(products[1])}
                  className="bg-cyan-500 hover:bg-cyan-600 text-black text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-lg shadow-cyan-500/25 active:scale-95 cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-white"
                >
                  {products[1].ctaText}
                </button>
              </div>

              {/* Technical Annotations */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs">
                {products[1].annotations.map((ann, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="font-semibold text-white font-mono text-[11px]">{ann.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 leading-snug">{ann.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER 03 // SMARTWATCH: VOLT ORBIT ULTRA GPS
          ========================================================================= */}
      <section 
        id="smartwatch" 
        className="relative min-h-[95vh] py-28 border-b border-white/[0.07] bg-[#070A14] flex flex-col justify-center overflow-hidden"
      >
        {/* Soft Ambient Amber Halo */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[700px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Watch Specs & Editorial */}
            <div className="lg:col-span-5 space-y-6 text-start">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[11px] font-mono text-amber-500">
                <span>{products[2].category}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                {products[2].name}
              </h2>

              <p className="text-lg text-neutral-300 font-medium">
                {products[2].tagline}
              </p>

              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {products[2].description}
              </p>

              {/* Price & Primary Action */}
              <div className="pt-1 flex items-baseline gap-3">
                <span className="text-3xl font-bold font-mono text-white tabular-nums">
                  {products[2].priceFormatted}
                </span>
                <span className="text-xs text-neutral-500 font-mono">USD</span>
              </div>

              {/* Live Finish Switcher */}
              <MaterialColorSwitcher 
                finishes={products[2].finishes}
                activeFinish={watchFinish}
                onSelectFinish={setWatchFinish}
                accentColor="#FF9F0A"
              />

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(products[2])}
                  className="bg-amber-500 hover:bg-amber-600 text-black text-xs sm:text-sm font-semibold px-7 py-3 rounded-full transition-all shadow-lg shadow-amber-500/25 active:scale-95 cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-white"
                >
                  {products[2].ctaText}
                </button>
              </div>

              {/* Technical Annotations */}
              <div className="pt-6 border-t border-white/[0.08] grid grid-cols-2 gap-3 text-xs">
                {products[2].annotations.map((ann, i) => (
                  <div key={i} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="font-semibold text-white font-mono text-[11px]">{ann.title}</div>
                    <div className="text-[10px] text-neutral-400 mt-0.5 leading-snug">{ann.subtitle}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Watch on Refined Pedestal with Hotspots */}
            <div className="lg:col-span-7 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg h-[460px] sm:h-[580px] flex items-center justify-center">
                
                {/* Hotspot 1: Sapphire Display */}
                <InteractiveHotspot
                  x={50}
                  y={34}
                  title="3,000 Nits Sapphire Crystal"
                  subtitle="Mohs hardness 9 crystal face with raised edge protection."
                  badge="Sapphire"
                  icon={Watch}
                  accentColor="#FF9F0A"
                  align="top"
                />

                {/* Hotspot 2: Titanium Crown */}
                <InteractiveHotspot
                  x={72}
                  y={44}
                  title="Tactile Titanium Crown"
                  subtitle="Micro-haptic rotation tuned for gloved and underwater navigation."
                  badge="Control"
                  icon={Radio}
                  accentColor="#FF9F0A"
                  align="left"
                />

                {/* Hotspot 3: Alpine Trail Weave */}
                <InteractiveHotspot
                  x={65}
                  y={74}
                  title="Alpine Trail Weave"
                  subtitle="Corrosion-resistant high-tenacity yarn with titanium G-hook clasp."
                  badge="Band"
                  icon={Layers}
                  accentColor="#FF9F0A"
                  align="left"
                />

                <Image
                  src={products[2].image}
                  alt={products[2].name}
                  fill
                  className="object-contain drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)] hover:scale-103 transition-transform duration-700 animate-float-slow"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE SPEC COMPARISON MATRIX
          ========================================================================= */}
      <SpecComparisonMatrix onSelectProduct={setSelectedProduct} />

      {/* =========================================================================
          TECHNOLOGY SECTION // PIONEERING MATERIAL SCIENCE
          ========================================================================= */}
      <section id="technology" className="py-28 bg-[#050811] border-b border-white/[0.08]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-[11px] font-mono tracking-widest text-[#2997FF] uppercase block">
              PIONEERING MATERIAL SCIENCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
              The Technology Behind VOLT
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Every curve, alloy, and driver is custom-engineered without off-the-shelf compromises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#2997FF]/15 border border-[#2997FF]/30 flex items-center justify-center text-[#2997FF]">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">3nm Custom Silicon</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Hyper-efficient microscopic node architectures delivering extreme computing density while staying cool to the touch.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#38BDF8]/15 border border-[#38BDF8]/30 flex items-center justify-center text-[#38BDF8]">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Acoustic Beryllium</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Lightweight yet extraordinarily rigid transducers eliminating harmonic distortion across the human audible spectrum.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF9F0A]/15 border border-[#FF9F0A]/30 flex items-center justify-center text-[#FF9F0A]">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-white">Grade 5 Metallurgy</h3>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                Aerospace titanium precision-milled with sub-millimeter caliper tolerances for legendary endurance in every environment.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          ABOUT SECTION // OUR STORY
          ========================================================================= */}
      <section id="about" className="py-28 bg-[#070A14] border-b border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <span className="text-[11px] font-mono tracking-widest text-[#2997FF] uppercase block">
            MANIFIESTO // DIGITAL SHOWROOM
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Engineering Without Compromise.
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            VOLT was founded on a singular conviction: consumer electronics should not be disposable commodities. We engineer tools at the intersection of raw performance, industrial sculpture, and tactile delight.
          </p>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/[0.08] text-center font-mono">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">0.01mm</div>
              <div className="text-[11px] text-neutral-500 mt-1">Machining Tolerance</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-[#2997FF]">100%</div>
              <div className="text-[11px] text-neutral-500 mt-1">Recycled Rare Earths</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white">3 Flagships</div>
              <div className="text-[11px] text-neutral-500 mt-1">Zero Clutter Focus</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE 3D MODAL (360 DEGREE HARDWARE EXPLODED CANVAS)
          ========================================================================= */}
      {show3DViewerModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#090D18] border border-white/15 rounded-3xl p-6 shadow-2xl">
            <button
              type="button"
              onClick={() => setShow3DViewerModal(false)}
              aria-label="Close 3D Viewer"
              className="absolute top-5 left-5 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors focus-visible:ring-2 focus-visible:ring-[#2997FF]"
            >
              <X className="w-5 h-5" />
            </button>
            <Interactive3DViewer initialColor="#9A958D" />
          </div>
        </div>
      )}

      {/* =========================================================================
          PRODUCT DETAIL MODAL (SPECS & ADD TO BAG)
          ========================================================================= */}
      <VoltProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)}
        onOpen3DViewer={() => setShow3DViewerModal(true)}
      />

    </div>
  );
}
