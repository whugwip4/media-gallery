type SectionHeadingProps = {
  /** Номер раздела на странице: «01», «02»… Первый экран номера не получает. */
  number?: string;
  title: string;
  description?: string;
  /** Ссылка справа от заголовка, например «Вся галерея». */
  action?: React.ReactNode;
};

export default function SectionHeading({ number, title, description, action }: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-5">
      <div className="flex flex-col gap-2.5">
        {number && <span className="font-mono text-label text-accent">{number}</span>}
        <h2 className="text-heading max-sm:text-[2rem]">{title}</h2>
        {description && <p className="text-muted">{description}</p>}
      </div>
      {action}
    </div>
  );
}
