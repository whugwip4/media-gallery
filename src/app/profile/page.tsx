import type { Metadata } from "next";
import Link from "next/link";
import { LogOut, Plus } from "lucide-react";
import MaterialGrid from "@/components/materials/MaterialGrid";
import CountUp from "@/components/motion/CountUp";
import PageTransition from "@/components/motion/PageTransition";
import SectionHeading from "@/components/ui/SectionHeading";
import { formatDate, initials } from "@/lib/format";
import { MATERIAL_TYPES, MATERIAL_TYPE_LIST } from "@/lib/material-types";
import { getMaterials } from "@/lib/materials";
import { mockUser } from "@/lib/mock-data";
import { button, container } from "@/lib/styles";

export const metadata: Metadata = { title: "Личный кабинет" };

// Рамки между ячейками счётчиков: на телефоне два столбца, на широком экране четыре.
const STAT_CELL = [
  "border-r border-line pr-6",
  "pl-6 lg:border-r lg:border-line lg:pr-6",
  "mt-6 border-r border-line pr-6 lg:mt-0 lg:pl-6",
  "mt-6 pl-6 lg:mt-0",
];

export default async function ProfilePage() {
  // Пока показываем тестового пользователя.
  // После подключения авторизации здесь будет пользователь из текущей сессии.
  const user = mockUser;
  const materials = await getMaterials({ authorId: user.id });

  const account = [
    { label: "Email", value: user.email },
    { label: "Роль", value: user.role === "admin" ? "Администратор" : "Пользователь" },
    { label: "Дата регистрации", value: formatDate(user.createdAt) },
  ];

  const stats = [
    { label: "Всего материалов", value: materials.length },
    ...MATERIAL_TYPE_LIST.map((type) => ({
      label: MATERIAL_TYPES[type].plural,
      value: materials.filter((material) => material.type === type).length,
    })),
  ];

  return (
    <PageTransition>
      <section className={`${container} pt-10 sm:pt-16`}>
        <div className="flex flex-wrap items-center justify-between gap-8">
          <div className="flex min-w-0 items-center gap-5">
            <span className="flex size-16 shrink-0 items-center justify-center bg-ink text-xl font-semibold text-paper">
              {initials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="font-mono text-label uppercase text-muted">Личный кабинет</p>
              <h1 className="mt-1 truncate text-heading max-sm:text-[2rem]">{user.name}</h1>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/upload" className={button("primary", "md")}>
              <Plus className="size-4" strokeWidth={2} aria-hidden />
              Добавить материал
            </Link>
            <button type="button" className={button("secondary", "md")}>
              <LogOut className="size-4" strokeWidth={2} aria-hidden />
              Выйти
            </button>
          </div>
        </div>

        <dl className="mt-8 grid gap-5 border-y border-line py-5 sm:grid-cols-3">
          {account.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-meta uppercase text-muted">{item.label}</dt>
              <dd className="mt-1.5 break-words text-ink">{item.value}</dd>
            </div>
          ))}
        </dl>

        <dl className="mt-10 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className={STAT_CELL[index]}>
              <dt className="font-mono text-meta uppercase text-muted">{stat.label}</dt>
              <dd
                className={`mt-2 text-[3rem] font-semibold leading-none tracking-[-0.04em] ${
                  index === 0 ? "text-accent" : "text-ink"
                }`}
              >
                <CountUp value={stat.value} delay={200 + index * 100} />
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className={`${container} pt-24`}>
        <SectionHeading number="01" title="Мои материалы" description="Всё, что вы добавили в галерею." />
        <div className="mt-9">
          <MaterialGrid
            materials={materials}
            emptyTitle="Вы ещё ничего не добавили"
            emptyText="Загрузите первое изображение, видео или аудио, и оно появится здесь."
            emptyAction={
              <Link href="/upload" className={button("primary", "md")}>
                Добавить материал
              </Link>
            }
          />
        </div>
      </section>
    </PageTransition>
  );
}
