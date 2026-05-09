"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type PageTransitionEvent = CustomEvent<{
  href: string;
  originX?: number;
  originY?: number;
}>;

export const PAGE_TRANSITION_EVENT = "page-transition:navigate";

function getCoverDiameter(originX: number, originY: number) {
  const distances = [
    Math.hypot(originX, originY),
    Math.hypot(window.innerWidth - originX, originY),
    Math.hypot(originX, window.innerHeight - originY),
    Math.hypot(window.innerWidth - originX, window.innerHeight - originY),
  ];

  return Math.max(...distances) * 2 + 180;
}

export default function TransitionOverlay() {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const shouldRevealRef = useRef(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const screen = screenRef.current;

    if (!root || !screen) {
      return;
    }

    const bands = gsap.utils.toArray<HTMLElement>("[data-page-transition-band]", root);

    const ctx = gsap.context(() => {
      gsap.set(root, {
        autoAlpha: 0,
      });

      gsap.set(screen, {
        autoAlpha: 0,
      });

      gsap.set(bands, {
        autoAlpha: 1,
        width: 0,
        height: 0,
        scale: 0.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    }, root);

    const handleNavigate = (event: Event) => {
      const {
        href,
        originX = window.innerWidth / 2,
        originY = window.innerHeight / 2,
      } = (event as PageTransitionEvent).detail;

      if (!href || isTransitioningRef.current) {
        return;
      }

      const diameter = getCoverDiameter(originX, originY);

      isTransitioningRef.current = true;
      shouldRevealRef.current = true;
      setIsActive(true);

      gsap.killTweensOf([root, screen, bands]);
      gsap.set(root, {
        autoAlpha: 1,
      });
      gsap.set(screen, {
        autoAlpha: 0,
      });
      gsap.set(bands, {
        width: diameter,
        height: diameter,
        x: originX - diameter / 2,
        y: originY - diameter / 2,
        scale: 0.04,
        transformOrigin: "50% 50%",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "power4.inOut",
        },
        onComplete: () => {
          router.push(href);
        },
      });

      timeline
        .to(bands, {
          scale: 1,
          duration: 0.72,
          stagger: {
            each: 0.045,
            from: "start",
          },
        }, 0)
        .to(screen, {
          autoAlpha: 1,
          duration: 0.16,
          ease: "none",
        }, 0.56);
    };

    window.addEventListener(PAGE_TRANSITION_EVENT, handleNavigate);

    return () => {
      window.removeEventListener(PAGE_TRANSITION_EVENT, handleNavigate);
      ctx.revert();
    };
  }, [router]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root || !shouldRevealRef.current) {
      return;
    }

    shouldRevealRef.current = false;

    const revealFrame = window.requestAnimationFrame(() => {
      const bands = gsap.utils.toArray<HTMLElement>("[data-page-transition-band]", root);
      const screen = screenRef.current;

      if (!screen) {
        return;
      }

      gsap.killTweensOf([root, screen, bands]);

      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.inOut",
        },
        onComplete: () => {
          gsap.set(root, {
            autoAlpha: 0,
          });
          gsap.set(screen, {
            autoAlpha: 0,
          });
          gsap.set(bands, {
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            scale: 0.04,
          });
          setIsActive(false);
          isTransitioningRef.current = false;
        },
      });

      timeline
        .to(screen, {
          autoAlpha: 0,
          duration: 0.18,
          ease: "none",
        }, 0)
        .to(bands, {
          scale: 0.04,
          duration: 0.58,
          stagger: {
            each: 0.045,
            from: "end",
          },
        }, 0.02)
        .to(root, {
          autoAlpha: 0,
          duration: 0.12,
          ease: "none",
        }, 0.5);
    });

    return () => {
      window.cancelAnimationFrame(revealFrame);
    };
  }, [pathname]);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[9999] overflow-hidden ${isActive ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden="true"
    >
      <div
        data-page-transition-band
        className="absolute left-0 top-0 rounded-full bg-[rgba(235,200,190,0.38)]"
      />
      <div
        data-page-transition-band
        className="absolute left-0 top-0 rounded-full bg-[rgba(241,226,168,0.28)]"
      />
      <div
        data-page-transition-band
        className="absolute left-0 top-0 rounded-full bg-[rgba(228,220,243,0.24)]"
      />
      <div
        data-page-transition-band
        className="absolute left-0 top-0 rounded-full bg-[rgba(215,231,242,0.2)]"
      />
      <div
        data-page-transition-band
        className="absolute left-0 top-0 rounded-full bg-[var(--color-text)]"
      />
      <div ref={screenRef} className="absolute inset-0 bg-[var(--color-text)]" />
    </div>
  );
}
