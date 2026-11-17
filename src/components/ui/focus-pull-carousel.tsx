"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";

/*
 * Focus Pull Carousel — a horizontal image & card strip that racks focus like a
 * camera lens. The picture or card in the centre is sharp, full size, and saturated;
 * its neighbours soften, shrink, and fade by how far they sit from the middle, and
 * everything changes continuously as you scroll, swipe or drag.
 *
 * Built on native scroll snapping, so trackpads, touch momentum, mouse drag, and
 * the keyboard all behave like the platform.
 */

export type LandPalette = "dawn" | "alpine" | "dusk" | "mist";

export type Slide = {
  image?: string;
  title?: string;
  caption?: string;
  alt?: string;
  /** Palette and seed of the painted landscape used when `image` is empty. */
  palette?: LandPalette;
  seed?: number;
};

export type FocusPullCarouselProps<T = any> = {
  slides?: Slide[];
  items?: T[];
  renderItem?: (item: T, index: number, isCenter: boolean) => React.ReactNode;
  getItemMeta?: (item: T, index: number) => { title?: string; caption?: string };
  /** Any CSS length. Default 460px. */
  height?: number | string;
  /** Width of one card, any CSS length. */
  cardWidth?: string;
  /** Height of individual card, any CSS length. */
  cardHeight?: string;
  /** CSS aspect-ratio of a picture. */
  aspect?: string;
  /** Blur in px at one card away from the centre. 0 turns the focus pull off. */
  blur?: number;
  /** ms per slide; 0 turns autoplay off. It waits while someone is interacting. */
  autoplay?: number;
  /** Page colours: background and ink. Defaults follow the theme tokens. */
  background?: string;
  ink?: string;
  onChange?: (index: number) => void;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
};

// #region logic
/** How out of focus a card is, from its offset to the centre in card widths. */
export function focusOf(d: number, blur: number) {
  const a = Math.min(Math.abs(d), 1);
  return {
    scale: 1 - 0.12 * a,
    blur: Math.min(Math.abs(d), 2) * blur,
    opacity: 1 - 0.48 * a,
    saturate: 1 - 0.4 * a,
  };
}

/** Index of the centre nearest to c. */
export function nearestIndex(centers: number[], c: number): number {
  let best = 0;
  for (let i = 1; i < centers.length; i++) {
    if (Math.abs(centers[i] - c) < Math.abs(centers[best] - c)) best = i;
  }
  return best;
}

export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0;
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n);
}
// #endregion logic

/* ------------------------------------------------------- painted images */

const PALETTES = {
  dawn: { top: "#e7b7a5", bottom: "#f8e8d6", sun: "#fff4df", far: "#d2b2bb", near: "#3a2a3b", mist: "255,240,232" },
  alpine: { top: "#7ea5c8", bottom: "#e3ecf2", sun: "#ffffff", far: "#a9bfd0", near: "#1c3044", mist: "236,244,250" },
  dusk: { top: "#2a2450", bottom: "#ef8d60", sun: "#ffd9a6", far: "#93607c", near: "#18121f", mist: "255,196,160" },
  mist: { top: "#c4d0cb", bottom: "#eef1ec", sun: "#ffffff", far: "#aebcb5", near: "#2c3a33", mist: "246,248,245" },
};

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hexRgb(h: string): [number, number, number] {
  const v = parseInt(h.replace("#", ""), 16);
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
}

function mixRgb(a: string, b: string, t: number): string {
  const A = hexRgb(a);
  const B = hexRgb(b);
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",") + ")";
}

