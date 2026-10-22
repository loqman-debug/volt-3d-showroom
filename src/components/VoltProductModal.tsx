'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, ShoppingBag, RotateCw } from 'lucide-react';
import { Product } from '@/types/product';
import { useStore } from '@/context/store-context';

interface VoltProductModalProps {
  product: {
    id: string;
    name: string;
    category: string;
    tagline: string;
    description: string;
    price: number;
    priceFormatted: string;
    image: string;
    badge: string;
    accentColor: string;
    features: { title: string; desc: string }[];
    finishes: { name: string; hex: string }[];
    techSpecs: { label: string; val: string }[];
  } | null;
  onClose: () => void;
  onOpen3DViewer?: () => void;
}

export default function VoltProductModal({ product, onClose, onOpen3DViewer }: VoltProductModalProps) {
  const { addToQuote, setQuoteDrawerOpen, showToast } = useStore();
  const [selectedFinish, setSelectedFinish] = useState<string>(product?.finishes[0]?.name || '');
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    // Construct mock product object for store context
    const storeProduct: Product = {
      id: product.id,
      slug: product.id,
      name: product.name,
      nameEn: product.name,
      brand: 'VOLT',
      category: product.id.includes('phone') ? 'smartphones' : product.id.includes('watch') ? 'wearables' : 'audio',
      price: product.price,
      originalPrice: product.price + 300,
      discountPercentage: 0,
      rating: 4.9,
      reviewsCount: 88,
      inStock: true,
      stockCount: 15,
      heroHeadline: product.tagline,
      shortDescription: product.description,
      fullDescription: product.description,
      badge: product.badge,
      leadTime: 'Express Delivery',
      images: [product.image],
      colors: product.finishes.map((f) => ({ name: f.name, hex: f.hex })),
      storageVariants: [],
      specs: {
        processor: product.techSpecs[0]?.val || '',
        ram: '16GB',
        storage: '512GB',
        screenSize: '6.8"',
        screenType: 'LTPO OLED',
        battery: product.techSpecs[2]?.val || '',
        operatingSystem: 'VOLT Horizon OS',
        connectivity: 'Wi-Fi 7, Bluetooth 5.4, 5G',
        weight: '215g',
        warranty: '2 Years Manufacturer Warranty',
      },
      highlights: product.features.map((f) => f.title),
      usageSuitability: ['Professional', 'Everyday Luxury'],
      targetUse: 'creators',
      budgetTier: 'flagship',
    };

    addToQuote(storeProduct, quantity, selectedFinish || product.finishes[0]?.name);
    showToast(`Added ${quantity}x ${product.name} to your bag`);
    onClose();
    setQuoteDrawerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#090D18] border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl z-10 text-white overflow-hidden max-h-[90vh] flex flex-col justify-between">
        
        {/* Top Glow Ambient */}
        <div 
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: product.accentColor }}
        />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 z-20 p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center overflow-y-auto pr-1">
          
          {/* Left: Product Image & 3D Interactive Button */}
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-full h-64 sm:h-80 flex items-center justify-center">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              />
            </div>

            {onOpen3DViewer && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpen3DViewer();
                }}
                className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 hover:border-white/30 bg-white/5 text-xs font-semibold text-white transition-all cursor-pointer backdrop-blur-md"
              >
                <RotateCw className="w-3.5 h-3.5 text-[#2997FF]" />
                <span>Launch Interactive 3D Model 360°</span>
              </button>
            )}
          </div>

          {/* Right: Specifications, Finishes, and Add to Bag */}
          <div className="space-y-6">
            <div>
              <div className="text-[11px] font-mono tracking-widest text-[#2997FF] uppercase mb-1">
                {product.category} • {product.badge}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 border-y border-white/10 py-3">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {product.priceFormatted}
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                USD • Demo Store Pricing
              </span>
            </div>

            {/* Finishes */}
            {product.finishes.length > 0 && (
              <div>
                <div className="text-xs text-neutral-400 mb-2">
                  Select Finish: <span className="text-white font-medium">{selectedFinish || product.finishes[0]?.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.finishes.map((f, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedFinish(f.name)}
                      className={`w-7 h-7 rounded-full transition-transform cursor-pointer ${
                        (selectedFinish || product.finishes[0]?.name) === f.name
                          ? 'scale-120 ring-2 ring-[#2997FF] ring-offset-2 ring-offset-[#090D18]'
                          : 'opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: f.hex }}
                      title={f.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {product.techSpecs.map((s, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5">
                  <div className="text-[10px] text-neutral-500">{s.label}</div>
                  <div className="font-semibold text-white font-mono text-[11px] mt-0.5">{s.val}</div>
                </div>
              ))}
            </div>

            {/* Quantity and Add to Bag */}
            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center border border-white/15 rounded-full px-3 py-1.5 bg-white/5 text-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-neutral-400 hover:text-white px-2 py-0.5 font-bold"
                >
                  -
                </button>
                <span className="font-mono text-white px-2">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-neutral-400 hover:text-white px-2 py-0.5 font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 bg-[#2997FF] hover:bg-[#0077ED] text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-full transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-95 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag</span>
              </button>
            </div>

            <div className="text-[11px] text-neutral-500 font-mono text-center">
              Demonstration showroom • 2-Year Official Warranty Included
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
