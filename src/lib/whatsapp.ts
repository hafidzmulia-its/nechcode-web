import { siteConfig } from "@/config/site";

type WhatsAppInquiryContext = {
  sourcePage?: string;
  serviceInterest?: string;
  packageInterest?: string;
  additionalNote?: string;
  name?: string;
  businessType?: string;
  mainNeed?: string;
  timeline?: string;
  budget?: string;
};

function field(value?: string) {
  return value?.trim() ? value.trim() : "-";
}

export function buildWhatsAppInquiryUrl(context: WhatsAppInquiryContext = {}) {
  const contactName = siteConfig.whatsappDisplayName;
  const source = context.sourcePage ?? "Website NechCode";
  const message = [
    `Halo ${contactName},`,
    "",
    "Saya ingin diskusi kebutuhan digital dengan NechCode.",
    "",
    `Nama / Brand: ${field(context.name)}`,
    `Jenis bisnis / organisasi: ${field(context.businessType)}`,
    `Kebutuhan utama: ${field(context.mainNeed)}`,
    `Layanan / paket yang diminati: ${field(context.serviceInterest)}`,
    `Paket awal (jika ada): ${field(context.packageInterest)}`,
    `Estimasi timeline: ${field(context.timeline)}`,
    `Estimasi budget: ${field(context.budget)}`,
    `Sumber halaman: ${source}`,
    `Catatan tambahan: ${field(context.additionalNote)}`,
  ].join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
