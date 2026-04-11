import type { Metadata } from "next";

import { AiServicePage } from "@/components/pages/ai-service-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan AI Automation & Chatbot",
  description:
    "Layanan AI automation NechCode: chatbot, workflow otomatis, dan integrasi AI yang mengurangi kerja manual tim Anda.",
  alternates: {
    canonical: `${siteConfig.url}/services/ai`,
  },
  openGraph: {
    title: `Layanan AI Automation | ${siteConfig.name}`,
    description:
      "Layanan AI automation NechCode: chatbot, workflow otomatis, dan integrasi AI yang mengurangi kerja manual tim Anda.",
    url: `${siteConfig.url}/services/ai`,
  },
};

export default function Page() {
  const content = getHomeContent();

  return <AiServicePage content={content} />;
}
