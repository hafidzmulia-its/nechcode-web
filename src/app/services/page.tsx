import { ServicesPage } from "@/components/pages/services-page";
import { getHomeContent } from "@/content/home";

export default function Page() {
  const content = getHomeContent();

  return <ServicesPage content={content} />;
}
