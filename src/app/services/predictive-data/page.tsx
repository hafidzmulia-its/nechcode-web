import type { Metadata } from "next";

import { PredictiveDataServicePage } from "@/components/pages/predictive-data-service-page";
import { getHomeContent } from "@/content/home";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Layanan Predictive Data — Analisis & Machine Learning",
  description:
    "Layanan Predictive Data NechCode: analisis dataset, model prediksi Machine Learning, dan visualisasi data untuk bisnis, UMKM, dan penelitian.",
  alternates: {
    canonical: `${siteConfig.url}/services/predictive-data`,
  },
  openGraph: {
    title: `Layanan Predictive Data | ${siteConfig.name}`,
    description:
      "Layanan Predictive Data NechCode: analisis dataset, model prediksi Machine Learning, dan visualisasi data untuk bisnis, UMKM, dan penelitian.",
    url: `${siteConfig.url}/services/predictive-data`,
  },
};

export default function Page() {
  const content = getHomeContent();

  return <PredictiveDataServicePage content={content} />;
}
