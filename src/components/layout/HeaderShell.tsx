"use client";

import { useEffect, useState } from "react";

// Шапка уезжает вверх при прокрутке вниз и возвращается, как только начинают крутить вверх.
// Не прячется, если в ней фокус с клавиатуры или открыто мобильное меню.
export default function HeaderShell({ children }: { children: React.ReactNode }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (Math.abs(y - lastY) > 6) {
          setHidden(y > lastY && y > 160);
          lastY = y;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-hidden={hidden || undefined}
      style={{ viewTransitionName: "site-header" }}
      className="sticky top-0 z-50 border-b border-line bg-paper transition-transform duration-300 ease-out-soft [&[data-hidden]:not(:focus-within):not(:has(#mobile-menu))]:-translate-y-full"
    >
      {children}
    </header>
  );
}
