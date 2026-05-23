import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import type { HomeContent } from "@/content/home";

type AiServicePageProps = {
  content: HomeContent;
};

export function AiServicePage({ content }: AiServicePageProps) {
  return (
    <ServiceDetailPage
      content={content}
      serviceId="ai"
      heroImage="/img/bg_ai.png"
      heroImageAlt="AI automation service showcase"
      heroLabel={{
        left: "AI",
        rightTop: "AUTOMATION",
        rightBottom: "CHATBOT",
      }}
      pricingOptions={{
        showOptionLabel: true,
      }}
    />
  );
}
