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

export function buildMailto(subject: string, body?: string) {
  const params = new URLSearchParams({ subject });
  if (body) params.set("body", body);
  return `mailto:${siteConfig.email}?${params.toString()}`;
}

export function buildGmailComposeUrl(subject: string, body?: string) {
  const params = new URLSearchParams({
    view: "cm",
    to: siteConfig.email,
    su: subject,
  });
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

export function getSocialLinks() {
  return Object.values(siteConfig.socials);
}
