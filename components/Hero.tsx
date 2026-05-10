"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

import TransitionLink from "./TransitionLink";
import { featuredProjects, getProjectThumbnailImage } from "../data/projects";

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const previewsRef = useRef<HTMLDivElement>(null);
  const heroProjects = featuredProjects.slice(0, 4);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const previewItems = previewsRef.current?.querySelectorAll("[data-hero-preview-item]");

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
      className="relative min-h-screen overflow-hidden bg-[var(--color-surface)] pt-32 text-[var(--color-text)] sm:pt-36 xl:pt-0"
    >
      <div className="layout-shell flex min-h-screen flex-col justify-between py-8 xl:absolute xl:inset-x-0 xl:top-0 xl:bottom-0">
        <div className="flex-1" />

        <div className="pointer-events-none flex items-center justify-center xl:absolute xl:inset-0">
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
              <div className="type-small text-[var(--color-text-muted)]">graphic mark</div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 grid gap-8 xl:absolute xl:inset-x-0 xl:bottom-8 xl:mt-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-end">
          <div
            ref={infoRef}
            className="max-w-[34rem] break-words text-[var(--color-text)] max-xl:mx-auto max-xl:text-center xl:absolute xl:left-[calc(var(--layout-left-nav-x)-max(0px,(100vw-1600px)/2)+7px)] xl:text-left"
          >
            <div className="type-midsize text-[var(--color-text)]">
              <span className="block">currently exploring how branding,</span>
              <span className="block">editorial and motion can live together.</span>
            </div>
            <div className="type-small mt-4 text-[var(--color-text-muted)]">[scroll down to explore]</div>
          </div>

          <div
            ref={previewsRef}
            className="max-w-full flex flex-wrap justify-center gap-2.5 xl:absolute xl:bottom-0 xl:justify-start xl:gap-2.5 xl:flex-nowrap"
            style={{
              left: "calc(var(--layout-text-x) - max(0px, (100vw - 1600px) / 2) + 7px)",
              bottom: "calc(100vh - var(--layout-hero-bottom-y) - 2rem)",
            }}
          >
            {heroProjects.map((project) => {
              const previewImage = getProjectThumbnailImage(project);

              return (
                <TransitionLink
                  key={project.slug}
                  data-hero-preview-item
                  href={`/work/${project.slug}`}
                  className="group relative flex h-[72px] w-[72px] cursor-pointer flex-col justify-between overflow-hidden rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-left text-sm text-[var(--color-text)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-blue)]/45 sm:h-[92px] sm:w-[92px] sm:rounded-[1.2rem] sm:p-4 lg:h-[112px] lg:w-[112px] xl:h-[132px] xl:w-[132px]"
                  aria-label={`View ${project.title}`}
                >
                  {previewImage ? (
                    <Image
                      src={previewImage}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 bg-[linear-gradient(145deg,var(--color-card)_0%,var(--color-accent-blue)_100%)]"
                      aria-hidden="true"
                    />
                  )}

                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,27,25,0.14)_0%,rgba(31,27,25,0.03)_45%,rgba(31,27,25,0.18)_100%)]"
                    aria-hidden="true"
                  />
                </TransitionLink>
              );
            })}
          </div>

          <div
            className="type-small max-w-full flex flex-wrap justify-center gap-2.5 text-[var(--color-text-muted)] xl:absolute xl:justify-start xl:gap-2.5 xl:flex-nowrap"
            style={{
              left: "calc(var(--layout-text-x) - max(0px, (100vw - 1600px) / 2) + 7px)",
              bottom: "calc(100vh - var(--layout-sub-home-bottom-y) - 2rem)",
            }}
            aria-hidden="true"
          >
            {heroProjects.map((project) => (
              <div
                key={project.slug}
                className="w-[72px] sm:w-[92px] lg:w-[112px] xl:w-[132px]"
              >
                [{project.number}]
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
