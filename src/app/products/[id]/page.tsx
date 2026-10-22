'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { productsData, getProductById, getRelatedProducts } from '@/data/products';
import { useStore } from '@/context/store-context';
import ProductCard from '@/components/ProductCard';
import { 
  Heart, 
  Scale, 
  ShoppingBag, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  ZoomIn, 
  X, 
  Cpu, 
  HardDrive, 
  Monitor, 
  BatteryCharging, 
  Camera, 
  Wifi, 
  Layers, 
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const { isFavorite, toggleFavorite, isInCompare, addToCompare, addToQuote } = useStore();

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedStorage, setSelectedStorage] = useState(product.storageVariants[0]?.size || '');
  const [storagePriceDelta, setStoragePriceDelta] = useState(product.storageVariants[0]?.priceDelta || 0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  const favorited = isFavorite(product.id);
  const compared = isInCompare(product.id);

  const finalPrice = product.price + storagePriceDelta;
  const relatedProducts = getRelatedProducts(product.id, 4);

  const handleStorageChange = (variantSize: string, delta: number) => {
    setSelectedStorage(variantSize);
    setStoragePriceDelta(delta);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-400 flex items-center gap-1.5 flex-wrap">
        <Link href="/" className="hover:text-slate-700">الرئيسية</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-slate-700">الكتالوج</Link>
        <span>/</span>
        <Link href={`/categories/${product.category}`} className="hover:text-slate-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#0284c7] font-semibold truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Showcase Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Gallery Column (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Big Main Image with Zoom Trigger */}
            <div className="relative h-[340px] sm:h-[450px] w-full rounded-2xl overflow-hidden bg-slate-50 border border-slate-100 group">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 550px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Badges */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
                {product.badge && (
                  <span className="px-3 py-1 rounded-full bg-[#0f2b48] text-white text-xs font-bold shadow-xs">
                    {product.badge}
                  </span>
                )}
                {product.discountPercentage && (
                  <span className="px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-bold shadow-xs">
                    خصم {product.discountPercentage}%
                  </span>
                )}
              </div>

              {/* Zoom Button */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-white/90 backdrop-blur-xs text-slate-700 hover:text-[#0284c7] shadow-md border border-slate-200 transition-colors"
                title="تكبير الصورة بجودة عالية"
              >
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      selectedImageIndex === idx
                        ? 'border-[#0284c7] ring-2 ring-sky-100'
                        : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - زاوية ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Service & Trust Signals */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 text-center">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <ShieldCheck className="w-5 h-5 text-sky-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">ضمان سنتين</span>
                <span className="text-[10px] text-slate-500">من الوكيل المعتمد</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <Truck className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">شحن فوري</span>
                <span className="text-[10px] text-slate-500">خلال 24 ساعة</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <RotateCcw className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-[11px] font-bold text-slate-800 block">استرجاع مرن</span>
                <span className="text-[10px] text-slate-500">خلال 14 يوماً</span>
              </div>
            </div>

          </div>

          {/* Details & Actions Column (6 cols) */}
          <div className="lg:col-span-6 space-y-6 text-right">
            
            {/* Brand & Ratings */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0284c7] bg-sky-50 px-3 py-1 rounded-lg">
                {product.brand}
              </span>

              <div className="flex items-center gap-1.5 text-amber-500 text-sm">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-extrabold text-slate-900">{product.rating}</span>
                <span className="text-slate-400 text-xs">({product.reviewsCount} تقييم)</span>
              </div>
            </div>

            {/* Title */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-1">
                {product.name}
              </h1>
              <p className="text-xs text-slate-400 font-mono" dir="ltr">
                {product.nameEn}
              </p>
            </div>

            {/* Price section */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <div className="text-2xl sm:text-3xl font-black text-[#0f2b48]">
                  {finalPrice.toLocaleString('ar-SA')} <span className="text-sm font-normal text-slate-500">ر.س</span>
                </div>
                {product.originalPrice && (
                  <div className="text-xs text-slate-400 line-through">
                    {(product.originalPrice + storagePriceDelta).toLocaleString('ar-SA')} ر.س
                  </div>
                )}
              </div>

              <div className="text-left">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                  product.inStock 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-slate-200 text-slate-600'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.inStock ? 'متوفر وجاهز للتوصيل' : 'متاح للطلب المسبق'}
                </span>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {product.leadTime}
                </div>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-sm text-slate-600 leading-relaxed">
              {product.fullDescription}
            </p>

            {/* Color Selector */}
            {product.colors.length > 0 && (
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">اللون المختار:</span>
                  <span className="text-[#0284c7] font-semibold">{selectedColor}</span>
                </div>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                        selectedColor === c.name
                          ? 'border-[#0284c7] bg-sky-50/50 text-[#0f2b48] ring-1 ring-sky-300'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10 shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage Variants Selector */}
            {product.storageVariants.length > 0 && (
              <div className="space-y-2 border-t border-slate-100 pt-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-900">سعة التخزين / الإصدار:</span>
                  <span className="text-[#0284c7] font-semibold">{selectedStorage}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.storageVariants.map((v) => (
                    <button
                      key={v.size}
                      type="button"
                      onClick={() => handleStorageChange(v.size, v.priceDelta)}
                      className={`p-3 rounded-xl border text-right transition-all ${
                        selectedStorage === v.size
                          ? 'border-[#0284c7] bg-sky-50 text-[#0f2b48] font-bold ring-1 ring-sky-300'
                          : 'border-slate-200 text-slate-700 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs">{v.size}</div>
                      <div className="text-[11px] text-slate-500 font-normal">
                        {v.priceDelta === 0 ? 'السعر الأساسي' : `+${v.priceDelta.toLocaleString('ar-SA')} ر.س`}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Highlights bullets */}
            <div className="border-t border-slate-100 pt-4">
              <h4 className="text-xs font-bold text-slate-900 mb-2">أبرز المزايا ونقاط القوة:</h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {product.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] mt-1.5 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Buttons: Add to Quote, Compare, Wishlist */}
            <div className="border-t border-slate-100 pt-5 space-y-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => addToQuote(product, quantity, selectedColor, selectedStorage)}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-[#0f2b48] hover:bg-[#0284c7] text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4 text-sky-300" />
                  <span>طلب الجهاز أو عرض سعر فوري</span>
                </button>

                <button
                  type="button"
                  onClick={() => addToCompare(product)}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    compared
                      ? 'bg-sky-50 border-sky-300 text-[#0284c7]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                  title={compared ? 'مضاف للمقارنة' : 'إضافة إلى المقارنة'}
                >
                  <Scale className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={() => toggleFavorite(product.id)}
                  className={`p-3.5 rounded-2xl border transition-colors ${
                    favorited
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-rose-600'
                  }`}
                  title={favorited ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                >
                  <Heart className={`w-5 h-5 ${favorited ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Data Transparency Notice */}
              <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
                <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                <span>
                  <strong>تنويه الشفافية:</strong> المواصفات والأسعار المعروضة في هذا المتجر هي بيانات تجريبية لأغراض العرض التوضيحي ضمن ملف الأعمال البرمجي، ولا تمثل التزاماً ببيع تجاري فعلي.
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Structured Technical Specifications Table */}
      <section className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xs space-y-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            جدول المواصفات الفنية التفصيلية
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            بيانات هندسية موثقة ومعايير قياسية موحدة لتقييم أداء ومكونات الجهاز
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          
          {/* Performance & Processing */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
              <Cpu className="w-4 h-4 text-[#0284c7]" />
              <span>المعالج والأداء</span>
            </div>
            <div className="md:col-span-8 text-xs sm:text-sm text-slate-700">
              {product.specs.processor}
            </div>
          </div>

          {/* RAM & Storage */}
          {product.specs.ram && product.specs.ram !== 'N/A' && (
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
                <HardDrive className="w-4 h-4 text-[#0284c7]" />
                <span>الذاكرة وسعة التخزين</span>
              </div>
              <div className="md:col-span-8 text-xs sm:text-sm text-slate-700">
                {product.specs.ram} رام | {product.specs.storage} تخزين فائق السرعة
              </div>
            </div>
          )}

          {/* Screen & Display */}
          {product.specs.screenSize && product.specs.screenSize !== 'N/A' && (
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
                <Monitor className="w-4 h-4 text-[#0284c7]" />
                <span>الشاشة وجودة العرض</span>
              </div>
              <div className="md:col-span-8 text-xs sm:text-sm text-slate-700 space-y-1">
                <div>{product.specs.screenSize} - {product.specs.screenType}</div>
                {product.specs.refreshRate && (
                  <div className="text-slate-500 text-xs">معدل التحديث: {product.specs.refreshRate}</div>
                )}
              </div>
            </div>
          )}

          {/* Battery & Charging */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
              <BatteryCharging className="w-4 h-4 text-[#0284c7]" />
              <span>البطارية وسرعة الشحن</span>
            </div>
            <div className="md:col-span-8 text-xs sm:text-sm text-slate-700 space-y-1">
              <div>{product.specs.battery}</div>
              {product.specs.charging && (
                <div className="text-slate-500 text-xs">{product.specs.charging}</div>
              )}
            </div>
          </div>

          {/* Cameras */}
          {product.specs.mainCamera && (
            <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
                <Camera className="w-4 h-4 text-[#0284c7]" />
                <span>نظام الكاميرات والتصوير</span>
              </div>
              <div className="md:col-span-8 text-xs sm:text-sm text-slate-700 space-y-1">
                <div>الرئيسية: {product.specs.mainCamera}</div>
                {product.specs.frontCamera && (
                  <div className="text-slate-500 text-xs">الأمامية: {product.specs.frontCamera}</div>
                )}
              </div>
            </div>
          )}

          {/* Connectivity */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
              <Wifi className="w-4 h-4 text-[#0284c7]" />
              <span>الاتصال والمنافذ</span>
            </div>
            <div className="md:col-span-8 text-xs sm:text-sm text-slate-700">
              {product.specs.connectivity}
            </div>
          </div>

          {/* OS & Build */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
              <Layers className="w-4 h-4 text-[#0284c7]" />
              <span>نظام التشغيل والوزن</span>
            </div>
            <div className="md:col-span-8 text-xs sm:text-sm text-slate-700">
              {product.specs.operatingSystem} | الوزن: {product.specs.weight}
            </div>
          </div>

          {/* Warranty */}
          <div className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            <div className="md:col-span-4 flex items-center gap-2 font-bold text-sm text-slate-900">
              <ShieldCheck className="w-4 h-4 text-[#0284c7]" />
              <span>الضمان والخدمات</span>
            </div>
            <div className="md:col-span-8 text-xs sm:text-sm text-slate-700 font-semibold text-emerald-700">
              {product.specs.warranty}
            </div>
          </div>

        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-extrabold text-xl text-slate-900">
              أجهزة مشابهة قد تهمك
            </h3>
            <Link
              href="/products"
              className="text-xs font-bold text-[#0284c7] hover:underline"
            >
              عرض الكتالوج الكامل ←
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Image Zoom Modal */}
      {isZoomOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full h-[80vh] flex flex-col items-center justify-center">
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors z-20"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="relative w-full h-full">
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white text-xs mt-3 bg-black/60 px-4 py-1.5 rounded-full">
              {product.name} - صورة عالية الدقة
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
