import { featuredProjects } from "../data/projects";

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-[#f5ede1] text-zinc-950">
      <div className="absolute inset-0 mx-auto max-w-[1600px] px-0 py-8">
        <nav className="type-meta absolute left-[-4rem] top-8 text-zinc-600">
          <div className="space-y-4">
            {[
              { href: "#about", label: "Info", number: "01" },
              { href: "#featured-work", label: "Work", number: "02" },
              { href: "#archive", label: "Archive", number: "03" },
              { href: "#contact", label: "Contact", number: "04" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group flex cursor-pointer items-center gap-3 text-zinc-700 transition-all duration-300 ease-out hover:translate-x-1 hover:text-amber-600"
              >
                <span className="font-semibold">
                  {item.number}
                </span>
                <span>
                  {item.label}
                </span>
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute right-[-4rem] top-8 max-w-[360px] text-right">
          <div className="type-meta grid grid-cols-[auto_auto] gap-x-8 text-zinc-600">
            <div className="space-y-2 text-left text-zinc-950">
              <div className="text-[1rem] font-semibold tracking-[0.12em] normal-case">Afia Zaman</div>
              <div className="text-zinc-500">Graphic Designer</div>
            </div>
            <div className="space-y-2 text-right">
              <div className="text-[1rem] font-semibold tracking-[0.12em] text-zinc-950">22:30</div>
              <div className="text-zinc-500">04.05.2026</div>
            </div>
          </div>
        </div>

        <div className="absolute left-[-4rem] bottom-8 max-w-xs text-zinc-900">
          <div className="type-meta text-zinc-500">What I do</div>
          <div className="mt-4 space-y-1">
            <div className="h-px w-16 bg-zinc-300" />
            <div className="h-px w-12 bg-zinc-300" />
            <div className="h-px w-8 bg-zinc-300" />
          </div>
          <div className="type-meta mt-4 text-zinc-500">scroll to see</div>
        </div>

        <div className="absolute right-[-4rem] bottom-8 flex items-end gap-3">
          {featuredProjects.slice(0, 4).map((project) => (
            <button
              key={project.slug}
              type="button"
              className="group flex h-[160px] w-[160px] cursor-pointer flex-col justify-between rounded-[2rem] border border-zinc-300 bg-white p-4 text-left text-sm text-zinc-950 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-neutral-900 hover:bg-neutral-100"
            >
              <span className="type-meta text-zinc-500">
                {project.number}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-[380px] px-6 text-center">
          <div className="mx-auto flex w-full flex-col items-center justify-center gap-8 py-12 sm:py-14">
            <div className="flex w-full items-center justify-center gap-4">
              <div className="h-px flex-1 bg-zinc-300" />
              <button
                type="button"
                className="pointer-events-auto inline-flex cursor-pointer items-center justify-center rounded-full border border-transparent px-4 text-[6rem] font-black uppercase leading-none tracking-[0.12em] text-zinc-950 transition-transform duration-300 ease-out hover:scale-[1.02] hover:border-zinc-300 hover:bg-white/30 sm:text-[7rem]"
              >
                AZ
              </button>
              <div className="h-px flex-1 bg-zinc-300" />
            </div>
            <div className="type-meta text-zinc-500">
              graphic mark
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
