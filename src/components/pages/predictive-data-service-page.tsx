import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import type { HomeContent } from "@/content/home";

type PredictiveDataServicePageProps = {
  content: HomeContent;
};

export function PredictiveDataServicePage({
  content,
}: PredictiveDataServicePageProps) {
  return (
    <ServiceDetailPage
      content={content}
      serviceId="data"
      heroImage="/img/bg_predictive.png"
      heroImageAlt="Predictive data service showcase"
      heroLabel={{
        left: "PREDICTIVE",
        rightTop: "DATA",
      }}
      pricingOptions={{
        showOptionLabel: true,
      }}
    />
  );
}
