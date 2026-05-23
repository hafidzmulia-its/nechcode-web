import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import type { HomeContent } from "@/content/home";

type WebServicePageProps = {
  content: HomeContent;
};

export function WebServicePage({ content }: WebServicePageProps) {
  return (
    <ServiceDetailPage
      content={content}
      serviceId="web"
      heroImage="/img/bg_website.png"
      heroImageAlt="Website service showcase"
      heroLabel={{
        left: "WEBSITE &",
        rightTop: "LANDING",
        rightBottom: "PAGE",
      }}
    />
  );
}
