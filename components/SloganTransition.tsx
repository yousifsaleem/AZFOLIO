"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SloganTransition() {
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;

    if (!root || !frame) {
      return;
    }

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-slogan-line]");
      const rippleBands = root.querySelectorAll("[data-ripple-band]");
      const darkWash = root.querySelector<HTMLElement>("[data-slogan-dark-wash]");
      const featuredRevealShell = document.querySelector<HTMLElement>("[data-featured-reveal-shell]");
      const featuredRevealTargets = featuredRevealShell ? [featuredRevealShell] : [];

      gsap.set(frame, {
        autoAlpha: 1,
        backgroundColor: "rgba(248, 243, 236, 0)",
      });

      gsap.set(rippleBands, {
        autoAlpha: 0,
        scale: 0.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(darkWash, {
        autoAlpha: 0,
        scale: 0.12,
        transformOrigin: "100% 0%",
        force3D: true,
      });

      gsap.set(lines, {
        autoAlpha: 0,
        y: 34,
        scale: 1,
        transformOrigin: "50% 50%",
      });

      gsap.set(featuredRevealTargets, {
        autoAlpha: 0,
        clipPath: "inset(0 0 100% 0)",
        webkitClipPath: "inset(0 0 100% 0)",
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.55,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(frame, {
          backgroundColor: "rgba(248, 243, 236, 1)",
          duration: 0.74,
          ease: "none",
        }, 0)
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
          scale: 1,
          duration: 0.38,
          ease: "power3.out",
          stagger: 0.06,
        }, 0.58)
        .to(featuredRevealTargets, {
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          webkitClipPath: "inset(0 0 0% 0)",
          duration: 0.22,
          ease: "none",
        }, 0.74)
        .to(darkWash, {
          autoAlpha: 0.46,
          scale: 2.28,
          duration: 0.16,
          ease: "none",
        }, 0.78)
        .to(lines, {
          autoAlpha: 0,
          y: -12,
          scale: 1,
          duration: 0.14,
          ease: "none",
          stagger: 0.018,
        }, 0.82)
        .to(frame, {
          autoAlpha: 0,
          duration: 0.06,
          ease: "none",
        }, 0.96);
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="slogan-transition"
      data-header-theme="light"
      className="pointer-events-none relative z-10 -mt-[100vh] min-h-[160vh] text-[var(--color-text)]"
    >
      <div
        ref={frameRef}
        className="sticky top-0 flex min-h-screen items-center justify-center overflow-hidden bg-[var(--color-surface)] py-12"
      >
        <div
          data-ripple-band
          className="absolute bottom-[-56vmax] left-[-52vmax] z-[1] h-[132vmax] w-[132vmax] rounded-full bg-[var(--color-accent-coral)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-51vmax] left-[-47vmax] z-[2] h-[122vmax] w-[122vmax] rounded-full bg-[var(--color-accent-butter)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-46vmax] left-[-42vmax] z-[3] h-[112vmax] w-[112vmax] rounded-full bg-[var(--color-accent-lilac)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-41vmax] left-[-37vmax] z-[4] h-[102vmax] w-[102vmax] rounded-full bg-[var(--color-accent-blue)]"
          aria-hidden="true"
        />
        <div
          data-ripple-band
          className="absolute bottom-[-36vmax] left-[-32vmax] z-[5] h-[92vmax] w-[92vmax] rounded-full bg-[var(--color-surface)]"
          aria-hidden="true"
        />
        <div
          data-slogan-dark-wash
          className="absolute right-[-48vmax] top-[-48vmax] z-[20] h-[118vmax] w-[118vmax] rounded-full bg-[#08090b]"
          aria-hidden="true"
        />

        <div className="layout-shell relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <p className="type-display-md text-[var(--color-text)] max-sm:text-[clamp(1.75rem,8.6vw,3rem)] max-sm:leading-[1.18]">
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
