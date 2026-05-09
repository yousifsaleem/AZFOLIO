"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const greetings = ["হ্যালো", "Hello", "Hola", "Bonjour", "مرحبا", "こんにちは"];
const LOAD_DURATION = 6;
const GREETING_INTERVAL = 1;
const GREETING_SWITCH = 0.35;
const EXIT_PAUSE = 0.3;
const EXIT_DURATION = 0.9;

export default function Loader() {
  const [isComplete, setIsComplete] = useState(false);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isGreetingVisible, setIsGreetingVisible] = useState(true);

  const rootRef = useRef<HTMLDivElement>(null);
  const snakeRef = useRef<SVGPathElement>(null);
  const counterRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (greetingIndex >= greetings.length - 1) {
      return;
    }

    const holdTimer = window.setTimeout(() => {
      setIsGreetingVisible(false);

      const switchTimer = window.setTimeout(() => {
        setGreetingIndex((current) => Math.min(current + 1, greetings.length - 1));
        setIsGreetingVisible(true);
      }, GREETING_SWITCH * 1000);

      return () => window.clearTimeout(switchTimer);
    }, GREETING_INTERVAL * 1000);

    return () => {
      window.clearTimeout(holdTimer);
    };
  }, [greetingIndex]);

  useEffect(() => {
    const root = rootRef.current;
    const snake = snakeRef.current;
    const counter = counterRef.current;

    if (!root || !snake || !counter) {
      setIsComplete(true);
      return;
    }

    const ctx = gsap.context(() => {
      const progress = { value: 0 };
      const pathLength = snake.getTotalLength();

      gsap.set(root, { yPercent: 0, autoAlpha: 1 });
      gsap.set(snake, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });
      counter.textContent = "0%";

      const master = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
        },
      });

      master.to(
        progress,
        {
          value: 100,
          duration: LOAD_DURATION,
          ease: "none",
          onUpdate: () => {
            counter.textContent = `${Math.round(progress.value)}%`;
          },
        },
        0,
      );

      master.to(
        snake,
        {
          strokeDashoffset: 0,
          duration: LOAD_DURATION,
          ease: "none",
        },
        0,
      );

      master
        .to({}, { duration: EXIT_PAUSE })
        .to(root, {
          yPercent: -100,
          duration: EXIT_DURATION,
          ease: "power4.inOut",
        })
        .set(root, { autoAlpha: 0 });
    }, root);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`fixed inset-0 z-[60] bg-[var(--color-text)] text-[var(--color-card)] ${isComplete ? "pointer-events-none" : ""}`}
      aria-hidden={isComplete}
    >
      <div className="relative flex h-full items-center justify-center px-4 sm:px-8 lg:px-12">
        <div className="flex w-full flex-col items-center text-center">
          <div className="h-14 sm:h-20 lg:h-24">
            <p
              className={`flex h-14 items-center justify-center px-2 text-[clamp(1.65rem,7vw,5rem)] leading-none tracking-[-0.05em] text-[rgba(253,250,246,0.72)] transition-all duration-300 ease-out sm:h-20 lg:h-24 ${
                isGreetingVisible ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
              }`}
            >
              {greetings[greetingIndex]}
            </p>
          </div>

          <div className="mt-6 w-[82vw] max-w-[520px] sm:mt-8 sm:w-[68vw] lg:w-[40vw]">
            <svg
              viewBox="0 0 1200 140"
              className="h-14 w-full text-[var(--color-card)] sm:h-16 lg:h-20"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M12 82 C138 46, 256 102, 390 74 S652 40, 790 64 S1018 96, 1188 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="opacity-18"
                strokeLinecap="round"
              />
              <path
                ref={snakeRef}
                d="M12 82 C138 46, 256 102, 390 74 S652 40, 790 64 S1018 96, 1188 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="opacity-90"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        <p
          ref={counterRef}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[clamp(0.95rem,3.8vw,2rem)] leading-none tracking-[-0.04em] text-[var(--color-card)] sm:bottom-8 sm:left-auto sm:right-8 sm:translate-x-0 lg:bottom-10 lg:right-12"
        >
          0%
        </p>
      </div>
    </div>
  );
}
