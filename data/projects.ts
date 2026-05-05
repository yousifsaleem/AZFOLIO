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
    image: "/images/test.jpg",
    thumbnail: "/images/test.jpg",
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
    image: "https://via.placeholder.com/1200x800?text=The+Quiet+Hours",
    thumbnail: "https://via.placeholder.com/600x400?text=Quiet+Hours+Thumbnail",
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
    image: "https://via.placeholder.com/1200x800?text=Enterprise+Challenge",
    thumbnail: "https://via.placeholder.com/600x400?text=Enterprise+Thumbnail",
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
    image: "https://via.placeholder.com/1200x800?text=Barons+Offer",
    thumbnail: "https://via.placeholder.com/600x400?text=Barons+Thumbnail",
    accentColor: "#c4b59b",
    backgroundColor: "#0f172a",
  },
];
