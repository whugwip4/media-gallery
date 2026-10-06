"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, isActivePath } from "@/lib/navigation";

export default function NavLinks({ className = "" }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Основное меню" className={className}>
      <ul className="flex items-center gap-7">
        {NAV_ITEMS.map((item) => {
          const active = isActivePath(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`inline-block py-1.5 text-[15px] transition-colors duration-150 ${
                  active ? "text-ink shadow-[inset_0_-2px_0_var(--color-accent)]" : "text-muted hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
