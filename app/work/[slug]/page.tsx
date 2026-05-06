import Link from "next/link";
import { notFound } from "next/navigation";

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
    <main className="bg-[var(--color-surface)] px-4 py-28 text-[var(--color-text)] sm:px-8 sm:py-32 lg:px-12 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="flex min-h-screen flex-col gap-10 sm:gap-12">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/"
              className="type-link text-[var(--color-text-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]"
            >
              Back to home
            </Link>
            <p className="type-meta text-[var(--color-text-muted)]">
              [{String(project.number).padStart(2, "0")}]
            </p>
          </div>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
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
            className="flex min-h-[24rem] flex-col justify-end gap-4 border border-[var(--color-border)] p-5 sm:min-h-[30rem] sm:flex-row sm:items-end sm:justify-between sm:p-8"
            style={{ backgroundColor: project.accentColor }}
          >
            <span className="type-meta text-[var(--color-text-muted)]">Hero image placeholder</span>
            <span className="type-meta text-[rgba(117,104,95,0.78)]">{project.title}</span>
          </section>

          <section className="grid gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex min-h-[22rem] flex-col justify-end gap-4 border border-[var(--color-border)] bg-[var(--color-card)] p-5 sm:min-h-[28rem] sm:flex-row sm:items-end sm:justify-between sm:p-8"
              >
                <span className="type-meta text-[var(--color-text-muted)]">Content placeholder {item}</span>
                <span className="type-meta text-[rgba(117,104,95,0.6)]">0{item}</span>
              </div>
            ))}
          </section>

          <div className="flex pt-4 sm:justify-end">
            <Link
              href={`/work/${nextProject.slug}`}
              className="type-link max-w-full text-[var(--color-text-muted)] transition-colors duration-300 ease-out hover:text-[var(--color-text)]"
            >
              Next project: {nextProject.title}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
