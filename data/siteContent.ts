export type SiteContent = {
  displayName: string;
  role: string;
  location: string;
  shortBio: string;
  emailLabel: string;
  emailHref: string;
  phoneLabel: string;
  phoneHref: string;
  instagramLabel: string;
  instagramHref: string;
  linkedinLabel: string;
  linkedinHref: string;
  availabilityLineOne: string;
  availabilityLineTwo: string;
  aboutImages: Array<{
    src: string;
    alt: string;
  }>;
};

export const siteContent: SiteContent = {
  displayName: "Architect Name",
  role: "Architect",
  location: "Location",
  shortBio:
    "Short placeholder bio text describing an anonymised architecture practice working across spatial concepts, built environments and presentation systems.",
  emailLabel: "Email",
  emailHref: "mailto:hello@example.com",
  phoneLabel: "Phone",
  phoneHref: "tel:+440000000000",
  instagramLabel: "Instagram",
  instagramHref: "https://example.com",
  linkedinLabel: "LinkedIn",
  linkedinHref: "https://example.com",
  availabilityLineOne: "Available for architecture, spatial and built environment projects.",
  availabilityLineTwo: "Open to collaborations, competitions and selected freelance work.",
  aboutImages: [
    {
      src: "/images/placeholders/about-01.svg",
      alt: "Placeholder architectural elevation collage",
    },
    {
      src: "/images/placeholders/about-02.svg",
      alt: "Placeholder interior spatial study",
    },
    {
      src: "/images/placeholders/about-03.svg",
      alt: "Placeholder material and structure board",
    },
  ],
};

/*
REAL CONTENT TEMPLATE

Swap the placeholder values above with your real details when you want to restore
the private version of the portfolio. Keeping the same object structure lets the
connected components update from this single file.

export const siteContent: SiteContent = {
  displayName: "Your Name",
  role: "Your Role",
  location: "Your Location",
  shortBio: "Your short bio.",
  emailLabel: "Email",
  emailHref: "mailto:you@example.com",
  phoneLabel: "Phone",
  phoneHref: "tel:+440000000000",
  instagramLabel: "Instagram",
  instagramHref: "https://instagram.com/your-handle",
  linkedinLabel: "LinkedIn",
  linkedinHref: "https://linkedin.com/in/your-profile",
  availabilityLineOne: "Your first availability line.",
  availabilityLineTwo: "Your second availability line.",
  aboutImages: [
    { src: "/images/about/main.jpg", alt: "Main about image alt text" },
    { src: "/images/about/support-1.jpg", alt: "Support image alt text" },
    { src: "/images/about/support-2.jpg", alt: "Support image alt text" },
  ],
};
*/
