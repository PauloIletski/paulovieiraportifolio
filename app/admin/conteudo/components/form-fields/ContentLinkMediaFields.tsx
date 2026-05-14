import { FormTextField } from "./FormTextField";
import type { SiteContentFormBaseProps } from "./SiteContentFormTypes";

export function ContentLinkMediaFields({
  form,
  onChangeForm,
}: SiteContentFormBaseProps) {
  return (
    <>
      <FormTextField
        label="Link"
        value={form.href}
        placeholder="#projects ou https://..."
        onChange={(href) =>
          onChangeForm((current) => ({
            ...current,
            href,
          }))
        }
      />
      <FormTextField
        label="Icone"
        value={form.icon}
        placeholder="frontend, /assets/github.png..."
        onChange={(icon) =>
          onChangeForm((current) => ({
            ...current,
            icon,
          }))
        }
      />
    </>
  );
}
