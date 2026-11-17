'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export interface ParallaxComponentProps {
  className?: string;
  showContent?: boolean;
}

export function ParallaxComponent({ className = '', showContent = false }: ParallaxComponentProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    let tl: gsap.core.Timeline | null = null;
    if (triggerElement) {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0
        }
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 }
      ];

      layers.forEach((layerObj, idx) => {
        tl?.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none'
          },
          idx === 0 ? undefined : '<'
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up GSAP and ScrollTrigger instances
      ScrollTrigger.getAll().forEach(st => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  // Smooth interactive mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      className={`parallax relative w-full overflow-hidden select-none ${className}`}
      ref={parallaxRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <section className="parallax__header relative w-full">
        <div className="parallax__visuals relative w-full overflow-hidden rounded-2xl bg-[#090b0e] aspect-[16/11] sm:aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.25)] border border-neutral-800/80">
          <div className="parallax__black-line-overflow absolute top-0 left-0 right-0 h-[2px] bg-black/60 z-30 pointer-events-none" />

          <div
            data-parallax-layers
            className="parallax__layers relative w-full h-full overflow-hidden"
          >
            {/* Layer 1: Moon & Night Sky (yPercent: 70) */}
            <div
              data-parallax-layer="1"
              className="parallax__layer-wrapper absolute inset-0 w-full h-[150%] -top-[25%] transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * -14}px, ${mouseOffset.y * -10}px, 0)`
              }}
            >
              <img
                src="/osmo/layer1.webp"
                loading="eager"
                width="2000"
                height="1906"
                alt="Moon and starry sky"
                className="parallax__layer-img w-full h-full object-cover object-center select-none pointer-events-none"
              />
            </div>

            {/* Layer 2: Snowy Mountain Peak (yPercent: 55) */}
            <div
              data-parallax-layer="2"
              className="parallax__layer-wrapper absolute inset-0 w-full h-[135%] -top-[18%] transition-transform duration-300 ease-out pointer-events-none"
              style={{
                transform: `translate3d(${mouseOffset.x * -20}px, ${mouseOffset.y * -14}px, 0)`
              }}
            >
              <img
                src="/osmo/layer2.webp"
                loading="eager"
                width="2000"
                height="1906"
                alt="Snowy Mountain"
                className="parallax__layer-img w-full h-full object-cover object-center select-none pointer-events-none"
              />
            </div>

            {/* Layer 3: VINAYPRAKASH Typography (yPercent: 40) - Exactly replaces 'Parallax' */}
            <div
              data-parallax-layer="3"
              className="parallax__layer-title absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 px-4 select-none transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * 16}px, ${mouseOffset.y * 12}px, 0)`
              }}
            >
              <h2 className="parallax__title text-[clamp(2.4rem,6.8vw,5.5rem)] font-black tracking-[-0.04em] text-[#121316] text-center uppercase leading-none select-none font-sans drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)]">
                VINAYPRAKASH
              </h2>
            </div>

            {/* Layer 4: Foreground ridge with Vinay's silhouette (yPercent: 10) */}
            <div
              data-parallax-layer="4"
              className="parallax__layer-wrapper absolute inset-0 w-full h-[115%] -top-[6%] pointer-events-none z-20 transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(${mouseOffset.x * 30}px, ${mouseOffset.y * 20}px, 0)`
              }}
            >
              <img
                src="/osmo/layer4-vinay.webp"
                loading="eager"
                width="2000"
                height="1906"
                alt="Foreground Ridge with Vinayprakash"
                className="parallax__layer-img w-full h-full object-cover object-center pointer-events-none select-none"
              />
            </div>
          </div>

          {/* Bottom vignette & Osmo credit */}
          <div className="parallax__fade absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-25 flex items-end justify-center pb-2.5">
            <span className="text-[10px] font-sans text-neutral-400/90 tracking-wider select-none font-medium">
              Resource by Osmo
            </span>
          </div>
        </div>
      </section>

      {showContent && (
        <section className="parallax__content py-8 flex justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 160 160"
            fill="none"
            className="osmo-icon-svg text-neutral-400"
          >
            <path
              d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
              fill="currentColor"
            />
          </svg>
        </section>
      )}
    </div>
  );
}

export default ParallaxComponent;
