import { AboutPage } from "@/components/pages/about-page";
import { getHomeContent } from "@/content/home";

export default function Page() {
  const content = getHomeContent();

  return <AboutPage content={content} />;
}
