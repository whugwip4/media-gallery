import Link from "next/link";
import ScrollRow from "@/components/ui/ScrollRow";
import { MATERIAL_TYPES, MATERIAL_TYPE_LIST } from "@/lib/material-types";
import type { Category, MaterialType } from "@/lib/types";

type GalleryFiltersProps = {
  /** Какой раздел открыт: вся галерея или один тип. */
  activeType: MaterialType | "all";
  /** Адрес текущего раздела, к нему добавляется ?category=... */
  basePath: string;
  activeCategory?: string;
  categories: Category[];
};

const TABS = [
  { key: "all", label: "Все", href: "/gallery" },
  ...MATERIAL_TYPE_LIST.map((type) => ({ key: type, label: MATERIAL_TYPES[type].plural, href: MATERIAL_TYPES[type].href })),
];

// На телефоне ряд прокручивается вбок с привязкой к пунктам, полоса прокрутки скрыта.
const ROW =
  "-mx-4 flex snap-x snap-mandatory scroll-px-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden";

function withCategory(href: string, category?: string) {
  return category ? `${href}?category=${encodeURIComponent(category)}` : href;
}

// Фильтры хранятся в адресе (?category=...), поэтому выбранный раздел можно скопировать и отправить.
export default function GalleryFilters({ activeType, basePath, activeCategory, categories }: GalleryFiltersProps) {
  return (
    <div className="space-y-6">
      <nav aria-label="Тип материала" className="border-b border-line">
        <ScrollRow activeKey={activeType} className={`${ROW} gap-7`}>
          {TABS.map(({ key, label, href }) => {
            const active = key === activeType;
            return (
              <li key={key} className="shrink-0 snap-start">
                <Link
                  href={withCategory(href, activeCategory)}
                  scroll={false}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex h-12 items-center text-[15px] transition-colors duration-150 ${
                    active ? "text-ink shadow-[inset_0_-2px_0_var(--color-ink)]" : "text-muted hover:text-ink"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ScrollRow>
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden shrink-0 font-mono text-meta uppercase text-muted sm:inline">Категория:</span>
        <ScrollRow activeKey={activeCategory ?? "all"} ariaLabel="Категория" className={`${ROW} gap-2 sm:flex-wrap`}>
          <li className="shrink-0 snap-start">
            <CategoryChip href={basePath} active={!activeCategory}>
              Все
            </CategoryChip>
          </li>
          {categories.map((category) => (
            <li key={category.id} className="shrink-0 snap-start">
              <CategoryChip href={withCategory(basePath, category.slug)} active={category.slug === activeCategory}>
                {category.name}
              </CategoryChip>
            </li>
          ))}
        </ScrollRow>
      </div>
    </div>
  );
}

// На телефоне чипсы выше (44 px), чтобы по ним было удобно попасть пальцем.
function CategoryChip({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`inline-flex h-11 items-center rounded-md border px-3.5 text-sm transition-colors duration-150 sm:h-9 ${
        active ? "border-ink bg-ink text-paper" : "border-line text-ink hover:border-ink"
      }`}
    >
      {children}
    </Link>
  );
}
