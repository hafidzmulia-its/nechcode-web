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
    "NechCode membangun landing page, website, automasi, dan sistem digital editorial untuk bisnis yang ingin tampil presisi dan bergerak cepat.",
  applicationName: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  keywords: [
    "NechCode",
    "nechcode.id",
    "landing page agency",
    "website creator Indonesia",
    "web design studio",
    "automasi",
    "AI workflow",
  ],
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
