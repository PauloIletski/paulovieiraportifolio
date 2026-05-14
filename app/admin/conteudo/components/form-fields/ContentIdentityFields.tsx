import type { SiteContentType } from "@/app/types/adminSiteContentTypes";
import { contentTypes, getSectionLabel, siteSections } from "../siteContentConfig";
import { FormTextField } from "./FormTextField";
import type { SectionFieldProps } from "./SiteContentFormTypes";

export function ContentIdentityFields({
  form,
  lockedSection,
  onChangeForm,
  onSelectSection,
}: SectionFieldProps) {
  return (
    <>
      <FormTextField
        label="Titulo"
        value={form.title}
        required
        className="block md:col-span-2"
        onChange={(title) =>
          onChangeForm((current) => ({
            ...current,
            title,
          }))
        }
      />

      <ComponentSectionField
        form={form}
        lockedSection={lockedSection}
        onChangeForm={onChangeForm}
        onSelectSection={onSelectSection}
      />

      <label className="block">
        <span className="text-sm font-bold text-zinc-700">Tipo</span>
        <select
          value={form.contentType}
          onChange={(e) =>
            onChangeForm((current) => ({
              ...current,
              contentType: e.target.value as SiteContentType,
            }))
          }
          className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {contentTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
      </label>
    </>
  );
}

function ComponentSectionField({
  form,
  lockedSection,
  onSelectSection,
}: SectionFieldProps) {
  if (lockedSection) {
    return (
      <div className="rounded border border-zinc-200 bg-white px-3 py-3">
        <span className="text-sm font-bold text-zinc-700">Componente</span>
        <p className="mt-2 text-sm font-semibold text-zinc-950">
          {getSectionLabel(lockedSection)}
        </p>
      </div>
    );
  }

  return (
    <label className="block">
      <span className="text-sm font-bold text-zinc-700">Secao</span>
      <select
        value={form.section}
        onChange={(e) => onSelectSection(e.target.value as typeof form.section)}
        className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        {siteSections.map((section) => (
          <option key={section.value} value={section.value}>
            {section.label}
          </option>
        ))}
      </select>
    </label>
  );
}
