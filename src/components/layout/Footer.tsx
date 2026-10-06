import Link from "next/link";
import Logo from "./Logo";
import { container } from "@/lib/styles";

const COLUMNS = [
  {
    title: "Разделы",
    links: [
      { href: "/gallery", label: "Вся галерея" },
      { href: "/images", label: "Изображения" },
      { href: "/videos", label: "Видео" },
      { href: "/audio", label: "Аудио" },
    ],
  },
  {
    title: "Аккаунт",
    links: [
      { href: "/search", label: "Поиск" },
      { href: "/upload", label: "Добавить материал" },
      { href: "/profile", label: "Личный кабинет" },
      { href: "/login", label: "Войти" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className={`${container} mt-24 pb-9`}>
      <div className="flex flex-wrap justify-between gap-8 border-t border-ink pt-8">
        <div className="flex max-w-90 flex-col gap-3">
          <Logo height={26} />
          <p className="text-sm leading-relaxed text-muted">
            Галерея изображений, видео и аудио с категориями и поиском. Учебный проект производственной практики.
          </p>
        </div>
        <div className="flex flex-wrap gap-14">
          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="flex flex-col gap-2">
              <p className="font-mono text-meta uppercase text-muted">{column.title}</p>
              <ul className="flex flex-col gap-1.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="inline-block py-0.5 text-sm text-ink underline-offset-4 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="mt-10 flex flex-wrap justify-between gap-4 font-mono text-meta text-muted">
        <span>© 2026 МедиаГалерея</span>
        <span>Next.js · TypeScript · MySQL</span>
      </div>
    </footer>
  );
}
