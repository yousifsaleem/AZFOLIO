export type Project = {
  number: number;
  title: string;
  slug: string;
  year: number;
  category: string;
  tags: string[];
  shortDescription: string;
  backgroundImage?: string;
  thumbnail?: string;
  preview?: string;
  cursorColor?: string;
  accentColor: string;
  backgroundColor: string;
};

export function getProjectBackgroundImage(project: Project) {
  return project.backgroundImage || project.thumbnail || null;
}

export function getProjectThumbnailImage(project: Project) {
  return project.thumbnail || project.backgroundImage || null;
}

export function getProjectPreviewImage(project: Project) {
  return project.preview || getProjectThumbnailImage(project);
}

export const featuredProjects: Project[] = [
  {
    number: 1,
    title: "Winter by the River",
    slug: "winter-by-the-river",
    year: 2025,
    category: "Editorial",
    tags: ["Photography", "Layout", "Brand"],
    shortDescription: "A seasonal narrative built around quiet landscape imagery and restrained typography.",
    backgroundImage: "/images/winter/background.jpg",
    thumbnail: "/images/winter/thumbnail.jpg",
    preview: "/images/winter/preview.jpg",
    cursorColor: "var(--cursor-winter)",
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
    backgroundImage: "/images/quiet-hours/thumbnail.jpg",
    thumbnail: "/images/quiet-hours/thumbnail.jpg",
    preview: "/images/quiet-hours/preview.JPG",
    cursorColor: "var(--cursor-quiet-hours)",
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
    backgroundImage: "/images/enterprise/thumbnail.jpg",
    thumbnail: "/images/enterprise/thumbnail.jpg",
    preview: "/images/enterprise/preview.JPG",
    cursorColor: "var(--cursor-enterprise)",
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
    backgroundImage: "/images/barons/thumbnail.jpg",
    thumbnail: "/images/barons/thumbnail.jpg",
    preview: "/images/barons/preview.JPG",
    cursorColor: "var(--cursor-barons)",
    accentColor: "#c4b59b",
    backgroundColor: "#0f172a",
  },
];
