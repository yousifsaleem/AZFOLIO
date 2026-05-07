import Image from "next/image";
import { notFound } from "next/navigation";

import TransitionLink from "../../../components/TransitionLink";
import { featuredProjects } from "../../../data/projects";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return featuredProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = featuredProjects.findIndex((project) => project.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = featuredProjects[projectIndex];
  const nextProject = featuredProjects[(projectIndex + 1) % featuredProjects.length];

  return (
    <main className="bg-[var(--color-surface)] py-28 text-[var(--color-text)] sm:py-32 lg:py-10">
      <div className="layout-shell-narrow">
        <div className="flex min-h-screen flex-col gap-10 sm:gap-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
            <TransitionLink
              href="/"
              className="type-link text-[var(--color-text-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]"
            >
              Back to home
            </TransitionLink>
            <p className="type-meta text-[var(--color-text-muted)]">
              [{String(project.number).padStart(2, "0")}]
            </p>
          </div>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end lg:gap-12">
            <div>
              <h1 className="type-display-lg max-w-4xl text-[var(--color-text)]">{project.title}</h1>
              <p className="type-body mt-6 max-w-2xl text-[var(--color-text-muted)]">{project.shortDescription}</p>
            </div>

            <div className="grid gap-4">
              <div>
                <p className="type-meta text-[var(--color-text-muted)]">Year</p>
                <p className="type-body mt-2 text-[rgba(31,27,25,0.88)]">{project.year}</p>
              </div>
              <div>
                <p className="type-meta text-[var(--color-text-muted)]">Category</p>
                <p className="type-body mt-2 text-[rgba(31,27,25,0.88)]">{project.category}</p>
              </div>
              <div>
                <p className="type-meta text-[var(--color-text-muted)]">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="type-meta text-[var(--color-text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="relative flex min-h-[24rem] flex-col justify-end gap-4 overflow-hidden border border-[var(--color-border)] p-5 sm:min-h-[30rem] sm:flex-row sm:items-end sm:justify-between sm:p-8"
            style={{ backgroundColor: project.accentColor }}
          >
            <Image
              src={project.detailImages[0]}
              alt={`${project.title} placeholder hero visual`}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(31,27,25,0.06)_0%,rgba(31,27,25,0.18)_100%)]" aria-hidden="true" />
            <span className="relative z-10 type-meta text-[var(--color-card)]">Hero image placeholder</span>
            <span className="relative z-10 type-meta text-[rgba(247,241,234,0.72)]">{project.title}</span>
          </section>

          <section className="grid gap-8">
            {project.detailImages.map((image, index) => (
              <div
                key={image}
                className="relative flex min-h-[22rem] flex-col justify-end gap-4 overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:min-h-[28rem] sm:flex-row sm:items-end sm:justify-between sm:p-8"
              >
                <Image
                  src={image}
                  alt={`${project.title} placeholder detail visual ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(248,243,236,0.02)_0%,rgba(31,27,25,0.12)_100%)]" aria-hidden="true" />
                <span className="relative z-10 type-meta text-[var(--color-card)]">
                  Content placeholder {index + 1}
                </span>
                <span className="relative z-10 type-meta text-[rgba(247,241,234,0.72)]">
                  0{index + 1}
                </span>
              </div>
            ))}
          </section>

          <div className="flex pt-4 sm:justify-end">
            <TransitionLink
              href={`/work/${nextProject.slug}`}
              className="type-link max-w-full text-[var(--color-text-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]"
            >
              Next project: {nextProject.title}
            </TransitionLink>
          </div>
        </div>
      </div>
    </main>
  );
}
