"use client";

const verticalGuides = [
  ["--guide-x-1", "154px"],
  ["--guide-x-2", "174px"],
  ["--guide-x-3", "206px"],
  ["--guide-x-4", "1291px"],
  ["--guide-x-5", "1696px"],
  ["--guide-x-6", "1836px"],
  ["--guide-x-7", "1856px"],
] as const;

const horizontalGuides = [
  ["--guide-y-1", "20px"],
  ["--guide-y-2", "99px"],
  ["--guide-y-3", "132px"],
  ["--guide-y-4", "139px"],
  ["--guide-y-5", "248px"],
  ["--guide-y-6", "272px"],
  ["--guide-y-7", "409px"],
  ["--guide-y-8", "424px"],
  ["--guide-y-9", "447px"],
  ["--guide-y-10", "462px"],
  ["--guide-y-11", "762px"],
  ["--guide-y-12", "772px"],
  ["--guide-y-13", "888px"],
  ["--guide-y-14", "918px"],
  ["--guide-y-15", "949px"],
  ["--guide-y-16", "1004px"],
  ["--guide-y-17", "1038px"],
  ["--guide-y-18", "1044px"],
] as const;

export default function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden xl:block"
      aria-hidden="true"
    >
      {verticalGuides.map(([guide, fallback], index) => (
        <div
          key={guide}
          className="fixed top-0 h-screen w-px bg-cyan-400/80 shadow-[0_0_0_1px_rgba(34,211,238,0.18)]"
          style={{ left: `var(${guide}, ${fallback})` }}
        >
          <span className="absolute left-1 top-1 rounded-sm bg-cyan-300/90 px-1 font-mono text-[10px] leading-4 text-black">
            x-{index + 1}
          </span>
        </div>
      ))}

      {horizontalGuides.map(([guide, fallback], index) => (
        <div
          key={guide}
          className="fixed left-0 h-px w-screen bg-cyan-300/75 shadow-[0_0_0_1px_rgba(103,232,249,0.14)]"
          style={{ top: `var(${guide}, ${fallback})` }}
        >
          <span className="absolute left-1 top-1 rounded-sm bg-cyan-300/90 px-1 font-mono text-[10px] leading-4 text-black">
            y-{index + 1}
          </span>
        </div>
      ))}
    </div>
  );
}
