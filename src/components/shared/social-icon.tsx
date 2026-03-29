import { Instagram, Linkedin } from "lucide-react";
import type { ReactElement } from "react";

type SocialIconProps = {
  platform: string;
};

export function SocialIcon({ platform }: SocialIconProps): ReactElement | null {
  const normalized = platform.toLowerCase().trim();

  if (normalized.includes("linkedin")) {
    return <Linkedin size={18} strokeWidth={2.2} aria-hidden="true" />;
  }

  if (normalized.includes("instagram")) {
    return <Instagram size={18} strokeWidth={2.2} aria-hidden="true" />;
  }

  if (normalized.includes("tiktok")) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M16.75 3.5h-3.2v10.09a2.85 2.85 0 1 1-2.23-2.78v-3.2A6.05 6.05 0 1 0 16.75 13V7.98a7.72 7.72 0 0 0 4.5 1.45v-3.2a4.52 4.52 0 0 1-4.5-2.73Z" />
      </svg>
    );
  }

  if (normalized.includes("twitter") || normalized === "x" || /\bx\b/.test(normalized)) {
    return (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
        <path d="M18.24 2.25h3.42l-7.48 8.55L23 21.75h-6.88l-5.39-7.02-6.15 7.02H1.16l8-9.15L1 2.25h7.05l4.87 6.42 5.32-6.42Zm-1.21 17.43h1.9L7.02 4.22H4.98l12.05 15.46Z" />
      </svg>
    );
  }

  return null;
}