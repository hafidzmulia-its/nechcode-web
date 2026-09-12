import { buildWhatsAppInquiryUrl } from "@/lib/whatsapp";

export type ServicePillarId = "web" | "mobile" | "ai" | "data";

type Cta = { label: string; href: string; external?: boolean };

export type ServicePackage = {
  name: string;
  description: string;
  priceCue: string;
  subnote?: string;
  requirements?: string;
  isCustom?: boolean;
  badge?: string;
  features: string[];
  cta: Cta;
};

export type AddOnItem = { name: string; price: string };

export type ServicePillar = {
  id: ServicePillarId;
  label: string;
  navbarTitle: string;
  navbarBody: string;
  navbarPriceCue: string;
  selectorLabel: string;
  sectionTitle: string;
  sectionBody: string;
  packages: ServicePackage[];
  addOns?: {
    title: string;
    description: string;
    items: AddOnItem[];
    note: string;
  };
};

const pillars: ServicePillar[] = [
  {
    id: "web",
    label: "Web",
    navbarTitle: "Website & Landing Pages",
    navbarBody:
      "For company profiles, lead generation, catalogs, and credible business websites that are fast and ready to use.",
    navbarPriceCue: "Starting at IDR 1,200,000",
    selectorLabel: "Web",
    sectionTitle: "Web Packages",
    sectionBody:
      "Website packages for teams that want to launch quickly with a solid foundation and expand gradually as their operational needs grow.",
    packages: [
      {
        name: "Basic Web",
        description:
          "For personal brands, MSMEs, or businesses that need a simple, polished, credible website that is ready to go online.",
        priceCue: "IDR 1,600,000",
        features: [
          "One-page website or landing page with a responsive layout, WhatsApp or contact-form integration, and hosting deployment",
          "One minor revision covering text, color, or layout changes",
          "Optional add-ons: .com or .id domain and on-page SEO",
        ],
        cta: {
          label: "Choose Basic",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Web",
            serviceInterest: "Website & Landing Pages",
            packageInterest: "Basic Web",
          }),
          external: true,
        },
      },
      {
        name: "Pro Web",
        description:
          "For businesses that need a multi-page website with a catalog, lead capture, and more complete communication integrations.",
        priceCue: "IDR 5,000,000",
        badge: "Most Popular",
        features: [
          "Five to seven pages, a lightweight CMS for client-managed content, on-page SEO (meta tags, sitemap, and basic structured data), and lead-form integration",
          "Monthly off-page SEO or content services and multilingual support",
          "One major revision, two minor revisions, and unlimited minor changes during the support window",
        ],
        cta: {
          label: "Choose Pro",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Web",
            serviceInterest: "Website & Landing Pages",
            packageInterest: "Pro Web",
          }),
          external: true,
        },
      },
      {
        name: "Advanced Web",
        description:
          "For more complex website requirements, admin systems, database integrations, and custom features that support business operations.",
        priceCue: "IDR 7,500,000+",
        features: [
          "Admin dashboard, role-based access, API or database integration, one to two basic approval workflows, and technical SEO",
          "Payment gateway integration, legacy data migration, and additional approval workflows beyond the two basic workflows",
          "Pricing for each additional approval workflow depends on the number of roles and conditions; migration pricing depends on the volume and quality of the legacy data",
          "Two major revisions and unlimited minor changes during the support window",
        ],
        cta: {
          label: "Choose Advanced",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Web",
            serviceInterest: "Website & Landing Pages",
            packageInterest: "Advanced Web",
          }),
          external: true,
        },
      },
    ],
  },
  {
    id: "mobile",
    label: "Mobile Apps",
    navbarTitle: "Mobile Apps",
    navbarBody:
      "For mobile-first experiences, field operations, or digital products that need to be available directly on users' devices.",
    navbarPriceCue: "Scope-based consultation",
    selectorLabel: "Mobile Apps",
    sectionTitle: "Mobile Apps with Scope-Based Estimates",
    sectionBody:
      "Mobile app services are designed for teams that need mobile-first experiences, operational applications, or digital products used directly by customers or field teams. Because mobile requirements are highly specific, the most reliable estimate starts with a scope consultation.",
    packages: [
      {
        name: "MVP Mobile App",
        description:
          "For validating ideas, building functional prototypes, or launching an initial application with a clear core flow.",
        priceCue: "Starting at IDR 3,000,000",
        isCustom: true,
        features: [
          "One platform (Android or iOS), a core user flow, and a lightweight backend using BaaS or Firebase",
          "Optional add-on: publishing to the Play Store or App Store",
          "One minor revision",
        ],
        cta: {
          label: "Discuss Your MVP Scope",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Mobile",
            serviceInterest: "Mobile Apps",
            packageInterest: "MVP Mobile App",
          }),
          external: true,
        },
      },
      {
        name: "Operational Mobile App",
        description:
          "For internal or field operations that require mature authentication, roles, dashboards, and workflows.",
        priceCue: "IDR 7,000,000",
        isCustom: true,
        features: [
          "Two platforms through a cross-platform build, authentication and roles, a connected admin dashboard, and one submission to each app store",
          "Optional add-ons: resubmission and monthly maintenance",
          "Two revisions",
        ],
        cta: {
          label: "Discuss Your Operational Scope",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Mobile",
            serviceInterest: "Mobile Apps",
            packageInterest: "Operational Mobile App",
          }),
          external: true,
        },
      },
      {
        name: "Integrated Mobile Product",
        description:
          "For apps that connect to backends, payments, external APIs, notifications, or existing systems.",
        priceCue: "IDR 10,000,000+",
        isCustom: true,
        features: [
          "Backend or external API integration, push notifications, one payment provider, publication to both app stores, and technical handover documentation",
          "Optional add-ons: an additional payment provider at IDR 1,500,000 per provider and multilingual or multi-region support at IDR 2,000,000",
          "Two revisions",
        ],
        cta: {
          label: "Discuss Your Integration Scope",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Mobile",
            serviceInterest: "Mobile Apps",
            packageInterest: "Integrated Mobile Product",
          }),
          external: true,
        },
      },
    ],
  },
  {
    id: "ai",
    label: "AI Automation",
    navbarTitle: "AI Automation & Chatbot",
    navbarBody:
      "For FAQs, lead capture, automated follow-up, knowledge routing, and more consistent AI workflows.",
    navbarPriceCue: "Starting at IDR 1,200,000",
    selectorLabel: "AI Automation",
    sectionTitle: "AI Automation & Chatbot",
    sectionBody:
      "AI service options for teams that want to respond faster, organize knowledge flows, and reduce repetitive work through measurable automation.",
    packages: [
      {
        name: "Basic Chatbot",
        description:
          "For automated FAQs, simple conversation flows, and an initial website integration.",
        priceCue: "Starting at IDR 1,000,000",
        features: [
          "A rule-based flow or basic generative AI on one channel (WhatsApp or web widget), using the client's API key for generative AI",
          "One minor revision",
        ],
        cta: {
          label: "Choose Basic",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - AI",
            serviceInterest: "AI Automation & Chatbot",
            packageInterest: "Basic Chatbot",
          }),
          external: true,
        },
      },
      {
        name: "Pro Automation",
        description:
          "For lead capture, automated follow-up, Google Sheets or CRM integration, and communication flows built for growing teams.",
        priceCue: "Starting at IDR 5,000,000",
        badge: "Most Popular",
        features: [
          "Integration with Google Sheets, a CRM, or a database",
          "Automated follow-up",
          "Basic incoming-message classification",
          "Server deployment",
          "Does not include large-document RAG or knowledge bases, or multi-model routing",
          "Two revisions",
        ],
        cta: {
          label: "Choose Pro",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - AI",
            serviceInterest: "AI Automation & Chatbot",
            packageInterest: "Pro Automation",
          }),
          external: true,
        },
      },
      {
        name: "Custom AI Solution",
        description:
          "For AI workflows, cross-tool automation, knowledge routing, API integrations, and processes that cannot be handled with standard templates.",
        priceCue: "Starting at IDR 10,000,000",
        isCustom: true,
        features: [
          "RAG using a vector database, embeddings, and retrieval from the client's documents or knowledge base",
          "Prediction or classification integrated into operational systems",
          "Production deployment with basic monitoring",
          "Two major revisions",
        ],
        cta: {
          label: "Consult via WhatsApp",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - AI",
            serviceInterest: "AI Automation & Chatbot",
            packageInterest: "Custom AI Solution",
          }),
          external: true,
        },
      },
    ],
  },
  {
    id: "data",
    label: "Predictive Data",
    navbarTitle: "Predictive Data",
    navbarBody:
      "Data analysis and machine-learning prediction that turns your datasets into practical insights for business and research.",
    navbarPriceCue: "Starting at IDR 1,500,000",
    selectorLabel: "Predictive Data",
    sectionTitle: "Predictive Data — Machine-Learning Analysis & Forecasting",
    sectionBody:
      "We help businesses, MSMEs, and researchers turn historical data into actionable predictive models. Simply prepare your data as a CSV, Excel file, or numerical dataset, and we will handle the analysis.",
    packages: [
      {
        name: "Basic Prediction",
        description:
          "A straightforward data-prediction solution for understanding trends in your dataset. Suitable for MSMEs, students, and businesses beginning their data-analysis journey.",
        priceCue: "IDR 1,500,000",
        subnote: "Estimated delivery: 4–6 business days.",
        requirements:
          "Clean, structured data with fewer than 5,000 rows and one target variable.",
        features: [
          "Dataset analysis",
          "Prediction model development",
          "Data-pattern identification",
          "Prediction-result visualization",
          "Analysis report in PDF format",
          "Trend and prediction charts",
          "Prediction model in .pkl format",
          "Interpretation consultation",
        ],
        cta: {
          label: "Start Your Data Analysis",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Predictive Data",
            serviceInterest: "Predictive Data",
            packageInterest: "Basic Prediction",
          }),
          external: true,
        },
      },
      {
        name: "Pro Prediction",
        description:
          "Deeper data analysis for more accurate predictions, including every Basic Prediction feature. Suitable for data-driven businesses, academic research, and complex analysis.",
        priceCue: "IDR 9,500,000",
        subnote: "Estimated delivery: 1–2 weeks.",
        requirements: "A larger dataset that requires iterative model training.",
        badge: "Most Popular",
        features: [
          "Every Basic Prediction feature",
          "Relationship analysis between variables",
          "Testing across multiple machine-learning models",
          "Model-performance evaluation",
          "Higher-accuracy predictions",
          "Analysis of the factors that influence results",
          "Machine-learning model optimization",
          "Analysis report in PDF format with data visualizations",
        ],
        cta: {
          label: "Start Your Analysis",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Predictive Data",
            serviceInterest: "Predictive Data",
            packageInterest: "Pro Prediction",
          }),
          external: true,
        },
      },
      {
        name: "Custom Prediction",
        description:
          "If your requirements do not fit the Basic or Pro plans, we can tailor a complete data-analysis solution to your business or research context.",
        priceCue: "Consultation-based pricing",
        isCustom: true,
        features: [
          "More complex datasets",
          "Specialized analysis requirements",
          "Integration with business systems",
          "Scope and pricing tailored to the project",
        ],
        cta: {
          label: "Discuss Your Data",
          href: buildWhatsAppInquiryUrl({
            sourcePage: "Services Page - Predictive Data",
            serviceInterest: "Predictive Data",
            packageInterest: "Custom Prediction",
          }),
          external: true,
        },
      },
    ],
    addOns: {
      title: "Add-On Services",
      description:
        "Optional features for Basic or Pro Prediction packages that improve the depth and quality of your data analysis.",
      items: [
        { name: "Data Pre-Processing", price: "IDR 50,000 – IDR 150,000" },
        { name: "Feature Engineering", price: "IDR 100,000 – IDR 250,000" },
        { name: "Hyperparameter Tuning", price: "IDR 150,000 – IDR 250,000" },
        { name: "Advanced Model Evaluation", price: "IDR 100,000 – IDR 200,000" },
        { name: "Model Deployment to API", price: "IDR 200,000 – IDR 250,000" },
      ],
      note: "Choose only the add-ons your analysis requires.",
    },
  },
];

