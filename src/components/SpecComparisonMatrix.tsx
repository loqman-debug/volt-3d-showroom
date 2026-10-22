'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Check, ShieldCheck, Zap, Sparkles, Layers } from 'lucide-react';

interface ProductSpec {
  id: string;
  name: string;
  category: string;
  tagline: string;
  price: string;
  image: string;
  accentColor: string;
  specs: {
    material: string;
    engine: string;
    displayOrAudio: string;
    battery: string;
    protection: string;
    weight: string;
  };
}

const comparisonProducts: ProductSpec[] = [
  {
    id: 'volt-phone',
    name: 'VOLT Horizon Pro',
    category: 'Smartphone',
    tagline: 'Grade 5 Titanium Flagship',
    price: '$1,199',
    image: '/images/products/titan-phone.jpg',
    accentColor: '#2997FF',
    specs: {
      material: 'Aerospace Grade 5 Titanium',
      engine: 'Orion X1 3nm Bionic Silicon',
      displayOrAudio: '6.8" LTPO AMOLED 2600 nits',
      battery: '5,400 mAh • 90W GaN Wired',
      protection: 'IP68 (6m depth 30 min)',
      weight: '198 grams',
    },
  },
  {
    id: 'volt-headphones',
    name: 'VOLT Pulse Studio',
    category: 'Audio',
    tagline: 'Master Reference ANC',
    price: '$499',
    image: '/images/products/volt-headphones.jpg',
    accentColor: '#38BDF8',
    specs: {
      material: 'Anodized Aluminum & Titanium',
      engine: '45mm Custom Beryllium Driver',
      displayOrAudio: '5Hz - 45kHz • 990kbps LDAC',
      battery: '60 Hours ANC Playback',
      protection: 'IPX4 Splash Resistant',
      weight: '254 grams',
    },
  },
  {
    id: 'volt-watch',
    name: 'VOLT Orbit Ultra',
    category: 'Wearable',
    tagline: 'Extreme Adventure GPS',
    price: '$799',
    image: '/images/products/nova-watch.jpg',
    accentColor: '#FF9F0A',
    specs: {
      material: '49mm Solid Sculpted Titanium',
      engine: 'Dual-Core S5 SiP Processor',
      displayOrAudio: '1.96" Sapphire OLED 3000 nits',
      battery: '14 Days / 36 Hours GPS',
      protection: '100m WR • EN13319 Diving',
      weight: '61.3 grams (case only)',
    },
  },
];

interface SpecComparisonMatrixProps {
  onSelectProduct: (product: any) => void;
}

export default function SpecComparisonMatrix({ onSelectProduct }: SpecComparisonMatrixProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'hardware' | 'endurance'>('all');

  return (
    <section id="comparison" className="py-28 bg-[#050811] border-t border-white/[0.08] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[11px] font-mono tracking-widest text-[#2997FF] uppercase block mb-3">
            ARCHITECTURAL BENCHMARKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
            Side-by-Side Engineering Matrix
          </h2>
          <p className="text-sm text-neutral-400">
            Compare industrial design tolerances, raw silicon power, and battery endurance across all three VOLT flagships.
          </p>
        </div>

        {/* Matrix Card */}
        <div className="overflow-x-auto pb-4">
          <table className="w-full text-start border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-6 px-4 text-xs font-mono text-neutral-400 uppercase w-1/4">
                  Feature / Specification
                </th>
                {comparisonProducts.map((p) => (
                  <th key={p.id} className="py-6 px-4 text-center w-1/4">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <Image
                        src={p.image}
                        alt={p.name}
                        fill
                        className="object-contain drop-shadow-lg"
                      />
                    </div>
                    <div className="text-sm font-bold text-white tracking-tight">{p.name}</div>
                    <div className="text-xs font-mono text-neutral-400 mt-1">{p.price} USD</div>
                    <button
                      type="button"
                      onClick={() => onSelectProduct(p)}
                      className="mt-3 text-[11px] font-semibold px-4 py-1.5 rounded-full border border-white/20 hover:border-white/50 text-white bg-white/5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Configure
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-xs divide-y divide-white/[0.06]">
              <tr>
                <td className="py-4 px-4 font-mono text-neutral-400 flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2997FF]" />
                  <span>Chassis Metallurgy</span>
                </td>
                {comparisonProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-center text-neutral-200 font-medium">
                    {p.specs.material}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-4 px-4 font-mono text-neutral-400 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[#2997FF]" />
                  <span>Core Engine / Silicon</span>
                </td>
                {comparisonProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-center text-neutral-200 font-mono">
                    {p.specs.engine}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-4 px-4 font-mono text-neutral-400 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2997FF]" />
                  <span>Display / Audio Output</span>
                </td>
                {comparisonProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-center text-neutral-200">
                    {p.specs.displayOrAudio}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-4 px-4 font-mono text-neutral-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-[#2997FF]" />
                  <span>Endurance & Battery</span>
                </td>
                {comparisonProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-center text-neutral-200 font-mono">
                    {p.specs.battery}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-4 px-4 font-mono text-neutral-400 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Water & Environmental</span>
                </td>
                {comparisonProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-center text-neutral-200">
                    {p.specs.protection}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-4 px-4 font-mono text-neutral-400">
                  <span>Unit Mass</span>
                </td>
                {comparisonProducts.map((p) => (
                  <td key={p.id} className="py-4 px-4 text-center text-neutral-400 font-mono">
                    {p.specs.weight}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
}
