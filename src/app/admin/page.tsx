'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { productsData } from '@/data/products';
import { categoriesData } from '@/data/categories';
import { Product, ProductCategory } from '@/types/product';
import { 
  SlidersHorizontal, 
  Plus, 
  Search, 
  CheckCircle, 
  AlertCircle, 
  Edit, 
  Trash2, 
  X, 
  Layers, 
  DollarSign, 
  Star, 
  Package,
  Eye,
  Check
} from 'lucide-react';

export default function AdminPage() {
  const [productsList, setProductsList] = useState<Product[]>(productsData);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New product form state
  const [newName, setNewName] = useState('');
  const [newNameEn, setNewNameEn] = useState('');
  const [newBrand, setNewBrand] = useState('أوريون (Orion)');
  const [newCategory, setNewCategory] = useState<ProductCategory>('smartphones');
  const [newPrice, setNewPrice] = useState<number>(3499);
  const [newProcessor, setNewProcessor] = useState('Snapdragon 8 Gen 3');
  const [newRam, setNewRam] = useState('16GB');
  const [newStorage, setNewStorage] = useState('512GB');
  const [newShortDesc, setNewShortDesc] = useState('');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80');

  // Filtered rows
  const displayed = productsList.filter((p) => {
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    }
    return true;
  });

  // Toggle inStock in local state
  const toggleStock = (id: string) => {
    setProductsList((prev) =>
      prev.map((p) => (p.id === id ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Delete product in local state
  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الجهاز من قائمة العرض المحلية؟')) {
      setProductsList((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // Add new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;

    const newProd: Product = {
      id: `custom-${Date.now()}`,
      slug: `custom-${Date.now()}`,
      name: newName,
      nameEn: newNameEn || newName,
      brand: newBrand,
      category: newCategory,
      price: Number(newPrice),
      rating: 4.8,
      reviewsCount: 1,
      inStock: true,
      stockCount: 10,
      shortDescription: newShortDesc || 'جهاز تقني حديث بمواصفات متطورة.',
      fullDescription: newShortDesc || 'جهاز إلكتروني متكامل تم إضافته عبر لوحة الإدارة التجريبية.',
      leadTime: 'توصيل فوري خلال 24 ساعة',
      images: [newImage],
      colors: [{ name: 'رمادي فضائي', hex: '#334155' }],
      storageVariants: [{ size: newStorage, priceDelta: 0 }],
      specs: {
        processor: newProcessor,
        ram: newRam,
        storage: newStorage,
        screenSize: '6.7 بوصة',
        screenType: 'AMOLED 120Hz',
        battery: '5000 mAh',
        operatingSystem: 'Android / Windows',
        connectivity: '5G, Wi-Fi 6',
        weight: '190 غرام',
        warranty: 'ضمان سنتين رسمي',
      },
      highlights: ['مواصفات حديثة معتمدة', 'أداء عالي وضمان سنتين'],
      usageSuitability: ['استخدام عام', 'إنتاجية'],
      targetUse: 'daily',
      budgetTier: 'mid',
    };

    setProductsList([newProd, ...productsList]);
    setIsAddModalOpen(false);
    alert('تمت إضافة الجهاز الجديد بنجاح إلى القائمة المحلية!');
  };

  // KPIs
  const totalStock = productsList.filter((p) => p.inStock).length;
  const totalDeals = productsList.filter((p) => p.isDeal || (p.discountPercentage && p.discountPercentage > 0)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <div className="text-xs text-slate-400 mb-1">
            <span>الرئيسية</span> / <span className="text-[#0284c7] font-semibold">لوحة الإدارة</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <SlidersHorizontal className="w-7 h-7 text-[#0284c7]" />
            <span>لوحة إدارة المنتجات والأجهزة (أولية)</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            إدارة كتالوج الأجهزة، حالة المخزون، وإضافة أجهزة جديدة للاختبار الفوري
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-[#0f2b48] hover:bg-[#0284c7] text-white text-xs sm:text-sm font-bold rounded-xl transition-colors flex items-center gap-2 shadow-xs shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>إضافة جهاز جديد</span>
        </button>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">إجمالي الأجهزة</span>
            <Package className="w-4 h-4 text-[#0284c7]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {productsList.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">أجهزة معتمدة في النظام</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">المتوفر في المخزون</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600">
            {totalStock}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">جاهز للتوصيل الفوري</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">العروض النشطة</span>
            <Star className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600">
            {totalDeals}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">أجهزة مخفضة السعر</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold">الأقسام والفئات</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900">
            {categoriesData.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">فئات تقنية رئيسية</span>
        </div>
      </div>

      {/* Products Table Card */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        
        {/* Table Filters Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/60">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="ابحث في الأجهزة المسجلة..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="w-full pl-8 pr-9 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-[#0284c7]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-700 outline-none w-full sm:w-auto"
            >
              <option value="all">جميع الفئات</option>
              {categoriesData.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/60 text-slate-600 font-bold">
                <th className="p-4">الجهاز</th>
                <th className="p-4">الفئة</th>
                <th className="p-4">السعر</th>
                <th className="p-4">المعالج / المواصفات</th>
                <th className="p-4">حالة التوفر</th>
                <th className="p-4 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayed.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-slate-100 relative overflow-hidden shrink-0 border border-slate-100">
                        <Image
                          src={p.images[0]}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-1">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{p.brand}</div>
                      </div>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-semibold">
                      {p.category}
                    </span>
                  </td>

                  <td className="p-4 font-extrabold text-[#0f2b48]">
                    {p.price.toLocaleString('ar-SA')} ر.س
                  </td>

                  <td className="p-4 text-slate-600 text-[11px]">
                    <div>{p.specs.processor.split('(')[0]}</div>
                    <div className="text-slate-400">{p.specs.ram} / {p.specs.storage}</div>
                  </td>

                  <td className="p-4">
                    <button
                      type="button"
                      onClick={() => toggleStock(p.id)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors ${
                        p.inStock
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                      title="انقر لتغيير الحالة"
                    >
                      {p.inStock ? 'متوفر (تبديل)' : 'نفد المخزون (تبديل)'}
                    </button>
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/products/${p.id}`}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-[#0284c7] hover:bg-slate-100"
                        title="معاينة في المتجر"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(p.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="حذف محلي"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-6">
              <h3 className="font-extrabold text-slate-900 text-lg">
                إضافة جهاز جديد إلى الكتالوج المحلي
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  اسم الجهاز بالعربية *
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: هاتف فانتوم إكس برو 5G"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الفئة *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  >
                    {categoriesData.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    السعر (ر.س) *
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    المعالج *
                  </label>
                  <input
                    type="text"
                    value={newProcessor}
                    onChange={(e) => setNewProcessor(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    الذاكرة والتخزين
                  </label>
                  <input
                    type="text"
                    value={`${newRam} / ${newStorage}`}
                    onChange={(e) => {
                      const parts = e.target.value.split('/');
                      setNewRam(parts[0]?.trim() || '16GB');
                      setNewStorage(parts[1]?.trim() || '512GB');
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  رابط صورة الجهاز (Unsplash URL)
                </label>
                <input
                  type="url"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  نبذة وصفية مختصرة
                </label>
                <textarea
                  rows={2}
                  placeholder="وصف للمواصفات الأساسية والجمهور المستهدف..."
                  value={newShortDesc}
                  onChange={(e) => setNewShortDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-[#0284c7] outline-none resize-none"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#0f2b48] hover:bg-[#0284c7] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  حفظ وإضافة إلى الكتالوج
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-50"
                >
                  إلغاء
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
