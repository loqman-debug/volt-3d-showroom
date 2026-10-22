'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { productsData } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Search, X, Sparkles, SlidersHorizontal, ArrowLeft } from 'lucide-react';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQ = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(initialQ);

  const quickTags = ['تايتان', 'OLED', 'Snapdragon', '16GB', 'RTX', 'تيتانيوم', 'سماعات', 'GaN'];

  const results = useMemo(() => {
    if (!searchTerm.trim()) return productsData;
    const q = searchTerm.toLowerCase();
    return productsData.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.nameEn.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.specs.processor.toLowerCase().includes(q) ||
        p.specs.operatingSystem.toLowerCase().includes(q)
      );
    });
  }, [searchTerm]);

  const handleTagClick = (tag: string) => {
    setSearchTerm(tag);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Header Hero */}
      <div className="bg-gradient-to-br from-white to-slate-100 rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs text-right space-y-4">
        <div className="text-xs text-slate-400">
          <span>الرئيسية</span> / <span className="text-[#0284c7] font-semibold">محرك البحث المتقدم</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          ابحث في جميع الأجهزة والمواصفات
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
          محرك بحث فوري يفحص الأسماء، المعالجات، الذواكر، وأنظمة التشغيل في أجزاء من الثانية
        </p>

        {/* Input */}
        <div className="relative max-w-2xl pt-2">
          <input
            type="text"
            placeholder="اكتب اسم الجهاز، معالج، أو نوع الشاشة..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-12 py-3.5 bg-white border border-slate-300 rounded-2xl text-sm text-slate-900 focus:border-[#0284c7] focus:ring-4 focus:ring-sky-100 outline-none shadow-xs"
          />
          <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 mt-1" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute left-4 top-1/2 -translate-y-1/2 mt-1 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Suggestions */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs text-slate-400 font-semibold">كلمات بحث مقترحة:</span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-[#0284c7] text-xs font-semibold text-slate-700 hover:text-[#0284c7] transition-all"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-sm font-bold text-slate-800">
            نتائج البحث: <strong className="text-[#0284c7]">{results.length}</strong> جهاز متاح
          </span>
          {searchTerm && (
            <span className="text-xs text-slate-500">
              مطابقة لكلمة البحث: "{searchTerm}"
            </span>
          )}
        </div>

        {results.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-14 text-center">
            <Search className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="font-bold text-base text-slate-800 mb-1">
              لم نعثر على أي نتائج مطابقة
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              تأكد من كتابة الكلمة بشكل صحيح، أو ابحث عن نوع المعالج أو اسم الفئة.
            </p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="px-5 py-2.5 bg-[#0f2b48] text-white text-xs font-bold rounded-xl"
            >
              عرض كافة الأجهزة
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-500">جاري تحميل نتائج البحث...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
