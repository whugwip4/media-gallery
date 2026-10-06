import { ViewTransition } from "react";

// Анимация при переходе между страницами.
// Ссылки с типом nav-forward сдвигают страницу влево, nav-back — вправо,
// остальные переходы (по меню) — мягкое растворение. Стили лежат в globals.css.
export default function PageTransition({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ViewTransition
      enter={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-fade" }}
      exit={{ "nav-forward": "nav-forward", "nav-back": "nav-back", default: "page-fade" }}
      default="none"
    >
      <div className={className}>{children}</div>
    </ViewTransition>
  );
}
