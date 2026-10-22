'use client';

import React from 'react';

interface DeviceBlueprintProps {
  type: 'smartphone' | 'laptop' | 'audio' | 'watch' | 'tablet';
  className?: string;
  widthMm?: number;
  heightMm?: number;
  thicknessMm?: number;
}

export default function DeviceBlueprint({
  type,
  className = '',
  widthMm,
  heightMm,
  thicknessMm,
}: DeviceBlueprintProps) {
  const strokeColor = '#0A3CFF';
  const dimColor = '#64748B';
  const gridColor = '#E2E8F0';

  if (type === 'smartphone') {
    const w = widthMm || 77.8;
    const h = heightMm || 162.3;
    const t = thicknessMm || 8.25;

    return (
      <div dir="ltr" className={`relative flex items-center justify-center p-3 sm:p-6 bg-white border border-[#E5E7EB] overflow-hidden min-w-0 w-full max-w-full ${className}`}>
        {/* Subtle engineering grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none" />

        <svg viewBox="0 0 460 380" className="w-full h-auto max-h-[360px] min-w-0 max-w-full relative z-10" style={{ maxWidth: '100%', minWidth: 0, width: '100%' }} fill="none">
          {/* Dimension Caliper: Height */}
          <line x1="60" y1="50" x2="60" y2="330" stroke={dimColor} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="55" y1="50" x2="65" y2="50" stroke={dimColor} strokeWidth="1" />
          <line x1="55" y1="330" x2="65" y2="330" stroke={dimColor} strokeWidth="1" />
          <text x="50" y="195" fill={dimColor} fontSize="11" fontFamily="var(--font-mono)" textAnchor="end">
            {h} mm
          </text>

          {/* Dimension Caliper: Width */}
          <line x1="120" y1="355" x2="260" y2="355" stroke={dimColor} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="120" y1="350" x2="120" y2="360" stroke={dimColor} strokeWidth="1" />
          <line x1="260" y1="350" x2="260" y2="360" stroke={dimColor} strokeWidth="1" />
          <text x="190" y="372" fill={dimColor} fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
            {w} mm
          </text>

          {/* Smartphone Front Elevation Outline */}
          <rect
            x="120"
            y="50"
            width="140"
            height="280"
            rx="16"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill="#FFFFFF"
          />

          {/* Bezel inner display frame */}
          <rect
            x="125"
            y="55"
            width="130"
            height="270"
            rx="12"
            stroke={gridColor}
            strokeWidth="1"
            fill="#F8FAFC"
          />

          {/* Screen Display diagonal indicator */}
          <line x1="130" y1="60" x2="250" y2="320" stroke="#00D2FF" strokeWidth="0.75" strokeDasharray="4 4" />
          <text x="210" y="170" fill="#0A3CFF" fontSize="10" fontFamily="var(--font-mono)" fontWeight="500">
            6.8&quot; LTPO 120Hz
          </text>

          {/* Front Camera cutout */}
          <circle cx="190" cy="68" r="4" stroke={strokeColor} strokeWidth="1.2" fill="#FFFFFF" />
          <circle cx="190" cy="68" r="1.5" fill={strokeColor} />

          {/* Hardware antenna bands */}
          <line x1="120" y1="80" x2="125" y2="80" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="255" y1="80" x2="260" y2="80" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="120" y1="300" x2="125" y2="300" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="255" y1="300" x2="260" y2="300" stroke={strokeColor} strokeWidth="1.5" />

          {/* Side Cross-Section Elevation (Thickness View) */}
          <rect
            x="320"
            y="50"
            width="22"
            height="280"
            rx="3"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill="#FFFFFF"
          />
          {/* Side buttons */}
          <rect x="342" y="100" width="3" height="30" fill={strokeColor} rx="1" />
          <rect x="342" y="145" width="3" height="40" fill={strokeColor} rx="1" />
          <rect x="317" y="110" width="3" height="20" fill={strokeColor} rx="1" />

          {/* Camera bump projection */}
          <rect x="316" y="65" width="4" height="60" fill={strokeColor} rx="1" />

          {/* Dimension Caliper: Thickness */}
          <line x1="316" y1="30" x2="345" y2="30" stroke={dimColor} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="316" y1="26" x2="316" y2="34" stroke={dimColor} strokeWidth="1" />
          <line x1="345" y1="26" x2="345" y2="34" stroke={dimColor} strokeWidth="1" />
          <text x="330" y="22" fill={dimColor} fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
            {t} mm
          </text>

          {/* Engineering Crosshair Center */}
          <line x1="185" y1="190" x2="195" y2="190" stroke={strokeColor} strokeWidth="1" />
          <line x1="190" y1="185" x2="190" y2="195" stroke={strokeColor} strokeWidth="1" />
          <circle cx="190" cy="190" r="8" stroke={strokeColor} strokeWidth="0.75" strokeDasharray="2 2" />

          {/* Technical Specs Callout */}
          <text x="375" y="170" fill="#0B1220" fontSize="10" fontFamily="var(--font-mono)">
            CHASSIS: TITANIUM
          </text>
          <text x="375" y="185" fill={dimColor} fontSize="9" fontFamily="var(--font-mono)">
            BEZEL: 1.15 mm
          </text>
          <text x="375" y="200" fill={dimColor} fontSize="9" fontFamily="var(--font-mono)">
            RADIUS: R16.0
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'laptop') {
    const w = widthMm || 312.6;
    const h = heightMm || 221.2;
    const t = thicknessMm || 15.5;

    return (
      <div dir="ltr" className={`relative flex items-center justify-center p-3 sm:p-6 bg-white border border-[#E5E7EB] overflow-hidden min-w-0 w-full max-w-full ${className}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none" />

        <svg viewBox="0 0 460 380" className="w-full h-auto max-h-[360px] min-w-0 max-w-full relative z-10" style={{ maxWidth: '100%', minWidth: 0, width: '100%' }} fill="none">
          {/* Laptop Open Clamshell Isometric Elevation */}
          {/* Display Base */}
          <polygon
            points="60,260 230,260 400,260 350,330 110,330"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill="#FFFFFF"
          />

          {/* Trackpad */}
          <polygon
            points="180,290 280,290 270,325 190,325"
            stroke={dimColor}
            strokeWidth="1"
            fill="#F8FAFC"
          />

          {/* Keyboard Grid block */}
          <polygon
            points="100,265 360,265 340,285 120,285"
            stroke={gridColor}
            strokeWidth="1"
            fill="#F1F5F9"
          />

          {/* Screen Upper Lid */}
          <polygon
            points="60,260 400,260 400,90 60,90"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill="#FFFFFF"
          />

          {/* Screen active area */}
          <rect
            x="72"
            y="102"
            width="316"
            height="146"
            stroke={gridColor}
            strokeWidth="1"
            fill="#F8FAFC"
          />

          {/* Aspect Ratio 16:10 Diagonal Ray */}
          <line x1="72" y1="102" x2="388" y2="248" stroke="#00D2FF" strokeWidth="0.75" strokeDasharray="4 4" />
          <text x="230" y="180" fill="#0A3CFF" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">
            14.2&quot; Liquid Retina XDR • 16:10
          </text>

          {/* Dimensions */}
          <line x1="60" y1="70" x2="400" y2="70" stroke={dimColor} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="60" y1="65" x2="60" y2="75" stroke={dimColor} strokeWidth="1" />
          <line x1="400" y1="65" x2="400" y2="75" stroke={dimColor} strokeWidth="1" />
          <text x="230" y="60" fill={dimColor} fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle">
            {w} mm WIDTH • {h} mm DEPTH
          </text>

          {/* Thickness Callout */}
          <line x1="420" y1="260" x2="420" y2="330" stroke={dimColor} strokeWidth="1" strokeDasharray="2 2" />
          <line x1="415" y1="260" x2="425" y2="260" stroke={dimColor} strokeWidth="1" />
          <line x1="415" y1="330" x2="425" y2="330" stroke={dimColor} strokeWidth="1" />
          <text x="435" y="300" fill={dimColor} fontSize="11" fontFamily="var(--font-mono)">
            {t} mm
          </text>

          <text x="230" y="355" fill="#0B1220" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
            UNIBODY CNC AEROSPACE ALUMINUM
          </text>
        </svg>
      </div>
    );
  }

  if (type === 'audio') {
    return (
      <div dir="ltr" className={`relative flex items-center justify-center p-3 sm:p-6 bg-white border border-[#E5E7EB] overflow-hidden min-w-0 w-full max-w-full ${className}`}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none" />

        <svg viewBox="0 0 460 380" className="w-full h-auto max-h-[360px] min-w-0 max-w-full relative z-10" style={{ maxWidth: '100%', minWidth: 0, width: '100%' }} fill="none">
          {/* Headphone Arch Band */}
          <path
            d="M 120 220 C 120 80, 340 80, 340 220"
            stroke={strokeColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M 135 200 C 135 100, 325 100, 325 200"
            stroke={gridColor}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Left Earcup */}
          <rect
            x="95"
            y="180"
            width="46"
            height="90"
            rx="23"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill="#FFFFFF"
          />
          <circle cx="118" cy="225" r="16" stroke={gridColor} strokeWidth="1" />
          <circle cx="118" cy="225" r="4" fill={strokeColor} />

          {/* Right Earcup */}
          <rect
            x="319"
            y="180"
            width="46"
            height="90"
            rx="23"
            stroke={strokeColor}
            strokeWidth="1.5"
            fill="#FFFFFF"
          />
          <circle cx="342" cy="225" r="16" stroke={gridColor} strokeWidth="1" />
          <circle cx="342" cy="225" r="4" fill={strokeColor} />

          {/* Driver Ray Callout */}
          <line x1="140" y1="225" x2="230" y2="225" stroke="#00D2FF" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="230" cy="225" r="2" fill="#00D2FF" />
          <text x="230" y="215" fill="#0A3CFF" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">
            45 mm BERYLLIUM DRIVER
          </text>
          <text x="230" y="242" fill={dimColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
            HYBRID ANC: -48 dB
          </text>

          {/* Dimensions */}
          <line x1="70" y1="80" x2="70" y2="280" stroke={dimColor} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="65" y1="80" x2="75" y2="80" stroke={dimColor} strokeWidth="1" />
          <line x1="65" y1="280" x2="75" y2="280" stroke={dimColor} strokeWidth="1" />
          <text x="60" y="180" fill={dimColor} fontSize="11" fontFamily="var(--font-mono)" textAnchor="end">
            195 mm
          </text>

          <text x="230" y="340" fill="#0B1220" fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
            ACOUSTIC LAB CALIBRATION // 24-BIT 96kHz LDAC
          </text>
        </svg>
      </div>
    );
  }

  // Default smartwatch
  return (
    <div dir="ltr" className={`relative flex items-center justify-center p-3 sm:p-6 bg-white border border-[#E5E7EB] overflow-hidden min-w-0 w-full max-w-full ${className}`}>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#F1F5F9_1px,transparent_1px),linear-gradient(to_bottom,#F1F5F9_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70 pointer-events-none" />

      <svg viewBox="0 0 460 380" className="w-full h-auto max-h-[360px] min-w-0 max-w-full relative z-10" style={{ maxWidth: '100%', minWidth: 0, width: '100%' }} fill="none">
        {/* Watch Straps */}
        <path d="M 175 40 L 285 40 L 270 120 L 190 120 Z" stroke={gridColor} strokeWidth="1.5" fill="#F8FAFC" />
        <path d="M 190 260 L 270 260 L 285 340 L 175 340 Z" stroke={gridColor} strokeWidth="1.5" fill="#F8FAFC" />

        {/* Watch Case 49mm */}
        <circle cx="230" cy="190" r="85" stroke={strokeColor} strokeWidth="2" fill="#FFFFFF" />
        <circle cx="230" cy="190" r="72" stroke={gridColor} strokeWidth="1" fill="#F8FAFC" />

        {/* Digital Crown */}
        <rect x="315" y="165" width="10" height="40" rx="2" stroke={strokeColor} strokeWidth="1.5" fill="#FFFFFF" />
        <line x1="320" y1="172" x2="320" y2="198" stroke={strokeColor} strokeWidth="1" />

        {/* Action Button */}
        <rect x="135" y="172" width="10" height="35" rx="2" stroke={strokeColor} strokeWidth="1.5" fill="#FFFFFF" />

        {/* Calipers */}
        <line x1="120" y1="190" x2="340" y2="190" stroke="#00D2FF" strokeWidth="0.75" strokeDasharray="3 3" />
        <text x="230" y="185" fill="#0A3CFF" fontSize="11" fontFamily="var(--font-mono)" textAnchor="middle" fontWeight="500">
          Ø 49.0 mm TITANIUM
        </text>
        <text x="230" y="205" fill={dimColor} fontSize="10" fontFamily="var(--font-mono)" textAnchor="middle">
          WR100 • 3000 NITS
        </text>
      </svg>
    </div>
  );
}
