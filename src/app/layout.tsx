import type { Metadata } from "next";

import { appFontVariables } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} - Mitra Teknologi Strategis Anda`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "NechCode membangun web app kustom, sistem internal, dan automasi workflow untuk tim yang ingin mengurangi kerja manual dan meningkatkan efisiensi operasional bisnis.",
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "NechCode",
    "nechcode.id",
    "jasa pembuatan website Indonesia",
    "web app kustom",
    "sistem internal bisnis",
    "automasi workflow",
    "AI workflow Indonesia",
    "landing page agency",
  ],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} - Mitra Teknologi Strategis Anda`,
    description:
      "NechCode membangun web app kustom, sistem internal, dan automasi workflow untuk tim yang ingin mengurangi kerja manual dan meningkatkan efisiensi operasional bisnis.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Mitra Teknologi Strategis Anda`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} - Mitra Teknologi Strategis Anda`,
    description:
      "NechCode membangun web app kustom, sistem internal, dan automasi workflow untuk tim yang ingin mengurangi kerja manual dan meningkatkan efisiensi operasional bisnis.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      className={`${appFontVariables} light h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
      </head>
      <body className="min-h-full bg-background font-sans text-on-surface">
        {children}
      </body>
    </html>
  );
}
