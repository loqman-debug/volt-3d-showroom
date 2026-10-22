'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/store-context';
import { Scale, X, ArrowLeft, Trash2 } from 'lucide-react';

export default function CompareFloatingBar() {
  const { compareList, removeFromCompare, clearCompare } = useStore();

  if (compareList.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl border border-slate-300/80 shadow-2xl p-3 sm:p-4 animate-in slide-in-from-bottom duration-300">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Info header */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0f2b48] text-white flex items-center justify-center">
              <Scale className="w-4 h-4 text-sky-300" />
            </div>
            <div>
              <div className="font-bold text-sm text-slate-900">
                المقارنة السريعة ({compareList.length}/3)
              </div>
              <div className="text-[11px] text-slate-500">
                {compareList.length === 1 ? 'اختر جهازا آخر للمقارنة' : 'جاهز للمقارنة جنباً إلى جنب'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={clearCompare}
            className="sm:hidden text-xs text-slate-500 hover:text-rose-600 flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            مسح
          </button>
        </div>

        {/* Selected devices preview items */}
        <div className="flex items-center gap-2.5 overflow-x-auto w-full sm:w-auto py-1">
          {compareList.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl p-1.5 pr-2.5 shrink-0"
            >
              <div className="w-9 h-9 relative rounded-lg overflow-hidden bg-white shrink-0 border border-slate-100">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="max-w-[130px] text-right">
                <div className="text-xs font-semibold text-slate-900 truncate">
                  {item.name}
                </div>
                <div className="text-[11px] font-bold text-[#0284c7]">
                  {item.price.toLocaleString('ar-SA')} ر.س
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeFromCompare(item.id)}
                className="p-1 rounded-full text-slate-400 hover:text-rose-600 hover:bg-slate-200 transition-colors mr-1"
                title="إزالة من المقارنة"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Empty slot placeholder */}
          {Array.from({ length: 3 - compareList.length }).map((_, i) => (
            <div
              key={i}
              className="hidden md:flex items-center justify-center w-28 h-12 rounded-xl border border-dashed border-slate-300 text-[11px] text-slate-400 bg-slate-50/50"
            >
              + إضافة جهاز
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            type="button"
            onClick={clearCompare}
            className="hidden sm:flex text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-2"
          >
            مسح
          </button>

          <Link
            href="/compare"
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#0f2b48] hover:bg-[#0284c7] text-white text-xs sm:text-sm font-bold rounded-xl transition-all shadow-sm"
          >
            <span>بدء المقارنة</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
