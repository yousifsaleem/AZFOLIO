"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { featuredProjects } from "../data/projects";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const previewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const previewItems = previewsRef.current?.querySelectorAll("button");

      gsap.set(logoRef.current, { autoAlpha: 0, scale: 0.96 });
      gsap.set(infoRef.current, { autoAlpha: 0, y: 24 });
      gsap.set(previewItems ?? [], { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        delay: 6.2,
        defaults: { ease: "power2.out" },
      });

      tl.to(logoRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.9,
      })
        .to(
          infoRef.current,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.45",
        )
        .to(
          previewItems ?? [],
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          },
          "-=0.35",
        );
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id="hero"
      data-header-theme="light"
      className="relative min-h-screen overflow-hidden bg-[var(--color-surface)] pt-28 text-[var(--color-text)] sm:pt-32 lg:pt-0"
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between px-6 py-8 sm:px-8 lg:absolute lg:inset-0 lg:px-0">
        <div className="flex-1" />

        <div className="pointer-events-none flex items-center justify-center lg:absolute lg:inset-0">
          <div ref={logoRef} className="relative w-full max-w-[380px] text-center">
            <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 py-10 sm:gap-8 sm:py-12 lg:py-14">
              <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
                <div className="h-px flex-1 bg-[var(--color-border)]" />
                <button
                  type="button"
                  className="pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent px-3 text-[4.2rem] font-black uppercase leading-none tracking-[0.12em] text-[var(--color-text)] transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.42)] sm:px-4 sm:text-[5.2rem] lg:text-[6rem] xl:text-[7rem]"
                >
                  AZ
                </button>
                <div className="h-px flex-1 bg-[var(--color-border)]" />
              </div>
              <div className="type-meta text-[var(--color-text-muted)]">graphic mark</div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:absolute lg:left-[-4rem] lg:right-[-4rem] lg:bottom-8 lg:mt-0 lg:flex-row lg:items-end lg:justify-between">
          <div ref={infoRef} className="max-w-xs text-[var(--color-text)]">
            <div className="type-meta text-[var(--color-text-muted)]">What I do</div>
            <div className="mt-4 space-y-1">
              <div className="h-px w-16 bg-[var(--color-border)]" />
              <div className="h-px w-12 bg-[var(--color-border)]" />
              <div className="h-px w-8 bg-[var(--color-border)]" />
            </div>
            <div className="type-meta mt-4 text-[var(--color-text-muted)]">scroll to see</div>
          </div>

          <div ref={previewsRef} className="flex flex-wrap gap-3 lg:justify-end">
            {featuredProjects.slice(0, 4).map((project) => (
              <button
                key={project.slug}
                type="button"
                className="group flex h-[92px] w-[92px] cursor-pointer flex-col justify-between rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-left text-sm text-[var(--color-text)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-blue)]/45 sm:h-[120px] sm:w-[120px] sm:p-4 lg:h-[160px] lg:w-[160px]"
              >
                <span className="type-meta text-[var(--color-text-muted)]">{project.number}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
