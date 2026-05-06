"use client";

import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");
  const [showHeaderFade, setShowHeaderFade] = useState(false);
  const [currentTime, setCurrentTime] = useState("00:00:00");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-header-theme]");

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (activeEntry) {
          const nextTheme = activeEntry.target.getAttribute("data-header-theme");
          setHeaderTheme(nextTheme === "dark" ? "dark" : "light");
        }
      },
      {
        root: null,
        rootMargin: "-15% 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const archiveSection = document.querySelector<HTMLElement>("#archive");

    if (!archiveSection) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowHeaderFade(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-8% 0px -72% 0px",
        threshold: 0,
      },
    );

    observer.observe(archiveSection);

    return () => {
      observer.disconnect();
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div
        className={`pointer-events-none fixed inset-x-0 top-0 h-40 bg-[linear-gradient(180deg,rgba(248,243,236,0.82)_0%,rgba(248,243,236,0.64)_28%,rgba(248,243,236,0.34)_58%,rgba(248,243,236,0.12)_80%,rgba(248,243,236,0)_100%)] transition-opacity duration-500 ease-out sm:h-44 lg:h-52 ${
          showHeaderFade ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 md:flex-row md:items-start md:justify-between md:gap-6 md:px-8 lg:relative lg:min-h-[120px] lg:px-0 lg:py-8">
        <nav className={`type-meta text-[0.68rem] transition-colors duration-300 sm:text-[0.75rem] ${navColor} lg:absolute lg:left-[-4rem] lg:top-8`}>
          <div className="flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4 md:max-w-[60vw] lg:block lg:max-w-none lg:space-y-4">
            {[
              { href: "#about", label: "Info", number: "01" },
              { href: "#work", label: "Work", number: "02" },
              { href: "#archive", label: "Archive", number: "03" },
              { href: "#contact", label: "Contact", number: "04" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`group flex cursor-pointer items-center gap-2 transition-all duration-300 ease-out hover:translate-x-1 hover:text-[var(--color-text-muted)] sm:gap-3 ${linkColor}`}
              >
                <span className="font-semibold">{item.number}</span>
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </nav>

        <div className="max-w-full self-end text-right sm:max-w-[220px] md:max-w-[280px] lg:absolute lg:right-[-4rem] lg:top-8 lg:max-w-[360px]">
          <div className={`type-meta grid grid-cols-[auto_auto] gap-x-4 gap-y-2 text-[0.68rem] transition-colors duration-300 sm:gap-x-6 sm:text-[0.75rem] lg:gap-x-8 ${navColor}`}>
            <div className="space-y-1 text-left">
              <div className={`text-[0.8rem] font-semibold tracking-[0.12em] normal-case transition-colors duration-300 sm:text-[0.9rem] lg:text-[1rem] ${strongColor}`}>
                Afia Zaman
              </div>
              <div className={`transition-colors duration-300 ${metaColor}`}>Graphic Designer</div>
            </div>
            <div className="space-y-1 text-right">
              <div
                className={`text-[0.8rem] font-semibold tracking-[0.12em] tabular-nums transition-colors duration-300 sm:text-[0.9rem] lg:text-[1rem] ${strongColor}`}
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
