"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const archiveProjects = [
  {
    title: "Twice",
    category: "Interaction & Development",
    year: "2026",
    previewImage: "/images/winter/preview.jpg",
  },
  {
    title: "The Dama",
    category: "Design & Development",
    year: "2025",
    previewImage: "/images/quiet-hours/preview.JPG",
  },
  {
    title: "Fabric",
    category: "Design & Development",
    year: "2025",
    previewImage: "/images/enterprise/preview.JPG",
  },
  {
    title: "Aanstekelijk",
    category: "Design & Development",
    year: "2024",
    previewImage: "/images/barons/preview.JPG",
  },
  {
    title: "Xaar Annual Report",
    category: "Editorial / Corporate",
    year: "2026",
    previewImage: "/images/winter/background.jpg",
  },
  {
    title: "Titon Annual Report",
    category: "Editorial / Corporate",
    year: "2025",
    previewImage: "/images/quiet-hours/thumbnail.jpg",
  },
  {
    title: "Star Energy",
    category: "Editorial / Strategy",
    year: "2025",
    previewImage: "/images/enterprise/thumbnail.jpg",
  },
  {
    title: "MIGO Opportunities Trust",
    category: "Editorial / Concept",
    year: "2026",
    previewImage: "/images/barons/thumbnail.jpg",
  },
];

const PREVIEW_TRAVEL_PERCENT = 112;
const PREVIEW_CARD_COUNT = 2;

type ArchiveProject = (typeof archiveProjects)[number];

