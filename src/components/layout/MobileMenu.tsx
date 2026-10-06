"use client";

import { useState } from "react";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { Menu, Search, Upload, UserRound, X } from "lucide-react";
import { NAV_ITEMS, isActivePath } from "@/lib/navigation";
import { button, container } from "@/lib/styles";

const ACCOUNT_LINKS = [
  { href: "/upload", label: "Добавить материал", icon: Upload },
  { href: "/profile", label: "Личный кабинет", icon: UserRound },
];

export default function MobileMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openedAt, setOpenedAt] = useState(pathname);

  // После перехода на другую страницу меню закрывается само.
  if (pathname !== openedAt) {
    setOpenedAt(pathname);
    setOpen(false);
  }

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors duration-150 hover:bg-surface"
      >
        {open ? <X className="size-6" strokeWidth={1.8} /> : <Menu className="size-6" strokeWidth={1.8} />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4.75rem)] overflow-y-auto border-b border-ink bg-paper"
        >
          <div className={`${container} pb-6 pt-4`}>
            <Form
              action="/search"
              role="search"
              className="flex h-12 items-center gap-3 border-b border-ink text-muted focus-within:shadow-[inset_0_-1px_0_var(--color-ink)]"
            >
              <Search className="size-5 shrink-0" strokeWidth={1.8} aria-hidden />
              <input
                name="q"
                type="search"
                placeholder="Поиск по названию"
                aria-label="Поиск по названию"
                className="min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-muted focus:outline-none"
              />
            </Form>

            <nav aria-label="Мобильное меню" className="mt-2">
              <ul>
                {NAV_ITEMS.map((item) => {
                  const active = isActivePath(pathname, item.href);
                  return (
                    <li key={item.href} className="border-b border-line">
                      <Link
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={`flex min-h-13 items-center text-lg transition-colors duration-150 ${
                          active ? "font-medium text-ink" : "text-ink-2 hover:text-ink"
                        }`}
                      >
                        <span className={active ? "shadow-[inset_0_-2px_0_var(--color-accent)]" : undefined}>
                          {item.label}
                        </span>
                      </Link>
                    </li>
                  );
                })}
                {ACCOUNT_LINKS.map(({ href, label, icon: Icon }) => (
                  <li key={href} className="border-b border-line">
                    <Link
                      href={href}
                      className="flex min-h-13 items-center gap-3 text-lg text-ink-2 transition-colors duration-150 hover:text-ink"
                    >
                      <Icon className="size-5" strokeWidth={1.8} aria-hidden />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Link href="/login" className={button("secondary", "md")}>
                Войти
              </Link>
              <Link href="/register" className={button("primary", "md")}>
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
