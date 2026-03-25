export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  order: number;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
  updatedByEmail?: string;
  updatedByUid?: string;
};

export type FaqPayload = Omit<
  FaqItem,
  "id" | "createdAt" | "updatedAt" | "updatedByEmail" | "updatedByUid"
>;
