import type { Metadata } from "next";
import Form from "next/form";
import Link from "next/link";
import { Search } from "lucide-react";
import MaterialGrid from "@/components/materials/MaterialGrid";
import PageHero from "@/components/ui/PageHero";
import { plural } from "@/lib/format";
import { getMaterials } from "@/lib/materials";
import { button, container } from "@/lib/styles";

export const metadata: Metadata = { title: "Поиск" };

const SUGGESTIONS = ["озеро", "джаз", "Git", "город", "дождь"];

export default async function SearchPage(props: PageProps<"/search">) {
  const { q } = await props.searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  const results = query ? await getMaterials({ q: query }) : [];

  return (
    <>
      <PageHero
        eyebrow={query ? `Найдено · ${results.length}` : "Поиск по названию"}
        title="Поиск"
        description="Найдите материал по названию."
      >
        <Form action="/search" role="search" className="mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row sm:items-end">
          <label className="flex h-14 flex-1 items-center gap-3 border-b-2 border-ink focus-within:shadow-[inset_0_-1px_0_var(--color-ink)]">
            <Search className="size-5 shrink-0 text-muted" strokeWidth={1.8} aria-hidden />
            <input
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Например: закат"
              aria-label="Название материала"
              className="min-w-0 flex-1 bg-transparent text-lg text-ink placeholder:text-muted focus:outline-none"
            />
          </label>
          <button type="submit" className={button("primary", "lg")}>
            Найти
          </button>
        </Form>
      </PageHero>

      <div className={`${container} mt-10`}>
        {query ? (
          <>
            <p className="text-ink-2">
              По запросу <span className="font-medium text-ink">«{query}»</span>{" "}
              {plural(results.length, ["найден", "найдено", "найдено"])} {results.length}{" "}
              {plural(results.length, ["материал", "материала", "материалов"])}
            </p>
            <div className="mt-8">
              <MaterialGrid
                materials={results}
                emptyTitle="Ничего не найдено"
                emptyText="Проверьте написание или попробуйте другое слово из названия."
                emptyAction={
                  <Link href="/gallery" className={button("secondary", "md")}>
                    Открыть всю галерею
                  </Link>
                }
              />
            </div>
          </>
        ) : (
          <div>
            <p className="font-mono text-meta uppercase text-muted">Попробуйте найти</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((suggestion) => (
                <li key={suggestion}>
                  <Link
                    href={`/search?q=${encodeURIComponent(suggestion)}`}
                    className="inline-flex h-11 items-center rounded-md border border-line px-3.5 text-sm text-ink transition-colors duration-150 hover:border-ink sm:h-9"
                  >
                    {suggestion}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
