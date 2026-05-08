"use client";

import { useEffect, useRef } from "react";

const CURSOR_SIZE = 22;
const FOLLOW_EASE = 0.16;
const SCALE_EASE = 0.18;
const OPACITY_EASE = 0.24;
const DEFAULT_COLOR = "var(--cursor-default)";
const LIGHT_COLOR = "var(--cursor-light)";
const FALLBACK_ACCENT_COLOR = "var(--site-accent-1)";
const CLICKABLE_SELECTOR = 'a, button, [role="button"], .cursor-hover';

function getCursorContext(target: Element | null) {
  const disabled = target?.closest("[data-site-cursor='disabled']");

  if (disabled) {
    return {
      isDisabled: true,
      color: DEFAULT_COLOR,
      isClickable: false,
    };
  }

  const colorElement = target?.closest<HTMLElement>("[data-cursor-color]");
  const themeElement = target?.closest<HTMLElement>("[data-cursor-theme], [data-header-theme]");
  const cursorColor = colorElement?.dataset.cursorColor;
  const theme = themeElement?.dataset.cursorTheme ?? themeElement?.dataset.headerTheme;
  const isClickable = Boolean(target?.closest(CLICKABLE_SELECTOR));

    return {
      isDisabled: false,
    color: cursorColor || (theme === "dark" ? LIGHT_COLOR : DEFAULT_COLOR),
      isClickable,
    };
}

export default function SiteCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isEnabledRef = useRef(false);
  const isVisibleRef = useRef(false);
  const targetXRef = useRef(0);
  const targetYRef = useRef(0);
  const cursorXRef = useRef(0);
  const cursorYRef = useRef(0);
  const scaleRef = useRef(1);
  const targetScaleRef = useRef(1);
  const opacityRef = useRef(0);
  const targetOpacityRef = useRef(0);
  const isPressedRef = useRef(false);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const styleElement = document.createElement("style");
    styleElement.textContent = `
      .site-cursor-active,
      .site-cursor-active * {
        cursor: none !important;
      }

      .site-cursor-shell[data-cursor-state='hidden'] {
        transition-duration: 180ms;
      }

      .site-cursor-shell[data-cursor-state='hover'] .site-cursor-fill,
      .site-cursor-shell[data-cursor-state='pressed'] .site-cursor-fill {
        opacity: 0;
      }

      .site-cursor-shell[data-cursor-state='hover'] .site-cursor-ring,
      .site-cursor-shell[data-cursor-state='pressed'] .site-cursor-ring {
        opacity: 1;
        transform: scale(1);
      }

      .site-cursor-shell[data-cursor-state='pressed'] .site-cursor-ring {
        background: color-mix(in srgb, var(--site-cursor-color, var(--cursor-default)) 12%, transparent);
      }
    `;
    document.head.appendChild(styleElement);

    const setEnabled = (isEnabled: boolean) => {
      isEnabledRef.current = isEnabled;
      document.documentElement.classList.toggle("site-cursor-active", isEnabled);

      if (!isEnabled) {
        targetOpacityRef.current = 0;
      }
    };

    const updateCapability = () => {
      setEnabled(mediaQuery.matches);
    };

    const updateContext = (clientX: number, clientY: number) => {
      if (!isEnabledRef.current) {
        return;
      }

      const target = document.elementFromPoint(clientX, clientY);
      const context = getCursorContext(target);
      const state = context.isDisabled ? "hidden" : isPressedRef.current ? "pressed" : context.isClickable ? "hover" : "default";

      targetOpacityRef.current = context.isDisabled || !isVisibleRef.current ? 0 : 1;
      targetScaleRef.current = context.isDisabled
        ? 0.54
        : isPressedRef.current
          ? context.isClickable
            ? 1.12
            : 0.82
          : context.isClickable
            ? 1.42
            : 1;
      cursor.style.setProperty("--site-cursor-color", context.color || FALLBACK_ACCENT_COLOR);
      cursor.dataset.cursorState = state;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (!isEnabledRef.current || event.pointerType !== "mouse") {
        return;
      }

      targetXRef.current = event.clientX;
      targetYRef.current = event.clientY;

      if (!isVisibleRef.current) {
        cursorXRef.current = event.clientX;
        cursorYRef.current = event.clientY;
        isVisibleRef.current = true;
      }

      updateContext(event.clientX, event.clientY);
    };

    const handlePointerLeave = () => {
      isVisibleRef.current = false;
      targetOpacityRef.current = 0;
      targetScaleRef.current = 0.72;
      cursor.dataset.cursorState = "hidden";
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!isEnabledRef.current || event.pointerType !== "mouse") {
        return;
      }

      isPressedRef.current = true;
      updateContext(event.clientX, event.clientY);
    };

    const handlePointerUp = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") {
        return;
      }

      isPressedRef.current = false;
      updateContext(event.clientX, event.clientY);
    };

    const tick = () => {
      cursorXRef.current += (targetXRef.current - cursorXRef.current) * FOLLOW_EASE;
      cursorYRef.current += (targetYRef.current - cursorYRef.current) * FOLLOW_EASE;
      scaleRef.current += (targetScaleRef.current - scaleRef.current) * SCALE_EASE;
      opacityRef.current += (targetOpacityRef.current - opacityRef.current) * OPACITY_EASE;

      cursor.style.opacity = opacityRef.current.toFixed(3);
      cursor.style.transform = `translate3d(${cursorXRef.current - CURSOR_SIZE / 2}px, ${
        cursorYRef.current - CURSOR_SIZE / 2
      }px, 0) scale(${scaleRef.current})`;

      animationFrameRef.current = window.requestAnimationFrame(tick);
    };

    updateCapability();
    animationFrameRef.current = window.requestAnimationFrame(tick);
    mediaQuery.addEventListener("change", updateCapability);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);
    window.addEventListener("blur", handlePointerLeave);
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      setEnabled(false);
      mediaQuery.removeEventListener("change", updateCapability);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
      window.removeEventListener("blur", handlePointerLeave);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      styleElement.remove();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="site-cursor-shell pointer-events-none fixed left-0 top-0 z-[90] hidden h-[22px] w-[22px] opacity-0 transition-[background-color,border-color,box-shadow] duration-300 ease-out will-change-transform lg:block"
      aria-hidden="true"
    >
      <div className="site-cursor-ring absolute inset-0 rounded-full border border-[var(--site-cursor-color,var(--cursor-default))] opacity-0 shadow-[0_0_22px_rgba(255,248,242,0.14)] transition-[background-color,border-color,opacity,transform] duration-300 ease-out" />
      <div className="site-cursor-fill absolute inset-[3px] rounded-full bg-[var(--site-cursor-color,var(--cursor-default))] shadow-[0_8px_22px_rgba(31,27,25,0.12)] transition-[background-color,opacity] duration-300 ease-out" />
    </div>
  );
}
