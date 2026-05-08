"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TransitionLink from "./TransitionLink";
import { featuredProjects, type Project } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

function getFeaturedPreviewImage(project: Project) {
  return project.preview || project.thumbnail;
}

function getFeaturedThumbnailImage(project: Project) {
  return project.thumbnail;
}

function getDisplayTags(project: Project) {
  const tags = project.tags.slice(0, 4);

  while (tags.length < 4) {
    tags.push("Creative Direction");
  }

  return tags;
}

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
                className="inline-block h-[1.12em] overflow-hidden align-top"
              >
                <span
                  className={`flex flex-col leading-[1.12] transition-transform ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform group-hover/roll:-translate-y-1/2 ${
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
      groupClassName="group/roll inline-flex max-w-full whitespace-nowrap overflow-hidden pb-[0.08em] leading-[1.04]"
      wordClassName="mb-[0.02em] mr-[0.28em] inline-flex whitespace-nowrap last:mr-0"
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
      className="relative aspect-square overflow-hidden rounded-[2rem] border border-[rgba(255,248,242,0.3)]"
      style={{ backgroundColor: project.backgroundColor }}
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{ backgroundColor: project.accentColor || project.backgroundColor }}
        aria-hidden="true"
      />
      <div
        data-featured-preview
        className="pointer-events-none absolute inset-0 z-[2] flex h-full w-full items-center justify-center px-8"
        aria-hidden="true"
      >
        <div className="relative aspect-video w-full max-w-[78%] overflow-hidden rounded-[1.25rem] border border-[rgba(255,248,242,0.34)] bg-[rgba(71,56,48,0.08)]">
          <Image
            src={getFeaturedPreviewImage(project)}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        </div>
      </div>
      <div data-featured-hover className="absolute inset-0 z-20" />
      <div
        data-featured-image-layer
        className="absolute inset-0 z-10 h-full w-full overflow-hidden"
        style={{ backgroundColor: project.backgroundColor }}
      >
        <Image
          src={getFeaturedThumbnailImage(project)}
          alt={project.title}
          fill
          unoptimized
          className="h-full w-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[rgba(37,28,23,0.12)]" aria-hidden="true" />
      </div>
    </div>
  );
}

function FeaturedTextContent({ project }: { project: Project }) {
  const displayTags = getDisplayTags(project);

  return (
    <>
      <div className="flex items-start xl:absolute xl:left-0 xl:top-[calc(50%-6rem)] xl:w-full">
        <div data-featured-text className="max-w-[27rem] xl:pl-0">
          <p className="type-meta text-[rgba(255,248,242,0.72)]">No {project.number}</p>
          <h2 className="mt-3 overflow-hidden text-[clamp(1.55rem,1.95vw,2.2rem)] font-medium leading-[1.04] text-[var(--color-card)] max-sm:text-[clamp(2rem,8.5vw,3.1rem)]">
            <RollingTitle title={project.title} />
          </h2>
          <p className="type-body mt-5 max-w-md text-[rgba(255,248,242,0.78)]">
            {project.shortDescription}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 xl:absolute xl:inset-x-0 xl:top-[calc(50%+15.75rem)] xl:gap-0">
        <div className="flex w-full items-end justify-between xl:pl-0">
          <div data-featured-tags className="w-full max-w-[16rem] space-y-1">
            {displayTags.map((tag) => (
              <p key={tag} className="type-meta text-[0.58rem] text-[rgba(255,248,242,0.78)] sm:text-[0.62rem]">
                {tag}
              </p>
            ))}
          </div>

          <TransitionLink
            data-featured-link
            href={`/work/${project.slug}`}
            className="group/roll type-link inline-flex items-center gap-1 self-end whitespace-nowrap text-[var(--color-card)] transition-colors duration-300 ease-out hover:text-[rgba(255,248,242,0.72)] xl:translate-y-[-0.08rem]"
          >
            <RollingLinkText />
            <span
              aria-hidden="true"
              className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/roll:-translate-y-[1px] group-hover/roll:translate-x-[2px]"
            >
              ↗
            </span>
          </TransitionLink>
        </div>
      </div>
    </>
  );
}

export default function FeaturedWork() {
  const rootRef = useRef<HTMLElement>(null);

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

      matchMedia.add("(min-width: 1280px)", () => {
        const cleanupCallbacks: Array<() => void> = [];
        const pin = root.querySelector<HTMLElement>("[data-featured-pin]");
        const desktopText = root.querySelector<HTMLElement>("[data-featured-desktop-text]");
        const desktopScenes = gsap.utils.toArray<HTMLElement>("[data-featured-desktop-scene]", root);
        const desktopTextScenes = gsap.utils.toArray<HTMLElement>("[data-featured-desktop-text-scene]", root);

        setupHoverReveal(root, cleanupCallbacks);

        if (pin && desktopScenes.length > 0) {
          const transitionCount = featuredProjects.length - 1;

          gsap.set(desktopScenes, {
            width: "100%",
          });

          gsap.set(desktopScenes.slice(1), {
            width: "0%",
          });

          gsap.set(desktopTextScenes, {
            clipPath: "inset(0 0% 0 0)",
            webkitClipPath: "inset(0 0% 0 0)",
          });

          gsap.set(desktopTextScenes.slice(1), {
            clipPath: "inset(0 100% 0 0)",
            webkitClipPath: "inset(0 100% 0 0)",
          });

          gsap.set(desktopTextScenes, {
            autoAlpha: 0,
            pointerEvents: "none",
          });

          gsap.set(desktopTextScenes[0], {
            autoAlpha: 1,
            pointerEvents: "auto",
          });

          gsap.set(root.querySelectorAll("[data-featured-bg], [data-featured-scene-media]"), {
            xPercent: 0,
            yPercent: 0,
          });

          const textBounds = desktopText?.getBoundingClientRect();
          const textRevealStart = textBounds
            ? gsap.utils.clamp(0, 0.96, textBounds.left / window.innerWidth)
            : 0.64;
          const textRevealEnd = textBounds
            ? gsap.utils.clamp(textRevealStart + 0.04, 1, textBounds.right / window.innerWidth)
            : 0.9;
          const textRevealDuration = textRevealEnd - textRevealStart;

          const updateTextLayerVisibility = (progress: number) => {
            if (desktopTextScenes.length === 0) {
              return;
            }

            const wipeProgress = gsap.utils.clamp(0, transitionCount, progress * transitionCount);

            if (wipeProgress >= transitionCount) {
              gsap.set(desktopTextScenes, {
                autoAlpha: 0,
                pointerEvents: "none",
              });
              gsap.set(desktopTextScenes[featuredProjects.length - 1], {
                autoAlpha: 1,
                pointerEvents: "auto",
              });
              return;
            }

            const currentTextIndex = gsap.utils.clamp(0, transitionCount - 1, Math.floor(wipeProgress));
            const nextTextIndex = currentTextIndex + 1;

            gsap.set(desktopTextScenes, {
              autoAlpha: 0,
              pointerEvents: "none",
            });
            gsap.set([desktopTextScenes[currentTextIndex], desktopTextScenes[nextTextIndex]], {
              autoAlpha: 1,
              pointerEvents: "auto",
            });
          };

          const swipeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: `+=${window.innerHeight * (featuredProjects.length - 1)}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                updateTextLayerVisibility(self.progress);
              },
              onUpdate: (self) => {
                updateTextLayerVisibility(self.progress);
              },
            },
          });

          desktopScenes.slice(1).forEach((scene, index) => {
            const previousTextScene = desktopTextScenes[index];
            const textScene = desktopTextScenes[index + 1];

            swipeTimeline.fromTo(
              scene,
              { width: "0%" },
              {
                width: "100%",
                duration: 1,
                ease: "none",
              },
              index,
            );

            if (textScene) {
              if (previousTextScene) {
                swipeTimeline.fromTo(
                  previousTextScene,
                  {
                    clipPath: "inset(0 0% 0 0)",
                    webkitClipPath: "inset(0 0% 0 0)",
                  },
                  {
                    clipPath: "inset(0 0% 0 100%)",
                    webkitClipPath: "inset(0 0% 0 100%)",
                    duration: textRevealDuration,
                    ease: "none",
                  },
                  index + textRevealStart,
                );
              }

              swipeTimeline.fromTo(
                textScene,
                {
                  clipPath: "inset(0 100% 0 0)",
                  webkitClipPath: "inset(0 100% 0 0)",
                },
                {
                  clipPath: "inset(0 0% 0 0)",
                  webkitClipPath: "inset(0 0% 0 0)",
                  duration: textRevealDuration,
                  ease: "none",
                },
                index + textRevealStart,
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

      matchMedia.add("(max-width: 1279px)", () => {
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

  const firstProject = featuredProjects[0];

  return (
    <section
      ref={rootRef}
      id="work"
      data-header-theme="dark"
      className="overflow-hidden bg-[var(--color-surface-alt)] text-[var(--color-card)]"
      style={{ backgroundColor: firstProject.backgroundColor }}
    >
      <div data-featured-desktop className="relative hidden xl:block">
        <div
          data-featured-pin
          className="relative min-h-screen overflow-hidden"
          style={{ backgroundColor: firstProject.backgroundColor }}
        >
          <div className="absolute inset-0">
            {featuredProjects.map((project, index) => (
              <div
                key={project.slug}
                data-featured-desktop-scene
                className="absolute inset-y-0 left-0 w-full overflow-hidden"
                style={{ zIndex: index + 1 }}
              >
                <div className="absolute left-0 top-0 h-full min-h-screen w-screen overflow-hidden">
                  <div
                    className="absolute inset-0 h-full w-full"
                    style={{ backgroundColor: project.backgroundColor }}
                    aria-hidden="true"
                  />
                  <div
                    data-featured-bg
                    className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
                    aria-hidden="true"
                  >
                    <Image
                      src={getFeaturedThumbnailImage(project)}
                      alt=""
                      fill
                      unoptimized
                      className="h-full w-full object-cover blur-lg"
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 h-full w-full"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(251,247,242,0.08), rgba(34,25,22,0.2))",
                    }}
                    aria-hidden="true"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 h-full w-full bg-[rgba(25,17,14,0.22)]"
                    aria-hidden="true"
                  />

                  <div className="layout-shell relative z-10 flex min-h-screen items-center py-8 sm:py-10 lg:py-14">
                    <div className="flex w-full items-center pl-[8vw]">
                      <div data-featured-scene-media className="w-full max-w-[420px] xl:max-w-[29vw]">
                        <FeaturedMediaCard project={project} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="layout-shell pointer-events-none absolute inset-x-0 top-0 z-30 flex min-h-screen justify-end py-8 sm:py-10 lg:py-14">
            <div
              data-featured-desktop-text
              className="pointer-events-auto relative min-h-[28rem] w-full max-w-[min(32rem,31vw)] pb-2 opacity-100 lg:min-h-[34rem]"
            >
              {featuredProjects.map((project, index) => (
                <div
                  key={project.slug}
                  data-featured-desktop-text-scene
                  className="absolute inset-0 flex flex-col overflow-hidden"
                  style={{
                    clipPath: index === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    WebkitClipPath: index === 0 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                    zIndex: index + 1,
                  }}
                >
                  <FeaturedTextContent project={project} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="xl:hidden">
        {featuredProjects.map((project) => (
          <article
            key={project.slug}
            data-featured-mobile-panel
            className="relative isolate overflow-hidden border-b border-[rgba(255,248,242,0.16)] min-[768px]:min-h-[auto] xl:min-h-screen"
            style={{ backgroundColor: project.backgroundColor }}
          >
            <div
              className="absolute inset-0 h-full w-full"
              style={{ backgroundColor: project.backgroundColor }}
              aria-hidden="true"
            />
            <div
              data-featured-bg
              className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
              aria-hidden="true"
            >
              <Image
                src={getFeaturedThumbnailImage(project)}
                alt=""
                fill
                unoptimized
                className="h-full w-full object-cover blur-lg"
              />
            </div>
            <div
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{
                background: "linear-gradient(180deg, rgba(251,247,242,0.08), rgba(34,25,22,0.2))",
              }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-0 h-full w-full bg-[rgba(25,17,14,0.22)]"
              aria-hidden="true"
            />

            <div className="layout-shell relative z-10 flex min-h-[100svh] flex-col gap-8 py-8 sm:py-10 min-[768px]:min-h-[auto] min-[768px]:gap-10 min-[768px]:py-12">
              <div className="flex items-center">
                <div className="w-full max-w-[760px]">
                  <FeaturedMediaCard project={project} />
                </div>
              </div>

              <div className="flex flex-col gap-8 pb-2">
                <FeaturedTextContent project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
