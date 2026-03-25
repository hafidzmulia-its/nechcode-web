import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Campaign } from "@/types/campaign";

type CampaignFaqProps = {
  campaign: Campaign;
};

export function CampaignFaq({ campaign }: CampaignFaqProps) {
  if (!campaign.faqItems.length) {
    return null;
  }

  return (
    <section id="faq" className="rounded-[1.8rem] border border-outline-variant/20 bg-surface-container-low p-6 md:p-8">
      <h3 className="mb-5 font-headline text-3xl text-primary">FAQ Campaign</h3>
      <Accordion type="single" collapsible className="space-y-3">
        {campaign.faqItems.map((item, index) => (
          <AccordionItem key={`${item.question}-${index}`} value={`campaign-faq-${index}`}>
            <AccordionTrigger className="text-base text-primary hover:no-underline">{item.question}</AccordionTrigger>
            <AccordionContent className="text-sm leading-relaxed text-on-surface-variant">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
