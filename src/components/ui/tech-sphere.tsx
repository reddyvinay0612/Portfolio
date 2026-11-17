'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCw, Compass, Sparkles, X } from 'lucide-react';
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
  const radiusRef = useRef<number>(200);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const autoRotateRef = useRef<boolean>(true);
  const [activeItem, setActiveItem] = useState<TechBadge | null>(null);

  // Synchronize state to refs for high-frequency 60fps animation loop
  useEffect(() => {
    radiusRef.current = radius;
  }, [radius]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const selectedCategoryRef = useRef<string>(selectedCategory);
  useEffect(() => {
    selectedCategoryRef.current = selectedCategory;
  }, [selectedCategory]);

  // Array of DOM node refs for direct zero-overhead 3D transforms
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D Rotation angles (in radians) and physics velocity
  const rotX = useRef<number>(-0.12);
  const rotY = useRef<number>(0.2);
  const velocity = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const isDragging = useRef<boolean>(false);
  const lastMousePos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragDistance = useRef<number>(0);
  const animFrameId = useRef<number>(0);

  // Responsive radius calculation based on container width
  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      if (width < 450) {
        setRadius(135);
      } else if (width < 768) {
        setRadius(175);
      } else {
        setRadius(215);
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

  // 60FPS Direct-DOM 3D Projections update function
  const updatePositions = useCallback(() => {
    const cosY = Math.cos(rotY.current);
    const sinY = Math.sin(rotY.current);
    const cosX = Math.cos(rotX.current);
    const sinX = Math.sin(rotX.current);
    const cameraDistance = 500;
    const currentRadius = radiusRef.current;
    const activeCategory = selectedCategoryRef.current;

    for (let i = 0; i < items.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const p = basePoints[i];
      if (!p) continue;

      const scaledX = p.x * currentRadius;
      const scaledY = p.y * currentRadius;
      const scaledZ = p.z * currentRadius;

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

      // 4. Depth factors (from 0 in back to 1 at front)
      const depthFactor = Math.max(0, Math.min(1, (z2 + currentRadius) / (2 * currentRadius)));
      const scale = (0.52 + 0.65 * depthFactor) * Math.min(1.22, perspective);
      const baseOpacity = 0.35 + 0.65 * depthFactor;
      const isMatch = activeCategory === 'All' || items[i].category === activeCategory;
      const opacity = isMatch ? baseOpacity : baseOpacity * 0.22;
      const zIndex = Math.round(depthFactor * 1000);

      el.style.transform = `translate3d(${screenX}px, ${screenY}px, 0) scale(${scale})`;
      el.style.zIndex = `${zIndex}`;
      el.style.opacity = `${opacity}`;
      el.style.pointerEvents = isMatch ? 'auto' : 'none';

      // Enhanced shadow for front-facing nodes
      if (depthFactor > 0.6) {
        el.classList.add('tech-sphere-front');
      } else {
        el.classList.remove('tech-sphere-front');
      }
    }
  }, [items, basePoints]);

  // Main high-frequency animation loop with momentum physics & continuous rotation
  useEffect(() => {
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = Math.min(32, currentTime - lastTime);
      lastTime = currentTime;

      if (!isDragging.current) {
        // Continuous smooth auto-rotation
        if (autoRotateRef.current) {
          rotY.current += 0.0055 * (delta / 16);
        }

        // Apply momentum inertia with velocity decay
        rotY.current += velocity.current.x * (delta / 16);
        rotX.current += velocity.current.y * (delta / 16);

        velocity.current.x *= 0.93;
        velocity.current.y *= 0.93;

        // Keep vertical pitch bounded
        rotX.current = Math.max(-1.1, Math.min(1.1, rotX.current));
      }

      updatePositions();
      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId.current);
  }, [updatePositions]);

  // Pointer Interaction Handlers (Mouse & Touch with Pointer Capture)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragDistance.current = 0;
    lastMousePos.current = { x: e.clientX, y: e.clientY };
    velocity.current = { x: 0, y: 0 };
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastMousePos.current.x;
    const dy = e.clientY - lastMousePos.current.y;
    dragDistance.current += Math.abs(dx) + Math.abs(dy);
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    const sensitivity = 0.005;
    rotY.current += dx * sensitivity;
    rotX.current -= dy * sensitivity;
    rotX.current = Math.max(-1.1, Math.min(1.1, rotX.current));

    velocity.current = {
      x: dx * sensitivity * 0.8,
      y: -dy * sensitivity * 0.8
    };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {}
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-[520px] sm:h-[580px] md:h-[620px] select-none overflow-hidden rounded-3xl bg-[#f8f9fa] border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
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
        {items.map((item, idx) => (
          <div
            key={item.name}
            ref={el => { itemRefs.current[idx] = el; }}
            style={{
              position: 'absolute',
              transform: 'translate3d(0, 0, 0) scale(1)',
              willChange: 'transform, opacity, z-index'
            }}
            onClick={(e) => {
              // Ignore clicks that were part of a drag motion
              if (dragDistance.current > 6) return;
              e.stopPropagation();
              setActiveItem(item);
              if (onItemSelect) onItemSelect(item);
            }}
            className="cursor-pointer group flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Circular Bubble Node (Tony Sebastian Image-Sphere Style) */}
            <div 
              style={{
                backgroundColor: item.bgColor,
                color: item.textColor
              }}
              className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full flex flex-col items-center justify-center p-2.5 transition-transform duration-200 group-hover:scale-125 border-2 border-white shadow-[0_12px_30px_-5px_rgba(0,0,0,0.22),0_4px_12px_rgba(0,0,0,0.1)]"
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
        ))}
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
