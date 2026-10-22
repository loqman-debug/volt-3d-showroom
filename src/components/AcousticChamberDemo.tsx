'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Radio, Sparkles, Disc3 } from 'lucide-react';
import Link from 'next/link';

export default function AcousticChamberDemo() {
  const [isAncActive, setIsAncActive] = useState<boolean>(true);
  const [spatialMode, setSpatialMode] = useState<'stereo' | 'spatial' | 'hi-res'>('spatial');
  const [volume, setVolume] = useState<number>(75);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated sound waves on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      // Base ambient noise wave (cancelled if ANC is active)
      if (!isAncActive) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // Red ambient noise
        ctx.lineWidth = 1.5;
        for (let x = 0; x < width; x += 2) {
          const noise = (Math.sin(x * 0.08 + phase * 2) + Math.cos(x * 0.15 - phase)) * 14;
          const y = centerY + noise;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Main pristine Hi-Fi audio wave
      const waveCount = spatialMode === 'hi-res' ? 4 : spatialMode === 'spatial' ? 3 : 2;
      const primaryColors = isAncActive
        ? ['#0284c7', '#38bdf8', '#818cf8', '#a855f7']
        : ['#94a3b8', '#64748b', '#cbd5e1'];

      for (let i = 0; i < waveCount; i++) {
        ctx.beginPath();
        ctx.strokeStyle = primaryColors[i % primaryColors.length];
        ctx.lineWidth = 2.5 - i * 0.4;
        const amp = (volume / 100) * (28 - i * 6);
        const freq = 0.02 + i * 0.008;

        for (let x = 0; x < width; x += 2) {
          const y = centerY + Math.sin(x * freq + phase + i * 1.2) * amp * Math.sin((x / width) * Math.PI);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      phase += isAncActive ? 0.06 : 0.03;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isAncActive, spatialMode, volume]);

  return (
    <div className="bg-[#0b1329] text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left/Main interactive sound visualization */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Acoustic Lab // SonicPulse Studio
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="text-slate-500">العزل الهجين:</span>
              <span className={isAncActive ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                {isAncActive ? '-48dB نشط (عزل فائق)' : 'معطل (وضع الشفافية)'}
              </span>
            </div>
          </div>

          {/* Canvas Waveform Display */}
          <div className="relative bg-slate-950/80 rounded-2xl p-4 border border-slate-800/80 backdrop-blur-md">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2 px-1">
              <span>20Hz (Sub-Bass)</span>
              <span>1kHz (Vocal Mid)</span>
              <span>40kHz (Hi-Res Ultra)</span>
            </div>

            <canvas
              ref={canvasRef}
              width={640}
              height={140}
              className="w-full h-32 rounded-lg bg-slate-900/40"
            />

            <div className="flex items-center justify-between mt-3 text-xs">
              <div className="flex items-center gap-2 text-slate-400">
                <Radio className="w-3.5 h-3.5 text-sky-400 animate-spin" />
                <span>بروتوكول بث: LDAC 990kbps 24-bit/96kHz</span>
              </div>
              <div className="font-mono text-sky-400 text-xs">
                {spatialMode === 'hi-res' ? 'DSEE Ultimate 3.0' : spatialMode === 'spatial' ? 'Spatial 360° Audio' : 'Pure Lossless'}
              </div>
            </div>
          </div>

          {/* Interactive Control Deck */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* ANC Toggle button */}
            <button
              type="button"
              onClick={() => setIsAncActive(!isAncActive)}
              className={`p-3.5 rounded-xl border text-right transition-all flex items-center justify-between ${
                isAncActive
                  ? 'bg-sky-500/10 border-sky-500/40 text-white'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <div>
                <div className="text-xs font-bold">عزل الضوضاء النشط (ANC)</div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {isAncActive ? 'تم كتم الضجيج المحيط بنسبة 99.4%' : 'انقر لتفعيل العزل الفوري'}
                </div>
              </div>
              <div className={`p-2 rounded-lg ${isAncActive ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-500'}`}>
                {isAncActive ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </div>
            </button>

            {/* Spatial Mode Selector */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-2 flex items-center justify-around">
              {(['stereo', 'spatial', 'hi-res'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setSpatialMode(mode)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold transition-all ${
                    spatialMode === mode
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {mode === 'stereo' && 'ستيريو'}
                  {mode === 'spatial' && 'صوت محيطي 360°'}
                  {mode === 'hi-res' && 'Hi-Res Lossless'}
                </button>
              ))}
            </div>
          </div>

          {/* Volume slider */}
          <div className="flex items-center gap-3 bg-slate-950/60 border border-slate-800/60 rounded-xl px-4 py-2.5">
            <Volume2 className="w-4 h-4 text-slate-400 shrink-0" />
            <input
              type="range"
              min="20"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-sky-400"
            />
            <span className="text-xs font-mono text-sky-400 w-10 text-left shrink-0">
              {volume}%
            </span>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 text-right space-y-5 lg:pr-6 lg:border-r lg:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>تجربة صوتية سينمائية استثنائية</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-snug">
            SonicPulse Studio ANC
            <span className="block text-sky-400 text-lg font-bold mt-1">
              مكبرات بريليوم 45mm مع معالج صوتي مخصص
            </span>
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed">
            ليست مجرد سماعة رأس تقليدية، بل استوديو صوتي متكامل على رأسك. تم ضبط منحنى الاستجابة الصوتية بموجب معايير هارمان الدقيقة لنقاء لا يضاهى في طبقات البيس والتريبل.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] text-slate-500">عمر البطارية الفعلي</div>
              <div className="text-base font-bold text-white mt-0.5">60 ساعة تشغيل</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] text-slate-500">تقنية الشحن السريع</div>
              <div className="text-base font-bold text-sky-400 mt-0.5">10 دقائق = 8 ساعات</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Link
              href="/products/p-audio-01"
              className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center gap-2"
            >
              <Disc3 className="w-4 h-4" />
              <span>استعراض هندسة الصوت بالكامل</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
