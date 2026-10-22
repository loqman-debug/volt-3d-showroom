import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { categoriesData } from '@/data/categories';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, ShieldCheck, Zap } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.id === slug);
  if (!category) return { title: 'الفئة غير موجودة | مِدار للتقنية' };

  return {
    title: `${category.name} | مِدار للتقنية`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categoriesData.find((c) => c.id === slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 mb-6 flex items-center gap-1.5">
        <Link href="/" className="hover:text-slate-700">الرئيسية</Link>
        <span>/</span>
        <Link href="/categories" className="hover:text-slate-700">الأقسام</Link>
        <span>/</span>
        <span className="text-[#0284c7] font-semibold">{category.name}</span>
      </nav>

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0a1f33] via-[#0f2b48] to-[#163e66] text-white p-6 sm:p-10 mb-10 shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-8 text-right space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-sky-400/20 text-sky-300 text-xs font-bold border border-sky-400/30">
              {category.nameEn}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
              {category.name}
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              {category.description}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-sky-400" />
                ضمان سنتين رسمي
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-amber-400" />
                توصيل فوري خلال 24 ساعة
              </span>
              <span>•</span>
              <span>متاح {products.length} أجهزة للاستكشاف</span>
            </div>
          </div>

          <div className="md:col-span-4 relative h-48 rounded-2xl overflow-hidden border border-white/10 hidden md:block">
            <Image
              src={category.imageUrl}
              alt={category.name}
              fill
              className="object-cover opacity-85"
            />
          </div>

        </div>
      </div>

      {/* Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="font-bold text-lg text-slate-900">
            جميع الأجهزة في قسم {category.name} ({products.length})
          </h2>
          <Link
            href="/products"
            className="text-xs font-semibold text-[#0284c7] hover:text-[#0f2b48] flex items-center gap-1"
          >
            <span>فلترة متقدمة في الكتالوج</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm mb-4">لا توجد أجهزة مضافة في هذه الفئة حالياً.</p>
            <Link
              href="/products"
              className="px-5 py-2.5 bg-[#0f2b48] text-white text-xs font-bold rounded-xl"
            >
              العودة للكتالوج العام
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
