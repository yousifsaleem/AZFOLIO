"use client";

const verticalGuides = [
  ["page-left", "--guide-x-page-left", "1px"],
  ["left-bleed-inner", "--guide-x-left-bleed-inner", "24px"],
  ["left-nav", "--guide-x-left-nav", "60px"],
  ["text-column", "--guide-x-text-column", "1282px"],
  ["time-column", "--guide-x-time-column", "1738px"],
  ["right-content", "--guide-x-right-content", "1896px"],
  ["page-right", "--guide-x-page-right", "1919px"],
] as const;

const horizontalGuides = [
  ["page-top", "--guide-y-page-top", "0px"],
  ["header-top", "--guide-y-header-top", "43px"],
  ["header-baseline", "--guide-y-header-baseline", "51px"],
  ["nav-block-bottom", "--guide-y-nav-block-bottom", "190px"],
  ["header-bottom", "--guide-y-header-bottom", "221px"],
  ["project-number", "--guide-y-project-number", "395px"],
  ["title-top", "--guide-y-title-top", "413px"],
  ["description-top", "--guide-y-description-top", "443px"],
  ["description-bottom", "--guide-y-description-bottom", "462px"],
  ["tags-top", "--guide-y-tags-top", "843px"],
  ["tags-bottom", "--guide-y-tags-bottom", "855px"],
  ["next-top", "--guide-y-next-top", "1003px"],
  ["page-bottom", "--guide-y-page-bottom", "1041px"],
] as const;

export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden xl:block"
      aria-hidden="true"
    >
      {verticalGuides.map(([label, guide, fallback], index) => (
        <div
          key={guide}
          className="fixed top-0 h-screen w-px bg-cyan-400/80 shadow-[0_0_0_1px_rgba(34,211,238,0.18)]"
          style={{ left: `var(${guide}, ${fallback})` }}
        >
          <span
            className="absolute left-1 rounded-sm bg-cyan-300/90 px-1 font-mono text-[10px] leading-4 text-black"
            style={{ top: `${8 + index * 18}px` }}
          >
            {label}
          </span>
        </div>
      ))}

      {horizontalGuides.map(([label, guide, fallback], index) => (
        <div
          key={guide}
          className="fixed left-0 h-px w-screen bg-cyan-300/75 shadow-[0_0_0_1px_rgba(103,232,249,0.14)]"
          style={{ top: `var(${guide}, ${fallback})` }}
        >
          <span
            className="absolute top-1 rounded-sm bg-cyan-300/90 px-1 font-mono text-[10px] leading-4 text-black"
            style={{ left: `${8 + (index % 7) * 118}px` }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
