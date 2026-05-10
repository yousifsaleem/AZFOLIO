"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SloganTransition() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    const exit = exitRef.current;

    if (!root || !frame || !exit) {
      return;
    }

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-slogan-line]");
      const entryCover = root.querySelector("[data-entry-cover]");
      const rippleBands = root.querySelectorAll("[data-ripple-band]");
      const exitBands = root.querySelectorAll("[data-exit-band]");
      const exitFill = root.querySelector("[data-exit-fill]");

      gsap.set(frame, {
        backgroundColor: "rgba(31, 27, 25, 0)",
        clipPath: "circle(160vmax at 50% 50%)",
        webkitClipPath: "circle(160vmax at 50% 50%)",
      });

      gsap.set(entryCover, {
        autoAlpha: 0,
      });

      gsap.set(rippleBands, {
        autoAlpha: 0,
        scale: 0.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(lines, {
        autoAlpha: 0,
        y: 34,
      });

      gsap.set(exit, {
        autoAlpha: 0,
      });

      gsap.set(exitBands, {
        autoAlpha: 0,
        scale: 0.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(exitFill, {
        autoAlpha: 0,
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.75,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(entryCover, {
          autoAlpha: 1,
          duration: 0.08,
          ease: "none",
        }, 0.01)
        .to(rippleBands, {
          autoAlpha: 1,
          scale: 2.35,
          duration: 0.78,
          ease: "power2.out",
          stagger: {
            each: 0.055,
            from: "start",
          },
        }, 0.03)
        .to(lines, {
          autoAlpha: 1,
          y: 0,
          duration: 0.38,
          ease: "power3.out",
          stagger: 0.06,
        }, 0.58)
        .to({}, {
          duration: 0.18,
        })
        .to(exit, {
          autoAlpha: 1,
          duration: 0.01,
          ease: "none",
        }, 1.08)
        .to(lines, {
          autoAlpha: 0,
          y: -18,
          duration: 0.3,
          ease: "power2.in",
        }, 1.14)
        .to(exitBands, {
          autoAlpha: 1,
          scale: 2.7,
          duration: 1,
          ease: "power2.inOut",
          stagger: {
            each: 0.055,
            from: "start",
          },
        }, 1.1)
        .to(exitFill, {
          autoAlpha: 1,
          duration: 0.24,
          ease: "none",
        }, 1.92);

      gsap.to(frame, {
        clipPath: "circle(0vmax at 50% 50%)",
        webkitClipPath: "circle(0vmax at 50% 50%)",
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "bottom 200%",
          end: "bottom bottom",
          scrub: 0.65,
          invalidateOnRefresh: true,
        },
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="slogan-transition"
      data-header-theme="dark"
      className="pointer-events-none relative z-20 -mt-[100vh] min-h-[315vh] text-[var(--color-card)]"
    >
      <div
        ref={frameRef}
        className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden bg-transparent py-12"
      >
        <div
          data-entry-cover
          className="absolute inset-0 z-0 bg-[var(--color-card)]"
          aria-hidden="true"
        />

        <div
          data-ripple-band
          className="absolute bottom-[-56vmax] left-[-52vmax] z-[1] h-[132vmax] w-[132vmax] rounded-full bg-[rgba(235,200,190,0.28)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-51vmax] left-[-47vmax] z-[2] h-[122vmax] w-[122vmax] rounded-full bg-[rgba(241,226,168,0.22)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-46vmax] left-[-42vmax] z-[3] h-[112vmax] w-[112vmax] rounded-full bg-[rgba(228,220,243,0.2)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-41vmax] left-[-37vmax] z-[4] h-[102vmax] w-[102vmax] rounded-full bg-[rgba(215,231,242,0.18)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-36vmax] left-[-32vmax] z-[5] h-[92vmax] w-[92vmax] rounded-full bg-[var(--color-text)]"
          aria-hidden="true"
        />

        <div
          ref={exitRef}
          className="absolute inset-0 z-20 overflow-hidden"
          aria-hidden="true"
        >
          <div
            data-exit-band
            className="absolute right-[-58vmax] top-[-58vmax] h-[136vmax] w-[136vmax] rounded-full bg-[#2b2722]"
          />
          <div
            data-exit-band
            className="absolute right-[-52vmax] top-[-52vmax] h-[124vmax] w-[124vmax] rounded-full bg-[#211e1a]"
          />
          <div
            data-exit-band
            className="absolute right-[-46vmax] top-[-46vmax] h-[112vmax] w-[112vmax] rounded-full bg-[#181614]"
          />
          <div
            data-exit-band
            className="absolute right-[-40vmax] top-[-40vmax] h-[100vmax] w-[100vmax] rounded-full bg-[#100f0e]"
          />
          <div
            data-exit-band
            className="absolute right-[-34vmax] top-[-34vmax] h-[88vmax] w-[88vmax] rounded-full bg-[#0c0b0a]"
          />
          <div
            data-exit-fill
            className="absolute inset-0 bg-[#0c0b0a]"
          />
        </div>

        <div className="layout-shell relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <p className="type-display-md text-[var(--color-card)] max-sm:text-[clamp(1.75rem,8.6vw,3rem)] max-sm:leading-[1.18]">
              <span data-slogan-line className="block">
                I&apos;m a graphic designer.
              </span>
              <span data-slogan-line className="mt-5 block">
                That means I make things look better.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
