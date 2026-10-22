'use client';

import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface HotspotProps {
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  title: string;
  subtitle: string;
  badge?: string;
  icon?: LucideIcon;
  align?: 'left' | 'right' | 'top' | 'bottom';
  accentColor?: string;
}

export default function InteractiveHotspot({
  x,
  y,
  title,
  subtitle,
  badge,
  icon: Icon,
  align = 'top',
  accentColor = '#2997FF',
}: HotspotProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Position alignment styling for tooltip popover
  const alignmentClasses = {
    top: 'bottom-8 left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-8 left-1/2 -translate-x-1/2 mt-2',
    left: 'right-8 top-1/2 -translate-y-1/2 mr-2',
    right: 'left-8 top-1/2 -translate-y-1/2 ml-2',
  }[align];

  return (
    <div 
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* Pulsing Beacon Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        aria-expanded={isOpen}
        aria-label={`Inspect ${title}`}
        className="relative -translate-x-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2997FF] focus-visible:ring-offset-[#050811] rounded-full cursor-pointer touch-manipulation"
      >
        {/* Radar Ping Animation */}
        <span 
          className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none"
          style={{ backgroundColor: accentColor }}
        />
        
        {/* Outer Glow Halo */}
        <span 
          className="absolute inset-0 rounded-full transition-transform duration-300 group-hover:scale-125"
          style={{ 
            backgroundColor: `${accentColor}33`, 
            border: `1px solid ${accentColor}88` 
          }}
        />

        {/* Center Solid Core */}
        <span 
          className="relative w-2.5 h-2.5 rounded-full shadow-lg transition-transform duration-200 group-hover:scale-110"
          style={{ backgroundColor: accentColor }}
        />
      </button>

      {/* Glassmorphic Inspection Card */}
      {isOpen && (
        <div 
          role="tooltip"
          className={`absolute ${alignmentClasses} w-56 sm:w-64 p-3.5 rounded-2xl bg-[#070A14]/95 border border-white/15 backdrop-blur-xl shadow-2xl text-start z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-200`}
          style={{
            boxShadow: `0 10px 30px -5px rgba(0,0,0,0.8), 0 0 15px -3px ${accentColor}40`
          }}
        >
          <div className="flex items-center gap-2 mb-1.5">
            {badge && (
              <span 
                className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{ 
                  backgroundColor: `${accentColor}20`, 
                  color: accentColor,
                  border: `1px solid ${accentColor}40`
                }}
              >
                {badge}
              </span>
            )}
            {Icon && <Icon className="w-3.5 h-3.5 text-neutral-400 ml-auto" />}
          </div>

          <div className="text-xs font-semibold text-white tracking-tight">
            {title}
          </div>

          <div className="text-[11px] text-neutral-400 mt-1 leading-snug">
            {subtitle}
          </div>
        </div>
      )}
    </div>
  );
}
