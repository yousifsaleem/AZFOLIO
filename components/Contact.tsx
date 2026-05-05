const contactLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "Behance", href: "#" },
  { label: "Email", href: "mailto:hello@afiazaman.com" },
];

export default function Contact() {
  return (
    <section id="contact" data-header-theme="light" className="bg-[#f5ede1] px-6 py-10 text-zinc-950 sm:px-8 lg:px-12">
      <div className="mx-auto grid max-w-6xl items-center gap-12 sm:gap-16 lg:min-h-screen lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-24">
        <div className="flex flex-col gap-8 lg:gap-10">
          <p className="type-heading text-zinc-500">Contact</p>

          <div className="space-y-4">
            {contactLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="type-link block text-zinc-900 transition-colors duration-300 ease-out hover:text-zinc-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="max-w-3xl">
          <h2 className="type-display-lg text-zinc-950 max-sm:text-[clamp(2.4rem,11vw,4.2rem)]">
            Let&apos;s collab
          </h2>
          <a
            href="mailto:hello@afiazaman.com"
            className="type-link mt-6 inline-block break-all text-zinc-900 underline underline-offset-4 sm:mt-8 sm:break-normal"
          >
            hello@afiazaman.com
          </a>
          <p className="type-body mt-6 max-w-xl text-zinc-700">
            Available for branding, editorial and digital projects.
          </p>
        </div>
      </div>
    </section>
  );
}
