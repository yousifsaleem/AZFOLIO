const archiveProjects = [
  {
    title: "Twice",
    category: "Interaction & Development",
    year: "2026",
    previewImage: "/images/archive/twice.jpg",
  },
  {
    title: "The Dama",
    category: "Design & Development",
    year: "2025",
    previewImage: "/images/archive/the-dama.jpg",
  },
  {
    title: "Fabric",
    category: "Design & Development",
    year: "2025",
    previewImage: "/images/archive/fabric.jpg",
  },
  {
    title: "Aanstekelijk",
    category: "Design & Development",
    year: "2024",
    previewImage: "/images/archive/aanstekelijk.jpg",
  },
  {
    title: "Xaar Annual Report",
    category: "Editorial / Corporate",
    year: "2026",
    previewImage: "/images/archive/xaar-annual-report.jpg",
  },
  {
    title: "Titon Annual Report",
    category: "Editorial / Corporate",
    year: "2025",
    previewImage: "/images/archive/titon-annual-report.jpg",
  },
  {
    title: "Star Energy",
    category: "Editorial / Strategy",
    year: "2025",
    previewImage: "/images/archive/star-energy.jpg",
  },
  {
    title: "MIGO Opportunities Trust",
    category: "Editorial / Concept",
    year: "2026",
    previewImage: "/images/archive/migo-opportunities-trust.jpg",
  },
];

export default function Archive() {
  return (
    <section id="archive" className="bg-[#f7f3ed] px-6 py-24 text-zinc-900 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-12 flex items-end justify-between gap-6 border-b border-zinc-300 pb-6">
          <p className="type-heading text-zinc-500">Archive</p>
          <p className="type-body hidden max-w-sm text-zinc-500 lg:block">
            A wider editorial index of projects, prepared for future cursor-follow previews.
          </p>
        </div>

        <div>
          {archiveProjects.map((project) => (
            <div
              key={project.title}
              data-preview-image={project.previewImage}
              className="group cursor-pointer border-b border-zinc-300 transition-colors duration-300 ease-out hover:border-zinc-700"
            >
              <div className="grid gap-6 py-8 transition-transform duration-300 ease-out group-hover:translate-x-1 md:py-10 lg:grid-cols-[minmax(0,1fr)_320px_90px] lg:items-end lg:gap-10">
                <h3 className="type-display-xl text-zinc-800 transition-colors duration-300 ease-out group-hover:text-zinc-950">
                  {project.title}
                </h3>

                <p className="type-meta text-zinc-600 lg:pb-3">{project.category}</p>

                <p className="type-meta text-zinc-500 lg:pb-3 lg:text-right">{project.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
