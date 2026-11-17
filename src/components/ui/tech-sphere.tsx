'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Compass, Maximize2, Sparkles, X, ExternalLink } from 'lucide-react';
import { TechBadge } from '../../data/portfolioData';

export interface TechSphereProps {
  items: TechBadge[];
  selectedCategory?: string;
  onItemSelect?: (item: TechBadge) => void;
  className?: string;
}

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export const TechSphere: React.FC<TechSphereProps> = ({
  items,
  selectedCategory = 'All',
  onItemSelect,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [radius, setRadius] = useState<number>(200);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [activeItem, setActiveItem] = useState<TechBadge | null>(null);

  // Rotation angles (in radians)
  const rotX = useRef<number>(-0.15);
  const rotY = useRef<number>(0.2);
  const velocity = useRef<{ x: number; y: number }>({ x: 0.003, y: 0 });
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const animFrameId = useRef<number>(0);
  const [, setTick] = useState<number>(0);

  // Dynamically compute sphere radius based on container size
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width < 450) {
        setRadius(140);
      } else if (width < 768) {
        setRadius(180);
      } else {
        setRadius(220);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Compute 3D Fibonacci Sphere lattice distribution for uniform geometric coverage
  const basePoints = useMemo<Point3D[]>(() => {
    const count = items.length;
    const points: Point3D[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians (~2.39996)

    for (let i = 0; i < count; i++) {
      // y evenly distributed from 1 down to -1
      const y = 1 - (i / Math.max(1, count - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      points.push({ x, y, z });
    }
    return points;
  }, [items.length]);

  // Main 3D animation loop with inertia momentum physics & auto-spin
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = Math.min(32, currentTime - lastTime);
      lastTime = currentTime;

      if (!isDragging.current) {
        // Auto-rotation around vertical Y-axis
        if (autoRotate) {
          rotY.current += 0.0028 * (delta / 16);
        }

        // Apply momentum inertia with velocity damping
        rotY.current += velocity.current.x * (delta / 16);
        rotX.current += velocity.current.y * (delta / 16);

        velocity.current.x *= 0.94;
        velocity.current.y *= 0.94;

        // Clamp vertical pitch to prevent gimbal disorientations
        rotX.current = Math.max(-1.1, Math.min(1.1, rotX.current));
      }

      setTick(t => (t + 1) % 100000);
      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [autoRotate]);

  // Mouse & Touch Drag Interaction Handlers
  const handlePointerDown = useCallback((clientX: number, clientY: number) => {
    isDragging.current = true;
    lastMousePos.current = { x: clientX, y: clientY };
    velocity.current = { x: 0, y: 0 };
  }, []);

  const handlePointerMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const dx = clientX - lastMousePos.current.x;
    const dy = clientY - lastMousePos.current.y;

    lastMousePos.current = { x: clientX, y: clientY };

    // Update rotation directly with sensitivity tuning
    const sensitivity = 0.005;
    rotY.current += dx * sensitivity;
    rotX.current -= dy * sensitivity;

    rotX.current = Math.max(-1.1, Math.min(1.1, rotX.current));

    // Store velocity for smooth inertial throw
    velocity.current = {
      x: dx * sensitivity * 0.7,
      y: -dy * sensitivity * 0.7
    };
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Compute current screen projections for each item
  const projectedItems = useMemo(() => {
    const cosY = Math.cos(rotY.current);
    const sinY = Math.sin(rotY.current);
    const cosX = Math.cos(rotX.current);
    const sinX = Math.sin(rotX.current);
    const cameraDistance = 500;

    return items.map((item, idx) => {
      const p = basePoints[idx] || { x: 0, y: 0, z: 0 };
      const scaledX = p.x * radius;
      const scaledY = p.y * radius;
      const scaledZ = p.z * radius;

      // 1. Rotate around Y-axis
      const x1 = scaledX * cosY + scaledZ * sinY;
      const z1 = -scaledX * sinY + scaledZ * cosY;

      // 2. Rotate around X-axis
      const y2 = scaledY * cosX - z1 * sinX;
      const z2 = scaledY * sinX + z1 * cosX;
      const x2 = x1;

      // 3. Perspective projection
      const perspective = cameraDistance / Math.max(10, cameraDistance - z2);
      const screenX = x2 * perspective;
      const screenY = y2 * perspective;

      // 4. Depth factors (from 0 at back to 1 at front)
      const depthFactor = Math.max(0, Math.min(1, (z2 + radius) / (2 * radius)));
      const scale = (0.5 + 0.65 * depthFactor) * Math.min(1.25, perspective);
      const opacity = 0.3 + 0.7 * depthFactor;
      const zIndex = Math.round(depthFactor * 1000);

      const isCategoryMatch = selectedCategory === 'All' || item.category === selectedCategory;

      return {
        item,
        screenX,
        screenY,
        scale,
        opacity: isCategoryMatch ? opacity : opacity * 0.25,
        zIndex,
        depthFactor,
        isCategoryMatch
      };
    });
  }, [items, basePoints, radius, selectedCategory]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[580px] md:h-[620px] select-none overflow-hidden rounded-3xl bg-[#f8f9fa] border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={e => handlePointerDown(e.clientX, e.clientY)}
      onMouseMove={e => handlePointerMove(e.clientX, e.clientY)}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={e => {
        if (e.touches[0]) handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchMove={e => {
        if (e.touches[0]) handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }}
      onTouchEnd={handlePointerUp}
    >
      {/* Background Soft Tech Grid */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Floating Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        
        {/* Left: Navigation hint */}
        <div className="pointer-events-auto inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[11px] font-mono text-[#495057] shadow-sm">
          <Compass className="w-3.5 h-3.5 text-[#b1b493] animate-spin" style={{ animationDuration: '8s' }} />
          <span>Drag 3D sphere to rotate  •  Click node to inspect</span>
        </div>

        {/* Right: Auto-spin toggle button */}
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setAutoRotate(prev => !prev);
            }}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono transition-all border shadow-sm ${
              autoRotate 
                ? 'bg-[#b1b493]/20 border-[#b1b493]/50 text-[#3a3d24] font-semibold' 
                : 'bg-white/90 border-neutral-200 text-[#6c757d] hover:text-[#000000]'
            }`}
            title="Toggle Auto Rotation"
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'text-[#b1b493] animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            <span>{autoRotate ? 'Auto-Orbit On' : 'Paused'}</span>
          </button>
        </div>

      </div>

      {/* 3D Sphere Stage (Origin at Center) */}
      <div className="relative w-0 h-0 flex items-center justify-center pointer-events-none">
        {projectedItems.map(({ item, screenX, screenY, scale, opacity, zIndex, depthFactor, isCategoryMatch }) => {
          const isFront = depthFactor > 0.55;

          return (
            <div
              key={item.name}
              style={{
                position: 'absolute',
                transform: `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale})`,
                zIndex,
                opacity,
                pointerEvents: isCategoryMatch ? 'auto' : 'none'
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveItem(item);
                if (onItemSelect) onItemSelect(item);
              }}
              className="cursor-pointer group flex flex-col items-center justify-center transition-opacity duration-300"
            >
              {/* Circular Bubble Node (Tony Sebastian Image-Sphere Style) */}
              <div 
                style={{
                  backgroundColor: item.bgColor,
                  color: item.textColor
                }}
                className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center p-2.5 transition-transform duration-200 group-hover:scale-125 border-2 ${
                  isFront 
                    ? 'border-white shadow-[0_12px_30px_-5px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.1)]' 
                    : 'border-white/60 shadow-md'
                }`}
              >
                {/* Brand Symbol / Icon */}
                <span className="text-xl sm:text-2xl font-black drop-shadow-sm select-none leading-none mb-0.5">
                  {item.iconSymbol || item.name.slice(0, 2)}
                </span>

                {/* Micro Label inside node */}
                <span className="text-[10px] sm:text-[11px] font-mono font-black uppercase tracking-tight line-clamp-1 select-none text-center leading-tight opacity-95">
                  {item.name}
                </span>

                {/* Subtle sheen highlight */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/10 via-transparent to-white/30 pointer-events-none" />
              </div>

              {/* Floating Name Tooltip on Hover */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-2 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase pointer-events-none shadow-lg whitespace-nowrap z-50">
                {item.name} • {item.category}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Center Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-neutral-200 text-[11px] font-mono text-[#495057] shadow-sm">
          <Sparkles className="w-3 h-3 text-[#b1b493]" />
          <span>Interactive 3D Tech Sphere • Click any node to explore</span>
        </div>
      </div>

      {/* Selected Item Quick Inspection Modal */}
      <AnimatePresence>
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm cursor-default"
            onClick={() => setActiveItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-white p-7 rounded-3xl border border-neutral-200 max-w-sm w-full shadow-2xl relative text-[#212529]"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-[#495057] hover:text-[#000000] hover:bg-neutral-200 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3.5 mb-4">
                <div 
                  style={{ backgroundColor: activeItem.bgColor, color: activeItem.textColor }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-md border border-black/10 shrink-0"
                >
                  {activeItem.iconSymbol || activeItem.name.slice(0, 2)}
                </div>

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e916c] font-bold block">
                    {activeItem.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-[#000000]">
                    {activeItem.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-[#6c757d] leading-relaxed mb-6 font-normal">
                {activeItem.name} is a core competency utilized across full-stack production, machine learning architectures, and modern cloud deployment pipelines.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs font-mono">
                <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active In Production
                </span>

                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-1.5 rounded-full bg-[#b1b493] hover:bg-[#9a9d7c] text-white font-semibold shadow-sm"
                >
                  Got It
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
