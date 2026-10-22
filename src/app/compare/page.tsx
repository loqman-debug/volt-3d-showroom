'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useStore } from '@/context/store-context';
import { productsData } from '@/data/products';
import { Product } from '@/types/product';
import { 
  Scale, 
  X, 
  Plus, 
  Trash2, 
  Search, 
  Check, 
  Sparkles, 
  Cpu, 
  HardDrive, 
  Monitor, 
  BatteryCharging, 
  Camera, 
  Wifi, 
  Layers, 
  ShieldCheck,
  Eye,
  CheckCircle2
} from 'lucide-react';

export default function ComparePage() {
  const { compareList, removeFromCompare, addToCompare, clearCompare } = useStore();
  const [showOnlyDifferences, setShowOnlyDifferences] = useState(false);
  const [pickerModalOpen, setPickerModalOpen] = useState(false);
  const [pickerSearch, setPickerSearch] = useState('');

  // Devices eligible for adding
  const availableToAdd = productsData.filter(
    (p) => !compareList.some((c) => c.id === p.id)
  ).filter((p) => {
    if (!pickerSearch.trim()) return true;
    const q = pickerSearch.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
  });

  const handleAddFromPicker = (product: Product) => {
    addToCompare(product);
    setPickerModalOpen(false);
  };

  // Specs comparison rows configuration
  const specRows: { key: string; label: string; icon: any; getVal: (p: Product) => string }[] = [
    { key: 'category', label: 'الفئة', icon: Layers, getVal: (p) => p.category },
    { key: 'price', label: 'السعر الأساسي', icon: Sparkles, getVal: (p) => `${p.price.toLocaleString('ar-SA')} ر.س` },
    { key: 'rating', label: 'تقييم المستخدمين', icon: Sparkles, getVal: (p) => `${p.rating} / 5 (${p.reviewsCount} تقييم)` },
    { key: 'processor', label: 'المعالج', icon: Cpu, getVal: (p) => p.specs.processor },
    { key: 'ram', label: 'الذاكرة العشوائية (RAM)', icon: HardDrive, getVal: (p) => p.specs.ram || 'غير محدد' },
    { key: 'storage', label: 'سعة التخزين', icon: HardDrive, getVal: (p) => p.specs.storage || 'غير محدد' },
    { key: 'screenSize', label: 'مقاس الشاشة', icon: Monitor, getVal: (p) => p.specs.screenSize || 'N/A' },
    { key: 'screenType', label: 'نوع الشاشة والتردد', icon: Monitor, getVal: (p) => `${p.specs.screenType || ''} ${p.specs.refreshRate ? `(${p.specs.refreshRate})` : ''}`.trim() || 'N/A' },
    { key: 'battery', label: 'سعة البطارية', icon: BatteryCharging, getVal: (p) => p.specs.battery || 'N/A' },
    { key: 'charging', label: 'سرعة الشحن', icon: BatteryCharging, getVal: (p) => p.specs.charging || 'N/A' },
    { key: 'mainCamera', label: 'الكاميرا الرئيسية', icon: Camera, getVal: (p) => p.specs.mainCamera || 'N/A' },
    { key: 'frontCamera', label: 'الكاميرا الأمامية', icon: Camera, getVal: (p) => p.specs.frontCamera || 'N/A' },
    { key: 'connectivity', label: 'الاتصال والشبكات', icon: Wifi, getVal: (p) => p.specs.connectivity || 'N/A' },
    { key: 'os', label: 'نظام التشغيل', icon: Layers, getVal: (p) => p.specs.operatingSystem },
    { key: 'weight', label: 'الوزن', icon: Layers, getVal: (p) => p.specs.weight },
    { key: 'warranty', label: 'الضمان', icon: ShieldCheck, getVal: (p) => p.specs.warranty },
  ];

  // Helper to check if a row has different values among selected devices
  const isRowDifferent = (row: typeof specRows[0]) => {
    if (compareList.length < 2) return false;
    const values = compareList.map((p) => row.getVal(p));
    return values.some((val) => val !== values[0]);
  };

  const displayedRows = showOnlyDifferences 
    ? specRows.filter((row) => isRowDifferent(row))
    : specRows;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="text-xs text-slate-400 mb-2">
          <span>الرئيسية</span> / <span className="text-[#0284c7] font-semibold">مقارنة الأجهزة</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span>المقارنة الذكية بين الأجهزة</span>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-sky-50 text-[#0284c7] border border-sky-200">
                {compareList.length} / 3 أجهزة
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              مقارنة معيارية شاملة جنباً إلى جنب لاكتشاف الفروقات الجوهرية قبل اتخاذ القرار
            </p>
          </div>

          {compareList.length > 0 && (
            <div className="flex items-center gap-3">
              {/* Highlight differences toggle */}
              <button
                type="button"
                onClick={() => setShowOnlyDifferences(!showOnlyDifferences)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
                  showOnlyDifferences
                    ? 'bg-[#0f2b48] text-white border-[#0f2b48]'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>إظهار الفروقات فقط</span>
              </button>

              <button
                type="button"
                onClick={clearCompare}
                className="px-3 py-2 text-xs text-rose-500 hover:bg-rose-50 rounded-xl transition-colors font-semibold"
              >
                مسح القائمة
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Compare Matrix */}
      {compareList.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl border border-slate-200 p-16 text-center my-8">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto mb-4 border border-sky-100">
            <Scale className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            لم تختر أي أجهزة للمقارنة بعد
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6 leading-relaxed">
            يمكنك مقارنة حتى 3 أجهزة جنباً إلى جنب من خلال النقر على أيقونة الميزان في بطاقة أي منتج أو اختيار جهاز من الزر أدناه.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => setPickerModalOpen(true)}
              className="px-6 py-3 bg-[#0f2b48] hover:bg-[#0284c7] text-white font-bold text-xs sm:text-sm rounded-xl transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>اختر جهازاً للمقارنة</span>
            </button>

            <Link
              href="/products"
              className="px-5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm rounded-xl transition-colors"
            >
              تصفح الكتالوج
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          
          {/* Devices Header Grid (Sticky top on horizontal scroll) */}
          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              
              {/* Product Cards Row */}
              <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50/70 p-4 gap-4 items-stretch">
                
                {/* Column 0: Header title */}
                <div className="flex flex-col justify-end p-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    المواصفة / الجهاز
                  </span>
                  <span className="text-sm font-extrabold text-slate-800">
                    جدول المقارنة الفنية
                  </span>
                </div>

                {/* Columns 1, 2, 3 for compare items */}
                {compareList.map((product) => (
                  <div
                    key={product.id}
                    className="relative bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-2xs text-right"
                  >
                    <button
                      type="button"
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-2 left-2 p-1 rounded-full text-slate-400 hover:text-rose-500 hover:bg-slate-100 transition-colors"
                      title="إزالة من المقارنة"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div>
                      <div className="relative h-28 w-full rounded-xl overflow-hidden bg-slate-50 mb-2">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-[11px] font-semibold text-[#0284c7] block">
                        {product.brand}
                      </span>
                      <h3 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 mb-1">
                        {product.name}
                      </h3>
                      <div className="text-sm sm:text-base font-extrabold text-[#0f2b48]">
                        {product.price.toLocaleString('ar-SA')} ر.س
                      </div>
                    </div>

                    <div className="pt-3 mt-2 border-t border-slate-100 flex gap-2">
                      <Link
                        href={`/products/${product.id}`}
                        className="flex-1 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold rounded-lg text-center"
                      >
                        التفاصيل
                      </Link>
                    </div>
                  </div>
                ))}

                {/* Add slot placeholder if less than 3 */}
                {compareList.length < 3 && (
                  <div
                    onClick={() => setPickerModalOpen(true)}
                    className="border-2 border-dashed border-slate-300 hover:border-[#0284c7] bg-white/50 hover:bg-sky-50/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all"
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-2">
                      <Plus className="w-5 h-5 text-[#0284c7]" />
                    </div>
                    <span className="text-xs font-bold text-slate-700">إضافة جهاز للمقارنة</span>
                    <span className="text-[10px] text-slate-400 mt-1">متبقي {3 - compareList.length} أجهزة</span>
                  </div>
                )}

              </div>

              {/* Specs Rows */}
              <div className="divide-y divide-slate-100">
                {displayedRows.map((row) => {
                  const Icon = row.icon;
                  const isDiff = isRowDifferent(row);

                  return (
                    <div
                      key={row.key}
                      className={`grid grid-cols-4 p-4 gap-4 items-center transition-colors ${
                        isDiff && showOnlyDifferences ? 'bg-sky-50/50' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Label */}
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-700 pr-2">
                        <Icon className="w-3.5 h-3.5 text-slate-400" />
                        <span>{row.label}</span>
                        {isDiff && !showOnlyDifferences && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7]" title="يوجد اختلاف" />
                        )}
                      </div>

                      {/* Values for each compared device */}
                      {compareList.map((product) => {
                        const val = row.getVal(product);
                        const isNA = val === 'N/A' || val === 'غير محدد';

                        return (
                          <div
                            key={product.id}
                            className={`text-xs sm:text-sm font-medium ${
                              isNA ? 'text-slate-400 italic' : 'text-slate-900'
                            }`}
                          >
                            {val}
                          </div>
                        );
                      })}

                      {/* Empty cell placeholder if less than 3 */}
                      {compareList.length < 3 && (
                        <div className="text-xs text-slate-300">-</div>
                      )}
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Add Device Modal Picker */}
      {pickerModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl max-h-[85vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#0284c7]" />
                <span>اختر جهازاً لإضافته للمقارنة</span>
              </h3>
              <button
                type="button"
                onClick={() => setPickerModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search filter input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="ابحث بالاسم أو الماركة..."
                value={pickerSearch}
                onChange={(e) => setPickerSearch(e.target.value)}
                className="w-full pl-9 pr-9 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0284c7]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* List of devices */}
            <div className="overflow-y-auto flex-1 space-y-2 pr-1">
              {availableToAdd.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  لا توجد أجهزة مطابقة أو أن جميع الأجهزة مضافة بالفعل.
                </div>
              ) : (
                availableToAdd.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => handleAddFromPicker(p)}
                    className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-[#0284c7] hover:bg-sky-50/40 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 relative overflow-hidden shrink-0">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-500">{p.brand} | {p.specs.processor.split('(')[0]}</div>
                      </div>
                    </div>

                    <div className="text-left font-bold text-xs text-[#0284c7]">
                      {p.price.toLocaleString('ar-SA')} ر.س
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
