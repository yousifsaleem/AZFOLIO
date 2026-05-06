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
    size: "h-28 w-28 sm:h-32 sm:w-32 lg:h-[10.5rem] lg:w-[10.5rem]",
    offset: "translate-y-6 lg:translate-y-8",
  },
  {
    motif: "smile",
    accent: "bg-[var(--color-card)]",
    size: "h-32 w-32 sm:h-36 sm:w-36 lg:h-[11.5rem] lg:w-[11.5rem]",
    offset: "translate-y-1 lg:translate-y-2",
  },
  {
    motif: "flower",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-36 w-36 sm:h-40 sm:w-40 lg:h-[12.5rem] lg:w-[12.5rem]",
    offset: "translate-y-8 lg:translate-y-10",
  },
  {
    motif: "monogramZ",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-[7.5rem] w-[7.5rem] sm:h-[8.5rem] sm:w-[8.5rem] lg:h-[10.5rem] lg:w-[10.5rem]",
    offset: "translate-y-3 lg:translate-y-5",
  },
  {
    motif: "spark",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-[6.5rem] w-[6.5rem] sm:h-[7.5rem] sm:w-[7.5rem] lg:h-[9rem] lg:w-[9rem]",
    offset: "translate-y-10 lg:translate-y-12",
  },
  {
    motif: "orbit",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-32 w-32 sm:h-36 sm:w-36 lg:h-[11.5rem] lg:w-[11.5rem]",
    offset: "translate-y-4 lg:translate-y-6",
  },
  {
    motif: "ribbon",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-[8.5rem] w-[8.5rem] sm:h-[9.5rem] sm:w-[9.5rem] lg:h-[12rem] lg:w-[12rem]",
    offset: "translate-y-0",
  },
  {
    motif: "petal",
    accent: "bg-[var(--color-card)]",
    size: "h-28 w-28 sm:h-32 sm:w-32 lg:h-[10.5rem] lg:w-[10.5rem]",
    offset: "translate-y-8 lg:translate-y-10",
  },
  {
    motif: "wave",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-36 w-36 sm:h-40 sm:w-40 lg:h-[12.5rem] lg:w-[12.5rem]",
    offset: "translate-y-2 lg:translate-y-4",
  },
  {
    motif: "starburst",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-[7.5rem] w-[7.5rem] sm:h-[8.5rem] sm:w-[8.5rem] lg:h-[10.5rem] lg:w-[10.5rem]",
    offset: "translate-y-9 lg:translate-y-11",
  },
  {
    motif: "monogramA",
    accent: "bg-[var(--color-accent-butter)]",
    size: "h-[6.5rem] w-[6.5rem] sm:h-28 sm:w-28 lg:h-[8.5rem] lg:w-[8.5rem]",
    offset: "translate-y-7 lg:translate-y-9",
  },
  {
    motif: "flower",
    accent: "bg-[var(--color-card)]",
    size: "h-[7rem] w-[7rem] sm:h-32 sm:w-32 lg:h-[9.5rem] lg:w-[9.5rem]",
    offset: "translate-y-3 lg:translate-y-4",
  },
  {
    motif: "orbit",
    accent: "bg-[var(--color-accent-coral)]",
    size: "h-[6.75rem] w-[6.75rem] sm:h-[7.75rem] sm:w-[7.75rem] lg:h-[9.5rem] lg:w-[9.5rem]",
    offset: "translate-y-10 lg:translate-y-12",
  },
  {
    motif: "wave",
    accent: "bg-[var(--color-card)]",
    size: "h-[7.5rem] w-[7.5rem] sm:h-[8.5rem] sm:w-[8.5rem] lg:h-[11rem] lg:w-[11rem]",
    offset: "translate-y-1 lg:translate-y-2",
  },
  {
    motif: "spark",
    accent: "bg-[var(--color-accent-blue)]",
    size: "h-[6.25rem] w-[6.25rem] sm:h-[7rem] sm:w-[7rem] lg:h-[8.5rem] lg:w-[8.5rem]",
    offset: "translate-y-8 lg:translate-y-9",
  },
  {
    motif: "petal",
    accent: "bg-[var(--color-accent-lilac)]",
    size: "h-[6.75rem] w-[6.75rem] sm:h-[7.75rem] sm:w-[7.75rem] lg:h-[9.5rem] lg:w-[9.5rem]",
    offset: "translate-y-4 lg:translate-y-5",
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
  return (
    <section
      id="contact"
      data-header-theme="light"
      className="relative overflow-hidden bg-[var(--color-surface)] px-6 text-[var(--color-text)] sm:px-8 lg:px-12"
    >
      <div className="mx-auto flex min-h-screen max-w-[1600px] flex-col justify-between py-8 lg:py-10">
        <div className="grid gap-12 pt-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(180px,220px)_minmax(240px,0.62fr)] lg:items-start lg:gap-12 lg:pt-36 xl:gap-[4.5rem]">
          <div className="max-w-4xl">
            <h2 className="text-[clamp(4.25rem,10.6vw,8.5rem)] font-semibold uppercase leading-[0.82] tracking-[-0.09em] text-[var(--color-text)]">
              LET&apos;S
              <br />
              COLLAB
            </h2>
            <p className="type-meta mt-5 text-[var(--color-text-muted)]">PORTFOLIO BY AFIA</p>
          </div>

          <div className="w-full max-w-xs lg:pt-2">
            <div className="group/list mt-2 flex flex-col gap-1">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group/item flex items-center gap-3 py-2.5 text-[var(--color-text-muted)] transition-colors duration-300 ease-out group-hover/list:text-[rgba(117,104,95,0.44)] hover:text-[var(--color-text)] group-hover/list:hover:text-[var(--color-text)]"
                >
                  <span className="inline-flex h-6 w-6 items-center justify-center text-[var(--color-text-muted)] transition-colors duration-300 ease-out group-hover/item:text-[var(--color-text)] lg:h-7 lg:w-7">
                    <LinkIcon type={link.icon} />
                  </span>
                  <span className="inline-flex w-8 -translate-x-3 items-center justify-center opacity-0 transition-all duration-300 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100 lg:w-9">
                    <HoverArrow />
                  </span>
                  <span className="text-[clamp(1.3rem,1.75vw,1.8rem)] leading-none tracking-[-0.04em] transition-transform duration-300 ease-out group-hover/item:translate-x-2">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="max-w-sm lg:pt-2">
            <div className="mt-2 space-y-4">
              <p className="type-body max-w-xs text-[var(--color-text-muted)]">
                Available for branding, editorial and digital projects.
              </p>
              <p className="type-body max-w-xs text-[var(--color-text-muted)]">
                Open to collaborations and selected freelance work.
              </p>
            </div>
          </div>
        </div>

        <div className="relative mt-6 pt-5 sm:pt-6">
          <div className="flex min-h-[250px] flex-wrap items-end gap-2 sm:min-h-[280px] sm:gap-2.5 lg:min-h-[330px] lg:flex-nowrap lg:gap-3">
            {contactBalls.map((ball) => (
              <div
                key={`${ball.motif}-${ball.accent}-${ball.size}-${ball.offset}`}
                className={`relative flex ${ball.size} ${ball.offset} shrink-0 items-center justify-center rounded-full ${ball.accent}`}
              >
                <div className="absolute inset-0 rounded-full border-2 border-[rgba(31,27,25,0.14)]" aria-hidden="true" />
                <div className="absolute inset-[10%] rounded-full border border-[rgba(31,27,25,0.3)]" aria-hidden="true" />
                <div className="relative z-10 flex h-full w-full items-center justify-center text-[var(--color-text)]">
                  <BallGraphic motif={ball.motif} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
