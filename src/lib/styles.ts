// Общие наборы классов для стиля «Светлый минимализм»:
// кнопки, поля и подписи выглядят одинаково на всех страницах.

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md border font-medium whitespace-nowrap transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40";

const buttonVariants = {
  /** Главная кнопка. На экране должна быть одна. */
  primary: "border-ink bg-ink text-paper hover:border-ink-2 hover:bg-ink-2",
  secondary: "border-ink bg-paper text-ink hover:bg-surface",
  /** Удаление. */
  danger: "border-accent bg-paper text-accent hover:bg-accent hover:text-paper",
  /** Кнопка на чёрном фоне. */
  inverse: "border-paper bg-transparent text-paper hover:bg-paper hover:text-ink",
};

const buttonSizes = {
  sm: "h-10 px-4 text-sm",
  md: "h-11 px-5 text-[15px]",
  lg: "h-13 px-6 text-base",
};

export function button(
  variant: keyof typeof buttonVariants = "primary",
  size: keyof typeof buttonSizes = "md",
): string {
  return `${buttonBase} ${buttonVariants[variant]} ${buttonSizes[size]}`;
}

/** Ссылка-действие с подчёркиванием, например «Вся галерея →». */
export const linkAction =
  "inline-flex items-center gap-2 pb-0.5 text-[15px] font-medium text-ink shadow-[inset_0_-1px_0_var(--color-ink)] transition-shadow duration-150 hover:shadow-[inset_0_-2px_0_var(--color-ink)]";

const fieldBase =
  "block w-full rounded-md border border-field bg-paper text-base text-ink transition-colors duration-150 placeholder:text-muted hover:border-ink focus:border-ink focus:shadow-[inset_0_0_0_1px_var(--color-ink)] focus:outline-none";

export const input = `${fieldBase} h-12 px-3.5`;

export const textarea = `${fieldBase} px-3.5 py-3`;

export const label = "mb-2 block text-sm font-medium text-ink";

export const hint = "mt-2 text-sm text-muted";

export const container = "mx-auto w-full max-w-page px-4 sm:px-10";

/** Моно-подпись прописными над заголовком (13 px). */
export const monoLabel = "font-mono text-label uppercase text-muted";

/** Моно-подпись прописными в карточках и мета-строках (12 px). */
export const monoMeta = "font-mono text-meta uppercase text-muted";
