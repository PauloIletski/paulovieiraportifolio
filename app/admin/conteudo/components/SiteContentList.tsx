import type {
  SiteContentItem,
  SiteContentSection,
} from "@/app/types/adminSiteContentTypes";
import {
  hasSiteContentIcon,
  SiteContentIcon,
} from "@/app/lib/siteContentIconLibrary";
import { getSectionLabel } from "./siteContentConfig";

type SiteContentListProps = {
  activeSection: SiteContentSection;
  items: SiteContentItem[];
  onEdit: (item: SiteContentItem) => void;
  onDelete: (item: SiteContentItem) => void;
  isDeleting?: boolean;
};

function isImageSource(value?: string) {
  if (!value) return false;

  return value.startsWith("/") || value.startsWith("http");
}

export function SiteContentList({
  activeSection,
  items,
  onEdit,
  onDelete,
  isDeleting,
}: SiteContentListProps) {
  return (
    <aside className="rounded border border-zinc-200 bg-white p-4">
      <div className="mb-4">
        <h3 className="text-lg font-black text-zinc-950">
          {getSectionLabel(activeSection)}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          Itens cadastrados para esta secao.
        </p>
      </div>

      <div className="space-y-3">
        {items.length === 0 ? (
          <p className="rounded border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-600">
            Nenhum conteudo cadastrado nesta secao ainda.
          </p>
        ) : (
          items.map((item) => (
            <article key={item.id} className="rounded border border-zinc-200 p-4">
              <div className="flex gap-3">
                {isImageSource(item.imageUrl) || isImageSource(item.icon) ? (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded bg-zinc-100">
                    <img
                      src={item.imageUrl || item.icon}
                      alt={item.title}
                      className="h-full w-full object-contain p-2"
                    />
                  </span>
                ) : hasSiteContentIcon(item.icon) ? (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-blue-50 text-blue-700">
                    <SiteContentIcon name={item.icon} />
                  </span>
                ) : item.icon ? (
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded bg-blue-50 px-2 text-center text-[10px] font-black uppercase leading-tight text-blue-700">
                    {item.icon}
                  </span>
                ) : null}
                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-black text-zinc-950">
                    {item.title}
                  </h4>
                  <p className="mt-1 text-xs font-bold uppercase tracking-wide text-blue-700">
                    {item.contentType} · {item.status}
                  </p>
                  {item.summary || item.label ? (
                    <p className="mt-2 line-clamp-2 text-sm text-zinc-600">
                      {item.summary || item.label}
                    </p>
                  ) : null}
                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(item)}
                      className="rounded border border-zinc-300 bg-white px-3 py-2 text-xs font-black text-zinc-700 transition hover:border-blue-300 hover:text-blue-700"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      disabled={isDeleting}
                      className="rounded border border-red-200 bg-red-50 px-3 py-2 text-xs font-black text-red-700 transition hover:border-red-300 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </aside>
  );
}
