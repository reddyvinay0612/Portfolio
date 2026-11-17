'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, HTMLAttributes } from 'react';
import { Sparkles, ExternalLink, Github, ChevronRight, Eye, Maximize2 } from 'lucide-react';
import { Project } from '../../data/portfolioData';

// Utility for conditional class names
const cn = (...classes: (string | undefined | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};

// Types & Interfaces
export interface GalleryItemPhoto {
  url: string;
  text?: string;
  pos?: string;
  by?: string;
}

export interface GalleryItem {
  common?: string;
  binomial?: string;
  photo?: GalleryItemPhoto;
  // Extended fields for projects & custom card rendering
  image?: string;
  text?: string;
  title?: string;
  description?: string;
  alt?: string;
  project?: Project;
}

export interface CircularGalleryProps extends Omit<HTMLAttributes<HTMLDivElement>, 'style'> {
  items: (GalleryItem | Project)[];
  /** Controls how far the items are from the center. */
  radius?: number;
  /** Controls the speed of auto-rotation when not scrolling. */
  autoRotateSpeed?: number;
  /** Optional curvature bend multiplier */
  bend?: number;
  /** Whether auto-rotation is active */
  autoScroll?: number;
  /** Legacy & WebGL compatibility props */
  textColor?: string;
  borderRadius?: number;
  itemSize?: number;
  itemAspect?: number;
  gap?: number;
  wave?: number;
  fadeEdges?: number;
  shadow?: number;
  scrollSpeed?: number;
  scrollEase?: number;
  openOnClick?: boolean;
  showTitles?: boolean;
  /** Callback when active front-facing card changes */
  onActiveChange?: (index: number) => void;
  /** Callback when a card is clicked */
  onItemClick?: (item: any, index: number) => void;
  /** Custom renderer for card contents */
  renderItem?: (item: any, index: number, isFront: boolean) => React.ReactNode;
  /** Custom class name */
  className?: string;
  style?: React.CSSProperties;
}

const CircularGallery = React.forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      className,
      radius: customRadius,
      autoRotateSpeed = 0.08,
      bend = 3,
      autoScroll,
      onActiveChange,
      onItemClick,
      renderItem,
      style,
      ...props
    },
    ref
  ) => {
    const [rotation, setRotation] = useState<number>(0);
    const [isScrolling, setIsScrolling] = useState<boolean>(false);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const isDraggingRef = useRef<boolean>(false);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const lastMousePos = useRef<number>(0);
    const dragDistance = useRef<number>(0);
    const velocity = useRef<number>(0);

    // Responsive sizing
    const [windowWidth, setWindowWidth] = useState<number>(
      typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate dynamic radius and card dimensions
    const { defaultRadius, cardWidth, cardHeight } = useMemo(() => {
      if (windowWidth < 640) {
        return { defaultRadius: 360, cardWidth: 280, cardHeight: 400 };
      } else if (windowWidth < 1024) {
        return { defaultRadius: 480, cardWidth: 310, cardHeight: 430 };
      } else {
        return { defaultRadius: 580, cardWidth: 320, cardHeight: 450 };
      }
    }, [windowWidth]);

    const bendMultiplier = bend ? bend / 3 : 1;
    const actualRadius = (customRadius || defaultRadius) * bendMultiplier;

    const count = items.length;
    const anglePerItem = count > 0 ? 360 / count : 360;

    // Actual auto-rotate speed considering props
    const effectiveAutoSpeed = autoScroll !== undefined
      ? (autoScroll > 0 ? autoRotateSpeed : 0)
      : autoRotateSpeed;

    // 1. Effect to handle window scroll-based rotation (from user's code)
    useEffect(() => {
      const handleScroll = () => {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
        const scrollRotation = scrollProgress * 360;
        setRotation(scrollRotation);

        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 150);
      };

      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      };
    }, []);

    // 2. High-performance animation frame loop for auto-rotation & momentum
    useEffect(() => {
      let lastTime = performance.now();

      const autoRotate = (currentTime: number) => {
        const delta = Math.min(32, currentTime - lastTime);
        lastTime = currentTime;

        if (!isScrolling && !isDraggingRef.current) {
          // Continuous smooth auto-rotation
          if (effectiveAutoSpeed !== 0) {
            setRotation((prev) => (prev + effectiveAutoSpeed * (delta / 16)) % 36000);
          }

          // Apply velocity momentum
          if (Math.abs(velocity.current) > 0.01) {
            setRotation((prev) => (prev + velocity.current * (delta / 16)) % 36000);
            velocity.current *= 0.94;
          }
        }

        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [isScrolling, effectiveAutoSpeed]);

    // 3. Track active front card and notify parent
    useEffect(() => {
      if (count === 0) return;
      const normalizedRot = ((rotation % 360) + 360) % 360;
      const activeIdx = Math.round(((360 - normalizedRot) % 360) / anglePerItem) % count;
      onActiveChange?.(activeIdx);
    }, [rotation, count, anglePerItem, onActiveChange]);

    // 4. Pointer Interaction Handlers (Mouse & Touch Drag)
    const handlePointerDown = (e: React.PointerEvent) => {
      setIsDragging(true);
      isDraggingRef.current = true;
      dragDistance.current = 0;
      velocity.current = 0;
      lastMousePos.current = e.clientX;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMousePos.current;
      dragDistance.current += Math.abs(dx);
      lastMousePos.current = e.clientX;

      const sensitivity = 0.28;
      velocity.current = dx * sensitivity * 0.8;
      setRotation((prev) => prev + dx * sensitivity);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      setIsDragging(false);
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    // 5. Wheel Interaction Handler (Scroll wheel to spin)
    const handleWheel = (e: React.WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 2) {
        setRotation((prev) => prev + delta * 0.08);
      }
    };

    // Helper: Normalize item into Project or Photo Gallery structure
    const resolveItem = (rawItem: any): { project?: Project; photo?: GalleryItemPhoto; title: string; subtitle?: string; desc?: string } => {
      if (rawItem?.project) {
        const p = rawItem.project as Project;
        return {
          project: p,
          title: p.title,
          subtitle: p.category,
          desc: p.description
        };
      }
      if (rawItem?.technologies || rawItem?.statusBadge) {
        const p = rawItem as Project;
        return {
          project: p,
          title: p.title,
          subtitle: p.category,
          desc: p.description
        };
      }
      if (rawItem?.photo) {
        return {
          photo: rawItem.photo,
          title: rawItem.common || rawItem.photo.text || '',
          subtitle: rawItem.binomial,
          desc: rawItem.photo.by ? `Photo by: ${rawItem.photo.by}` : ''
        };
      }
      return {
        title: rawItem.title || rawItem.text || rawItem.common || '',
        subtitle: rawItem.binomial || rawItem.category,
        desc: rawItem.description
      };
    };

    return (
      <div
        ref={ref || containerRef}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          "relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden",
          className
        )}
        style={{
          perspective: '2000px',
          ...style
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        {...props}
      >
        {/* The 3D Rotating Cylinder Carousel */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.05s linear'
          }}
        >
          {items.map((rawItem, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = ((itemAngle + totalRotation) % 360 + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);

            // Opacity: Front-facing items are 1.0, items towards back fade down to 0.18
            const opacity = Math.max(0.18, 1 - (normalizedAngle / 180) * 1.15);
            const isFront = normalizedAngle < anglePerItem * 0.7;

            const resolved = resolveItem(rawItem);
            const project = resolved.project;
            const photo = resolved.photo;

            return (
              <div
                key={rawItem && typeof rawItem === 'object' && 'id' in rawItem ? (rawItem as any).id : i}
                role="group"
                aria-label={resolved.title}
                className="absolute transition-opacity duration-300"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${actualRadius}px)`,
                  left: '50%',
                  top: '50%',
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  opacity: opacity,
                  pointerEvents: isFront ? 'auto' : 'none',
                  backfaceVisibility: 'hidden'
                }}
                onClick={() => {
                  if (dragDistance.current > 8) return;
                  onItemClick?.(rawItem, i);
                }}
              >
                {/* 1. Custom Renderer (if provided) */}
                {renderItem ? (
                  renderItem(rawItem, i, isFront)
                ) : project ? (
                  /* 2. Structured Clyde Project Card (Matching Screenshot) */
                  <div className="relative w-full h-full rounded-[26px] bg-white border border-neutral-200/90 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.14)] p-6 flex flex-col justify-between overflow-hidden text-[#212529] hover:border-[#3b82a6] transition-all cursor-pointer group">
                    {/* Top Ambient Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82a6]/10 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      {/* Category Badge & Period */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#3b82a6]/15 border border-[#3b82a6]/30 text-[#163e54] text-[10px] font-mono font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                        {project.period && (
                          <span className="text-[11px] font-mono text-[#6c757d]">
                            {project.period}
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#000000] tracking-tight leading-snug group-hover:text-[#2c6585] transition-colors">
                        {project.title}
                      </h3>

                      {/* Status / Recognition Badge */}
                      {project.statusBadge && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3b82a6]/20 border border-[#3b82a6]/35 text-[#0c2838] text-[10px] font-mono font-bold">
                          <span>★ {project.statusBadge}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="mt-3 text-xs text-[#6c757d] line-clamp-3 leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {project.highlights.slice(0, 2).map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-[#495057] line-clamp-1">
                              <span className="text-[#2c6585] font-bold">✦</span>
                              <span>{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Pill Row */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {project.technologies.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md bg-[#f2f7fa] border border-neutral-200 text-[10px] font-mono text-[#495057] font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-[10px] font-mono text-[#6c757d]">
                              +{project.technologies.length - 5}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Footer */}
                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                      <div className="w-full py-2 rounded-xl bg-[#3b82a6] group-hover:bg-[#2d6785] text-white text-[10px] font-mono font-bold uppercase tracking-widest text-center shadow-sm transition-all flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>Drag to rotate • Click to expand</span>
                      </div>
                    </div>
                  </div>
                ) : photo ? (
                  /* 3. Pure Photo Card (Matching User's Provided Code) */
                  <div className="relative w-full h-full rounded-2xl shadow-2xl overflow-hidden group border border-neutral-200 bg-white/70 backdrop-blur-lg">
                    <img
                      src={photo.url}
                      alt={photo.text || resolved.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ objectPosition: photo.pos || 'center' }}
                      draggable={false}
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                      <h2 className="text-lg font-bold">{resolved.title}</h2>
                      {resolved.subtitle && (
                        <em className="text-xs italic opacity-85 block">{resolved.subtitle}</em>
                      )}
                      {photo.by && (
                        <p className="text-[10px] mt-1 opacity-70">Photo by: {photo.by}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* 4. Fallback Generic Card */
                  <div className="relative w-full h-full rounded-2xl bg-white border border-neutral-200 p-5 shadow-xl flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-[#000000]">{resolved.title}</h3>
                      {resolved.desc && <p className="text-xs text-[#6c757d] mt-2">{resolved.desc}</p>}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
export default CircularGallery;
