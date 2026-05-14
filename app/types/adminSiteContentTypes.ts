import type { ApiResponse, PortfolioItemStatus } from "./adminPortfolioTypes";

export type SiteContentSection =
  | "menu"
  | "hero"
  | "showcase"
  | "skills"
  | "projects"
  | "experiences"
  | "network"
  | "floatingButtons"
  | "footer";

export type SiteContentType =
  | "nav_link"
  | "highlight"
  | "stat"
  | "step"
  | "competency"
  | "skill_group"
  | "project_card"
  | "experience_card"
  | "social_link"
  | "footer_link";

export type SiteContentMetadata = Record<string, unknown>;

export type SiteContentItemPayload = {
  id?: string;
  title: string;
  slug?: string;
  section: SiteContentSection;
  contentType: SiteContentType;
  label?: string;
  summary?: string;
  description?: string;
  href?: string;
  imageUrl?: string;
  imagePublicId?: string;
  icon?: string;
  tags: string[];
  metadata: SiteContentMetadata;
  status: PortfolioItemStatus;
  sortOrder?: number;
  featured?: boolean;
};

export type SiteContentItem = SiteContentItemPayload & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type SiteContentApiResponse<T = undefined> = ApiResponse<T>;
