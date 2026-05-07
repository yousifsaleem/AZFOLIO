"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const archiveProjects = [
  {
    title: "Twice",
    category: "Interaction & Development",
    year: "2026",
    previewImage: "/images/archive/twice.jpg",
  },
  {
    title: "The Dama",
    category: "Design & Development",
    year: "2025",
    previewImage: "/images/archive/the-dama.jpg",
  },
  {
    title: "Fabric",
    category: "Design & Development",
    year: "2025",
    previewImage: "/images/archive/fabric.jpg",
  },
  {
    title: "Aanstekelijk",
    category: "Design & Development",
    year: "2024",
    previewImage: "/images/archive/aanstekelijk.jpg",
  },
  {
    title: "Xaar Annual Report",
    category: "Editorial / Corporate",
    year: "2026",
    previewImage: "/images/archive/xaar-annual-report.jpg",
  },
  {
    title: "Titon Annual Report",
    category: "Editorial / Corporate",
    year: "2025",
    previewImage: "/images/archive/titon-annual-report.jpg",
  },
  {
    title: "Star Energy",
    category: "Editorial / Strategy",
    year: "2025",
    previewImage: "/images/archive/star-energy.jpg",
  },
  {
    title: "MIGO Opportunities Trust",
    category: "Editorial / Concept",
    year: "2026",
    previewImage: "/images/archive/migo-opportunities-trust.jpg",
  },
];

const PREVIEW_DIMENSION = 340;
const CURSOR_SIZE = 18;
const CURSOR_LERP = 0.44;
const PREVIEW_LERP = 0.18;

