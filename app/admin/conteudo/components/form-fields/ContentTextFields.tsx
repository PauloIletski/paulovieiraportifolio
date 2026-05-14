import { FormTextareaField } from "./FormTextareaField";
import { FormTextField } from "./FormTextField";
import type { SiteContentFormBaseProps } from "./SiteContentFormTypes";

export function ContentTextFields({
  form,
  onChangeForm,
}: SiteContentFormBaseProps) {
  return (
    <>
      <FormTextField
        label="Rotulo"
        value={form.label}
        placeholder="Texto curto exibido no card"
        onChange={(label) =>
          onChangeForm((current) => ({
            ...current,
            label,
          }))
        }
      />
      <FormTextField
        label="Slug"
        value={form.slug}
        placeholder="gerado pelo titulo se vazio"
        onChange={(slug) =>
          onChangeForm((current) => ({
            ...current,
            slug,
          }))
        }
      />
      <FormTextField
        label="Resumo"
        value={form.summary}
        className="block md:col-span-2"
        onChange={(summary) =>
          onChangeForm((current) => ({
            ...current,
            summary,
          }))
        }
      />
      <FormTextareaField
        label="Descricao"
        value={form.description}
        className="block md:col-span-2"
        onChange={(description) =>
          onChangeForm((current) => ({
            ...current,
            description,
          }))
        }
      />
    </>
  );
}
