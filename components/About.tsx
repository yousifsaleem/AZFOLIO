import Image from "next/image";

export default function About() {
  const aboutImages = [
    {
      src: "/images/about/main.jpg",
      alt: "Portrait of Afia Zaman",
    },
    {
      src: "/images/about/support-1.jpg",
      alt: "Afia Zaman visual reference image",
    },
    {
      src: "/images/about/support-2.jpg",
      alt: "Afia Zaman design process image",
    },
  ];

  return (
    <section
      id="about"
      className="bg-[var(--color-surface)] px-6 py-20 text-[var(--color-text)] sm:px-8 lg:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <div className="border-b border-[var(--color-border)] pb-6">
          <h2 className="text-4xl tracking-[-0.03em]">About</h2>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <p className="max-w-2xl text-lg leading-8 text-[var(--color-text-muted)]">
            Afia Zaman is a graphic designer shaping calm, characterful visual
            systems across editorial, identity and digital work. This section is
            a simple placeholder for a fuller studio story.
          </p>

          <div className="grid grid-cols-3 gap-4">
            {aboutImages.map((image) => (
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