export default function Archive() {
  const [activeProject, setActiveProject] = useState<(typeof archiveProjects)[number] | null>(null);
  const [hasImageError, setHasImageError] = useState(false);

  const rootRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const isInsideArchiveRef = useRef(false);
  const isHoveringRef = useRef(false);
  const isBaseCursorVisibleRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const previewXRef = useRef(0);
  const previewYRef = useRef(0);
  const canUseHoverPreviewRef = useRef(false);

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
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const previewContent = previewContentRef.current;

    if (!cursor || !cursorDot || !previewContent) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(cursor, {
        autoAlpha: 0,
        width: PREVIEW_DIMENSION,
        height: PREVIEW_DIMENSION,
        transformOrigin: "50% 50%",
        x: -9999,
        y: -9999,
        force3D: true,
      });

      gsap.set(cursorDot, {
        autoAlpha: 1,
        width: CURSOR_SIZE,
        height: CURSOR_SIZE,
        scale: 1,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(previewContent, {
        autoAlpha: 0,
        scale: 0.1,
        transformOrigin: "50% 50%",
        force3D: true,
      });
    }, cursor);

    const tick = () => {
      if (isInsideArchiveRef.current) {
        cursorXRef.current += (mouseXRef.current - cursorXRef.current) * CURSOR_LERP;
        cursorYRef.current += (mouseYRef.current - cursorYRef.current) * CURSOR_LERP;
        previewXRef.current += (mouseXRef.current - previewXRef.current) * PREVIEW_LERP;
        previewYRef.current += (mouseYRef.current - previewYRef.current) * PREVIEW_LERP;

        const targetX = isHoveringRef.current ? previewXRef.current : cursorXRef.current;
        const targetY = isHoveringRef.current ? previewYRef.current : cursorYRef.current;

        gsap.set(cursor, {
          x: targetX - PREVIEW_DIMENSION / 2,
          y: targetY - PREVIEW_DIMENSION / 2,
        });
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      isInsideArchiveRef.current = false;
      isHoveringRef.current = false;
      isBaseCursorVisibleRef.current = false;
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  const placeCursorImmediately = (clientX: number, clientY: number) => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    mouseXRef.current = clientX;
    mouseYRef.current = clientY;
    cursorXRef.current = clientX;
    cursorYRef.current = clientY;
    previewXRef.current = clientX;
    previewYRef.current = clientY;

    gsap.set(cursor, {
      x: clientX - PREVIEW_DIMENSION / 2,
      y: clientY - PREVIEW_DIMENSION / 2,
    });
  };

  const enterArchive = (clientX: number, clientY: number) => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const previewContent = previewContentRef.current;

    if (!canUseHoverPreviewRef.current || window.innerWidth < 1024 || !cursor || !cursorDot || !previewContent) {
      return;
    }

    isInsideArchiveRef.current = true;
    isHoveringRef.current = false;
    isBaseCursorVisibleRef.current = true;
    placeCursorImmediately(clientX, clientY);

    gsap.killTweensOf([cursor, cursorDot, previewContent]);
    gsap.set(previewContent, {
      autoAlpha: 0,
      scale: 0.1,
    });

    gsap.to(cursor, {
      autoAlpha: 1,
      duration: 0.12,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(cursorDot, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.22,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const moveCursor = (clientX: number, clientY: number) => {
    if (!canUseHoverPreviewRef.current || window.innerWidth < 1024 || !isInsideArchiveRef.current) {
      return;
    }

    mouseXRef.current = clientX;
    mouseYRef.current = clientY;
  };

  const leaveArchive = () => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const previewContent = previewContentRef.current;

    if (!cursor || !cursorDot || !previewContent) {
      return;
    }

    isInsideArchiveRef.current = false;
    isHoveringRef.current = false;
    isBaseCursorVisibleRef.current = false;
    setActiveProject(null);

    gsap.killTweensOf([cursor, cursorDot, previewContent]);
    gsap.to(cursor, {
      autoAlpha: 0,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(cursorDot, {
      autoAlpha: 0,
      scale: 0.72,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });
    gsap.to(previewContent, {
      autoAlpha: 0,
      scale: 0.1,
      duration: 0.18,
      ease: "power2.out",
      overwrite: true,
    });
  };

  const showPreview = (project: (typeof archiveProjects)[number], clientX: number, clientY: number) => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const previewContent = previewContentRef.current;

    if (!canUseHoverPreviewRef.current || window.innerWidth < 1024 || !cursor || !cursorDot || !previewContent) {
      return;
    }

    isInsideArchiveRef.current = true;
    isHoveringRef.current = true;
    isBaseCursorVisibleRef.current = false;
    setHasImageError(false);
    setActiveProject(project);
    previewXRef.current = clientX;
    previewYRef.current = clientY;
    moveCursor(clientX, clientY);

    gsap.killTweensOf([cursor, cursorDot, previewContent]);
    gsap.set(cursor, {
      x: clientX - PREVIEW_DIMENSION / 2,
      y: clientY - PREVIEW_DIMENSION / 2,
      transformOrigin: "50% 50%",
    });
    gsap.set(previewContent, {
      autoAlpha: 0,
      scale: 0.1,
      transformOrigin: "50% 50%",
    });

    gsap.to(cursor, {
      autoAlpha: 1,
      duration: 0.62,
      ease: "power4.out",
      overwrite: true,
    });

    gsap.to(cursorDot, {
      autoAlpha: 0,
      scale: 0.45,
      duration: 0.2,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(previewContent, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.52,
      ease: "power4.out",
      overwrite: true,
    });
  };

  const hidePreview = () => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const previewContent = previewContentRef.current;

    if (!cursor || !cursorDot || !previewContent) {
      return;
    }

    isHoveringRef.current = false;
    isBaseCursorVisibleRef.current = false;
    gsap.killTweensOf([cursor, cursorDot, previewContent]);

    gsap.to(previewContent, {
      autoAlpha: 0,
      scale: 0.1,
      duration: 0.3,
      ease: "power3.out",
      overwrite: true,
      onComplete: () => {
        setActiveProject(null);
        if (isInsideArchiveRef.current && !isHoveringRef.current) {
          isBaseCursorVisibleRef.current = true;
          gsap.to(cursorDot, {
            autoAlpha: 1,
            scale: 1,
            duration: 0.24,
            ease: "power3.out",
            overwrite: true,
          });
        }
      },
    });
  };

  return (
    <section
      ref={rootRef}
      id="archive"
      data-header-theme="light"
      className="section-space bg-[var(--color-surface-alt)] text-[var(--color-text)] lg:cursor-none"
      onMouseEnter={(event) => enterArchive(event.clientX, event.clientY)}
      onMouseMove={(event) => moveCursor(event.clientX, event.clientY)}
      onMouseLeave={leaveArchive}
    >
      <div className="layout-shell">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-[var(--color-border)] pb-6">
          <p className="type-heading text-[var(--color-text-muted)]">Archive</p>
          <p className="type-body hidden max-w-sm text-[var(--color-text-muted)] xl:block">
            A wider editorial index of projects, prepared for future cursor-follow previews.
          </p>
        </div>

        <div
          ref={cursorRef}
          className="pointer-events-none fixed left-0 top-0 z-[70] hidden will-change-transform lg:block"
          aria-hidden="true"
        >
          <div
            ref={cursorDotRef}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(31,27,25,0.88)] shadow-[0_10px_28px_rgba(31,27,25,0.16)]"
          />
          <div
            ref={previewContentRef}
            className="relative h-full w-full overflow-hidden rounded-[28px] border border-[rgba(31,27,25,0.12)] bg-[var(--color-card-muted)] shadow-[0_22px_60px_rgba(31,27,25,0.18)]"
          >
            <div className="relative h-full w-full overflow-hidden">
              {activeProject && !hasImageError ? (
                <Image
                  src={activeProject.previewImage}
                  alt={activeProject.title}
                  fill
                  unoptimized
                  className="object-cover"
                  onError={() => setHasImageError(true)}
                />
              ) : (
                <div className="h-full w-full bg-[linear-gradient(135deg,var(--color-accent-lilac)_0%,var(--color-accent-blue)_100%)]" />
              )}
            </div>
          </div>
        </div>

        <div>
          {archiveProjects.map((project) => (
            <div
              key={project.title}
              className={`group border-b border-[var(--color-border)] transition-colors duration-300 ease-out hover:border-[var(--color-border-strong)] ${
                activeProject?.title === project.title ? "cursor-none bg-[rgba(255,255,255,0.18)]" : "cursor-none"
              }`}
              onMouseEnter={(event) => showPreview(project, event.clientX, event.clientY)}
              onMouseLeave={hidePreview}
            >
              <div className="grid gap-3 py-8 transition-transform duration-300 ease-out group-hover:translate-x-1 md:py-10 xl:grid-cols-[minmax(0,1fr)_320px_90px] xl:items-end xl:gap-8">
                <h3 className="type-display-xl text-[rgba(31,27,25,0.88)] transition-colors duration-300 ease-out group-hover:text-[var(--color-text)] max-md:text-[clamp(2.2rem,12vw,4.2rem)] max-md:leading-[0.98]">
                  {project.title}
                </h3>

                <p className="type-meta text-[var(--color-text-muted)] xl:pb-3">{project.category}</p>

                <p className="type-meta text-[rgba(117,104,95,0.78)] xl:pb-3 xl:text-right">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
