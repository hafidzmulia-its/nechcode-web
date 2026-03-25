import type { PortfolioItem } from "@/types/portfolio";

export const defaultPortfolioItems: PortfolioItem[] = [
  {
    id: "translogix-dashboard",
    title: "TransLogix Dashboard",
    categories: ["Business & Organization Websites", "Systems & Internal Tools"],
    types: ["Logistics", "SaaS", "Dashboard", "Admin Panel"],
    description:
      "Transformasi sistem manajemen gudang tradisional menjadi platform digital real-time dengan efisiensi operasional meningkat 40%.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGFCUY5wqmKzmD4Bmcc4G-lFreXAb6o0_NQ8xpgWY_d6n_Bcq0Njsac3aBpX7ROJukS0PMLZEMdwP4UndxlbHbW5stHW-kTPQ5zcpJ8c2J2IY3O6ddvkB0XOb7wpUC28zHJszpXjW0LziEj8nZZTHhlsDUo6J9zlpiK3wf9kvTlWQ8zjStuwkyWtcdLEjSt4WMMDr_eohDIIgrMGV1sJP410Iajhkz65I6BatGbIfo12PJfN1DwSwIB9b6UcJbq8cdM7eOKz9bzk0",
    imageAlt: "Logistics Dashboard",
    order: 1,
    published: true,
  },
  {
    id: "artha-personal-finance",
    title: "Artha Personal Finance",
    categories: ["Business & Organization Websites"],
    types: ["Fintech", "SaaS", "Mobile App"],
    description: "Aplikasi manajemen keuangan dengan AI advisor untuk generasi muda Indonesia.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVT_uv0VnsaPTgqhTuMtN1N1PW7I8W3sb6MHDvO55vzgZPVea1ojZ6R2qwe4BGgmDE-Z2Cv4OY2_yBWiQKsiEIs61E09JuTeshHNt52FX1bhL0Dse1XRmrE5cRVugwJekuGpsI0yarV0n2dEkUyfzZ4g0NWI-ntllDYeMMys0n6124MNEOwFCVnyR-y1EiIMOWbxVeDHKBkDJVXJr7ZCuRYIDrsAJfCFu5gbE7Ou8pHritfHK9ai1AFC_s6PIDRRZnJItAAAcl8cc",
    imageAlt: "Fintech App",
    order: 2,
    published: true,
  },
  {
    id: "lumea-artisan-store",
    title: "Lumea Artisan Store",
    categories: ["Business & Organization Websites", "Social Impact Projects"],
    types: ["E-commerce", "Website", "UMKM"],
    description:
      "E-commerce premium untuk UMKM kriya Indonesia dengan sistem inventaris otomatis.",
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDo8N9gL0BC5B8NmYpVLPYgTYdLtNenSHK7g7ZeCyFzMm0SqeojaVj2duOUBsmfDH5Ez1XLAUjGKs1xBdW0ArM621UnCfPq6ZF8fkulHPkgYbhjAgajBVMTSik83lwknSCTBkFuKF8dltxhoUfG-yu2UItVkCR_FnwSqG2HeAXXfuji28esExrAgmaeMzft187D-jCWcsyY3WjHOYchvkbymTlqgIXIIiFNVHrvJPaLmkHrQ9IkWb2Vre5pxeS05iJGspzm3v6Ab_E",
    imageAlt: "E-commerce Platform",
    order: 3,
    published: true,
  },
];
