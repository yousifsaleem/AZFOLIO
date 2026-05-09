"use client";

import { useEffect, useRef } from "react";
const contactLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/toktokelaal",
    external: true,
    icon: "orbit",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/afiaxaman?originalSubdomain=uk",
    external: true,
    icon: "grid",
  },
  {
    label: "Email",
    href: "mailto:afiazaman6@gmail.com",
    icon: "envelope",
  },
  {
    label: "Phone",
    href: "tel:+447360419460",
    icon: "receiver",
  },
];

const contactBalls = [
  {
    motif: "monogramA",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32 xl:h-36 xl:w-36",
  },
  {
    motif: "smile",
    accent: "bg-[var(--color-card)]",
    size: "h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 xl:h-40 xl:w-40",
  },
  {
    motif: "flower",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-20 w-20 sm:h-28 sm:w-28 lg:h-40 lg:w-40",
  },
  {
    motif: "monogramZ",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
  {
    motif: "spark",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-11 w-11 sm:h-16 sm:w-16 lg:h-24 lg:w-24",
  },
  {
    motif: "orbit",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-16 w-16 sm:h-24 sm:w-24 lg:h-36 lg:w-36 xl:h-40 xl:w-40",
  },
  {
    motif: "ribbon",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-20 w-20 sm:h-28 sm:w-28 lg:h-40 lg:w-40",
  },
  {
    motif: "petal",
    accent: "bg-[var(--color-card)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
  {
    motif: "wave",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-20 w-20 sm:h-28 sm:w-28 lg:h-40 lg:w-40",
  },
  {
    motif: "starburst",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
  {
    motif: "monogramA",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28",
  },
  {
    motif: "flower",
    accent: "bg-[var(--color-card)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
  {
    motif: "orbit",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28",
  },
  {
    motif: "wave",
    accent: "bg-[var(--color-card)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
  {
    motif: "spark",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-11 w-11 sm:h-16 sm:w-16 lg:h-24 lg:w-24",
  },
  {
    motif: "petal",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28",
  },
  {
    motif: "smile",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-11 w-11 sm:h-16 sm:w-16 lg:h-24 lg:w-24",
  },
  {
    motif: "ribbon",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28",
  },
  {
    motif: "starburst",
    accent: "bg-[var(--color-card)]",
    size: "h-11 w-11 sm:h-16 sm:w-16 lg:h-24 lg:w-24",
  },
  {
    motif: "monogramZ",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28",
  },
  {
    motif: "flower",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
  {
    motif: "spark",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-11 w-11 sm:h-16 sm:w-16 lg:h-24 lg:w-24",
  },
  {
    motif: "orbit",
    accent: "bg-[var(--color-card)]",
    size: "h-12 w-12 sm:h-16 sm:w-16 lg:h-28 lg:w-28",
  },
  {
    motif: "petal",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-14 w-14 sm:h-20 sm:w-20 lg:h-32 lg:w-32",
  },
];

function LinkIcon({ type }: { type: string }) {
  const stroke = "currentColor";

  if (type === "grid") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true">
        <rect x="4.5" y="4.5" width="15" height="15" rx="4" fill="none" stroke={stroke} strokeWidth="1.5" />
        <path d="M8 12h8M12 8v8" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "envelope") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true">
        <rect x="4.5" y="6.5" width="15" height="11" rx="2.5" fill="none" stroke={stroke} strokeWidth="1.5" />
        <path d="M6.5 8.5 12 13l5.5-4.5" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "receiver") {
    return (
      <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true">
        <path
          d="M8.2 5.8c.5-.5 1.2-.6 1.8-.2l1.4 1c.6.4.8 1.1.5 1.8l-.7 1.4c1.2 2 2.8 3.6 4.8 4.8l1.4-.7c.7-.3 1.4-.1 1.8.5l1 1.4c.4.6.3 1.3-.2 1.8l-1 1c-.6.6-1.4.8-2.2.6-2.8-.8-5.4-2.4-7.7-4.7S5.9 11.2 5.1 8.4c-.2-.8 0-1.6.6-2.2l1-1Z"
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true">
      <circle cx="12" cy="12" r="7.5" fill="none" stroke={stroke} strokeWidth="1.5" />
      <circle cx="12" cy="12" r="2.5" fill="none" stroke={stroke} strokeWidth="1.5" />
      <path d="M12 4.5v3M12 16.5v3M4.5 12h3M16.5 12h3" fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HoverArrow() {
  return (
    <svg viewBox="0 0 32 18" className="h-4 w-8 lg:h-[1.15rem] lg:w-9" aria-hidden="true">
      <path d="M1 8h22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="m17 2 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BallGraphic({ motif }: { motif: string }) {
  if (motif === "monogramA") {
    return (
      <svg viewBox="0 0 100 100" className="h-[48%] w-[48%]" aria-hidden="true">
        <path d="M24 74 50 20 76 74" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
        <path d="M35 54h30" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  if (motif === "monogramZ") {
    return (
      <svg viewBox="0 0 100 100" className="h-[48%] w-[48%]" aria-hidden="true">
        <path d="M24 28h52L30 72h46" fill="none" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    );
  }

  if (motif === "smile") {
    return (
      <svg viewBox="0 0 100 100" className="h-[44%] w-[44%]" aria-hidden="true">
        <circle cx="34" cy="38" r="4.5" fill="currentColor" />
        <circle cx="66" cy="38" r="4.5" fill="currentColor" />
        <path d="M30 56c4.5 8 12 12 20 12s15.5-4 20-12" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (motif === "flower") {
    return (
      <svg viewBox="0 0 100 100" className="h-[50%] w-[50%]" aria-hidden="true">
        <circle cx="50" cy="24" r="12" fill="currentColor" />
        <circle cx="50" cy="76" r="12" fill="currentColor" />
        <circle cx="24" cy="50" r="12" fill="currentColor" />
        <circle cx="76" cy="50" r="12" fill="currentColor" />
        <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.85" />
      </svg>
    );
  }

  if (motif === "spark") {
    return (
      <svg viewBox="0 0 100 100" className="h-[44%] w-[44%]" aria-hidden="true">
        <path d="M50 16v68M16 50h68M28 28l44 44M72 28 28 72" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
      </svg>
    );
  }

  if (motif === "orbit") {
    return (
      <svg viewBox="0 0 100 100" className="h-[50%] w-[50%]" aria-hidden="true">
        <circle cx="50" cy="50" r="9" fill="currentColor" />
        <ellipse cx="50" cy="50" rx="26" ry="12" fill="none" stroke="currentColor" strokeWidth="6" />
        <ellipse cx="50" cy="50" rx="12" ry="26" fill="none" stroke="currentColor" strokeWidth="6" />
      </svg>
    );
  }

  if (motif === "ribbon") {
    return (
      <svg viewBox="0 0 100 100" className="h-[48%] w-[48%]" aria-hidden="true">
        <path
          d="M28 30c9-8 23-8 32 0 8 7 8 18 0 24-9 7-18 4-24 8-5 4-5 10 0 14 6 5 15 5 24 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (motif === "petal") {
    return (
      <svg viewBox="0 0 100 100" className="h-[46%] w-[46%]" aria-hidden="true">
        <path d="M50 18c10 9 14 18 14 28S60 65 50 72c-10-7-14-16-14-26s4-19 14-28Z" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      </svg>
    );
  }

  if (motif === "wave") {
    return (
      <svg viewBox="0 0 100 100" className="h-[42%] w-[58%]" aria-hidden="true">
        <path
          d="M12 56c10-16 22-16 32 0s22 16 32 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 100 100" className="h-[44%] w-[44%]" aria-hidden="true">
      <path d="M50 18v64M18 50h64" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ballZoneRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasReleasedBallsRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const ballZone = ballZoneRef.current;

    if (!section || !ballZone) {
      return;
    }

    type BallState = {
      element: HTMLElement;
      radius: number;
      x: number;
      y: number;
      vx: number;
      vy: number;
      angle: number;
      angularVelocity: number;
      mass: number;
    };

    const balls = Array.from(ballZone.querySelectorAll<HTMLElement>("[data-contact-ball]"));

    const measureBounds = () => {
      const rect = ballZone.getBoundingClientRect();

      return {
        width: rect.width,
        height: rect.height,
        floor: rect.height - 10,
      };
    };

    const setBallTransform = (ball: BallState) => {
      ball.element.style.transform = `translate3d(${ball.x - ball.radius}px, ${ball.y - ball.radius}px, 0) rotate(${ball.angle}deg)`;
    };

    const resetBalls = () => {
      const bounds = measureBounds();

      balls.forEach((element, index) => {
        const radius = element.offsetWidth / 2;
        const usableWidth = Math.max(bounds.width - radius * 2, 1);
        const x = radius + ((index * 97) % usableWidth);
        const y = -bounds.height - radius - (index % 5) * 54;
        const angle = index % 2 === 0 ? -24 - index * 3 : 24 + index * 3;

        element.style.opacity = "1";
        element.style.transform = `translate3d(${x - radius}px, ${y - radius}px, 0) rotate(${angle}deg)`;
      });
    };

    resetBalls();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasReleasedBallsRef.current) {
          return;
        }

        hasReleasedBallsRef.current = true;

        const bounds = measureBounds();
        const states: BallState[] = balls.map((element, index) => {
          const radius = element.offsetWidth / 2;
          const usableWidth = Math.max(bounds.width - radius * 2, 1);
          const x = radius + ((index * 131 + 37) % usableWidth);

          return {
            element,
            radius,
            x,
            y: -bounds.height - radius - (index % 6) * 48,
            vx: ((index % 5) - 2) * 0.9,
            vy: 0,
            angle: index % 2 === 0 ? -28 : 28,
            angularVelocity: ((index % 7) - 3) * 0.35,
            mass: radius * radius,
          };
        });

        let frame = 0;
        const maxFrames = 620;
        const gravity = 0.74;
        const restitution = 0.56;
        const air = 0.992;
        const floorFriction = 0.82;
        const collisionDamping = 0.92;

        const tick = () => {
          frame += 1;
          const nextBounds = measureBounds();
          let totalMovement = 0;

          states.forEach((ball) => {
            ball.vy += gravity;
            ball.vx *= air;
            ball.vy *= air;
            ball.angularVelocity *= 0.992;

            ball.x += ball.vx;
            ball.y += ball.vy;
            ball.angle += ball.angularVelocity;

            if (ball.x - ball.radius < 0) {
              ball.x = ball.radius;
              ball.vx = Math.abs(ball.vx) * restitution;
              ball.angularVelocity *= -0.5;
            }

            if (ball.x + ball.radius > nextBounds.width) {
              ball.x = nextBounds.width - ball.radius;
              ball.vx = -Math.abs(ball.vx) * restitution;
              ball.angularVelocity *= -0.5;
            }

            if (ball.y + ball.radius > nextBounds.floor) {
              ball.y = nextBounds.floor - ball.radius;
              ball.vy = -Math.abs(ball.vy) * restitution;
              ball.vx *= floorFriction;
              ball.angularVelocity += ball.vx * 0.025;

              if (Math.abs(ball.vy) < 0.65) {
                ball.vy = 0;
              }
            }
          });

          for (let i = 0; i < states.length; i += 1) {
            for (let j = i + 1; j < states.length; j += 1) {
              const a = states[i];
              const b = states[j];
              const dx = b.x - a.x;
              const dy = b.y - a.y;
              const distance = Math.hypot(dx, dy) || 1;
              const minDistance = a.radius + b.radius - 1;

              if (distance >= minDistance) {
                continue;
              }

              const nx = dx / distance;
              const ny = dy / distance;
              const overlap = minDistance - distance;
              const totalMass = a.mass + b.mass;
              const aShare = b.mass / totalMass;
              const bShare = a.mass / totalMass;

              a.x -= nx * overlap * aShare;
              a.y -= ny * overlap * aShare;
              b.x += nx * overlap * bShare;
              b.y += ny * overlap * bShare;

              const relativeVelocityX = b.vx - a.vx;
              const relativeVelocityY = b.vy - a.vy;
              const velocityAlongNormal = relativeVelocityX * nx + relativeVelocityY * ny;

              if (velocityAlongNormal > 0) {
                continue;
              }

              const impulse = (-(1 + restitution) * velocityAlongNormal) / (1 / a.mass + 1 / b.mass);
              const impulseX = impulse * nx * collisionDamping;
              const impulseY = impulse * ny * collisionDamping;

              a.vx -= impulseX / a.mass;
              a.vy -= impulseY / a.mass;
              b.vx += impulseX / b.mass;
              b.vy += impulseY / b.mass;

              a.angularVelocity -= impulseX * 0.0009;
              b.angularVelocity += impulseX * 0.0009;
            }
          }

          states.forEach((ball) => {
            if (ball.y + ball.radius > nextBounds.floor) {
              ball.y = nextBounds.floor - ball.radius;
            }

            totalMovement += Math.abs(ball.vx) + Math.abs(ball.vy) + Math.abs(ball.angularVelocity);
            setBallTransform(ball);
          });

          if (frame < maxFrames && totalMovement > 0.22) {
            animationFrameRef.current = window.requestAnimationFrame(tick);
          } else {
            animationFrameRef.current = null;
          }
        };

        animationFrameRef.current = window.requestAnimationFrame(tick);
      },
      {
        root: null,
        rootMargin: "0px 0px -18% 0px",
        threshold: 0.22,
      },
    );

    observer.observe(section);

    const handleResize = () => {
      if (!hasReleasedBallsRef.current) {
        resetBalls();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-header-theme="light"
      className="relative overflow-hidden bg-[var(--color-surface)] text-[var(--color-text)]"
    >
      <div className="layout-shell flex min-h-screen flex-col justify-between py-8 lg:py-10">
        <div className="relative z-10 grid gap-12 pt-28 xl:grid-cols-[minmax(0,1.05fr)_minmax(180px,220px)_minmax(240px,0.62fr)] xl:items-start xl:gap-10 xl:pt-36 2xl:gap-16">
          <div className="max-w-4xl xl:max-w-[min(31rem,38vw)] 2xl:max-w-[34rem]">
            <h2 className="text-[clamp(4.25rem,10.6vw,8.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.09em] text-[var(--color-text)]">
              LET&apos;S
              <br />
              COLLAB
            </h2>
            <p className="type-meta mt-5 text-[var(--color-text-muted)]">PORTFOLIO BY AFIA</p>
          </div>

          <div className="w-full max-w-xs xl:absolute xl:left-[calc(var(--site-identity-inset)+2.75rem)] xl:top-36 xl:z-10 xl:w-[min(18rem,22vw)] xl:max-w-none xl:pt-2 2xl:top-40">
            <div className="group/list mt-2 flex flex-col gap-1">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group/item relative flex items-center py-2.5 pl-0 text-[var(--color-text-muted)] transition-colors duration-300 ease-out group-hover/list:text-[rgba(117,104,95,0.44)] hover:text-[var(--color-text)] group-hover/list:hover:text-[var(--color-text)]"
                >
                  <span className="absolute left-[-4.5rem] inline-flex h-6 w-6 items-center justify-center text-[var(--color-text-muted)] transition-colors duration-300 ease-out group-hover/item:text-[var(--color-text)] lg:left-[-5rem] lg:h-7 lg:w-7">
                    <LinkIcon type={link.icon} />
                  </span>
                  <span className="absolute left-[-2.4rem] inline-flex w-8 -translate-x-3 items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100 lg:left-[-2.55rem] lg:w-9">
                    <HoverArrow />
                  </span>
                  <span className="text-[clamp(1.3rem,1.75vw,1.8rem)] leading-none tracking-[-0.03em] transition-transform duration-300 ease-out group-hover/item:translate-x-2">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-sm xl:col-start-3 xl:ml-auto xl:w-[min(16rem,20vw)] xl:max-w-none xl:justify-self-end xl:pt-2">
            <div className="mt-2 space-y-4 text-left">
              <p className="type-body max-w-xs text-[var(--color-text-muted)]">
                Available for branding, editorial and digital projects.
              </p>
              <p className="type-body max-w-xs text-[var(--color-text-muted)]">
                Open to collaborations and selected freelance work.
              </p>
            </div>
          </div>
        </div>

        <div className="relative -mx-4 mt-4 px-4 pb-0 pt-5 sm:-mx-8 sm:px-8 sm:pt-6 lg:-mx-12 lg:px-12">
          <div
            ref={ballZoneRef}
            className="relative h-[260px] w-full overflow-hidden sm:h-[300px] lg:h-[340px] xl:h-[360px]"
          >
            {contactBalls.map((ball) => (
              <div
                key={`${ball.motif}-${ball.accent}-${ball.size}`}
                className="absolute left-0 top-0"
              >
                <div
                  data-contact-ball
                  className={`relative flex ${ball.size} items-center justify-center rounded-full ${ball.accent} opacity-0`}
                >
                  <div className="absolute inset-0 rounded-full border-2 border-[rgba(31,27,25,0.14)]" aria-hidden="true" />
                  <div className="absolute inset-[10%] rounded-full border border-[rgba(31,27,25,0.3)]" aria-hidden="true" />
                  <div className="relative z-10 flex h-full w-full items-center justify-center text-[var(--color-text)]">
                    <BallGraphic motif={ball.motif} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
