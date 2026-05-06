"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SloganTransition() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll("[data-slogan-line]");

      gsap.fromTo(lines, {
        autoAlpha: 0,
        y: 28,
      }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.9,
        delay: 0.15,
        ease: "power2.out",
        stagger: 0.14,
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          toggleActions: "restart none restart none",
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
      data-header-theme="light"
      className="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-6 py-12 text-[var(--color-text)] sm:px-8 lg:px-12"
    >
      <div className="max-w-5xl text-center">
        <p className="type-display-md text-[var(--color-text)] max-sm:text-[clamp(2rem,9vw,3rem)] max-sm:leading-[1.15]">
          <span data-slogan-line className="block">
            I&apos;m a graphic designer.
          </span>
          <span data-slogan-line className="mt-5 block">
            That means I make things look better.
          </span>
        </p>
      </div>
    </section>
  );
}
