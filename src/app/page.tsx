import Link from "next/link";
import { ArrowRight, ArrowUpRight, Upload } from "lucide-react";
import MaterialCover from "@/components/materials/MaterialCover";
import MaterialGrid from "@/components/materials/MaterialGrid";
import CountUp from "@/components/motion/CountUp";
import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";
import RiseWords from "@/components/motion/RiseWords";
import SectionHeading from "@/components/ui/SectionHeading";
import { countMaterials, plural } from "@/lib/format";
import { MATERIAL_TYPES, MATERIAL_TYPE_LIST } from "@/lib/material-types";
import { countByType, getCategoriesWithCounts, getLatestMaterials, getMaterials } from "@/lib/materials";
import { button, container, linkAction } from "@/lib/styles";
import type { Material } from "@/lib/types";

// Подсветка, которая «заливает» строку слева направо при наведении.
const WIPE =
  "relative isolate overflow-hidden before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:bg-surface before:transition-transform before:duration-500 before:ease-out-soft hover:before:scale-x-100";

// Главная: первый экран с заголовком и счётчиком, полоса из трёх последних материалов
// (по одному каждого типа), строка разделов, бегущая строка категорий, новые материалы,
// категории и призыв зарегистрироваться. Первый экран появляется по очереди при загрузке,
// остальное — при прокрутке.
export default async function HomePage() {
  const [latest, counts, categories, [image], [video], [audio]] = await Promise.all([
    getLatestMaterials(8),
    countByType(),
    getCategoriesWithCounts(),
    getMaterials({ type: "image", limit: 1 }),
    getMaterials({ type: "video", limit: 1 }),
    getMaterials({ type: "audio", limit: 1 }),
  ]);
  const total = counts.image + counts.video + counts.audio;
  const strip = [image, video, audio].filter((material): material is Material => Boolean(material));

  return (
    <PageTransition>
      <section className={`${container} flex flex-col gap-10 pt-10 sm:pt-16`}>
        <div className="flex flex-wrap justify-between gap-4 font-mono text-label uppercase text-muted motion-safe:animate-fade">
          <span>Изображения · видео · аудио</span>
          <span>Учебный проект · 2026</span>
        </div>
        <h1 className="max-w-275 text-display max-sm:text-[2.75rem]">
          <RiseWords text={"Фото, видео и музыка в одной галерее"} delay={100} />
        </h1>

        <div className="relative flex flex-wrap items-end justify-between gap-10 pt-7">
          <span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-ink motion-safe:animate-draw"
            style={{ animationDelay: "350ms" }}
          />
          <div className="flex max-w-130 flex-col gap-6 motion-safe:animate-rise" style={{ animationDelay: "500ms" }}>
            <p className="text-lead text-ink-2">
              Смотрите материалы по категориям, находите нужное через поиск и добавляйте свои после регистрации.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/gallery" className={`${button("primary", "lg")} group`}>
                Открыть галерею
                <ArrowRight
                  className="size-[18px] transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
              <Link href="/upload" className={button("secondary", "lg")}>
                <Upload className="size-[18px]" strokeWidth={2} aria-hidden />
                Добавить материал
              </Link>
            </div>
          </div>
          <p className="flex items-baseline gap-3.5 motion-safe:animate-fade" style={{ animationDelay: "600ms" }}>
            <CountUp value={total} delay={600} className="text-numeral text-accent max-sm:text-[3.5rem]" />
            <span className="font-mono text-label uppercase text-muted">
              {plural(total, ["материал", "материала", "материалов"])}
              <br />в галерее
            </span>
          </p>
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {strip.map((material, index) => (
            <li
              key={material.id}
              className="motion-safe:animate-rise"
              style={{ animationDelay: `${750 + index * 120}ms` }}
            >
              <Link href={`/materials/${material.id}`} transitionTypes={["nav-forward"]} className="group flex flex-col gap-3">
                <span
                  className="relative block aspect-[16/10] overflow-hidden rounded-sm bg-sunken motion-safe:animate-unveil"
                  style={{ animationDelay: `${750 + index * 120}ms` }}
                >
                  <span className="absolute inset-0 transition-transform duration-700 ease-out-soft group-hover:scale-[1.04]">
                    <MaterialCover material={material} sizes="(min-width: 1024px) 33vw, 100vw" eager />
                  </span>
                </span>
                <span className="flex justify-between gap-3 font-mono text-meta uppercase text-muted">
                  <span>{MATERIAL_TYPES[material.type].label}</span>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                </span>
                <span className="text-[17px] font-medium">{material.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Разделы галереи" className={`${container} pt-22`}>
        <Reveal>
          <ul className="grid grid-cols-1 border-b border-t border-b-line border-t-ink sm:grid-cols-3">
            {MATERIAL_TYPE_LIST.map((type, index) => {
              const meta = MATERIAL_TYPES[type];
              const last = index === MATERIAL_TYPE_LIST.length - 1;
              return (
                <li key={type} className={last ? undefined : "border-b border-line sm:border-b-0 sm:border-r"}>
                  <Link
                    href={meta.href}
                    className={`group flex items-center justify-between gap-4 py-7 pr-6 ${WIPE} ${index === 0 ? "" : "sm:pl-6"}`}
                  >
                    <span className="flex flex-col gap-1.5">
                      <span className="text-subheading">{meta.plural}</span>
                      <span className="font-mono text-sm text-muted">{countMaterials(counts[type])}</span>
                    </span>
                    <ArrowUpRight
                      className="size-[22px] shrink-0 transition-transform duration-300 ease-out-soft group-hover:-translate-y-1 group-hover:translate-x-1"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </section>

      {/* Бегущая строка: сдвигается только во время прокрутки, без бесконечной анимации */}
      <div aria-hidden className="mt-22 overflow-hidden border-y border-line py-7">
        <div className="scroll-ticker flex w-max items-center gap-10 whitespace-nowrap pl-10 text-heading max-sm:text-[2rem]">
          {[...categories, ...categories, ...categories].map((category, index) => (
            <span key={index} className="flex items-center gap-10">
              {category.name}
              <span className="size-3 bg-accent" />
            </span>
          ))}
        </div>
      </div>

      <section className={`${container} pt-22`}>
        <Reveal>
          <SectionHeading
            number="01"
            title="Новые материалы"
            description="Последнее, что добавили пользователи."
            action={
              <Link href="/gallery" className={`${linkAction} group`}>
                Вся галерея
                <ArrowRight
                  className="size-4 transition-transform duration-300 ease-out-soft group-hover:translate-x-1"
                  strokeWidth={2}
                  aria-hidden
                />
              </Link>
            }
          />
        </Reveal>
        <div className="mt-9">
          <MaterialGrid materials={latest} />
        </div>
      </section>

      <section className={`${container} pt-24`}>
        <Reveal>
          <SectionHeading
            number="02"
            title="Категории"
            description="Выберите тему, и галерея покажет всё, что к ней относится."
          />
        </Reveal>
        <ul className="mt-9 grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-x-6">
          {categories.map((category, index) => (
            <li key={category.id}>
              <Reveal delay={index * 80} className="h-full">
                <Link
                  href={`/gallery?category=${category.slug}`}
                  className={`group flex h-full flex-col gap-7 border-t border-ink pb-5.5 pt-4.5 ${WIPE}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-mono text-meta text-muted">{countMaterials(category.count)}</span>
                    <ArrowUpRight
                      className="size-[18px] -translate-x-1 opacity-0 transition duration-300 ease-out-soft group-hover:translate-x-0 group-hover:opacity-100"
                      strokeWidth={1.8}
                      aria-hidden
                    />
                  </span>
                  <span className="text-xl font-semibold tracking-[-0.01em] transition-transform duration-300 ease-out-soft group-hover:translate-x-1">
                    {category.name}
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className={`${container} pt-24`}>
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-10 bg-surface p-7 sm:p-16">
            <div className="flex max-w-160 flex-col gap-4.5">
              <h2 className="text-display-sm max-sm:text-[2rem]">Поделитесь своими материалами</h2>
              <p className="text-[17px] leading-relaxed text-ink-2">
                Зарегистрируйтесь, загрузите фото, видео или аудио и выберите категорию. Материал сразу появится в
                галерее.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/register" className={button("primary", "lg")}>
                Создать аккаунт
              </Link>
              <Link href="/login" className={button("secondary", "lg")}>
                Уже есть аккаунт
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </PageTransition>
  );
}
