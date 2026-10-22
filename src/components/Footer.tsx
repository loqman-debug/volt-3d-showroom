import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#050811] text-neutral-500 border-t border-white/[0.08] text-xs font-mono py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Copyright */}
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-base tracking-tight text-white font-mono">
            VOLT
          </span>
          <span className="text-neutral-500">
            © 2026 VOLT HARDWARE LABS. ALL RIGHTS RESERVED.
          </span>
        </div>

        {/* Minimal Navigation */}
        <div className="flex items-center gap-8 text-[12px] text-neutral-400">
          <a href="#collection" className="hover:text-white transition-colors">Collection</a>
          <a href="#technology" className="hover:text-white transition-colors">Technology</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
        </div>

        {/* Demonstration Disclaimer */}
        <div className="text-[11px] text-neutral-500 bg-white/[0.03] border border-white/5 px-3 py-1 rounded-full">
          Fictional Portfolio Showcase • Awwwards-Inspired Design
        </div>

      </div>
    </footer>
  );
}
