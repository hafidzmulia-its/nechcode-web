export const siteConfig = {
  name: "NechCode",
  domain: "nechcode.id",
  url: "https://nechcode.id",
  email: "projectmulyos1@gmail.com",
  whatsappNumber: "6289531848511",
  whatsappDisplayName: "NechMin",
  founder: "Nech Team.",
  socials: {
    instagram: {
      platform: "Instagram",
      label: "Instagram",
      handle: "nechcode.id",
      href: "https://www.instagram.com/nechcode.id",
    },
    tiktok: {
      platform: "TikTok",
      label: "TikTok",
      handle: "nechcode.id",
      href: "https://www.tiktok.com/@nechcode.id",
    },
 
    linkedin: {
      platform: "LinkedIn",
      label: "LinkedIn",
      handle: "NechCode",
      href: "https://www.linkedin.com/company/NechCode",
    },
  },
} as const;

export function buildMailto(subject: string) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}

export function getSocialLinks() {
  return Object.values(siteConfig.socials);
}
