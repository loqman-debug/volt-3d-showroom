'use client';

import React, { useEffect, useState } from 'react';

interface Chapter {
  id: string;
  num: string;
  label: string;
}

const chapters: Chapter[] = [
  { id: 'hero', num: '00', label: 'OVERVIEW' },
  { id: 'smartphone', num: '01', label: 'SMARTPHONE' },
  { id: 'headphones', num: '02', label: 'HEADPHONES' },
  { id: 'smartwatch', num: '03', label: 'SMARTWATCH' },
  { id: 'comparison', num: '04', label: 'SPECS' },
];

export default function ChapterProgressRail() {
  const [activeId, setActiveId] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.4;
      
      for (let i = chapters.length - 1; i >= 0; i--) {
        const el = document.getElementById(chapters[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveId(chapters[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav 
      aria-label="Chapter navigation rail"
      className="hidden xl:flex fixed right-6 top-1/2 -translate-y-1/2 z-40 flex-col gap-5 py-4 px-2"
    >
      {chapters.map((ch) => {
        const isActive = activeId === ch.id;
        return (
          <button
            key={ch.id}
            type="button"
            onClick={() => scrollTo(ch.id)}
            className="group flex items-center justify-end gap-3 text-end focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2997FF] rounded-lg p-1 transition-all cursor-pointer"
          >
            {/* Label that expands on hover or when active */}
            <span 
              className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                isActive 
                  ? 'text-white font-bold opacity-100 translate-x-0' 
                  : 'text-neutral-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
              }`}
            >
              {ch.num} {ch.label}
            </span>

            {/* Indicator dash / pill */}
            <div 
              className={`h-[2px] transition-all duration-300 rounded-full ${
                isActive 
                  ? 'w-8 bg-[#2997FF] shadow-[0_0_8px_#2997FF]' 
                  : 'w-3 bg-white/20 group-hover:w-5 group-hover:bg-white/60'
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
