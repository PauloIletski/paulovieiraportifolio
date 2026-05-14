export type PortfolioItemStatus = "draft" | "published";

export type PortfolioItemCategory =
  | "skill"
  | "project"
  | "experience"
  | "education"
  | "certification";

export type PortfolioItemPayload = {
  title: string;
  slug?: string;
  summary?: string;
  description?: string;
  category: PortfolioItemCategory;
  tags: string[];
  status: PortfolioItemStatus;
  imageUrl?: string;
  imagePublicId?: string;
  externalUrl?: string;
  sortOrder?: number;
  featured?: boolean;
};

export type PortfolioItem = PortfolioItemPayload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ApiResponse<T = undefined> = {
  ok: boolean;
  data?: T;
  error?: string;
};
