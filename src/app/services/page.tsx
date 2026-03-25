import { ServicesPage } from "@/components/pages/services-page";
import { getHomeContent } from "@/content/home";

type ServicesPageRouteProps = {
  searchParams: Promise<{ pillar?: string }>;
};

export default async function Page({ searchParams }: ServicesPageRouteProps) {
  const content = getHomeContent();
  const params = await searchParams;

  return <ServicesPage content={content} initialPillar={params.pillar} />;
}
