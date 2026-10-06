import type { Metadata } from "next";
import GalleryFilters from "@/components/materials/GalleryFilters";
import MaterialGrid from "@/components/materials/MaterialGrid";
import PageHero from "@/components/ui/PageHero";
import { countMaterials } from "@/lib/format";
import { getCategories, getMaterials } from "@/lib/materials";
import { container } from "@/lib/styles";

export const metadata: Metadata = { title: "Галерея" };

export default async function GalleryPage(props: PageProps<"/gallery">) {
  const { category } = await props.searchParams;
  const categorySlug = typeof category === "string" ? category : undefined;
  const [categories, materials] = await Promise.all([getCategories(), getMaterials({ category: categorySlug })]);

  return (
    <>
      <PageHero
        eyebrow={`Все разделы · ${countMaterials(materials.length)}`}
        title="Галерея"
        description="Все материалы: изображения, видео и аудио."
      />
      <div className={`${container} mt-8`}>
        <GalleryFilters activeType="all" basePath="/gallery" activeCategory={categorySlug} categories={categories} />
        <div className="mt-10">
          <MaterialGrid materials={materials} />
        </div>
      </div>
    </>
  );
}
