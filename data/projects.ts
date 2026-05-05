export type Project = {
  number: number;
  title: string;
  slug: string;
  year: number;
  category: string;
  tags: string[];
  shortDescription: string;
  image: string;
  thumbnail: string;
  preview: string;
  accentColor: string;
  backgroundColor: string;
};

export const featuredProjects: Project[] = [
  {
    number: 1,
    title: "Winter by the River",
    slug: "winter-by-the-river",
    year: 2025,
    category: "Editorial",
    tags: ["Photography", "Layout", "Brand"],
    shortDescription: "A seasonal narrative built around quiet landscape imagery and restrained typography.",
    image: "/images/winter/hero.jpg",
    thumbnail: "/images/winter/thumb.jpg",
    preview: "/images/winter/preview.jpg",
    accentColor: "#d8cfc1",
    backgroundColor: "#0f172a",
  },
  {
    number: 2,
    title: "The Quiet Hours",
    slug: "the-quiet-hours",
    year: 2024,
    category: "Campaign",
    tags: ["Art Direction", "Motion", "Identity"],
    shortDescription: "An atmospheric campaign exploring the stillness between day and night.",
    image: "/images/quiet-hours/hero.jpg",
    thumbnail: "/images/quiet-hours/thumb.jpg",
    preview: "/images/quiet-hours/preview.jpg",
    accentColor: "#9ca3af",
    backgroundColor: "#111827",
  },
  {
    number: 3,
    title: "Enterprise Challenge",
    slug: "enterprise-challenge",
    year: 2025,
    category: "Digital",
    tags: ["Strategy", "UX", "Brand"],
    shortDescription: "Visual systems for a technology experience that balances authority with humanity.",
    image: "/images/enterprise/hero.jpg",
    thumbnail: "/images/enterprise/thumb.jpg",
    preview: "/images/enterprise/preview.jpg",
    accentColor: "#f7f3ed",
    backgroundColor: "#111827",
  },
  {
    number: 4,
    title: "Baron’s Offer",
    slug: "barons-offer",
    year: 2024,
    category: "Branding",
    tags: ["Identity", "Packaging", "Editorial"],
    shortDescription: "A brand project focused on luxurious restraint and cinematic typographic structure.",
    image: "/images/barons/hero.jpg",
    thumbnail: "/images/barons/thumb.jpg",
    preview: "/images/barons/preview.jpg",
    accentColor: "#c4b59b",
    backgroundColor: "#0f172a",
  },
];
