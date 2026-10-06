"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Link2, Upload } from "lucide-react";
import Notice from "@/components/ui/Notice";
import { MATERIAL_TYPES, MATERIAL_TYPE_LIST } from "@/lib/material-types";
import { button, hint, input, label, textarea } from "@/lib/styles";
import type { Category, MaterialType } from "@/lib/types";

const ACCEPT: Record<MaterialType, string> = {
  image: "image/jpeg,image/png,image/gif,image/webp",
  video: "video/mp4,video/webm",
  audio: "audio/mpeg,audio/wav,audio/ogg",
};

const FILE_HINTS: Record<MaterialType, string> = {
  image: "JPG, PNG, GIF или WEBP",
  video: "MP4 или WEBM",
  audio: "MP3, WAV или OGG",
};

// Первая неделя: форма и её поведение в браузере.
// Сохранение в базу и загрузку файлов на сервер подключим на следующих этапах.
export default function UploadForm({ categories }: { categories: Category[] }) {
  const [type, setType] = useState<MaterialType>("image");
  const [videoSource, setVideoSource] = useState<"file" | "link">("file");
  const [sent, setSent] = useState(false);

  const useLink = type === "video" && videoSource === "link";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <fieldset>
        <legend className={label}>Тип материала</legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {MATERIAL_TYPE_LIST.map((value) => {
            const meta = MATERIAL_TYPES[value];
            const Icon = meta.icon;
            const checked = value === type;
            return (
              <label
                key={value}
                className={`flex h-14 cursor-pointer items-center gap-3 rounded-md border px-4 text-[15px] font-medium transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-ink ${
                  checked ? "border-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "border-line hover:border-ink"
                }`}
              >
                <input
                  type="radio"
                  name="type"
                  value={value}
                  checked={checked}
                  onChange={() => setType(value)}
                  className="sr-only"
                />
                <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                {meta.label}
                {checked && <Check className="ml-auto size-5" strokeWidth={2} aria-hidden />}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="title" className={label}>
          Название
        </label>
        <input id="title" name="title" required maxLength={200} placeholder="Например: Закат над городом" className={input} />
      </div>

      <div>
        <label htmlFor="description" className={label}>
          Краткое описание
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={1000}
          placeholder="Пара предложений о том, что это за материал"
          className={textarea}
        />
      </div>

      <div className="sm:max-w-sm">
        <label htmlFor="categoryId" className={label}>
          Категория
        </label>
        <select id="categoryId" name="categoryId" required defaultValue="" className={input}>
          <option value="" disabled>
            Выберите категорию
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {type === "video" && (
        <div className="inline-flex gap-1 bg-surface p-1" role="group" aria-label="Источник видео">
          {(["file", "link"] as const).map((source) => (
            <button
              key={source}
              type="button"
              onClick={() => setVideoSource(source)}
              aria-pressed={videoSource === source}
              className={`inline-flex h-10 items-center gap-2 rounded-sm px-4 text-sm font-medium transition-colors duration-150 ${
                videoSource === source ? "bg-paper text-ink shadow-[inset_0_0_0_1px_var(--color-ink)]" : "text-muted hover:text-ink"
              }`}
            >
              {source === "file" ? (
                <Upload className="size-4" strokeWidth={2} aria-hidden />
              ) : (
                <Link2 className="size-4" strokeWidth={2} aria-hidden />
              )}
              {source === "file" ? "Загрузить файл" : "Указать ссылку"}
            </button>
          ))}
        </div>
      )}

      {useLink ? (
        <div>
          <label htmlFor="externalUrl" className={label}>
            Ссылка на видео
          </label>
          <input
            id="externalUrl"
            name="externalUrl"
            type="url"
            required
            placeholder="https://www.youtube.com/watch?v=..."
            className={input}
          />
          <p className={hint}>Подойдут ссылки на YouTube, RuTube или VK Видео.</p>
        </div>
      ) : (
        <div>
          <label htmlFor="file" className={label}>
            Файл
          </label>
          <div className="rounded-md border border-dashed border-field p-4">
            <input
              key={type}
              id="file"
              name="file"
              type="file"
              required
              accept={ACCEPT[type]}
              className="block w-full text-sm text-muted file:mr-4 file:h-10 file:cursor-pointer file:rounded-md file:border file:border-ink file:bg-paper file:px-4 file:text-sm file:font-medium file:text-ink hover:file:bg-surface"
            />
          </div>
          <p className={hint}>Форматы: {FILE_HINTS[type]}.</p>
        </div>
      )}

      {sent && <Notice>Поля заполнены верно. Сохранение материала и загрузку файла подключим на следующих этапах.</Notice>}

      <div className="flex flex-wrap gap-3 border-t border-line pt-7">
        <button type="submit" className={button("primary", "lg")}>
          <Upload className="size-[18px]" strokeWidth={2} aria-hidden />
          Добавить материал
        </button>
        <Link href="/gallery" className={button("secondary", "lg")}>
          Отмена
        </Link>
      </div>
    </form>
  );
}
