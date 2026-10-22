'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import { productsData } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Heart, Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';

export default function FavoritesPage() {
  const { favorites, clearFavorites } = useStore();

  const favoriteProducts = productsData.filter((p) => favorites.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-400 mb-2">
            <span>الرئيسية</span> / <span className="text-[#0284c7] font-semibold">المفضلة</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
            <span>الأجهزة المفضلة المحفوظة</span>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {favorites.length} أجهزة
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            جميع الأجهزة التي قمت بحفظها محفوظة محلياً للرجوع إليها في أي وقت
          </p>
        </div>

        {favorites.length > 0 && (
          <button
            type="button"
            onClick={clearFavorites}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>مسح كافة المحفوظات</span>
          </button>
        )}
      </div>

      {/* Grid or Empty */}
      {favoriteProducts.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center my-8">
          <div className="w-16 h-16 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto mb-4 border border-rose-100">
            <Heart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            لم تقم بحفظ أي جهاز في المفضلة بعد
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            استكشف كتالوج الأجهزة الذكية وانقر على رمز القلب في أي جهاز لإضافته إلى قائمتك الخاصة ومتابعة مواصفاته وسعره.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0f2b48] hover:bg-[#0284c7] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors shadow-sm"
          >
            <span>استعراض كتالوج الأجهزة</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
