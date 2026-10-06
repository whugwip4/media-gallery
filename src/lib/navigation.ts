export const NAV_ITEMS = [
  { href: "/", label: "Главная" },
  { href: "/gallery", label: "Галерея" },
  { href: "/images", label: "Изображения" },
  { href: "/videos", label: "Видео" },
  { href: "/audio", label: "Аудио" },
] as const;

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
