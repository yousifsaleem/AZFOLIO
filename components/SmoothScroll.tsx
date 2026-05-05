"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SmoothScrollProps = {
  children: ReactNode;
};

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
    });

    const update = (time: number) => {
      lenis.raf(time);
      frameRef.current = window.requestAnimationFrame(update);
    };

    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    frameRef.current = window.requestAnimationFrame(update);
    ScrollTrigger.refresh();

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
