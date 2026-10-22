'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface FinishOption {
  name: string;
  hex: string;
}

interface MaterialColorSwitcherProps {
  finishes: FinishOption[];
  activeFinish: FinishOption;
  onSelectFinish: (finish: FinishOption) => void;
  accentColor?: string;
}

export default function MaterialColorSwitcher({
  finishes,
  activeFinish,
  onSelectFinish,
  accentColor = '#2997FF',
}: MaterialColorSwitcherProps) {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-neutral-400">Selected Material:</span>
        <span className="text-white font-medium">{activeFinish.name}</span>
      </div>

      <div className="flex items-center gap-2.5" role="radiogroup" aria-label="Select device finish">
        {finishes.map((finish) => {
          const isSelected = activeFinish.name === finish.name;
          return (
            <button
              key={finish.name}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelectFinish(finish)}
              className={`relative w-8 h-8 rounded-full transition-all duration-200 flex items-center justify-center cursor-pointer touch-manipulation focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[${accentColor}] focus-visible:ring-offset-[#050811] ${
                isSelected 
                  ? 'scale-110 shadow-lg ring-2 ring-white/60' 
                  : 'hover:scale-105 opacity-80 hover:opacity-100 ring-1 ring-white/20'
              }`}
              style={{ backgroundColor: finish.hex }}
              title={finish.name}
            >
              {isSelected && (
                <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
