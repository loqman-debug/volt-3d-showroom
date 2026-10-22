'use client';

import React, { useState } from 'react';
import { Ruler, Smartphone, Laptop, Tablet, Scale, Layers } from 'lucide-react';
import Link from 'next/link';

interface DeviceScaleProfile {
  id: string;
  name: string;
  category: string;
  heightMm: number;
  widthMm: number;
  thicknessMm: number;
  weightGrams: number;
  screenInch: number;
  bezelMm: number;
  material: string;
  aspectRatio: string;
}

const SCALE_DEVICES: DeviceScaleProfile[] = [
  {
    id: 'p-flagship-01',
    name: 'Titan Pro Ultra 5G',
    category: 'هاتف رائد',
    heightMm: 162.3,
    widthMm: 77.8,
    thicknessMm: 8.25,
    weightGrams: 221,
    screenInch: 6.8,
    bezelMm: 1.15,
    material: 'تيتانيوم الدرجة الخامسة مع زجاج درع نانوي',
    aspectRatio: '19.5:9',
  },
  {
    id: 'p-laptop-01',
    name: 'ApexBook Pro M4',
    category: 'حاسوب فائق',
    heightMm: 312.6,
    widthMm: 221.2,
    thicknessMm: 15.5,
    weightGrams: 1560,
    screenInch: 14.2,
    bezelMm: 3.5,
    material: 'ألومنيوم طيران أحادي الكتلة CNC',
    aspectRatio: '16:10',
  },
  {
    id: 'p-tablet-01',
    name: 'VisionPad Ultra Pro',
    category: 'جهاز لوحي',
    heightMm: 281.6,
    widthMm: 215.5,
    thicknessMm: 5.1,
    weightGrams: 579,
    screenInch: 13.0,
    bezelMm: 4.8,
    material: 'سبيكة ماغنيسيوم فائقة النحافة',
    aspectRatio: '4:3',
  },
  {
    id: 'p-audio-01',
    name: 'SonicPulse Studio ANC',
    category: 'سماعات استوديو',
    heightMm: 195.0,
    widthMm: 172.0,
    thicknessMm: 45.0,
    weightGrams: 345,
    screenInch: 0,
    bezelMm: 0,
    material: 'أقواس ستانلس ستيل مع وسائد جلد بروتيني',
    aspectRatio: 'Circular',
  },
];

