'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Heart, Compass, Activity, Shield, Sparkles, Watch } from 'lucide-react';
import Link from 'next/link';

export default function BiometricWatchDemo() {
  const [activeScreen, setActiveScreen] = useState<'ecg' | 'depth' | 'compass'>('ecg');
  const [bpm, setBpm] = useState<number>(72);
  const [crownAngle, setCrownAngle] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated ECG heartbeat wave
  useEffect(() => {
    if (activeScreen !== 'ecg') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const cy = h / 2;

      ctx.beginPath();
      ctx.strokeStyle = '#22c55e'; // Green ECG
      ctx.lineWidth = 2.5;

      for (let x = 0; x < w; x++) {
        const progress = (x + t * 2) % 180;
        let yOffset = 0;

        // P-Q-R-S-T wave pulse
        if (progress > 60 && progress < 68) yOffset = -8; // P
        else if (progress >= 68 && progress < 73) yOffset = 4; // Q
        else if (progress >= 73 && progress < 82) yOffset = -38; // R peak
        else if (progress >= 82 && progress < 88) yOffset = 18; // S
        else if (progress >= 95 && progress < 110) yOffset = -12; // T

        const y = cy + yOffset;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      t += 1;
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeScreen, bpm]);

  const rotateCrown = (delta: number) => {
    setCrownAngle((prev) => (prev + delta) % 360);
    // Cycle screens when turning crown
    if (Math.abs(delta) > 15) {
      setActiveScreen((prev) =>
        prev === 'ecg' ? 'depth' : prev === 'depth' ? 'compass' : 'ecg'
      );
    }
  };

  return (
    <div className="bg-[#080d1a] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Watch Face Interactive Display */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Watch Case Frame (Aerospace Titanium) */}
            <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-linear-to-b from-slate-700 via-slate-800 to-slate-900 p-3 shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-slate-600 relative flex items-center justify-center">
              
              {/* Bezel orange dive accent */}
              <div className="absolute inset-2 rounded-full border-2 border-dashed border-amber-500/40 pointer-events-none" />

              {/* Digital Crown on the side */}
              <button
                type="button"
                onClick={() => rotateCrown(30)}
                title="أدر التاج الرقمي لتغيير الشاشة"
                className="absolute -left-3 top-1/3 -translate-y-1/2 w-4 h-14 bg-linear-to-r from-amber-500 to-amber-600 rounded-sm border border-amber-400 shadow-md cursor-pointer hover:brightness-110 active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
              >
                <div className="w-2.5 h-0.5 bg-amber-900 rounded" />
                <div className="w-2.5 h-0.5 bg-amber-900 rounded" />
                <div className="w-2.5 h-0.5 bg-amber-900 rounded" />
              </button>

              {/* OLED Screen */}
              <div className="w-full h-full rounded-full bg-black border border-slate-800 overflow-hidden relative flex flex-col items-center justify-center p-6 text-center select-none">
                
                {/* Screen 1: ECG Pulse */}
                {activeScreen === 'ecg' && (
                  <div className="space-y-2 w-full animate-fadeIn">
                    <div className="flex items-center justify-center gap-1.5 text-rose-500">
                      <Heart className="w-5 h-5 fill-rose-500 animate-pulse" />
                      <span className="text-2xl font-black font-mono text-white">{bpm}</span>
                      <span className="text-[10px] text-slate-400 font-mono">BPM</span>
                    </div>

                    {/* ECG Canvas */}
                    <canvas
                      ref={canvasRef}
                      width={220}
                      height={60}
                      className="w-full h-14 bg-slate-950 rounded-lg mx-auto"
                    />

                    <div className="text-[10px] font-mono text-emerald-400">
                      نظم جيبي طبيعي • قياس مستمر
                    </div>

                    <div className="flex justify-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
                      <span>SpO2: <b className="text-white">99%</b></span>
                      <span>•</span>
                      <span>درجة الحرارة: <b className="text-white">36.6°</b></span>
                    </div>
                  </div>
                )}

                {/* Screen 2: Titanium Depth Gauge */}
                {activeScreen === 'depth' && (
                  <div className="space-y-2 animate-fadeIn">
                    <div className="text-[11px] font-mono text-cyan-400 tracking-wider">
                      DIVE SENSOR EN13319
                    </div>
                    <div className="text-4xl font-black font-mono text-cyan-300">
                      -42.5<span className="text-sm font-normal text-slate-400">m</span>
                    </div>
                    <div className="text-[10px] text-slate-400">
                      أقصى عمق: 100 متر • درجة حرارة الماء: 21°C
                    </div>
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
                      <div className="w-3/5 h-full bg-cyan-400 rounded-full" />
                    </div>
                  </div>
                )}

                {/* Screen 3: GPS Compass */}
                {activeScreen === 'compass' && (
                  <div className="space-y-2 animate-fadeIn">
                    <Compass className="w-8 h-8 text-amber-400 mx-auto animate-spin" />
                    <div className="text-2xl font-black font-mono text-white">
                      315° <span className="text-amber-400 text-lg">شمال غرب</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      24°42&apos;49&quot;N 46°40&apos;31&quot;E • ارتفاع 612m
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      GPS مزدوج التردد L1 + L5
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Screen Mode Switcher */}
          <div className="flex items-center gap-2 mt-4 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveScreen('ecg')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeScreen === 'ecg'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              تخطيط القلب ECG
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen('depth')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeScreen === 'depth'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              مقياس الغوص (Depth)
            </button>
            <button
              type="button"
              onClick={() => setActiveScreen('compass')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeScreen === 'compass'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              البوصلة والملاحة
            </button>
          </div>
          <span className="text-[11px] text-slate-500 mt-2">
            💡 انقر على التاج البرتقالي أو الأزرار للتنقل بين واجهات الساعة
          </span>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-6 text-right space-y-5 lg:pr-6 lg:border-r lg:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ساعة المغامرات والرياضات القاسية</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            ChronoMax Ultra Titanium
            <span className="block text-emerald-400 text-lg font-bold mt-1">
              هيكل تيتانيوم 49mm مع زجاج ياقوتي مقاوم للخدش
            </span>
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed">
            صُممت لتحمل أقصى الظروف المناخية من قمم الجبال الجليدية إلى أعماق المحيطات. شاشة سطوع 3,000 شمعة واضحة تحت أشعة الشمس المباشرة، مع مستشعرات صحية وحيوية رائدة.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] text-slate-500">مقاومة الماء والضغط</div>
              <div className="text-base font-bold text-white mt-0.5">WR100 • معتمدة للغوص</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] text-slate-500">البطارية في وضع التوفير</div>
              <div className="text-base font-bold text-emerald-400 mt-0.5">72 ساعة متواصلة</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Link
              href="/products/p-watch-01"
              className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-emerald-500/25 flex items-center gap-2"
            >
              <Watch className="w-4 h-4" />
              <span>استعراض مواصفات الساعة بالكامل</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
