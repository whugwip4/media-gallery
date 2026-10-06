import { ViewTransition } from "react";
import Image from "next/image";
import MaterialCover from "./MaterialCover";
import type { Material } from "@/lib/types";

// Область просмотра на странице материала. Имя cover-id совпадает с обложкой в карточке,
// поэтому при переходе обложка плавно превращается в большую картинку.
// Плееры для видео и аудио подключим вместе с загрузкой файлов.
export default function MediaViewer({ material }: { material: Material }) {
  if (material.type === "image" && material.fileUrl) {
    return (
      <ViewTransition name={`cover-${material.id}`} share="morph" default="none">
        <div className="flex items-center justify-center overflow-hidden rounded-sm bg-sunken">
          <Image
            src={material.fileUrl}
            alt={material.title}
            width={1200}
            height={900}
            loading="eager"
            className="h-auto max-h-[72vh] w-auto object-contain"
          />
        </div>
      </ViewTransition>
    );
  }

  return (
    <div>
      <ViewTransition name={`cover-${material.id}`} share="morph" default="none">
        <div className="relative aspect-video overflow-hidden rounded-sm bg-sunken">
          <MaterialCover material={material} sizes="(min-width: 1024px) 66vw, 100vw" />
        </div>
      </ViewTransition>
      <p className="mt-3 font-mono text-meta uppercase text-muted">
        Плеер появится после подключения загрузки видео и аудио
      </p>
    </div>
  );
}
