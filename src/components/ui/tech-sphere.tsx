'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { X } from 'lucide-react';
import { TechBadge } from '../../data/portfolioData';

/**
 * SphereImageGrid / TechSphere - Interactive 3D Image & Technology Sphere
 *
 * Implements Tony Sebastian's 3D Fibonacci Sphere architecture with:
 * - Fibonacci sphere lattice with pole bonus distribution for even 360° coverage
 * - Euler 3D matrix rotations (Y-axis horizontal, X-axis vertical)
 * - Collision detection pass to prevent image/node overlaps
 * - Smooth fade zones & depth scaling
 * - Momentum physics, drag velocity, and continuous auto-rotation
 * - Pointer & touch interaction with document listeners
 * - Spotlight inspection modal on node click
 */

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

export interface SphericalPosition {
  theta: number;  // Azimuth angle in degrees
  phi: number;    // Polar angle in degrees
  radius: number; // Distance from center
}

export interface WorldPosition extends Position3D {
  scale: number;
  zIndex: number;
  isVisible: boolean;
  fadeOpacity: number;
  originalIndex: number;
}

export interface ImageData {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

export interface TechSphereProps {
  items?: TechBadge[];
  images?: ImageData[];
  selectedCategory?: string;
  onItemSelect?: (item: TechBadge) => void;
  containerSize?: number;
  sphereRadius?: number;
  dragSensitivity?: number;
  momentumDecay?: number;
  maxRotationSpeed?: number;
  baseImageScale?: number;
  hoverScale?: number;
  perspective?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  className?: string;
}

interface RotationState {
  x: number;
  y: number;
  z: number;
}

interface VelocityState {
  x: number;
  y: number;
}

interface MousePosition {
  x: number;
  y: number;
}

// ==========================================
// CONSTANTS & MATHEMATICAL UTILITIES
// ==========================================

const SPHERE_MATH = {
  degreesToRadians: (degrees: number): number => degrees * (Math.PI / 180),
  radiansToDegrees: (radians: number): number => radians * (180 / Math.PI),

  sphericalToCartesian: (radius: number, theta: number, phi: number): Position3D => ({
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta)
  }),

  calculateDistance: (pos: Position3D, center: Position3D = { x: 0, y: 0, z: 0 }): number => {
    const dx = pos.x - center.x;
    const dy = pos.y - center.y;
    const dz = pos.z - center.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  },

  normalizeAngle: (angle: number): number => {
    while (angle > 180) angle -= 360;
    while (angle < -180) angle += 360;
    return angle;
  }
};

// ==========================================
// MAIN COMPONENT
// ==========================================

