import { PortfolioPage } from "@/components/pages/portfolio-page";
import { getHomeContent } from "@/content/home";
import { listPublicPortfolioItems } from "@/lib/portfolio/repository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = getHomeContent();
  const items = await listPublicPortfolioItems();

  return <PortfolioPage content={content} items={items} />;
}
