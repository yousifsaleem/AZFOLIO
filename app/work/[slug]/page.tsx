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
    <main className="bg-[#f5ede1] px-6 py-10 text-zinc-950 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex min-h-screen flex-col gap-12">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/"
              className="type-link text-zinc-700 transition-colors duration-300 ease-out hover:text-zinc-950"
            >
              Back to home
            </Link>
            <p className="type-meta text-zinc-500">
              [{String(project.number).padStart(2, "0")}]
            </p>
          </div>

          <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
            <div>
              <h1 className="type-display-lg max-w-4xl text-zinc-950">{project.title}</h1>
              <p className="type-body mt-6 max-w-2xl text-zinc-700">{project.shortDescription}</p>
            </div>

            <div className="grid gap-4">
              <div>
                <p className="type-meta text-zinc-500">Year</p>
                <p className="type-body mt-2 text-zinc-800">{project.year}</p>
              </div>
              <div>
                <p className="type-meta text-zinc-500">Category</p>
                <p className="type-body mt-2 text-zinc-800">{project.category}</p>
              </div>
              <div>
                <p className="type-meta text-zinc-500">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="type-meta text-zinc-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            className="flex min-h-[30rem] items-end justify-between border border-zinc-300 p-6 sm:p-8"
            style={{ backgroundColor: project.accentColor }}
          >
            <span className="type-meta text-zinc-700">Hero image placeholder</span>
            <span className="type-meta text-zinc-500">{project.title}</span>
          </section>

          <section className="grid gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex min-h-[28rem] items-end justify-between border border-zinc-300 bg-[#fbf7f1] p-6 sm:p-8"
              >
                <span className="type-meta text-zinc-600">Content placeholder {item}</span>
                <span className="type-meta text-zinc-400">0{item}</span>
              </div>
            ))}
          </section>

          <div className="flex justify-end pt-4">
            <Link
              href={`/work/${nextProject.slug}`}
              className="type-link text-zinc-700 transition-colors duration-300 ease-out hover:text-zinc-950"
            >
              Next project: {nextProject.title}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
