'use client';

import React, { useRef, useEffect, useState } from 'react';
import { 
  RotateCw, 
  Layers, 
  Sparkles, 
  Maximize2, 
  Check, 
  Cpu, 
  Camera, 
  ShieldCheck, 
  Zap,
  Eye,
  RefreshCcw
} from 'lucide-react';

interface Interactive3DViewerProps {
  initialColor?: string;
}

export default function Interactive3DViewer({ initialColor = '#374151' }: Interactive3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Interactive state
  const [rotation, setRotation] = useState({ x: 12, y: -35 });
  const [targetRotation, setTargetRotation] = useState({ x: 12, y: -35 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [autoRotate, setAutoRotate] = useState(true);
  const [explodedMode, setExplodedMode] = useState(false);
  const [explodeProgress, setExplodeProgress] = useState(0); // 0 (assembled) to 1 (fully exploded)
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Finishes
  const finishes = [
    { id: 'titanium-gray', name: 'تيتانيوم طبيعي', hex: '#374151', rim: '#6b7280', back: '#1f2937' },
    { id: 'ocean-blue', name: 'أزرق محيطي ليلي', hex: '#0f2b48', rim: '#0284c7', back: '#0a1a2b' },
    { id: 'platinum-silver', name: 'فضي بلاتيني', hex: '#e2e8f0', rim: '#f8fafc', back: '#cbd5e1' },
    { id: 'obsidian-black', name: 'أسود أوبسيديان', hex: '#111827', rim: '#374151', back: '#030712' },
  ];
  const [selectedFinish, setSelectedFinish] = useState(finishes[0]);

  // Explode animation loop
  useEffect(() => {
    let animId: number;
    const target = explodedMode ? 1 : 0;
    const animateExplode = () => {
      setExplodeProgress((cur) => {
        const diff = target - cur;
        if (Math.abs(diff) < 0.01) return target;
        return cur + diff * 0.12;
      });
      animId = requestAnimationFrame(animateExplode);
    };
    animId = requestAnimationFrame(animateExplode);
    return () => cancelAnimationFrame(animId);
  }, [explodedMode]);

  // Auto rotate loop when idle
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setTargetRotation((r) => ({
        x: r.x,
        y: (r.y + 0.6) % 360,
      }));
    }, 20);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Smooth rotation dampening
  useEffect(() => {
    let frameId: number;
    const damp = () => {
      setRotation((cur) => ({
        x: cur.x + (targetRotation.x - cur.x) * 0.15,
        y: cur.y + (targetRotation.y - cur.y) * 0.15,
      }));
      frameId = requestAnimationFrame(damp);
    };
    frameId = requestAnimationFrame(damp);
    return () => cancelAnimationFrame(frameId);
  }, [targetRotation]);

  // Canvas WebGL/2D Pseudo-3D Depth Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    const radX = (rotation.x * Math.PI) / 180;
    const radY = (rotation.y * Math.PI) / 180;

    // Dimensions of the 3D phone
    const phoneW = 160;
    const phoneH = 320;
    const phoneD = 16;

    // Explode offsets
    const screenOffsetZ = explodeProgress * 90;
    const chipOffsetZ = explodeProgress * 30;
    const batteryOffsetZ = -explodeProgress * 30;
    const chassisOffsetZ = -explodeProgress * 90;

    // 3D Point projection helper
    const project = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const cosY = Math.cos(radY);
      const sinY = Math.sin(radY);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotate around X axis
      const cosX = Math.cos(radX);
      const sinX = Math.sin(radX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      // Perspective projection
      const fov = 650;
      const scale = fov / (fov + z2 + 100);
      return {
        x: cx + x1 * scale,
        y: cy + y2 * scale,
        scale,
        depth: z2,
      };
    };

    // Layers definition (sorted by depth dynamically)
    interface RenderLayer {
      id: string;
      title: string;
      depth: number;
      draw: () => void;
    }

    const layers: RenderLayer[] = [];

    // 1. Back Chassis & Camera Island
    const backCenter = project(0, 0, -phoneD / 2 + chassisOffsetZ);
    layers.push({
      id: 'chassis',
      title: 'الهيكل الخلفي التيتانيوم والكاميرات',
      depth: backCenter.depth,
      draw: () => {
        ctx.save();
        const p1 = project(-phoneW / 2, -phoneH / 2, -phoneD / 2 + chassisOffsetZ);
        const p2 = project(phoneW / 2, -phoneH / 2, -phoneD / 2 + chassisOffsetZ);
        const p3 = project(phoneW / 2, phoneH / 2, -phoneD / 2 + chassisOffsetZ);
        const p4 = project(-phoneW / 2, phoneH / 2, -phoneD / 2 + chassisOffsetZ);

        // Drop shadow on ground
        ctx.beginPath();
        const shadowP = project(0, phoneH / 2 + 50, chassisOffsetZ);
        ctx.ellipse(shadowP.x, shadowP.y, (phoneW / 1.5) * shadowP.scale, 20 * shadowP.scale, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.12)';
        ctx.fill();

        // Chassis polygon
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();

        const grad = ctx.createLinearGradient(p1.x, p1.y, p3.x, p3.y);
        grad.addColorStop(0, selectedFinish.rim);
        grad.addColorStop(0.5, selectedFinish.hex);
        grad.addColorStop(1, selectedFinish.back);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.lineWidth = 2 * backCenter.scale;
        ctx.strokeStyle = selectedFinish.rim;
        ctx.stroke();

        // 3D Triple Camera Island
        const camIslandW = 68;
        const camIslandH = 75;
        const cp1 = project(-phoneW / 2 + 15, -phoneH / 2 + 15, -phoneD / 2 - 6 + chassisOffsetZ);
        const cp2 = project(-phoneW / 2 + 15 + camIslandW, -phoneH / 2 + 15, -phoneD / 2 - 6 + chassisOffsetZ);
        const cp3 = project(-phoneW / 2 + 15 + camIslandW, -phoneH / 2 + 15 + camIslandH, -phoneD / 2 - 6 + chassisOffsetZ);
        const cp4 = project(-phoneW / 2 + 15, -phoneH / 2 + 15 + camIslandH, -phoneD / 2 - 6 + chassisOffsetZ);

        ctx.beginPath();
        ctx.moveTo(cp1.x, cp1.y);
        ctx.lineTo(cp2.x, cp2.y);
        ctx.lineTo(cp3.x, cp3.y);
        ctx.lineTo(cp4.x, cp4.y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
        ctx.fill();
        ctx.strokeStyle = selectedFinish.rim;
        ctx.stroke();

        // Three Camera Lenses
        const lensPos = [
          { x: -phoneW / 2 + 32, y: -phoneH / 2 + 32 },
          { x: -phoneW / 2 + 32, y: -phoneH / 2 + 65 },
          { x: -phoneW / 2 + 62, y: -phoneH / 2 + 48 },
        ];
        lensPos.forEach((lp, i) => {
          const lpProj = project(lp.x, lp.y, -phoneD / 2 - 10 + chassisOffsetZ);
          ctx.beginPath();
          ctx.arc(lpProj.x, lpProj.y, 11 * lpProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = '#030712';
          ctx.fill();
          ctx.lineWidth = 1.5 * lpProj.scale;
          ctx.strokeStyle = '#38bdf8';
          ctx.stroke();

          // Specular gleam on glass
          ctx.beginPath();
          ctx.arc(lpProj.x - 3 * lpProj.scale, lpProj.y - 3 * lpProj.scale, 3 * lpProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
          ctx.fill();
        });

        ctx.restore();
      },
    });

    // 2. Battery & Internal Subsystems (only in exploded mode)
    if (explodeProgress > 0.05) {
      const batCenter = project(0, 0, batteryOffsetZ);
      layers.push({
        id: 'battery',
        title: 'بطارية 5400mAh ولفائف الشحن المغناطيسي Qi2',
        depth: batCenter.depth,
        draw: () => {
          ctx.save();
          const bp1 = project(-phoneW / 2 + 15, -phoneH / 2 + 70, batteryOffsetZ);
          const bp2 = project(phoneW / 2 - 15, -phoneH / 2 + 70, batteryOffsetZ);
          const bp3 = project(phoneW / 2 - 15, phoneH / 2 - 20, batteryOffsetZ);
          const bp4 = project(-phoneW / 2 + 15, phoneH / 2 - 20, batteryOffsetZ);

          ctx.beginPath();
          ctx.moveTo(bp1.x, bp1.y);
          ctx.lineTo(bp2.x, bp2.y);
          ctx.lineTo(bp3.x, bp3.y);
          ctx.lineTo(bp4.x, bp4.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(30, 41, 59, ${0.9 * explodeProgress})`;
          ctx.fill();
          ctx.lineWidth = 1.5;
          ctx.strokeStyle = '#10b981';
          ctx.stroke();

          // Wireless charging magnetic coil
          const coilP = project(0, 20, batteryOffsetZ + 2);
          ctx.beginPath();
          ctx.arc(coilP.x, coilP.y, 35 * coilP.scale, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)';
          ctx.lineWidth = 3 * coilP.scale;
          ctx.stroke();

          ctx.restore();
        },
      });

      // 3. Vapor Chamber & Orion X1 3nm Bionic Chip Layer
      const chipCenter = project(0, -60, chipOffsetZ);
      layers.push({
        id: 'chip',
        title: 'شريحة Orion X1 وغرفة التبريد بالبخار',
        depth: chipCenter.depth,
        draw: () => {
          ctx.save();
          // Copper Vapor Chamber
          const vp1 = project(-phoneW / 2 + 20, -phoneH / 2 + 30, chipOffsetZ);
          const vp2 = project(phoneW / 2 - 20, -phoneH / 2 + 30, chipOffsetZ);
          const vp3 = project(phoneW / 2 - 20, 0, chipOffsetZ);
          const vp4 = project(-phoneW / 2 + 20, 0, chipOffsetZ);

          ctx.beginPath();
          ctx.moveTo(vp1.x, vp1.y);
          ctx.lineTo(vp2.x, vp2.y);
          ctx.lineTo(vp3.x, vp3.y);
          ctx.lineTo(vp4.x, vp4.y);
          ctx.closePath();
          ctx.fillStyle = `rgba(180, 83, 9, ${0.85 * explodeProgress})`;
          ctx.fill();
          ctx.strokeStyle = '#f59e0b';
          ctx.stroke();

          // Silicon Chip
          const cp = project(0, -phoneH / 2 + 75, chipOffsetZ + 3);
          const chipSize = 26 * cp.scale;
          ctx.fillStyle = '#0f172a';
          ctx.fillRect(cp.x - chipSize, cp.y - chipSize, chipSize * 2, chipSize * 2);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.strokeRect(cp.x - chipSize, cp.y - chipSize, chipSize * 2, chipSize * 2);

          // Glowing label
          ctx.fillStyle = '#38bdf8';
          ctx.font = `bold ${Math.max(9, 10 * cp.scale)}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('3nm BIONIC', cp.x, cp.y + 4);

          ctx.restore();
        },
      });
    }

    // 4. Front Screen Glass (LTPO AMOLED with active UI preview)
    const frontCenter = project(0, 0, phoneD / 2 + screenOffsetZ);
    layers.push({
      id: 'screen',
      title: 'شاشة LTPO AMOLED 120Hz فائقة النقاء',
      depth: frontCenter.depth,
      draw: () => {
        ctx.save();
        const sp1 = project(-phoneW / 2, -phoneH / 2, phoneD / 2 + screenOffsetZ);
        const sp2 = project(phoneW / 2, -phoneH / 2, phoneD / 2 + screenOffsetZ);
        const sp3 = project(phoneW / 2, phoneH / 2, phoneD / 2 + screenOffsetZ);
        const sp4 = project(-phoneW / 2, phoneH / 2, phoneD / 2 + screenOffsetZ);

        // Frame
        ctx.beginPath();
        ctx.moveTo(sp1.x, sp1.y);
        ctx.lineTo(sp2.x, sp2.y);
        ctx.lineTo(sp3.x, sp3.y);
        ctx.lineTo(sp4.x, sp4.y);
        ctx.closePath();
        ctx.fillStyle = '#020617';
        ctx.fill();
        ctx.lineWidth = 3 * frontCenter.scale;
        ctx.strokeStyle = selectedFinish.rim;
        ctx.stroke();

        // Screen bezel (inner active display)
        const bp1 = project(-phoneW / 2 + 5, -phoneH / 2 + 6, phoneD / 2 + 1 + screenOffsetZ);
        const bp2 = project(phoneW / 2 - 5, -phoneH / 2 + 6, phoneD / 2 + 1 + screenOffsetZ);
        const bp3 = project(phoneW / 2 - 5, phoneH / 2 - 6, phoneD / 2 + 1 + screenOffsetZ);
        const bp4 = project(-phoneW / 2 + 5, phoneH / 2 - 6, phoneD / 2 + 1 + screenOffsetZ);

        ctx.beginPath();
        ctx.moveTo(bp1.x, bp1.y);
        ctx.lineTo(bp2.x, bp2.y);
        ctx.lineTo(bp3.x, bp3.y);
        ctx.lineTo(bp4.x, bp4.y);
        ctx.closePath();

        // Screen gradient wallpaper
        const screenGrad = ctx.createLinearGradient(bp1.x, bp1.y, bp3.x, bp3.y);
        screenGrad.addColorStop(0, '#0f2b48');
        screenGrad.addColorStop(0.5, '#0284c7');
        screenGrad.addColorStop(1, '#091e33');
        ctx.fillStyle = screenGrad;
        ctx.fill();

        // Dynamic Island Pill on top of screen
        const notchP = project(0, -phoneH / 2 + 16, phoneD / 2 + 2 + screenOffsetZ);
        ctx.beginPath();
        ctx.ellipse(notchP.x, notchP.y, 22 * notchP.scale, 6 * notchP.scale, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#000000';
        ctx.fill();

        // Simulated Lockscreen Clock
        const clockP = project(0, -phoneH / 2 + 65, phoneD / 2 + 2 + screenOffsetZ);
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold ${Math.max(16, 22 * clockP.scale)}px sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillText('09:41', clockP.x, clockP.y);

        // Arabic greeting
        ctx.font = `${Math.max(10, 11 * clockP.scale)}px sans-serif`;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fillText('تايتان برو ألترا 5G', clockP.x, clockP.y + 16 * clockP.scale);

        // Specular screen reflection across glass
        ctx.beginPath();
        ctx.moveTo(bp1.x, bp1.y);
        ctx.lineTo(bp2.x - 30 * frontCenter.scale, bp2.y);
        ctx.lineTo(bp4.x, bp4.y - 80 * frontCenter.scale);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.fill();

        ctx.restore();
      },
    });

    // Render layers sorted by back-to-front depth
    layers.sort((a, b) => a.depth - b.depth);
    layers.forEach((l) => l.draw());

  }, [rotation, explodeProgress, selectedFinish]);

  // Mouse & Touch Interaction Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStart.x;
    const deltaY = e.clientY - dragStart.y;
    setTargetRotation((cur) => ({
      x: Math.max(-55, Math.min(55, cur.x - deltaY * 0.45)),
      y: (cur.y + deltaX * 0.45) % 360,
    }));
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const resetView = () => {
    setTargetRotation({ x: 12, y: -35 });
    setExplodedMode(false);
    setAutoRotate(true);
  };

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-b from-slate-900 via-[#0a1f33] to-[#0f2b48] border border-slate-700/80 shadow-2xl overflow-hidden p-6 text-white select-none">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
              محاكي الأجهزة ثلاثي الأبعاد 360° Interactive Canvas
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
            استكشف هاتف تايتان برو ألترا من كل زاوية
          </h3>
        </div>

        {/* View Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setExplodedMode(!explodedMode)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              explodedMode
                ? 'bg-sky-400 text-slate-950 shadow-lg shadow-sky-400/20'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{explodedMode ? 'تجميع الجهاز' : 'تفكيك الطبقات الهندسية'}</span>
          </button>

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-xl text-xs font-semibold transition-colors ${
              autoRotate ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30' : 'bg-white/10 text-slate-400'
            }`}
            title="دوران تلقائي"
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </button>

          <button
            type="button"
            onClick={resetView}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
            title="إعادة ضبط الزاوية"
          >
            <RefreshCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div
        className="relative h-[380px] sm:h-[430px] w-full flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <canvas
          ref={canvasRef}
          width={520}
          height={430}
          className="w-full h-full max-w-[520px] max-h-[430px] object-contain pointer-events-none"
        />

        {/* Drag Hint Overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-white/10 backdrop-blur-md text-[11px] text-slate-300 flex items-center gap-2 pointer-events-none">
          <Eye className="w-3.5 h-3.5 text-sky-400" />
          <span>اسحب بالماوس للتدوير الحر في الفضاء ثلاثي الأبعاد</span>
        </div>

        {/* Exploded Mode Indicator Badges */}
        {explodedMode && (
          <div className="absolute right-4 top-4 space-y-2 text-right pointer-events-none animate-in fade-in duration-300">
            <div className="p-2 rounded-xl bg-slate-900/80 border border-sky-400/40 text-[11px] text-sky-300 font-bold backdrop-blur-md">
              1. شاشة LTPO AMOLED
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-amber-400/40 text-[11px] text-amber-300 font-bold backdrop-blur-md">
              2. شريحة Orion X1 3nm وغرفة البخار
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-emerald-400/40 text-[11px] text-emerald-300 font-bold backdrop-blur-md">
              3. بطارية 5400mAh وشحن لاسلكي
            </div>
            <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-400/40 text-[11px] text-slate-300 font-bold backdrop-blur-md">
              4. هيكل التيتانيوم والكاميرات
            </div>
          </div>
        )}
      </div>

      {/* Bottom Color & Preset Angle Switcher */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
        {/* Color Palette Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-bold">خامات التيتانيوم:</span>
          <div className="flex items-center gap-2">
            {finishes.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFinish(f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                  selectedFinish.id === f.id
                    ? 'bg-white/20 border-sky-400 text-white ring-2 ring-sky-400/40'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                }`}
              >
                <span className="w-3 h-3 rounded-full border border-white/30" style={{ backgroundColor: f.hex }} />
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Preset Camera Angles */}
        <div className="flex items-center gap-1.5 text-xs">
          {[
            { label: 'الواجهة', x: 0, y: 0 },
            { label: 'الخلفية', x: 0, y: 180 },
            { label: 'زاوية 45°', x: 15, y: -45 },
            { label: 'الجانب', x: 0, y: 90 },
          ].map((preset) => (
            <button
              key={preset.label}
              type="button"
              onClick={() => {
                setAutoRotate(false);
                setTargetRotation({ x: preset.x, y: preset.y });
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 font-medium transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}
