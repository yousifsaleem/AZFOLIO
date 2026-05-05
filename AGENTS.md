# AGENTS.md

## Project

This is an experimental graphic design portfolio for Afia Zaman.

The site uses:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- GSAP
- ScrollTrigger
- Lenis

Do not use the old Next.js Pages Router.

## Coding rules

- Use TypeScript for all React components.
- Use functional React components.
- Use Tailwind CSS for styling.
- Keep components modular and reusable.
- Prefer clean, readable code over overly clever code.
- Use semantic HTML where possible.
- Use accessible buttons and links.
- Avoid inline styles unless required for dynamic animation values.
- Do not use Framer Motion unless specifically requested.
- Use GSAP for complex animation.
- Use ScrollTrigger for scroll-based animation.
- Clean up GSAP animations using `gsap.context()` and `ctx.revert()`.
- Mark animated client components with `"use client"`.

## Folder structure

Use this structure:

```txt
components/
  Loader.tsx
  Hero.tsx
  SloganTransition.tsx
  FeaturedWork.tsx
  Archive.tsx
  About.tsx
  Contact.tsx
  SmoothScroll.tsx
  TransitionOverlay.tsx

data/
  projects.ts

public/
  images/
  fonts/
  logos/