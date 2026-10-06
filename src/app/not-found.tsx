import type { Metadata } from "next";
import Link from "next/link";
import { button, container } from "@/lib/styles";

export const metadata: Metadata = { title: "Страница не найдена" };

export default function NotFound() {
  return (
    <div className={`${container} pt-16 sm:pt-24`}>
      <p className="text-[6rem] font-semibold leading-none tracking-[-0.05em] text-accent sm:text-[10rem]">404</p>
      <h1 className="mt-6 text-heading max-sm:text-[2rem]">Страница не найдена</h1>
      <p className="mt-3 max-w-md text-lead text-muted">Возможно, материал удалили или в адресе есть ошибка.</p>
      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/" className={button("primary", "lg")}>
          На главную
        </Link>
        <Link href="/gallery" className={button("secondary", "lg")}>
          Открыть галерею
        </Link>
      </div>
    </div>
  );
}
