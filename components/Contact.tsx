const socialLinks = [
  { label: "Instagram", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Are.na", href: "#" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-[#f7f3ed] px-6 py-24 text-zinc-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl border border-zinc-300 bg-[#fbf8f2] p-8 sm:p-10 lg:p-14">
        <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
          <div className="flex flex-col justify-between gap-10">
            <div>
              <p className="type-heading text-zinc-500">Contact</p>
              <p className="type-body mt-4 max-w-xs text-zinc-600">
                A simple contact block for enquiries, collaborations and studio conversations.
              </p>
            </div>

            <div className="space-y-4">
              <p className="type-meta text-zinc-500">Elsewhere</p>
              <div className="space-y-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="type-link block border-b border-zinc-300 pb-3 text-zinc-900"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 border-t border-zinc-300 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_220px] md:items-start">
              <h2 className="type-display-lg max-w-3xl text-zinc-900">
                Let&apos;s collab
              </h2>
              <div className="type-meta space-y-3 text-zinc-500">
                <p>Open for selected freelance projects</p>
                <p>Brand systems</p>
                <p>Editorial design</p>
                <p>Art direction</p>
              </div>
            </div>

            <div className="grid gap-6 border-t border-zinc-300 pt-6 md:grid-cols-2">
              <div>
                <p className="type-meta text-zinc-500">Email</p>
                <a
                  href="mailto:hello@afiazaman.com"
                  className="type-link mt-3 inline-block text-zinc-700 underline underline-offset-4"
                >
                  hello@afiazaman.com
                </a>
              </div>

              <div>
                <p className="type-meta text-zinc-500">Availability</p>
                <p className="type-body mt-3 text-zinc-600">
                  Placeholder copy for location, response window and preferred project types.
                </p>
              </div>
            </div>

            <div className="aspect-[16/5] border border-zinc-300 bg-stone-200" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
