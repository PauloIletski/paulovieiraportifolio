import type {
  SiteContentItem,
  SiteContentItemPayload,
  SiteContentSection,
} from "@/app/types/adminSiteContentTypes";

export type UploadedImage = {
  imageUrl: string;
  imagePublicId: string;
};

export type ComponentContentFormProps = {
  isSaving: boolean;
  isUploading: boolean;
  editingItem: SiteContentItem | null;
  onSave: (payload: SiteContentItemPayload) => Promise<void>;
  onUploadImage: (file: File) => Promise<UploadedImage | null>;
  onCancelEdit: () => void;
};

export type ComponentFormDraft = {
  title: string;
  label: string;
  summary: string;
  description: string;
  href: string;
  imageUrl: string;
  imagePublicId: string;
  icon: string;
  tags: string;
  status: "draft" | "published";
  sortOrder: number;
  featured: boolean;
};

export function createBaseDraft(): ComponentFormDraft {
  return {
    title: "",
    label: "",
    summary: "",
    description: "",
    href: "",
    imageUrl: "",
    imagePublicId: "",
    icon: "",
    tags: "",
    status: "draft",
    sortOrder: 0,
    featured: false,
  };
}

export function draftFromItem(item: SiteContentItem): ComponentFormDraft {
  return {
    title: item.title,
    label: item.label || "",
    summary: item.summary || "",
    description: item.description || "",
    href: item.href || "",
    imageUrl: item.imageUrl || "",
    imagePublicId: item.imagePublicId || "",
    icon: item.icon || "",
    tags: item.tags.join(", "),
    status: item.status,
    sortOrder: item.sortOrder || 0,
    featured: Boolean(item.featured),
  };
}

export function parseTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function buildSectionPayload(
  section: SiteContentSection,
  contentType: SiteContentItemPayload["contentType"],
  draft: ComponentFormDraft,
  metadata: Record<string, unknown>,
  id?: string,
): SiteContentItemPayload {
  return {
    id,
    title: draft.title,
    label: draft.label,
    summary: draft.summary,
    description: draft.description,
    href: draft.href,
    imageUrl: draft.imageUrl,
    imagePublicId: draft.imagePublicId,
    icon: draft.icon,
    tags: parseTags(draft.tags),
    section,
    contentType,
    metadata,
    status: draft.status,
    sortOrder: draft.sortOrder,
    featured: draft.featured,
  };
}