function paintLandscape(seed: number, palette: LandPalette, w = 1600, h = 1000): string {
  if (typeof document === "undefined") return "";
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const g = c.getContext("2d");
  if (!g) return "";
  const P = PALETTES[palette] ?? PALETTES.dawn;
  const r = mulberry32(seed * 104729 + 7);

  const sky = g.createLinearGradient(0, 0, 0, h * 0.72);
  sky.addColorStop(0, P.top);
  sky.addColorStop(1, P.bottom);
  g.fillStyle = sky;
  g.fillRect(0, 0, w, h);
  const sx = w * (0.22 + r() * 0.56);
  const sy = h * (0.26 + r() * 0.16);
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45);
  halo.addColorStop(0, "rgba(" + hexRgb(P.sun).join(",") + ",.85)");
  halo.addColorStop(0.08, "rgba(" + hexRgb(P.sun).join(",") + ",.55)");
  halo.addColorStop(1, "rgba(" + hexRgb(P.sun).join(",") + ",0)");
  g.fillStyle = halo
  g.fillRect(0, 0, w, h);
  g.fillStyle = P.sun;
  g.beginPath();
  g.arc(sx, sy, h * 0.045, 0, Math.PI * 2);
  g.fill();

  const layers = 5;
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1);
    const base = h * (0.42 + k * 0.4);
    const amp = h * (0.07 + k * 0.1);
    const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2);
    const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8];
    const ridge = (x: number) => {
      const u = x / w;
      return (
        base -
        amp *
          (0.55 * Math.sin(u * fr[0] + ph[0]) +
            0.28 * Math.sin(u * fr[1] + ph[1]) +
            0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
            0.05 * Math.sin(u * fr[3] + ph[3]))
      );
    };
    const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4);
    mist.addColorStop(0, "rgba(" + P.mist + ",0)");
    mist.addColorStop(1, "rgba(" + P.mist + "," + (0.55 - k * 0.35).toFixed(2) + ")");
    g.fillStyle = mist;
    g.fillRect(0, base - amp * 1.4, w, amp * 1.8);
    const body = g.createLinearGradient(0, base - amp, 0, h);
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)));
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)));
    g.fillStyle = body;
    g.beginPath();
    g.moveTo(0, h);
    for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x));
    g.lineTo(w, h);
    g.closePath();
    g.fill();
  }

  const vig = g.createRadialGradient(w / 2, h * 0.45, h * 0.3, w / 2, h / 2, w * 0.78);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,.32)");
  g.fillStyle = vig;
  g.fillRect(0, 0, w, h);
  return c.toDataURL("image/jpeg", 0.88);
}

const DEFAULT_SLIDES: Slide[] = [
  { title: "First Light", caption: "Haze lifting off the eastern ridges.", palette: "dawn", seed: 3 },
  { title: "High Pass", caption: "Cold air, clear to the far range.", palette: "alpine", seed: 8 },
  { title: "Ember Hour", caption: "The last of the sun on the valley floor.", palette: "dusk", seed: 14 },
];

function useSlideImages(slides: Slide[]): string[] {
  const key = slides.map((s) => s.image || (s.palette || "dawn") + ":" + (s.seed ?? 1)).join("|");
  const [painted, setPainted] = useState(() => slides.map(() => ""));
  useEffect(() => {
    setPainted(slides.map((s, i) => (s.image ? "" : paintLandscape(s.seed ?? i + 1, s.palette || "dawn"))));
  }, [key]);
  return slides.map((s, i) => s.image || painted[i] || "");
}

const FP_CSS = `
.fp-root {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(20px, 3.5vh, 36px);
  overflow: hidden;
  background: var(--fp-bg);
  color: var(--fp-ink);
  outline: none;
  padding: 12px 0 20px 0;
  box-sizing: border-box;
}
.fp-track {
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 36px);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  padding-inline: calc(50% - var(--fp-w) / 2);
  scrollbar-width: none;
  cursor: grab;
  touch-action: pan-x pan-y;
  padding-block: 24px;
}
.fp-track::-webkit-scrollbar {
  display: none;
}
.fp-track[data-drag='1'] {
  scroll-snap-type: none;
  cursor: grabbing;
}
.fp-card {
  flex: 0 0 var(--fp-w);
  height: var(--fp-card-h, auto);
  scroll-snap-align: center;
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: inherit;
  will-change: transform, filter, opacity;
  transform-origin: center;
  border-radius: var(--fp-radius, 28px);
  text-align: left;
  outline: none;
  user-select: none;
}
.fp-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
  display: block;
  border-radius: var(--fp-radius, 28px);
  pointer-events: none;
}
.fp-meta {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 16px;
  padding-inline: clamp(20px, 4vw, 56px);
}
.fp-cap {
  min-height: 2.6em;
  overflow: hidden;
  padding-bottom: .2em;
}
.fp-cap > * {
  display: block;
  animation: fp-in .5s cubic-bezier(.2, .8, .2, 1) both;
}
.fp-title {
  font-family: inherit;
  font-weight: 700;
  font-size: clamp(18px, 2.2vw, 24px);
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: #000000;
}
.fp-sub {
  margin-top: 4px;
  font-size: 13px;
  line-height: 1.4;
  color: #6c757d;
}
.fp-count {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: .14em;
  text-align: center;
  color: #6c757d;
}
.fp-count b {
  color: #2c6585;
  font-weight: 700;
}
.fp-nav {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.fp-btn {
  appearance: none;
  border: 1px solid rgba(0, 0, 0, 0.12);
  background: #ffffff;
  color: #212529;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  cursor: pointer;
  transition: all .2s cubic-bezier(.2,.8,.2,1);
  box-shadow: 0 2px 6px rgba(0,0,0,0.04);
}
.fp-btn:hover {
  background: #3b82a6;
  border-color: #3b82a6;
  color: #ffffff;
  transform: scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 166, 0.4);
}
.fp-btn:active {
  transform: scale(0.96);
}
.fp-btn:focus-visible {
  outline: 2px solid #3b82a6;
  outline-offset: 2px;
}
.fp-bar {
  height: 2px;
  margin-inline: clamp(20px, 4vw, 56px);
  background: rgba(0, 0, 0, 0.08);
  position: relative;
  border-radius: 2px;
  overflow: hidden;
}
.fp-bar > i {
  position: absolute;
  inset: 0 auto 0 0;
  width: 100%;
  background: #3b82a6;
  transform-origin: left;
  transform: scaleX(var(--fp-p, 0));
  transition: transform 0.1s linear;
}
.fp-sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
@keyframes fp-in {
  from { transform: translateY(80%); opacity: 0; }
  to { transform: none; opacity: 1; }
}
@media (max-width: 640px) {
  .fp-meta { grid-template-columns: 1fr auto; }
  .fp-count { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .fp-cap > * { animation: none; }
  .fp-track { scroll-behavior: auto; }
}
`;

