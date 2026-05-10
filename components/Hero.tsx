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
      className="relative min-h-screen overflow-hidden bg-[var(--color-surface)] pt-[clamp(13rem,45vw,16rem)] text-[var(--color-text)] sm:pt-48 lg:pt-40 xl:pt-0"
    >
      <div className="layout-shell flex min-h-screen flex-col justify-between py-8 xl:absolute xl:inset-x-0 xl:top-0 xl:bottom-0">
        <div className="flex-1" />
      </div>

      <div className="pointer-events-none flex items-center justify-center xl:absolute xl:inset-0">
        <div ref={logoRef} className="relative w-full max-w-[min(380px,100%)] text-center">
          <div className="mx-auto flex w-full flex-col items-center justify-center gap-6 py-10 sm:gap-8 sm:py-12 lg:py-14">
            <div className="flex w-full items-center justify-center gap-3 sm:gap-4">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <button
                type="button"
                className="pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent px-3 text-[length:var(--hero-mark-size)] font-black uppercase leading-none tracking-[0.12em] text-[var(--color-text)] transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-[var(--color-border)] hover:bg-[rgba(255,255,255,0.42)] sm:px-4"
              >
                AZ
              </button>
              <div className="h-px flex-1 bg-[var(--color-border)]" />
            </div>
            <div className="type-small text-[var(--color-text-muted)]">graphic mark</div>
          </div>
        </div>
      </div>

      <div className="relative mt-[clamp(2.5rem,9vw,5rem)] grid gap-8 xl:absolute xl:inset-x-0 xl:bottom-8 xl:mt-0 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:items-end">
        <div
          ref={infoRef}
          className="max-w-[34rem] break-words text-left text-[var(--color-text)] xl:absolute xl:inset-0 xl:max-w-none"
        >
          <div
            className="type-midsize text-[var(--color-text)] xl:absolute xl:max-w-[34rem]"
            style={{
              left: "var(--layout-left-nav-x)",
              bottom: "calc(100vh - var(--layout-hero-bottom-y) - 2rem)",
            }}
          >
            currently exploring how branding,<br />
            editorial and motion can live together.
          </div>
          <div
            className="type-small mt-4 text-[var(--color-text-muted)] xl:absolute xl:mt-0"
            style={{
              left: "var(--layout-left-nav-x)",
              bottom: "calc(100vh - var(--layout-sub-home-bottom-y) - 2rem)",
            }}
          >
            [scroll down to explore]
          </div>
        </div>

        <div
          ref={previewsRef}
          className="max-w-full flex flex-wrap justify-start gap-2.5 xl:absolute xl:bottom-0 xl:gap-2.5 xl:flex-nowrap"
          style={{
            left: "var(--layout-text-x)",
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
                className="group relative flex h-[var(--hero-preview-size)] w-[var(--hero-preview-size)] cursor-pointer flex-col justify-between overflow-hidden rounded-[1rem] border border-[var(--color-border)] bg-[var(--color-card)] p-3 text-left text-sm text-[var(--color-text)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--color-border-strong)] hover:bg-[var(--color-accent-blue)]/45 sm:rounded-[1.2rem] sm:p-4"
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
          className="type-small max-w-full flex flex-wrap justify-start gap-2.5 text-[var(--color-text-muted)] xl:absolute xl:gap-2.5 xl:flex-nowrap"
          style={{
            left: "var(--layout-text-x)",
            bottom: "calc(100vh - var(--layout-sub-home-bottom-y) - 2rem)",
          }}
          aria-hidden="true"
        >
          {heroProjects.map((project) => (
            <div
              key={project.slug}
              className="w-[var(--hero-preview-size)]"
            >
              [{project.number}]
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
