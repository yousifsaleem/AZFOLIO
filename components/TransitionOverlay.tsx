"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type PageTransitionEvent = CustomEvent<{
  href: string;
}>;

export const PAGE_TRANSITION_EVENT = "page-transition:navigate";

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
        scale: 0.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    }, root);

    const handleNavigate = (event: Event) => {
      const { href } = (event as PageTransitionEvent).detail;

      if (!href || isTransitioningRef.current) {
        return;
      }

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
        scale: 0.04,
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
          scale: 2.45,
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
        className="absolute bottom-[-56vmax] left-[-52vmax] h-[132vmax] w-[132vmax] rounded-full bg-[var(--color-accent-coral)]"
      />
      <div
        data-page-transition-band
        className="absolute bottom-[-51vmax] left-[-47vmax] h-[122vmax] w-[122vmax] rounded-full bg-[var(--color-accent-butter)]"
      />
      <div
        data-page-transition-band
        className="absolute bottom-[-46vmax] left-[-42vmax] h-[112vmax] w-[112vmax] rounded-full bg-[var(--color-accent-lilac)]"
      />
      <div
        data-page-transition-band
        className="absolute bottom-[-41vmax] left-[-37vmax] h-[102vmax] w-[102vmax] rounded-full bg-[var(--color-accent-blue)]"
      />
      <div
        data-page-transition-band
        className="absolute bottom-[-36vmax] left-[-32vmax] h-[92vmax] w-[92vmax] rounded-full bg-[var(--color-surface)]"
      />
      <div ref={screenRef} className="absolute inset-0 bg-[var(--color-surface)]" />
    </div>
  );
}
