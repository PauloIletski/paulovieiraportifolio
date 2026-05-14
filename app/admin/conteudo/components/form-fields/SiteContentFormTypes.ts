import type {
  SiteContentItemPayload,
  SiteContentSection,
} from "@/app/types/adminSiteContentTypes";

export type ChangeSiteContentForm = (
  updater: (current: SiteContentItemPayload) => SiteContentItemPayload,
) => void;

export type SiteContentFormBaseProps = {
  form: SiteContentItemPayload;
  onChangeForm: ChangeSiteContentForm;
};

export type SectionFieldProps = SiteContentFormBaseProps & {
  lockedSection?: SiteContentSection;
  onSelectSection: (section: SiteContentSection) => void;
};
