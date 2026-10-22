'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Cpu, 
  Camera, 
  Volume2, 
  Thermometer, 
  Sparkles, 
  Sliders, 
  Play,
  Pause,
  ArrowLeft,
  Zap,
  Activity,
  Layers
} from 'lucide-react';

export default function AppleBentoGrid() {
  // 1. Chip Frequency benchmark slider
  const [clockSpeed, setClockSpeed] = useState(3.4); // GHz
  const tflops = (clockSpeed * 4.2).toFixed(1);
  const fps = Math.round(clockSpeed * 32);

  // 2. Camera Before / After comparison slider
  const [sliderPos, setSliderPos] = useState(50); // percentage

  // 3. Audio Visualizer toggle
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);

  // 4. Vapor Chamber Thermal gauge
  const [turboCooling, setTurboCooling] = useState(true);
  const temp = turboCooling ? 29 : 45;

  return (
    <div className="py-24 sm:py-32 bg-[#000000] text-white overflow-hidden relative">
      
      {/* Background ambient keynote spotlights */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#2997FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-[#BF5AF2]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#2997FF] text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>هندسة الجيل الجديد • Next-Gen Architecture</span>
          </div>
          
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
            قفزات تقنية لا مثيل لها في كل تفصيلة
          </h2>
          
          <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            استكشف قدرات معمارية 3 نانومتر، ونظام التبريد السائل، وحساس التصوير الليلي 200MP مع تفاعلات حية ومحاكاة فورية.
          </p>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Bento Card 1: 3nm Silicon Architecture & Live Benchmark (7 cols, large focus) */}
          <div className="md:col-span-7 bg-[#161617] rounded-[32px] border border-white/10 hover:border-white/20 p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 group relative overflow-hidden">
            
            {/* Subtle top laser scan line animation */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#2997FF] to-transparent opacity-50" />
            
            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-white text-xs font-semibold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#2997FF]" />
                  <span>معمارية السيليكون 3 نانومتر</span>
                </span>
                
                <span className="text-xs font-mono text-[#30D158] font-semibold bg-[#30D158]/10 border border-[#30D158]/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#30D158] animate-ping" />
                  كفاءة طاقة +45%
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                شريحة Orion X1 Bionic الخارقة
              </h3>
              
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                تحكم بتردد النوى الفائقة لمشاهدة القوة الحسابية الحية ومعدل الإطارات في الألعاب الثقيلة فورياً.
              </p>

              {/* Interactive Benchmark Controls */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0A0A0C] border border-white/10 space-y-5">
                <div className="flex items-center justify-between text-xs font-medium text-neutral-300">
                  <span className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-[#2997FF]" />
                    <span>تردد المعالج:</span>
                  </span>
                  <span className="text-base font-bold text-[#2997FF] font-mono tracking-tight">
                    {clockSpeed} GHz Turbo
                  </span>
                </div>

                <div className="relative py-1">
                  <input
                    type="range"
                    min={1.5}
                    max={3.8}
                    step={0.1}
                    value={clockSpeed}
                    onChange={(e) => setClockSpeed(Number(e.target.value))}
                    className="w-full accent-[#2997FF] cursor-pointer h-2 bg-neutral-800 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-2">
                    <span>1.5 GHz (توفير فائق)</span>
                    <span>2.6 GHz (متوازن)</span>
                    <span>3.8 GHz (أقصى أداء)</span>
                  </div>
                </div>

                {/* Live Gauges */}
                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/5">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="text-[11px] text-neutral-400 mb-1">القوة الرسومية</div>
                    <div className="text-base sm:text-lg font-bold text-white font-mono">{tflops} <span className="text-xs text-neutral-500">TFLOPS</span></div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="text-[11px] text-neutral-400 mb-1">معدل الإطارات</div>
                    <div className="text-base sm:text-lg font-bold text-[#30D158] font-mono">{fps} <span className="text-xs text-neutral-500">FPS</span></div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-center">
                    <div className="text-[11px] text-neutral-400 mb-1">زمن الاستجابة</div>
                    <div className="text-base sm:text-lg font-bold text-[#2997FF] font-mono">1.8 <span className="text-xs text-neutral-500">ms</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-neutral-500 border-t border-white/5 mt-6">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#30D158]" />
                محاكاة لمعايير Geekbench 6
              </span>
              <Link href="/products/laptop-01" className="text-[#2997FF] font-medium hover:underline flex items-center gap-1 group">
                <span>استكشف أجهزة الشريحة</span>
                <span className="transition-transform group-hover:-translate-x-1">←</span>
              </Link>
            </div>
          </div>

          {/* Bento Card 2: 200MP Camera Interactive Night Split (5 cols) */}
          <div className="md:col-span-5 bg-[#161617] rounded-[32px] border border-white/10 hover:border-white/20 p-7 sm:p-9 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="px-3.5 py-1 rounded-full bg-[#FF375F]/10 border border-[#FF375F]/20 text-[#FF375F] text-xs font-semibold flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  مستشعر 200MP Ultra
                </span>
                <span className="text-xs text-neutral-400 font-mono">تقريب بصري 10x</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                التصوير الليلي فائق النقاء
              </h3>
              
              <p className="text-sm text-neutral-400 mb-5 leading-relaxed">
                اسحب المؤشر لمقارنة وضوح التفاصيل ونقاء الألوان في الإضاءة الخافتة.
              </p>

              {/* Interactive Before/After Split */}
              <div className="relative h-48 rounded-2xl overflow-hidden bg-black border border-white/10 select-none shadow-inner">
                {/* After (Clear Night Mode) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B1E3B] via-[#091528] to-[#150A26] flex items-center justify-center">
                  <div className="text-center p-4">
                    <span className="inline-block text-xs font-bold text-[#2997FF] mb-1.5 bg-[#2997FF]/15 px-3 py-1 rounded-full border border-[#2997FF]/30">
                      وضع Ultra Night Mode 200MP
                    </span>
                    <p className="text-xs text-neutral-200">ألوان حية وتفاصيل دقيقة دون تشويش رقمي</p>
                  </div>
                </div>

                {/* Before (Darker overlay clipped by slider) */}
                <div
                  className="absolute inset-y-0 right-0 bg-[#050505]/95 border-l-2 border-[#2997FF] flex items-center justify-center overflow-hidden transition-none"
                  style={{ width: `${100 - sliderPos}%` }}
                >
                  <div className="text-center p-4 opacity-50">
                    <span className="text-xs font-semibold text-neutral-400 block mb-1">تصوير قياسي</span>
                    <p className="text-xs text-neutral-500">إضاءة منخفضة وتفاصيل محجوبة</p>
                  </div>
                </div>

                {/* Invisible slider input for interaction */}
                <input
                  type="range"
                  min={10}
                  max={90}
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
                  aria-label="مقارنة التصوير الليلي"
                />

                {/* Visual handle */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 pointer-events-none w-8 h-8 rounded-full bg-white text-black shadow-lg shadow-black/80 flex items-center justify-center text-xs font-bold z-10"
                  style={{ right: `calc(${100 - sliderPos}% - 16px)` }}
                >
                  ↔
                </div>
              </div>
            </div>

            <div className="text-xs text-neutral-400 pt-5 flex items-center justify-between border-t border-white/5 mt-5">
              <span>فتحة عدسة f/1.7 مع مانع اهتزاز OIS</span>
              <span className="text-[#2997FF] font-semibold">اسحب للمقارنة</span>
            </div>
          </div>

          {/* Bento Card 3: 3D Spatial Audio & Interactive Waveform (6 cols) */}
          <div className="md:col-span-6 bg-[#161617] rounded-[32px] border border-white/10 hover:border-white/20 p-7 sm:p-9 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#2997FF]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#2997FF] text-xs font-semibold flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  الصوت المكاني 3D Spatial Audio
                </span>

                <button
                  type="button"
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#2997FF] text-white text-xs font-medium hover:bg-[#0077ED] transition-all cursor-pointer shadow-md shadow-blue-500/20"
                >
                  {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingAudio ? 'إيقاف النبض' : 'تشغيل التردد'}</span>
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                نقاء استوديو استثنائي مع عزل 48dB
              </h3>
              
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                محركات تيتانيوم 45 مم تدعم ترميز LDAC و Hi-Res Audio لتوزيع النغمات حولك في مساحة كروية متطورة.
              </p>

              {/* Animated Waveform Equalizer */}
              <div className="flex items-end justify-between h-24 bg-[#0A0A0C] rounded-2xl p-4 border border-white/10 gap-1.5 sm:gap-2">
                {[45, 80, 60, 95, 70, 85, 50, 100, 75, 90, 55, 95, 65, 80, 45, 85, 60].map((height, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-full transition-all duration-300 ${
                      isPlayingAudio
                        ? 'bg-gradient-to-t from-[#0071E3] to-[#2997FF] shadow-sm shadow-[#2997FF]/50'
                        : 'bg-neutral-800'
                    }`}
                    style={{
                      height: isPlayingAudio ? `${Math.min(100, Math.max(15, height + Math.sin(i * 1.2) * 25))}%` : '15%',
                      transitionDelay: `${i * 20}ms`
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-neutral-400 border-t border-white/5 mt-6">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2997FF] animate-pulse" />
                تتبع ديناميكي لحركة الرأس
              </span>
              <Link href="/products/audio-01" className="text-[#2997FF] hover:underline font-medium flex items-center gap-1 group">
                <span>استكشف سماعات ستوديو</span>
                <span className="transition-transform group-hover:-translate-x-1">←</span>
              </Link>
            </div>
          </div>

          {/* Bento Card 4: Vapor Chamber Cooling & Thermal Gauge (6 cols) */}
          <div className="md:col-span-6 bg-[#161617] rounded-[32px] border border-white/10 hover:border-white/20 p-7 sm:p-9 flex flex-col justify-between transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <span className="px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold flex items-center gap-2">
                  <Thermometer className="w-4 h-4" />
                  غرفة البخار المزدوجة Dual Vapor Chamber
                </span>

                <button
                  type="button"
                  onClick={() => setTurboCooling(!turboCooling)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    turboCooling 
                      ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20' 
                      : 'bg-white/10 text-neutral-300 hover:bg-white/15'
                  }`}
                >
                  {turboCooling ? 'وضع التبريد الفائق مفعل ❄️' : 'تفعيل التبريد الفائق'}
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
                استقرار حراري حتى في أطول جلسات اللعب
              </h3>
              
              <p className="text-sm text-neutral-400 leading-relaxed mb-6">
                أنابيب نحاسية ثلاثية مع سائل تبريد فائق الامتصاص يبدد الحرارة 3 مرات أسرع للحفاظ على أقصى أداء مستمر.
              </p>

              {/* Thermal Gauge Card */}
              <div className="p-5 rounded-2xl bg-[#0A0A0C] border border-white/10 flex items-center justify-between flex-wrap gap-4">
                <div>
                  <div className="text-xs text-neutral-400 mb-1">درجة حرارة النواة الحالية:</div>
                  <div className={`text-3xl sm:text-4xl font-bold font-mono transition-colors tracking-tight ${
                    turboCooling ? 'text-cyan-400' : 'text-amber-400'
                  }`}>
                    {temp}°C <span className="text-xs text-neutral-400 font-normal ms-1">حرارة مثالية</span>
                  </div>
                </div>

                <div className="text-end">
                  <span className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-bold ${
                    turboCooling ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-300' : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                  }`}>
                    {turboCooling ? 'تبريد نانوي نشط' : 'تبريد اعتيادي'}
                  </span>
                  <div className="text-xs text-neutral-500 font-mono mt-1.5">مساحة التبريد 4,800 مم²</div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex items-center justify-between text-xs text-neutral-400 border-t border-white/5 mt-6">
              <span>ثبات الأداء بنسبة 98% بعد ساعتين ضغط</span>
              <span className="text-[#2997FF] font-semibold">مدمج في تايتان برو</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
