'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback, HTMLAttributes } from 'react';
import { Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
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
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const rotationRef = useRef<number>(0);
    const targetRotationRef = useRef<number | null>(null);
    const isDraggingRef = useRef<boolean>(false);
    const isHoveredRef = useRef<boolean>(false);
    const animationFrameRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const lastMousePos = useRef<number>(0);
    const dragDistance = useRef<number>(0);
    const velocity = useRef<number>(0);
    const lastActiveIdxRef = useRef<number>(-1);
    const onActiveChangeRef = useRef(onActiveChange);
    onActiveChangeRef.current = onActiveChange;

    // Responsive sizing
    const [windowWidth, setWindowWidth] = useState<number>(
      typeof window !== 'undefined' ? window.innerWidth : 1200
    );

    useEffect(() => {
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Calculate dynamic radius and card dimensions so front & side cards fit without clipping
    const { defaultRadius, cardWidth, cardHeight } = useMemo(() => {
      if (windowWidth < 640) {
        return { defaultRadius: 230, cardWidth: 270, cardHeight: 410 };
      } else if (windowWidth < 1024) {
        return { defaultRadius: 310, cardWidth: 300, cardHeight: 430 };
      } else {
        return { defaultRadius: 370, cardWidth: 320, cardHeight: 440 };
      }
    }, [windowWidth]);

    const bendMultiplier = bend ? bend / 3 : 1;
    const actualRadius = (customRadius || defaultRadius) * bendMultiplier;

    const count = items.length;
    const anglePerItem = count > 0 ? 360 / count : 360;

    // Actual auto-rotate speed considering props (disabled if 1 or fewer items)
    const effectiveAutoSpeed =
      count <= 1
        ? 0
        : autoScroll !== undefined
        ? autoScroll > 0
          ? autoRotateSpeed
          : 0
        : autoRotateSpeed;

    // Reset rotation cleanly when item count changes (e.g. category filter)
    useEffect(() => {
      rotationRef.current = 0;
      targetRotationRef.current = null;
      velocity.current = 0;
      lastActiveIdxRef.current = 0;
      setRotation(0);
      if (count > 0) {
        onActiveChangeRef.current?.(0);
      }
    }, [count]);

    // Calculate current active index from rotation
    const getActiveIndex = useCallback(
      (rot: number) => {
        if (count <= 0) return 0;
        const normalizedRot = ((rot % 360) + 360) % 360;
        return Math.round(((360 - normalizedRot) % 360) / anglePerItem) % count;
      },
      [count, anglePerItem]
    );

    // Smoothly rotate carousel to bring a specific card index to the front
    const rotateToIndex = useCallback(
      (targetIdx: number) => {
        if (count <= 1) return;
        velocity.current = 0;
        const desiredMod = (((-targetIdx * anglePerItem) % 360) + 360) % 360;
        const currentMod = ((rotationRef.current % 360) + 360) % 360;
        let diff = desiredMod - currentMod;
        if (diff > 180) diff -= 360;
        if (diff < -180) diff += 360;
        targetRotationRef.current = rotationRef.current + diff;
      },
      [count, anglePerItem]
    );

    const handleStep = useCallback(
      (direction: -1 | 1) => {
        if (count <= 1) return;
        const currentIdx = getActiveIndex(rotationRef.current);
        const nextIdx = (currentIdx + direction + count) % count;
        rotateToIndex(nextIdx);
      },
      [count, getActiveIndex, rotateToIndex]
    );

    // High-performance 60fps animation frame loop for auto-rotation, momentum, & target snapping
    useEffect(() => {
      let lastTime = performance.now();

      const tick = (currentTime: number) => {
        const delta = Math.min(32, currentTime - lastTime);
        lastTime = currentTime;

        if (count <= 1) {
          if (rotationRef.current !== 0) {
            rotationRef.current = 0;
            setRotation(0);
          }
          animationFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        let updated = false;

        if (!isDraggingRef.current) {
          if (targetRotationRef.current !== null) {
            // Smooth spring-like ease toward clicked/selected card
            const diff = targetRotationRef.current - rotationRef.current;
            if (Math.abs(diff) < 0.15) {
              rotationRef.current = targetRotationRef.current;
              targetRotationRef.current = null;
            } else {
              rotationRef.current += diff * Math.min(1, 0.14 * (delta / 16));
            }
            updated = true;
          } else {
            // Apply momentum from drag release
            if (Math.abs(velocity.current) > 0.02) {
              rotationRef.current += velocity.current * (delta / 16);
              velocity.current *= Math.pow(0.93, delta / 16);
              updated = true;
            } else {
              velocity.current = 0;
              // Continuous gentle auto-rotation when not hovered
              if (!isHoveredRef.current && effectiveAutoSpeed !== 0) {
                rotationRef.current += effectiveAutoSpeed * (delta / 16);
                updated = true;
              }
            }
          }
        }

        if (updated) {
          setRotation(rotationRef.current);
          const activeIdx = getActiveIndex(rotationRef.current);
          if (activeIdx !== lastActiveIdxRef.current) {
            lastActiveIdxRef.current = activeIdx;
            onActiveChangeRef.current?.(activeIdx);
          }
        }

        animationFrameRef.current = requestAnimationFrame(tick);
      };

      animationFrameRef.current = requestAnimationFrame(tick);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }, [count, effectiveAutoSpeed, getActiveIndex]);

    // Pointer Interaction Handlers (Mouse & Touch Drag)
    const handlePointerDown = (e: React.PointerEvent) => {
      // Ignore pointer drag start on navigation buttons
      if ((e.target as HTMLElement).closest('button[data-gallery-nav="true"]')) return;
      setIsDragging(true);
      isDraggingRef.current = true;
      targetRotationRef.current = null;
      dragDistance.current = 0;
      velocity.current = 0;
      lastMousePos.current = e.clientX;
      (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!isDraggingRef.current || count <= 1) return;
      const dx = e.clientX - lastMousePos.current;
      dragDistance.current += Math.abs(dx);
      lastMousePos.current = e.clientX;

      const sensitivity = 0.28;
      velocity.current = dx * sensitivity * 0.85;
      rotationRef.current += dx * sensitivity;
      setRotation(rotationRef.current);

      const activeIdx = getActiveIndex(rotationRef.current);
      if (activeIdx !== lastActiveIdxRef.current) {
        lastActiveIdxRef.current = activeIdx;
        onActiveChangeRef.current?.(activeIdx);
      }
    };

    const handlePointerUp = (e: React.PointerEvent) => {
      if (!isDraggingRef.current) return;
      setIsDragging(false);
      isDraggingRef.current = false;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture?.(e.pointerId);
      } catch {}
    };

    // Horizontal trackpad/wheel swipe spins the gallery without hijacking vertical page scroll
    const handleWheel = (e: React.WheelEvent) => {
      if (count <= 1) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 2) {
        targetRotationRef.current = null;
        rotationRef.current -= e.deltaX * 0.12;
        setRotation(rotationRef.current);

        const activeIdx = getActiveIndex(rotationRef.current);
        if (activeIdx !== lastActiveIdxRef.current) {
          lastActiveIdxRef.current = activeIdx;
          onActiveChangeRef.current?.(activeIdx);
        }
      }
    };

    // Helper: Normalize item into Project or Photo Gallery structure
    const resolveItem = (
      rawItem: any
    ): { project?: Project; photo?: GalleryItemPhoto; title: string; subtitle?: string; desc?: string } => {
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

    const activeIdx = getActiveIndex(rotation);

    return (
      <div
        ref={ref || containerRef}
        role="region"
        aria-label="Circular 3D Gallery"
        className={cn(
          'relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-hidden',
          className
        )}
        style={{
          perspective: '1600px',
          ...style
        }}
        onMouseEnter={() => {
          setIsHovered(true);
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          setIsHovered(false);
          isHoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        {...props}
      >
        {/* The 3D Rotating Cylinder Carousel (centered so front card sits at z=0 with 1.0x crisp scale) */}
        <div
          className="relative w-full h-full"
          style={{
            transform: `translateZ(-${count <= 1 ? 0 : actualRadius}px) rotateY(${rotation}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {items.map((rawItem, i) => {
            const itemAngle = i * anglePerItem;
            const totalRotation = rotation % 360;
            const relativeAngle = (((itemAngle + totalRotation) % 360) + 360) % 360;
            const normalizedAngle = Math.abs(relativeAngle > 180 ? 360 - relativeAngle : relativeAngle);

            // Opacity: Front card is 1.0, adjacent side cards are clearly visible (~0.68), back cards fade down
            const opacity = count <= 1 ? 1 : Math.max(0.12, 1 - (normalizedAngle / 180) * 1.15);
            const isFront = count <= 1 || normalizedAngle < Math.min(35, anglePerItem * 0.45);
            const isVisibleSide = normalizedAngle < 105;

            const resolved = resolveItem(rawItem);
            const project = resolved.project;
            const photo = resolved.photo;

            return (
              <div
                key={rawItem && typeof rawItem === 'object' && 'id' in rawItem ? (rawItem as any).id : i}
                role="group"
                aria-label={resolved.title}
                className="absolute"
                style={{
                  width: `${cardWidth}px`,
                  height: `${cardHeight}px`,
                  transform: `rotateY(${itemAngle}deg) translateZ(${count <= 1 ? 0 : actualRadius}px)`,
                  left: '50%',
                  top: '47%',
                  marginLeft: `-${cardWidth / 2}px`,
                  marginTop: `-${cardHeight / 2}px`,
                  opacity: opacity,
                  pointerEvents: isVisibleSide ? 'auto' : 'none',
                  backfaceVisibility: 'hidden',
                  transition: 'opacity 0.25s ease'
                }}
                onClick={() => {
                  if (dragDistance.current > 8) return;
                  if (isFront) {
                    onItemClick?.(rawItem, i);
                  } else {
                    rotateToIndex(i);
                  }
                }}
              >
                {/* 1. Custom Renderer (if provided) */}
                {renderItem ? (
                  renderItem(rawItem, i, isFront)
                ) : project ? (
                  /* 2. Structured Clyde Project Card */
                  <div
                    className={cn(
                      'relative w-full h-full rounded-[24px] bg-white border shadow-[0_20px_45px_-12px_rgba(0,0,0,0.12)] p-5 sm:p-6 flex flex-col justify-between overflow-hidden text-[#212529] transition-all cursor-pointer group',
                      isFront
                        ? 'border-[#3b82a6]/60 hover:border-[#3b82a6] shadow-[0_24px_50px_-12px_rgba(59,130,166,0.25)]'
                        : 'border-neutral-200/90 hover:border-[#3b82a6]/50'
                    )}
                  >
                    {/* Top Ambient Glow */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#3b82a6]/10 rounded-full blur-2xl pointer-events-none" />

                    <div className="min-h-0">
                      {/* Category Badge & Period */}
                      <div className="flex items-center justify-between gap-2 mb-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#3b82a6]/15 border border-[#3b82a6]/30 text-[#163e54] text-[10px] font-mono font-bold uppercase tracking-wider truncate">
                          {project.category}
                        </span>
                        {project.period && (
                          <span className="text-[11px] font-mono text-[#6c757d] shrink-0">
                            {project.period}
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-[#000000] tracking-tight leading-snug group-hover:text-[#2c6585] transition-colors line-clamp-2">
                        {project.title}
                      </h3>

                      {/* Status / Recognition Badge */}
                      {project.statusBadge && (
                        <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#3b82a6]/20 border border-[#3b82a6]/35 text-[#0c2838] text-[10px] font-mono font-bold">
                          <span>★ {project.statusBadge}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="mt-2.5 text-xs text-[#6c757d] line-clamp-3 leading-relaxed font-normal">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      {project.highlights && project.highlights.length > 0 && (
                        <div className="mt-2.5 space-y-1">
                          {project.highlights.slice(0, 2).map((hl, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-1.5 text-[11px] text-[#495057] line-clamp-1">
                              <span className="text-[#2c6585] font-bold shrink-0">✦</span>
                              <span className="truncate">{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Technologies Pill Row */}
                      {project.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
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
                    <div className="mt-3 pt-2.5 border-t border-neutral-100 shrink-0">
                      <div className="w-full py-2 rounded-xl bg-[#3b82a6] group-hover:bg-[#2d6785] text-white text-[10px] font-mono font-bold uppercase tracking-widest text-center shadow-sm transition-all flex items-center justify-center gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        <span>{isFront ? 'Click to expand details' : 'Click to focus'}</span>
                      </div>
                    </div>
                  </div>
                ) : photo ? (
                  /* 3. Pure Photo Card */
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

        {/* Clean Left / Right Navigation Arrows & Dot Indicators */}
        {count > 1 && (
          <>
            <button
              type="button"
              data-gallery-nav="true"
              onClick={() => handleStep(-1)}
              aria-label="Previous project"
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#3b82a6] text-[#163e54] hover:text-white border border-neutral-200/90 hover:border-[#3b82a6] shadow-lg backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              type="button"
              data-gallery-nav="true"
              onClick={() => handleStep(1)}
              aria-label="Next project"
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-[#3b82a6] text-[#163e54] hover:text-white border border-neutral-200/90 hover:border-[#3b82a6] shadow-lg backdrop-blur-md flex items-center justify-center transition-all hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-md border border-neutral-200/80 shadow-sm">
              {items.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  data-gallery-nav="true"
                  onClick={() => rotateToIndex(idx)}
                  aria-label={`Go to project ${idx + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all duration-300',
                    idx === activeIdx
                      ? 'w-6 bg-[#3b82a6]'
                      : 'w-2 bg-neutral-300 hover:bg-[#3b82a6]/60'
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
);

CircularGallery.displayName = 'CircularGallery';

export { CircularGallery };
export default CircularGallery;
