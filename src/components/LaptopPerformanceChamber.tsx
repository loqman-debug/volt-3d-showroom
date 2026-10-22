'use client';

import React, { useState } from 'react';
import { Cpu, Wind, Sun, Zap, Sparkles, Laptop, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function LaptopPerformanceChamber() {
  const [fanBoost, setFanBoost] = useState<number>(45); // 0 to 100%
  const [screenNits, setScreenNits] = useState<number>(1000); // 500 to 1600 nits
  const [workload, setWorkload] = useState<'cinema' | 'ai' | 'code'>('ai');

  // Computed metrics based on interactive controls
  const rpm = Math.round(1800 + (fanBoost / 100) * 4400);
  const tempCelsius = Math.max(38, Math.round(78 - (fanBoost / 100) * 32));
  const tflops = ((fanBoost / 100) * 14.8 + 24.2).toFixed(1);

  return (
    <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-bold mb-1">
            <Cpu className="w-3.5 h-3.5" />
            <span>THERMAL & SILICON LAB // APEXBOOK PRO</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            مختبر هندسة التبريد والأداء الفائق لمعالج M4 Max
          </h3>
        </div>

        {/* Workload presets */}
        <div className="flex items-center gap-1.5 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setWorkload('ai'); setFanBoost(75); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              workload === 'ai'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            تدريب نماذج الذكاء الاصطناعي LLM
          </button>
          <button
            type="button"
            onClick={() => { setWorkload('cinema'); setFanBoost(90); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              workload === 'cinema'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            ريندر 8K ProRes ثلاثي الأبعاد
          </button>
          <button
            type="button"
            onClick={() => { setWorkload('code'); setFanBoost(20); }}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              workload === 'code'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            تطوير وبرمجة (وضع صامت 0dB)
          </button>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Thermal Telemetry & Simulated Fan Turbine */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800">
            <div className="grid grid-cols-3 gap-4 text-center font-mono">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">معدل دوران التوربين</div>
                <div className="text-xl sm:text-2xl font-black text-sky-400 mt-1">
                  {rpm} <span className="text-xs text-slate-400 font-normal">RPM</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">حرارة الأنوية Core Temp</div>
                <div className={`text-xl sm:text-2xl font-black mt-1 ${tempCelsius > 65 ? 'text-amber-400' : 'text-emerald-400'}`}>
                  {tempCelsius}°C
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                <div className="text-[10px] text-slate-500 uppercase">قوة المعالجة الرسومية</div>
                <div className="text-xl sm:text-2xl font-black text-purple-400 mt-1">
                  {tflops} <span className="text-xs text-slate-400 font-normal">TFLOPS</span>
                </div>
              </div>
            </div>

            {/* Simulated Dual Turbine Fans Animation */}
            <div className="flex items-center justify-around py-6 border-y border-slate-800/80 my-5">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-sky-400/40 relative flex items-center justify-center p-2 bg-slate-950">
                  <Wind
                    className="w-10 h-10 text-sky-400 transition-all"
                    style={{
                      animation: `spin ${Math.max(0.2, 2.5 - (fanBoost / 100) * 2.2)}s linear infinite`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400">توربين السحب الأيمن</span>
              </div>

              {/* Heat dissipation vapor chamber pipeline */}
              <div className="flex-1 max-w-xs mx-4">
                <div className="text-[11px] font-mono text-slate-400 text-center mb-1">
                  غرفة بخار نحاسية بمساحة 3,200mm²
                </div>
                <div className="h-3 bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-0.5">
                  <div
                    style={{ width: `${fanBoost}%` }}
                    className="h-full bg-linear-to-r from-emerald-400 via-sky-400 to-purple-500 rounded-full transition-all duration-300"
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-sky-400/40 relative flex items-center justify-center p-2 bg-slate-950">
                  <Wind
                    className="w-10 h-10 text-sky-400 transition-all"
                    style={{
                      animation: `spin ${Math.max(0.2, 2.5 - (fanBoost / 100) * 2.2)}s linear infinite`,
                    }}
                  />
                </div>
                <span className="text-[11px] font-mono text-slate-400">توربين الطرد الأيسر</span>
              </div>
            </div>

            {/* Fan Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400">تحكم بقوة التبريد اليدوي:</span>
                <span className="text-sky-400 font-mono">{fanBoost}% Boost</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={fanBoost}
                onChange={(e) => setFanBoost(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-sky-400"
              />
            </div>

            {/* Display Brightness Slider */}
            <div className="space-y-2 pt-4">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  سطوع شاشة Liquid Retina XDR:
                </span>
                <span className="text-amber-400 font-mono">{screenNits} Nits Peak HDR</span>
              </div>
              <input
                type="range"
                min="500"
                max="1600"
                step="50"
                value={screenNits}
                onChange={(e) => setScreenNits(Number(e.target.value))}
                className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 text-right space-y-5 lg:pr-6 lg:border-r lg:border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>الحاسوب المحمول الأقوى للمحترفين</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-snug">
            ApexBook Pro M4 Max
            <span className="block text-purple-400 text-lg font-bold mt-1">
              16 نواة معالجة مركزية • 40 نواة رسومية • 128GB موحدة
            </span>
          </h3>

          <p className="text-sm text-slate-400 leading-relaxed">
            كفاءة طاقة خارقة تتيح لك تشغيل أثقل نماذج الذكاء الاصطناعي وتصدير مقاطع الفيديو بدقة 8K دون حتى توصيل كابل الشاحن، بفضل معمارية السيليكون الموحدة بسرعة 400GB/s.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] text-slate-500">عمر البطارية أثناء العمل</div>
              <div className="text-base font-bold text-white mt-0.5">22 ساعة متواصلة</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
              <div className="text-[11px] text-slate-500">سرعة منافذ التوصيل</div>
              <div className="text-base font-bold text-purple-400 mt-0.5">Thunderbolt 5 (120Gbps)</div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end">
            <Link
              href="/products/p-laptop-01"
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-purple-600/25 flex items-center gap-2"
            >
              <Laptop className="w-4 h-4" />
              <span>استعراض عتاد الحاسوب والمنافذ</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
