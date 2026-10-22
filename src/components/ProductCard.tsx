'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types/product';
import { useStore } from '@/context/store-context';
import { 
  Heart, 
  Scale, 
  Star, 
  Cpu, 
  HardDrive, 
  Monitor, 
  Eye, 
  Plus, 
  Check, 
  Zap 
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export default function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { toggleFavorite, isFavorite, addToCompare, isInCompare, addToQuote } = useStore();

  const favorited = isFavorite(product.id);
  const compared = isInCompare(product.id);

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-center justify-between transition-all duration-200 hover:shadow-md group">
        {/* Thumbnail */}
        <div className="relative w-full md:w-52 h-44 rounded-xl overflow-hidden bg-slate-50 shrink-0 border border-slate-100">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 220px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.badge && (
            <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-[#0f2b48] text-white text-[10px] font-bold shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-right w-full">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold text-[#0284c7] bg-sky-50 px-2 py-0.5 rounded-md">
              {product.brand}
            </span>
            <div className="flex items-center gap-1 text-amber-500 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-800">{product.rating}</span>
              <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
            </div>
          </div>

          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-base sm:text-lg text-slate-900 group-hover:text-[#0284c7] transition-colors truncate">
              {product.name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 line-clamp-2 my-2 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Quick Specs */}
          <div className="flex flex-wrap gap-2 my-2">
            {product.specs.processor && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                <Cpu className="w-3 h-3 text-slate-500" />
                {product.specs.processor.split('(')[0]}
              </span>
            )}
            {product.specs.ram && product.specs.ram !== 'N/A' && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                <HardDrive className="w-3 h-3 text-slate-500" />
                {product.specs.ram} / {product.specs.storage}
              </span>
            )}
            {product.specs.screenSize && product.specs.screenSize !== 'N/A' && (
              <span className="inline-flex items-center gap-1 text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg">
                <Monitor className="w-3 h-3 text-slate-500" />
                {product.specs.screenSize}
              </span>
            )}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="flex flex-col items-start md:items-end justify-between gap-3 w-full md:w-48 shrink-0 md:border-r md:border-slate-100 md:pr-5">
          <div className="text-right">
            <div className="text-xl font-extrabold text-[#0f2b48]">
              {product.price.toLocaleString('ar-SA')} <span className="text-xs font-normal text-slate-500">ر.س</span>
            </div>
            {product.originalPrice && (
              <div className="text-xs text-slate-400 line-through">
                {product.originalPrice.toLocaleString('ar-SA')} ر.س
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 w-full">
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`p-2 rounded-xl border transition-colors ${
                favorited
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-slate-50'
              }`}
              title="المفضلة"
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
            </button>

            <button
              type="button"
              onClick={() => addToCompare(product)}
              className={`p-2 rounded-xl border transition-colors ${
                compared
                  ? 'bg-sky-50 border-sky-300 text-[#0284c7]'
                  : 'border-slate-200 text-slate-400 hover:text-[#0284c7] hover:bg-slate-50'
              }`}
              title="مقارنة"
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => addToQuote(product)}
              className="flex-1 py-2 px-3 bg-[#0f2b48] hover:bg-[#0284c7] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>طلب الجهاز</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Grid View (Default)
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden">
      
      {/* Card Header & Badges */}
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between mb-2">
          {product.badge ? (
            <span className="px-2.5 py-0.5 rounded-full bg-[#0f2b48] text-white text-[10px] font-bold tracking-wide">
              {product.badge}
            </span>
          ) : product.discountPercentage ? (
            <span className="px-2.5 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center gap-1">
              <Zap className="w-2.5 h-2.5" />
              خصم {product.discountPercentage}%
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-500">
              {product.brand}
            </span>
          )}

          {/* Quick Action Icons */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => addToCompare(product)}
              className={`p-1.5 rounded-lg transition-colors ${
                compared
                  ? 'bg-sky-100 text-[#0284c7]'
                  : 'text-slate-400 hover:text-[#0284c7] hover:bg-slate-100'
              }`}
              title={compared ? 'مضاف للمقارنة' : 'إضافة إلى المقارنة'}
            >
              <Scale className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className={`p-1.5 rounded-lg transition-colors ${
                favorited
                  ? 'text-rose-500 bg-rose-50'
                  : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100'
              }`}
              title={favorited ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
            >
              <Heart className={`w-4 h-4 ${favorited ? 'fill-rose-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <Link href={`/products/${product.id}`} className="block relative h-48 w-full rounded-xl overflow-hidden bg-slate-50 my-2">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Content Details */}
      <div className="p-4 pt-1 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-amber-500 text-xs mb-1.5">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-800">{product.rating}</span>
            <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
          </div>

          {/* Title */}
          <Link href={`/products/${product.id}`} className="block">
            <h3 className="font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors text-sm line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 mb-3 leading-relaxed">
            {product.shortDescription}
          </p>

          {/* Key Specs Pills */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.specs.processor && (
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                {product.specs.processor.split('(')[0]}
              </span>
            )}
            {product.specs.ram && product.specs.ram !== 'N/A' && (
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                {product.specs.ram}
              </span>
            )}
            {product.specs.screenSize && product.specs.screenSize !== 'N/A' && (
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                {product.specs.screenSize}
              </span>
            )}
          </div>
        </div>

        {/* Footer: Price & Buttons */}
        <div className="border-t border-slate-100 pt-3">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <div className="text-lg font-extrabold text-[#0f2b48]">
                {product.price.toLocaleString('ar-SA')} <span className="text-xs font-normal text-slate-500">ر.س</span>
              </div>
              {product.originalPrice && (
                <div className="text-[11px] text-slate-400 line-through">
                  {product.originalPrice.toLocaleString('ar-SA')} ر.س
                </div>
              )}
            </div>

            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
              product.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'
            }`}>
              {product.inStock ? 'متوفر' : 'طلب مسبق'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href={`/products/${product.id}`}
              className="py-2 px-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold text-center flex items-center justify-center gap-1 transition-colors"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>المواصفات</span>
            </Link>

            <button
              type="button"
              onClick={() => addToQuote(product)}
              className="py-2 px-2.5 rounded-xl bg-[#0f2b48] hover:bg-[#0284c7] text-white text-xs font-bold text-center flex items-center justify-center gap-1 transition-colors shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>طلب</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
