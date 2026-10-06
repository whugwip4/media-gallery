import MaterialCard from "./MaterialCard";
import type { Material } from "@/lib/types";

type MaterialGridProps = {
  materials: Material[];
  emptyTitle?: string;
  emptyText?: string;
  /** Кнопка в пустом состоянии, например «Добавить материал». */
  emptyAction?: React.ReactNode;
};

// Колонки подстраиваются под ширину сами: на 1280 px получается четыре.
export default function MaterialGrid({
  materials,
  emptyTitle = "Материалов пока нет",
  emptyText = "Загляните позже или выберите другую категорию.",
  emptyAction,
}: MaterialGridProps) {
  if (materials.length === 0) {
    return (
      <div className="border-t border-ink pt-8">
        <p className="font-mono text-label uppercase text-muted">Пусто</p>
        <p className="mt-3 text-subheading">{emptyTitle}</p>
        <p className="mt-2 max-w-130 text-muted">{emptyText}</p>
        {emptyAction && <div className="mt-6">{emptyAction}</div>}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(min(15rem,100%),1fr))] gap-x-6 gap-y-10">
      {materials.map((material, index) => (
        // Первый ряд карточек виден сразу, его картинки грузим без задержки.
        <MaterialCard key={material.id} material={material} eager={index < 4} />
      ))}
    </div>
  );
}
