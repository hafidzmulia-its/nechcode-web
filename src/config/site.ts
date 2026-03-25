export const siteConfig = {
  name: "NechCode",
  domain: "nechcode.id",
  url: "https://nechcode.id",
  email: "halo@nechcode.id",
  whatsapp: "https://wa.me/?text=Halo%20NechCode%2C%20saya%20ingin%20diskusi%20proyek.",
  founder: "Faisal N.",
} as const;

export function buildMailto(subject: string) {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}`;
}
