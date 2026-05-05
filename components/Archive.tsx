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

const PREVIEW_DIMENSION = 300;
const BALL_SIZE = 20;
const BALL_LERP = 0.52;
const PREVIEW_LERP = 0.22;

export default function Archive() {
  const [activeProject, setActiveProject] = useState<(typeof archiveProjects)[number] | null>(null);
  const [hasImageError, setHasImageError] = useState(false);

  const previewRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);
  const mouseXRef = useRef(0);
  const mouseYRef = useRef(0);
  const ballXRef = useRef(0);
  const ballYRef = useRef(0);
  const previewXRef = useRef(0);
  const previewYRef = useRef(0);

  useEffect(() => {
    const preview = previewRef.current;
    const ball = ballRef.current;

    if (!preview || !ball) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(preview, {
        autoAlpha: 0,
        scale: 0.92,
        x: -9999,
        y: -9999,
        force3D: true,
      });

      gsap.set(ball, {
        autoAlpha: 0,
        scale: 0.25,
        x: -9999,
        y: -9999,
        force3D: true,
      });
    }, preview);

    const tick = () => {
      if (isHoveringRef.current) {
        ballXRef.current += (mouseXRef.current - ballXRef.current) * BALL_LERP;
        ballYRef.current += (mouseYRef.current - ballYRef.current) * BALL_LERP;
        previewXRef.current += (mouseXRef.current - previewXRef.current) * PREVIEW_LERP;
        previewYRef.current += (mouseYRef.current - previewYRef.current) * PREVIEW_LERP;

        gsap.set(preview, {
          x: previewXRef.current - PREVIEW_DIMENSION / 2,
          y: previewYRef.current - PREVIEW_DIMENSION - 28,
        });

        gsap.set(ball, {
          x: ballXRef.current - BALL_SIZE / 2,
          y: ballYRef.current - BALL_SIZE / 2,
        });
      }

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    animationFrameRef.current = window.requestAnimationFrame(tick);

    return () => {
      isHoveringRef.current = false;
      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  const placePreviewImmediately = (clientX: number, clientY: number) => {
    const preview = previewRef.current;
    const ball = ballRef.current;

    if (!preview || !ball) {
      return;
    }

    mouseXRef.current = clientX;
    mouseYRef.current = clientY;
    ballXRef.current = clientX;
    ballYRef.current = clientY;
    previewXRef.current = clientX;
    previewYRef.current = clientY;

    gsap.set(preview, {
      x: clientX - PREVIEW_DIMENSION / 2,
      y: clientY - PREVIEW_DIMENSION - 28,
    });
    gsap.set(ball, {
      x: clientX - BALL_SIZE / 2,
      y: clientY - BALL_SIZE / 2,
    });
  };

  const showPreview = (project: (typeof archiveProjects)[number], clientX: number, clientY: number) => {
    const preview = previewRef.current;
    const ball = ballRef.current;

    if (window.innerWidth < 768 || !preview || !ball) {
      return;
    }

    isHoveringRef.current = true;
    setHasImageError(false);
    setActiveProject(project);
    placePreviewImmediately(clientX, clientY);

    gsap.killTweensOf(preview);
    gsap.killTweensOf(ball);

    gsap.to(ball, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.16,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(preview, {
      autoAlpha: 1,
      scale: 1,
      duration: 0.22,
      ease: "power2.out",
      overwrite: true,
      delay: 0.04,
    });
  };

  const movePreview = (clientX: number, clientY: number) => {
    if (window.innerWidth < 768 || !isHoveringRef.current) {
      return;
    }

    mouseXRef.current = clientX;
    mouseYRef.current = clientY;
  };

  const hidePreview = () => {
    const preview = previewRef.current;
    const ball = ballRef.current;

    if (!preview || !ball) {
      return;
    }

    isHoveringRef.current = false;
    gsap.killTweensOf(preview);
    gsap.killTweensOf(ball);

    gsap.to(ball, {
      autoAlpha: 0,
      scale: 0.25,
      duration: 0.14,
      ease: "power2.out",
      overwrite: true,
    });

    gsap.to(preview, {
      autoAlpha: 0,
      scale: 0.92,
      duration: 0.16,
      ease: "power2.out",
      overwrite: true,
      onComplete: () => {
        setActiveProject(null);
      },
    });
  };

  return (
    <section id="archive" data-header-theme="light" className="bg-[#f7f3ed] px-6 py-24 text-zinc-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-zinc-300 pb-6">
          <p className="type-heading text-zinc-500">Archive</p>
          <p className="type-body hidden max-w-sm text-zinc-500 lg:block">
            A wider editorial index of projects, prepared for future cursor-follow previews.
          </p>
        </div>

        <div
          ref={previewRef}
          className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[300px] w-[300px] will-change-transform md:block"
          aria-hidden="true"
        >
          <div className="relative h-[300px] w-[300px] overflow-hidden rounded-[1.75rem] border border-zinc-300 bg-[#ece5da]">
            <div className="relative h-full w-full overflow-hidden rounded-[1.5rem] bg-[#ece5da]">
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
                <div className="h-full w-full bg-[linear-gradient(135deg,#ede6da_0%,#ddd3c2_100%)]" />
              )}
            </div>
          </div>
        </div>

        <div
          ref={ballRef}
          className="pointer-events-none fixed left-0 top-0 z-[71] hidden h-5 w-5 rounded-full bg-black will-change-transform md:block"
          aria-hidden="true"
        />

        <div>
          {archiveProjects.map((project) => (
            <div
              key={project.title}
              className={`group border-b border-zinc-300 transition-colors duration-300 ease-out hover:border-zinc-700 ${
                activeProject?.title === project.title ? "cursor-none" : "cursor-pointer"
              }`}
              onMouseEnter={(event) => showPreview(project, event.clientX, event.clientY)}
              onMouseMove={(event) => movePreview(event.clientX, event.clientY)}
              onMouseLeave={hidePreview}
            >
              <div className="grid gap-3 py-8 transition-transform duration-300 ease-out group-hover:translate-x-1 md:py-10 lg:grid-cols-[minmax(0,1fr)_320px_90px] lg:items-end lg:gap-10">
                <h3 className="type-display-xl text-zinc-800 transition-colors duration-300 ease-out group-hover:text-zinc-950 max-md:text-[clamp(2.2rem,12vw,4.2rem)] max-md:leading-[0.98]">
                  {project.title}
                </h3>

                <p className="type-meta text-zinc-600 lg:pb-3">{project.category}</p>

                <p className="type-meta text-zinc-500 lg:pb-3 lg:text-right">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
