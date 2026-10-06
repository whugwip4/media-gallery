import GalleryFilters from "./GalleryFilters";
import MaterialGrid from "./MaterialGrid";
import PageHero from "@/components/ui/PageHero";
import { countMaterials } from "@/lib/format";
import { MATERIAL_TYPES } from "@/lib/material-types";
import { getCategories, getMaterials } from "@/lib/materials";
import { container } from "@/lib/styles";
import type { MaterialType } from "@/lib/types";

// Общая разметка для страниц «Изображения», «Видео» и «Аудио».
export default async function TypeGallery({ type, category }: { type: MaterialType; category?: string }) {
  const meta = MATERIAL_TYPES[type];
  const [categories, materials] = await Promise.all([getCategories(), getMaterials({ type, category })]);

  return (
    <>
      <PageHero eyebrow={`Раздел · ${countMaterials(materials.length)}`} title={meta.plural} description={meta.description} />
      <div className={`${container} mt-8`}>
        <GalleryFilters activeType={type} basePath={meta.href} activeCategory={category} categories={categories} />
        <div className="mt-10">
          <MaterialGrid materials={materials} />
        </div>
      </div>
    </>
  );
}
