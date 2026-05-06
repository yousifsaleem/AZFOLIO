"use client";

import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";

import { PAGE_TRANSITION_EVENT } from "./TransitionOverlay";

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: ReactNode;
};

function isModifiedEvent(event: MouseEvent<HTMLAnchorElement>) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || event.button !== 0;
}

function shouldUseTransition(href: string, target?: string) {
  if (!href || target === "_blank") {
    return false;
  }

  if (
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("http://") ||
    href.startsWith("https://")
  ) {
    return false;
  }

  if (!href.startsWith("/")) {
    return false;
  }

  const nextUrl = new URL(href, window.location.origin);
  const currentUrl = new URL(window.location.href);
  const isSameLocation =
    nextUrl.pathname === currentUrl.pathname &&
    nextUrl.search === currentUrl.search &&
    nextUrl.hash === currentUrl.hash;

  return !isSameLocation;
}

export default function TransitionLink({
  href,
  children,
  onClick,
  target,
  download,
  ...props
}: TransitionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);

    if (
      event.defaultPrevented ||
      download ||
      isModifiedEvent(event) ||
      !shouldUseTransition(href, target)
    ) {
      return;
    }

    event.preventDefault();

    window.dispatchEvent(
      new CustomEvent(PAGE_TRANSITION_EVENT, {
        detail: {
          href,
        },
      }),
    );
  };

  return (
    <a href={href} target={target} download={download} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
