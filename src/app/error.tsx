"use client"; // Обработчики ошибок в Next.js должны быть клиентскими компонентами

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";
import { button, container } from "@/lib/styles";

// Показывается, если при загрузке страницы произошла непредвиденная ошибка.
export default function ErrorPage({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={`${container} pt-16 sm:pt-24`}>
      <p className="font-mono text-label uppercase text-accent">Ошибка</p>
      <h1 className="mt-4 text-heading max-sm:text-[2rem]">Что-то пошло не так</h1>
      <p className="mt-3 max-w-md text-lead text-muted">
        Не получилось загрузить страницу. Попробуйте ещё раз — обычно это помогает.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        <button type="button" onClick={() => retry()} className={button("primary", "lg")}>
          <RotateCcw className="size-[18px]" strokeWidth={2} aria-hidden />
          Попробовать снова
        </button>
        <Link href="/" className={button("secondary", "lg")}>
          На главную
        </Link>
      </div>
    </div>
  );
}
