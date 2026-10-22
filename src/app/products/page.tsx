'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { productsData } from '@/data/products';
import { categoriesData } from '@/data/categories';
import { ProductCategory, Product } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import { 
  Search, 
  Filter, 
  RotateCcw, 
  LayoutGrid, 
  List, 
  SlidersHorizontal, 
  Check, 
  X,
  ChevronDown
} from 'lucide-react';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = (searchParams.get('category') as ProductCategory) || 'all';

  // State
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [hasDiscountOnly, setHasDiscountOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'name'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Extract all unique brands
  const allBrands = useMemo(() => {
    const brands = new Set(productsData.map((p) => p.brand));
    return Array.from(brands);
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return productsData
      .filter((p) => {
        // Search matching
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchNameEn = p.nameEn.toLowerCase().includes(q);
          const matchBrand = p.brand.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchProcessor = p.specs.processor.toLowerCase().includes(q);
          if (!matchName && !matchNameEn && !matchBrand && !matchDesc && !matchProcessor) {
            return false;
          }
        }

        // Category matching
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Brand matching
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) {
          return false;
        }

        // Price matching
        if (p.price > maxPrice) {
          return false;
        }

        // In Stock only
        if (inStockOnly && !p.inStock) {
          return false;
        }

        // Deals only
        if (hasDiscountOnly && (!p.discountPercentage || p.discountPercentage <= 0)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'name') return a.name.localeCompare(b.name, 'ar');
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [searchQuery, selectedCategory, selectedBrand, maxPrice, inStockOnly, hasDiscountOnly, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBrand('all');
    setMaxPrice(10000);
    setInStockOnly(false);
    setHasDiscountOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'all' || 
    selectedBrand !== 'all' || 
    maxPrice < 10000 || 
    inStockOnly || 
    hasDiscountOnly;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header & Breadcrumb */}
      <div className="mb-8 border-b border-slate-200 pb-6">
        <div className="text-xs text-slate-400 mb-2">
          <span>الرئيسية</span> / <span className="text-[#0284c7] font-semibold">كتالوج الأجهزة</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              كتالوج المنتجات والأجهزة الذكية
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              استكشف المواصفات الفنية الحقيقية مع أدوات تصفية وبحث فورية
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
              عدد النتائج: <strong className="text-[#0284c7]">{filteredProducts.length}</strong> من أصل {productsData.length} جهاز
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sidebar Filters + Products Area */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white rounded-2xl border border-slate-200 p-5 space-y-6 sticky top-28 shadow-2xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              <Filter className="w-4 h-4 text-[#0284c7]" />
              <span>تصفية الأجهزة</span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                إعادة ضبط
              </button>
            )}
          </div>

          {/* 1. Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-2.5">
              الأقسام والفئات
            </label>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-sky-50 text-[#0284c7] font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>جميع الأجهزة</span>
                <span className="text-[11px] text-slate-400">({productsData.length})</span>
              </button>
              {categoriesData.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-sky-50 text-[#0284c7] font-bold'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-[11px] text-slate-400">({cat.itemCount})</span>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Brand Filter */}
          <div className="border-t border-slate-100 pt-4">
            <label className="block text-xs font-bold text-slate-800 mb-2.5">
              العلامة التجارية
            </label>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:border-[#0284c7] outline-none"
            >
              <option value="all">جميع العلامات التجارية</option>
              {allBrands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </select>
          </div>

          {/* 3. Max Price Slider */}
          <div className="border-t border-slate-100 pt-4">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-2">
              <span>الحد الأقصى للسعر:</span>
              <span className="text-[#0284c7]">{maxPrice.toLocaleString('ar-SA')} ر.س</span>
            </div>
            <input
              type="range"
              min={300}
              max={10000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#0284c7] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>300 ر.س</span>
              <span>10,000 ر.س</span>
            </div>
          </div>

          {/* 4. Checkbox toggles */}
          <div className="border-t border-slate-100 pt-4 space-y-2.5">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0284c7] focus:ring-0"
              />
              <span>الأجهزة المتوفرة في المخزون فقط</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="checkbox"
                checked={hasDiscountOnly}
                onChange={(e) => setHasDiscountOnly(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#0284c7] focus:ring-0"
              />
              <span>الأجهزة الخاضعة للعروض والتخفيضات</span>
            </label>
          </div>

        </aside>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Controls Bar: Search + Sort + View Mode + Mobile filter trigger */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="ابحث بالاسم، المعالج، الرام، أو العلامة التجارية..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2 bg-slate-50 rounded-xl text-xs sm:text-sm border border-slate-200 focus:border-[#0284c7] outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <div className="relative shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 pr-7 text-xs font-semibold text-slate-700 focus:border-[#0284c7] outline-none cursor-pointer"
                >
                  <option value="featured">الترتيب: الأجهزة المميزة</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="rating">الأعلى تقييماً</option>
                  <option value="name">أبجدياً (أ-ي)</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-white text-[#0f2b48] shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="عرض شبكي"
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-white text-[#0f2b48] shadow-2xs' : 'text-slate-400 hover:text-slate-700'
                  }`}
                  title="عرض قائمة"
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              {/* Mobile Filter Button */}
              <button
                type="button"
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className="lg:hidden p-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
                title="الفلاتر"
              >
                <SlidersHorizontal className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Mobile Filter Accordion */}
          {mobileFilterOpen && (
            <div className="lg:hidden bg-white rounded-2xl border border-slate-200 p-4 space-y-4 animate-in slide-in-from-top duration-200 shadow-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-bold text-xs text-slate-800">تصفية النتائج</span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-rose-500 font-semibold"
                >
                  إعادة ضبط
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">الفئة</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="all">جميع الفئات</option>
                  {categoriesData.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">العلامة التجارية</label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-2 border border-slate-200 rounded-lg text-xs"
                >
                  <option value="all">جميع العلامات</option>
                  {allBrands.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Active Filters Badges */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium">الفلاتر النشطة:</span>
              
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
                  بحث: "{searchQuery}"
                  <button type="button" onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 text-slate-400 hover:text-slate-700" />
                  </button>
                </span>
              )}

              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-sky-50 text-sky-800 text-xs">
                  الفئة: {categoriesData.find((c) => c.id === selectedCategory)?.name}
                  <button type="button" onClick={() => setSelectedCategory('all')}>
                    <X className="w-3 h-3 text-sky-600 hover:text-sky-900" />
                  </button>
                </span>
              )}

              {selectedBrand !== 'all' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
                  العلامة: {selectedBrand}
                  <button type="button" onClick={() => setSelectedBrand('all')}>
                    <X className="w-3 h-3 text-slate-400 hover:text-slate-700" />
                  </button>
                </span>
              )}

              {maxPrice < 10000 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs">
                  أقصى سعر: {maxPrice.toLocaleString('ar-SA')} ر.س
                  <button type="button" onClick={() => setMaxPrice(10000)}>
                    <X className="w-3 h-3 text-slate-400 hover:text-slate-700" />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-xs text-rose-500 hover:underline font-semibold mr-2"
              >
                مسح جميع الفلاتر
              </button>
            </div>
          )}

          {/* Products List / Grid */}
          {filteredProducts.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center my-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                <Search className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">
                لم نجد أي جهاز يطابق معايير التصفية
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
                جرّب توسيع نطاق السعر، أو إزالة بعض الكلمات المفتاحية، أو تصفح كافة الفئات.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="px-5 py-2.5 bg-[#0f2b48] hover:bg-[#0284c7] text-white text-xs font-bold rounded-xl transition-colors"
              >
                إعادة ضبط جميع الفلاتر
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="grid" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode="list" />
              ))}
            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500">
        جاري تحميل كتالوج الأجهزة...
      </div>
    }>
      <ProductsCatalogContent />
    </Suspense>
  );
}
