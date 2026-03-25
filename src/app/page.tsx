import { HomePage } from "@/components/pages/home-page";
import { getHomeContent } from "@/content/home";
import { listPublicFaqItems } from "@/lib/faq/repository";
import { listPublicPortfolioItems } from "@/lib/portfolio/repository";

export const dynamic = "force-dynamic";

export default async function Page() {
  const content = getHomeContent();
  const faqItems = await listPublicFaqItems();
  const portfolioItems = await listPublicPortfolioItems();
  const pageContent = {
    ...content,
    faq: {
      ...content.faq,
      items: faqItems.map((item) => ({
        question: item.question,
        answer: item.answer,
      })),
    },
  };

  return <HomePage content={pageContent} portfolioItems={portfolioItems} />;
}
