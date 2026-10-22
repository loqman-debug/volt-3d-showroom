import React from 'react';
import Link from 'next/link';
import { Cpu, ArrowLeft, Home, Search, Layers } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
      
      {/* 404 Visual */}
      <div className="inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-sky-50 border border-sky-100 text-[#0284c7] mb-2 shadow-xs">
        <Cpu className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-600 block">
          خطأ 404
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          الصفحة أو الجهاز غير موجود
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          عذراً، الرابط الذي حاولت الوصول إليه قد يكون تم نقله أو حذفه، أو أن عنوان الصفحة كُتب بشكل غير دقيق.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b48] hover:bg-[#0284c7] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-xs"
        >
          <Home className="w-4 h-4" />
          <span>العودة للرئيسية</span>
        </Link>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors"
        >
          <Search className="w-4 h-4" />
          <span>تصفح كتالوج الأجهزة</span>
        </Link>

        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors"
        >
          <Layers className="w-4 h-4" />
          <span>أقسام الأجهزة</span>
        </Link>
      </div>

    </div>
  );
}
