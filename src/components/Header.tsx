'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useStore } from '@/context/store-context';
import { ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header() {
  const { quoteItems, setQuoteDrawerOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = quoteItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Skip to Main Content Link for Keyboard Accessibility (WCAG 2.2 AA) */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#2997FF] focus:text-white focus:rounded-full focus:font-mono focus:text-xs focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-[#050811]/90 backdrop-blur-2xl border-b border-white/[0.08] py-3.5 shadow-2xl' 
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          
          {/* Brand Wordmark: VOLT */}
          <Link 
            href="/" 
            className="flex items-center gap-2 group text-white font-bold tracking-tighter hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded-lg p-1"
          >
            <span className="w-6 h-6 rounded-md bg-[#2997FF] flex items-center justify-center text-white text-[11px] font-black tracking-tighter shadow-md shadow-blue-500/30">
              V
            </span>
            <span className="font-extrabold text-xl tracking-tight text-white font-mono">
              VOLT
            </span>
          </Link>

          {/* Minimal Navigation: Collection • Technology • About • Specs */}
          <nav 
            aria-label="Main navigation" 
            className="hidden md:flex items-center gap-9 text-[13px] text-neutral-400 font-medium"
          >
            <a 
              href="#collection" 
              className="hover:text-white transition-colors tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded px-1.5 py-0.5"
            >
              Collection
            </a>
            <a 
              href="#technology" 
              className="hover:text-white transition-colors tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded px-1.5 py-0.5"
            >
              Technology
            </a>
            <a 
              href="#comparison" 
              className="hover:text-white transition-colors tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded px-1.5 py-0.5"
            >
              Specs
            </a>
            <a 
              href="#about" 
              className="hover:text-white transition-colors tracking-wide focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded px-1.5 py-0.5"
            >
              About
            </a>
          </nav>

          {/* Right Actions: Shopping Bag */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuoteDrawerOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-xs font-medium text-white transition-all cursor-pointer active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] touch-manipulation min-h-[40px]"
              aria-label={`Shopping Bag with ${totalCartCount} items`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#2997FF]" />
              <span className="font-mono text-xs">Bag</span>
              {totalCartCount > 0 && (
                <span className="ml-0.5 w-4 h-4 rounded-full bg-[#2997FF] text-white text-[10px] font-bold flex items-center justify-center animate-in zoom-in-50 duration-150 tabular-nums">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button (min 44x44 touch target) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-11 h-11 flex items-center justify-center text-neutral-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded-lg touch-manipulation cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#070A14]/98 border-b border-white/10 px-6 py-6 space-y-4 animate-in fade-in duration-200">
            <a 
              href="#collection" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2997FF]"
            >
              Collection
            </a>
            <a 
              href="#technology" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2997FF]"
            >
              Technology
            </a>
            <a 
              href="#comparison" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2997FF]"
            >
              Specs Matrix
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-neutral-300 hover:text-white py-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#2997FF]"
            >
              About VOLT
            </a>
            
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-neutral-500 font-mono">
              <span>VOLT SHOWROOM 2026</span>
              <span className="text-[#2997FF]">AWWWARDS PRO</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
