import { ContactPage } from "@/components/pages/contact-page";
import { getHomeContent } from "@/content/home";

export default function Page() {
  const content = getHomeContent();

  return <ContactPage content={content} />;
}
