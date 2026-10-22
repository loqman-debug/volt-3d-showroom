'use client';

import React, { useState, useEffect, useRef } from 'react';

interface RollingCounterProps {
  value: number;
  durationMs?: number;
  formatFn?: (val: number) => string;
  className?: string;
  suffix?: string;
}

export default function RollingCounter({
  value,
  durationMs = 300,
  formatFn,
  className = '',
  suffix = '',
}: RollingCounterProps) {
  const [displayValue, setDisplayValue] = useState<number>(value);
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const hasAnimated = useRef<boolean>(false);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      requestAnimationFrame(() => setDisplayValue(value));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();

          const step = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / durationMs, 1);
            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(ease * value);
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setDisplayValue(value);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [value, durationMs]);

  const formatted = formatFn ? formatFn(displayValue) : displayValue.toLocaleString('en-US');

  return (
    <span ref={containerRef} className={`font-mono tabular-nums ${className}`}>
      {formatted}
      {suffix && <span className="ms-1 text-sm font-normal text-slate-500">{suffix}</span>}
    </span>
  );
}
