export type Project = {
  number: number;
  title: string;
  slug: string;
  year: number;
  category: string;
  tags: string[];
  shortDescription: string;
  thumbnail: string;
  preview: string;
  detailImages: string[];
  accentColor: string;
  backgroundColor: string;
};

// Restore real project names, descriptions, tags, and image paths in this file
// when you want to switch back from the anonymised shareable version.
export const featuredProjects: Project[] = [
  {
    number: 1,
    title: "Featured Project 01",
    slug: "winter-by-the-river",
    year: 2026,
    category: "Editorial",
    tags: ["Branding", "Editorial", "Art Direction"],
    shortDescription: "A placeholder project description showing where the final case study summary will sit.",
    thumbnail: "/images/placeholders/featured-01-thumb.svg",
    preview: "/images/placeholders/featured-01-preview.svg",
    detailImages: [
      "/images/placeholders/featured-01-preview.svg",
      "/images/placeholders/detail-01.svg",
      "/images/placeholders/archive-01.svg",
    ],
    accentColor: "#d8cfc1",
    backgroundColor: "#0f172a",
  },
  {
    number: 2,
    title: "Featured Project 02",
    slug: "the-quiet-hours",
    year: 2025,
    category: "Digital",
    tags: ["Digital", "Motion", "Strategy"],
    shortDescription: "A placeholder project description showing where the final case study summary will sit.",
    thumbnail: "/images/placeholders/featured-02-thumb.svg",
    preview: "/images/placeholders/featured-02-preview.svg",
    detailImages: [
      "/images/placeholders/featured-02-preview.svg",
      "/images/placeholders/detail-02.svg",
      "/images/placeholders/archive-02.svg",
    ],
    accentColor: "#9ca3af",
    backgroundColor: "#111827",
  },
  {
    number: 3,
    title: "Featured Project 03",
    slug: "enterprise-challenge",
    year: 2026,
    category: "Digital",
    tags: ["Web Design", "Visual Identity", "Strategy"],
    shortDescription: "A placeholder project description showing where the final case study summary will sit.",
    thumbnail: "/images/placeholders/featured-03-thumb.svg",
    preview: "/images/placeholders/featured-03-preview.svg",
    detailImages: [
      "/images/placeholders/featured-03-preview.svg",
      "/images/placeholders/detail-03.svg",
      "/images/placeholders/archive-03.svg",
    ],
    accentColor: "#f7f3ed",
    backgroundColor: "#111827",
  },
  {
    number: 4,
    title: "Featured Project 04",
    slug: "barons-offer",
    year: 2025,
    category: "Branding",
    tags: ["Branding", "Editorial", "Motion"],
    shortDescription: "A placeholder project description showing where the final case study summary will sit.",
    thumbnail: "/images/placeholders/featured-04-thumb.svg",
    preview: "/images/placeholders/featured-04-preview.svg",
    detailImages: [
      "/images/placeholders/featured-04-preview.svg",
      "/images/placeholders/detail-04.svg",
      "/images/placeholders/archive-04.svg",
    ],
    accentColor: "#c4b59b",
    backgroundColor: "#0f172a",
  },
];
