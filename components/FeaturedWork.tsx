"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TransitionLink from "./TransitionLink";
import {
  featuredProjects,
  getProjectBackgroundImage,
  getProjectPreviewImage,
  getProjectThumbnailImage,
  type Project,
} from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

const FEATURED_CURSOR_COLOR_PROPERTY = "--site-cursor-featured-color";
const SNAP_EDGE_THRESHOLD = 0.2;
const FEATURED_ENTRY_HOLD = 0.5;

function getProjectCursorColor(project: Project) {
  return project.cursorColor ?? project.accentColor;
}

function resolveCursorColor(color: string | undefined, fallbackColor: string) {
  if (!color) {
    return fallbackColor;
  }

  const trimmedColor = color.trim();
  const variableMatch = trimmedColor.match(/^var\((--[^,\s)]+)(?:,\s*([^)]+))?\)$/);

  if (!variableMatch) {
    return trimmedColor;
  }

  return (
    getComputedStyle(document.documentElement).getPropertyValue(variableMatch[1]).trim() ||
    variableMatch[2]?.trim() ||
    fallbackColor
  );
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
      groupClassName="inline-flex whitespace-nowrap leading-none"
      wordClassName="mr-[0.26em] inline-flex whitespace-nowrap last:mr-0"
      letterDurationClassName="duration-300"
      staggerMs={22}
    />
  );
}

