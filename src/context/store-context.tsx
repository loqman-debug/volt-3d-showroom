'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, QuoteItem } from '@/types/product';
import { productsData } from '@/data/products';

interface StoreContextType {
  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;

  // Comparison
  compareList: Product[];
  addToCompare: (product: Product) => boolean; // returns false if max reached
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;

  // Quotes / Cart
  quoteItems: QuoteItem[];
  addToQuote: (product: Product, quantity?: number, color?: string, storage?: string) => void;
  removeFromQuote: (productId: string) => void;
  updateQuoteQuantity: (productId: string, quantity: number) => void;
  clearQuote: () => void;
  quoteDrawerOpen: boolean;
  setQuoteDrawerOpen: (open: boolean) => void;
  totalQuoteAmount: number;

  // Toast feedback
  toastMessage: string | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [quoteDrawerOpen, setQuoteDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('midar_favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedCompare = localStorage.getItem('midar_compare');
      if (savedCompare) {
        const ids: string[] = JSON.parse(savedCompare);
        const resolved = ids
          .map((id) => productsData.find((p) => p.id === id))
          .filter((p): p is Product => Boolean(p));
        setCompareList(resolved);
      }

      const savedQuotes = localStorage.getItem('midar_quotes');
      if (savedQuotes) setQuoteItems(JSON.parse(savedQuotes));
    } catch {
      // ignore JSON parse or storage issues
    }
  }, []);

  // Sync favorites
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      try {
        localStorage.setItem('midar_favorites', JSON.stringify(next));
      } catch {}
      showToast(exists ? 'تمت إزالة المنتج من المفضلة' : 'تمت إضافة المنتج إلى المفضلة بنجاح');
      return next;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  const clearFavorites = () => {
    setFavorites([]);
    try {
      localStorage.removeItem('midar_favorites');
    } catch {}
    showToast('تم إفراغ قائمة المفضلة');
  };

  // Sync compare
  const addToCompare = (product: Product) => {
    if (compareList.some((p) => p.id === product.id)) {
      removeFromCompare(product.id);
      return true;
    }
    if (compareList.length >= 3) {
      showToast('الحد الأقصى للمقارنة هو 3 أجهزة فقط');
      return false;
    }
    const next = [...compareList, product];
    setCompareList(next);
    try {
      localStorage.setItem('midar_compare', JSON.stringify(next.map((p) => p.id)));
    } catch {}
    showToast(`تمت إضافة "${product.name}" إلى المقارنة`);
    return true;
  };

  const removeFromCompare = (productId: string) => {
    const next = compareList.filter((p) => p.id !== productId);
    setCompareList(next);
    try {
      localStorage.setItem('midar_compare', JSON.stringify(next.map((p) => p.id)));
    } catch {}
    showToast('تمت إزالة الجهاز من المقارنة');
  };

  const clearCompare = () => {
    setCompareList([]);
    try {
      localStorage.removeItem('midar_compare');
    } catch {}
    showToast('تم إفراغ قائمة المقارنة');
  };

  const isInCompare = (productId: string) => compareList.some((p) => p.id === productId);

  // Sync quotes / cart
  const addToQuote = (product: Product, quantity = 1, color?: string, storage?: string) => {
    setQuoteItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color && item.selectedStorage === storage
      );
      let next: QuoteItem[];
      if (existingIndex > -1) {
        next = [...prev];
        next[existingIndex].quantity += quantity;
      } else {
        next = [...prev, { product, quantity, selectedColor: color, selectedStorage: storage }];
      }
      try {
        localStorage.setItem('midar_quotes', JSON.stringify(next));
      } catch {}
      return next;
    });
    setQuoteDrawerOpen(true);
    showToast(`تمت إضافة "${product.name}" إلى السلة / طلب العرض`);
  };

  const removeFromQuote = (productId: string) => {
    setQuoteItems((prev) => {
      const next = prev.filter((item) => item.product.id !== productId);
      try {
        localStorage.setItem('midar_quotes', JSON.stringify(next));
      } catch {}
      return next;
    });
    showToast('تمت إزالة المنتج من السلة');
  };

  const updateQuoteQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromQuote(productId);
      return;
    }
    setQuoteItems((prev) => {
      const next = prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item));
      try {
        localStorage.setItem('midar_quotes', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const clearQuote = () => {
    setQuoteItems([]);
    try {
      localStorage.removeItem('midar_quotes');
    } catch {}
  };

  const totalQuoteAmount = quoteItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  // Toast feedback
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((cur) => (cur === message ? null : cur));
    }, 3200);
  };

  return (
    <StoreContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
        quoteItems,
        addToQuote,
        removeFromQuote,
        updateQuoteQuantity,
        clearQuote,
        quoteDrawerOpen,
        setQuoteDrawerOpen,
        totalQuoteAmount,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
