import Image from "next/image";
import Link from "next/link";

import { featuredProjects } from "../data/projects";

export default function FeaturedWork() {
  return (
    <section id="work" className="bg-[#f7f3ed] text-white">
      {featuredProjects.map((project) => (
        <article
          key={project.slug}
          className="relative isolate flex min-h-screen overflow-hidden border-b border-white/10"
          style={{ backgroundColor: project.backgroundColor }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={project.image}
              alt=""
              fill
              unoptimized
              className="scale-110 object-cover opacity-60 blur-2xl"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(180deg, rgba(245,237,225,0.14), rgba(12,12,12,0.22))",
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute inset-0 bg-white/5" aria-hidden="true" />

          <div className="relative z-10 grid min-h-screen w-full gap-8 px-6 py-8 sm:px-8 sm:py-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10 lg:px-14 lg:py-14 xl:px-20">
            <div className="order-1 flex items-center">
              <div className="w-full max-w-[760px]">
                <div className="relative aspect-[10/8] overflow-hidden rounded-[2rem] border border-white/20 bg-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0 opacity-90"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    }}
                    aria-hidden="true"
                  />
                  <div className="absolute inset-0 bg-black/10" aria-hidden="true" />
                  <div className="relative flex h-full items-end justify-between p-5 sm:p-8">
                    <div className="type-meta max-w-[12rem] text-white/65">Project image</div>
                    <div className="type-meta text-right text-white/65">
                      {project.category} / {project.year}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-2 grid gap-8 pb-2 lg:min-h-[24rem] lg:grid-rows-[1fr_auto_auto] lg:gap-0">
              <div className="flex items-start lg:items-center lg:justify-center">
                <div className="max-w-[30rem] lg:ml-4 xl:ml-10">
                  <p className="type-meta text-white/65">[{String(project.number).padStart(2, "0")}]</p>
                  <h2 className="type-display-lg mt-4 text-white max-sm:text-[clamp(2.4rem,11vw,4rem)]">
                    {project.title}
                  </h2>
                  <p className="type-body mt-5 max-w-md text-white/72">{project.shortDescription}</p>
                </div>
              </div>

              <div className="flex justify-start lg:mt-10 lg:justify-end">
                <div className="w-full max-w-[16rem] space-y-3 lg:mr-8 xl:mr-12">
                  {project.tags.map((tag) => (
                    <p key={tag} className="type-meta border-b border-white/15 pb-3 text-white/72">
                      {tag}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-end justify-start lg:mt-10 lg:justify-end">
                <Link
                  href={`/work/${project.slug}`}
                  className="type-link text-white transition-colors duration-300 ease-out hover:text-white/70"
                >
                  View project ↗
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
