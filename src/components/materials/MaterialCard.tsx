import { ViewTransition } from "react";
import Link from "next/link";
import MaterialCover from "./MaterialCover";
import { MATERIAL_TYPES } from "@/lib/material-types";
import type { Material } from "@/lib/types";

// Карточка без рамки и фона. При наведении превью плавно приближается, под названием
// прорисовывается линия. При открытии материала обложка «перетекает» в большую картинку
// (одинаковое имя cover-id здесь и на странице материала).
// Название до двух строк, автор всегда внизу, поэтому низ карточек в ряду совпадает.
export default function MaterialCard({ material, eager = false }: { material: Material; eager?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col gap-3.5 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-ink">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-sunken">
        <ViewTransition name={`cover-${material.id}`} share="morph" default="none">
          <div className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]">
            <MaterialCover
              material={material}
              sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              eager={eager}
            />
          </div>
        </ViewTransition>
      </div>
      <p className="font-mono text-meta uppercase text-muted">
        {MATERIAL_TYPES[material.type].label} / {material.categoryName}
      </p>
      <h3 className="line-clamp-2 text-title">
        {/* Псевдоэлемент растягивает ссылку на всю карточку */}
        <Link
          href={`/materials/${material.id}`}
          transitionTypes={["nav-forward"]}
          className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-[position:left_bottom] bg-no-repeat outline-none transition-[background-size] duration-500 ease-out-soft after:absolute after:inset-0 group-hover:bg-[length:100%_1px]"
        >
          {material.title}
        </Link>
      </h3>
      <p className="line-clamp-2 text-sm leading-relaxed text-muted">{material.description}</p>
      <p className="mt-auto pt-0.5 text-[13px] text-ink">{material.authorName}</p>
    </article>
  );
}
