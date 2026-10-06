import { ViewTransition } from "react";
import GalleryFilters from "./GalleryFilters";
import MaterialGrid from "./MaterialGrid";
import PageTransition from "@/components/motion/PageTransition";
import PageHero from "@/components/ui/PageHero";
import { countMaterials } from "@/lib/format";
import { MATERIAL_TYPES } from "@/lib/material-types";
import { getCategories, getMaterials } from "@/lib/materials";
import { container } from "@/lib/styles";
import type { MaterialType } from "@/lib/types";

// Общая разметка для страниц «Изображения», «Видео» и «Аудио».
// При смене категории сетка плавно сменяется (ключ — выбранная категория).
export default async function TypeGallery({ type, category }: { type: MaterialType; category?: string }) {
  const meta = MATERIAL_TYPES[type];
  const [categories, materials] = await Promise.all([getCategories(), getMaterials({ type, category })]);

  return (
    <PageTransition>
      <PageHero eyebrow={`Раздел · ${countMaterials(materials.length)}`} title={meta.plural} description={meta.description} />
      <div className={`${container} mt-8`}>
        <GalleryFilters activeType={type} basePath={meta.href} activeCategory={category} categories={categories} />
        <ViewTransition key={category ?? "all"} name="gallery-grid" share="auto" enter="auto" default="none">
          <div className="mt-10">
            <MaterialGrid materials={materials} />
          </div>
        </ViewTransition>
      </div>
    </PageTransition>
  );
}
