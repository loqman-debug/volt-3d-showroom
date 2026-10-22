'use client';

import React from 'react';
import { useStore } from '@/context/store-context';
import { CheckCircle2 } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-200">
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#0f2b48] text-white shadow-xl border border-sky-400/30 text-xs sm:text-sm font-semibold">
        <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