export const servicesContent = {
  pricingIntro: {
    title: "Choose the Most Practical Starting Point",
    body: "Not every project needs to begin with a large scope. Some teams can start with a website or chatbot package and expand after validation, while others need a mobile app or custom system from day one. Our services are structured around real requirements rather than feature lists alone.",
  },
  megaMenu: {
    consultCta: {
      label: "Consult via WhatsApp",
      href: buildWhatsAppInquiryUrl({
        sourcePage: "Navbar Mega Menu",
        serviceInterest: "Compare all services",
      }),
      external: true,
    },
  },
  waysToWork: {
    description:
      "Choose a collaboration model that fits your team without changing the core focus of the service.",
    items: [
      {
        title: "Start with a Consultation",
        description:
          "Map priorities, risks, and the most efficient implementation sequence before committing to a scope.",
      },
      {
        title: "Start with an Entry Package",
        description:
          "Launch a website or chatbot quickly, then expand it after the initial idea has been validated.",
      },
      {
        title: "Build a Custom Scope",
        description:
          "Plan an end-to-end system, integration, or automation solution around your business context.",
      },
    ],
  },
  specialPrograms: {
    title: "Special Programs for Selected Early-Stage Projects",
    body: "These programs help selected teams begin their digital transformation with a more accessible starting point.",
    note: "Special programs are limited and subject to a requirements review.",
    items: [
      {
        title: "Pay What You Can",
        body: "A limited program for selected businesses, organizations, and personal brands that want to start a website, application, or AI chatbot with a flexible payment arrangement.",
      },
      {
        title: "Academic Discount",
        body: "Special pricing for students, teachers, lecturers, and selected educational projects.",
      },
      {
        title: "Special Offer for MSMEs",
        body: "Tailored options for product landing pages, online catalogs, simple e-commerce, and initial optimization.",
      },
    ],
  },
  faq: {
    heading: "Frequently Asked Questions About Services and Pricing",
    items: [
      {
        question: "How do I choose between Web, Mobile Apps, and AI Automation?",
        answer: "Start with your team's primary need. Choose Web when credibility and lead generation are the priority, Mobile Apps when operations or the core product live on users' devices, and AI Automation when response times and repetitive processes are the main bottlenecks.",
      },
      {
        question: "Can I start with a package and upgrade to a custom scope later?",
        answer: "Yes. Many clients begin with an entry-level package for fast validation, then scale gradually based on usage data and business priorities.",
      },
      {
        question: "Why are Mobile App estimates based on scope?",
        answer: "Mobile-app complexity depends heavily on user flows, roles, backend integrations, and release targets. A credible estimate therefore starts with a scope consultation.",
      },
      {
        question: "Is post-launch support available?",
        answer: "Yes. We provide post-launch support for initial stabilization, minor fixes, and iteration guidance so the solution continues to fit your team's operating rhythm.",
      },
      {
        question: "Can the price be negotiated?",
        answer: "Yes. Our Build Your App Based on Your Budget approach lets us phase the scope around the highest-priority requirements. Your team can start with a realistic budget and scale in measured stages.",
      },
    ],
  },
  pillars,
};

export function getServicePillarById(id: ServicePillarId) {
  return (
    servicesContent.pillars.find((pillar) => pillar.id === id) ??
    servicesContent.pillars[0]
  );
}

export function isValidPillarId(
  value: string | null,
): value is ServicePillarId {
  return (
    value === "web" || value === "mobile" || value === "ai" || value === "data"
  );
}
