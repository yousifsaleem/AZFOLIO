"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { featuredProjects } from "../data/projects";

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

export default function FeaturedWork() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>("[data-featured-panel]");
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const cleanupCallbacks: Array<() => void> = [];

        panels.forEach((panel) => {
          const background = panel.querySelector<HTMLElement>("[data-featured-bg]");
          const media = panel.querySelector<HTMLElement>("[data-featured-media]");
          const hoverArea = panel.querySelector<HTMLElement>("[data-featured-hover]");
          const imageLayer = panel.querySelector<HTMLElement>("[data-featured-image-layer]");
          const previewLayer = panel.querySelector<HTMLElement>("[data-featured-preview]");
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

          if (hoverArea && imageLayer && previewLayer) {
            const hoverTimeline = gsap.timeline({ paused: true });

            gsap.set(imageLayer, {
              yPercent: 0,
            });

            gsap.set(previewLayer, {
              autoAlpha: 1,
              scale: 1,
              y: 0,
            });

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
          }

          gsap.fromTo(
            [textGroup, tags, link],
            {
              autoAlpha: 0,
              y: 22,
            },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
              stagger: 0.1,
              scrollTrigger: {
                trigger: panel,
                start: "top 72%",
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

      mm.add("(max-width: 767px)", () => {
        panels.forEach((panel) => {
          const textGroup = panel.querySelector<HTMLElement>("[data-featured-text]");
          const tags = panel.querySelector<HTMLElement>("[data-featured-tags]");
          const link = panel.querySelector<HTMLElement>("[data-featured-link]");

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
      });
    }, root);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={rootRef} id="work" data-header-theme="dark" className="bg-[#f7f3ed] text-white">
      {featuredProjects.map((project) => (
        <article
          key={project.slug}
          data-featured-panel
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

          <div className="relative z-10 grid min-h-screen w-full gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10 lg:px-14 lg:py-14 xl:px-20">
            <div className="order-1 flex items-center">
              <div className="w-full max-w-[760px]">
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
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
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
              </div>
            </div>

            <div className="order-2 grid gap-8 pb-2 lg:min-h-[24rem] lg:grid-rows-[1fr_auto_auto] lg:gap-0">
              <div className="flex items-start lg:items-center lg:justify-center">
                <div data-featured-text className="max-w-[30rem] lg:ml-4 xl:ml-10">
                  <p className="type-meta text-white/65">[{String(project.number).padStart(2, "0")}]</p>
                  <h2 className="type-display-lg mt-4 text-white max-sm:text-[clamp(2.4rem,11vw,4rem)]">
                    <RollingTitle title={project.title} />
                  </h2>
                  <p className="type-body mt-5 max-w-md text-white/72">{project.shortDescription}</p>
                </div>
              </div>

              <div className="flex justify-start lg:mt-10 lg:justify-end">
                <div
                  data-featured-tags
                  className="w-full max-w-[16rem] space-y-3 lg:mr-8 xl:mr-12"
                >
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
                  <RollingText
                    text="View project"
                    groupClassName="inline-flex flex-wrap leading-none"
                    wordClassName="mr-[0.26em] inline-flex whitespace-nowrap last:mr-0"
                    letterDurationClassName="duration-300"
                    staggerMs={22}
                  />
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:-translate-y-[1px] group-hover/roll:translate-x-[2px]"
                  >
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
