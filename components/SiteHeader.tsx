"use client";

import { useEffect, useState } from "react";

const navItems = [
  { href: "#about", label: "info", number: "01", sectionId: "about" },
  { href: "#work", label: "work", number: "02", sectionId: "work" },
  { href: "#archive", label: "archive", number: "03", sectionId: "archive" },
  { href: "#contact", label: "contact", number: "04", sectionId: "contact" },
] as const;

type ProgressMap = Record<(typeof navItems)[number]["sectionId"], number>;

const initialProgress: ProgressMap = {
  about: 0,
  work: 0,
  archive: 0,
  contact: 0,
};

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
        element: document.getElementById(item.sectionId),
      }))
      .filter((item): item is { sectionId: keyof ProgressMap; element: HTMLElement } => Boolean(item.element));

    let frameId: number | null = null;

    const updateHeaderState = () => {
      frameId = null;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const marker = scrollY + viewportHeight * 0.36;
      const nextProgress = { ...initialProgress };

      progressSections.forEach(({ sectionId, element }) => {
        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const sectionHeight = Math.max(rect.height, 1);
        const sectionBottom = sectionTop + sectionHeight;
        nextProgress[sectionId] = clamp((marker - sectionTop) / sectionHeight, 0, 1);

        if (sectionBottom <= marker) {
          nextProgress[sectionId] = 1;
        }
      });

      setSectionProgress((currentProgress) => {
        const hasChanged = (Object.keys(nextProgress) as Array<keyof ProgressMap>).some(
          (key) => Math.abs(currentProgress[key] - nextProgress[key]) > 0.002,
        );

        return hasChanged ? nextProgress : currentProgress;
      });

      const archiveProgress = nextProgress.archive ?? 0;
      setShowHeaderFade(archiveProgress > 0 && archiveProgress < 1);

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
        className={`pointer-events-none fixed inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(248,243,236,0.82)_0%,rgba(248,243,236,0.64)_28%,rgba(248,243,236,0.34)_58%,rgba(248,243,236,0.12)_80%,rgba(248,243,236,0)_100%)] transition-opacity duration-500 ease-out sm:h-44 lg:h-52 ${
          showHeaderFade ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div className="layout-shell flex flex-col gap-3 py-4 sm:gap-4 sm:py-5 md:flex-row md:items-start md:justify-between md:gap-6 lg:min-h-[120px] lg:py-8">
        <nav
          className={`type-meta -ml-10 text-[0.74rem] transition-colors duration-300 sm:-ml-12 sm:text-[0.8rem] lg:-ml-16 lg:text-[0.86rem] ${navColor}`}
        >
          <div className="flex flex-col items-start gap-y-2 md:max-w-[60vw] lg:max-w-none">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`group relative flex cursor-pointer items-center gap-2 transition-all duration-300 ease-out hover:translate-x-1 sm:gap-3 ${linkColor}`}
              >
                <span className={`font-semibold transition-colors duration-300 ${boxNumberColor}`}>
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
                  <span className="relative z-10 text-[0.78rem] font-semibold tracking-[0.02em] lg:text-[0.84rem]">
                    {item.label}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-full self-end text-right md:ml-auto md:w-fit md:self-start">
          <div
            className={`type-meta flex items-start justify-end gap-5 text-[0.74rem] transition-colors duration-300 sm:gap-7 sm:text-[0.8rem] lg:gap-10 lg:text-[0.86rem] ${navColor}`}
          >
            <div className="w-[min(31rem,30vw)] space-y-1 pl-0 text-left">
              <div className={`text-[0.9rem] font-semibold tracking-[0.03em] normal-case transition-colors duration-300 sm:text-[0.96rem] lg:text-[1.02rem] ${strongColor}`}>
                Afia Zaman
              </div>
              <div className={`normal-case tracking-[0.03em] transition-colors duration-300 ${metaColor}`}>
                Graphic Designer
              </div>
            </div>
            <div className="space-y-1 text-right">
              <div
                className={`text-[0.9rem] font-semibold tracking-[0.03em] tabular-nums transition-colors duration-300 sm:text-[0.96rem] lg:text-[1.02rem] ${strongColor}`}
                suppressHydrationWarning
              >
                {currentTime}
              </div>
              <div className={`transition-colors duration-300 ${metaColor}`}>04.05.2026</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
