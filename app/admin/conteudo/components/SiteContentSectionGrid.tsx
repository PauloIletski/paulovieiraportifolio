import type {
  SiteContentItem,
  SiteContentSection,
} from "@/app/types/adminSiteContentTypes";
import { siteSections } from "./siteContentConfig";

type SiteContentSectionGridProps = {
  activeSection: SiteContentSection;
  items: SiteContentItem[];
  onSelectSection: (section: SiteContentSection) => void;
};

export function SiteContentSectionGrid({
  activeSection,
  items,
  onSelectSection,
}: SiteContentSectionGridProps) {
  return (
    <nav className="space-y-2" aria-label="Componentes do site">
      {siteSections.map((section) => {
        const sectionItems = items.filter(
          (item) => item.section === section.value,
        );

        return (
          <button
            key={section.value}
            type="button"
            onClick={() => onSelectSection(section.value)}
            className={`w-full rounded border p-4 text-left transition ${
              activeSection === section.value
                ? "border-blue-500 bg-blue-50"
                : "border-zinc-200 bg-white hover:border-blue-200 hover:bg-zinc-50"
            }`}
          >
            <span className="flex items-center justify-between gap-3">
              <span className="text-sm font-black text-zinc-950">
                {section.label}
              </span>
              <span className="rounded bg-white px-2 py-1 text-xs font-bold text-zinc-600">
                {activeSection === section.value ? sectionItems.length : "-"}
              </span>
            </span>
            <span className="mt-2 block text-xs leading-5 text-zinc-600">
              {section.description}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
