'use client';

import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/store-context';
import { Product } from '@/types/product';

interface ActiveProductInfo {
  id: string;
  name: string;
  priceFormatted: string;
  accentColor: string;
}

export default function MobileStickyActionBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ActiveProductInfo>({
    id: 'volt-phone',
    name: 'VOLT Horizon Pro',
    priceFormatted: '$1,199',
    accentColor: '#2997FF',
  });

  const { addToQuote, setQuoteDrawerOpen } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      // Show only when scrolled past 450px (hero)
      const scrolled = window.scrollY > 450;
      setIsVisible(scrolled);

      // Determine active product based on section in viewport
      const phoneEl = document.getElementById('smartphone');
      const audioEl = document.getElementById('headphones');
      const watchEl = document.getElementById('smartwatch');

      const scrollMid = window.scrollY + window.innerHeight * 0.4;

      if (watchEl && watchEl.offsetTop <= scrollMid) {
        setCurrentProduct({
          id: 'volt-watch',
          name: 'VOLT Orbit Ultra',
          priceFormatted: '$799',
          accentColor: '#FF9F0A',
        });
      } else if (audioEl && audioEl.offsetTop <= scrollMid) {
        setCurrentProduct({
          id: 'volt-headphones',
          name: 'VOLT Pulse Studio',
          priceFormatted: '$499',
          accentColor: '#38BDF8',
        });
      } else if (phoneEl && phoneEl.offsetTop <= scrollMid) {
        setCurrentProduct({
          id: 'volt-phone',
          name: 'VOLT Horizon Pro',
          priceFormatted: '$1,199',
          accentColor: '#2997FF',
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleQuickAdd = () => {
    const productMock = {
      id: currentProduct.id,
      name: currentProduct.name,
      slug: currentProduct.id,
      nameEn: currentProduct.name,
      price: parseInt(currentProduct.priceFormatted.replace('$', '').replace(',', '')),
      images: [
        currentProduct.id === 'volt-phone' 
          ? '/images/products/titan-phone.jpg' 
          : currentProduct.id === 'volt-headphones' 
            ? '/images/products/volt-headphones.jpg' 
            : '/images/products/nova-watch.jpg'
      ],
      category: currentProduct.id.includes('phone') ? 'smartphones' : currentProduct.id.includes('watch') ? 'wearables' : 'audio',
      brand: 'VOLT',
      rating: 5.0,
      reviewsCount: 120,
      inStock: true,
      stockCount: 20,
      isFeatured: true,
      shortDescription: 'VOLT Flagship Hardware',
      fullDescription: 'VOLT Flagship Hardware',
      leadTime: 'Express Delivery',
      colors: [{ name: 'Titanium', hex: '#9A958D' }],
      storageVariants: [],
      highlights: ['Precision Aerospace Grade Metallurgy'],
      usageSuitability: ['Pro', 'Luxury'],
      targetUse: 'creators',
      budgetTier: 'flagship',
      specs: {
        screenSize: 'Standard',
        processor: 'Flagship Core',
        ram: '16GB',
        storage: '512GB',
        battery: 'Full Day',
        screenType: 'OLED',
        operatingSystem: 'VOLT OS',
        connectivity: '5G / Wi-Fi 7',
        weight: 'Lightweight',
        warranty: '2 Years VOLT Warranty',
      },
    } as unknown as Product;

    addToQuote(productMock, 1);
    setQuoteDrawerOpen(true);
  };

  return (
    <aside 
      aria-label="Quick action bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070A14]/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center justify-between gap-4 animate-in slide-in-from-bottom duration-300"
    >
      <div className="flex flex-col">
        <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
          Viewing
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-xs font-bold text-white tracking-tight">
            {currentProduct.name}
          </span>
          <span className="text-xs font-mono text-[#2997FF] font-semibold">
            {currentProduct.priceFormatted}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleQuickAdd}
        className="flex items-center gap-2 bg-[#2997FF] active:bg-[#0077ED] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-blue-500/20 active:scale-95 transition-all touch-manipulation cursor-pointer focus-visible:ring-2 focus-visible:ring-white"
      >
        <ShoppingBag className="w-3.5 h-3.5" />
        <span>Add to Bag</span>
      </button>
    </aside>
  );
}
