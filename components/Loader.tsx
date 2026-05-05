"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [isComplete, setIsComplete] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const counter = counterRef.current;
    const path = pathRef.current;

    if (!root || !counter || !path) {
      setIsComplete(true);
      return;
    }

    const ctx = gsap.context(() => {
      const totalLength = path.getTotalLength();
      const progress = { value: 0 };

      gsap.set(path, {
        strokeDasharray: `${totalLength * 0.18} ${totalLength * 0.82}`,
        strokeDashoffset: totalLength,
      });

      const snakeTween = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1,
        ease: "none",
        repeat: -1,
      });

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => {
          snakeTween.kill();
          setIsComplete(true);
        },
      });

      tl.to(progress, {
        value: 100,
        duration: 2.2,
        ease: "none",
        onUpdate: () => {
          counter.textContent = `${Math.round(progress.value)}%`;
        },
      })
        .to(
          root,
          {
            yPercent: -100,
            duration: 0.8,
            ease: "power4.inOut",
          },
          "-=0.05",
        )
        .set(root, { autoAlpha: 0 });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[60] bg-[#f5ede1] text-zinc-950 ${isComplete ? "pointer-events-none" : ""}`}
      aria-hidden={isComplete}
    >
      <div className="relative flex h-full flex-col justify-between px-6 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
        <div className="space-y-2 pt-2">
          <p className="type-meta text-zinc-600">Coded by Afia Zaman</p>
          <p className="type-meta text-zinc-600">Designed by Afia Zaman</p>
          <p className="type-meta text-zinc-600">Direction by Afia Zaman</p>
        </div>

        <div className="pointer-events-none absolute inset-x-6 bottom-24 sm:inset-x-8 lg:inset-x-12 lg:bottom-28">
          <svg
            viewBox="0 0 1200 120"
            className="h-20 w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              ref={pathRef}
              d="M10 84 C130 28, 260 108, 390 64 S650 22, 790 58 S1030 108, 1190 42"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-zinc-500/70"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="flex items-end justify-between gap-6">
          <p className="type-meta text-zinc-600">Portfolio 2026</p>
          <p
            ref={counterRef}
            className="type-display-md text-right text-zinc-950 max-sm:text-[clamp(2rem,12vw,3.5rem)]"
          >
            0%
          </p>
        </div>
      </div>
    </div>
  );
}
