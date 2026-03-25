export type PortfolioItem = {
  id: string;
  title: string;
  categories: string[];
  types: string[];
  category?: string;
  categorySecondary?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedByEmail?: string;
  updatedByUid?: string;
};

export type PortfolioPayload = {
  title: string;
  categories: string[];
  types: string[];
  description: string;
  imageUrl: string;
  imageAlt: string;
  order: number;
  published: boolean;
};
