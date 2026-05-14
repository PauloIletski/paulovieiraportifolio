import type { PortfolioItemStatus } from "@/app/types/adminPortfolioTypes";
import { statuses } from "../siteContentConfig";
import type { SiteContentFormBaseProps } from "./SiteContentFormTypes";

type ContentPublishingFieldsProps = SiteContentFormBaseProps & {
  tagText: string;
  onChangeTagText: (value: string) => void;
};

export function ContentPublishingFields({
  form,
  tagText,
  onChangeForm,
  onChangeTagText,
}: ContentPublishingFieldsProps) {
  return (
    <>
      <label className="block">
        <span className="text-sm font-bold text-zinc-700">Tags</span>
        <input
          value={tagText}
          onChange={(e) => onChangeTagText(e.target.value)}
          className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          placeholder="Next.js, VTEX, Vercel"
        />
      </label>

      <label className="block">
        <span className="text-sm font-bold text-zinc-700">Status</span>
        <select
          value={form.status}
          onChange={(e) =>
            onChangeForm((current) => ({
              ...current,
              status: e.target.value as PortfolioItemStatus,
            }))
          }
          className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-bold text-zinc-700">Ordem</span>
        <input
          type="number"
          value={form.sortOrder}
          onChange={(e) =>
            onChangeForm((current) => ({
              ...current,
              sortOrder: Number(e.target.value),
            }))
          }
          className="mt-2 w-full rounded border border-zinc-300 px-3 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </label>

      <label className="flex items-center gap-3 rounded border border-zinc-200 bg-white px-3 py-3">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) =>
            onChangeForm((current) => ({
              ...current,
              featured: e.target.checked,
            }))
          }
          className="h-4 w-4"
        />
        <span className="text-sm font-bold text-zinc-700">
          Destacar nesta secao
        </span>
      </label>
    </>
  );
}
