import React from 'react';
import Link from 'next/link';
import { getDealProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Zap, Clock, ShieldCheck, ArrowLeft, Percent } from 'lucide-react';

export const metadata = {
  title: 'العروض والتخفيضات الخاصة | مِدار للتقنية',
  description: 'اكتشف أقوى العروض والتخفيضات على الهواتف الذكية والسماعات والأجهزة الإلكترونية بضمان سنتين معتمد.',
};

export default function DealsPage() {
  const deals = getDealProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Deals Header Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-rose-950 via-[#0f2b48] to-[#0a1f33] text-white p-6 sm:p-12 shadow-xl">
        <div className="relative z-10 max-w-2xl space-y-4 text-right">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
            <Percent className="w-3.5 h-3.5" />
            <span>تخفيضات الأسبوع الحصرية</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            عروض تقنية استثنائية بأسعار منافسة
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            وفّر حتى 18% على أجهزة مختارة من الحواسيب المحمولة والسماعات المتقدمة والشواحن الذكية مع الاحتفاظ بكافة مزايا الضمان المعتمد والشحن السريع.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
            <span className="flex items-center gap-1.5 text-rose-300 font-bold">
              <Clock className="w-4 h-4" />
              الكميات محدودة حتى نفاد المخزون
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              ضمان سنتين كامل
            </span>
          </div>

        </div>
      </div>

      {/* Deals Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="font-bold text-lg text-slate-900">
            الأجهزة المشمولة بالعرض ({deals.length} جهاز)
          </h2>
          <Link
            href="/products"
            className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1"
          >
            <span>مشاهدة الكتالوج العام</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {deals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

    </div>
  );
}
