"use client";

import { useEffect, useState } from "react";

const navItems = [
  { id: "work", href: "#work", label: "work", number: "01", sectionId: "work", scrollTargetId: "work" },
  { id: "archive", href: "#archive", label: "archive", number: "02", sectionId: "archive", scrollTargetId: "archive" },
  { id: "info", href: "#about", label: "info", number: "03", sectionId: "info", scrollTargetId: "about" },
  { id: "about", href: "#about", label: "about", number: "04", sectionId: "about", scrollTargetId: "about" },
] as const;

type NavItem = (typeof navItems)[number];
type ProgressMap = Record<NavItem["sectionId"], number>;

const initialProgress: ProgressMap = {
  work: 0,
  archive: 0,
  info: 0,
  about: 0,
};

const readableFadeSections = new Set<keyof ProgressMap>(["about", "archive", "info"]);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function SiteHeader() {
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");
  const [showHeaderFade, setShowHeaderFade] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");
  const [sectionProgress, setSectionProgress] = useState<ProgressMap>(initialProgress);

  useEffect(() => {
    const themedSections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-header-theme]"),
    );

    if (!themedSections.length) {
      return;
    }

    const progressSections = navItems
      .map((item) => ({
        sectionId: item.sectionId,
        element: document.getElementById(item.scrollTargetId),
      }))
      .filter((item): item is { sectionId: keyof ProgressMap; element: HTMLElement } => Boolean(item.element));

    let frameId: number | null = null;

    const updateHeaderState = () => {
      frameId = null;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const marker = scrollY + viewportHeight * 0.36;
      const headerReadabilityMarker = scrollY + viewportHeight * 0.18;
      const nextProgress = { ...initialProgress };
      let activeProgressSection: keyof ProgressMap | null = null;

      progressSections.forEach(({ sectionId, element }) => {
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = Math.max(rect.height, 1);
        const sectionBottom = sectionTop + sectionHeight;
        nextProgress[sectionId] = clamp((marker - sectionTop) / sectionHeight, 0, 1);

        if (sectionTop <= headerReadabilityMarker && sectionBottom > headerReadabilityMarker) {
          activeProgressSection = sectionId;
        }
      });

      setSectionProgress((currentProgress) => {
        const hasChanged = (Object.keys(nextProgress) as Array<keyof ProgressMap>).some(
          (key) => Math.abs(currentProgress[key] - nextProgress[key]) > 0.002,
        );

        return hasChanged ? nextProgress : currentProgress;
      });

      setShowHeaderFade(Boolean(activeProgressSection && readableFadeSections.has(activeProgressSection)));

      const activeThemedSection = themedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= viewportHeight * 0.2 && rect.bottom > viewportHeight * 0.2;
      });

      if (activeThemedSection) {
        const nextTheme = activeThemedSection.getAttribute("data-header-theme");
        setHeaderTheme(nextTheme === "dark" ? "dark" : "light");
      }
    };

    const requestUpdate = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateHeaderState);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  useEffect(() => {
    const formatTime = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    const updateTime = () => {
      setCurrentTime(formatTime());
    };

    updateTime();
    const intervalId = window.setInterval(updateTime, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const isDarkTheme = headerTheme === "dark" && !showHeaderFade;
  const navColor = isDarkTheme ? "text-[#f7f1ea]" : "text-[var(--color-text-muted)]";
  const linkColor = isDarkTheme ? "text-[#f7f1ea]" : "text-[var(--color-text)]";
  const metaColor = isDarkTheme ? "text-[#f7f1ea]/72" : "text-[var(--color-text-muted)]";
  const strongColor = isDarkTheme ? "text-[#fdfaf6]" : "text-[var(--color-text)]";
  const boxFillColor = isDarkTheme ? "bg-[#f7f1ea]/18" : "bg-[var(--color-accent-blue)]/75";
  const boxNumberColor = isDarkTheme ? "text-[#f7f1ea]/62" : "text-[var(--color-text-muted)]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 z-0 h-56 bg-[linear-gradient(180deg,rgba(251,247,242,0.86)_0%,rgba(251,247,242,0.68)_28%,rgba(248,243,236,0.42)_58%,rgba(248,243,236,0.16)_82%,rgba(248,243,236,0)_100%)] transition-opacity duration-500 ease-out sm:h-60 lg:h-64 ${
          showHeaderFade ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div className="layout-shell relative z-10 flex flex-col gap-3 py-4 sm:gap-4 sm:py-5 md:flex-row md:items-start md:justify-between md:gap-6 lg:min-h-[120px] lg:py-8">
        <nav
          className={`transition-colors duration-300 ${navColor}`}
          style={{ marginLeft: "var(--site-nav-offset)" }}
        >
          <div className="flex flex-col items-start gap-y-2 md:max-w-[60vw] lg:max-w-none">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className={`group relative flex cursor-pointer items-center gap-2 transition-all duration-300 ease-out hover:translate-x-1 sm:gap-3 ${linkColor}`}
              >
                <span className={`type-small transition-colors duration-300 ${boxNumberColor}`}>
                  {item.number}
                </span>
                <span
                  className="relative inline-flex min-w-[6.2rem] overflow-hidden rounded-[0.5rem] px-2.5 py-1.5"
                >
                  <span
                    className={`absolute inset-y-[1px] left-0 rounded-[0.4rem] transition-[width] duration-150 ease-out ${boxFillColor}`}
                    style={{ width: `${(sectionProgress[item.sectionId] ?? 0) * 100}%` }}
                    aria-hidden="true"
                  />
                  <span className="type-regular relative z-10">
                    {item.label}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div
          className={`absolute hidden text-left transition-colors duration-300 xl:block ${navColor}`}
          style={{
            left: "calc(var(--layout-text-x) - max(0px, (100vw - 1600px) / 2) + 0.5rem)",
            top: "var(--layout-header-baseline-y)",
          }}
        >
          <div className={`type-regular transition-colors duration-300 ${strongColor}`}>
            Afia Zaman
          </div>
          <div className={`type-regular transition-colors duration-300 ${metaColor}`}>
            Graphic Designer
          </div>
        </div>

        <div className="max-w-full self-end text-right md:ml-auto md:w-fit md:self-start">
          <div
            className={`flex items-start justify-end gap-5 transition-colors duration-300 sm:gap-7 lg:gap-10 ${navColor}`}
          >
            <div className="space-y-1 text-left xl:hidden">
              <div className={`type-regular transition-colors duration-300 ${strongColor}`}>
                Afia Zaman
              </div>
              <div className={`type-regular transition-colors duration-300 ${metaColor}`}>
                Graphic Designer
              </div>
            </div>
            <div className="w-[var(--site-time-column-width)] space-y-1 text-left">
              <div
                className={`type-regular tabular-nums transition-colors duration-300 ${strongColor}`}
                suppressHydrationWarning
              >
                {currentTime}
              </div>
              <div className={`type-regular transition-colors duration-300 ${metaColor}`}>04.05.2026</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
