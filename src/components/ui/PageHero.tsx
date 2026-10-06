import { container } from "@/lib/styles";

type PageHeroProps = {
  /** Моно-подпись над заголовком, например «Раздел · 4 материала». */
  eyebrow: string;
  title: string;
  description?: string;
  /** Содержимое под описанием, например форма поиска. */
  children?: React.ReactNode;
};

// Шапка внутренних страниц: моно-подпись, крупный заголовок и вводный текст, снизу тонкая линия.
export default function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className={container}>
      <div className="border-b border-line pb-10 pt-10 sm:pt-16">
        <p className="font-mono text-label uppercase text-muted">{eyebrow}</p>
        <h1 className="mt-4 text-heading max-sm:text-[2rem]">{title}</h1>
        {description && <p className="mt-3 max-w-130 text-lead text-ink-2">{description}</p>}
        {children}
      </div>
    </section>
  );
}
