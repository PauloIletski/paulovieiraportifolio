import type {
  SiteContentItemPayload,
  SiteContentSection,
} from "@/app/types/adminSiteContentTypes";
import { getSectionLabel } from "./siteContentConfig";
import { ContentIdentityFields } from "./form-fields/ContentIdentityFields";
import { ContentImageUploadField } from "./form-fields/ContentImageUploadField";
import { ContentLinkMediaFields } from "./form-fields/ContentLinkMediaFields";
import { ContentMetadataField } from "./form-fields/ContentMetadataField";
import { ContentPublishingFields } from "./form-fields/ContentPublishingFields";
import { ContentTextFields } from "./form-fields/ContentTextFields";
import type { ChangeSiteContentForm } from "./form-fields/SiteContentFormTypes";

export type SiteContentFormProps = {
  form: SiteContentItemPayload;
  metadataText: string;
  tagText: string;
  isSaving: boolean;
  isUploading: boolean;
  componentName?: string;
  helperText?: string;
  metadataHelp?: string;
  lockedSection?: SiteContentSection;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChangeForm: ChangeSiteContentForm;
  onChangeMetadataText: (value: string) => void;
  onChangeTagText: (value: string) => void;
  onSelectSection: (section: SiteContentSection) => void;
  onUploadImage: (file: File) => void;
};

export function SiteContentForm({
  form,
  metadataText,
  tagText,
  isSaving,
  isUploading,
  componentName,
  helperText,
  metadataHelp,
  lockedSection,
  onSubmit,
  onChangeForm,
  onChangeMetadataText,
  onChangeTagText,
  onSelectSection,
  onUploadImage,
}: SiteContentFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded border border-zinc-200 bg-zinc-50 p-4"
    >
      <div className="mb-4">
        <h3 className="text-lg font-black text-zinc-950">
          {componentName || `Novo conteudo de ${getSectionLabel(form.section)}`}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          {helperText ||
            "Use o modelo da secao e ajuste os campos para reproduzir os mocks."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ContentIdentityFields
          form={form}
          lockedSection={lockedSection}
          onChangeForm={onChangeForm}
          onSelectSection={onSelectSection}
        />
        <ContentTextFields form={form} onChangeForm={onChangeForm} />
        <ContentLinkMediaFields form={form} onChangeForm={onChangeForm} />
        <ContentPublishingFields
          form={form}
          tagText={tagText}
          onChangeForm={onChangeForm}
          onChangeTagText={onChangeTagText}
        />
      </div>

      <ContentImageUploadField
        form={form}
        isUploading={isUploading}
        onUploadImage={onUploadImage}
      />
      <ContentMetadataField
        metadataText={metadataText}
        metadataHelp={metadataHelp}
        onChangeMetadataText={onChangeMetadataText}
      />

      <button
        type="submit"
        disabled={isSaving}
        className="mt-5 w-full rounded bg-blue-600 px-5 py-3 text-sm font-black text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSaving ? "Salvando..." : "Salvar conteudo da secao"}
      </button>
    </form>
  );
}
