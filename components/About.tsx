import Image from "next/image";

import { siteContent } from "../data/siteContent";

export default function About() {
  return (
    <section
      id="about"
      className="section-space-tight bg-[var(--color-surface)] text-[var(--color-text)]"
    >
      <div className="layout-shell">
        <div className="border-b border-[var(--color-border)] pb-6">
          <h2 className="type-display-md">About</h2>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12">
          <p className="type-body max-w-2xl text-[var(--color-text-muted)]">
            {siteContent.shortBio}
          </p>

          <div className="grid grid-cols-3 gap-4 sm:gap-5">
            {siteContent.aboutImages.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[4/5] overflow-hidden border border-[var(--color-border)] bg-[var(--color-card-muted)]"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