export default function FocusPullCarousel<T = any>({
  slides,
  items,
  renderItem,
  getItemMeta,
  height = "auto",
  cardWidth = "min(88vw, 480px)",
  cardHeight = "360px",
  aspect = "4 / 3",
  blur = 6,
  autoplay = 0,
  background = "transparent",
  ink = "#212529",
  onChange,
  className,
  style,
  ariaLabel = "Focus Pull Carousel",
}: FocusPullCarouselProps<T>) {
  const isGeneric = Array.isArray(items) && items.length > 0;
  const activeSlides = useMemo(() => slides || (!isGeneric ? DEFAULT_SLIDES : []), [slides, isGeneric]);
  const n = isGeneric ? items!.length : activeSlides.length;

  const srcs = useSlideImages(slides || DEFAULT_SLIDES);
  const [active, setActive] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const activeRef = useRef(0);
  const lastTouch = useRef(0);
  const blurRef = useRef(blur);
  blurRef.current = blur;

  const [dragging, setDragging] = useState(false);
  const justDragged = useRef(false);

  // Rack focus on every scroll frame: camera lens depth-of-field calculation
  const paint = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (!cards.length) return;

    const mid = track.scrollLeft + track.clientWidth / 2;
    const centers = cards.map((c) => c.offsetLeft + c.offsetWidth / 2);
    const w = cards[0].offsetWidth || 1;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    cards.forEach((c, i) => {
      const d = (centers[i] - mid) / w;
      const f = focusOf(d, reduce ? 0 : blurRef.current);
      c.style.transform = "scale(" + f.scale.toFixed(4) + ")";
      c.style.filter = f.blur > 0.05 ? "blur(" + f.blur.toFixed(2) + "px) saturate(" + f.saturate.toFixed(3) + ")" : "none";
      c.style.opacity = f.opacity.toFixed(3);
    });

    const max = track.scrollWidth - track.clientWidth;
    barRef.current?.style.setProperty("--fp-p", max > 0 ? (track.scrollLeft / max).toFixed(4) : "0");

    const near = nearestIndex(centers, mid);
    if (near !== activeRef.current) {
      activeRef.current = near;
      setActive(near);
    }
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          paint();
        });
      }
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    paint();

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [paint, n]);

  useEffect(() => {
    onChange?.(active);
  }, [active, onChange]);

  const scrollToIndex = useCallback((i: number, smooth = true) => {
    const track = trackRef.current;
    const card = track?.children[i] as HTMLElement | undefined;
    if (!track || !card) return;
    const reduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({
      left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2,
      behavior: smooth && !reduce ? "smooth" : "auto",
    });
  }, []);

  const step = (dir: number) => {
    lastTouch.current = performance.now();
    scrollToIndex(wrap(activeRef.current + dir, n));
  };

  // Autoplay: waits for a quiet moment, and only while on screen.
  useEffect(() => {
    if (!autoplay || n < 2) return;
    const root = rootRef.current;
    let seen = true;
    const io = new IntersectionObserver(([e]) => (seen = e.isIntersecting));
    if (root) io.observe(root);
    const t = window.setInterval(() => {
      if (!seen || document.hidden || performance.now() - lastTouch.current < autoplay) return;
      scrollToIndex(wrap(activeRef.current + 1, n));
    }, autoplay);
    return () => {
      window.clearInterval(t);
      io.disconnect();
    };
  }, [autoplay, n, scrollToIndex]);

  // Mouse drag; touch and trackpads scroll natively.
  const drag = useRef<null | { x: number; left: number; moved: boolean }>(null);

  const onDown = (e: React.PointerEvent) => {
    lastTouch.current = performance.now();
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = { x: e.clientX, left: trackRef.current!.scrollLeft, moved: false };
  };

  const onMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      setDragging(true);
      trackRef.current!.setPointerCapture(e.pointerId);
    }
    if (d.moved) trackRef.current!.scrollLeft = d.left - dx;
  };

  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    lastTouch.current = performance.now();
    if (d?.moved) {
      justDragged.current = true;
      window.setTimeout(() => (justDragged.current = false), 0);
      setDragging(false);
      scrollToIndex(activeRef.current);
    }
  };

  const onClickCard = (i: number) => (e: React.MouseEvent) => {
    if (justDragged.current) return e.preventDefault();
    lastTouch.current = performance.now();
    scrollToIndex(i);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    else if (e.key === "ArrowLeft") step(-1);
    else return;
    e.preventDefault();
  };

  // Determine current metadata
  let currentTitle = "";
  let currentCaption = "";

  if (isGeneric && getItemMeta) {
    const meta = getItemMeta(items![active], active);
    currentTitle = meta.title || "";
    currentCaption = meta.caption || "";
  } else if (!isGeneric) {
    const s = activeSlides[active] || {};
    currentTitle = s.title || "";
    currentCaption = s.caption || "";
  }

  return (
    <div
      ref={rootRef}
      className={["fp-root", className].filter(Boolean).join(" ")}
      style={{
        ["--fp-h" as string]: typeof height === "number" ? height + "px" : height,
        ["--fp-w" as string]: cardWidth,
        ["--fp-card-h" as string]: typeof cardHeight === "number" ? cardHeight + "px" : cardHeight,
        ["--fp-aspect" as string]: aspect,
        ["--fp-bg" as string]: background,
        ["--fp-ink" as string]: ink,
        ["--fp-muted" as string]: "#6c757d",
        ["--fp-line" as string]: "rgba(0,0,0,0.1)",
        ["--fp-radius" as string]: "28px",
        ...style,
      }}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
    >
      <style>{FP_CSS}</style>

      {/* Snap-aligned Horizontal Focus Strip */}
      <div
        ref={trackRef}
        className="fp-track"
        data-drag={dragging ? "1" : "0"}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onWheel={() => (lastTouch.current = performance.now())}
      >
        {(isGeneric ? items! : activeSlides).map((item, i) => (
          <button
            key={i}
            type="button"
            className="fp-card"
            tabIndex={-1}
            aria-label={"Show " + (isGeneric ? "card " + (i + 1) : (item as Slide).title || "slide " + (i + 1))}
            aria-current={i === active ? "true" : undefined}
            onClick={onClickCard(i)}
          >
            {isGeneric && renderItem ? (
              renderItem(item as T, i, i === active)
            ) : srcs[i] ? (
              <img src={srcs[i]} alt={(item as Slide).alt || (item as Slide).title || ""} draggable={false} />
            ) : null}
          </button>
        ))}
      </div>

      {/* Rack Focus Metadata & Navigation Bar */}
      <div className="fp-meta">
        <div className="fp-cap" key={active} aria-hidden="true">
          {currentTitle ? <span className="fp-title">{currentTitle}</span> : null}
          {currentCaption ? <span className="fp-sub">{currentCaption}</span> : null}
        </div>

        <div className="fp-count" aria-hidden="true">
          <b>{pad2(active + 1)}</b> / {pad2(n)}
        </div>

        <div className="fp-nav">
          <button
            type="button"
            className="fp-btn"
            aria-label="Previous certification"
            title="Previous certification"
            onClick={() => step(-1)}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="fp-btn"
            aria-label="Next certification"
            title="Next certification"
            onClick={() => step(1)}
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Progress Line */}
      <div ref={barRef} className="fp-bar" aria-hidden="true">
        <i />
      </div>

      <div className="fp-sr" aria-live="polite">
        {"Certification " + (active + 1) + " of " + n + (currentTitle ? ": " + currentTitle : "")}
      </div>
    </div>
  );
}
