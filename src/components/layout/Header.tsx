import Link from "next/link";
import Form from "next/form";
import { Search } from "lucide-react";
import HeaderShell from "./HeaderShell";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { button, container } from "@/lib/styles";

export default function Header() {
  return (
    <HeaderShell>
      <div className={`${container} flex h-19 items-center gap-6 xl:gap-10`}>
        <Logo />
        <NavLinks className="hidden lg:block" />
        <div className="flex-1" />

        <Form
          action="/search"
          role="search"
          className="hidden h-10 w-60 items-center gap-2.5 border-b border-ink text-muted focus-within:shadow-[inset_0_-1px_0_var(--color-ink)] xl:flex"
        >
          <Search className="size-[17px] shrink-0" strokeWidth={2} aria-hidden />
          <input
            name="q"
            type="search"
            placeholder="Поиск по названию"
            aria-label="Поиск по названию"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-ink placeholder:text-muted focus:outline-none"
          />
        </Form>
        <Link
          href="/search"
          aria-label="Поиск"
          className="inline-flex size-11 items-center justify-center rounded-md text-ink transition-colors duration-150 hover:bg-surface xl:hidden"
        >
          <Search className="size-5" strokeWidth={1.8} />
        </Link>

        <div className="hidden items-center gap-6 sm:flex xl:gap-10">
          <Link
            href="/login"
            className="inline-flex h-11 items-center px-1 text-[15px] font-medium text-ink underline-offset-4 hover:underline"
          >
            Войти
          </Link>
          <Link href="/register" className={button("primary", "md")}>
            Регистрация
          </Link>
        </div>

        <MobileMenu />
      </div>
    </HeaderShell>
  );
}
