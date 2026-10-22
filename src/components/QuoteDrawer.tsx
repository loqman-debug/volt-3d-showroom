'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/context/store-context';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  CreditCard,
  Sparkles 
} from 'lucide-react';

export default function QuoteDrawer() {
  const { 
    quoteItems, 
    quoteDrawerOpen, 
    setQuoteDrawerOpen, 
    updateQuoteQuantity, 
    removeFromQuote, 
    clearQuote, 
    totalQuoteAmount,
    showToast 
  } = useStore();

  const [hasVoltCare, setHasVoltCare] = useState(false);

  // Keyboard accessibility: Escape closes drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quoteDrawerOpen) {
        setQuoteDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quoteDrawerOpen, setQuoteDrawerOpen]);

  if (!quoteDrawerOpen) return null;

  const voltCareCost = hasVoltCare ? 99 * quoteItems.reduce((acc, i) => acc + i.quantity, 0) : 0;
  const finalSubtotal = totalQuoteAmount + voltCareCost;

  return (
    <div 
      className="fixed inset-0 z-50 overflow-hidden text-white"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Bag Drawer"
    >
      {/* Backdrop */}
      <div 
        onClick={() => setQuoteDrawerOpen(false)}
        className="absolute inset-0 bg-black/75 backdrop-blur-md transition-opacity animate-in fade-in duration-200 cursor-pointer"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#070A14] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#2997FF]/15 border border-[#2997FF]/30 flex items-center justify-center text-[#2997FF]">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base tracking-tight font-mono">
                  VOLT SHOPPING BAG
                </h3>
                <span 
                  aria-live="polite"
                  className="text-[11px] text-neutral-400 font-mono"
                >
                  {quoteItems.length} {quoteItems.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={() => setQuoteDrawerOpen(false)}
              aria-label="Close Shopping Bag"
              className="w-10 h-10 flex items-center justify-center text-neutral-400 hover:text-white rounded-full hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] cursor-pointer touch-manipulation"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Worldwide Shipping Progress Bar */}
          <div className="bg-[#2997FF]/10 border-b border-[#2997FF]/20 px-6 py-2.5 flex items-center gap-2 text-xs text-[#2997FF] font-mono">
            <Truck className="w-3.5 h-3.5 shrink-0" />
            <span>Complimentary Worldwide Express Courier Unlocked</span>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {quoteItems.length === 0 ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mx-auto text-neutral-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-white text-base">Your bag is empty</h4>
                <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
                  Explore the 3 featured products and add items to your digital showroom bag.
                </p>
                <button
                  type="button"
                  onClick={() => setQuoteDrawerOpen(false)}
                  className="px-6 py-2.5 bg-[#2997FF] hover:bg-[#0077ED] text-white text-xs font-semibold rounded-full transition-all shadow-md shadow-blue-500/20 active:scale-95 cursor-pointer touch-manipulation focus-visible:ring-2 focus-visible:ring-white"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {quoteItems.map((item) => (
                  <div 
                    key={item.product.id}
                    className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex gap-4 items-center"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-16 h-16 rounded-xl bg-black/40 border border-white/5 flex-shrink-0 p-1 flex items-center justify-center">
                      <Image
                        src={item.product.images[0] || '/images/products/titan-phone.jpg'}
                        alt={item.product.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate font-mono">
                        {item.product.name}
                      </h4>
                      {item.selectedColor && (
                        <div className="text-[11px] text-neutral-400">
                          Finish: {item.selectedColor}
                        </div>
                      )}
                      <div className="text-xs font-bold font-mono text-[#2997FF] mt-1">
                        ${(item.product.price * item.quantity).toLocaleString()} USD
                      </div>

                      {/* Accessible Quantity Controls (44x44px min hit area) */}
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border border-white/15 rounded-lg bg-black/40 text-xs">
                          <button
                            type="button"
                            onClick={() => updateQuoteQuantity(item.product.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.product.name}`}
                            className="w-8 h-8 flex items-center justify-center hover:text-white text-neutral-400 cursor-pointer touch-manipulation focus-visible:ring-1 focus-visible:ring-[#2997FF]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2 font-mono text-white text-xs tabular-nums">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuoteQuantity(item.product.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.product.name}`}
                            className="w-8 h-8 flex items-center justify-center hover:text-white text-neutral-400 cursor-pointer touch-manipulation focus-visible:ring-1 focus-visible:ring-[#2997FF]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeFromQuote(item.product.id)}
                          aria-label={`Remove ${item.product.name} from bag`}
                          className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:text-rose-400 transition-colors ml-auto cursor-pointer touch-manipulation focus-visible:ring-1 focus-visible:ring-rose-500 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* VOLT Care+ Warranty Addon */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white font-mono">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>VOLT Care+ Hardware Protection</span>
                    </div>
                    <p className="text-[11px] text-neutral-400 leading-snug">
                      2-year accidental damage coverage and priority studio repair (+ $99 per unit).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasVoltCare(!hasVoltCare)}
                    aria-pressed={hasVoltCare}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all cursor-pointer touch-manipulation ${
                      hasVoltCare
                        ? 'bg-[#2997FF] text-white shadow-sm shadow-blue-500/30'
                        : 'bg-white/5 border border-white/15 text-neutral-300 hover:text-white'
                    }`}
                  >
                    {hasVoltCare ? 'Added ✓' : '+ Add'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer Subtotal & Action */}
          {quoteItems.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                  <span>Hardware Subtotal</span>
                  <span>${totalQuoteAmount.toLocaleString()} USD</span>
                </div>
                {hasVoltCare && (
                  <div className="flex items-center justify-between text-xs text-amber-400 font-mono">
                    <span>VOLT Care+ Protection</span>
                    <span>+${voltCareCost.toLocaleString()} USD</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-base pt-1 border-t border-white/10">
                  <span className="text-white font-mono font-semibold">Total</span>
                  <span className="font-bold text-xl font-mono text-white tabular-nums">
                    ${finalSubtotal.toLocaleString()} USD
                  </span>
                </div>
              </div>

              {/* Demo Notice */}
              <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-300 flex items-center gap-2 font-mono">
                <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Demo Portfolio Store • Test Express Checkout</span>
              </div>

              {/* Demo Express Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Demo Apple Pay checkout simulated successfully!');
                    clearQuote();
                    setQuoteDrawerOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-all active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center gap-1.5"
                >
                  <span> Pay</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Demo Google Pay checkout simulated successfully!');
                    clearQuote();
                    setQuoteDrawerOpen(false);
                  }}
                  className="py-2.5 px-3 rounded-xl bg-neutral-900 border border-white/20 text-white font-semibold text-xs hover:bg-neutral-800 transition-all active:scale-95 cursor-pointer touch-manipulation flex items-center justify-center gap-1.5"
                >
                  <span>G Pay</span>
                </button>
              </div>

              {/* Standard Demo Submit */}
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    showToast('Demo order request received. Thank you for exploring VOLT!');
                    clearQuote();
                    setQuoteDrawerOpen(false);
                  }}
                  className="flex-1 py-3 px-4 rounded-full bg-[#2997FF] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-blue-500/20 active:scale-95 cursor-pointer flex items-center justify-center gap-2 touch-manipulation focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2997FF]"
                >
                  <span>Complete Demo Order</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearQuote}
                  className="py-3 px-4 rounded-full border border-white/15 hover:bg-white/5 text-neutral-400 hover:text-white text-xs transition-colors cursor-pointer touch-manipulation"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