export default function PhysicalScaleComparator() {
  const [deviceAId, setDeviceAId] = useState<string>('p-flagship-01');
  const [deviceBId, setDeviceBId] = useState<string>('p-tablet-01');
  const [viewMode, setViewMode] = useState<'frontal' | 'thickness'>('frontal');

  const devA = SCALE_DEVICES.find((d) => d.id === deviceAId) || SCALE_DEVICES[0];
  const devB = SCALE_DEVICES.find((d) => d.id === deviceBId) || SCALE_DEVICES[1];

  // Scale factor for rendering millimeter silhouette on canvas/SVG
  const scale = 0.95;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl relative overflow-hidden">
      {/* Decorative millimeter ruler grid background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-xs font-mono font-bold mb-1">
            <Ruler className="w-3.5 h-3.5 text-[#0284c7]" />
            <span>DIMENSION ARCHITECTURE // 1:1 SCALE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            مختبر الأبعاد والنسب الهندسية الحقيقية
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            قارن الحجم الفيزيائي، سُمك الحواف، ونسبة الشاشة إلى الهيكل بدقة المليمتر
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode('frontal')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'frontal'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المسقط الأمامي (الواجهة)
          </button>
          <button
            type="button"
            onClick={() => setViewMode('thickness')}
            className={`px-3.5 py-1.5 rounded-lg transition-all ${
              viewMode === 'thickness'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            المقطع العرضي (النحافة)
          </button>
        </div>
      </div>

      {/* Device selectors */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {/* Device A select */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">الجهاز الأول:</span>
          <select
            value={deviceAId}
            onChange={(e) => setDeviceAId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            {SCALE_DEVICES.map((d) => (
              <option key={d.id} value={d.id} disabled={d.id === deviceBId}>
                {d.name} ({d.category})
              </option>
            ))}
          </select>
        </div>

        {/* Device B select */}
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500">الجهاز الثاني:</span>
          <select
            value={deviceBId}
            onChange={(e) => setDeviceBId(e.target.value)}
            className="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500"
          >
            {SCALE_DEVICES.map((d) => (
              <option key={d.id} value={d.id} disabled={d.id === deviceAId}>
                {d.name} ({d.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Visual Comparator Arena */}
      <div className="relative z-10 bg-slate-950 text-white rounded-2xl p-6 sm:p-10 border border-slate-800 mb-8 min-h-[380px] flex items-center justify-center overflow-x-auto">
        {viewMode === 'frontal' ? (
          <div className="flex items-end justify-center gap-10 sm:gap-16 py-4 min-w-[500px]">
            {/* Device A Silhouette */}
            <div className="flex flex-col items-center">
              <div
                style={{
                  width: `${devA.widthMm * scale}px`,
                  height: `${devA.heightMm * scale}px`,
                }}
                className="relative rounded-2xl border-2 border-sky-400 bg-linear-to-b from-sky-950/60 to-slate-900/90 shadow-[0_0_30px_rgba(56,189,248,0.2)] flex flex-col items-center justify-between p-3 transition-all duration-500"
              >
                {/* Screen bezel outline */}
                <div
                  style={{ inset: `${devA.bezelMm * 2}px` }}
                  className="absolute border border-sky-400/30 rounded-xl pointer-events-none"
                />
                <span className="text-[10px] font-mono text-sky-400 bg-sky-950/80 px-2 py-0.5 rounded border border-sky-500/30">
                  {devA.screenInch > 0 ? `${devA.screenInch}"` : 'Acoustic'}
                </span>
                <span className="text-xs font-black text-center text-white px-1">
                  {devA.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {devA.heightMm}mm × {devA.widthMm}mm
                </span>
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-sky-400">{devA.name}</span>
                <div className="text-[11px] font-mono text-slate-400">{devA.weightGrams} جرام</div>
              </div>
            </div>

            {/* Scale divider symbol */}
            <div className="text-slate-600 font-mono text-sm self-center pb-8">
              VS
            </div>

            {/* Device B Silhouette */}
            <div className="flex flex-col items-center">
              <div
                style={{
                  width: `${devB.widthMm * scale}px`,
                  height: `${devB.heightMm * scale}px`,
                }}
                className="relative rounded-2xl border-2 border-indigo-400 bg-linear-to-b from-indigo-950/60 to-slate-900/90 shadow-[0_0_30px_rgba(129,140,248,0.2)] flex flex-col items-center justify-between p-3 transition-all duration-500"
              >
                {/* Screen bezel outline */}
                <div
                  style={{ inset: `${devB.bezelMm * 2}px` }}
                  className="absolute border border-indigo-400/30 rounded-xl pointer-events-none"
                />
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                  {devB.screenInch > 0 ? `${devB.screenInch}"` : 'Acoustic'}
                </span>
                <span className="text-xs font-black text-center text-white px-1">
                  {devB.name}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {devB.heightMm}mm × {devB.widthMm}mm
                </span>
              </div>
              <div className="mt-3 text-center">
                <span className="text-xs font-bold text-indigo-400">{devB.name}</span>
                <div className="text-[11px] font-mono text-slate-400">{devB.weightGrams} جرام</div>
              </div>
            </div>
          </div>
        ) : (
          /* Thickness cross-section comparison */
          <div className="w-full max-w-xl space-y-8 py-6">
            <div className="text-center text-xs font-mono text-slate-400 mb-4">
              المقطع الجانبي للنحافة (Thickness Cross-Section)
            </div>

            {/* Device A Thickness Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>{devA.name}</span>
                <span className="font-mono text-sky-400">{devA.thicknessMm} مليمتر</span>
              </div>
              <div className="w-full h-8 bg-slate-900 rounded-lg p-1 border border-slate-800">
                <div
                  style={{ width: `${Math.min(100, (devA.thicknessMm / 50) * 100)}%` }}
                  className="h-full bg-linear-to-r from-sky-500 to-sky-400 rounded-md transition-all duration-500 flex items-center justify-end px-2"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-950">
                    {devA.thicknessMm}mm
                  </span>
                </div>
              </div>
            </div>

            {/* Device B Thickness Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-300">
                <span>{devB.name}</span>
                <span className="font-mono text-indigo-400">{devB.thicknessMm} مليمتر</span>
              </div>
              <div className="w-full h-8 bg-slate-900 rounded-lg p-1 border border-slate-800">
                <div
                  style={{ width: `${Math.min(100, (devB.thicknessMm / 50) * 100)}%` }}
                  className="h-full bg-linear-to-r from-indigo-500 to-indigo-400 rounded-md transition-all duration-500 flex items-center justify-end px-2"
                >
                  <span className="text-[10px] font-mono font-bold text-slate-950">
                    {devB.thicknessMm}mm
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center text-xs font-mono text-slate-500 pt-2">
              فرق النحافة بين الجهازين:{' '}
              <span className="text-white font-bold">
                {Math.abs(devA.thicknessMm - devB.thicknessMm).toFixed(2)} مليمتر
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Comparative Specification Grid */}
      <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-right">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400">فارق الوزن الإجمالي</div>
          <div className="text-base font-black text-slate-900 mt-1 font-mono">
            {Math.abs(devA.weightGrams - devB.weightGrams)} جرام
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            {devA.weightGrams < devB.weightGrams ? `${devA.name} أخف وزناً` : `${devB.name} أخف وزناً`}
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400">سُمك الحواف المحيطية</div>
          <div className="text-base font-black text-slate-900 mt-1 font-mono">
            {devA.bezelMm}mm مقابل {devB.bezelMm}mm
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">شاشة بدون حواف تقريباً</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400">خامة التصنيع (الهيكل)</div>
          <div className="text-xs font-bold text-slate-900 mt-1 truncate" title={devA.material}>
            {devA.material}
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">مقاومة فائقة للصدمات</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="text-[11px] text-slate-400">المقارنة المعمقة الكاملة</div>
          <Link
            href={`/compare?p1=${devA.id}&p2=${devB.id}`}
            className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1 mt-2"
          >
            <span>فتح جدول المقارنة الشاملة</span>
            <span>←</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
