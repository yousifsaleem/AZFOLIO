"use client";

import { useEffect, useState } from "react";

export default function SiteHeader() {
  const [headerTheme, setHeaderTheme] = useState<"light" | "dark">("light");
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

  const isDarkTheme = headerTheme === "dark";
  const navColor = isDarkTheme ? "text-[#f7f1ea]" : "text-[var(--color-text-muted)]";
  const linkColor = isDarkTheme ? "text-[#f7f1ea]" : "text-[var(--color-text)]";
  const metaColor = isDarkTheme ? "text-[#f7f1ea]/72" : "text-[var(--color-text-muted)]";
  const strongColor = isDarkTheme ? "text-[#fdfaf6]" : "text-[var(--color-text)]";

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-transparent">
      <div className="mx-auto flex max-w-[1600px] items-start justify-between gap-6 px-6 py-5 sm:px-8 lg:relative lg:min-h-[120px] lg:px-0 lg:py-8">
        <nav className={`type-meta transition-colors duration-300 ${navColor} lg:absolute lg:left-[-4rem] lg:top-8`}>
          <div className="flex flex-wrap gap-x-4 gap-y-2 sm:gap-x-5 lg:block lg:space-y-4">
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

        <div className="max-w-[170px] text-right sm:max-w-[220px] lg:absolute lg:right-[-4rem] lg:top-8 lg:max-w-[360px]">
          <div className={`type-meta grid grid-cols-1 gap-y-3 transition-colors duration-300 sm:grid-cols-[auto_auto] sm:gap-x-6 lg:gap-x-8 ${navColor}`}>
            <div className="space-y-1 text-right sm:text-left lg:text-left">
              <div className={`text-[0.85rem] font-semibold tracking-[0.12em] normal-case transition-colors duration-300 sm:text-[1rem] ${strongColor}`}>
                Afia Zaman
              </div>
              <div className={`transition-colors duration-300 ${metaColor}`}>Graphic Designer</div>
            </div>
            <div className="space-y-1 text-right">
              <div
                className={`text-[0.85rem] font-semibold tracking-[0.12em] tabular-nums transition-colors duration-300 sm:text-[1rem] ${strongColor}`}
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
