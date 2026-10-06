type RiseWordsProps = {
  /** Слова, которые нельзя разрывать, соединяются неразрывным пробелом. */
  text: string;
  /** Задержка первого слова, мс. */
  delay?: number;
  /** Шаг между словами, мс. */
  step?: number;
};

// Слова заголовка по очереди поднимаются снизу при загрузке страницы.
export default function RiseWords({ text, delay = 0, step = 70 }: RiseWordsProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, index) => (
        <span key={index}>
          <span className="inline-block motion-safe:animate-rise" style={{ animationDelay: `${delay + index * step}ms` }}>
            {word}
          </span>
          {index < words.length - 1 && " "}
        </span>
      ))}
    </>
  );
}
