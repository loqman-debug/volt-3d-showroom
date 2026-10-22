import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { categoriesData } from '@/data/categories';
import { ArrowLeft, Layers } from 'lucide-react';

export const metadata = {
  title: 'أقسام وفئات الأجهزة الذكية | مِدار للتقنية',
  description: 'استكشف تصنيفات الأجهزة الذكية من الهواتف، الحواسيب المحمولة، الأجهزة اللوحية، الساعات والصوتيات الفائقة.',
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="mb-10 text-right border-b border-slate-200 pb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] text-xs font-bold mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>التصنيفات التقنية المعتمدة</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          أقسام وفئات الأجهزة الذكية
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
          تنظيم متكامل للعتاد والإلكترونيات يتيح لك الوصول المباشر إلى الأجهزة ومقارنة خيارات كل فئة على حدة.
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((cat) => (
          <Link
            key={cat.id}
            href={`/categories/${cat.id}`}
            className="group bg-white rounded-3xl border border-slate-200 hover:border-slate-300 overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="relative h-48 w-full rounded-2xl overflow-hidden bg-slate-100 mb-5 border border-slate-100">
                <Image
                  src={cat.imageUrl}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#0f2b48]/90 backdrop-blur-xs text-white text-xs font-bold shadow-xs">
                  {cat.itemCount} أجهزة مسجلة
                </span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors mb-2">
                {cat.name}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#0284c7] group-hover:bg-sky-50 transition-colors">
              <span>تصفح أجهزة {cat.name}</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
}
