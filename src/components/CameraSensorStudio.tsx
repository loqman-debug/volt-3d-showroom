'use client';

import React, { useState } from 'react';
import { Camera, Aperture, SunMedium, Moon, Eye, Focus, ZoomIn } from 'lucide-react';
import Link from 'next/link';

interface LensMode {
  id: string;
  name: string;
  focal: string;
  aperture: string;
  sensor: string;
  zoom: string;
  image: string;
  desc: string;
}

const LENSES: LensMode[] = [
  {
    id: 'ultra-wide',
    name: 'العدسة فائقة الاتساع',
    focal: '13mm',
    aperture: 'f/2.2',
    sensor: '1/2.55" Dual Pixel',
    zoom: '0.5x',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    desc: 'مجال رؤية 120 درجة مع تصحيح ذكي لتشوه الحواف لالتقاط المناظر والمدن',
  },
  {
    id: 'main-sensor',
    name: 'المستشعر الأساسي 200MP',
    focal: '24mm',
    aperture: 'f/1.6',
    sensor: '1/1.14" 16-in-1 Super Pixel',
    zoom: '1x',
    image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
    desc: 'عملاق التصوير بدقة 200 مليون بكسل مع تثبيت بصري ثنائي OIS من الجيل الخامس',
  },
  {
    id: 'telephoto-3x',
    name: 'عدسة البورتريه السينمائي',
    focal: '75mm',
    aperture: 'f/2.4',
    sensor: '1/2.7" Pro Bokeh',
    zoom: '3x',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
    desc: 'عزل طبيعي استثنائي لخلفية الصور مع إبراز ملامح الوجه بألوان واقعية',
  },
  {
    id: 'periscope-10x',
    name: 'منظار التقريب البيريسكوبي',
    focal: '240mm',
    aperture: 'f/3.4',
    sensor: '1/3.2" Prism Mirror OIS',
    zoom: '10x البصري (100x فائق)',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    desc: 'تقريب بصري ميكانيكي حقيقي يجلب أبعد التفاصيل بوضوح نقي دون أي تشويش رقمي',
  },
];

export default function CameraSensorStudio() {
  const [activeLens, setActiveLens] = useState<LensMode>(LENSES[1]);
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const [isRawMode, setIsRawMode] = useState<boolean>(false);

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top telemetry bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono font-bold mb-1">
            <Camera className="w-3.5 h-3.5" />
            <span>OPTICS LAB // 200MP TELEMETRY</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            استوديو محاكاة البصريات والكاميرا الاحترافية
          </h3>
        </div>

        {/* Telemetry modes */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setIsNightMode(!isNightMode)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              isNightMode
                ? 'bg-amber-400/20 border-amber-400/50 text-amber-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            {isNightMode ? <Moon className="w-3.5 h-3.5" /> : <SunMedium className="w-3.5 h-3.5" />}
            <span>وضع الرؤية الليلية 0.001 Lux</span>
          </button>

          <button
            type="button"
            onClick={() => setIsRawMode(!isRawMode)}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 ${
              isRawMode
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:text-white'
            }`}
          >
            <Focus className="w-3.5 h-3.5" />
            <span>16-bit ProRAW</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Viewfinder / Camera Simulation Canvas */}
        <div className="lg:col-span-7">
          <div className="relative rounded-2xl overflow-hidden aspect-16/10 border border-slate-700 bg-slate-950 shadow-inner group">
            {/* Simulated photo feed */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeLens.image}
              alt={activeLens.name}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isNightMode ? 'brightness-125 contrast-110 saturate-125' : ''
              } ${isRawMode ? 'contrast-105' : ''}`}
            />

            {/* Viewfinder HUD Overlays */}
            <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/70">
              {/* Top HUD */}
              <div className="flex items-center justify-between font-mono text-[11px] text-white/80">
                <div className="flex items-center gap-3">
                  <span className="bg-red-500 text-white px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider">
                    REC
                  </span>
                  <span>4K 120fps Dolby Vision</span>
                </div>
                <div>ISO {isNightMode ? '12,800' : '64'} • 1/4000s</div>
              </div>

              {/* Viewfinder crosshairs */}
              <div className="self-center w-20 h-20 border border-white/30 rounded-lg relative flex items-center justify-center">
                <div className="w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400 absolute top-0 left-0" />
                <div className="w-2.5 h-2.5 border-t-2 border-r-2 border-sky-400 absolute top-0 right-0" />
                <div className="w-2.5 h-2.5 border-b-2 border-l-2 border-sky-400 absolute bottom-0 left-0" />
                <div className="w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400 absolute bottom-0 right-0" />
                <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-ping" />
              </div>

              {/* Bottom HUD info */}
              <div className="flex items-center justify-between font-mono text-[11px] text-white/90 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <div className="flex items-center gap-3">
                  <span className="text-sky-400 font-bold">{activeLens.zoom}</span>
                  <span>{activeLens.focal}</span>
                  <span>{activeLens.aperture}</span>
                </div>
                <div className="text-slate-300 truncate max-w-48 sm:max-w-none">
                  {activeLens.sensor}
                </div>
              </div>
            </div>
          </div>

          {/* Focal Length Selector Dial */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {LENSES.map((lens) => (
              <button
                key={lens.id}
                type="button"
                onClick={() => setActiveLens(lens)}
                className={`p-3 rounded-xl border text-center transition-all ${
                  activeLens.id === lens.id
                    ? 'bg-sky-500/15 border-sky-400 text-white shadow-md shadow-sky-500/20'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <div className="text-xs font-mono font-bold text-sky-400">{lens.zoom}</div>
                <div className="text-[11px] font-semibold text-slate-300 mt-0.5">{lens.focal}</div>
                <div className="text-[10px] text-slate-500 hidden sm:block">{lens.aperture}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Details & Technical Explanation */}
        <div className="lg:col-span-5 text-right space-y-5 lg:pr-6 lg:border-r lg:border-slate-800">
          <div className="p-1 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-500 inline-block">
            <span className="block px-3 py-1 bg-slate-950 rounded-xl text-sky-400 text-xs font-bold font-mono">
              عدسة نشطة: {activeLens.name}
            </span>
          </div>

          <h4 className="text-2xl font-black text-white">
            {activeLens.name} ({activeLens.focal})
          </h4>

          <p className="text-sm text-slate-400 leading-relaxed">
            {activeLens.desc}
          </p>

          {/* Detailed Sensor Specs Matrix */}
          <div className="space-y-2.5 pt-2">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
              <span className="text-slate-400">حجم المستشعر:</span>
              <span className="text-white font-bold">{activeLens.sensor}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
              <span className="text-slate-400">فتحة العدسة المادية:</span>
              <span className="text-sky-400 font-bold">{activeLens.aperture}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
              <span className="text-slate-400">نظام التثبيت:</span>
              <span className="text-emerald-400 font-bold">OIS Dual-Axis Sensor Shift</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs font-mono">
              <span className="text-slate-400">سرعة التركيز البؤري:</span>
              <span className="text-white font-bold">0.03 ثانية (Laser LiDAR)</span>
            </div>
          </div>

          <div className="pt-3">
            <Link
              href="/products/p-flagship-01"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-sky-500/20"
            >
              <ZoomIn className="w-4 h-4" />
              <span>استكشف عينات الصور الكاملة للهاتف</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
