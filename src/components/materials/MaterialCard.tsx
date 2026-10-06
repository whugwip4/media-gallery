import Link from "next/link";
import MaterialCover from "./MaterialCover";
import { MATERIAL_TYPES } from "@/lib/material-types";
import type { Material } from "@/lib/types";

// Карточка без рамки и фона. При наведении чуть светлеет превью, ничего не сдвигается.
// Название до двух строк, автор всегда внизу, поэтому низ карточек в ряду совпадает.
export default function MaterialCard({ material, eager = false }: { material: Material; eager?: boolean }) {
  return (
    <article className="group relative flex flex-col gap-3.5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sunken transition-opacity duration-150 group-hover:opacity-90">
        <MaterialCover
          material={material}
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          eager={eager}
        />
      </div>
      <p className="font-mono text-meta uppercase text-muted">
        {MATERIAL_TYPES[material.type].label} / {material.categoryName}
      </p>
      <h3 className="line-clamp-2 text-title">
        {/* Псевдоэлемент растягивает ссылку на всю карточку */}
        <Link href={`/materials/${material.id}`} className="outline-none after:absolute after:inset-0">
          {material.title}
        </Link>
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted">{material.description}</p>
      <p className="mt-auto pt-0.5 text-[13px] text-ink">{material.authorName}</p>
    </article>
  );
}
