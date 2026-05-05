"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { featuredProjects, type Project } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function RollingText({
  text,
  groupClassName,
  wordClassName,
  letterDurationClassName,
  staggerMs,
}: {
  text: string;
  groupClassName?: string;
  wordClassName?: string;
  letterDurationClassName?: string;
  staggerMs: number;
}) {
  const words = text.split(" ");
  let globalIndex = 0;

  return (
    <span className={groupClassName ?? "inline-flex max-w-full flex-wrap leading-[0.95]"}>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          className={wordClassName ?? "mb-[0.04em] mr-[0.28em] inline-flex whitespace-nowrap last:mr-0"}
        >
          {Array.from(word).map((character, characterIndex) => {
            const letterIndex = globalIndex;
            globalIndex += 1;

            return (
              <span
                key={`${character}-${wordIndex}-${characterIndex}`}
                className="inline-block h-[0.98em] overflow-hidden align-top"
              >
                <span
                  className={`flex flex-col transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/roll:-translate-y-1/2 ${
                    letterDurationClassName ?? "duration-500"
                  }`}
                  style={{ transitionDelay: `${letterIndex * staggerMs}ms` }}
                >
                  <span>{character}</span>
                  <span aria-hidden="true">{character}</span>
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

function RollingTitle({ title }: { title: string }) {
  return (
    <RollingText
      text={title}
      groupClassName="group/roll inline-flex max-w-full flex-wrap leading-[0.95]"
      wordClassName="mb-[0.04em] mr-[0.28em] inline-flex whitespace-nowrap last:mr-0"
      letterDurationClassName="duration-500"
      staggerMs={32}
    />
  );
}

function RollingLinkText() {
  return (
    <RollingText
      text="View project"
      groupClassName="inline-flex flex-wrap leading-none"
      wordClassName="mr-[0.26em] inline-flex whitespace-nowrap last:mr-0"
      letterDurationClassName="duration-300"
      staggerMs={22}
    />
  );
}

function FeaturedMediaCard({ project }: { project: Project }) {
  return (
    <div
      data-featured-media
      className="relative aspect-[10/8] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10"
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: project.accentColor || project.backgroundColor }}
        aria-hidden="true"
      />
      <div
        data-featured-preview
        className="pointer-events-none absolute inset-0 z-[2] flex items-center justify-center px-8"
        aria-hidden="true"
      >
        <div className="relative aspect-video w-full max-w-[78%] overflow-hidden rounded-[1.25rem] border border-white/20 bg-black/10">
          <Image
            src={project.preview || project.thumbnail || project.image}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
      <div data-featured-hover className="absolute inset-0 z-20" />
      <div data-featured-image-layer className="absolute inset-0 z-10">
        <Image
          src={project.image}
          alt={project.title}
          fill
          unoptimized
          className="object-cover"
        />
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
        <div className="relative flex h-full items-end justify-between p-5 sm:p-8">
          <div className="type-meta max-w-[12rem] text-white/65">Project image</div>
          <div className="type-meta text-right text-white/65">
            {project.category} / {project.year}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedTextContent({ project }: { project: Project }) {
  return (
    <>
      <div className="flex items-start lg:items-center lg:justify-center">
        <div data-featured-text className="max-w-[30rem] lg:ml-4 xl:ml-10">
          <p className="type-meta text-white/65">No {project.number}</p>
          <h2 className="type-display-lg mt-4 text-white max-sm:text-[clamp(2.4rem,11vw,4rem)]">
            <RollingTitle title={project.title} />
          </h2>
          <p className="type-body mt-5 max-w-md text-white/72">{project.shortDescription}</p>
        </div>
      </div>

      <div className="flex justify-start lg:mt-10 lg:justify-end">
        <div data-featured-tags className="w-full max-w-[16rem] space-y-3 lg:mr-8 xl:mr-12">
          {project.tags.map((tag) => (
            <p key={tag} className="type-meta border-b border-white/15 pb-3 text-white/72">
              {tag}
            </p>
          ))}
        </div>
      </div>

      <div className="flex items-end justify-start lg:mt-10 lg:justify-end">
        <Link
          data-featured-link
          href={`/work/${project.slug}`}
          className="group/roll type-link inline-flex items-center gap-1 text-white transition-colors duration-300 ease-out hover:text-white/70"
        >
          <RollingLinkText />
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:-translate-y-[1px] group-hover/roll:translate-x-[2px]"
          >
            ↗
          </span>
        </Link>
      </div>
    </>
  );
}

export default function FeaturedWork() {
  const rootRef = useRef<HTMLElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const matchMedia = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const setupHoverReveal = (scope: ParentNode, cleanupCallbacks: Array<() => void>) => {
        const cards = gsap.utils.toArray<HTMLElement>("[data-featured-media]", scope);

        cards.forEach((card) => {
          const hoverArea = card.querySelector<HTMLElement>("[data-featured-hover]");
          const imageLayer = card.querySelector<HTMLElement>("[data-featured-image-layer]");
          const previewLayer = card.querySelector<HTMLElement>("[data-featured-preview]");

          if (!hoverArea || !imageLayer || !previewLayer) {
            return;
          }

          const hoverTimeline = gsap.timeline({ paused: true });

          gsap.set(imageLayer, { yPercent: 0 });
          gsap.set(previewLayer, { autoAlpha: 1, scale: 1, y: 0 });

          hoverTimeline.to(imageLayer, {
            yPercent: -104,
            duration: 0.56,
            ease: "power4.inOut",
          });

          const handleEnter = () => {
            hoverTimeline.play();
          };

          const handleLeave = () => {
            hoverTimeline.reverse();
          };

          hoverArea.addEventListener("mouseenter", handleEnter);
          hoverArea.addEventListener("mouseleave", handleLeave);

          cleanupCallbacks.push(() => {
            hoverArea.removeEventListener("mouseenter", handleEnter);
            hoverArea.removeEventListener("mouseleave", handleLeave);
            hoverTimeline.kill();
          });
        });
      };

      matchMedia.add("(min-width: 768px)", () => {
        const cleanupCallbacks: Array<() => void> = [];
        const pin = root.querySelector<HTMLElement>("[data-featured-pin]");
        const desktopScenes = gsap.utils.toArray<HTMLElement>("[data-featured-desktop-scene]", root);

        setupHoverReveal(root, cleanupCallbacks);

        if (pin && desktopScenes.length > 0) {
          activeIndexRef.current = 0;
          setActiveIndex(0);

          gsap.set(desktopScenes, {
            clipPath: "inset(0 0% 0 0)",
          });

          gsap.set(desktopScenes.slice(1), {
            clipPath: "inset(0 100% 0 0)",
          });

          const swipeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: `+=${window.innerHeight * (featuredProjects.length - 1)}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                const nextIndex = Math.min(
                  featuredProjects.length - 1,
                  Math.floor(self.progress * featuredProjects.length),
                );

                if (nextIndex !== activeIndexRef.current) {
                  activeIndexRef.current = nextIndex;
                  setActiveIndex(nextIndex);
                }
              },
            },
          });

          desktopScenes.slice(1).forEach((scene, index) => {
            const background = scene.querySelector<HTMLElement>("[data-featured-bg]");
            const mediaWrap = scene.querySelector<HTMLElement>("[data-featured-scene-media]");

            swipeTimeline.fromTo(
              scene,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 1,
                ease: "none",
              },
              index,
            );

            if (background) {
              swipeTimeline.fromTo(
                background,
                { xPercent: -2 },
                { xPercent: 0, duration: 1, ease: "none" },
                index,
              );
            }

            if (mediaWrap) {
              swipeTimeline.fromTo(
                mediaWrap,
                { xPercent: 6 },
                { xPercent: 0, duration: 1, ease: "none" },
                index,
              );
            }
          });

          cleanupCallbacks.push(() => {
            swipeTimeline.scrollTrigger?.kill();
            swipeTimeline.kill();
          });
        }

        return () => {
          cleanupCallbacks.forEach((cleanup) => cleanup());
        };
      });

      matchMedia.add("(max-width: 767px)", () => {
        const cleanupCallbacks: Array<() => void> = [];
        const panels = gsap.utils.toArray<HTMLElement>("[data-featured-mobile-panel]", root);

        panels.forEach((panel) => {
          const background = panel.querySelector<HTMLElement>("[data-featured-bg]");
          const media = panel.querySelector<HTMLElement>("[data-featured-media]");
          const textGroup = panel.querySelector<HTMLElement>("[data-featured-text]");
          const tags = panel.querySelector<HTMLElement>("[data-featured-tags]");
          const link = panel.querySelector<HTMLElement>("[data-featured-link]");

          if (background) {
            gsap.fromTo(
              background,
              { y: -4 },
              {
                y: 4,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }

          if (media) {
            gsap.fromTo(
              media,
              { y: -3 },
              {
                y: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              },
            );
          }

          gsap.fromTo(
            [textGroup, tags, link],
            {
              autoAlpha: 0,
              y: 18,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              ease: "power2.out",
              stagger: 0.08,
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                toggleActions: "play reverse play reverse",
                invalidateOnRefresh: true,
              },
            },
          );
        });

        return () => {
          cleanupCallbacks.forEach((cleanup) => cleanup());
        };
      });
    }, root);

    ScrollTrigger.refresh();

    return () => {
      matchMedia.revert();
      ctx.revert();
    };
  }, []);

  const safeActiveIndex = Math.max(0, Math.min(activeIndex, featuredProjects.length - 1));
  const activeProject = featuredProjects[safeActiveIndex] ?? featuredProjects[0];

  return (
    <section
      ref={rootRef}
      id="work"
      data-header-theme="dark"
      className="bg-[#f7f3ed] text-white"
      style={{ backgroundColor: activeProject.backgroundColor }}
    >
      <div data-featured-desktop className="relative hidden md:block">
        <div data-featured-pin className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0">
            {featuredProjects.map((project, index) => (
              <div
                key={project.slug}
                data-featured-desktop-scene
                className="absolute inset-0"
                style={{ zIndex: index + 1 }}
              >
                <div
                  data-featured-bg
                  className="pointer-events-none absolute inset-0 overflow-hidden"
                  aria-hidden="true"
                >
                  <Image
                    src={project.image}
                    alt=""
                    fill
                    unoptimized
                    className="object-cover opacity-28 blur-lg"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(245,237,225,0.08), rgba(12,12,12,0.18))",
                  }}
                  aria-hidden="true"
                />
                <div className="pointer-events-none absolute inset-0 bg-black/5" aria-hidden="true" />

                <div className="relative z-10 grid min-h-screen w-full gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10 lg:px-14 lg:py-14 xl:px-20">
                  <div className="order-1 flex items-center">
                    <div data-featured-scene-media className="w-full max-w-[760px]">
                      <FeaturedMediaCard project={project} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 z-30 grid min-h-screen w-full gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10 lg:px-14 lg:py-14 xl:px-20">
            <div className="order-1" />
            <div
              data-featured-desktop-text
              className="pointer-events-auto order-2 grid gap-8 pb-2 opacity-100 lg:min-h-[24rem] lg:grid-rows-[1fr_auto_auto] lg:gap-0"
            >
              <FeaturedTextContent project={activeProject} />
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            data-featured-mobile-panel
            className="relative isolate min-h-screen overflow-hidden border-b border-white/10"
            style={{ backgroundColor: project.backgroundColor }}
          >
            <div
              data-featured-bg
              className="pointer-events-none absolute inset-0 overflow-hidden"
              aria-hidden="true"
            >
              <Image
                src={project.image}
                alt=""
                fill
                unoptimized
                className="object-cover opacity-28 blur-lg"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(245,237,225,0.08), rgba(12,12,12,0.18))",
              }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/5" aria-hidden="true" />

            <div className="relative z-10 grid min-h-screen w-full gap-8 px-6 py-8 sm:px-8 sm:py-10">
              <div className="order-1 flex items-center">
                <div className="w-full max-w-[760px]">
                  <FeaturedMediaCard project={project} />
                </div>
              </div>

              <div className="order-2 grid gap-8 pb-2">
                <FeaturedTextContent project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