export default function Archive() {
  const [activeProject, setActiveProject] = useState<ArchiveProject | null>(null);

  const rootRef = useRef<HTMLElement>(null);
  const previewCardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const previewMediaRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageLayerRefs = useRef<Array<Array<HTMLDivElement | null>>>([]);
  const activeProjectRef = useRef<ArchiveProject | null>(null);
  const queuedProjectRef = useRef<ArchiveProject | null>(null);
  const switchTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const canUseHoverPreviewRef = useRef(false);
  const isPreviewVisibleRef = useRef(false);
  const activeCardIndexRef = useRef(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");

    const updateHoverCapability = () => {
      canUseHoverPreviewRef.current = mediaQuery.matches;
    };

    updateHoverCapability();
    mediaQuery.addEventListener("change", updateHoverCapability);

    return () => {
      mediaQuery.removeEventListener("change", updateHoverCapability);
    };
  }, []);

  useEffect(() => {
    const previewCards = previewCardRefs.current.filter(Boolean);
    const previewMedia = previewMediaRefs.current.filter(Boolean);
    const imageLayers = imageLayerRefs.current.flat().filter(Boolean);

    if (!previewCards.length || !previewMedia.length) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(previewCards, {
        autoAlpha: 0,
        y: 0,
        yPercent: PREVIEW_TRAVEL_PERCENT,
        scale: 0.96,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(previewMedia, {
        scale: 1.04,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(imageLayers, {
        autoAlpha: 0,
        force3D: true,
      });
    }, rootRef);

    return () => {
      isPreviewVisibleRef.current = false;
      activeProjectRef.current = null;
      queuedProjectRef.current = null;
      switchTimelineRef.current = null;
      ctx.revert();
    };
  }, []);

  const leaveArchive = () => {
    const previewCards = previewCardRefs.current.filter(Boolean);
    const previewMedia = previewMediaRefs.current.filter(Boolean);

    if (!previewCards.length || !previewMedia.length) {
      return;
    }

    activeProjectRef.current = null;
    queuedProjectRef.current = null;
    isPreviewVisibleRef.current = false;
    switchTimelineRef.current?.kill();

    gsap.killTweensOf([...previewCards, ...previewMedia]);
    switchTimelineRef.current = gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          switchTimelineRef.current = null;

          if (!activeProjectRef.current) {
            setActiveProject(null);
          }
        },
      })
      .to(previewCards, {
        yPercent: PREVIEW_TRAVEL_PERCENT,
        scale: 0.98,
        duration: 0.32,
        ease: "power3.inOut",
      }, 0)
      .to(previewCards, {
        autoAlpha: 0,
        duration: 0.08,
        ease: "power2.out",
      }, 0.3)
      .to(previewMedia, {
        scale: 1.035,
        duration: 0.32,
        ease: "power3.inOut",
      }, 0);
  };

  const setPreviewImage = (cardIndex: number, project: ArchiveProject) => {
    const projectIndex = archiveProjects.findIndex((archiveProject) => archiveProject.title === project.title);

    activeProjectRef.current = project;
    setActiveProject(project);

    imageLayerRefs.current[cardIndex]?.forEach((imageLayer, index) => {
      if (!imageLayer) {
        return;
      }

      gsap.set(imageLayer, {
        autoAlpha: index === projectIndex ? 1 : 0,
      });
    });
  };

  const setCardOffscreen = (previewCard: HTMLDivElement, previewMedia: HTMLDivElement) => {
    gsap.set(previewCard, {
      autoAlpha: 0,
      y: 0,
      yPercent: PREVIEW_TRAVEL_PERCENT,
      scale: 0.96,
    });

    gsap.set(previewMedia, {
      y: 0,
      autoAlpha: 1,
      scale: 1.045,
    });
  };

  const playQueuedPreview = () => {
    const queuedProject = queuedProjectRef.current;
    queuedProjectRef.current = null;

    if (
      queuedProject &&
      isPreviewVisibleRef.current &&
      activeProjectRef.current?.title !== queuedProject.title
    ) {
      playSwitchPreview(queuedProject);
    }
  };

  const playSwitchPreview = (project: ArchiveProject) => {
    const currentCardIndex = activeCardIndexRef.current;
    const nextCardIndex = (currentCardIndex + 1) % PREVIEW_CARD_COUNT;
    const currentCard = previewCardRefs.current[currentCardIndex];
    const currentMedia = previewMediaRefs.current[currentCardIndex];
    const nextCard = previewCardRefs.current[nextCardIndex];
    const nextMedia = previewMediaRefs.current[nextCardIndex];

    if (!currentCard || !currentMedia || !nextCard || !nextMedia) {
      return;
    }

    switchTimelineRef.current?.kill();
    gsap.killTweensOf([currentCard, currentMedia, nextCard, nextMedia]);
    setCardOffscreen(nextCard, nextMedia);

    switchTimelineRef.current = gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          switchTimelineRef.current = null;
          activeCardIndexRef.current = nextCardIndex;
          playQueuedPreview();
        },
      })
      .set(nextCard, { zIndex: 2 }, 0)
      .set(currentCard, { zIndex: 1 }, 0)
      .to(currentCard, {
        yPercent: PREVIEW_TRAVEL_PERCENT,
        scale: 0.98,
        duration: 0.34,
        ease: "power3.inOut",
      }, 0)
      .to(currentCard, {
        autoAlpha: 0,
        duration: 0.08,
        ease: "power2.out",
      }, 0.32)
      .to(currentMedia, {
        scale: 1.035,
        duration: 0.34,
        ease: "power3.inOut",
      }, 0)
      .add(() => {
        setPreviewImage(nextCardIndex, project);
        setCardOffscreen(nextCard, nextMedia);
      })
      .to(nextCard, {
        yPercent: 0,
        scale: 1,
        autoAlpha: 1,
        duration: 0.4,
        ease: "power4.out",
      })
      .to(nextMedia, {
        scale: 1,
        duration: 0.46,
        ease: "power4.out",
      }, "<");
  };

  const playEnterPreview = (project: ArchiveProject) => {
    const previewCard = previewCardRefs.current[activeCardIndexRef.current];
    const previewMedia = previewMediaRefs.current[activeCardIndexRef.current];

    if (!previewCard || !previewMedia) {
      return;
    }

    switchTimelineRef.current?.kill();
    isPreviewVisibleRef.current = true;
    setPreviewImage(activeCardIndexRef.current, project);

    gsap.killTweensOf([previewCard, previewMedia]);
    setCardOffscreen(previewCard, previewMedia);

    switchTimelineRef.current = gsap
      .timeline({
        defaults: { overwrite: "auto" },
        onComplete: () => {
          switchTimelineRef.current = null;
          playQueuedPreview();
        },
      })
      .set(previewCard, { zIndex: 2 }, 0)
      .to(previewCard, {
        autoAlpha: 1,
        yPercent: 0,
        scale: 1,
        duration: 0.42,
        ease: "power4.out",
      }, 0)
      .to(previewMedia, {
        scale: 1,
        duration: 0.48,
        ease: "power4.out",
      }, 0);
  };

  const showPreview = (project: ArchiveProject) => {
    const hasPreviewCards = previewCardRefs.current.filter(Boolean).length === PREVIEW_CARD_COUNT;

    if (!canUseHoverPreviewRef.current || window.innerWidth < 1024 || !hasPreviewCards) {
      return;
    }

    const previousProject = activeProjectRef.current;
    const isSwitchingPreview = isPreviewVisibleRef.current && previousProject?.title !== project.title;

    if (
      (isPreviewVisibleRef.current && previousProject?.title === project.title) ||
      queuedProjectRef.current?.title === project.title
    ) {
      return;
    }

    if (switchTimelineRef.current?.isActive()) {
      queuedProjectRef.current = project;
      return;
    }

    if (isSwitchingPreview) {
      playSwitchPreview(project);
      return;
    }

    playEnterPreview(project);
  };

  return (
    <section
      ref={rootRef}
      id="archive"
      data-header-theme="light"
      className="section-space bg-[var(--color-surface-alt)] text-[var(--color-text)]"
      onMouseLeave={leaveArchive}
    >
      <div className="layout-shell">
        <div className="mb-12 border-b border-[var(--color-border)] pb-6 xl:grid xl:grid-cols-[minmax(0,1fr)_var(--site-time-column-width)] xl:gap-8">
          <div className="hidden xl:block" aria-hidden="true" />
          <h2 className="type-midsize text-left text-[var(--color-text-muted)]">Archive</h2>
        </div>

        <div
          className="pointer-events-none fixed bottom-8 right-[max(2rem,4vw)] z-[60] hidden aspect-[6/4] w-[clamp(400px,48vw,760px)] max-w-[calc(100vw-4rem)] lg:block"
          aria-hidden="true"
        >
          {Array.from({ length: PREVIEW_CARD_COUNT }).map((_, cardIndex) => (
            <div
              key={cardIndex}
              ref={(node) => {
                previewCardRefs.current[cardIndex] = node;
              }}
              className="absolute inset-0 overflow-hidden rounded-[1.05rem] border border-[rgba(31,27,25,0.14)] bg-[rgba(31,27,25,0.9)] shadow-[0_30px_90px_rgba(31,27,25,0.24)] [will-change:transform,opacity]"
            >
              <div
                ref={(node) => {
                  previewMediaRefs.current[cardIndex] = node;
                }}
                className="relative h-full w-full overflow-hidden"
              >
                <div className="absolute inset-0 bg-[rgba(31,27,25,0.92)]" />
                {archiveProjects.map((project, projectIndex) => (
                  <div
                    key={project.title}
                    ref={(node) => {
                      if (!imageLayerRefs.current[cardIndex]) {
                        imageLayerRefs.current[cardIndex] = [];
                      }
                      imageLayerRefs.current[cardIndex][projectIndex] = node;
                    }}
                    className="absolute inset-0 [will-change:opacity]"
                  >
                    <Image
                      src={project.previewImage}
                      alt=""
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="(min-width: 1024px) 48vw, 0px"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div>
          {archiveProjects.map((project, index) => (
            <div
              key={project.title}
              className={`group border-b border-[var(--color-border)] transition-colors duration-300 ease-out hover:border-[var(--color-border-strong)] ${
                activeProject?.title === project.title ? "bg-[rgba(255,255,255,0.18)]" : ""
              }`}
              onMouseEnter={() => showPreview(project)}
            >
              <div className="grid gap-3 py-6 transition-transform duration-300 ease-out group-hover:translate-x-1 md:py-7 xl:grid-cols-[minmax(0,1fr)_var(--site-time-column-width)] xl:items-end xl:gap-8">
                <div className="min-w-0">
                  <p className="type-small mb-2 text-[rgba(153,153,153,0.88)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="type-midsize text-[rgba(0,0,0,0.88)] transition-colors duration-300 ease-out group-hover:text-[var(--color-text)]">
                    {project.title}
                  </h3>
                </div>

                <div className="type-regular flex flex-col items-start gap-1 text-left xl:pb-1">
                  <p className="text-[rgba(153,153,153,0.88)]">{project.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