export const TechSphere: React.FC<TechSphereProps> = ({
  items = [],
  images = [],
  selectedCategory = 'All',
  onItemSelect,
  containerSize: customContainerSize,
  sphereRadius: customSphereRadius,
  dragSensitivity = 0.55,
  momentumDecay = 0.94,
  maxRotationSpeed = 6,
  baseImageScale = 0.14,
  hoverScale = 1.22,
  perspective = 1000,
  autoRotate: initialAutoRotate = true,
  autoRotateSpeed = 0.35,
  className = ''
}) => {
  // If items is passed, use tech badges mode; otherwise fallback to images
  const isBadgeMode = items.length > 0;
  const itemCount = isBadgeMode ? items.length : images.length;

  // ==========================================
  // STATE & REFS
  // ==========================================

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [rotation, setRotation] = useState<RotationState>({ x: 12, y: 20, z: 0 });
  const [velocity, setVelocity] = useState<VelocityState>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);

  const [autoRotate, setAutoRotate] = useState<boolean>(initialAutoRotate);
  const autoRotateRef = useRef<boolean>(initialAutoRotate);
  autoRotateRef.current = autoRotate;

  const [selectedBadge, setSelectedBadge] = useState<TechBadge | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);

  const [imagePositions, setImagePositions] = useState<SphericalPosition[]>([]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePos = useRef<MousePosition>({ x: 0, y: 0 });
  const dragDistance = useRef<number>(0);
  const animationFrame = useRef<number | null>(null);

  // Dynamic responsive sizing
  const [responsiveSize, setResponsiveSize] = useState<number>(540);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.parentElement?.clientWidth || window.innerWidth;
      if (width < 480) {
        setResponsiveSize(360);
      } else if (width < 768) {
        setResponsiveSize(460);
      } else if (width < 1024) {
        setResponsiveSize(540);
      } else {
        setResponsiveSize(580);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerSize = customContainerSize || responsiveSize;
  const actualSphereRadius = customSphereRadius || containerSize * 0.44;
  const baseImageSize = containerSize * baseImageScale;

  // ==========================================
  // 1. FIBONACCI SPHERE DISTRIBUTION WITH POLE BONUS
  // ==========================================

  const generateSpherePositions = useCallback((): SphericalPosition[] => {
    const positions: SphericalPosition[] = [];
    const count = itemCount;
    if (count === 0) return positions;

    // Golden angle in radians
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const angleIncrement = (2 * Math.PI) / goldenRatio;

    for (let i = 0; i < count; i++) {
      // Fibonacci sphere distribution
      const t = count > 1 ? i / (count - 1) : 0.5;
      const inclination = Math.acos(1 - 2 * t);
      const azimuth = angleIncrement * i;

      // Convert to degrees
      let phi = inclination * (180 / Math.PI);
      let theta = (azimuth * (180 / Math.PI)) % 360;

      // Pole coverage boost: reach closer to poles to avoid empty polar zones
      const poleBonus = Math.pow(Math.abs(phi - 90) / 90, 0.6) * 32;
      if (phi < 90) {
        phi = Math.max(10, phi - poleBonus);
      } else {
        phi = Math.min(170, phi + poleBonus);
      }

      // Map to balanced vertical range (18° to 162°)
      phi = 18 + (phi / 180) * 144;

      // Gentle deterministic pseudorandom offset based on index
      const seed = Math.sin(i * 997) * 10000;
      const randomOffset = ((seed - Math.floor(seed)) - 0.5) * 12;
      theta = (theta + randomOffset) % 360;

      positions.push({
        theta,
        phi,
        radius: actualSphereRadius
      });
    }

    return positions;
  }, [itemCount, actualSphereRadius]);

  // ==========================================
  // 2. WORLD POSITIONS & COLLISION DETECTION
  // ==========================================

  const calculateWorldPositions = useCallback((): WorldPosition[] => {
    const positions = imagePositions.map((pos, index) => {
      // Convert angles to radians
      const thetaRad = SPHERE_MATH.degreesToRadians(pos.theta);
      const phiRad = SPHERE_MATH.degreesToRadians(pos.phi);
      const rotXRad = SPHERE_MATH.degreesToRadians(rotation.x);
      const rotYRad = SPHERE_MATH.degreesToRadians(rotation.y);

      // Initial Cartesian position on sphere
      let x = pos.radius * Math.sin(phiRad) * Math.cos(thetaRad);
      let y = pos.radius * Math.cos(phiRad);
      let z = pos.radius * Math.sin(phiRad) * Math.sin(thetaRad);

      // Y-axis rotation (horizontal orbit)
      const x1 = x * Math.cos(rotYRad) + z * Math.sin(rotYRad);
      const z1 = -x * Math.sin(rotYRad) + z * Math.cos(rotYRad);
      x = x1;
      z = z1;

      // X-axis rotation (vertical tilt)
      const y2 = y * Math.cos(rotXRad) - z * Math.sin(rotXRad);
      const z2 = y * Math.sin(rotXRad) + z * Math.cos(rotXRad);
      y = y2;
      z = z2;

      const worldPos: Position3D = { x, y, z };

      // Fade zones to hide back-facing items cleanly
      const fadeZoneStart = 10;
      const fadeZoneEnd = -actualSphereRadius * 0.45;
      const isVisible = worldPos.z > fadeZoneEnd;

      let fadeOpacity = 1;
      if (worldPos.z <= fadeZoneStart) {
        fadeOpacity = Math.max(0.15, (worldPos.z - fadeZoneEnd) / (fadeZoneStart - fadeZoneEnd));
      }

      // Check if this item originated from polar angle
      const isPole = pos.phi < 32 || pos.phi > 148;

      // 2D Distance from screen center
      const distanceFromCenter = Math.sqrt(worldPos.x * worldPos.x + worldPos.y * worldPos.y);
      const maxDistance = actualSphereRadius;
      const distanceRatio = Math.min(distanceFromCenter / maxDistance, 1);

      // Scaling based on distance and Z-depth
      const distancePenalty = isPole ? 0.35 : 0.6;
      const centerScale = Math.max(0.35, 1 - distanceRatio * distancePenalty);
      const depthScale = (worldPos.z + actualSphereRadius) / (2 * actualSphereRadius);
      const scale = centerScale * Math.max(0.55, 0.75 + depthScale * 0.35);

      return {
        ...worldPos,
        scale,
        zIndex: Math.round(1000 + worldPos.z),
        isVisible,
        fadeOpacity,
        originalIndex: index
      };
    });

    // ----------------------------------------------------
    // COLLISION DETECTION PASS (PREVENTS IMAGE OVERLAPS)
    // ----------------------------------------------------
    const adjustedPositions = [...positions];

    for (let i = 0; i < adjustedPositions.length; i++) {
      const pos = adjustedPositions[i];
      if (!pos || !pos.isVisible) continue;

      let adjustedScale = pos.scale;
      const currentSize = baseImageSize * adjustedScale;

      for (let j = 0; j < adjustedPositions.length; j++) {
        if (i === j) continue;

        const other = adjustedPositions[j];
        if (!other || !other.isVisible) continue;

        const otherSize = baseImageSize * other.scale;

        // Calculate 2D Euclidean distance on screen
        const dx = pos.x - other.x;
        const dy = pos.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Required separation to avoid overlapping
        const minDistance = (currentSize + otherSize) / 2 + 14;

        if (distance < minDistance && distance > 0) {
          const overlap = minDistance - distance;
          // Apply gentle scale reduction to prevent visual collisions
          const reductionFactor = Math.max(0.55, 1 - (overlap / minDistance) * 0.45);
          adjustedScale = Math.min(adjustedScale, adjustedScale * reductionFactor);
        }
      }

      adjustedPositions[i] = {
        ...pos,
        scale: Math.max(0.38, adjustedScale)
      };
    }

    return adjustedPositions;
  }, [imagePositions, rotation, actualSphereRadius, baseImageSize]);

  const clampRotationSpeed = useCallback((speed: number): number => {
    return Math.max(-maxRotationSpeed, Math.min(maxRotationSpeed, speed));
  }, [maxRotationSpeed]);

  // ==========================================
  // 3. PHYSICS & MOMENTUM TICK
  // ==========================================

  const updateMomentum = useCallback(() => {
    if (isDraggingRef.current) return;

    setVelocity(prevVelocity => {
      const newVelocity = {
        x: prevVelocity.x * momentumDecay,
        y: prevVelocity.y * momentumDecay
      };

      setRotation(prevRotation => {
        let newY = prevRotation.y;

        // Continuous auto-orbit around Y-axis
        if (autoRotateRef.current) {
          newY += autoRotateSpeed;
        }

        // Apply momentum velocity
        newY += clampRotationSpeed(newVelocity.y);

        // Clamped pitch on X axis to avoid flipping upside down
        let newX = prevRotation.x + clampRotationSpeed(newVelocity.x);
        newX = Math.max(-55, Math.min(55, newX));

        return {
          x: SPHERE_MATH.normalizeAngle(newX),
          y: SPHERE_MATH.normalizeAngle(newY),
          z: prevRotation.z
        };
      });

      if (!autoRotateRef.current && Math.abs(newVelocity.x) < 0.01 && Math.abs(newVelocity.y) < 0.01) {
        return { x: 0, y: 0 };
      }

      return newVelocity;
    });
  }, [momentumDecay, autoRotateSpeed, clampRotationSpeed]);

  // ==========================================
  // 4. EVENT HANDLERS (MOUSE & TOUCH)
  // ==========================================

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    isDraggingRef.current = true;
    dragDistance.current = 0;
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    dragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => {
      let newX = prev.x + clampRotationSpeed(rotationDelta.x);
      newX = Math.max(-55, Math.min(55, newX));

      return {
        x: SPHERE_MATH.normalizeAngle(newX),
        y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
        z: prev.z
      };
    });

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [dragSensitivity, clampRotationSpeed]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    if (!touch) return;
    setIsDragging(true);
    isDraggingRef.current = true;
    dragDistance.current = 0;
    setVelocity({ x: 0, y: 0 });
    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current) return;
    const touch = e.touches[0];
    if (!touch) return;

    const deltaX = touch.clientX - lastMousePos.current.x;
    const deltaY = touch.clientY - lastMousePos.current.y;
    dragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

    const rotationDelta = {
      x: -deltaY * dragSensitivity,
      y: deltaX * dragSensitivity
    };

    setRotation(prev => {
      let newX = prev.x + clampRotationSpeed(rotationDelta.x);
      newX = Math.max(-55, Math.min(55, newX));

      return {
        x: SPHERE_MATH.normalizeAngle(newX),
        y: SPHERE_MATH.normalizeAngle(prev.y + clampRotationSpeed(rotationDelta.y)),
        z: prev.z
      };
    });

    setVelocity({
      x: clampRotationSpeed(rotationDelta.x),
      y: clampRotationSpeed(rotationDelta.y)
    });

    lastMousePos.current = { x: touch.clientX, y: touch.clientY };
  }, [dragSensitivity, clampRotationSpeed]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    isDraggingRef.current = false;
  }, []);

  // ==========================================
  // 5. EFFECTS & LIFECYCLE
  // ==========================================

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setImagePositions(generateSpherePositions());
  }, [generateSpherePositions]);

  // Main high-frequency animation loop
  useEffect(() => {
    const animate = () => {
      updateMomentum();
      animationFrame.current = requestAnimationFrame(animate);
    };

    if (isMounted) {
      animationFrame.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [isMounted, updateMomentum]);

  // Attach global drag listeners to document for fluid tracking
  useEffect(() => {
    if (!isMounted) return;

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isMounted, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  // ==========================================
  // 6. RENDER HELPERS
  // ==========================================

  const worldPositions = calculateWorldPositions();

  // Render Tech Badge Node
  const renderBadgeNode = (badge: TechBadge, index: number) => {
    const position = worldPositions[index];
    if (!position || !position.isVisible) return null;

    const nodeSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(1.22, hoverScale / position.scale) : 1;

    // Category filter matching
    const isCategoryMatch = selectedCategory === 'All' || badge.category === selectedCategory;
    const finalOpacity = isCategoryMatch ? position.fadeOpacity : position.fadeOpacity * 0.2;

    return (
      <div
        key={badge.name}
        className="absolute cursor-pointer select-none transition-transform duration-150 ease-out flex items-center justify-center group"
        style={{
          width: `${nodeSize}px`,
          height: `${nodeSize}px`,
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
          opacity: finalOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex,
          pointerEvents: isCategoryMatch ? 'auto' : 'none'
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => {
          if (dragDistance.current > 7) return;
          setSelectedBadge(badge);
          if (onItemSelect) onItemSelect(badge);
        }}
      >
        <div
          style={{
            backgroundColor: badge.bgColor,
            color: badge.textColor
          }}
          className="relative w-full h-full rounded-full flex flex-col items-center justify-center p-1.5 border-2 border-white/80 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2),0_4px_10px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          {/* Brand Symbol / Icon */}
          <span className="text-sm sm:text-lg font-black drop-shadow-sm select-none leading-none mb-0.5">
            {badge.iconSymbol || badge.name.slice(0, 2)}
          </span>

          {/* Micro Label */}
          <span className="text-[8px] sm:text-[10px] font-mono font-black uppercase tracking-tight line-clamp-1 select-none text-center leading-tight opacity-95 px-1">
            {badge.name}
          </span>

          {/* Spherical Sheen Highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-black/15 via-transparent to-white/35 pointer-events-none" />
        </div>

        {/* Hover Tooltip */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute -bottom-7 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/85 backdrop-blur-md text-white text-[10px] font-mono font-bold tracking-wider uppercase pointer-events-none shadow-lg whitespace-nowrap z-50">
          {badge.name} • {badge.category}
        </div>
      </div>
    );
  };

  // Render Image Node (For pure Image-Sphere mode)
  const renderImageNode = (image: ImageData, index: number) => {
    const position = worldPositions[index];
    if (!position || !position.isVisible) return null;

    const imageSize = baseImageSize * position.scale;
    const isHovered = hoveredIndex === index;
    const finalScale = isHovered ? Math.min(1.2, 1.2 / position.scale) : 1;

    return (
      <div
        key={image.id}
        className="absolute cursor-pointer select-none transition-transform duration-200 ease-out"
        style={{
          width: `${imageSize}px`,
          height: `${imageSize}px`,
          left: `calc(50% + ${position.x}px)`,
          top: `calc(50% + ${position.y}px)`,
          opacity: position.fadeOpacity,
          transform: `translate(-50%, -50%) scale(${finalScale})`,
          zIndex: position.zIndex
        }}
        onMouseEnter={() => setHoveredIndex(index)}
        onMouseLeave={() => setHoveredIndex(null)}
        onClick={() => {
          if (dragDistance.current > 7) return;
          setSelectedImage(image);
        }}
      >
        <div className="relative w-full h-full rounded-full overflow-hidden shadow-lg border-2 border-white/60">
          <img
            src={image.src}
            alt={image.alt}
            className="w-full h-full object-cover"
            draggable={false}
            loading={index < 3 ? 'eager' : 'lazy'}
          />
        </div>
      </div>
    );
  };

  // Modal Inspection View for Selected Item
  const renderSpotlightModal = () => {
    if (selectedBadge) {
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm cursor-default"
          onClick={() => setSelectedBadge(null)}
          style={{ animation: 'sphereFadeIn 0.25s ease-out' }}
        >
          <div
            className="bg-white p-7 rounded-3xl border border-neutral-200 max-w-sm w-full shadow-2xl relative text-[#212529]"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'sphereScaleIn 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            <button
              onClick={() => setSelectedBadge(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-[#495057] hover:text-[#000000] hover:bg-neutral-200 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3.5 mb-4">
              <div
                style={{ backgroundColor: selectedBadge.bgColor, color: selectedBadge.textColor }}
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shadow-md border border-black/10 shrink-0"
              >
                {selectedBadge.iconSymbol || selectedBadge.name.slice(0, 2)}
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8e916c] font-bold block">
                  {selectedBadge.category}
                </span>
                <h3 className="text-xl font-extrabold text-[#000000]">
                  {selectedBadge.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-[#6c757d] leading-relaxed mb-6 font-normal">
              {selectedBadge.name} is a core competency utilized across full-stack production, machine learning architectures, and modern cloud deployment pipelines.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 text-xs font-mono">
              <span className="text-emerald-700 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active In Production
              </span>

              <button
                onClick={() => setSelectedBadge(null)}
                className="px-4 py-1.5 rounded-full bg-[#b1b493] hover:bg-[#9a9d7c] text-white font-semibold shadow-sm cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedImage) {
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
          style={{ animation: 'sphereFadeIn 0.25s ease-out' }}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative"
            onClick={e => e.stopPropagation()}
            style={{ animation: 'sphereScaleIn 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            <div className="relative aspect-square">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 rounded-full text-white flex items-center justify-center hover:bg-black/80 transition-all cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {(selectedImage.title || selectedImage.description) && (
              <div className="p-6">
                {selectedImage.title && (
                  <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                )}
                {selectedImage.description && (
                  <p className="text-gray-600 text-sm">{selectedImage.description}</p>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  // ==========================================
  // EARLY RETURN (LOADING STATE)
  // ==========================================

  if (!isMounted) {
    return (
      <div
        className="w-full h-[520px] bg-neutral-100 rounded-3xl animate-pulse flex items-center justify-center"
      >
        <div className="text-neutral-400 font-mono text-xs">Loading 3D Sphere...</div>
      </div>
    );
  }

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (
    <>
      <style>{`
        @keyframes sphereFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes sphereScaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>

      <div
        ref={containerRef}
        className={`relative w-full h-[520px] sm:h-[580px] md:h-[620px] select-none overflow-hidden rounded-3xl bg-[#f8f9fa] border border-neutral-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.05)] flex items-center justify-center cursor-grab active:cursor-grabbing ${className}`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{
          perspective: `${perspective}px`
        }}
      >
        {/* Background Soft Tech Grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />

        {/* Central 3D Sphere Container */}
        <div
          className="relative pointer-events-none"
          style={{
            width: `${containerSize}px`,
            height: `${containerSize}px`
          }}
        >
          {isBadgeMode
            ? items.map((badge, index) => renderBadgeNode(badge, index))
            : images.map((image, index) => renderImageNode(image, index))}
        </div>
      </div>

      {renderSpotlightModal()}
    </>
  );
};

export default TechSphere;
