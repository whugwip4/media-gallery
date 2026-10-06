import type { Metadata } from "next";
import TypeLabel from "@/components/materials/TypeLabel";
import UploadForm from "@/components/materials/UploadForm";
import PageHero from "@/components/ui/PageHero";
import { getCategories } from "@/lib/materials";
import { container } from "@/lib/styles";
import type { MaterialType } from "@/lib/types";

export const metadata: Metadata = { title: "Добавление материала" };

const FORMATS: { type: MaterialType; text: string }[] = [
  { type: "image", text: "JPG, PNG, GIF или WEBP" },
  { type: "video", text: "MP4, WEBM или ссылка на YouTube, RuTube, VK Видео" },
  { type: "audio", text: "MP3, WAV или OGG" },
];

export default async function UploadPage() {
  const categories = await getCategories();

  return (
    <>
      <PageHero
        eyebrow="Новый материал"
        title="Добавление материала"
        description="Загрузите изображение, видео или аудио и выберите категорию."
      />

      <div className={`${container} mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]`}>
        <div className="border-t border-ink pt-7">
          <UploadForm categories={categories} />
        </div>

        <aside className="grid h-fit gap-8">
          <div className="bg-surface p-6">
            <h2 className="text-lg font-semibold">Какие файлы подходят</h2>
            <ul className="mt-4 grid gap-4">
              {FORMATS.map((format) => (
                <li key={format.type}>
                  <TypeLabel type={format.type} withIcon />
                  <p className="mt-1.5 text-sm text-ink-2">{format.text}</p>
                </li>
              ))}
            </ul>
          </div>
          {/* Блок на белом фоне: красная подпись мелким шрифтом на сером не проходит по контрасту */}
          <div className="border-t border-ink pt-5">
            <p className="font-mono text-label uppercase text-accent">Важно</p>
            <h2 className="mt-2 text-lg font-semibold">Название — главное</h2>
            <p className="mt-2 text-sm text-ink-2">
              По названию материал находят через поиск, поэтому пишите понятно: «Закат над рекой», а не «IMG_2041».
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}
