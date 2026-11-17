'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ChevronDown, ArrowDown } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal?: () => void;
}

export const Hero: React.FC<HeroProps> = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = heroRef.current;
    if (!container) return;

    const layersContainer = container.querySelector('[data-parallax-layers]');
    if (!layersContainer) return;

    // Timeline synced with scroll scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    const layers = [
      { layer: '1', yPercent: 65 },
      { layer: '2', yPercent: 48 },
      { layer: '3', yPercent: 32 },
      { layer: '4', yPercent: 10 },
    ];

    layers.forEach((l) => {
      tl.to(
        container.querySelectorAll(`[data-parallax-layer="${l.layer}"]`),
        {
          yPercent: l.yPercent,
          ease: 'none',
        },
        0
      );
    });

    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Interactive 3D mouse parallax response
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width - 0.5;
    const y = (clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="parallax relative w-full h-screen min-h-[640px] max-h-[1400px] overflow-hidden bg-[#090b0e] select-none z-10 flex flex-col justify-between"
    >
      <div className="parallax__header relative w-full h-full">
        <div className="parallax__visuals relative w-full h-full overflow-hidden">
          <div className="parallax__black-line-overflow absolute top-0 left-0 right-0 h-[2px] bg-black/60 z-30 pointer-events-none" />

          {/* 3D PARALLAX LAYERS */}
          <div
            data-parallax-layers
            className="parallax__layers absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* Layer 1: Moon & Night Sky (yPercent: 65) */}
            <div
              data-parallax-layer="1"
              className="parallax__layer-wrapper absolute inset-0 w-full h-[145%] -top-[20%] transition-transform duration-300 ease-out pointer-events-none"
              style={{
                transform: `translate3d(${mouseOffset.x * -18}px, ${mouseOffset.y * -14}px, 0)`,
              }}
            >
              <img
                src="/osmo/layer1.webp"
                loading="eager"
                alt="Moonlit Sky"
                className="parallax__layer-img w-full h-full object-cover object-center pointer-events-none select-none"
              />
            </div>

            {/* Layer 2: Snowy Mountain Peak (yPercent: 48) */}
            <div
              data-parallax-layer="2"
              className="parallax__layer-wrapper absolute inset-0 w-full h-[135%] -top-[16%] transition-transform duration-300 ease-out pointer-events-none"
              style={{
                transform: `translate3d(${mouseOffset.x * -28}px, ${mouseOffset.y * -20}px, 0)`,
              }}
            >
              <img
                src="/osmo/layer2.webp"
                loading="eager"
                alt="Snow Mountain"
                className="parallax__layer-img w-full h-full object-cover object-center pointer-events-none select-none"
              />
            </div>

            {/* Layer 3: VINAYPRAKASH Bold Typography (yPercent: 32) - Directly replacing 'Parallax' */}
            <div
              data-parallax-layer="3"
              className="parallax__layer-title absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 px-4 transition-transform duration-300 ease-out select-none"
              style={{
                transform: `translate3d(${mouseOffset.x * 20}px, ${mouseOffset.y * 15}px, 0)`,
              }}
            >
              <h1 className="parallax__title text-[clamp(2.6rem,9vw,9.5rem)] font-black tracking-[-0.04em] text-[#121316] text-center uppercase leading-none font-sans drop-shadow-[0_2px_15px_rgba(0,0,0,0.5)] w-full select-none">
                VINAYPRAKASH
              </h1>
            </div>

            {/* Layer 4: Foreground Ridge with Vinay's Silhouette (yPercent: 10) - Stands in front of text */}
            <div
              data-parallax-layer="4"
              className="parallax__layer-wrapper absolute inset-0 w-full h-[115%] -top-[5%] pointer-events-none z-20 transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * 40}px, ${mouseOffset.y * 28}px, 0)`,
              }}
            >
              <img
                src="/osmo/layer4-vinay.webp"
                loading="eager"
                alt="Vinayprakash on Ridge"
                className="parallax__layer-img w-full h-full object-cover object-center pointer-events-none select-none"
              />
            </div>
          </div>

          {/* Bottom Fade & Clean Osmo Citation / Scroll Cue */}
          <div className="parallax__fade absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-25 flex flex-col items-center justify-end pb-4">
            <div className="flex flex-col items-center gap-1 text-white/50 hover:text-white/80 transition-colors pointer-events-auto">
              <span className="text-[10px] font-mono tracking-[0.28em] uppercase">Scroll to explore</span>
              <ChevronDown className="w-4 h-4 text-[#3b82a6] animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
