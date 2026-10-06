import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import MaterialGrid from "@/components/materials/MaterialGrid";
import MediaViewer from "@/components/materials/MediaViewer";
import InfoRow from "@/components/ui/InfoRow";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate } from "@/lib/format";
import { MATERIAL_TYPES } from "@/lib/material-types";
import { getMaterialById, getMaterials } from "@/lib/materials";
import { container } from "@/lib/styles";

async function loadMaterial(params: Promise<{ id: string }>) {
  const { id } = await params;
  const materialId = Number(id);
  if (!Number.isInteger(materialId) || materialId <= 0) return null;
  return getMaterialById(materialId);
}

export async function generateMetadata(props: PageProps<"/materials/[id]">): Promise<Metadata> {
  const material = await loadMaterial(props.params);
  return { title: material?.title ?? "Материал не найден" };
}

export default async function MaterialPage(props: PageProps<"/materials/[id]">) {
  const material = await loadMaterial(props.params);
  if (!material) notFound();

  const meta = MATERIAL_TYPES[material.type];
  const related = (await getMaterials({ type: material.type, limit: 4 }))
    .filter((item) => item.id !== material.id)
    .slice(0, 3);

  return (
    <div className={`${container} pt-6`}>
      <Link
        href={meta.href}
        className="inline-flex h-11 items-center gap-2 text-[15px] text-muted transition-colors duration-150 hover:text-ink"
      >
        <ArrowLeft className="size-4" strokeWidth={1.8} aria-hidden />
        {meta.plural}
      </Link>

      <div className="mt-4 grid gap-10 lg:grid-cols-[minmax(0,1fr)_26rem]">
        <MediaViewer material={material} />

        <div>
          <p className="font-mono text-meta uppercase text-muted">{meta.label}</p>
          <h1 className="mt-3 text-balance text-[2.25rem] font-semibold leading-tight tracking-[-0.03em]">
            {material.title}
          </h1>
          <p className="mt-4 whitespace-pre-line text-lead text-ink-2">{material.description}</p>

          <dl className="mt-8 border-b border-line">
            <InfoRow label="Автор">{material.authorName}</InfoRow>
            <InfoRow label="Добавлен">{formatDate(material.createdAt)}</InfoRow>
            <InfoRow label="Категория">
              <Link
                href={`/gallery?category=${material.categorySlug}`}
                className="underline underline-offset-4 hover:no-underline"
              >
                {material.categoryName}
              </Link>
            </InfoRow>
          </dl>
        </div>
      </div>

      {related.length > 0 && (
        <section className="pt-24">
          <SectionHeading title={`Ещё ${meta.plural.toLowerCase()}`} description="Другие материалы этого раздела." />
          <div className="mt-9">
            <MaterialGrid materials={related} />
          </div>
        </section>
      )}
    </div>
  );
}