function FeaturedMediaCard({ project }: { project: Project }) {
  const previewImage = getProjectPreviewImage(project);
  const thumbnailImage = getProjectThumbnailImage(project);

  return (
    <div
      data-featured-media
      className="group/media relative aspect-square overflow-hidden rounded-[2rem] border border-[rgba(255,248,242,0.3)]"
      style={{ backgroundColor: project.backgroundColor }}
    >
      <div
        className="absolute inset-0 h-full w-full"
        style={{ backgroundColor: project.accentColor || project.backgroundColor }}
        aria-hidden="true"
      />
      <div
        data-featured-preview
        className="pointer-events-none absolute inset-0 z-[2] flex h-full w-full items-center justify-center px-5"
        aria-hidden="true"
      >
        <div className="relative aspect-video w-full max-w-[88%] overflow-hidden rounded-[0.9rem] border border-[rgba(255,248,242,0.34)] bg-[rgba(71,56,48,0.08)]">
          {previewImage ? (
            <Image
              src={previewImage}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          ) : null}
        </div>
      </div>
      <TransitionLink
        data-featured-hover
        data-cursor-variant="explore"
        data-cursor-label="Explore"
        href={`/work/${project.slug}`}
        aria-label={`Explore ${project.title}`}
        className="absolute inset-0 z-20 cursor-none"
      >
        <span className="sr-only">Explore {project.title}</span>
      </TransitionLink>
      <div
        data-featured-image-layer
        className="absolute inset-0 z-10 h-full w-full overflow-hidden"
        style={{ backgroundColor: project.backgroundColor }}
      >
        {thumbnailImage ? (
          <Image
            src={thumbnailImage}
            alt={project.title}
            fill
            unoptimized
            className="h-full w-full object-cover"
          />
        ) : null}
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
        <div className="flex w-full items-end justify-between gap-6 xl:pl-0">
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
            className="group/roll type-link inline-flex shrink-0 items-center gap-1 self-end whitespace-nowrap text-[var(--color-card)] transition-colors duration-300 ease-out hover:text-[rgba(255,248,242,0.72)] xl:w-[calc(var(--site-time-column-width)+var(--site-featured-link-overhang))] xl:translate-y-[-0.08rem]"
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
          const imageLayer = card.querySelector<HTMLElement>("[data-featured-image-layer]");
          const previewLayer = card.querySelector<HTMLElement>("[data-featured-preview]");

          if (!imageLayer || !previewLayer) {
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

          card.addEventListener("mouseenter", handleEnter);
          card.addEventListener("mouseleave", handleLeave);

          cleanupCallbacks.push(() => {
            card.removeEventListener("mouseenter", handleEnter);
            card.removeEventListener("mouseleave", handleLeave);
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
          const timelineUnits = transitionCount + FEATURED_ENTRY_HOLD;
          const entryHoldProgress = FEATURED_ENTRY_HOLD / timelineUnits;
          const fallbackCursorColor = resolveCursorColor("var(--cursor-light)", "rgba(255, 248, 242, 0.9)");
          const featuredCursorColors = featuredProjects.map((project) =>
            resolveCursorColor(getProjectCursorColor(project), fallbackCursorColor),
          );
          let activeTextPairKey = "";
          let textRevealStart = 0.64;
          let textRevealEnd = 0.9;
          let textRevealDuration = textRevealEnd - textRevealStart;

          gsap.set(desktopScenes, {
            clipPath: "inset(0 0% 0 0)",
            webkitClipPath: "inset(0 0% 0 0)",
            force3D: true,
            willChange: "clip-path",
          });

          gsap.set(desktopScenes.slice(1), {
            clipPath: "inset(0 100% 0 0)",
            webkitClipPath: "inset(0 100% 0 0)",
          });

          gsap.set(desktopTextScenes, {
            clipPath: "inset(0 0% 0 0)",
            webkitClipPath: "inset(0 0% 0 0)",
            force3D: true,
            willChange: "clip-path",
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
            force3D: true,
            willChange: "transform",
          });

          const measureTextReveal = () => {
            const textBounds = desktopText?.getBoundingClientRect();

            textRevealStart = textBounds
              ? gsap.utils.clamp(0, 0.96, textBounds.left / window.innerWidth)
              : 0.64;
            textRevealEnd = textBounds
              ? gsap.utils.clamp(textRevealStart + 0.04, 1, textBounds.right / window.innerWidth)
              : 0.9;
            textRevealDuration = textRevealEnd - textRevealStart;
          };

          const snapToProjectState = (progress: number) => {
            if (transitionCount <= 0 || progress <= 0 || progress >= 1) {
              return progress;
            }

            if (progress <= entryHoldProgress) {
              return progress;
            }

            const activeProgress = (progress - entryHoldProgress) / (1 - entryHoldProgress);
            const scaledProgress = activeProgress * transitionCount;
            const segmentIndex = Math.min(transitionCount - 1, Math.floor(scaledProgress));
            const localProgress = scaledProgress - segmentIndex;

            if (localProgress <= SNAP_EDGE_THRESHOLD) {
              return entryHoldProgress + (segmentIndex / transitionCount) * (1 - entryHoldProgress);
            }

            if (localProgress >= 1 - SNAP_EDGE_THRESHOLD) {
              return entryHoldProgress + ((segmentIndex + 1) / transitionCount) * (1 - entryHoldProgress);
            }

            return progress;
          };

          const getActiveProgress = (progress: number) => {
            if (transitionCount <= 0) {
              return progress;
            }

            return gsap.utils.clamp(0, 1, (progress - entryHoldProgress) / (1 - entryHoldProgress));
          };

          measureTextReveal();

          const updateTextLayerVisibility = (progress: number) => {
            if (desktopTextScenes.length === 0) {
              return;
            }

            const wipeProgress = gsap.utils.clamp(0, transitionCount, progress * transitionCount);

            if (wipeProgress >= transitionCount) {
              const finalPairKey = `final-${featuredProjects.length - 1}`;

              if (activeTextPairKey === finalPairKey) {
                return;
              }

              activeTextPairKey = finalPairKey;
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
            const pairKey = `${currentTextIndex}-${nextTextIndex}`;

            if (activeTextPairKey === pairKey) {
              return;
            }

            activeTextPairKey = pairKey;

            gsap.set(desktopTextScenes, {
              autoAlpha: 0,
              pointerEvents: "none",
            });
            gsap.set([desktopTextScenes[currentTextIndex], desktopTextScenes[nextTextIndex]], {
              autoAlpha: 1,
              pointerEvents: "auto",
            });
          };

          const updateFeaturedCursorColor = (progress: number) => {
            if (featuredCursorColors.length === 0 || transitionCount <= 0) {
              return;
            }

            const wipeProgress = gsap.utils.clamp(0, transitionCount, progress * transitionCount);
            const currentIndex = gsap.utils.clamp(
              0,
              featuredCursorColors.length - 1,
              Math.floor(wipeProgress),
            );
            const nextIndex = gsap.utils.clamp(0, featuredCursorColors.length - 1, currentIndex + 1);
            const localProgress = currentIndex === nextIndex ? 1 : wipeProgress - currentIndex;
            const cursorColor =
              currentIndex === nextIndex
                ? featuredCursorColors[currentIndex]
                : gsap.utils.interpolate(
                    featuredCursorColors[currentIndex],
                    featuredCursorColors[nextIndex],
                    localProgress,
                  );

            document.documentElement.style.setProperty(FEATURED_CURSOR_COLOR_PROPERTY, cursorColor);
          };

          updateFeaturedCursorColor(0);

          const swipeTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: pin,
              start: "top top",
              end: `+=${window.innerHeight * timelineUnits}`,
              scrub: true,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              snap: {
                snapTo: snapToProjectState,
                duration: { min: 0.18, max: 0.42 },
                delay: 0.04,
                ease: "power2.out",
              },
              onRefreshInit: () => {
                measureTextReveal();
              },
              onRefresh: (self) => {
                activeTextPairKey = "";
                const activeProgress = getActiveProgress(self.progress);

                updateTextLayerVisibility(activeProgress);
                updateFeaturedCursorColor(activeProgress);
              },
              onUpdate: (self) => {
                const activeProgress = getActiveProgress(self.progress);

                updateTextLayerVisibility(activeProgress);
                updateFeaturedCursorColor(activeProgress);
              },
            },
          });

          swipeTimeline.to({}, {
            duration: FEATURED_ENTRY_HOLD,
          });

          desktopScenes.slice(1).forEach((scene, index) => {
            const previousTextScene = desktopTextScenes[index];
            const textScene = desktopTextScenes[index + 1];
            const transitionStart = FEATURED_ENTRY_HOLD + index;

            swipeTimeline.fromTo(
              scene,
              {
                clipPath: "inset(0 100% 0 0)",
                webkitClipPath: "inset(0 100% 0 0)",
              },
              {
                clipPath: "inset(0 0% 0 0)",
                webkitClipPath: "inset(0 0% 0 0)",
                duration: 1,
                ease: "none",
              },
              transitionStart,
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
                  transitionStart + textRevealStart,
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
                transitionStart + textRevealStart,
              );
            }
          });

          cleanupCallbacks.push(() => {
            document.documentElement.style.removeProperty(FEATURED_CURSOR_COLOR_PROPERTY);
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
      data-cursor-theme="dark"
      data-cursor-color="var(--site-cursor-featured-color, var(--cursor-light))"
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
                data-cursor-color="var(--site-cursor-featured-color, var(--cursor-light))"
                className="absolute inset-y-0 left-0 w-full overflow-hidden"
                style={{ zIndex: index + 1 }}
              >
                <div className="absolute left-0 top-0 h-full min-h-screen w-screen overflow-hidden">
                  {(() => {
                    const backgroundImage = getProjectBackgroundImage(project);

                    return (
                      <>
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
                    {backgroundImage ? (
                      <Image
                        src={backgroundImage}
                        alt=""
                        fill
                        unoptimized
                        className="h-full w-full object-cover blur-lg"
                      />
                    ) : null}
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
                      </>
                    );
                  })()}
                </div>
              </div>
            ))}
          </div>

          <div className="layout-shell pointer-events-none absolute inset-x-0 top-0 z-30 flex min-h-screen justify-end py-8 sm:py-10 lg:py-14">
            <div
              data-featured-desktop-text
              className="pointer-events-auto relative mr-[calc(-1*var(--site-featured-link-overhang))] min-h-[28rem] w-[calc(100%+var(--site-featured-link-overhang))] max-w-[calc(min(32rem,31vw)+var(--site-featured-link-overhang))] pb-2 opacity-100 lg:min-h-[34rem]"
            >
              {featuredProjects.map((project, index) => (
                <div
                  key={project.slug}
                  data-featured-desktop-text-scene
                  data-cursor-color="var(--site-cursor-featured-color, var(--cursor-light))"
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
            data-cursor-theme="dark"
            data-cursor-color={project.cursorColor ?? project.accentColor}
            className="relative isolate overflow-hidden border-b border-[rgba(255,248,242,0.16)] min-[768px]:min-h-[auto] xl:min-h-screen"
            style={{ backgroundColor: project.backgroundColor }}
          >
            {(() => {
              const backgroundImage = getProjectBackgroundImage(project);

              return (
                <>
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
              {backgroundImage ? (
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  unoptimized
                  className="h-full w-full object-cover blur-lg"
                />
              ) : null}
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
                </>
              );
            })()}
          </article>
        ))}
      </div>
    </section>
  );
}
