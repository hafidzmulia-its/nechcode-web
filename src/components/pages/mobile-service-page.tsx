import { ServiceDetailPage } from "@/components/pages/service-detail-page";
import type { HomeContent } from "@/content/home";

type MobileServicePageProps = {
  content: HomeContent;
};

export function MobileServicePage({ content }: MobileServicePageProps) {
  return (
    <ServiceDetailPage
      content={content}
      serviceId="mobile"
      heroImage="/img/bg_mobile.png"
      heroImageAlt="Mobile app service showcase"
      heroLabel={{
        left: "MOBILE",
        rightTop: "APPS",
      }}
    />
  );
}
